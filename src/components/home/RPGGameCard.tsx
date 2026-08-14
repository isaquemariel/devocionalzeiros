import { useEffect, useRef } from "react";
import { drawHeroHD } from "@/lib/rpgStageHD";
import { DEFAULT_LOOK } from "@/lib/rpgMascot";

// ============================================================================
// Capa do RPG no /home — a IDENTIDADE NOVA do jogo (vetorial HD, a mesma da
// cena viva), numa composição mínima e simbólica: o herói caminhando para
// dentro da GLÓRIA — a luz dourada que, no jogo, é a presença de Deus em cena.
// É literalmente a proposta do jogo em um quadro: entrar na Palavra.
// Desenhada em canvas de alta resolução com o MESMO renderer do herói do jogo
// (drawHeroHD) — a capa nunca desatualiza do visual real.
// ============================================================================
const CW = 360;   // resolução lógica (o canvas é nítido: 2x por padrão)
const CH = 480;
const GROUND = 352;

export default function RPGGameCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const px = Math.min(3, window.devicePixelRatio || 1) * 1.25;
    cv.width = Math.round(CW * px);
    cv.height = Math.round(CH * px);
    const g = cv.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = true;
    g.imageSmoothingQuality = "high";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // estrelas fixas (determinísticas) no terço alto do céu
    let seed = 11;
    const rand = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    const stars = Array.from({ length: 26 }, () => ({
      x: rand() * CW, y: rand() * CH * 0.34, r: 0.6 + rand() * 1.1, ph: rand() * 6.28,
    }));
    // partículas de glória subindo diante da luz
    const motes = Array.from({ length: 14 }, () => ({
      x: CW * 0.5 + (rand() - 0.5) * 150, y: GROUND - rand() * 150, sp: 0.008 + rand() * 0.014, ph: rand() * 6.28,
    }));

    let t = 0, last = 0, raf = 0, on = true;
    const frame = (now: number) => {
      if (!on) return;
      const dt = Math.min(48, now - last || 16); last = now; t += dt;
      g.setTransform(px, 0, 0, px, 0, 0);
      g.clearRect(0, 0, CW, CH);

      // CÉU — anoitecer profundo desaguando na aurora dourada do horizonte
      const sky = g.createLinearGradient(0, 0, 0, GROUND);
      sky.addColorStop(0, "#141233");
      sky.addColorStop(0.45, "#2c2554");
      sky.addColorStop(0.78, "#5a4a7e");
      sky.addColorStop(1, "#8a6a74");
      g.fillStyle = sky;
      g.fillRect(0, 0, CW, GROUND);

      // estrelas (piscar sutil)
      for (const s of stars) {
        g.globalAlpha = 0.35 + (reduce ? 0.25 : Math.abs(Math.sin(t * 0.0011 + s.ph)) * 0.5);
        g.fillStyle = "#ffeebc";
        g.beginPath(); g.arc(s.x, s.y, s.r, 0, 6.29); g.fill();
      }
      g.globalAlpha = 1;

      // A GLÓRIA — o grande sol dourado meio-erguido no horizonte (a assinatura
      // do jogo: onde Deus fala, a glória acende). Halo respira devagar.
      const cx = CW * 0.5, cy = GROUND + 6;
      const pulse = reduce ? 0 : Math.sin(t * 0.0016) * 0.06;
      const R = 118;
      const halo = g.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * (2.6 + pulse));
      halo.addColorStop(0, "rgba(255,224,138,0.9)");
      halo.addColorStop(0.35, "rgba(255,200,100,0.4)");
      halo.addColorStop(1, "rgba(255,200,100,0)");
      g.fillStyle = halo;
      g.fillRect(0, 0, CW, GROUND);
      // raios finos, quase imóveis (reverência, não fogos)
      g.save();
      g.translate(cx, cy);
      g.rotate(reduce ? 0 : t * 0.00004);
      for (let i = 0; i < 9; i++) {
        g.rotate(Math.PI / 9);
        const ray = g.createLinearGradient(0, 0, 0, -GROUND);
        ray.addColorStop(0, "rgba(255,220,130,0.16)");
        ray.addColorStop(1, "rgba(255,220,130,0)");
        g.fillStyle = ray;
        g.beginPath(); g.moveTo(-7, 0); g.lineTo(7, 0); g.lineTo(1.6, -GROUND); g.lineTo(-1.6, -GROUND); g.closePath(); g.fill();
      }
      g.restore();
      // o disco
      const disc = g.createLinearGradient(cx, cy - R, cx, cy);
      disc.addColorStop(0, "#fff3c8");
      disc.addColorStop(1, "#f0b354");
      g.fillStyle = disc;
      g.beginPath(); g.arc(cx, cy, R, Math.PI, 0); g.fill();

      // horizonte de Canaã em silhueta (colinas + uma cidadela minimal — o mundo
      // que se atravessa no jogo), recortado contra a luz
      g.fillStyle = "#241a30";
      g.beginPath();
      g.moveTo(0, GROUND);
      g.lineTo(0, GROUND - 26); g.quadraticCurveTo(46, GROUND - 44, 92, GROUND - 26);
      // portão/cidadela à esquerda da luz
      g.lineTo(104, GROUND - 26); g.lineTo(104, GROUND - 52); g.lineTo(118, GROUND - 52);
      g.lineTo(118, GROUND - 40); g.lineTo(132, GROUND - 40);
      g.quadraticCurveTo(190, GROUND - 18, 246, GROUND - 34);
      // torre à direita
      g.lineTo(258, GROUND - 34); g.lineTo(258, GROUND - 58); g.lineTo(272, GROUND - 58); g.lineTo(272, GROUND - 30);
      g.quadraticCurveTo(316, GROUND - 40, CW, GROUND - 22);
      g.lineTo(CW, GROUND);
      g.closePath(); g.fill();

      // CHÃO — o palco por onde se anda
      const soil = g.createLinearGradient(0, GROUND, 0, CH);
      soil.addColorStop(0, "#3a2c3c");
      soil.addColorStop(1, "#17101e");
      g.fillStyle = soil;
      g.fillRect(0, GROUND, CW, CH - GROUND);
      // trilha de luz da glória sobre o chão, vindo até o herói
      const path = g.createLinearGradient(0, GROUND, 0, CH);
      path.addColorStop(0, "rgba(255,214,120,0.45)");
      path.addColorStop(1, "rgba(255,214,120,0.04)");
      g.fillStyle = path;
      g.beginPath();
      g.moveTo(cx - 34, GROUND); g.lineTo(cx + 34, GROUND);
      g.lineTo(cx + 120, CH); g.lineTo(cx - 120, CH);
      g.closePath(); g.fill();

      // partículas de glória subindo
      for (const m of motes) {
        m.y -= m.sp * dt;
        if (m.y < GROUND - 190) { m.y = GROUND - 8; m.x = cx + (Math.sin(m.ph + t * 0.0004) * 120); }
        const a = Math.max(0, Math.min(0.7, (m.y - (GROUND - 190)) / 190));
        g.globalAlpha = a * (0.35 + (reduce ? 0 : Math.abs(Math.sin(t * 0.003 + m.ph)) * 0.3));
        g.fillStyle = "#ffe2a0";
        g.beginPath(); g.arc(m.x, m.y, 1.7, 0, 6.29); g.fill();
      }
      g.globalAlpha = 1;

      // sombra longa do herói fugindo da luz
      g.globalAlpha = 0.34;
      g.fillStyle = "#0c0812";
      g.beginPath(); g.ellipse(cx, GROUND + 26, 30, 8, 0, 0, 6.29); g.fill();
      g.globalAlpha = 1;

      // O HERÓI — o próprio renderer do jogo, de costas para nós, caminhando
      // para dentro da Palavra. Escala 2x para presença de capa.
      g.save();
      g.translate(cx, GROUND + 28);
      g.scale(1.85, 1.85);
      drawHeroHD(g, 0, 0, DEFAULT_LOOK, { t, reduce, walking: !reduce, face: 1 });
      g.restore();

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
        className="absolute inset-0 w-full h-full object-cover"
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
