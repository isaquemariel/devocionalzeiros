import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { COR, FONTE } from "./tema";

interface Props {
  texto: string;
  /** avisa quando o texto terminou de "ser falado" */
  onTerminou?: () => void;
  /** liga/desliga a boca do mascote enquanto a frase é escrita */
  onFalando?: (falando: boolean) => void;
  /** toque no balão com a frase já inteira: passa para a próxima */
  onAvancar?: () => void;
  /** há mais frases depois desta — mostra a setinha piscando */
  mais?: boolean;
}

/** ms por caractere nas frases curtas */
const RITMO = 24;
/**
 * Teto do tempo de "fala", em ms. Frase longa a 24 ms/letra levaria 2 s para
 * aparecer inteira — e pergunta que demora a aparecer atrasa a resposta.
 * Frase longa digita mais rápido; nenhuma passa disto.
 */
const TETO_FALA = 1300;

/**
 * O BALÃO DE FALA, como nos quadrinhos: contorno de tinta, cantos desiguais
 * (desenhado à mão, não um retângulo de sistema) e um rabicho que desce até a
 * boca do Devocionalzeiro, que fica à esquerda, embaixo.
 *
 * O texto é "falado" letra a letra, e a boca dele mexe junto (`onFalando`).
 * Nunca pode virar espera: tocar completa a frase na hora, e um segundo toque
 * passa para a próxima. Quem pediu menos movimento recebe a frase inteira.
 *
 * O texto completo fica num espelho invisível: o balão já nasce do tamanho
 * final e não cresce a cada letra.
 */
export function Balao({ texto, onTerminou, onFalando, onAvancar, mais }: Props) {
  const reduzir = useReducedMotion();
  // O progresso PERTENCE a um texto. Guardar só o número de letras fazia o
  // aviso de "terminei" disparar cedo: quando a frase trocava por uma mais
  // curta, o efeito de aviso rodava no mesmo ciclo com o número da anterior.
  const [prog, setProg] = useState({ de: texto, n: reduzir ? texto.length : 0 });
  const n = prog.de === texto ? prog.n : 0;
  const avisou = useRef<string | null>(null);
  const falando = useRef(onFalando);
  falando.current = onFalando;

  useEffect(() => {
    if (reduzir) { setProg({ de: texto, n: texto.length }); return; }
    setProg({ de: texto, n: 0 });
    falando.current?.(true);
    // Pelo RELÓGIO, não por contagem de tiques: contar tiques arredonda e
    // estoura o teto. A letra mostrada é sempre a que o tempo decorrido manda.
    const passo = Math.min(RITMO, TETO_FALA / Math.max(1, texto.length));
    const t0 = performance.now();
    const id = window.setInterval(() => {
      const i = Math.min(texto.length, Math.floor((performance.now() - t0) / passo) + 1);
      setProg({ de: texto, n: i });
      if (i >= texto.length) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [texto, reduzir]);

  const completo = prog.de === texto && prog.n >= texto.length;
  useEffect(() => {
    // avisa uma vez por TEXTO, e só quando é o progresso DESTE texto que chegou ao fim
    if (completo && avisou.current !== texto) {
      avisou.current = texto;
      falando.current?.(false);
      onTerminou?.();
    }
  }, [completo, texto, onTerminou]);
  useEffect(() => () => falando.current?.(false), []);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (!completo) setProg({ de: texto, n: texto.length });
        else onAvancar?.();
      }}
      className="relative block w-full cursor-default text-left"
      style={{ fontFamily: FONTE }}
    >
      <span
        className="relative block px-4 pb-3 pt-2.5"
        style={{
          background: "#FFFFFF",
          border: `2.5px solid ${COR.tinta}`,
          borderRadius: "22px 26px 24px 18px / 20px 22px 26px 24px",
          boxShadow: "3px 4px 0 rgba(27,37,80,.16)",
        }}
      >
        {/* a versão animada é só para os olhos; o leitor de tela ouve a frase
            inteira de uma vez, pela região viva abaixo */}
        <span className="relative block text-[16.5px] font-bold leading-[1.32]" style={{ color: COR.tinta }} aria-hidden="true">
          <span className="invisible">{texto}</span>
          <span className="absolute inset-0">{texto.slice(0, n)}</span>
        </span>
        {mais && completo && (
          <span className="jz-seta absolute bottom-1.5 right-3 text-[11px]" style={{ color: COR.chama }} aria-hidden="true">▼</span>
        )}
      </span>
      {/* o rabicho: desce para a esquerda, até a boca dele */}
      <svg className="absolute -bottom-[17px] left-[14px]" width="30" height="20" viewBox="0 0 30 20" aria-hidden="true">
        <path d="M6 0 C8 7 5 13 1 18 C9 16 17 10 22 0 Z" fill="#FFFFFF" />
        <path d="M6 1 C8 7 5 13 1 18 C9 16 17 10 22 1" fill="none" stroke={COR.tinta} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className="sr-only" aria-live="polite">{texto}</span>
    </button>
  );
}
