import { lazy, Suspense, useEffect, useId, useRef, type ReactNode } from "react";
import type { MascotLook } from "@/lib/rpgMascot";
import { paraOApp, useVisual } from "@/lib/devocionalzeiro/visual";
import {
  BASE_CHAMA, BOCAS, BRACO_REPOUSO, CAMADAS, CORES, CORPO_FRENTE, CORPO_LADO, EMBLEMA, N_BRASAS,
  N_LABAREDAS, OLHO_D, OLHO_E, OMBRO_D, OMBRO_E, REPOUSO_D, REPOUSO_E, SOBRANCELHA, gota, lingua,
  type Expressao, type Gesto,
} from "@/lib/devocionalzeiro/geometria";
import { avancar, criarEstado } from "@/lib/devocionalzeiro/animacao";

/**
 * O DEVOCIONALZEIRO, como boneco de jogo — o personagem ÚNICO do app.
 *
 * As medidas e os contornos moram em `lib/devocionalzeiro/geometria`, e o RPG
 * desenha o mesmo boneco em canvas a partir deles (`lib/devocionalzeiro/canvas`).
 *
 * A primeira versão da jornada usava as artes em PNG — e PNG não se mexe: a
 * chama ficava parada, ele não sorria, não piscava, não olhava para nada. Aqui
 * ele é um RIG vetorial, redesenhado a partir da arte oficial, com cada parte
 * separada e animada à parte: corpo, olhos, pálpebras, íris, sobrancelhas,
 * boca, bochechas, braços, pés e a chama.
 *
 * Um único laço de `requestAnimationFrame` escreve direto nos atributos do SVG
 * por refs. Nada disto passa pelo React a cada quadro: as props mudam o ALVO
 * (expressão, gesto, tamanho da chama, para onde olhar) e o laço persegue o
 * alvo com molas — é isso que dá peso ao movimento, em vez de trocar de pose
 * num estalo.
 *
 * Princípios de animação aplicados, porque são eles que separam "boneco" de
 * "desenho que troca de figura":
 * - antecipação e esmagamento/esticamento no pulo;
 * - ação secundária: a chama tremula sozinha e se inclina contra o movimento;
 * - piscar em intervalo IRREGULAR (regular denuncia a máquina);
 * - o olhar vagueia quando ninguém dá um alvo.
 */

export type { Expressao, Gesto };

interface Props {
  expressao?: Expressao;
  gesto?: Gesto;
  /** 0..1 — o tamanho da chama. É a barra de progresso da jornada. */
  chama?: number;
  /** a boca acompanha a fala enquanto o balão escreve */
  falando?: boolean;
  /** para onde olhar, em -1..1 (x para a direita, y para baixo); `null` = vagueia */
  olhar?: { x: number; y: number } | null;
  /** muda → pulinho de reação */
  pulso?: number;
  /** muda → aceno curto de cabeça (uma letra digitada, um toque) */
  toque?: number;
  /** largura em px */
  tamanho?: number;
  className?: string;
  /**
   * Algo que ele VESTE na cabeça, em unidades do viewBox (a coroa que recebe
   * ao assinar, por exemplo). Fica dentro do corpo: pula, inclina e amassa
   * junto com ele.
   */
  naCabeca?: ReactNode;
  /**
   * Sem a chama da cabeça. REGRA do personagem: com um acessório na cabeça, a
   * chama some (o acessório toma o lugar dela). Com `naCabeca`, já vale.
   */
  semChama?: boolean;
}

export function DevocionalzeiroSVG({
  expressao = "neutro", gesto = "parado", chama = 0.3, falando = false, olhar = null,
  pulso = 0, toque = 0, tamanho = 180, className, naCabeca, semChama = false,
}: Props) {
  const apagada = semChama || !!naCabeca;
  const uid = useId().replace(/:/g, "");
  const ids = {
    corpo: `c-${uid}`, lado: `l-${uid}`, iris: `i-${uid}`, fogoExt: `fe-${uid}`, fogoMed: `fm-${uid}`,
    fogoNuc: `fn-${uid}`,
  };

  // alvos lidos pelo laço (props → ref, sem reiniciar o laço)
  const alvo = useRef({ expressao, gesto, chama, falando, olhar, pulso, toque, apagada });
  alvo.current = { expressao, gesto, chama, falando, olhar, pulso, toque, apagada };

  const r = {
    raiz: useRef<SVGGElement>(null), corpo: useRef<SVGGElement>(null), rosto: useRef<SVGGElement>(null),
    olhoE: useRef<SVGGElement>(null), olhoD: useRef<SVGGElement>(null),
    irisE: useRef<SVGGElement>(null), irisD: useRef<SVGGElement>(null),
    felizE: useRef<SVGPathElement>(null), felizD: useRef<SVGPathElement>(null),
    fechadoE: useRef<SVGPathElement>(null), fechadoD: useRef<SVGPathElement>(null),
    sobE: useRef<SVGPathElement>(null), sobD: useRef<SVGPathElement>(null),
    boca: useRef<SVGPathElement>(null), lingua: useRef<SVGEllipseElement>(null),
    bochE: useRef<SVGEllipseElement>(null), bochD: useRef<SVGEllipseElement>(null),
    bracoE: useRef<SVGGElement>(null), bracoD: useRef<SVGGElement>(null),
    bracoEForma: useRef<SVGRectElement>(null), bracoDForma: useRef<SVGRectElement>(null),
    peE: useRef<SVGEllipseElement>(null), peD: useRef<SVGEllipseElement>(null),
    sombra: useRef<SVGEllipseElement>(null), chama: useRef<SVGGElement>(null),
    emblema: useRef<SVGPathElement>(null),
  };
  const linguas = useRef<SVGPathElement[][]>([[], [], []]);
  const brasas = useRef<SVGCircleElement[]>([]);
  const labaredas = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const reduzir = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t0 = performance.now();

    // o corpo é o simulador partilhado (lib/devocionalzeiro/animacao); aqui só
    // as partículas da chama têm estado próprio
    const sim = criarEstado(alvo.current);
    const s = {
      bocaAtual: "", sobAtual: "",
      brasas: Array.from({ length: N_BRASAS }, () => ({ x: 0, y: 0, vx: 0, vy: 0, vida: 0, dur: 1 })),
      labaredas: Array.from({ length: N_LABAREDAS }, () => ({ x: 0, y: 0, vx: 0, vy: 0, vida: 0, dur: 1, r: 2 })),
      pontas: [] as { x: number; y: number }[],
      chama: alvo.current.chama,
      // 1 = acesa, 0 = apagada: a chama some devagar quando algo pousa na cabeça
      acesa: alvo.current.apagada ? 0 : 1,
    };
    let ultimo = t0;

    const quadro = (agora: number) => {
      const t = (agora - t0) / 1000;
      const dt = Math.min(0.05, (agora - ultimo) / 1000);
      ultimo = agora;
      const a = alvo.current;
      const p = avancar(sim, a, t, dt, !!reduzir);
      s.chama = p.chama;

      r.corpo.current?.setAttribute(
        "transform",
        `translate(102 188) translate(0 ${-p.altura}) rotate(${p.tilt}) scale(${p.sx} ${p.sy}) translate(-102 -188)`,
      );
      r.sombra.current?.setAttribute("transform", `translate(106 196) scale(${p.sombra} 1) translate(-106 -196)`);
      r.sombra.current?.setAttribute("opacity", String(0.28 * p.sombra));
      r.peE.current?.setAttribute("transform", `translate(${p.peE.x} ${p.peE.y - p.altura * 0.85})`);
      r.peD.current?.setAttribute("transform", `translate(${p.peD.x} ${p.peD.y - p.altura * 0.85})`);

      const irisT = `translate(${p.gazeX * 3.3} ${p.gazeY * 2.8})`;
      r.irisE.current?.setAttribute("transform", irisT);
      r.irisD.current?.setAttribute("transform", irisT);
      // o rosto inteiro acompanha um pouco o olhar (parallax de cabeça)
      r.rosto.current?.setAttribute("transform", `translate(${p.gazeX * 1.6} ${p.gazeY * 1.1})`);

      for (const [el, c] of [[r.olhoE.current, OLHO_E], [r.olhoD.current, OLHO_D]] as const) {
        el?.setAttribute("transform", `translate(${c.x} ${c.y}) scale(${p.escalaOlho} ${p.abertura}) translate(${-c.x} ${-c.y})`);
        el?.setAttribute("opacity", p.olhosFelizes || p.olhosFechados ? "0" : "1");
      }
      r.fechadoE.current?.setAttribute("opacity", p.olhosFechados ? "1" : "0");
      r.fechadoD.current?.setAttribute("opacity", p.olhosFechados ? "1" : "0");
      r.felizE.current?.setAttribute("opacity", p.olhosFelizes ? "1" : "0");
      r.felizD.current?.setAttribute("opacity", p.olhosFelizes ? "1" : "0");

      if (s.sobAtual !== p.expressao) {
        s.sobAtual = p.expressao;
        const b = SOBRANCELHA[p.expressao];
        r.sobE.current?.setAttribute("transform", `translate(0 ${b.e[0]}) rotate(${b.e[1]} 94 79)`);
        r.sobD.current?.setAttribute("transform", `translate(0 ${b.d[0]}) rotate(${b.d[1]} 129 79)`);
      }

      const boca = p.boca;
      if (s.bocaAtual !== boca.d) {
        s.bocaAtual = boca.d;
        const el = r.boca.current;
        el?.setAttribute("d", boca.d);
        el?.setAttribute("fill", boca.cheia ? "#1B0B1E" : "none");
        el?.setAttribute("stroke", boca.cheia ? "none" : "#0A0F24");
        r.lingua.current?.setAttribute("opacity", boca.lingua ? "1" : "0");
      }
      r.bochE.current?.setAttribute("opacity", String(p.bochecha));
      r.bochD.current?.setAttribute("opacity", String(p.bochecha));

      r.bracoE.current?.setAttribute("transform", `translate(${OMBRO_E.x} ${OMBRO_E.y}) rotate(${p.bracoE.ang})`);
      r.bracoD.current?.setAttribute("transform", `translate(${OMBRO_D.x} ${OMBRO_D.y}) rotate(${p.bracoD.ang})`);
      r.bracoEForma.current?.setAttribute("height", String(p.bracoE.len));
      r.bracoDForma.current?.setAttribute("height", String(p.bracoD.len));

      // ── chama ───────────────────────────────────────────────────────────
      s.acesa += ((a.apagada ? 0 : 1) - s.acesa) * (1 - Math.exp(-7 * dt));
      r.chama.current?.setAttribute("opacity", s.acesa.toFixed(3));
      r.chama.current?.setAttribute("transform", `translate(104 72) scale(${0.4 + 0.6 * s.acesa}) translate(-104 -72)`);
      const H = 17 + 58 * s.chama;
      const tremor = reduzir ? 0.25 : 1;
      const lean = -p.inclinacao * 9;
      CAMADAS.forEach((cam, ci) => {
        cam.linguas.forEach((l, li) => {
          const el = linguas.current[ci][li];
          if (!el) return;
          // As línguas grandes lambem devagar e largo; as pequenas tremem
          // rápido e curto. Tudo na mesma frequência parece um mola, não fogo.
          const lento = 1 - l.h * 0.55;
          const fl = 1 + tremor * (0.12 * Math.sin(t * (4.2 + lento * 5) + l.f) + 0.07 * Math.sin(t * (12.7 + ci * 1.3) + l.f * 2.1));
          const sway = tremor * ((2.2 + l.h * 4.2) * Math.sin(t * (1.9 + lento * 3.2) + l.f) + 1.3 * Math.sin(t * (8.9 + li) + l.f))
            + lean * (0.6 + l.h * 0.6);
          const cx = BASE_CHAMA.x + l.dx * (0.7 + s.chama * 0.4);
          const hw = l.hw * (0.62 + s.chama * 0.46);
          const ty = BASE_CHAMA.y - H * l.h * fl;
          // as pontas se abrem para fora e a chama toda tomba um pouco para a direita, como na arte
          const abre = l.dx * 0.35 * (0.5 + s.chama);
          const tx = cx + sway + abre + 2.5 * l.h;
          const d = lingua(cx, BASE_CHAMA.y, hw, tx, ty, sway * 1.6);
          el.setAttribute("d", d);
          if (ci === 0) s.pontas[li] = { x: tx, y: ty };
        });
      });
      // brasas: nascem na chama, sobem, somem
      const taxa = reduzir || a.apagada ? 0 : 0.6 + s.chama * 2.2 + (a.gesto === "comemorar" || a.gesto === "pirueta" ? 3 : 0);
      s.brasas.forEach((b, i) => {
        const el = brasas.current[i];
        if (!el) return;
        b.vida -= dt;
        if (b.vida <= 0) {
          if (Math.random() < taxa * dt * 2) {
            b.x = BASE_CHAMA.x + (Math.random() - 0.5) * (16 + s.chama * 22);
            b.y = BASE_CHAMA.y - H * (0.3 + Math.random() * 0.5);
            b.vx = (Math.random() - 0.5) * 14 + lean * 1.4;
            b.vy = -(18 + Math.random() * 24) * (0.7 + s.chama * 0.5);
            b.dur = b.vida = 0.7 + Math.random() * 0.9;
          } else { el.setAttribute("opacity", "0"); return; }
        }
        b.x += b.vx * dt + Math.sin(t * 7 + i) * 0.25;
        b.y += b.vy * dt;
        const k = b.vida / b.dur;
        el.setAttribute("cx", b.x.toFixed(2));
        el.setAttribute("cy", b.y.toFixed(2));
        el.setAttribute("r", (0.6 + 1.3 * k).toFixed(2));
        el.setAttribute("opacity", (k * 0.95).toFixed(2));
      });
      // labaredas: nascem numa ponta da camada externa e sobem encolhendo
      const taxaLab = reduzir || a.apagada ? 0 : 1.4 + s.chama * 3.2 + (a.gesto === "comemorar" || a.gesto === "pirueta" ? 4 : 0);
      s.labaredas.forEach((b, i) => {
        const el = labaredas.current[i];
        if (!el) return;
        b.vida -= dt;
        if (b.vida <= 0) {
          const p = s.pontas[(Math.random() * s.pontas.length) | 0];
          if (p && Math.random() < taxaLab * dt) {
            b.x = p.x; b.y = p.y + 2;
            b.vx = (Math.random() - 0.5) * 10 + lean;
            b.vy = -(26 + Math.random() * 22) * (0.6 + s.chama * 0.5);
            b.r = 1.6 + Math.random() * 1.6 + s.chama * 1.2;
            b.dur = b.vida = 0.28 + Math.random() * 0.3;
          } else { el.setAttribute("opacity", "0"); return; }
        }
        b.x += b.vx * dt; b.y += b.vy * dt;
        const k = Math.max(0, b.vida / b.dur);
        el.setAttribute("d", gota(b.x, b.y, b.r * (0.35 + 0.65 * k)));
        el.setAttribute("opacity", (0.95 * k).toFixed(2));
      });

      // o emblema da barriga pulsa junto
      r.emblema.current?.setAttribute(
        "transform",
        `translate(112 149) scale(${1 + (reduzir ? 0 : Math.sin(t * 5.3) * 0.05)} ${1 + (reduzir ? 0 : Math.sin(t * 6.1) * 0.08)}) translate(-112 -149)`,
      );

      raf = requestAnimationFrame(quadro);
    };
    raf = requestAnimationFrame(quadro);
    return () => cancelAnimationFrame(raf);
    // Um laço só, a vida inteira do boneco: ele lê as props por `alvo` e os
    // elementos por refs (estáveis) — reiniciar a cada prop zeraria as molas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <svg
      viewBox="0 -24 205 229"
      width={tamanho}
      height={(tamanho * 229) / 205}
      className={className}
      role="img"
      aria-label="Devocionalzeiro"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id={ids.corpo} cx="62%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#23376F" />
          <stop offset="55%" stopColor="#152452" />
          <stop offset="100%" stopColor="#0A1231" />
        </radialGradient>
        <linearGradient id={ids.lado} x1="0" x2="1">
          <stop offset="0%" stopColor="#060B1F" />
          <stop offset="100%" stopColor="#0E1838" />
        </linearGradient>
        <radialGradient id={ids.iris} cx="45%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#8FD8FF" />
          <stop offset="45%" stopColor="#2F8BFF" />
          <stop offset="100%" stopColor="#0E3FB3" />
        </radialGradient>
        <linearGradient id={ids.fogoExt} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1740D8" />
          <stop offset="45%" stopColor="#2F7BFF" />
          <stop offset="100%" stopColor="#7FD2FF" />
        </linearGradient>
        <linearGradient id={ids.fogoMed} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#3AA2FF" />
          <stop offset="100%" stopColor="#A6E8FF" />
        </linearGradient>
        <linearGradient id={ids.fogoNuc} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#F2FDFF" />
          <stop offset="100%" stopColor="#C4F1FF" />
        </linearGradient>
      </defs>

      {/* sombra no chão */}
      <ellipse ref={r.sombra} cx="106" cy="196" rx="44" ry="6" fill="#1A1440" opacity="0.28" />

      {/* pés (fora do corpo: ficam no chão quando ele pula menos que o corpo) */}
      <ellipse ref={r.peE} cx="88" cy="187" rx="15" ry="9.5" fill="#0D1636" />
      <ellipse ref={r.peD} cx="127" cy="187" rx="15" ry="9.5" fill="#0D1636" />

      <g ref={r.corpo}>
        {/* chama ATRÁS do corpo: a base some dentro da cabeça */}
        <g ref={r.chama}>
          {CAMADAS.map((cam, ci) => (
            <g key={cam.cor} opacity={ci === 0 ? 0.96 : 1}>
              {cam.linguas.map((_, li) => (
                <path
                  key={li}
                  ref={(el) => { if (el) linguas.current[ci][li] = el; }}
                  fill={`url(#${ci === 0 ? ids.fogoExt : ci === 1 ? ids.fogoMed : ids.fogoNuc})`}
                />
              ))}
            </g>
          ))}
          <g>
            {Array.from({ length: N_LABAREDAS }, (_, i) => (
              <path key={i} ref={(el) => { if (el) labaredas.current[i] = el; }} fill={`url(#${ids.fogoMed})`} opacity="0" />
            ))}
          </g>
          <g>
            {Array.from({ length: N_BRASAS }, (_, i) => (
              <circle key={i} ref={(el) => { if (el) brasas.current[i] = el; }} r="1" fill="#A8EAFF" opacity="0" />
            ))}
          </g>
        </g>

        {/* corpo em D, com espessura à esquerda */}
        <path d={CORPO_LADO} fill={`url(#${ids.lado})`} />
        <path d={CORPO_FRENTE} fill={`url(#${ids.corpo})`} />

        {/* a chama da barriga, sozinha, sem moldura nem halo */}
        <g transform="translate(112 148) scale(1.55) translate(-112 -148)">
          <path
            ref={r.emblema}
            d={EMBLEMA}
            fill={`url(#${ids.fogoMed})`}
          />
        </g>

        {/* rosto: acompanha o olhar */}
        <g ref={r.rosto}>
          <ellipse ref={r.bochE} cx="85" cy="113" rx="6.5" ry="3.6" fill="#5CB6FF" opacity="0.22" />
          <ellipse ref={r.bochD} cx="139" cy="113" rx="6.5" ry="3.6" fill="#5CB6FF" opacity="0.22" />

          {[{ c: OLHO_E, olho: r.olhoE, iris: r.irisE }, { c: OLHO_D, olho: r.olhoD, iris: r.irisD }].map(({ c, olho, iris }, i) => (
            <g key={i} ref={olho}>
              <ellipse cx={c.x} cy={c.y} rx="12.4" ry="13.4" fill="#F4F8FF" />
              <g ref={iris}>
                <circle cx={c.x + 0.5} cy={c.y + 1.2} r="10.4" fill={`url(#${ids.iris})`} />
                <circle cx={c.x + 0.5} cy={c.y + 1.4} r="5" fill="#06112E" />
                <circle cx={c.x - 3.2} cy={c.y - 3.4} r="3.5" fill="#FFFFFF" />
                <circle cx={c.x + 3.4} cy={c.y + 4} r="1.4" fill="#FFFFFF" opacity="0.9" />
              </g>
              {/* contorno fino do olho */}
              <ellipse cx={c.x} cy={c.y} rx="12.4" ry="13.4" fill="none" stroke="#050A1E" strokeWidth="1.2" opacity="0.6" />
            </g>
          ))}
          {/* olhos de alegria (^ ^) */}
          <path ref={r.felizE} d="M83 101 Q94 88 105 101" fill="none" stroke="#EAF3FF" strokeWidth="3" strokeLinecap="round" opacity="0" />
          <path ref={r.felizD} d="M118 101 Q129 88 140 101" fill="none" stroke="#EAF3FF" strokeWidth="3" strokeLinecap="round" opacity="0" />
          {/* olhos fechados (dormindo, bocejando): só a curva — cílios o deixavam feminino */}
          <path ref={r.fechadoE} d="M85 98 Q94 104 103 98" fill="none" stroke="#EAF3FF" strokeWidth="2.6" strokeLinecap="round" opacity="0" />
          <path ref={r.fechadoD} d="M120 98 Q129 104 138 98" fill="none" stroke="#EAF3FF" strokeWidth="2.6" strokeLinecap="round" opacity="0" />

          <path ref={r.sobE} d="M86.5 80 Q94 76.5 101.5 79.5" fill="none" stroke="#050A1E" strokeWidth="2.2" strokeLinecap="round" />
          <path ref={r.sobD} d="M121.5 79.5 Q129 76.5 136.5 80" fill="none" stroke="#050A1E" strokeWidth="2.2" strokeLinecap="round" />

          <path ref={r.boca} d={BOCAS.neutro.d} fill="none" stroke="#0A0F24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse ref={r.lingua} cx="112" cy="119" rx="4.2" ry="2.5" fill="#FF7A9C" opacity="0" />
        </g>

        {naCabeca}

        {/* braços: na frente do corpo — é o que deixa ele tapar os olhos */}
        <g ref={r.bracoE} transform={`translate(${OMBRO_E.x} ${OMBRO_E.y}) rotate(${REPOUSO_E})`}>
          <rect ref={r.bracoEForma} x="-10.5" y="-6" width="21" height={BRACO_REPOUSO} rx="10.5" fill="#15224C" stroke="#2F4589" strokeWidth="1.6" />
        </g>
        <g ref={r.bracoD} transform={`translate(${OMBRO_D.x} ${OMBRO_D.y}) rotate(${REPOUSO_D})`}>
          <rect ref={r.bracoDForma} x="-10.5" y="-6" width="21" height={BRACO_REPOUSO} rx="10.5" fill="#15224C" stroke="#2F4589" strokeWidth="1.6" />
        </g>
      </g>
    </svg>
  );
}

// o vestido desenha com o herói do RPG (canvas): só baixa quando alguém
// tem algo equipado — quem não tem continua no SVG, leve
const DevocionalzeiroVestido = lazy(() => import("./DevocionalzeiroVestido"));

/**
 * O DEVOCIONALZEIRO do app — o que toda tela usa.
 *
 * Veste o que a pessoa equipou no guarda-roupa do RPG (`useVisual`): sem nada
 * equipado, é o rig em SVG; com algo (cor, chapéu, traje, arma, asas…), é o
 * mesmo boneco vestido, com o mesmo movimento. `look` troca o visual só aqui
 * (`null` força o padrão — a jornada de quem ainda não tem conta, por exemplo).
 */
export function Devocionalzeiro({ look, ...props }: Props & { look?: Partial<MascotLook> | null }) {
  const global = useVisual();
  const vestido = paraOApp(look === undefined ? global : look);
  if (!vestido) return <DevocionalzeiroSVG {...props} />;
  return (
    <Suspense fallback={<DevocionalzeiroSVG {...props} />}>
      <DevocionalzeiroVestido look={vestido} {...props} />
    </Suspense>
  );
}
