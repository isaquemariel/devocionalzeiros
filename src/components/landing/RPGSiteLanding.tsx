import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { drawMascot, type MascotLook, DEFAULT_LOOK } from "@/lib/rpgMascot";
import { drawBoss } from "@/lib/rpgBoss";

// ============================================================================
// Site do "O Jogo da Bíblia RPG" (/site) — pegada medieval + arcade retrô, mas
// tecnológica (cenas pixel-art animadas por canvas, brasas, scanlines, framer-
// motion). Enxuto: 3 seções, pra converter rápido sem prender o visitante.
// ============================================================================

const GOLD = "#e8b04b";
const px = { fontFamily: "'Press Start 2P', monospace" } as const;
const vt = { fontFamily: "'VT323', monospace" } as const;

// ---- cena pixel-art larga do herói × dragão (animada) ----
function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const g = cv.getContext("2d"); if (!g) return;
    g.imageSmoothingEnabled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const W = 340, H = 190, GROUND = 150;
    const DIMS: SceneDims = { W, H, GROUND };
    let seed = 9; const rand = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    const particles: Particle[] = seedParticles("revelation", DIMS, rand);
    const hero: MascotLook = { ...DEFAULT_LOOK, robe: "armor", head: "crown", sword: true, wings: "seraph" };
    let t = 0, last = 0, raf = 0, on = true;
    const frame = (now: number) => {
      if (!on) return;
      const dt = Math.min(48, now - last || 16); last = now; t += dt;
      g.clearRect(0, 0, W, H);
      drawScene(g, { region: "revelation", dims: DIMS, particles, t, scroll: 0, reduce });
      g.globalAlpha = 0.14 + (reduce ? 0 : Math.abs(Math.sin(t * 0.004)) * 0.08);
      g.fillStyle = "#ffd889"; g.beginPath(); g.ellipse(96, GROUND - 24, 40, 46, 0, 0, 6.29); g.fill();
      g.globalAlpha = 1;
      drawBoss(g, "revelation", 258, GROUND, t, reduce);
      drawMascot(g, 96, GROUND, hero, { t, reduce, mood: "happy" });
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { on = false; if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} width={340} height={190} className="w-full h-full" style={{ imageRendering: "pixelated" }} aria-hidden="true" />;
}

// ---- mascote trocando de visual (teaser da loja) ----
const CYCLE: Partial<MascotLook>[] = [
  { robe: "armor", head: "helmet", wings: "dove", shield: true },
  { robe: "royal", head: "crown", weapon: "staff", pet: "lion" },
  { robe: "priest", head: "turban", beard: true, weapon: "shofar" },
  { robe: "ephod", wings: "gold", head: "olive" },
];
function CosmeticMascot() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const g = cv.getContext("2d"); if (!g) return;
    g.imageSmoothingEnabled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0, last = 0, raf = 0, on = true;
    const frame = (now: number) => {
      if (!on) return;
      const dt = Math.min(48, now - last || 16); last = now; t += dt;
      g.clearRect(0, 0, 72, 80);
      const look: MascotLook = { ...DEFAULT_LOOK, ...CYCLE[Math.floor(t / 2400) % CYCLE.length] };
      drawMascot(g, 36, 70, look, { t, reduce, mood: "happy" });
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { on = false; if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} width={72} height={80} className="w-16 h-[71px]" style={{ imageRendering: "pixelated" }} aria-hidden="true" />;
}

// moldura "tela de fliperama" (borda dourada em degraus + scanlines)
const Frame = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative rounded-xl overflow-hidden ${className}`}
    style={{ boxShadow: "0 0 0 3px #0b0805, 0 0 0 6px #e8b04b, 0 0 0 9px #7a5210, 0 18px 40px -14px #000" }}>
    {children}
    <div className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0 2px, transparent 2px 4px)" }} />
  </div>
);

// brasas subindo
function Embers({ n = 14 }: { n?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: n }).map((_, i) => (
        <motion.span key={i}
          className="absolute rounded-full"
          style={{ left: `${(i * 37) % 100}%`, bottom: -8, width: 3 + (i % 3), height: 3 + (i % 3), background: i % 3 ? "#ff8a3a" : "#ffd889", filter: "blur(0.3px)" }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [-10, -220 - (i % 5) * 40], opacity: [0, 0.9, 0], x: [0, (i % 2 ? 1 : -1) * (10 + i % 20)] }}
          transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: (i % 7) * 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

const PILLARS = [
  { ic: "📖", t: "LEIA", d: "Os 66 livros viram cenas vivas em pixel art — do Éden ao Apocalipse." },
  { ic: "⚔️", t: "DESAFIE", d: "7 minijogos por capítulo e a batalha épica contra o chefe de cada livro." },
  { ic: "🛡️", t: "EVOLUA", d: "Trajes, armas, montarias e mascotes bíblicos pra montar o seu herói." },
  { ic: "🔥", t: "PERSISTA", d: "Sequência diária, ranking e comunidade pra manter a chama acesa." },
];

export default function RPGSiteLanding() {
  const navigate = useNavigate();
  const go = () => navigate("/auth");

  const Btn = ({ children, primary, onClick }: { children: React.ReactNode; primary?: boolean; onClick?: () => void }) => (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }} whileTap={{ y: 1, scale: 0.98 }}
      className="rounded-lg px-6 py-3 text-sm font-black border-2"
      style={primary
        ? { ...px, fontSize: 11, color: "#2a1a06", background: "linear-gradient(180deg,#ffe08a,#e8b04b)", borderColor: "#7a5210", boxShadow: "0 4px 0 #7a5210, 0 7px 16px rgba(0,0,0,0.5)" }
        : { ...px, fontSize: 11, color: "#ffe0a8", background: "#20160a", borderColor: "#7a5210", boxShadow: "0 4px 0 #241a0c" }}
    >
      {children}
    </motion.button>
  );

  return (
    <main className="min-h-screen text-[#f0e6d2] overflow-x-hidden"
      style={{ background: "radial-gradient(120% 80% at 50% -10%, #3a2410 0%, #1a1109 42%, #0d0805 100%)" }}>

      {/* scanlines globais sutis */}
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.06]" style={{ background: "repeating-linear-gradient(0deg, #000 0 1px, transparent 1px 3px)" }} />

      {/* ===================== SEÇÃO 1 — ABERTURA ÉPICA ===================== */}
      <section className="relative z-[2] min-h-screen flex flex-col items-center justify-center px-4 py-10">
        <Embers />
        {/* brasão / marca */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mb-5 flex items-center gap-2">
          <span className="text-lg">🔥</span>
          <span style={{ ...px, fontSize: 9 }} className="tracking-[0.25em] text-[#e8b04b]">DEVOCIONALZEIROS</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
          className="text-center leading-[0.9]">
          <span style={vt} className="block text-[#f4ecd8]" >
            <span className="block text-4xl sm:text-6xl md:text-7xl" style={{ letterSpacing: 1, textShadow: "0 3px 0 #4a2e08" }}>O JOGO DA BÍBLIA</span>
          </span>
          <span className="inline-block mt-3 rounded-md px-4 py-2 text-transparent bg-clip-text"
            style={{ ...px, fontSize: 26, backgroundImage: "linear-gradient(180deg,#ffe9a8,#e8b04b 55%,#a6701c)", textShadow: "0 2px 0 #4a2e08" }}>
            R P G
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}
          style={vt} className="mt-4 max-w-xl text-center text-xl sm:text-2xl text-[#d8cbb0] leading-snug">
          A Bíblia inteira virou uma jornada. Leia a Palavra, vença os desafios de cada livro,
          derrote o chefe e evolua o seu herói — versículo por versículo.
        </motion.p>

        {/* tela de arcade com a cena */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-7 w-full max-w-2xl">
          <Frame>
            <div className="relative aspect-[340/190] bg-[#0b0813]">
              <HeroScene />
              <span className="absolute top-2 left-2 rounded px-1.5 py-0.5 text-[#ffe0a8] bg-black/50" style={{ ...px, fontSize: 7 }}>GÊNESIS → APOCALIPSE</span>
            </div>
          </Frame>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-7 flex items-center justify-center">
          <Btn primary onClick={go}>▶ COMEÇAR JORNADA</Btn>
        </motion.div>
        <p style={vt} className="mt-3 text-lg text-[#b8a67f]">+1.500 heróis já entraram em campo ⚔️</p>
      </section>

      {/* ===================== SEÇÃO 2 — A MISSÃO ===================== */}
      <section className="relative z-[2] px-4 py-16 border-t-2 border-[#3a2c18]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-10">
            <span style={{ ...px, fontSize: 10 }} className="inline-block rounded px-3 py-1.5 text-[#2a1a06] bg-[#e8b04b]">SUA MISSÃO</span>
            <h2 style={vt} className="mt-4 text-4xl sm:text-5xl text-[#f4ecd8]" >Não é só ler. É viver a Palavra.</h2>
            <p style={vt} className="mt-2 text-xl text-[#c9bda2] max-w-2xl mx-auto">Um RPG de verdade, com o rigor do texto bíblico. Simples de começar, difícil de largar.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PILLARS.map((p, i) => (
              <motion.div key={p.t}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-xl p-5 border-2 border-[#3a2c18] bg-gradient-to-b from-[#241812] to-[#160f09]"
                style={{ boxShadow: "inset 0 0 0 1px #4a3620" }}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center text-2xl mb-3 border-2 border-[#5a4326]"
                  style={{ background: "#2a1c10", boxShadow: "0 3px 0 #1a1109" }}>{p.ic}</div>
                <h3 style={{ ...px, fontSize: 12 }} className="text-[#ffd889] mb-2">{p.t}</h3>
                <p style={vt} className="text-lg leading-tight text-[#cdbfa0]">{p.d}</p>
              </motion.div>
            ))}
          </div>

          {/* teaser interativo da customização */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="mt-6 rounded-xl p-5 border-2 border-[#3a2c18] bg-[#160f09] flex items-center gap-4">
            <div className="shrink-0 rounded-lg bg-[#0b0813] border-2 border-[#3a2c18] p-1"><CosmeticMascot /></div>
            <div>
              <h3 style={{ ...px, fontSize: 11 }} className="text-[#ffd889] mb-1.5">SEU HERÓI, DO SEU JEITO</h3>
              <p style={vt} className="text-lg text-[#cdbfa0] leading-tight">
                Ganhe peças concluindo divisões da Bíblia e desbloqueie trajes sacerdotais, armas, montarias e
                mascotes na loja. Cada herói conta uma história.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== SEÇÃO 3 — CHAMADO FINAL ===================== */}
      <section id="chamado" className="relative z-[2] px-4 py-20 border-t-2 border-[#3a2c18] overflow-hidden">
        <Embers n={10} />
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center rounded-2xl p-8 border-2 border-[#7a5210] relative"
          style={{ background: "radial-gradient(100% 100% at 50% 0%, #2a1c10, #140d07)", boxShadow: "0 0 0 3px #0b0805, 0 24px 60px -20px #000" }}>
          <div className="text-3xl mb-2">🗺️</div>
          <h2 style={vt} className="text-4xl sm:text-5xl text-[#f4ecd8] leading-none">Sua história começa em Gênesis.</h2>
          <p style={vt} className="mt-3 text-xl text-[#cdbfa0]">Crie seu herói, abra o primeiro livro e comece a aventura. É grátis pra começar.</p>
          <div className="mt-6 flex items-center justify-center">
            <Btn primary onClick={go}>▶ COMEÇAR JORNADA</Btn>
          </div>
          <p style={vt} className="mt-4 text-base text-[#8a7a58]">Disponível no navegador e no app Android · em breve iOS</p>
        </motion.div>

        <div className="max-w-2xl mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#8a7a58]" style={vt}>
          <span className="text-base">Devocionalzeiros — feito para quem ama a Palavra.</span>
          <div className="flex gap-4 text-base">
            <a href="/privacidade" className="hover:text-[#e8b04b] transition-colors">Privacidade</a>
            <a href="/auth" className="hover:text-[#e8b04b] transition-colors">Entrar</a>
          </div>
        </div>
      </section>
    </main>
  );
}
