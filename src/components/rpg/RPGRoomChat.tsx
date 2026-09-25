import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ChevronDown, Send } from "lucide-react";
import type { ChatMessage } from "@/hooks/useWorldRoom";
import { getLevelTier } from "@/lib/rpgLevel";
import { useKeyboardInset } from "@/hooks/useKeyboardInset";

const ADMIN_COLOR = "#c084fc";

/** As três alturas em que a gaveta descansa, como fração da sala. */
export type SnapChat = "espiada" | "meio" | "cheio";
const FRACAO: Record<SnapChat, number> = { espiada: 0, meio: 0.46, cheio: 0.74 };
const ORDEM: SnapChat[] = ["espiada", "meio", "cheio"];
/** O mundo nunca encolhe abaixo disto. Num celular de 640px o "cheio" por
 *  fração deixava 65px de sala — um filete onde não se vê ninguém andar, e a
 *  sala deixa de ser sala. É proporcional porque num aparelho alto 150px fixos
 *  viravam uma fita: os bonecos saíam menores que as próprias etiquetas. */
const MUNDO_MIN_ABS = 150;
const MUNDO_MIN_FRACAO = 0.26;
/** Com o teclado aberto o piso cede: ali quem manda é a conversa, e num
 *  aparelho pequeno os 150px cobravam a sala inteira ao feed — sobrava UMA
 *  linha de texto. 88px ainda mostram as cabeças de quem está na sala. */
const MUNDO_MIN_TECLADO = 88;
const mundoMin = (alturaSala: number, digitando: boolean) =>
  digitando
    ? MUNDO_MIN_TECLADO
    : Math.max(MUNDO_MIN_ABS, Math.round(alturaSala * MUNDO_MIN_FRACAO));
/** Alça + barra de digitar: o que a gaveta ocupa fora do feed. */
const GAVETA_FIXA = 88;

interface Props {
  messages: ChatMessage[];
  onSend: (texto: string) => void;
  /** altura útil da sala (px) — base das frações */
  alturaSala: number;
  snap: SnapChat;
  onSnap: (s: SnapChat) => void;
}

const hora = (ts: number) =>
  new Date(ts).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

/**
 * GAVETA DE CONVERSA da sala, em pé.
 *
 * Em paisagem o chat flutuava por cima do mundo e vivia espremido em 26vh. Em
 * pé ele vira uma gaveta ancorada embaixo, com três alturas: só a barra de
 * digitar ("espiada"), metade da sala ("meio") e quase tudo ("cheio"). Arrasta
 * pela alça ou toca nela para alternar — é o gesto que todo app de mensagem já
 * ensinou, e é o que devolve espaço ao mundo quando a conversa não é o assunto.
 */
export function RPGRoomChat({ messages, onSend, alturaSala, snap, onSnap }: Props) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const teclado = useKeyboardInset();

  // ---- arraste da alça -----------------------------------------------------
  // `arrasto` guarda a altura AO VIVO enquanto o dedo está na alça; ao soltar,
  // encaixa no snap mais próximo. Sem isso a gaveta só pularia entre alturas,
  // que é o que faz um bottom sheet parecer de brinquedo.
  const [arrasto, setArrasto] = useState<number | null>(null);
  const puxRef = useRef<{ id: number; y0: number; h0: number } | null>(null);

  // O teclado come a sala por baixo (a gaveta ganha `paddingBottom`). Se o feed
  // ignorasse isso, o mundo é que encolheria — e num celular de 640px com o
  // teclado aberto no "cheio" ele ia literalmente a zero. Então a conta é feita
  // sobre o que SOBRA da sala, e é o feed que cede espaço enquanto se digita.
  const alturaDe = useCallback(
    (s: SnapChat) => {
      const util = Math.max(0, alturaSala - teclado);
      const teto = Math.max(0, util - mundoMin(util, teclado > 0) - GAVETA_FIXA);
      return Math.min(Math.round(util * FRACAO[s]), teto);
    },
    [alturaSala, teclado],
  );

  const aoPegar = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    puxRef.current = { id: e.pointerId, y0: e.clientY, h0: alturaDe(snap) };
    setArrasto(alturaDe(snap));
  };
  const aoMover = (e: React.PointerEvent) => {
    const p = puxRef.current;
    if (!p || e.pointerId !== p.id) return;
    const bruto = p.h0 - (e.clientY - p.y0);           // subir o dedo = abrir
    setArrasto(Math.max(0, Math.min(alturaDe("cheio"), bruto)));
  };
  const aoSoltar = (e: React.PointerEvent) => {
    const p = puxRef.current;
    if (!p || e.pointerId !== p.id) return;
    const h = arrasto ?? p.h0;
    const movimento = Math.abs(h - p.h0);
    puxRef.current = null;
    setArrasto(null);
    // quase parado = toque: avança para a próxima altura (atalho sem arrastar)
    if (movimento < 6) {
      onSnap(ORDEM[(ORDEM.indexOf(snap) + 1) % ORDEM.length]);
      return;
    }
    let melhor: SnapChat = "espiada";
    for (const s of ORDEM) if (Math.abs(alturaDe(s) - h) < Math.abs(alturaDe(melhor) - h)) melhor = s;
    onSnap(melhor);
  };

  // ---- rolagem do feed -----------------------------------------------------
  const [noFim, setNoFim] = useState(true);
  const [novas, setNovas] = useState(0);
  const vistasRef = useRef(messages.length);

  const aoRolar = () => {
    const f = feedRef.current;
    if (!f) return;
    const fim = f.scrollHeight - f.clientHeight - f.scrollTop < 40;
    setNoFim(fim);
    if (fim) { setNovas(0); vistasRef.current = messages.length; }
  };

  const irAoFim = useCallback((suave = true) => {
    const f = feedRef.current;
    if (!f) return;
    f.scrollTo({ top: f.scrollHeight, behavior: suave ? "smooth" : "auto" });
    setNovas(0);
    vistasRef.current = messages.length;
  }, [messages.length]);

  useLayoutEffect(() => {
    // Mensagem nova: se a pessoa está lendo o histórico mais acima — ou com a
    // gaveta recolhida —, NÃO puxamos a rolagem por baixo dela. Avisamos com a
    // pílula e ela decide quando ir ao fim.
    if (snap !== "espiada" && noFim) irAoFim(false);
    else setNovas(Math.max(0, messages.length - vistasRef.current));
  }, [messages.length, noFim, snap, irAoFim]);

  // abrir a gaveta já mostra o fim da conversa
  useEffect(() => { if (snap !== "espiada") irAoFim(false); }, [snap, irAoFim]);

  const enviar = () => {
    const t = draft.trim();
    if (!t) return;
    onSend(t);
    setDraft("");
    irAoFim();
    inputRef.current?.focus();
  };

  const altura = arrasto ?? alturaDe(snap);
  const aberto = altura > 24;

  return (
    <div
      className="relative z-20 flex shrink-0 flex-col border-t border-[#e8b04b33] bg-[#0b0a12]/95 shadow-[0_-12px_28px_rgba(0,0,0,0.55)] backdrop-blur-sm"
      style={{ paddingBottom: teclado }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* alça: arraste para abrir/fechar, toque para alternar */}
      <div
        onPointerDown={aoPegar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        className="flex cursor-grab touch-none items-center justify-center py-2 active:cursor-grabbing"
        role="button"
        aria-label={aberto ? "Recolher a conversa" : "Abrir a conversa"}
      >
        <span className="h-1 w-10 rounded-full bg-white/25" />
      </div>

      {/* feed */}
      <div
        ref={feedRef}
        onScroll={aoRolar}
        className="overflow-y-auto overscroll-contain px-3"
        style={{
          height: altura,
          // sem transição durante o arraste: o dedo tem de mandar no pixel
          transition: arrasto === null ? "height 220ms cubic-bezier(.22,.61,.36,1)" : undefined,
          WebkitOverflowScrolling: "touch",
        }}
      >
        {messages.length === 0 ? (
          <p className="py-6 text-center text-[13px] text-white/40">
            Ninguém falou ainda. Diga um oi 👋
          </p>
        ) : (
          <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-end gap-2 pb-2 pt-2">
            {messages.map((m, i) => {
              const ant = messages[i - 1];
              // mensagens seguidas da MESMA pessoa não repetem cabeçalho: o
              // feed fica mais leve e cabe mais conversa na mesma altura.
              const emenda = !m.system && !!ant && !ant.system && ant.userId === m.userId && m.ts - ant.ts < 120000;

              if (m.system) {
                return (
                  <p key={m.id} className="py-0.5 text-center text-[11px] italic text-white/40">
                    {m.text}
                  </p>
                );
              }

              const tier = getLevelTier(m.level ?? 0);
              const cor = m.isAdmin ? ADMIN_COLOR : m.me ? "#ffd889" : "#8fd3ff";

              return (
                <div key={m.id} className={emenda ? "pl-[42px]" : "flex gap-2"}>
                  {!emenda && (
                    <span
                      className="mt-[2px] inline-flex h-[22px] w-[34px] shrink-0 items-center justify-center gap-0.5 rounded-md border text-[10px] font-black leading-none"
                      style={{ color: tier.color, borderColor: `${tier.color}66`, background: `${tier.color}14` }}
                      title={`Nível ${m.level ?? 0} — ${tier.title}`}
                    >
                      <span aria-hidden="true">{tier.emoji}</span>
                      <span>{m.level ?? 0}</span>
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    {!emenda && (
                      <div className="flex items-baseline gap-1.5">
                        <span className="truncate text-[12.5px] font-black" style={{ color: cor }}>
                          {m.name}
                        </span>
                        {m.isAdmin && (
                          <span
                            className="rounded px-1 py-[1px] text-[9px] font-black leading-none"
                            style={{ background: ADMIN_COLOR, color: "#2a0a4a" }}
                          >
                            DEV
                          </span>
                        )}
                        <span className="ml-auto shrink-0 text-[10px] tabular-nums text-white/30">{hora(m.ts)}</span>
                      </div>
                    )}
                    <p className="break-words text-[14px] leading-[1.45] text-white/90">{m.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* pílula de mensagens novas — lendo o histórico ou com a gaveta fechada */}
      {novas > 0 && (
        <button
          onClick={() => { if (!aberto) onSnap("meio"); else irAoFim(); }}
          className="absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-[#e8b04b] px-3 py-1.5 text-[12px] font-black text-[#1a1206] shadow-lg"
          style={{ bottom: 74 + teclado }}
        >
          <ArrowDown className="mr-1 inline h-3.5 w-3.5" />
          {novas} nova{novas > 1 ? "s" : ""}
        </button>
      )}

      {/* barra de digitar: sempre visível, em qualquer altura da gaveta */}
      <form
        onSubmit={(e) => { e.preventDefault(); enviar(); }}
        className="mx-auto flex w-full max-w-2xl items-center gap-2 px-3 pt-2"
        style={{ paddingBottom: teclado ? 8 : "max(0.5rem, var(--safe-area-inset-bottom,env(safe-area-inset-bottom,0px)))" }}
      >
        {aberto && (
          <button
            type="button"
            onClick={() => onSnap("espiada")}
            aria-label="Recolher a conversa"
            className="shrink-0 rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white/80"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        )}
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onFocus={() => { if (snap === "espiada") onSnap("meio"); }}
          maxLength={160}
          enterKeyHint="send"
          placeholder="Conversar na sala…"
          aria-label="Mensagem"
          /* 16px não é estética: abaixo disso o iOS dá zoom no campo ao focar */
          className="min-w-0 flex-1 rounded-full border border-[#e8b04b55] bg-[#141020]/90 px-4 py-2.5 text-[16px] text-white outline-none placeholder:text-white/35 focus:border-[#e8b04b]"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          aria-label="Enviar"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8b04b] text-[#1a1206] transition active:scale-95 disabled:opacity-40"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
