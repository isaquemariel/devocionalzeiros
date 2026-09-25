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
      setInset(escondido > 80 ? Math.round(escondido) : 0);
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
