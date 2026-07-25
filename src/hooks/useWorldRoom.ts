import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { MascotLook } from "@/lib/rpgMascot";

// ============================================================================
// Sala multiplayer (Fase 0) — 100% Supabase Realtime, SEM banco:
//  • Presence  → identidade de quem está na sala (nome + look). Efêmero.
//  • Broadcast → posição (x,y,dir) com throttle (~8/s). Nunca toca o Postgres.
//  • Broadcast → chat (bate-papo). Vira balão de fala sobre a cabeça + feed.
// Movimento, presença e conversa vivem só na memória do Realtime → storage zero.
// O custo escala só com conexões simultâneas + mensagens/s, controlado por
// throttle e, no futuro, por instancing (teto por sala).
// ============================================================================

// Mensagem de chat (efêmera — só existe enquanto a sala está aberta)
export interface ChatMessage {
  id: string;
  userId: string;
  name: string;
  text: string;
  ts: number;   // Date.now() da chegada — ordena o feed
  me: boolean;
}

// Balão de fala ativo de cada jogador (some sozinho depois de BUBBLE_MS)
export interface Bubble { text: string; until: number } // until = performance.now()

export interface RemotePlayer {
  userId: string;
  name: string;
  look: MascotLook;
  // posição alvo (recebida) e posição interpolada (render suave) — normalizadas 0..1
  tx: number; ty: number;
  x: number; y: number;
  dir: 1 | -1;
  moving: boolean;
  lastSeen: number; // ms (performance.now) — poda fantasmas
}

interface Me {
  userId: string;
  name: string;
  look: MascotLook;
}

interface PosPayload {
  userId: string;
  x: number; y: number;
  dir: 1 | -1;
  moving: boolean;
}

const SEND_MIN_MS = 120;     // no máx ~8 envios/s
const IDLE_KEEPALIVE_MS = 1600; // reenvia parado de vez em quando (convergência)
const GHOST_MS = 11000;      // some quem não dá sinal há ~11s (só online na sala)
const BUBBLE_MS = 6000;      // balão de fala fica ~6s sobre a cabeça
const CHAT_MAX = 160;        // limite de caracteres por mensagem
const FEED_MAX = 40;         // guarda só as últimas N no feed (memória)

/**
 * Conecta o jogador local a uma sala Realtime e mantém a lista de jogadores
 * remotos (identidade via Presence + posição via Broadcast). Retorna refs
 * lidos pelo loop de render (sem re-render a cada movimento).
 */
export function useWorldRoom(roomId: string | null, me: Me | null, enabled: boolean) {
  const channelRef = useRef<RealtimeChannel | null>(null);
  const playersRef = useRef<Map<string, RemotePlayer>>(new Map());
  const bubblesRef = useRef<Map<string, Bubble>>(new Map()); // balão por userId (inclui o meu)
  const [connected, setConnected] = useState(false);
  const [count, setCount] = useState(1); // total incluindo eu
  const [messages, setMessages] = useState<ChatMessage[]>([]); // feed (chat é raro → state ok)
  const seqRef = useRef(0); // sequência local p/ id único de mensagem

  // últimos valores enviados (throttle + keepalive)
  const lastSentRef = useRef<{ t: number; x: number; y: number; dir: number; moving: boolean }>(
    { t: 0, x: -1, y: -1, dir: 1, moving: false },
  );
  const meRef = useRef<Me | null>(me);
  meRef.current = me;
  const nudgeRef = useRef(false); // pede reenvio da minha posição (alguém entrou)

  useEffect(() => {
    if (!enabled || !roomId || !me) return;

    playersRef.current = new Map();
    bubblesRef.current = new Map();
    setMessages([]);
    setConnected(false);

    const channel = supabase.channel(`world:${roomId}`, {
      config: { presence: { key: me.userId }, broadcast: { self: false } },
    });
    channelRef.current = channel;

    // ---- Presence: quem está na sala (identidade) ----
    channel.on("presence", { event: "sync" }, () => {
      const state = channel.presenceState() as Record<string, Array<{ name?: string; look?: MascotLook }>>;
      const ids = new Set<string>();
      let total = 0;
      for (const uid of Object.keys(state)) {
        total++;
        if (uid === me.userId) continue;
        ids.add(uid);
        const meta = state[uid]?.[0] || {};
        const existing = playersRef.current.get(uid);
        if (existing) {
          existing.name = meta.name || existing.name;
          if (meta.look) existing.look = meta.look;
        } else {
          // entrou agora — nasce num ponto e espera a 1ª posição por broadcast
          playersRef.current.set(uid, {
            userId: uid,
            name: meta.name || "Viajante",
            look: (meta.look as MascotLook) || ({} as MascotLook),
            tx: 0.5, ty: 0.5, x: 0.5, y: 0.5, dir: 1, moving: false,
            lastSeen: performance.now(),
          });
          nudgeRef.current = true; // reenvia minha posição p/ o novato me ver
        }
      }
      // remove quem saiu
      for (const uid of Array.from(playersRef.current.keys())) {
        if (!ids.has(uid)) playersRef.current.delete(uid);
      }
      setCount(Math.max(1, total));
    });

    // ---- Broadcast: posição dos outros ----
    channel.on("broadcast", { event: "pos" }, ({ payload }) => {
      const p = payload as PosPayload;
      if (!p || p.userId === me.userId) return;
      const pl = playersRef.current.get(p.userId);
      if (pl) {
        pl.tx = p.x; pl.ty = p.y; pl.dir = p.dir; pl.moving = p.moving;
        pl.lastSeen = performance.now();
      } else {
        // recebeu posição antes do presence sync — cria provisório
        playersRef.current.set(p.userId, {
          userId: p.userId, name: "Viajante", look: {} as MascotLook,
          tx: p.x, ty: p.y, x: p.x, y: p.y, dir: p.dir, moving: p.moving,
          lastSeen: performance.now(),
        });
      }
    });

    // ---- Broadcast: chat (bate-papo) ----
    channel.on("broadcast", { event: "chat" }, ({ payload }) => {
      const c = payload as { userId: string; name: string; text: string };
      if (!c || c.userId === me.userId) return;
      const text = String(c.text || "").slice(0, CHAT_MAX);
      if (!text.trim()) return;
      bubblesRef.current.set(c.userId, { text, until: performance.now() + BUBBLE_MS });
      seqRef.current += 1;
      const msg: ChatMessage = { id: `${c.userId}:${seqRef.current}`, userId: c.userId, name: c.name || "Viajante", text, ts: Date.now(), me: false };
      setMessages((prev) => [...prev.slice(-(FEED_MAX - 1)), msg]);
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({ name: me.name, look: me.look });
        setConnected(true);
        nudgeRef.current = true; // avisa minha posição inicial
      }
    });

    // Só permanece na sala quem está com a tela ABERTA: ao minimizar/trocar de
    // aba, sai da presença (os outros o removem); ao voltar, reentra.
    const onVisibility = () => {
      const ch = channelRef.current; if (!ch) return;
      if (document.hidden) { try { ch.untrack(); } catch { /* noop */ } }
      else { try { ch.track({ name: me.name, look: me.look }); nudgeRef.current = true; } catch { /* noop */ } }
    };
    const onLeave = () => { try { channel.untrack(); supabase.removeChannel(channel); } catch { /* noop */ } };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onLeave);

    return () => {
      setConnected(false);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onLeave);
      supabase.removeChannel(channel);
      channelRef.current = null;
      playersRef.current = new Map();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, enabled, me?.userId]);

  // Atualiza identidade (look/nome) sem recriar o canal (ex.: trocou de traje)
  useEffect(() => {
    const ch = channelRef.current;
    if (ch && connected && me) ch.track({ name: me.name, look: me.look });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.name, JSON.stringify(me?.look), connected]);

  // Envia minha posição (chamado a cada frame pelo componente; throttle interno)
  const sendPos = useCallback((x: number, y: number, dir: 1 | -1, moving: boolean) => {
    const ch = channelRef.current;
    if (!ch || !meRef.current) return;
    const now = performance.now();
    const last = lastSentRef.current;
    const movedEnough = Math.abs(x - last.x) > 0.004 || Math.abs(y - last.y) > 0.004 || dir !== last.dir || moving !== last.moving;
    const due = now - last.t >= SEND_MIN_MS;
    const keepalive = now - last.t >= IDLE_KEEPALIVE_MS;
    if ((movedEnough && due) || keepalive || nudgeRef.current) {
      nudgeRef.current = false;
      lastSentRef.current = { t: now, x, y, dir, moving };
      ch.send({ type: "broadcast", event: "pos", payload: { userId: meRef.current.userId, x, y, dir, moving } });
    }
  }, []);

  // Envia uma mensagem de chat: broadcast + balão local + entra no meu feed
  const sendChat = useCallback((raw: string) => {
    const ch = channelRef.current;
    const meNow = meRef.current;
    if (!ch || !meNow) return;
    const text = String(raw || "").replace(/\s+/g, " ").trim().slice(0, CHAT_MAX);
    if (!text) return;
    ch.send({ type: "broadcast", event: "chat", payload: { userId: meNow.userId, name: meNow.name, text } });
    bubblesRef.current.set(meNow.userId, { text, until: performance.now() + BUBBLE_MS });
    seqRef.current += 1;
    const msg: ChatMessage = { id: `me:${seqRef.current}`, userId: meNow.userId, name: meNow.name, text, ts: Date.now(), me: true };
    setMessages((prev) => [...prev.slice(-(FEED_MAX - 1)), msg]);
  }, []);

  // Interpola/poda os remotos + expira balões (chamado a cada frame antes de desenhar)
  const stepRemotes = useCallback(() => {
    const now = performance.now();
    for (const [uid, p] of playersRef.current) {
      if (now - p.lastSeen > GHOST_MS) { playersRef.current.delete(uid); bubblesRef.current.delete(uid); continue; }
      p.x += (p.tx - p.x) * 0.22;
      p.y += (p.ty - p.y) * 0.22;
    }
    for (const [uid, b] of bubblesRef.current) {
      if (now > b.until) bubblesRef.current.delete(uid);
    }
  }, []);

  return { playersRef, bubblesRef, sendPos, sendChat, stepRemotes, connected, count, messages };
}
