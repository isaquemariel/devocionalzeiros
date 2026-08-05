import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Capacitor } from "@capacitor/core";

// APP NATIVO (Capacitor Android/iOS): ali dá para TRAVAR a orientação em
// paisagem de verdade. No navegador / preview do Lovable isso não é possível
// (a viewport fica presa em retrato), então NÃO giramos por CSS — a cena fica
// EM PÉ, preenchendo o retrato. Assim ninguém vê a cena "deitada".
const IS_NATIVE = (() => {
  try { return Capacitor.isNativePlatform(); } catch { return false; }
})();

// ============================================================================
// LandscapeShell — TELA CHEIA PAISAGEM garantida, AUTOMÁTICA e proporcional em
// QUALQUER dispositivo. Tudo que vem DEPOIS da home do RPG (introdução, leitura,
// estudo, desafio, devocional, mapas, salas) deve ser embrulhado por este shell.
//
// Como é robusto:
//  • É renderizado via PORTAL no <body> — assim `position: fixed` é sempre
//    relativo à JANELA, mesmo quando há um ancestral com transform (framer
//    motion), que antes quebrava o preenchimento e deixava a cena "no meio".
//  • Usa medidas em PIXELS reais (innerWidth/innerHeight/visualViewport) em vez
//    de dvw/dvh (que falham em webviews como o preview) — cobre a tela inteira.
//  • Tenta o travamento NATIVO de orientação em silêncio (sem botão "tela
//    cheia"): na montagem e nos primeiros toques. Se o sistema não deixar,
//    a ROTAÇÃO por CSS assume — e o resultado é o mesmo: paisagem cheia.
//  • Expõe, por contexto, um conversor de ponteiro (toLocal) correto sob a
//    rotação, para os componentes de canvas (cena viva).
// ============================================================================

interface LandscapeCtx {
  rotated: boolean;
  /** converte clientX/Y de um evento em coords locais do elemento (pós-rotação) */
  toLocal: (clientX: number, clientY: number, el: HTMLElement) => { x: number; y: number };
}
const defaultToLocal = (clientX: number, clientY: number, el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  return { x: clientX - r.left, y: clientY - r.top };
};
const Ctx = createContext<LandscapeCtx>({ rotated: false, toLocal: defaultToLocal });

/** Contexto de paisagem para filhos (ex.: cena viva) — toLocal e se está rotacionado. */
export function useLandscape(): LandscapeCtx {
  return useContext(Ctx);
}

// tentativa SILENCIOSA de fullscreen + travar em paisagem (sem UI). Repetida em
// gestos porque os navegadores exigem interação do usuário.
function useSilentNativeLock(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (Math.min(window.innerWidth, window.innerHeight) >= 560) return; // só celular
    let done = false, tries = 0;
    const attempt = async () => {
      try { if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.(); } catch { /* segue */ }
      try {
        const so = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
        if (so.lock) { await so.lock("landscape"); done = true; }
      } catch { /* sem lock nativo → CSS resolve */ }
    };
    attempt();
    const onGesture = () => {
      if (done || tries >= 5) { window.removeEventListener("pointerdown", onGesture, true); return; }
      tries++; attempt();
    };
    window.addEventListener("pointerdown", onGesture, true);
    return () => {
      window.removeEventListener("pointerdown", onGesture, true);
      try { (screen.orientation as ScreenOrientation & { unlock?: () => void }).unlock?.(); } catch { /* ok */ }
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => undefined);
    };
  }, [enabled]);
}

export interface LandscapeShellProps {
  children: ReactNode;
  /** liga o shell (default true). Quando false, renderiza os filhos como estão. */
  enabled?: boolean;
  className?: string;
  style?: CSSProperties;
  /** z-index da camada (default 60). O modal fica acima dos mapas. */
  zIndex?: number;
  /** "landscape" (padrão): trava/gira para paisagem no nativo, em pé no navegador.
   *  "portrait": overlay EM PÉ (nunca gira nem trava), para telas que devem ficar
   *  verticais (explicações, devocional). */
  mode?: "landscape" | "portrait";
}

export function LandscapeShell({ children, enabled = true, className = "", style, zIndex = 60, mode = "landscape" }: LandscapeShellProps) {
  const [vp, setVp] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 0,
    h: typeof window !== "undefined" ? window.innerHeight : 0,
  }));
  const measure = () => {
    const vv = window.visualViewport;
    setVp({ w: Math.round(vv?.width ?? window.innerWidth), h: Math.round(vv?.height ?? window.innerHeight) });
  };
  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      vv?.removeEventListener("resize", measure);
    };
  }, []);
  const wantLandscape = mode === "landscape";
  // Só tenta travar orientação no app NATIVO e apenas nas telas de paisagem.
  useSilentNativeLock(enabled && IS_NATIVE && wantLandscape);

  const rotatedRef = useRef(false);
  if (!enabled) return <>{children}</>;

  const isMobile = Math.min(vp.w, vp.h) < 560;
  const portrait = vp.h >= vp.w;
  // Giramos por CSS APENAS no app nativo em retrato, nas telas de paisagem
  // (fallback caso o travamento nativo demore/falhe). Telas "portrait" nunca
  // giram; no navegador/preview nada gira.
  const rotated = wantLandscape && isMobile && portrait && IS_NATIVE;
  rotatedRef.current = rotated;

  // Container SEMPRE tela cheia. Em celular retrato, giramos 90° com medidas em
  // px reais (w=altura da tela, h=largura), preenchendo a janela inteira.
  const rootStyle: CSSProperties = rotated
    ? {
        position: "fixed", top: 0, left: 0,
        width: vp.h, height: vp.w,
        transformOrigin: "top left",
        transform: `translateX(${vp.w}px) rotate(90deg)`,
        zIndex, overflow: "hidden",
      }
    : { position: "fixed", inset: 0, zIndex, overflow: "hidden" };

  const toLocal = (clientX: number, clientY: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    // Sob a rotação CSS, o eixo X local aponta "para baixo" da tela física e o Y
    // "para a esquerda" — a caixa visual (getBoundingClientRect) já reflete isso.
    if (rotatedRef.current) return { x: clientY - r.top, y: r.right - clientX };
    return { x: clientX - r.left, y: clientY - r.top };
  };

  return createPortal(
    <Ctx.Provider value={{ rotated, toLocal }}>
      <div className={className} style={{ ...rootStyle, ...style }}>{children}</div>
    </Ctx.Provider>,
    document.body,
  );
}

// ============================================================================
// ChallengeStage — camada dos DESAFIOS. Ao contrário do resto, NÃO usamos
// rotação por CSS aqui: girar quebra o arraste/clique dos minijogos (o cálculo
// de posição das letras/cartas fica errado). Em vez disso, tentamos a paisagem
// NATIVA em silêncio e deixamos o conteúdo em pé — o FitBox abaixo encolhe o
// desafio (deitado) até caber inteiro na tela, centralizado e sem rolagem.
// ============================================================================
export function ChallengeStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  useSilentNativeLock(true);
  return createPortal(
    <div className={`fixed inset-0 z-[70] bg-[#0b0805] overflow-hidden ${className}`}>{children}</div>,
    document.body,
  );
}

// ============================================================================
// FitBox — renderiza o filho num "palco" de tamanho FIXO (design) e o ESCALA
// uniformemente (transform: scale) para caber inteiro no espaço disponível,
// centralizado e sem rolagem. A escala uniforme preserva o hit-test do
// ponteiro (diferente da rotação), então o desafio continua clicável.
// ============================================================================
export function FitBox({ designW, designH, children, className = "" }: { designW: number; designH: number; children: ReactNode; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const fit = () => {
      const aw = wrap.clientWidth, ah = wrap.clientHeight;
      if (!aw || !ah) return;
      const s = Math.min(aw / designW, ah / designH);
      setScale(s > 0 && isFinite(s) ? s : 1);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    return () => { ro.disconnect(); window.removeEventListener("resize", fit); window.removeEventListener("orientationchange", fit); };
  }, [designW, designH]);
  return (
    <div ref={wrapRef} className={`w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      <div style={{ width: designW, height: designH, transform: `scale(${scale})`, transformOrigin: "center center", flex: "0 0 auto", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}
