import { memo, useId, useMemo } from "react";
import { misturar, naLuz, type Momento } from "@/lib/ceu";

/**
 * A CENA DO DIA — Jerusalém do primeiro século, na luz da hora de agora.
 *
 * O desenho é o mesmo o dia inteiro; o que muda é a LUZ (`Momento`, de
 * `lib/ceu`): o céu, o sol ou a lua (na fase certa), as estrelas, a cor das
 * pedras (azuladas à noite, douradas no pôr do sol), as janelas e as tochas
 * que acendem ao anoitecer, as aves de dia e os vaga-lumes à noite.
 *
 * Geometria: 800 unidades de altura, sempre inteiras na tela; a largura cresce
 * com a tela (num computador, a cidade continua para os lados em vez de a
 * cena esticar). A estrada fica em y = ESTRADA — quem põe o personagem em pé
 * nela converte com `yNaTela`.
 */

export const ALTURA = 800;
export const ESTRADA = 572;
export const yNaTela = (y: number, alturaTela: number) => (y / ALTURA) * alturaTela;

/** gerador com semente fixa: a cidade é sempre a mesma, e não "pula" a cada render */
function semente(n: number) {
  let s = n;
  return () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
}

interface Props {
  momento: Momento;
  /** largura/altura da tela */
  proporcao: number;
  reduzir?: boolean;
}

export const CenaDoDia = memo(function CenaDoDia({ momento: m, proporcao, reduzir }: Props) {
  const uid = useId().replace(/:/g, "");
  const L = Math.max(400, Math.round(ALTURA * proporcao));
  const c0 = L / 2;

  // ─── o que não muda com a hora (posições) ────────────────────────────────
  const fixo = useMemo(() => {
    const r = semente(7);
    const estrelas = Array.from({ length: Math.round(L / 5) }, () => ({
      x: r() * L, y: r() * 360, r: 0.5 + r() * 1.4, d: 2 + r() * 4, a: r() * 5,
    }));
    const nuvens = Array.from({ length: Math.max(3, Math.round(L / 170)) }, (_, i) => ({
      x: (i / Math.max(3, Math.round(L / 170))) * L + r() * 80, y: 90 + r() * 170, w: 90 + r() * 110, d: 60 + r() * 60,
    }));
    // o casario: três fileiras de casas de teto chato, subindo o monte
    const casas: { x: number; y: number; w: number; h: number; janelas: { x: number; y: number; f: number }[] }[] = [];
    for (let fila = 0; fila < 3; fila++) {
      let x = -20 + r() * 20;
      const base = 470 - fila * 26;
      while (x < L + 20) {
        const w = 22 + r() * 34, h = 20 + r() * 26 + fila * 6;
        const janelas = Array.from({ length: 1 + Math.floor(r() * 2) }, () => ({ x: x + 4 + r() * (w - 12), y: base - h + 6 + r() * (h - 14), f: r() }));
        casas.push({ x, y: base - h, w, h, janelas });
        x += w + 2 + r() * 6;
      }
    }
    const oliveiras = Array.from({ length: Math.round(L / 60) }, () => ({ x: r() * L, y: 540 + r() * 20, s: 0.7 + r() * 0.6 }));
    const vagalumes = Array.from({ length: 14 }, () => ({ x: r() * L, y: 480 + r() * 150, d: 3 + r() * 4, a: r() * 5 }));
    return { estrelas, nuvens, casas, oliveiras, vagalumes };
  }, [L]);

  // ─── cores da hora ───────────────────────────────────────────────────────
  const pedra = naLuz(m, "#e6cc98", "#2a3050");
  const pedraSombra = naLuz(m, "#b99a68", "#1b2038");
  const muralha = naLuz(m, "#d9bb84", "#252a47");
  const monte = naLuz(m, "#b8a27c", "#1a1f3a", "#e08a58");
  const monteLonge = misturar(naLuz(m, "#a9b3c2", "#141a33", "#d88b6e"), m.ceu.horizonte, 0.45);
  const chao = naLuz(m, "#c9ad7c", "#1d2136");
  const estrada = naLuz(m, "#d8c29a", "#2b3150");
  const verde = naLuz(m, "#6f8a52", "#1c2a2a");
  const tetoTemplo = naLuz(m, "#f4d27a", "#6b5a2e", "#ffb45a");
  const luzJanela = "#ffc766";
  const noite = 1 - m.luz;

  // A PARALAXE não passa pelo React: quem usa a cena escreve `--dz-px` e
  // `--dz-py` (-1..1) num ancestral, e cada camada anda na sua profundidade
  // pelo CSS — mexer o ponteiro não redesenha centenas de elementos.
  const cam = (k: number) => (reduzir ? undefined : { transform: `translate(calc(var(--dz-px, 0) * ${k}px), calc(var(--dz-py, 0) * ${Math.round(k * 0.3)}px))` });
  const sol = { x: m.sol.x * L, y: 470 - m.sol.altura * 360 };
  const lua = { x: m.lua.x * L, y: 470 - m.lua.altura * 330 };
  // a sombra da lua desliza com a fase (0 nova, 0,5 cheia)
  const faseLua = m.lua.fase;
  const iluminada = 1 - Math.abs(faseLua - 0.5) * 2; // 0 nova · 1 cheia
  const lado = faseLua < 0.5 ? 1 : -1;

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${L} ${ALTURA}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        {/* o horizonte de verdade fica atrás da muralha (y ≈ 470): o degradê termina
            ali, senão a cor da aurora e do poente cairia escondida atrás da cidade */}
        <linearGradient id={`ceu-${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="480">
          <stop offset="0%" stopColor={m.ceu.topo} />
          <stop offset="55%" stopColor={m.ceu.meio} />
          <stop offset="100%" stopColor={m.ceu.horizonte} />
        </linearGradient>
        <radialGradient id={`sol-${uid}`}>
          <stop offset="0%" stopColor="#fff8dc" />
          <stop offset="35%" stopColor={misturar("#fff1b0", "#ff9a4a", m.calor)} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffb45a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`luar-${uid}`}>
          <stop offset="0%" stopColor="#e8f0ff" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#e8f0ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`gloria-${uid}`}>
          <stop offset="0%" stopColor="#ffe6a0" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffe6a0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`tocha-${uid}`}>
          <stop offset="0%" stopColor="#ffcf73" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff8a3a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`bruma-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={m.ceu.horizonte} stopOpacity="0" />
          <stop offset="100%" stopColor={m.ceu.horizonte} stopOpacity="0.7" />
        </linearGradient>
        <clipPath id={`lua-${uid}`}><circle cx={lua.x} cy={lua.y} r="17" /></clipPath>
        <pattern id={`lajes-${uid}`} width="34" height="14" patternUnits="userSpaceOnUse">
          <rect width="34" height="14" fill={estrada} />
          <path d="M0 13.5 H34 M17 0 V7 M0 7 H34 M5 7 V14 M26 7 V14" stroke={pedraSombra} strokeOpacity="0.55" strokeWidth="1" />
        </pattern>
      </defs>

      {/* o céu */}
      <rect width={L} height={ALTURA} fill={`url(#ceu-${uid})`} />

      {/* estrelas: piscam devagar, cada uma no seu tempo */}
      {m.estrelas > 0.01 && (
        <g opacity={m.estrelas} style={cam(-4)}>
          {fixo.estrelas.map((e, i) => (
            <circle key={i} cx={e.x} cy={e.y} r={e.r} fill="#fff8e6" className={reduzir ? undefined : "dz-piscar"} style={{ animationDuration: `${e.d}s`, animationDelay: `-${e.a}s` }} />
          ))}
        </g>
      )}

      {/* o sol, com o halo que se abre no nascer e no pôr */}
      {m.sol.visivel && (
        <g style={cam(-6)}>
          <circle cx={sol.x} cy={sol.y} r={70 + m.calor * 50} fill={`url(#sol-${uid})`} />
          <circle cx={sol.x} cy={sol.y} r="22" fill={misturar("#fffbe8", "#ffc46a", m.calor)} />
        </g>
      )}

      {/* a lua, na fase de hoje */}
      {m.lua.visivel && (
        <g style={cam(-6)}>
          <circle cx={lua.x} cy={lua.y} r={46 + iluminada * 26} fill={`url(#luar-${uid})`} />
          <circle cx={lua.x} cy={lua.y} r="17" fill="#2a3358" />
          <g clipPath={`url(#lua-${uid})`}>
            {/* a parte iluminada: um disco que se desloca com a fase */}
            <ellipse cx={lua.x + lado * (1 - iluminada) * 17} cy={lua.y} rx={17} ry={17} fill="#f3f1e2" />
            <circle cx={lua.x - 5} cy={lua.y - 4} r="3" fill="#d8d4bf" opacity="0.6" />
            <circle cx={lua.x + 6} cy={lua.y + 5} r="2.2" fill="#d8d4bf" opacity="0.5" />
          </g>
        </g>
      )}

      {/* nuvens, que andam com o vento e pegam a cor da hora */}
      <g style={cam(-10)} opacity={0.35 + m.luz * 0.5}>
        {fixo.nuvens.map((n, i) => (
          <g key={i} className={reduzir ? undefined : "dz-nuvem"} style={{ animationDuration: `${n.d}s`, animationDelay: `-${(i * 13) % n.d}s` }}>
            <ellipse cx={n.x} cy={n.y} rx={n.w / 2} ry={n.w / 9} fill={naLuz(m, "#ffffff", "#39426e", "#ffb48a")} />
            <ellipse cx={n.x - n.w * 0.18} cy={n.y - n.w / 14} rx={n.w / 4} ry={n.w / 10} fill={naLuz(m, "#ffffff", "#39426e", "#ffb48a")} />
          </g>
        ))}
      </g>

      {/* aves de dia */}
      {m.luz > 0.6 && !reduzir && (
        <g className="dz-aves" opacity={0.7}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${40 + i * 22} ${190 + (i % 2) * 10} q6 -6 12 0 q6 -6 12 0`} fill="none" stroke={naLuz(m, "#3b3a44", "#9aa3c7")} strokeWidth="1.8" strokeLinecap="round" />
          ))}
        </g>
      )}

      {/* o monte das Oliveiras, ao longe */}
      <path
        style={cam(-14)}
        d={`M-40 440 C ${L * 0.15} 360 ${L * 0.3} 380 ${L * 0.45} 410 S ${L * 0.8} 350 ${L + 40} 400 V ${ALTURA} H -40 Z`}
        fill={monteLonge}
      />

      {/* o monte do Templo, com o casario subindo */}
      <g style={cam(-20)}>
        <path d={`M-40 470 C ${c0 - 260} 430 ${c0 - 120} 380 ${c0} 372 S ${c0 + 260} 430 ${L + 40} 470 V ${ALTURA} H -40 Z`} fill={monte} />
        {fixo.casas.map((h, i) => (
          <g key={i}>
            <rect x={h.x} y={h.y} width={h.w} height={h.h} fill={i % 3 ? pedra : pedraSombra} />
            <rect x={h.x - 1} y={h.y - 2} width={h.w + 2} height="3" fill={pedraSombra} />
            {h.janelas.map((j, k) => (
              <rect
                key={k} x={j.x} y={j.y} width="4" height="5" rx="1"
                fill={m.janelas * (j.f > 0.25 ? 1 : 0.3) > 0.05 ? luzJanela : pedraSombra}
                opacity={Math.max(0.35, m.janelas * (j.f > 0.25 ? 1 : 0.35))}
                className={m.janelas > 0.3 && !reduzir && j.f > 0.8 ? "dz-lamparina" : undefined}
              />
            ))}
          </g>
        ))}

        {/* o Templo, no alto: pedra branca e ouro — a glória acende à noite */}
        <g transform={`translate(${c0} 0)`}>
          <circle cx="0" cy="300" r={110} fill={`url(#gloria-${uid})`} opacity={0.25 + noite * 0.55} />
          <rect x="-88" y="352" width="176" height="22" fill={pedraSombra} />
          <rect x="-70" y="306" width="140" height="48" fill={naLuz(m, "#f4ecd8", "#3b4166")} />
          {[-56, -36, -16, 4, 24, 44].map((x) => <rect key={x} x={x} y="314" width="8" height="40" fill={naLuz(m, "#e0d4b4", "#2d3252")} />)}
          <rect x="-30" y="266" width="60" height="42" fill={naLuz(m, "#fbf5e6", "#434a72")} />
          <rect x="-12" y="282" width="24" height="26" rx="12" fill={naLuz(m, "#8a6a3a", "#1b1f38")} />
          <rect x="-80" y="300" width="160" height="7" fill={tetoTemplo} />
          <rect x="-36" y="260" width="72" height="7" fill={tetoTemplo} />
          {[-30, -18, -6, 6, 18, 30].map((x) => <rect key={x} x={x - 1.5} y="252" width="3" height="8" fill={tetoTemplo} />)}
        </g>

        {/* a muralha, com torres, ameias e a porta em arco */}
        <rect x="-40" y="468" width={L + 80} height="44" fill={muralha} />
        {Array.from({ length: Math.ceil((L + 80) / 14) }, (_, i) => (
          <rect key={i} x={-40 + i * 14} y="462" width="8" height="7" fill={muralha} />
        ))}
        {Array.from({ length: Math.ceil(L / 180) + 1 }, (_, i) => {
          const x = 60 + i * 180 - (L % 180) / 2;
          return (
            <g key={i}>
              <rect x={x - 16} y="440" width="32" height="72" fill={pedraSombra} />
              {[0, 1, 2].map((k) => <rect key={k} x={x - 16 + k * 12} y="433" width="8" height="8" fill={pedraSombra} />)}
              <rect x={x - 3} y="456" width="6" height="11" rx="3" fill={m.janelas > 0.1 ? luzJanela : "#1b1f38"} opacity={Math.max(0.3, m.janelas)} />
              {/* a tocha da torre, acesa ao anoitecer */}
              {m.janelas > 0.3 && (
                <g className={reduzir ? undefined : "dz-tocha"}>
                  <circle cx={x + 22} cy="452" r="18" fill={`url(#tocha-${uid})`} opacity={m.janelas} />
                  <path d={`M${x + 22} 443 q4 5 0 9 q-4 -4 0 -9`} fill="#ffb347" opacity={m.janelas} />
                </g>
              )}
            </g>
          );
        })}
        <rect x={c0 - 26} y="474" width="52" height="38" rx="0" fill={pedraSombra} />
        <path d={`M${c0 - 18} 512 V 488 a18 18 0 0 1 36 0 V 512 Z`} fill={misturar("#3a2a18", "#0d1022", noite)} />
        {m.janelas > 0.2 && <path d={`M${c0 - 18} 512 V 488 a18 18 0 0 1 36 0 V 512 Z`} fill="#ffb35a" opacity={m.janelas * 0.35} />}
      </g>

      {/* a bruma da manhã e do anoitecer, no pé da muralha */}
      <rect x="0" y="470" width={L} height="70" fill={`url(#bruma-${uid})`} opacity={0.25 + m.calor * 0.5} />

      {/* o chão, as oliveiras e a estrada de pedra onde ele fica */}
      <g style={cam(-32)}>
        <rect x="-60" y="512" width={L + 120} height={ALTURA - 512} fill={chao} />
        {fixo.oliveiras.map((o, i) => (
          <g key={i} transform={`translate(${o.x} ${o.y}) scale(${o.s})`}>
            <rect x="-2" y="-6" width="4" height="14" fill={naLuz(m, "#6b5236", "#1a1a26")} />
            <ellipse cx="0" cy="-12" rx="15" ry="10" fill={verde} />
            <ellipse cx="-7" cy="-9" rx="8" ry="6" fill={misturar(verde, "#000000", 0.15)} />
          </g>
        ))}
        <rect x="-60" y={ESTRADA - 6} width={L + 120} height="44" fill={`url(#lajes-${uid})`} />
        <rect x="-60" y={ESTRADA - 9} width={L + 120} height="4" fill={pedraSombra} />
        <rect x="-60" y={ESTRADA + 38} width={L + 120} height="4" fill={pedraSombra} />
      </g>

      {/* vaga-lumes à noite */}
      {m.janelas > 0.5 && !reduzir && (
        <g>
          {fixo.vagalumes.map((v, i) => (
            <circle key={i} cx={v.x} cy={v.y} r="1.8" fill="#fff2a8" className="dz-vagalume" style={{ animationDuration: `${v.d}s`, animationDelay: `-${v.a}s` }} />
          ))}
        </g>
      )}

      {/* a noite escurece um pouco tudo — e o chão perto fica na sombra */}
      <rect width={L} height={ALTURA} fill="#050818" opacity={noite * 0.18} />
    </svg>
  );
});

/** as animações da cena (vão num <style> da página que a usa) */
export const ESTILO_CENA = `
@keyframes dz-piscar { 0%,100% { opacity: .25 } 50% { opacity: 1 } }
.dz-piscar { animation: dz-piscar ease-in-out infinite; }
@keyframes dz-nuvem { from { transform: translateX(-120px) } to { transform: translateX(120px) } }
.dz-nuvem { animation: dz-nuvem linear infinite alternate; }
@keyframes dz-aves { from { transform: translate(-120px, 20px) } to { transform: translate(1400px, -60px) } }
.dz-aves { animation: dz-aves 38s linear infinite; }
@keyframes dz-tocha { 0%,100% { opacity: .85; transform: translateY(0) } 50% { opacity: 1; transform: translateY(-1px) } }
.dz-tocha { animation: dz-tocha 1.3s ease-in-out infinite; transform-box: fill-box; }
@keyframes dz-lamparina { 0%,100% { opacity: .7 } 40% { opacity: 1 } 70% { opacity: .55 } }
.dz-lamparina { animation: dz-lamparina 2.4s ease-in-out infinite; }
@keyframes dz-vagalume { 0% { opacity: 0; transform: translate(0,0) } 30% { opacity: 1 } 60% { opacity: .4; transform: translate(10px,-14px) } 100% { opacity: 0; transform: translate(-6px,-26px) } }
.dz-vagalume { animation: dz-vagalume ease-in-out infinite; }
@keyframes dz-cadente { 0% { opacity: 0; transform: translate(0,0) } 8% { opacity: 1 } 60% { opacity: 0; transform: translate(-260px,130px) } 100% { opacity: 0; transform: translate(-260px,130px) } }
@media (prefers-reduced-motion: reduce) { .dz-piscar,.dz-nuvem,.dz-aves,.dz-tocha,.dz-lamparina,.dz-vagalume { animation: none !important; } }
`;
