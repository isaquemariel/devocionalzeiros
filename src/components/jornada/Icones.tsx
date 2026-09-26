import type { ReactElement } from "react";
import type { IdIcone } from "@/lib/jornada/tipos";

/**
 * ÍCONES DA JORNADA, desenhados no mesmo traço — nada de emoji.
 *
 * Emoji muda de cara em cada celular (o 🙏 do Android não é o do iPhone), não
 * aceita a cor da cena e é a assinatura de tela montada às pressas. Aqui cada
 * ícone é um traço de 2 px arredondado num quadro de 24, pintado com a cor de
 * quem o usa (`currentColor`): a lanterna acesa, o selo carimbado.
 */
const TRACOS: Record<IdIcone, ReactElement> = {
  maos: (
    <>
      <path d="M12 21V11.5c0-1.2-.6-2.3-1.6-3L7.2 6.3c-.8-.5-1.8 0-1.8 1v6.4c0 1 .4 2 1.1 2.7L9 19v2" />
      <path d="M12 21V11.5c0-1.2.6-2.3 1.6-3l3.2-2.2c.8-.5 1.8 0 1.8 1v6.4c0 1-.4 2-1.1 2.7L15 19v2" />
      <path d="M12 3.2v2M9.2 3.9l.8 1.6M14.8 3.9l-.8 1.6" />
    </>
  ),
  livro: (
    <>
      <path d="M12 6.5c-1.8-1.4-4.4-2-7.5-1.8v13.2c3.1-.2 5.7.4 7.5 1.8 1.8-1.4 4.4-2 7.5-1.8V4.7c-3.1-.2-5.7.4-7.5 1.8Z" />
      <path d="M12 6.5v13.2" />
      <path d="M15.5 8.5v4.2l1.2-.9 1.2.9V8.3" />
    </>
  ),
  lampada: (
    <>
      <path d="M9 17.5h6M9.8 20.5h4.4" />
      <path d="M12 3.5a6 6 0 0 0-3.6 10.8c.5.4.9 1.1.9 1.8v1.4h5.4v-1.4c0-.7.4-1.4.9-1.8A6 6 0 0 0 12 3.5Z" />
      <path d="M12 7.5c-1.4 0-2.5 1.1-2.5 2.5" />
    </>
  ),
  pessoas: (
    <>
      <circle cx="8.5" cy="8" r="2.8" />
      <circle cx="16" cy="9" r="2.3" />
      <path d="M3.5 19.5c.3-3.1 2.4-5.2 5-5.2s4.7 2.1 5 5.2" />
      <path d="M13.8 14.6c.7-.4 1.4-.6 2.2-.6 2.2 0 3.9 1.8 4.2 4.6" />
    </>
  ),
  controle: (
    <>
      <path d="M7.5 7.5h9a4.5 4.5 0 0 1 4.4 5.4l-.8 4a2.3 2.3 0 0 1-4 1l-1.8-2.2h-4.6l-1.8 2.2a2.3 2.3 0 0 1-4-1l-.8-4a4.5 4.5 0 0 1 4.4-5.4Z" />
      <path d="M8 10.5v3M6.5 12h3" />
      <circle cx="15.5" cy="11" r=".6" fill="currentColor" />
      <circle cx="17.2" cy="13" r=".6" fill="currentColor" />
    </>
  ),
  balao: (
    <>
      <path d="M4 11.5C4 7.4 7.6 4.5 12 4.5s8 2.9 8 7-3.6 7-8 7c-1 0-2-.1-2.9-.4L5 19.5l1.2-3.3C4.8 15 4 13.3 4 11.5Z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2.6" />
    </>
  ),
  camera: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r=".7" fill="currentColor" />
    </>
  ),
  nota: (
    <>
      <path d="M13 4v11.2a3.2 3.2 0 1 1-2.4-3.1" />
      <path d="M13 4c.4 2.3 2.2 4 4.6 4.2" />
    </>
  ),
  arroba: (
    <>
      <path d="M16.2 12c0 2.4-1.9 3.6-4.2 3.6S7.8 14 7.8 12 9.7 8.4 12 8.4s4.2 1.2 4.2 3.6v1.2c0 1.2.8 2 1.9 2s1.9-1 1.9-3.2A8 8 0 1 0 16 18.9" />
    </>
  ),
  claquete: (
    <>
      <rect x="3.5" y="9" width="17" height="11" rx="2" />
      <path d="M3.8 9 19.6 5.2l-.6-2.4L3.2 6.6Z" />
      <path d="m8 5.8 2 2.8M12.5 4.7l2 2.8" />
      <path d="m10.5 12.5 4 2-4 2Z" fill="currentColor" />
    </>
  ),
  megafone: (
    <>
      <path d="M4 10v4a1 1 0 0 0 1 1h2l8 4.5v-15L7 9H5a1 1 0 0 0-1 1Z" />
      <path d="M7.5 15v3.5a1.5 1.5 0 0 0 3 0V16.5" />
      <path d="M18.5 9.5c.8.7 1.3 1.6 1.3 2.5s-.5 1.8-1.3 2.5" />
    </>
  ),
  coracao: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z" />
  ),
  play: (
    <>
      <rect x="2.8" y="5.5" width="18.4" height="13" rx="4" />
      <path d="m10 9.2 5 2.8-5 2.8Z" fill="currentColor" />
    </>
  ),
  igreja: (
    <>
      <path d="M12 2.5v4M10.2 4.3h3.6" />
      <path d="M7 11 12 6.5l5 4.5" />
      <path d="M7.5 10.5v9.5h9v-9.5" />
      <path d="M4 20h16M3.5 20v-5l4-2.5M20.5 20v-5l-4-2.5" />
      <path d="M10.5 20v-3.2a1.5 1.5 0 0 1 3 0V20" />
    </>
  ),
  lupa: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
      <path d="M8 9a3 3 0 0 1 2.5-1.5" />
    </>
  ),
  estrela: (
    <path d="m12 3.5 2.4 5.3 5.6.6-4.2 3.8 1.2 5.6L12 16l-5 2.8 1.2-5.6L4 9.4l5.6-.6Z" />
  ),
};

export function Icone({ id, tamanho = 24, className }: { id: IdIcone; tamanho?: number; className?: string }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {TRACOS[id]}
    </svg>
  );
}

/** A chama do botão principal e do medidor da senha — o traço do mascote. */
export function Chaminha({ tamanho = 18, acesa = true, className }: { tamanho?: number; acesa?: boolean; className?: string }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12.6 2.5c3.9 3.6 6.4 7.4 6.4 11.1A7 7 0 0 1 5 13.6c0-2.6 1.3-4.9 3.1-6.5.2 1.7 1 3 2.2 3.4-.6-2.9.3-5.6 2.3-8Z"
        fill={acesa ? "#3E8BFF" : "#4A3820"}
      />
      <path
        d="M12.4 10.5c1.9 1.7 3 3.4 3 5a3.4 3.4 0 0 1-6.8 0c0-1.1.5-2.1 1.3-2.8.2.9.7 1.4 1.3 1.6-.3-1.3.1-2.6 1.2-3.8Z"
        fill={acesa ? "#BFEFFF" : "#5E4A2E"}
      />
    </svg>
  );
}
