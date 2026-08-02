import { useEffect, useRef, useState } from "react";
import type React from "react";

// ============================================================================
// useLandscapeStage — tela cheia PAISAGEM garantida no celular (determinística):
// tenta fullscreen + lock nativo; o que vale é o RESULTADO — se a tela seguir
// em pé, aplica rotação CSS. Usado na CENA VIVA e nas SALAS.
//
// Retorna também um conversor de ponteiro (clientX/Y → coordenadas locais do
// container), correto sob a rotação CSS.
// ============================================================================

export interface LandscapeStage {
  cssRotate: boolean;
  cssRotateRef: React.MutableRefObject<boolean>;
  /** estilo do container raiz do palco (rotacionado quando necessário) */
  rotateStyle: React.CSSProperties;
  /** converte um evento de ponteiro em coords locais do container */
  toLocal: (clientX: number, clientY: number, el: HTMLElement) => { x: number; y: number };
  /** dimensões locais corretas do container (transform-agnósticas) */
  localSize: (el: HTMLElement) => { w: number; h: number };
}

export function useLandscapeStage(enabled = true): LandscapeStage {
  const [cssRotate, setCssRotate] = useState(false);
  const cssRotateRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const isMobile = Math.min(window.innerWidth, window.innerHeight) < 560;
    if (!isMobile) return;
    let cancelled = false;
    let locked = false;
    const apply = () => {
      if (cancelled) return;
      const p = window.matchMedia("(orientation: portrait)").matches;
      setCssRotate(p); cssRotateRef.current = p;
    };
    const tryLock = async () => {
      try {
        if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
      } catch { /* segue */ }
      try {
        const so = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
        if (so.lock) { await so.lock("landscape"); locked = true; }
      } catch { /* sem lock nativo → CSS resolve */ }
      apply();
      window.setTimeout(apply, 350);
      window.setTimeout(apply, 900);
    };
    tryLock();
    // O lock nativo (fullscreen + screen.orientation.lock) costuma exigir um
    // GESTO do usuário — na montagem ele falha e caía sempre no CSS. Com o
    // lock DE VERDADE, o sistema fica em paisagem e o TECLADO abre deitado
    // junto (chat das salas). Re-tenta nos primeiros toques na tela.
    let tries = 0;
    const onGesture = () => {
      if (cancelled || locked || tries >= 4) {
        window.removeEventListener("pointerdown", onGesture, true);
        return;
      }
      tries++;
      tryLock();
    };
    window.addEventListener("pointerdown", onGesture, true);
    const mq = window.matchMedia("(orientation: portrait)");
    const onCh = () => apply();
    mq.addEventListener?.("change", onCh);
    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", onGesture, true);
      mq.removeEventListener?.("change", onCh);
      try { (screen.orientation as ScreenOrientation & { unlock?: () => void }).unlock?.(); } catch { /* ok */ }
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => undefined);
    };
  }, [enabled]);

  const rotateStyle: React.CSSProperties = cssRotate
    ? { position: "fixed", top: 0, left: "100vw", width: "100dvh", height: "100dvw", transform: "rotate(90deg)", transformOrigin: "0 0", zIndex: 70 }
    : { position: "absolute", inset: 0 };

  const toLocal = (clientX: number, clientY: number, el: HTMLElement) => {
    // getBoundingClientRect devolve a caixa VISUAL (pós-transform) — sob a
    // rotação CSS o eixo local X aponta "para baixo" da tela física e o Y
    // aponta "para a esquerda". Usando a caixa real, o cálculo fica correto
    // mesmo para elementos que não começam no topo do viewport (ex.: sala
    // abaixo da barra de título).
    const r = el.getBoundingClientRect();
    if (cssRotateRef.current) return { x: clientY - r.top, y: r.right - clientX };
    return { x: clientX - r.left, y: clientY - r.top };
  };

  const localSize = (el: HTMLElement) => ({ w: el.offsetWidth, h: el.offsetHeight });

  return { cssRotate, cssRotateRef, rotateStyle, toLocal, localSize };
}
