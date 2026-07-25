import { useEffect, useRef } from "react";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { drawMascot, type MascotLook } from "@/lib/rpgMascot";
import { drawBoss } from "@/lib/rpgBoss";

// Banner do RPG no /home — 100% pixel-art (a identidade real do jogo), animado:
// o herói encara o Dragão de Apocalipse numa cena épica. Sem imagem estática.
const CW = 180;
const CH = 240;
const GROUND = 196;
const DIMS: SceneDims = { W: CW, H: CH, GROUND };

// herói heroico (armadura + espada + asas de serafim + coroa)
const HERO: MascotLook = {
  head: "crown", glasses: false, beard: false, robe: "armor",
  shield: false, sword: true, weapon: "none", wings: "seraph", aura: "none",
  mount: "none", pet: "none", color: "blue",
};

export default function RPGGameCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const g = cv.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let seed = 7;
    const rand = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    const particles: Particle[] = seedParticles("creation", DIMS, rand);

    let t = 0, last = 0, raf = 0, on = true;
    const frame = (now: number) => {
      if (!on) return;
      const dt = Math.min(48, now - last || 16); last = now; t += dt;
      g.clearRect(0, 0, CW, CH);
      drawScene(g, { region: "creation", dims: DIMS, particles, t, scroll: 0, reduce });
      // brilho épico atrás do herói
      g.globalAlpha = 0.14 + (reduce ? 0 : Math.abs(Math.sin(t * 0.004)) * 0.08);
      g.fillStyle = "#ffd889";
      g.beginPath(); g.ellipse(58, GROUND - 24, 34, 40, 0, 0, 6.29); g.fill();
      g.globalAlpha = 1;
      // Dragão (chefe) espreitando à direita
      drawBoss(g, "revelation", 138, GROUND, t, reduce);
      // Herói à esquerda, encarando o chefe
      drawMascot(g, 58, GROUND, HERO, { t, reduce, mood: "happy" });
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { on = false; if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="absolute inset-0 select-none">
      <canvas
        ref={canvasRef}
        width={CW}
        height={CH}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ imageRendering: "pixelated" }}
        aria-hidden="true"
      />
      {/* vinheta pra leitura do texto */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,4,10,0.55) 0%, rgba(6,4,10,0) 34%, rgba(6,4,10,0) 52%, rgba(6,4,10,0.82) 100%)" }} />

      {/* Título / identidade RPG */}
      <div className="absolute top-0 left-0 right-0 pt-3 px-2 text-center pointer-events-none">
        <p className="text-[9px] font-black tracking-[0.35em] text-[#ffd889]/90" style={{ textShadow: "0 1px 2px #000" }}>DEVOCIONALZEIROS</p>
        <p
          className="leading-none font-black text-transparent bg-clip-text"
          style={{
            fontSize: "34px",
            backgroundImage: "linear-gradient(180deg,#ffe9a8,#e8b04b 55%,#a6701c)",
            textShadow: "0 2px 0 #4a2e08, 0 3px 6px rgba(0,0,0,0.6)",
            letterSpacing: "2px",
          }}
        >
          RPG
        </p>
        <div className="mx-auto mt-1 flex items-center justify-center gap-1.5">
          <span className="h-px w-5 bg-[#e8b04b]/70" />
          <span className="text-[9px] font-bold tracking-widest text-[#f0e6d2]" style={{ textShadow: "0 1px 2px #000" }}>⚔ O JOGO DA BÍBLIA ⚔</span>
          <span className="h-px w-5 bg-[#e8b04b]/70" />
        </div>
      </div>

      {/* CTA (visual — o card inteiro é clicável) */}
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-4 text-center pointer-events-none">
        <span
          className="inline-block rounded-lg px-5 py-2 text-[13px] font-black text-[#2a1a06] border-2 border-[#7a5210]"
          style={{ background: "linear-gradient(180deg,#ffe08a,#e8b04b)", boxShadow: "0 3px 0 #7a5210, 0 5px 12px rgba(0,0,0,0.5)" }}
        >
          ▶ JOGAR AGORA
        </span>
      </div>
    </div>
  );
}
