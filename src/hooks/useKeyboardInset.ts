import { useEffect, useState } from "react";

/**
 * Altura do TECLADO na tela, em pixels.
 *
 * No celular o teclado não empurra layout `fixed`: ele apenas encolhe a
 * *visual viewport* e deixa o resto embaixo dele. Sem saber esse tamanho, a
 * barra de digitação do chat some atrás do teclado — a pessoa digita às cegas.
 * `visualViewport` é o único lugar que conta a verdade; onde ele não existe
 * (navegador antigo), devolve 0 e o layout segue como antes.
 */
export function useKeyboardInset(): number {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const medir = () => {
      // o que sobrou da janela por baixo da área visível = teclado (+ barras)
      const escondido = window.innerHeight - vv.height - vv.offsetTop;
      // < 80px é barra de navegação do navegador, não teclado: ignorar evita
      // o layout pular a cada rolagem.
      //
      // Arredondado em degraus de 8px: durante a animação do teclado o iOS
      // dispara `resize` a cada quadro, e cada valor novo re-renderizava a
      // sala inteira. Quem alisa o movimento é a transição CSS de quem lê
      // este número — não a quantidade de re-renders.
      const bruto = escondido > 80 ? escondido : 0;
      setInset(bruto ? Math.round(bruto / 8) * 8 : 0);
    };
    medir();
    vv.addEventListener("resize", medir);
    vv.addEventListener("scroll", medir);
    return () => {
      vv.removeEventListener("resize", medir);
      vv.removeEventListener("scroll", medir);
    };
  }, []);

  return inset;
}
