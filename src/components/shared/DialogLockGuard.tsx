import { useEffect } from "react";

/** Solta as travas que um diálogo deixa no <body> (toque e rolagem). */
export const cleanupDialogLocks = () => {
  document.body.style.pointerEvents = "";
  document.body.style.overflow = "";
  document.body.removeAttribute("data-scroll-locked");
};

/** Ainda há alguma camada (diálogo, menu, popover) legitimamente aberta? */
export const temCamadaAberta = () =>
  document.querySelector(
    '[data-radix-popper-content-wrapper], [data-state="open"][role="dialog"], [data-state="open"][role="alertdialog"], [data-state="open"][role="menu"], [data-state="open"][role="listbox"]'
  ) !== null;

/**
 * VIGIA DA TRAVA DE TOQUE.
 *
 * Enquanto um diálogo está aberto, o Radix põe `pointer-events: none` no
 * <body> e devolve ao fechar. Quando o fechamento é atropelado — troca de rota
 * no mesmo toque, dois overlays ao mesmo tempo, desmontagem no meio da
 * animação — a trava FICA. Daí o app inteiro para de responder: o toque no
 * menu "não entra" e nada mais acontece, nem a limpeza por rota, que depende
 * de uma navegação que não pode mais acontecer. Este vigia desfaz a trava
 * assim que não existe mais camada aberta para justificá-la.
 */
export function DialogLockGuard({ intervaloMs = 2000, esperaMs = 300 }: { intervaloMs?: number; esperaMs?: number }) {
  useEffect(() => {
    let pendente: number | undefined;
    const conferir = () => {
      pendente = undefined;
      const b = document.body;
      const travado = b.style.pointerEvents === "none" || b.hasAttribute("data-scroll-locked");
      if (travado && !temCamadaAberta()) cleanupDialogLocks();
    };
    const agendar = () => {
      if (pendente !== undefined) return;
      // espera a animação de saída terminar antes de julgar
      pendente = window.setTimeout(conferir, esperaMs);
    };
    const obs = new MutationObserver(agendar);
    obs.observe(document.body, { attributes: true, attributeFilter: ["style", "data-scroll-locked"] });
    const zelador = window.setInterval(agendar, intervaloMs);
    return () => {
      obs.disconnect();
      window.clearInterval(zelador);
      if (pendente !== undefined) window.clearTimeout(pendente);
    };
  }, [intervaloMs, esperaMs]);

  return null;
}
