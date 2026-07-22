import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { drawMascot, DEFAULT_LOOK, type MascotMood } from "@/lib/rpgMascot";
import { setupHiResCanvas } from "@/lib/rpgCanvas";
import { isNameAvailable, suggestNames, normalizeName } from "@/lib/rpgCharacter";

interface RPGOnboardingProps {
  onDone: (name: string) => void;
}

const SCENE_W = 256;
const SCENE_H = 168;
const GROUND = 132;
const DIMS: SceneDims = { W: SCENE_W, H: SCENE_H, GROUND };

interface Step {
  who: string;
  mood: MascotMood;
  tx: string;
}

// {n} é substituído pelo nome escolhido
const STEPS: Step[] = [
  { who: "Prazer!", mood: "happy", tx: "Prazer, eu sou {n}! Vou te acompanhar nesta jornada pela Bíblia — da Criação ao Apocalipse — comemorando os acertos e te animando nos tropeços." },
  { who: "A jornada", mood: "idle", tx: "Cada livro é uma fase, com sua própria paisagem. Complete o livro inteiro para desbloquear o próximo. Você está no começo de tudo." },
  { who: "Como se joga", mood: "idle", tx: "Em cada capítulo: leia os versículos, encare um desafio rápido e siga em frente. No fim do livro, enfrente o chefe." },
  { who: "Recompensas", mood: "happy", tx: "Avançando, você ganha pontos no ranking e desbloqueia visuais para deixar {n} com a sua cara." },
  { who: "Pronto?", mood: "idle", tx: "Tudo a postos! Sua jornada começa em Gênesis, na Criação — que a leitura seja luz no seu caminho." },
];

// step: -1 = boot, 0 = naming, 1..STEPS.length = tutorial
const RPGOnboarding = ({ onDone }: RPGOnboardingProps) => {
  const [step, setStep] = useState(-1);
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [status, setStatus] = useState<{ kind: "" | "chk" | "ok" | "no"; msg: string }>({ kind: "", msg: "" });
  const [sugs, setSugs] = useState<string[]>([]);
  const [nameOK, setNameOK] = useState(false);
  const [typed, setTyped] = useState(0);
  const [typing, setTyping] = useState(false);

  const naming = step === 0;
  const tutorialIdx = step - 1; // índice em STEPS
  const inTutorial = step >= 1 && step <= STEPS.length;
  const nm = name || "seu Devocionalzeiro";
  const curText = inTutorial ? STEPS[tutorialIdx].tx.replace(/\{n\}/g, nm) : "";
  const curMood: MascotMood = inTutorial ? STEPS[tutorialIdx].mood : "idle";

  // ----- verificação de nome (debounced) -----
  const checkTimer = useRef<ReturnType<typeof setTimeout>>();
  const checkName = useCallback((v: string) => {
    setNameOK(false);
    setSugs([]);
    const trimmed = v.trim();
    if (normalizeName(trimmed).length < 3) {
      setStatus({ kind: "no", msg: trimmed ? "Curto demais (mín. 3 letras)." : "" });
      return;
    }
    setStatus({ kind: "chk", msg: "Verificando disponibilidade…" });
    clearTimeout(checkTimer.current);
    checkTimer.current = setTimeout(async () => {
      const ok = await isNameAvailable(trimmed);
      if (ok) {
        setNameOK(true);
        setStatus({ kind: "ok", msg: `✓ "${trimmed}" está disponível!` });
      } else {
        setNameOK(false);
        setStatus({ kind: "no", msg: `✗ "${trimmed}" não está disponível. Que tal:` });
        setSugs(suggestNames(trimmed));
      }
    }, 400);
  }, []);

  const onNameChange = (v: string) => {
    setNameInput(v);
    checkName(v);
  };

  const confirmName = useCallback(() => {
    if (!nameOK) return;
    const finalName = nameInput.trim().slice(0, 16);
    setName(finalName);
    setStep(1);
  }, [nameOK, nameInput]);

  const advance = useCallback(() => {
    if (step < 0) {
      setStep(0);
      return;
    }
    if (naming) return; // o avanço da tela de nome é pelo botão Confirmar
    if (typing) {
      setTyped(curText.length);
      setTyping(false);
      return;
    }
    if (step < STEPS.length) {
      setStep((s) => s + 1);
    } else {
      onDone(name);
    }
  }, [step, naming, typing, curText.length, name, onDone]);

  const back = useCallback(() => {
    if (step > 1) setStep((s) => s - 1);
  }, [step]);

  // ----- typewriter do tutorial -----
  useEffect(() => {
    if (!inTutorial) return;
    setTyped(0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(curText.length);
      setTyping(false);
      return;
    }
    setTyping(true);
    const iv = setInterval(() => {
      setTyped((n) => {
        if (n >= curText.length) {
          clearInterval(iv);
          setTyping(false);
          return n;
        }
        return n + 1;
      });
    }, 24);
    return () => clearInterval(iv);
  }, [step, curText, inTutorial]);

  // ----- teclado -----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (naming) return; // tratado no input
      if (["ArrowRight", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        advance();
      } else if (e.key === "ArrowLeft") {
        back();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, back, naming]);

  // ----- cena (herói no cosmos da Criação) -----
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const moodRef = useRef<MascotMood>(curMood);
  moodRef.current = curMood;
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = setupHiResCanvas(canvas, SCENE_W, SCENE_H, 5);
    if (!g) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seed = 3;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    const particles: Particle[] = seedParticles("creation", DIMS, rand);
    let t = 0;
    let last = 0;
    let raf = 0;
    let mounted = true;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16);
      last = now;
      t += dt;
      g.clearRect(0, 0, SCENE_W, SCENE_H);
      drawScene(g, { region: "creation", dims: DIMS, particles, t, scroll: 0, reduce });
      drawMascot(g, Math.round(SCENE_W * 0.5), GROUND, DEFAULT_LOOK, { t, reduce, mood: moodRef.current });
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [inTutorial]);

  const last = step === STEPS.length;

  return (
    <div className="rpg-root fixed inset-0 z-[70] bg-[#05070c] flex flex-col overflow-hidden">
      {/* Cena de fundo (mostra no boot e no tutorial) */}
      {!naming && (
        <div className="relative flex-1 min-h-0">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply"
            style={{ background: "repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.16) 2px 3px)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(130% 100% at 50% 40%, transparent 45%, rgba(0,0,0,.6) 100%)" }}
          />

          {/* Boot */}
          {step < 0 && (
            <motion.button
              onClick={advance}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            >
              {/* escurece o centro pra destacar a informação */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(75% 55% at 50% 46%, rgba(5,7,12,0.82) 0%, rgba(5,7,12,0.45) 55%, transparent 82%)",
                }}
              />
              {/* moldura console translúcida — destaca as letras */}
              <div className="rpg-consoleframe relative z-10 px-7 pt-7 pb-6 mx-4 max-w-md">
                <span className="rpg-consolelabel">◍ DEVOCIONALZEIROS · MODO AVENTURA</span>
                <motion.h1
                  className="rpg-title text-3xl"
                  animate={{ scale: [1, 1.035, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  O JOGO DA <span className="hl">BÍBLIA</span>
                </motion.h1>
                <p className="mt-3 text-sm text-[#cdbfa0]">
                  Uma jornada pela Palavra, da Criação ao Apocalipse — com o seu Devocionalzeiro.
                </p>
                <motion.p
                  className="mt-6 text-xs text-[#ffd889] uppercase tracking-widest"
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  ▸ Toque para começar
                </motion.p>
              </div>
            </motion.button>
          )}

          {/* Tutorial: caixa de diálogo */}
          {inTutorial && (
            <div className="absolute inset-0 flex flex-col justify-end p-4" onClick={advance} role="button" aria-label="Avançar">
              <div className="rounded-lg border-2 border-amber-500/80 bg-gradient-to-b from-[#141c30ee] to-[#0b1120ee] px-4 py-3 shadow-[0_0_0_2px_#0b0805] max-w-lg mx-auto w-full">
                <div className="text-[10px] uppercase tracking-wider text-amber-300 mb-1">{STEPS[tutorialIdx].who}</div>
                <p className="text-sm leading-snug text-blue-50 min-h-[3.5em]">
                  {curText.slice(0, typed)}
                  {typing && <span className="text-amber-300 animate-pulse">▌</span>}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Naming modal */}
      <AnimatePresence>
        {naming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[71] flex items-center justify-center p-4 bg-[#05070cf2] backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm rounded-2xl border-2 border-[#e8b04b] bg-gradient-to-br from-[#141c30] to-[#0b1120] p-5 shadow-[0_0_0_2px_#0b0805,0_18px_40px_-8px_#000]"
            >
              <div className="flex justify-center mb-3">
                <RPGNameMascot />
              </div>
              <h2 className="rpg-title text-center text-lg">Como seu personagem vai se <span className="hl">chamar?</span></h2>
              <p className="text-center text-xs text-[#b8a67f] mt-1 mb-4">
                Este é o seu Devocionalzeiro. O nome será único e vai te representar na futura comunidade.
              </p>
              <input
                autoFocus
                value={nameInput}
                onChange={(e) => onNameChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    confirmName();
                  }
                }}
                maxLength={16}
                placeholder="coloque o nome de sua preferência"
                className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-amber-500/60 focus:outline-none"
              />
              {status.msg && (
                <p
                  className={`text-xs mt-2 ${
                    status.kind === "ok" ? "text-green-400" : status.kind === "no" ? "text-red-400" : "text-white/50"
                  }`}
                >
                  {status.msg}
                </p>
              )}
              {sugs.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {sugs.map((s) => (
                    <button
                      key={s}
                      onClick={() => onNameChange(s)}
                      className="text-xs bg-amber-500/15 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30 hover:bg-amber-500/25 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <button onClick={confirmName} disabled={!nameOK} className="rpg-btn w-full mt-4 py-3 text-sm">
                Confirmar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navegação do tutorial */}
      {inTutorial && (
        <div className="shrink-0 p-3 flex items-center gap-3 bg-[#0b0805] border-t-2 border-[#3a2c18]">
          <button onClick={back} disabled={step <= 1} className="rpg-btn-ghost px-3 py-2 text-xs disabled:opacity-30">
            ◀ Voltar
          </button>
          <div className="flex-1 flex items-center justify-center gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === tutorialIdx ? "bg-[#e8b04b]" : "bg-white/20"}`}
              />
            ))}
          </div>
          {last ? (
            <button onClick={advance} className="rpg-btn px-4 py-2 text-xs">
              ✦ Começar jornada
            </button>
          ) : (
            <button onClick={advance} className="rpg-btn-ghost px-4 py-2 text-xs !text-[#ffd889] !border-[#e8b04b]/50">
              Avançar ▶
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Mascote estático (aceno) para a tela de nome
const RPGNameMascot = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const g = c.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    let t = 0;
    let last = 0;
    let raf = 0;
    let mounted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16);
      last = now;
      t += dt;
      g.clearRect(0, 0, 64, 72);
      drawMascot(g, 32, 64, DEFAULT_LOOK, { t, reduce, mood: "happy" });
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <canvas ref={ref} width={64} height={72} style={{ width: 96, height: 108, imageRendering: "pixelated" }} aria-hidden="true" />;
};

export default RPGOnboarding;
