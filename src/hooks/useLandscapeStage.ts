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
  /** true enquanto NÃO conseguimos o lock nativo (o CSS está segurando) */
  usingCssFallback: boolean;
  /** força uma nova tentativa de tela cheia + travar em paisagem (botão) */
  requestLandscape: () => void;
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
  const [lockedNative, setLockedNative] = useState(false);
  // exposto ao botão "tela cheia" do palco: repete a tentativa a partir de um
  // GESTO real do usuário (é o que os navegadores exigem para fullscreen+lock)
  const lockFnRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    if (!enabled) return;
    const isMobile = Math.min(window.innerWidth, window.innerHeight) < 560;
    if (!isMobile) return;
    let cancelled = false;
    let locked = false;
    const apply = () => {
      if (cancelled) return;
      // NUNCA giramos por CSS: a rotação 90° em webview estica/deita a cena.
      // Deixamos SEMPRE em pé; só o lock nativo (quando houver) muda para
      // paisagem de verdade.
      setCssRotate(false); cssRotateRef.current = false;
    };
    const tryLock = async () => {
      // NUNCA chamar requestFullscreen — a Fullscreen API estica o app inteiro e
      // persiste ao voltar. Só travamos a orientação (útil no app nativo).
      try {
        const so = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
        if (so.lock) { await so.lock("landscape"); locked = true; setLockedNative(true); }
      } catch { /* sem lock nativo → CSS resolve */ }
      apply();
      window.setTimeout(apply, 350);
      window.setTimeout(apply, 900);
    };
    lockFnRef.current = () => { void tryLock(); };
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

  const requestLandscape = () => lockFnRef.current();

  return {
    cssRotate, cssRotateRef,
    usingCssFallback: cssRotate && !lockedNative,
    requestLandscape,
    rotateStyle, toLocal, localSize,
  };
}
