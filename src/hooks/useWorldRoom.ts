import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { DEFAULT_LOOK, type MascotLook } from "@/lib/rpgMascot";
import { fetchMyBlockStatus } from "@/lib/roomModeration";
import { maskSensitive } from "@/lib/textSafety";

export type KickReason = "blocked" | "duplicate";

// ============================================================================
// Sala multiplayer — 100% Supabase Realtime BROADCAST, SEM banco.
//
// Design robusto p/ "todos têm que aparecer, em qualquer dispositivo":
//  • Um ÚNICO canal por sala. TODO pacote de estado carrega a IDENTIDADE
//    (nome + papel; o look vai junto periodicamente) além da posição. Assim
//    ninguém fica "Viajante" e nada depende do Presence (que é instável entre
//    redes/dispositivos diferentes).
//  • Auto-regeneração: cada cliente RE-ANUNCIA seu estado a cada ~1,5s
//    (keepalive) e, ao ver um desconhecido, responde na hora com o próprio
//    estado completo. Pacotes perdidos se corrigem sozinhos em ~1,5s.
//  • Remoção só por AUSÊNCIA de sinal (ghost), nunca por "sumiu do Presence".
// Movimento e conversa vivem só na memória do Realtime → storage zero.
// ============================================================================

// Mensagem de chat (efêmera — só existe enquanto a sala está aberta)
export interface ChatMessage {
  id: string;
  userId: string;
  name: string;
  text: string;
  ts: number;      // Date.now() da chegada — ordena o feed e expira em MESSAGE_TTL_MS
  me: boolean;
  isAdmin: boolean; // admin/DEV → destaque no feed
  system?: boolean; // "entrou/saiu da sala" → estilo discreto
  level?: number;   // nível/patente do autor (emblema no feed)
}

// Balão de fala ativo de cada jogador (some sozinho depois de BUBBLE_MS)
export interface Bubble { text: string; until: number; isAdmin: boolean } // until = performance.now()

export interface RemotePlayer {
  userId: string;
  name: string;
  look: MascotLook;
  isAdmin: boolean;
  level: number;    // nível/patente (emblema sobre o personagem)
  hasLook: boolean; // já recebeu o look real? (senão desenha DEFAULT até chegar)
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
  isAdmin?: boolean;
  level?: number;
}

// pacote de estado (posição + identidade). look é opcional (vai de tempos em tempos)
interface StatePayload {
  userId: string;
  sid: string;      // id da SESSÃO (aba/dispositivo) — detecta sessão duplicada
  ca: number;       // connectedAt (ms) — desempate de quem cede na duplicata
  name: string;
  role: "admin" | "member";
  level?: number;
  look?: MascotLook;
  x: number; y: number;
  dir: 1 | -1;
  moving: boolean;
}

const SEND_MIN_MS = 120;        // no máx ~8 envios/s de posição
const IDLE_KEEPALIVE_MS = 1500; // re-anuncia (com look) mesmo parado → convergência
const LOOK_EVERY_MS = 1000;     // inclui o look em pacotes de movimento no máx a cada 1s
const GHOST_MS = 8000;          // some quem não dá sinal há ~8s (só online na sala)
const JOIN_GRACE_MS = 2500;     // não anuncia "entrou" p/ quem já estava (1ª descoberta)
const BLOCK_CHECK_MS = 25000;   // auto-checagem de bloqueio (garante expulsão até 25s)
const BUBBLE_MS = 6000;         // balão de fala fica ~6s sobre a cabeça
const CHAT_MAX = 160;           // limite de caracteres por mensagem
const FEED_MAX = 40;            // guarda só as últimas N no feed (memória)
const MESSAGE_TTL_MS = 5 * 60 * 1000; // conversa é do momento: some do feed em ~5min
const PRUNE_EVERY_MS = 30000;         // varre o feed a cada 30s p/ expirar antigas

/**
 * Conecta o jogador local a uma sala Realtime e mantém a lista de jogadores
 * remotos (identidade + posição, tudo por Broadcast). Retorna refs lidos pelo
 * loop de render (sem re-render a cada movimento).
 */
export function useWorldRoom(roomId: string | null, me: Me | null, enabled: boolean, onKicked?: (reason: KickReason) => void) {
  const channelRef = useRef<RealtimeChannel | null>(null);
  // sessão única: cada montagem tem um id + instante de conexão
  const sidRef = useRef<string>("");
  const caRef = useRef<number>(0);
  const playersRef = useRef<Map<string, RemotePlayer>>(new Map());
  const bubblesRef = useRef<Map<string, Bubble>>(new Map()); // balão por userId (inclui o meu)
  const [connected, setConnected] = useState(false);
  const [count, setCount] = useState(1); // total incluindo eu
  const [messages, setMessages] = useState<ChatMessage[]>([]); // feed (chat é raro → state ok)
  const seqRef = useRef(0); // sequência local p/ id único de mensagem
  const graceUntilRef = useRef(0); // não anuncia "entrou" dos que já estavam
  const onKickedRef = useRef(onKicked); onKickedRef.current = onKicked;

  // adiciona uma mensagem de sistema (entrou/saiu) no feed
  const pushSystem = useCallback((text: string) => {
    seqRef.current += 1;
    const msg: ChatMessage = { id: `sys:${seqRef.current}`, userId: "", name: "", text, ts: Date.now(), me: false, isAdmin: false, system: true };
    setMessages((prev) => [...prev.slice(-(FEED_MAX - 1)), msg]);
  }, []);

  // throttle/keepalive do envio de estado
  const lastSentRef = useRef({ t: 0, x: -1, y: -1, dir: 1 as 1 | -1, moving: false });
  const lastLookSentRef = useRef(0);
  const lastCountRef = useRef(1);
  const meRef = useRef<Me | null>(me);
  meRef.current = me;
  const nudgeRef = useRef(false); // pede reenvio do meu estado COMPLETO (entrei / vi alguém novo)

  // atualiza o contador de online (derivado do que realmente renderizamos)
  const recount = useCallback(() => {
    const n = playersRef.current.size + 1;
    if (n !== lastCountRef.current) { lastCountRef.current = n; setCount(n); }
  }, []);

  useEffect(() => {
    if (!enabled || !roomId || !me) return;

    playersRef.current = new Map();
    bubblesRef.current = new Map();
    lastCountRef.current = 1;
    setCount(1);
    setMessages([]);
    setConnected(false);
    // nova sessão (aba/dispositivo)
    sidRef.current = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    caRef.current = Date.now();

    const channel = supabase.channel(`world:${roomId}`, {
      config: { broadcast: { self: false } },
    });
    channelRef.current = channel;

    // ---- Broadcast: estado (posição + identidade) dos outros ----
    channel.on("broadcast", { event: "state" }, ({ payload }) => {
      const p = payload as StatePayload;
      if (!p || !p.userId) return;
      // Sessão duplicada (mesmo usuário em outra aba/dispositivo): o mais NOVO
      // assume; o mais ANTIGO cede e é avisado.
      if (p.userId === me.userId) {
        if (p.sid && p.sid !== sidRef.current) {
          const otherNewer = p.ca > caRef.current || (p.ca === caRef.current && p.sid > sidRef.current);
          if (otherNewer) onKickedRef.current?.("duplicate");
        }
        return;
      }
      const isAdmin = p.role === "admin";
      const existing = playersRef.current.get(p.userId);
      if (existing) {
        existing.tx = p.x; existing.ty = p.y; existing.dir = p.dir; existing.moving = p.moving;
        existing.name = p.name || existing.name;
        existing.isAdmin = isAdmin;
        if (typeof p.level === "number") existing.level = p.level;
        if (p.look) { existing.look = p.look; existing.hasLook = true; }
        existing.lastSeen = performance.now();
      } else {
        // novo jogador — já nasce COM nome (nunca "Viajante") e com a posição real
        playersRef.current.set(p.userId, {
          userId: p.userId,
          name: p.name || "Viajante",
          look: p.look || DEFAULT_LOOK,
          isAdmin,
          level: typeof p.level === "number" ? p.level : 0,
          hasLook: !!p.look,
          tx: p.x, ty: p.y, x: p.x, y: p.y, dir: p.dir, moving: p.moving,
          lastSeen: performance.now(),
        });
        nudgeRef.current = true; // vi alguém novo → reenvio meu estado completo p/ ele me ver
        recount();
        // "entrou na sala" — só p/ quem chega DEPOIS que já me situei (evita spam inicial)
        if (performance.now() > graceUntilRef.current) pushSystem(`${p.name || "Alguém"} entrou na sala`);
      }
    });

    // ---- Broadcast: moderação (expulsão/bloqueio ao vivo) ----
    channel.on("broadcast", { event: "moderation" }, ({ payload }) => {
      const m = payload as { targetUserId?: string };
      if (m?.targetUserId && m.targetUserId === me.userId) onKickedRef.current?.("blocked");
    });

    // ---- Broadcast: chat (bate-papo) ----
    channel.on("broadcast", { event: "chat" }, ({ payload }) => {
      const c = payload as { userId: string; name: string; text: string; isAdmin?: boolean; level?: number };
      if (!c || c.userId === me.userId) return;
      // defesa em profundidade: mascara PII mesmo no recebimento
      const text = maskSensitive(String(c.text || "").slice(0, CHAT_MAX));
      if (!text.trim()) return;
      const isAdmin = !!c.isAdmin;
      const level = typeof c.level === "number" ? c.level : (playersRef.current.get(c.userId)?.level ?? 0);
      bubblesRef.current.set(c.userId, { text, until: performance.now() + BUBBLE_MS, isAdmin });
      seqRef.current += 1;
      const msg: ChatMessage = { id: `${c.userId}:${seqRef.current}`, userId: c.userId, name: c.name || "Viajante", text, ts: Date.now(), me: false, isAdmin, level };
      setMessages((prev) => [...prev.slice(-(FEED_MAX - 1)), msg]);
    });

    graceUntilRef.current = performance.now() + JOIN_GRACE_MS;
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        setConnected(true);
        nudgeRef.current = true; // anuncio meu estado completo assim que entro
        graceUntilRef.current = performance.now() + JOIN_GRACE_MS;
      } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
        setConnected(false);
      }
    });

    // Auto-checagem de bloqueio: garante que quem foi bloqueado (por denúncias,
    // ou pelo admin no painel) seja expulso mesmo sem receber o broadcast.
    const blockTimer = window.setInterval(async () => {
      const st = await fetchMyBlockStatus();
      if (st.blocked) onKickedRef.current?.("blocked");
    }, BLOCK_CHECK_MS);

    // Conversa é do momento: varre o feed e remove mensagens com mais de ~5min.
    const pruneTimer = window.setInterval(() => {
      const cutoff = Date.now() - MESSAGE_TTL_MS;
      setMessages((prev) => {
        const kept = prev.filter((m) => m.ts >= cutoff);
        return kept.length === prev.length ? prev : kept;
      });
    }, PRUNE_EVERY_MS);

    // Ao minimizar/trocar de aba, paro de anunciar (os outros me "fantasmam" em
    // ~8s); ao voltar, re-anuncio na hora.
    const onVisibility = () => {
      if (!document.hidden) nudgeRef.current = true;
    };
    const onLeave = () => { try { supabase.removeChannel(channel); } catch { /* noop */ } };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onLeave);

    return () => {
      setConnected(false);
      window.clearInterval(pruneTimer);
      window.clearInterval(blockTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onLeave);
      supabase.removeChannel(channel);
      channelRef.current = null;
      playersRef.current = new Map();
      bubblesRef.current = new Map();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, enabled, me?.userId]);

  // Troca de traje/nome/papel → força reenvio do look no próximo pacote
  useEffect(() => {
    if (connected) { nudgeRef.current = true; }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.name, JSON.stringify(me?.look), me?.isAdmin, connected]);

  // Envia meu estado (chamado a cada frame pelo componente; throttle interno).
  // A identidade (nome+papel) vai SEMPRE; o look vai no keepalive/nudge e no
  // máximo a cada ~1s em movimento (economiza banda sem deixar ninguém sem look).
  const sendPos = useCallback((x: number, y: number, dir: 1 | -1, moving: boolean) => {
    const ch = channelRef.current;
    const meNow = meRef.current;
    if (!ch || !meNow) return;
    const now = performance.now();
    const last = lastSentRef.current;
    const movedEnough = Math.abs(x - last.x) > 0.004 || Math.abs(y - last.y) > 0.004 || dir !== last.dir || moving !== last.moving;
    const due = now - last.t >= SEND_MIN_MS;
    const keepalive = now - last.t >= IDLE_KEEPALIVE_MS;
    const nudge = nudgeRef.current;
    if (!((movedEnough && due) || keepalive || nudge)) return;

    const withLook = nudge || keepalive || now - lastLookSentRef.current >= LOOK_EVERY_MS;
    nudgeRef.current = false;
    lastSentRef.current = { t: now, x, y, dir, moving };
    const payload: StatePayload = {
      userId: meNow.userId,
      sid: sidRef.current,
      ca: caRef.current,
      name: meNow.name,
      role: meNow.isAdmin ? "admin" : "member",
      level: meNow.level ?? 0,
      x, y, dir, moving,
    };
    if (withLook) { payload.look = meNow.look; lastLookSentRef.current = now; }
    ch.send({ type: "broadcast", event: "state", payload });
  }, []);

  // Envia uma mensagem de chat: broadcast + balão local + entra no meu feed
  const sendChat = useCallback((raw: string) => {
    const ch = channelRef.current;
    const meNow = meRef.current;
    if (!ch || !meNow) return;
    // mascara dados sensíveis (telefone/e-mail/CPF) ANTES de transmitir — o dado
    // em claro nunca sai do dispositivo (LGPD).
    const text = maskSensitive(String(raw || "").replace(/\s+/g, " ").trim()).slice(0, CHAT_MAX);
    if (!text) return;
    const isAdmin = !!meNow.isAdmin;
    const level = meNow.level ?? 0;
    ch.send({ type: "broadcast", event: "chat", payload: { userId: meNow.userId, name: meNow.name, text, isAdmin, level } });
    bubblesRef.current.set(meNow.userId, { text, until: performance.now() + BUBBLE_MS, isAdmin });
    seqRef.current += 1;
    const msg: ChatMessage = { id: `me:${seqRef.current}`, userId: meNow.userId, name: meNow.name, text, ts: Date.now(), me: true, isAdmin, level };
    setMessages((prev) => [...prev.slice(-(FEED_MAX - 1)), msg]);
  }, []);

  // Broadcast de moderação: expulsa ao vivo o alvo (bloqueado/denunciado).
  const sendModeration = useCallback((targetUserId: string) => {
    const ch = channelRef.current;
    if (!ch) return;
    ch.send({ type: "broadcast", event: "moderation", payload: { targetUserId } });
  }, []);

  // Interpola/poda os remotos + expira balões (chamado a cada frame antes de desenhar)
  const stepRemotes = useCallback(() => {
    const now = performance.now();
    let removed = false;
    for (const [uid, p] of playersRef.current) {
      if (now - p.lastSeen > GHOST_MS) {
        const name = p.name;
        playersRef.current.delete(uid); bubblesRef.current.delete(uid); removed = true;
        pushSystem(`${name || "Alguém"} saiu da sala`);
        continue;
      }
      p.x += (p.tx - p.x) * 0.22;
      p.y += (p.ty - p.y) * 0.22;
    }
    for (const [uid, b] of bubblesRef.current) {
      if (now > b.until) bubblesRef.current.delete(uid);
    }
    if (removed) recount();
  }, [recount, pushSystem]);

  return { playersRef, bubblesRef, sendPos, sendChat, sendModeration, stepRemotes, connected, count, messages };
}
