import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import type { ChatMessage } from "@/hooks/useWorldRoom";
import { getLevelTier } from "@/lib/rpgLevel";
import { useKeyboardInset } from "@/hooks/useKeyboardInset";

const ADMIN_COLOR = "#c084fc";

interface Props {
  messages: ChatMessage[];
  onSend: (texto: string) => void;
  /** avisa a sala que estou escrevendo (balão de "…" sobre a minha cabeça) */
  onTyping?: (on: boolean) => void;
}

const hora = (ts: number) =>
  new Date(ts).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

/**
 * CONVERSA DA SALA — a fala mora nos BALÕES, não numa gaveta.
 *
 * A primeira versão em pé era um bottom sheet com três alturas. Funcionava
 * como chat e destruía a sala: bastava tocar no campo para uma parede preta
 * subir e os personagens sumirem — e a sala existe para se VER as pessoas.
 *
 * Agora são duas coisas separadas:
 *
 * 1. A BARRA — fina, sempre no rodapé, e é só ela. Você escreve, o balão
 *    nasce sobre a sua cabeça e a conversa acontece na cena. Com o teclado
 *    aberto ela sobe e o mundo apenas reenquadra: ninguém desaparece.
 * 2. O PAINEL — desliza da direita quando você pede, para reler o que passou.
 *    É histórico, não é o lugar da conversa; por isso não ocupa a tela toda e
 *    o mundo continua vivo atrás dele.
 */
export function RPGRoomChat({ messages, onSend, onTyping }: Props) {
  const [draft, setDraft] = useState("");
  const [painel, setPainel] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const painelInputRef = useRef<HTMLInputElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const teclado = useKeyboardInset();

  // ---- não lidas: o crachá do botão que abre o histórico --------------------
  const vistasRef = useRef(messages.length);
  const [naoLidas, setNaoLidas] = useState(0);
  useEffect(() => {
    if (painel) { vistasRef.current = messages.length; setNaoLidas(0); return; }
    setNaoLidas(Math.max(0, messages.length - vistasRef.current));
  }, [messages.length, painel]);

  useLayoutEffect(() => {
    if (!painel) return;
    const f = feedRef.current;
    if (f) f.scrollTop = f.scrollHeight;
  }, [painel, messages.length]);

  // ---- "está digitando" -----------------------------------------------------
  // Anuncia ao escrever e cancela depois de ~2,2s parado. O timer reinicia a
  // cada tecla, então quem escreve devagar não pisca.
  const paradaRef = useRef<number | null>(null);
  const marcarDigitando = useCallback(() => {
    onTyping?.(true);
    if (paradaRef.current) window.clearTimeout(paradaRef.current);
    paradaRef.current = window.setTimeout(() => onTyping?.(false), 2200);
  }, [onTyping]);
  const pararDigitando = useCallback(() => {
    if (paradaRef.current) window.clearTimeout(paradaRef.current);
    onTyping?.(false);
  }, [onTyping]);
  useEffect(() => () => { if (paradaRef.current) window.clearTimeout(paradaRef.current); }, []);

  const enviar = (doPainel: boolean) => {
    const t = draft.trim();
    if (!t) return;
    onSend(t);
    setDraft("");
    pararDigitando();
    (doPainel ? painelInputRef : inputRef).current?.focus();
  };

  const campo = (ref: React.RefObject<HTMLInputElement>, noPainel: boolean) => (
    <form
      onSubmit={(e) => { e.preventDefault(); enviar(noPainel); }}
      className="flex min-w-0 flex-1 items-center gap-2"
    >
      <input
        ref={ref}
        value={draft}
        onChange={(e) => { setDraft(e.target.value); if (e.target.value.trim()) marcarDigitando(); }}
        onBlur={pararDigitando}
        maxLength={160}
        enterKeyHint="send"
        placeholder="Falar na sala…"
        aria-label="Mensagem"
        /* 16px não é estética: abaixo disso o iOS dá zoom no campo ao focar */
        className="min-w-0 flex-1 rounded-full border border-[#e8b04b55] bg-[#0b0a12]/85 px-4 py-2.5 text-[16px] text-white outline-none backdrop-blur-sm placeholder:text-white/40 focus:border-[#e8b04b]"
      />
      <button
        type="submit"
        disabled={!draft.trim()}
        aria-label="Enviar"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8b04b] text-[#1a1206] shadow-lg transition active:scale-95 disabled:opacity-40"
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );

  return (
    <>
      {/* ---- BARRA: flutua SOBRE o mundo, sem roubar altura dele ---------
          Ela é o único elemento fixo da conversa. Com o teclado aberto sobe
          junto; a sala inteira continua desenhada acima. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center gap-2 px-3 pt-6"
        style={{
          // o teclado é descontado pela SALA (que encolhe o mundo); aqui só a
          // área segura do aparelho, senão o desconto entraria duas vezes.
          paddingBottom: teclado ? 8 : "max(0.625rem, var(--safe-area-inset-bottom,env(safe-area-inset-bottom,0px)))",
          background: "linear-gradient(to top, rgba(7,6,12,0.82), rgba(7,6,12,0))",
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-auto flex min-w-0 flex-1 items-center gap-2">
          <button
            type="button"
            onClick={() => setPainel(true)}
            aria-label={naoLidas > 0 ? `Abrir a conversa (${naoLidas} não lidas)` : "Abrir a conversa"}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#0b0a12]/85 text-white/75 backdrop-blur-sm transition active:scale-95"
          >
            <MessageSquare className="h-5 w-5" />
            {naoLidas > 0 && (
              <span className="absolute -right-0.5 -top-0.5 min-w-[18px] rounded-full bg-[#e8b04b] px-1 text-[10px] font-black leading-[18px] text-[#1a1206]">
                {naoLidas > 9 ? "9+" : naoLidas}
              </span>
            )}
          </button>
          {campo(inputRef, false)}
        </div>
      </div>

      {/* ---- PAINEL LATERAL: o histórico, sob demanda -------------------- */}
      {painel && (
        <div
          className="absolute inset-0 z-30 flex justify-end bg-black/45"
          onPointerDown={(e) => { e.stopPropagation(); if (e.target === e.currentTarget) setPainel(false); }}
        >
          <aside
            className="flex h-full w-[min(88%,420px)] flex-col border-l border-[#e8b04b33]"
            /* opacidade e sombra por estilo: as classes de valor arbitrário
               saíram translúcidas no build e a conversa ficava ilegível por
               cima do mundo. */
            style={{ background: "rgba(11,10,18,0.97)", boxShadow: "-14px 0 34px rgba(0,0,0,0.6)" }}
          >
            <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-3 py-2.5">
              <h2 className="text-[13px] font-black uppercase tracking-wide text-white/60">Conversa da sala</h2>
              <button onClick={() => setPainel(false)} className="rounded-lg p-1.5 transition hover:bg-white/10" aria-label="Fechar a conversa">
                <X className="h-4 w-4 text-white/60" />
              </button>
            </header>

            <div ref={feedRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3">
              {messages.length === 0 ? (
                <p className="py-8 text-center text-[13px] text-white/40">
                  Ninguém falou ainda. Diga um oi 👋
                </p>
              ) : (
                <div className="flex min-h-full flex-col justify-end gap-2 py-3">
                  {messages.map((m, i) => {
                    const ant = messages[i - 1];
                    // mensagens seguidas da MESMA pessoa não repetem cabeçalho
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

            {/* dá para responder sem fechar o painel */}
            <div
              className="flex shrink-0 items-center gap-2 border-t border-white/10 px-3 pt-2"
              style={{ paddingBottom: teclado ? 8 : "max(0.5rem, var(--safe-area-inset-bottom,env(safe-area-inset-bottom,0px)))" }}
            >
              {campo(painelInputRef, true)}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
