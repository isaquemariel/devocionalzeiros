import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import RPGSceneBackdrop from "./RPGSceneBackdrop";
import type { MascotLook } from "@/lib/rpgMascot";

// ============================================================================
// Desafio "Complete o versículo" — o versículo aparece com uma lacuna; o jogador
// escolhe a palavra certa. Pop-up sobre a cena do capítulo. COMPLETE[cap].
// ============================================================================

interface CompleteCfg { ref: string; before: string; answer: string; after: string; options: string[] }

const COMPLETE: Record<string, CompleteCfg> = {
  "genesis:4": { ref: "Gênesis 4:7", before: "Se procederes bem, não é certo que serás", answer: "aceito", after: "? Mas, se não procederes bem, o pecado jaz à porta.", options: ["aceito", "punido", "esquecido", "julgado"] },
  "genesis:10": { ref: "Gênesis 10:9", before: "Ele foi poderoso", answer: "caçador", after: "diante do Senhor.", options: ["caçador", "rei", "profeta", "pastor"] },
  "genesis:16": { ref: "Gênesis 16:13", before: "Tu és o Deus que", answer: "vê", after: ".", options: ["vê", "ouve", "salva", "julga"] },
  "genesis:22": { ref: "Gênesis 22:8", before: "Deus proverá para si o", answer: "cordeiro", after: ", meu filho.", options: ["cordeiro", "altar", "caminho", "sinal"] },
  "genesis:28": { ref: "Gênesis 28:15", before: "Eis que estou", answer: "contigo", after: ", e te guardarei por onde quer que fores.", options: ["contigo", "à frente", "no céu", "esperando"] },
  "genesis:34": { ref: "Gênesis 34:7", before: "Tal coisa não se", answer: "devia", after: "fazer em Israel.", options: ["devia", "podia", "queria", "iria"] },
  "genesis:40": { ref: "Gênesis 40:8", before: "Não são de", answer: "Deus", after: "as interpretações? Contai-me o sonho.", options: ["Deus", "faraó", "reis", "homens"] },
  "genesis:46": { ref: "Gênesis 46:3", before: "Não temas descer ao Egito, porque ali farei de ti uma grande", answer: "nação", after: ".", options: ["nação", "cidade", "casa", "família"] },
  // ---- Êxodo (slot "completar": caps 4, 10, 16) ----
  "exodus:4": { ref: "Êxodo 4:12", before: "Vai, pois, agora; eu serei com a tua", answer: "boca", after: ", e te ensinarei o que hás de falar.", options: ["boca", "mão", "voz", "vara"] },
  "exodus:10": { ref: "Êxodo 10:23", before: "Mas todos os filhos de Israel tinham", answer: "luz", after: "nas suas habitações.", options: ["luz", "paz", "pão", "água"] },
  "exodus:16": { ref: "Êxodo 16:4", before: "Eis que vos farei chover", answer: "pão", after: "dos céus.", options: ["pão", "fogo", "chuva", "orvalho"] },
};

export function hasComplete(bookId: string, chapter: number): boolean {
  return !!COMPLETE[`${bookId}:${chapter}`];
}

interface Props { bookId: string; chapter: number; chapterText?: string; look?: Partial<MascotLook>; onWin: () => void }

export default function RPGChallengeComplete({ bookId, chapter, chapterText, look, onWin }: Props) {
  const cfg = COMPLETE[`${bookId}:${chapter}`];
  const opts = useMemo(() => {
    if (!cfg) return [];
    let s = 7 + chapter;
    const rnd = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    return [...cfg.options].sort(() => rnd() - 0.5);
  }, [cfg, chapter]);
  const [picked, setPicked] = useState<string | null>(null);
  if (!cfg) return null;
  const done = picked === cfg.answer;

  const choose = (o: string) => {
    if (done) return;
    setPicked(o);
    if (o === cfg.answer) setTimeout(onWin, 1400);
    else setTimeout(() => setPicked(null), 700);
  };

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden">
      <RPGSceneBackdrop bookId={bookId} chapter={chapter} chapterText={chapterText} look={look} showHero dim={0.62} />
      <div className="relative h-full flex items-center justify-center p-3 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-[440px] rounded-2xl border-2 border-[#e8b04b] bg-[#0b1120f2] p-4 shadow-[0_0_0_2px_#0b0805,0_20px_50px_-20px_#000]">
          <p className="text-[11px] font-black uppercase tracking-wider text-[#ffd889]">⚔️ Desafio do capítulo</p>
          <h3 className="rpg-title text-base mt-0.5">Complete o versículo</h3>
          <p className="text-[11px] text-[#cdbfa0] mt-1">{cfg.ref}</p>

          <p className="text-[15px] leading-relaxed text-blue-50 mt-3">
            {cfg.before}{" "}
            <span className={`inline-block min-w-[70px] text-center font-black px-2 py-0.5 rounded border-2 ${done ? "bg-[#3f8a3f] border-[#57b45a] text-white" : "bg-[#141c30] border-[#e8b04b] text-[#ffd889]"}`}>
              {done ? cfg.answer : "______"}
            </span>{" "}
            {cfg.after}
          </p>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {opts.map((o, i) => {
              const wrong = picked === o && o !== cfg.answer;
              const ok = picked === o && o === cfg.answer;
              return (
                <button key={i} onClick={() => choose(o)} disabled={done}
                  className={`rpg-opt p-2.5 text-[13px] font-bold ${ok ? "!border-green-500 !bg-green-600/25" : wrong ? "!border-red-500 !bg-red-600/20" : ""}`}>
                  {o}
                </button>
              );
            })}
          </div>
          {done && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[13px] font-black text-[#ffd889] mt-3">🎉 Isso mesmo!</motion.p>}
        </motion.div>
      </div>
    </div>
  );
}
