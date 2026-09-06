// ============================================================================
// REPRODUÇÃO do bug "cena esticada na 1ª entrada" — página de DEV, fora de
// qualquer rota do app (só acessível via /repro.html no servidor de dev).
// Monta o palco exatamente como o app monta: botão → LandscapeShell →
// RPGStageScene, com o texto real do ARC. Permite entrar/sair/reentrar para
// comparar a 1ª entrada com a 2ª — que é onde o bug vive.
// ============================================================================
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { LandscapeShell } from "@/components/rpg/LandscapeShell";
import RPGStageScene from "@/components/rpg/RPGStageScene";
import { loadStageScript } from "@/lib/rpgStageRegistry";
import { ensureStageInfo } from "@/lib/rpgStageInfo";
import type { StageScript } from "@/lib/rpgStage";

function Repro() {
  const [verses, setVerses] = useState<{ number: number; text: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [entradas, setEntradas] = useState(0);

  useEffect(() => {
    fetch("/bible/arc.json")
      .then((r) => r.json())
      .then((b) => {
        const ch = b.ruth.chapters[3] as (string | { t: string })[];
        setVerses(ch.map((v, i) => ({ number: i + 1, text: typeof v === "string" ? v : v.t })));
      });
  }, []);

  const [script, setScript] = useState<StageScript | null>(null);
  // roteiro E fichas do livro, como o modal faz — os dois vêm por import()
  useEffect(() => {
    Promise.all([loadStageScript("ruth", 4), ensureStageInfo("ruth")])
      .then(([s]) => setScript(s ?? null));
  }, []);
  // réplica do fluxo REAL do RPGChapterModal: o shell abre na fase INTRO
  // (resumo + botão "Iniciar Leitura"); a cena monta depois, num crossfade
  // do AnimatePresence — é exatamente assim que a 1ª entrada acontece no app.
  const [phase, setPhase] = useState<"intro" | "reading">("intro");

  return (
    <div style={{ padding: 24, fontFamily: "monospace" }}>
      <h1>Repro: cena esticada na 1ª entrada</h1>
      <p>versículos carregados: {verses.length} | entradas: {entradas}</p>
      <button
        id="abrir"
        disabled={!verses.length || !script}
        style={{ fontSize: 20, padding: "12px 24px" }}
        onClick={() => { setOpen(true); setPhase("intro"); setEntradas((n) => n + 1); }}
      >
        Abrir estágio
      </button>
      {open && script && (
        <LandscapeShell zIndex={70} className="rpg-root bg-[#0b0805]">
          <AnimatePresence mode="sync">
            {phase === "intro" && (
              <motion.div key="intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="h-full flex flex-col items-center justify-center gap-4">
                <div className="text-white text-xl">Introdução do capítulo…</div>
                <button id="iniciar" className="rpg-btn px-6 py-3 text-lg" onClick={() => setPhase("reading")}>Iniciar Leitura</button>
              </motion.div>
            )}
            {phase === "reading" && (
              <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                <RPGStageScene
                  bookName="Rute"
                  bookId="ruth"
                  chapter={4}
                  verses={verses}
                  script={script}
                  onFinish={() => setOpen(false)}
                  onClose={() => setOpen(false)}
                  characterName="Repro"
                  level={1}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </LandscapeShell>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Repro />
  </StrictMode>,
);
