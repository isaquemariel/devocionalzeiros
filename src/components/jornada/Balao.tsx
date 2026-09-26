import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { COR, FONTE } from "./tema";

interface Props {
  texto: string;
  /** de onde o Devocionalzeiro está falando: ao lado (padrão) ou de cima */
  rabo?: "esquerda" | "cima";
  /** avisa quando o texto terminou de "ser falado" */
  onTerminou?: () => void;
}

/** ms por caractere nas frases curtas */
const RITMO = 22;
/**
 * Teto do tempo de "fala", em ms. Uma pergunta longa a 22 ms/letra levava
 * 2,4 s para aparecer inteira — e pergunta que demora a aparecer atrasa a
 * resposta. Frase longa digita mais rápido; nenhuma passa disto.
 */
const TETO_FALA = 1000;

/**
 * O BALÃO DE FALA do Devocionalzeiro, com o texto "falado" letra a letra.
 *
 * O efeito de máquina de escrever é o que transforma uma pergunta num
 * personagem conversando — mas nunca pode virar espera: tocar no balão
 * completa a frase na hora, e quem pediu menos movimento no sistema recebe o
 * texto inteiro de uma vez.
 *
 * O texto completo fica reservado num espelho invisível: o balão já nasce do
 * tamanho final, e o layout de baixo (opções, botão) não pula a cada letra.
 */
export function Balao({ texto, onTerminou, rabo = "esquerda" }: Props) {
  const reduzir = useReducedMotion();
  // O progresso PERTENCE a um texto. Guardar só o número de letras fazia o
  // aviso de "terminei" disparar cedo: quando a frase trocava por uma mais
  // curta, o efeito de aviso rodava no mesmo ciclo com o número da frase
  // anterior — que já passava do tamanho da nova.
  const [prog, setProg] = useState({ de: texto, n: reduzir ? texto.length : 0 });
  const n = prog.de === texto ? prog.n : 0;
  const avisou = useRef<string | null>(null);

  useEffect(() => {
    if (reduzir) { setProg({ de: texto, n: texto.length }); return; }
    setProg({ de: texto, n: 0 });
    // Pelo RELÓGIO, não por contagem de tiques: contar tiques arredonda e
    // estoura o teto (85 letras a 16 ms por tique davam 1,36 s). Aqui a
    // letra mostrada é sempre a que o tempo decorrido manda.
    const passo = Math.min(RITMO, TETO_FALA / Math.max(1, texto.length));
    const t0 = performance.now();
    const id = window.setInterval(() => {
      const i = Math.min(texto.length, Math.floor((performance.now() - t0) / passo) + 1);
      setProg({ de: texto, n: i });
      if (i >= texto.length) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [texto, reduzir]);

  useEffect(() => {
    // avisa uma vez por TEXTO, e só quando é o progresso DESTE texto que chegou ao fim
    if (prog.de === texto && prog.n >= texto.length && avisou.current !== texto) {
      avisou.current = texto;
      onTerminou?.();
    }
  }, [prog, texto, onTerminou]);

  return (
    <button
      type="button"
      onClick={() => setProg({ de: texto, n: texto.length })}
      className={`relative min-w-0 cursor-default rounded-2xl border-2 px-4 py-3 ${rabo === "cima" ? "w-full text-center" : "flex-1 text-left"}`}
      style={{ background: COR.superficie, borderColor: COR.borda, fontFamily: FONTE }}
    >
      {/* rabinho apontando para o Devocionalzeiro */}
      <span
        aria-hidden="true"
        className={
          rabo === "cima"
            ? "absolute left-1/2 top-[-9px] h-4 w-4 -translate-x-1/2 rotate-45 border-l-2 border-t-2"
            : "absolute left-[-9px] top-6 h-4 w-4 rotate-45 border-b-2 border-l-2"
        }
        style={{ background: COR.superficie, borderColor: COR.borda }}
      />
      {/* a versão animada é só para os olhos; o leitor de tela ouve a frase
          inteira de uma vez, pela região viva abaixo */}
      <span className="relative block text-[17px] font-bold leading-snug" style={{ color: COR.texto }} aria-hidden="true">
        {/* espelho: ocupa o espaço final, invisível */}
        <span className="invisible">{texto}</span>
        <span className="absolute inset-0">
          {texto.slice(0, n)}
        </span>
      </span>
      <span className="sr-only" aria-live="polite">{texto}</span>
    </button>
  );
}
