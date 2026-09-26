import { useMemo, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Opcao } from "@/lib/jornada/tipos";
import { planoDeLeitura } from "@/lib/jornada/plano";
import { forcaSenha } from "@/lib/jornada/motor";
import { Chaminha, Icone } from "./Icones";
import { tocar } from "./Controles";
import { COR, FONTE, MAO } from "./tema";

/*
 * AS MECÂNICAS DA JORNADA — um brinquedo por pergunta.
 *
 * Nenhuma é "lista de cartões com um check": o nome é GRAVADO numa placa, os
 * motivos são lanternas que se ACENDEM, o quanto se conhece é uma planta que
 * CRESCE, a meta é um marcador que GIRA, a origem é um CARIMBO. Cada uma
 * continua sendo um controle de verdade por baixo (botão, rádio, range), com
 * teclado e leitor de tela funcionando — o brinquedo é a pele.
 */

// ─── a placa do nome ────────────────────────────────────────────────────────

/**
 * Placa de madeira fincada na beira da trilha. As letras aparecem queimadas na
 * tábua conforme se digita — cada uma com um estalo de brasa.
 */
export function Placa({ nome, largura = 132 }: { nome: string; largura?: number }) {
  const reduzir = useReducedMotion();
  const t = nome.trim();
  // a letra encolhe para o nome caber na tábua
  const fonte = Math.max(17, Math.min(34, (largura - 22) / Math.max(4, t.length * 0.52)));
  const altura = largura * 0.62;
  return (
    <div className="relative" style={{ width: largura, height: altura + 26 }} aria-hidden="true">
      {/* estacas */}
      <span className="absolute bottom-0 w-[7px] rounded-sm" style={{ left: largura * 0.2, height: altura * 0.7 + 26, background: `linear-gradient(90deg, ${COR.madeiraEscura}, ${COR.madeira})` }} />
      <span className="absolute bottom-0 w-[7px] rounded-sm" style={{ right: largura * 0.2, height: altura * 0.7 + 26, background: `linear-gradient(90deg, ${COR.madeiraEscura}, ${COR.madeira})` }} />
      {/* tábua */}
      <div
        className="absolute left-0 right-0 top-0 flex items-center justify-center overflow-hidden"
        style={{
          height: altura,
          borderRadius: "9px 7px 10px 8px",
          background: `repeating-linear-gradient(177deg, rgba(0,0,0,0) 0 9px, rgba(90,55,25,.13) 9px 10px), linear-gradient(180deg, #D7A66E, #B98149)`,
          boxShadow: `inset 0 0 0 2px ${COR.madeiraEscura}, inset 0 -5px 0 rgba(110,74,40,.35), 0 4px 0 rgba(60,35,15,.25)`,
        }}
      >
        {/* pregos */}
        {[[8, 8], [largura - 12, 8], [8, altura - 12], [largura - 12, altura - 12]].map(([x, y], i) => (
          <span key={i} className="absolute h-[5px] w-[5px] rounded-full" style={{ left: x, top: y, background: "#5B3B1E", boxShadow: "inset 1px 1px 0 rgba(255,255,255,.25)" }} />
        ))}
        {t ? (
          <span className="flex whitespace-pre px-3" style={{ fontFamily: MAO, fontWeight: 700, fontSize: fonte, color: "#4A2A12", textShadow: "0 1px 0 rgba(255,220,170,.45)" }}>
            {Array.from(t).map((c, i) => (
              <motion.span
                key={`${i}-${c}`}
                initial={reduzir ? false : { opacity: 0, scale: 1.6, filter: "blur(2px)", color: "#FF8A2A" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", color: "#4A2A12" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                {c}
              </motion.span>
            ))}
          </span>
        ) : (
          <span style={{ fontFamily: MAO, fontSize: 22, color: "rgba(74,42,18,.35)" }}>seu nome aqui</span>
        )}
      </div>
    </div>
  );
}

// ─── lanternas ──────────────────────────────────────────────────────────────

/**
 * Varal de lanternas de papel. Apagada, é papel cru; acesa, esquenta por
 * dentro, ganha uma chaminha e passa a balançar. Ao confirmar, a página as
 * solta — elas voam até a chama do Devocionalzeiro.
 */
export function Lanternas({ opcoes, marcadas, onAlternar, soltas }: {
  opcoes: Opcao[];
  marcadas: string[];
  onAlternar: (valor: string) => void;
  /** já voaram: somem do varal */
  soltas?: boolean;
}) {
  return (
    <div className="relative pt-3">
      {/* o fio do varal, em duas curvas */}
      <svg className="pointer-events-none absolute inset-x-0 top-0 h-[150px] w-full" viewBox="0 0 300 150" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-4 6 Q150 26 304 6" fill="none" stroke={COR.lapis} strokeWidth="1.4" strokeDasharray="1 3" strokeLinecap="round" />
        <path d="M-4 84 Q150 104 304 84" fill="none" stroke={COR.lapis} strokeWidth="1.4" strokeDasharray="1 3" strokeLinecap="round" />
      </svg>
      <div className="relative grid grid-cols-3 gap-x-2 gap-y-1" role="group" aria-label="Seus motivos">
        {opcoes.map((o, i) => {
          const acesa = marcadas.includes(o.valor);
          return (
            <button
              key={o.valor}
              type="button"
              role="checkbox"
              aria-checked={acesa}
              aria-label={o.rotulo}
              data-lanterna={o.valor}
              onClick={() => { tocar(acesa ? 6 : 14); onAlternar(o.valor); }}
              className="group flex flex-col items-center outline-none"
              style={{ opacity: soltas && acesa ? 0 : 1, transition: "opacity 200ms" }}
            >
              <span className={`relative flex flex-col items-center ${acesa ? "jz-balanca" : ""}`} style={{ animationDelay: `${-i * 0.37}s`, transformOrigin: "50% 0" }}>
                <span className="h-3 w-px" style={{ background: COR.lapis }} />
                {/* tampa */}
                <span className="h-[5px] w-[26px] rounded-t-[4px]" style={{ background: "#7A5530" }} />
                {/* papel */}
                <span
                  data-papel
                  className="relative flex h-[58px] w-[50px] items-center justify-center overflow-hidden transition-[background,box-shadow] duration-300 group-focus-visible:ring-2"
                  style={{
                    borderRadius: "16px 16px 18px 18px / 20px 20px 24px 24px",
                    background: acesa
                      ? "radial-gradient(circle at 50% 62%, #FFF6C9 0%, #FFD36B 38%, #FF9F3A 100%)"
                      : "linear-gradient(180deg, #F6EBD6, #E9D8B9)",
                    boxShadow: acesa
                      ? "0 0 0 1.5px #D9781E, 0 0 22px 4px rgba(255,170,60,.55)"
                      : "0 0 0 1.5px #CDB892",
                    color: acesa ? "#9B3F00" : "#B29C77",
                  }}
                >
                  {/* costelas do papel */}
                  {[-14, 0, 14].map((x) => (
                    <span key={x} className="absolute inset-y-0 w-px" style={{ left: 25 + x, background: acesa ? "rgba(190,90,0,.22)" : "rgba(160,130,90,.25)" }} />
                  ))}
                  <Icone id={o.icone ?? "estrela"} tamanho={24} className="relative" />
                  {acesa && <span className="jz-pisca absolute bottom-[5px] h-[9px] w-[6px] rounded-full" style={{ background: "#FF7A1A", filter: "blur(.4px)" }} />}
                </span>
                <span className="h-[4px] w-[20px] rounded-b-[3px]" style={{ background: "#7A5530" }} />
              </span>
              <span
                className="mt-1.5 min-h-[34px] text-center text-[13px] font-extrabold leading-[1.2]"
                style={{ color: acesa ? COR.tinta : COR.tinta2, fontFamily: FONTE }}
              >
                {o.rotulo}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── a planta que cresce ────────────────────────────────────────────────────

/** Semente → broto → muda → árvore → árvore com fruto. Cresce com mola. */
export function Planta({ nivel }: { nivel: number }) {
  const cresce = "transform 520ms cubic-bezier(.34,1.56,.64,1), opacity 300ms";
  const parte = (de: number, origem: string) => ({
    transform: nivel >= de ? "scale(1)" : "scale(0)",
    opacity: nivel >= de ? 1 : 0,
    transformOrigin: origem,
    transformBox: "fill-box" as const,
    transition: cresce,
  });
  return (
    <svg viewBox="0 0 160 130" className="h-[118px] w-[146px]" aria-hidden="true">
      {/* chão */}
      <ellipse cx="80" cy="118" rx="62" ry="9" fill="#C99A6B" />
      <ellipse cx="80" cy="115" rx="54" ry="6" fill="#DDB183" />
      {/* semente: só ela, no nível 0 */}
      <g style={{ opacity: nivel === 0 ? 1 : 0, transition: "opacity 250ms" }}>
        <ellipse cx="80" cy="112" rx="7" ry="4.6" fill="#8A5A2F" transform="rotate(-12 80 112)" />
        <path d="M76 111 Q80 108 84 110" stroke="#B98352" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>
      {/* broto */}
      <g style={parte(1, "50% 100%")}>
        <path d="M80 114 C80 104 81 96 80 88" stroke="#3E9B4F" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M80 94 C72 92 68 86 69 82 C75 82 79 87 80 94 Z" fill="#5CC46B" />
        <path d="M80 91 C88 89 92 83 91 79 C85 79 81 84 80 91 Z" fill="#4DB35D" />
      </g>
      {/* muda: caule mais alto, mais folhas */}
      <g style={parte(2, "50% 100%")}>
        <path d="M80 88 C79 78 81 70 80 60" stroke="#3E9B4F" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M80 74 C70 73 64 66 65 61 C73 60 78 66 80 74 Z" fill="#5CC46B" />
        <path d="M80 68 C90 67 96 60 95 55 C87 54 82 60 80 68 Z" fill="#4DB35D" />
        <path d="M80 61 C76 56 76 50 79 46 C83 50 83 56 80 61 Z" fill="#6ED47C" />
      </g>
      {/* árvore: tronco e copa */}
      <g style={parte(3, "50% 100%")}>
        <path d="M74 116 C76 100 75 80 77 62 L83 62 C85 80 84 100 86 116 Z" fill="#8A5A34" />
        <path d="M78 84 C70 78 66 76 60 77" stroke="#8A5A34" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="80" cy="46" r="30" fill="#3FA85A" />
        <circle cx="60" cy="58" r="18" fill="#47B563" />
        <circle cx="101" cy="56" r="19" fill="#379C50" />
        <circle cx="70" cy="36" r="10" fill="#FFFFFF" opacity="0.14" />
      </g>
      {/* fruto: cachos de uva */}
      <g style={parte(4, "50% 50%")}>
        {[[64, 58], [98, 62], [84, 34], [72, 44]].map(([x, y], i) => (
          <g key={i}>
            {[[0, 0], [5, 0], [2.5, 4.5], [-2.5, 4.5], [7.5, 4.5], [0, 9], [5, 9], [2.5, 13.5]].map(([dx, dy], j) => (
              <circle key={j} cx={x + dx} cy={y + dy} r="2.9" fill={j % 3 === 0 ? "#7B3FB8" : "#8E4FCC"} />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

export function Escala({ opcoes, valor, onMudar }: { opcoes: Opcao[]; valor: string | null; onMudar: (v: string) => void }) {
  const i = Math.max(0, opcoes.findIndex((o) => o.valor === valor));
  const atual = opcoes[i];
  const tocado = valor !== null;
  const ultimo = useRef(i);
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full items-center gap-3">
        <Planta nivel={tocado ? atual.nivel ?? i : 0} />
        <div className="min-w-0 flex-1">
          <p className="text-[27px] leading-none" style={{ fontFamily: MAO, fontWeight: 700, color: COR.verde }}>
            {tocado ? atual.detalhe : "Semente?"}
          </p>
          <p className="mt-1 text-[16px] font-extrabold leading-tight" style={{ color: COR.tinta, fontFamily: FONTE }}>
            {tocado ? atual.rotulo : "Arrasta e me mostra"}
          </p>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={opcoes.length - 1}
        step={1}
        value={i}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (n !== ultimo.current) { ultimo.current = n; tocar(10); }
          onMudar(opcoes[n].valor);
        }}
        onPointerDown={() => { if (!tocado) onMudar(opcoes[i].valor); }}
        aria-label="Quanto você já conhece da Bíblia"
        aria-valuetext={atual.rotulo}
        className="jz-range mt-3 w-full"
        style={{ ["--jz-p" as string]: `${(i / (opcoes.length - 1)) * 100}%` }}
      />
      <div className="mt-1 flex w-full justify-between px-0.5 text-[12px] font-bold" style={{ color: COR.tinta3, fontFamily: FONTE }}>
        <span>começando</span>
        <span>a Bíblia inteira</span>
      </div>
    </div>
  );
}

// ─── o mostrador da meta ────────────────────────────────────────────────────

const ANG = [158, 113, 67, 22]; // graus, da esquerda para a direita
const CX = 130, CY = 124, R = 96;
const ponto = (a: number, r = R) => ({ x: CX + r * Math.cos((a * Math.PI) / 180), y: CY - r * Math.sin((a * Math.PI) / 180) });

/**
 * Um marcador de meia-lua, como o de um fogão: arrasta-se a alça (ou toca-se
 * no número) e ela encaixa numa das quatro marcas. Embaixo, o plano de
 * leitura muda ao vivo — é aqui que a pessoa vê o que cada minuto compra.
 */
export function Mostrador({ opcoes, valor, onMudar }: { opcoes: Opcao[]; valor: string; onMudar: (v: string) => void }) {
  const reduzir = useReducedMotion();
  const svg = useRef<SVGSVGElement>(null);
  const i = Math.max(0, opcoes.findIndex((o) => o.valor === valor));
  const atual = opcoes[i];
  const minutos = Number(atual.valor);
  const p = useMemo(() => planoDeLeitura(minutos), [minutos]);
  const alca = ponto(ANG[i]);

  const escolherPeloPonteiro = (ev: React.PointerEvent) => {
    const el = svg.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((ev.clientX - r.left) / r.width) * 260 - CX;
    const y = CY - ((ev.clientY - r.top) / r.height) * 150;
    const a = (Math.atan2(Math.max(y, -20), x) * 180) / Math.PI;
    let melhor = 0;
    ANG.forEach((g, k) => { if (Math.abs(g - a) < Math.abs(ANG[melhor] - a)) melhor = k; });
    if (opcoes[melhor].valor !== valor) { tocar(12); onMudar(opcoes[melhor].valor); }
  };

  const ritmo = p.capitulosPorDia.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

  return (
    <div className="flex flex-col items-center" style={{ fontFamily: FONTE }}>
      <svg
        ref={svg}
        viewBox="0 0 260 150"
        className="w-full max-w-[290px] touch-none select-none"
        onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); escolherPeloPonteiro(e); }}
        onPointerMove={(e) => { if (e.buttons) escolherPeloPonteiro(e); }}
        role="radiogroup"
        aria-label="Minutos por dia"
      >
        <defs>
          <linearGradient id="jz-arco" x1="0" x2="1">
            <stop offset="0%" stopColor="#BFD8FF" />
            <stop offset="100%" stopColor={COR.chamaFunda} />
          </linearGradient>
        </defs>
        {/* trilho */}
        <path d={`M${CX - R} ${CY} A${R} ${R} 0 0 1 ${CX + R} ${CY}`} fill="none" stroke="#EFE5D1" strokeWidth="20" strokeLinecap="round" />
        {/* parte cheia até a alça */}
        <path
          d={`M${CX - R} ${CY} A${R} ${R} 0 0 1 ${alca.x.toFixed(1)} ${alca.y.toFixed(1)}`}
          fill="none" stroke="url(#jz-arco)" strokeWidth="20" strokeLinecap="round"
        />
        {/* marcas e números */}
        {opcoes.map((o, k) => {
          const m = ponto(ANG[k], R + 24);
          const d = ponto(ANG[k], R - 18);
          const marcado = k === i;
          return (
            <g key={o.valor} role="radio" aria-checked={marcado} aria-label={`${o.rotulo} por dia, ${o.detalhe}`} tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onMudar(o.valor); } }}
              className="cursor-pointer outline-none">
              <circle cx={d.x} cy={d.y} r="2.2" fill={marcado ? COR.chama : "#D6CAB2"} />
              <text x={m.x} y={m.y + 5} textAnchor="middle" fontSize="15" fontWeight="900" fill={marcado ? COR.chama : COR.tinta3} style={{ fontFamily: FONTE }}>
                {o.valor}
              </text>
            </g>
          );
        })}
        {/* alça */}
        <g style={{ transform: `translate(${alca.x}px, ${alca.y}px)`, transition: reduzir ? undefined : "transform 380ms cubic-bezier(.34,1.56,.64,1)" }}>
          <circle r="16" fill="#FFFFFF" stroke={COR.chama} strokeWidth="3" />
          <path d="M0.5 -8c3.4 3.1 5.6 6.4 5.6 9.7A6 6 0 0 1-6 1.7c0-2.3 1.1-4.3 2.7-5.7.2 1.5.9 2.6 1.9 3-.5-2.5.3-4.9 1.9-7Z" fill={COR.chama} />
        </g>
        {/* o número no meio */}
        <text x={CX} y={CY - 32} textAnchor="middle" fontSize="36" fontWeight="900" fill={COR.tinta} style={{ fontFamily: FONTE }}>{minutos}</text>
        <text x={CX} y={CY - 12} textAnchor="middle" fontSize="13" fontWeight="800" fill={COR.tinta2} style={{ fontFamily: FONTE }}>min por dia</text>
      </svg>

      <p className="-mt-1 text-[26px] leading-none" style={{ fontFamily: MAO, fontWeight: 700, color: COR.chama }}>{atual.detalhe}</p>

      {/* o plano, ao vivo */}
      <div className="mt-3 grid w-full grid-cols-3 gap-2">
        {[
          { rotulo: "por dia", valor: `${ritmo} cap.` },
          { rotulo: "Novo Testamento", valor: p.novoTestamento.replace("cerca de ", "") },
          { rotulo: "a Bíblia inteira", valor: p.biblia.replace("cerca de ", "") },
        ].map((c) => (
          <div key={c.rotulo} className="rounded-2xl px-2 py-2 text-center" style={{ background: COR.papelSombra }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={c.valor}
                initial={reduzir ? false : { y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="block text-[16px] font-black leading-tight"
                style={{ color: COR.tinta }}
              >
                {c.valor}
              </motion.span>
            </AnimatePresence>
            <span className="block text-[11.5px] font-bold leading-tight" style={{ color: COR.tinta2 }}>{c.rotulo}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[11.5px] font-semibold" style={{ color: COR.tinta3 }}>
        estimativa: uns 3,5 minutos por capítulo
      </p>
    </div>
  );
}

// ─── selos ──────────────────────────────────────────────────────────────────

/**
 * Um selo por lugar de onde se vem. Tocar CARIMBA: o selo desce torto, a tinta
 * espirra num anel, e a página segue sozinha — escolha única não precisa de
 * botão de confirmar.
 */
export function Selos({ opcoes, valor, onEscolher }: { opcoes: Opcao[]; valor: string | null; onEscolher: (v: string) => void }) {
  const reduzir = useReducedMotion();
  return (
    <div className="grid grid-cols-5 gap-x-1 gap-y-2.5" role="radiogroup" aria-label="Por onde você conheceu">
      {opcoes.map((o, k) => {
        const marcado = valor === o.valor;
        const cor = o.cor ?? COR.chama;
        return (
          <button
            key={o.valor}
            type="button"
            role="radio"
            aria-checked={marcado}
            onClick={() => { if (valor) return; tocar(18); onEscolher(o.valor); }}
            className="flex flex-col items-center outline-none"
          >
            <motion.span
              className="relative flex h-[54px] w-[54px] items-center justify-center rounded-full"
              animate={marcado && !reduzir ? { scale: [1.5, 0.92, 1], rotate: [-18, -8, -8] } : { scale: 1, rotate: k % 2 ? 3 : -3 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              style={{
                background: marcado ? cor : "#FFFFFF",
                color: marcado ? "#FFFFFF" : cor,
                boxShadow: marcado ? `0 0 0 3px ${COR.papel}, 0 0 0 5px ${cor}` : `inset 0 0 0 2px ${cor}33`,
                opacity: valor && !marcado ? 0.4 : 1,
                transition: "opacity 250ms",
              }}
            >
              {/* borda serrilhada de selo */}
              <span className="absolute inset-[4px] rounded-full" style={{ border: `1.5px dashed ${marcado ? "rgba(255,255,255,.6)" : cor + "66"}` }} />
              <Icone id={o.icone ?? "estrela"} tamanho={24} className="relative" />
              {marcado && !reduzir && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ border: `3px solid ${cor}` }}
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 1.9, opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                />
              )}
            </motion.span>
            <span className="mt-1.5 text-center text-[11.5px] font-extrabold leading-[1.15]" style={{ color: marcado ? COR.tinta : COR.tinta2, fontFamily: FONTE }}>
              {o.rotulo}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── medidor da senha ───────────────────────────────────────────────────────

/** Quatro chaminhas que acendem conforme a senha fica forte. */
export function MedidorSenha({ senha }: { senha: string }) {
  const f = forcaSenha(senha);
  const rotulos = ["", "fraquinha", "dá pro gasto", "boa", "forte"];
  if (!senha) return null;
  return (
    <div className="mt-2.5 flex items-center gap-1.5 px-1" aria-live="polite">
      {[1, 2, 3, 4].map((i) => (
        <motion.span key={i} animate={{ scale: i === f ? [1, 1.35, 1] : 1 }} transition={{ duration: 0.3 }}>
          <Chaminha tamanho={18} acesa={i <= f} />
        </motion.span>
      ))}
      <span className="ml-1 text-[19px] leading-none" style={{ fontFamily: MAO, fontWeight: 700, color: f >= 3 ? COR.chama : COR.lapis }}>
        {rotulos[f]}
      </span>
    </div>
  );
}
