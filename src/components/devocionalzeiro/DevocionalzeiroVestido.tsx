import { useEffect, useRef, type ReactNode } from "react";
import type { MascotLook } from "@/lib/rpgMascot";
import { DEFAULT_LOOK } from "@/lib/rpgMascot";
import { drawHeroHD, HERO_ALTURA } from "@/lib/rpgHero";
import { avancar, criarEstado } from "@/lib/devocionalzeiro/animacao";
import { quadroDaPose } from "@/lib/devocionalzeiro/canvas";
import type { Expressao, Gesto } from "@/lib/devocionalzeiro/geometria";

interface Props {
  look: Partial<MascotLook>;
  expressao?: Expressao;
  gesto?: Gesto;
  chama?: number;
  falando?: boolean;
  olhar?: { x: number; y: number } | null;
  pulso?: number;
  toque?: number;
  tamanho?: number;
  className?: string;
  naCabeca?: ReactNode;
  semChama?: boolean;
}

/** folga do canvas em volta da caixa do boneco: asas e o que ele ergue */
const FOLGA = { lado: 0.6, cima: 0.6, baixo: 0.12 };

/**
 * O DEVOCIONALZEIRO VESTIDO — o boneco do app com o que a pessoa equipou no
 * RPG.
 *
 * Mesmo tamanho de caixa, mesmas props e o mesmo MOVIMENTO do rig em SVG: a
 * pose vem do simulador partilhado (`lib/devocionalzeiro/animacao`), então o
 * pulo, a pirueta, a piscada e a boca falando são idênticos. O desenho é o do
 * herói do RPG (`rpgHero`) — corpo, cor e guarda-roupa —, recebendo essa
 * pose pronta. Asas e aura passam da caixa (o canvas tem folga em volta),
 * sem empurrar o layout.
 *
 * O que vai na cabeça por `naCabeca` (a coroa do parabéns) é SVG e fica numa
 * camada por cima, com a mesma transformação do corpo a cada quadro — e, pela
 * regra do personagem, tira a chama e o chapéu que ele estiver usando.
 */
export default function DevocionalzeiroVestido({
  look, expressao = "neutro", gesto = "parado", chama = 0.3, falando = false, olhar = null,
  pulso = 0, toque = 0, tamanho = 180, className, naCabeca, semChama = false,
}: Props) {
  const W = tamanho, H = (tamanho * 229) / 205;
  const cw = W * (1 + 2 * FOLGA.lado), ch = H * (1 + FOLGA.cima + FOLGA.baixo);
  const canvas = useRef<HTMLCanvasElement>(null);
  const camada = useRef<SVGGElement>(null);
  const apagada = semChama || !!naCabeca;
  const vestido: MascotLook = { ...DEFAULT_LOOK, ...look, mount: "none", pet: "none", aura: "none", ...(naCabeca ? { head: "none" as const } : {}) };

  const alvo = useRef({ expressao, gesto, chama, falando, olhar, pulso, toque, apagada, vestido });
  alvo.current = { expressao, gesto, chama, falando, olhar, pulso, toque, apagada, vestido };

  useEffect(() => {
    const cv = canvas.current;
    const g = cv?.getContext("2d");
    if (!cv || !g) return;
    const reduzir = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const dpr = Math.min(2.5, window.devicePixelRatio || 1);
    cv.width = Math.round(cw * dpr);
    cv.height = Math.round(ch * dpr);
    // 1 unidade do rig = W/205 px; o herói tem HERO_ALTURA unidades de cena
    // para as 133 do rig (do chão ao topo da cabeça)
    const s = ((W / 205) * 133) / HERO_ALTURA;
    const x0 = W * FOLGA.lado + (106 * W) / 205;
    const y0 = H * FOLGA.cima + (220 * W) / 205;
    const sim = criarEstado(alvo.current);
    let acesa = alvo.current.apagada ? 0 : 1;
    const t0 = performance.now();
    let ultimo = t0, raf = 0;

    const quadro = (agora: number) => {
      const a = alvo.current;
      const t = (agora - t0) / 1000;
      const dt = Math.min(0.05, (agora - ultimo) / 1000);
      ultimo = agora;
      const pose = avancar(sim, a, t, dt, reduzir);
      acesa += ((a.apagada ? 0 : 1) - acesa) * (1 - Math.exp(-7 * dt));

      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, cw, ch);
      g.setTransform(dpr * s, 0, 0, dpr * s, dpr * x0, dpr * y0);
      drawHeroHD(g, 0, 0, a.vestido, { t: agora - t0, reduce: reduzir, quadro: quadroDaPose(pose, agora - t0, reduzir), chamaAcesa: acesa });

      // a coroa (SVG) acompanha o corpo, como no rig
      camada.current?.setAttribute(
        "transform",
        `translate(102 188) translate(0 ${-pose.altura}) rotate(${pose.tilt}) scale(${pose.sx} ${pose.sy}) translate(-102 -188)`,
      );
      raf = requestAnimationFrame(quadro);
    };
    raf = requestAnimationFrame(quadro);
    return () => cancelAnimationFrame(raf);
  }, [W, H, cw, ch]);

  return (
    <div className={className} style={{ position: "relative", width: W, height: H }} role="img" aria-label="Devocionalzeiro">
      <canvas
        ref={canvas}
        aria-hidden="true"
        style={{ position: "absolute", left: -W * FOLGA.lado, top: -H * FOLGA.cima, width: cw, height: ch, pointerEvents: "none" }}
      />
      {naCabeca && (
        <svg viewBox="0 -24 205 229" width={W} height={H} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }} aria-hidden="true">
          <g ref={camada}>{naCabeca}</g>
        </svg>
      )}
    </div>
  );
}
