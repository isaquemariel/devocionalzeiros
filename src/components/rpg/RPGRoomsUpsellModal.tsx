import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Crown, MessageCircle, Users, Globe, Sparkles, Check } from "lucide-react";
import { drawHeavenScene } from "@/lib/rpgHeavenScene";
import { drawMascot, DEFAULT_LOOK, type MascotLook } from "@/lib/rpgMascot";

// Prévia "vários usuários na sala" — a mesma cena do Céu (Sala Global) com
// alguns personagens variados. Convence mostrando exatamente o que se ganha.
const PREVIEW: { x: number; depth: number; look: MascotLook }[] = [
  { x: 0.22, depth: 0.35, look: { ...DEFAULT_LOOK, head: "crown", robe: "royal" } },
  { x: 0.5, depth: 0.62, look: { ...DEFAULT_LOOK, head: "halo", wings: "dove", robe: "priest" } },
  { x: 0.78, depth: 0.4, look: { ...DEFAULT_LOOK, head: "turban", beard: true, robe: "prophet" } },
  { x: 0.38, depth: 0.85, look: { ...DEFAULT_LOOK, head: "cap", shield: true } },
];

const BENEFITS = [
  { icon: MessageCircle, text: "Bate-papo ao vivo com outros leitores" },
  { icon: Users, text: "Uma sala em cada livro (Gênesis a Apocalipse)" },
  { icon: Sparkles, text: "Veja todo mundo em tempo real com seus trajes" },
  { icon: Globe, text: "Sala Global no Céu — no plano Premium" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RPGRoomsUpsellModal({ open, onClose }: Props) {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!open) return;
    const cv = canvasRef.current;
    if (!cv) return;
    const g = cv.getContext("2d");
    if (!g) return;
    const W = 380, H = 200, GROUND = Math.round(H * 0.68);
    cv.width = W; cv.height = H;
    g.imageSmoothingEnabled = false;
    // fundo: o Céu (Sala Global)
    drawHeavenScene(g, { W, H, GROUND }, 0, true);
    // personagens (fundo → frente p/ sobreposição correta)
    const band = (d: number) => Math.round(H * 0.5 + d * (H * 0.9 - H * 0.5));
    [...PREVIEW].sort((a, b) => a.depth - b.depth).forEach((p) => {
      drawMascot(g, Math.round(W * p.x), band(p.depth), p.look, { t: 0, reduce: true, walking: false, mood: "happy" });
    });
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-[#0e0b16] border border-[#4f9bff55] shadow-2xl"
            initial={{ scale: 0.9, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} aria-label="Fechar" className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition">
              <X className="w-4 h-4 text-white/80" />
            </button>

            {/* Prévia da sala com vários usuários */}
            <div className="relative w-full aspect-[19/10] bg-[#0a1226]">
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} aria-hidden="true" />
              {/* balões simulando conversa */}
              <div className="absolute left-[8%] top-[16%] text-[10px] font-semibold text-[#15161d] bg-white/95 rounded-lg px-2 py-1 shadow">Paz do Senhor! 🙏</div>
              <div className="absolute right-[6%] top-[30%] text-[10px] font-semibold text-[#15161d] bg-white/95 rounded-lg px-2 py-1 shadow">Amém, irmãos!</div>
              <div className="absolute left-[30%] bottom-[10%] text-[10px] font-semibold text-white bg-[#2f6df6]/95 rounded-lg px-2 py-1 shadow">Que bênção esse lugar ✨</div>
              <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0e0b16] to-transparent" />
            </div>

            {/* Conteúdo */}
            <div className="px-5 pt-3 pb-5">
              <h2 className="text-lg font-black text-white inline-flex items-center gap-1.5">
                <MessageCircle className="w-5 h-5 text-[#4f9bff]" /> Salas de bate-papo
              </h2>
              <p className="text-[13px] text-white/65 mt-1 leading-relaxed">
                Converse e explore o mundo com outros viajantes em tempo real. Um benefício exclusivo dos planos
                <span className="text-[#ffd889] font-bold"> GOLD</span> e superiores.
              </p>

              <ul className="mt-3 space-y-1.5">
                {BENEFITS.map((b) => (
                  <li key={b.text} className="flex items-center gap-2 text-[13px] text-white/85">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#4f9bff22] border border-[#4f9bff55] flex items-center justify-center">
                      <b.icon className="w-3 h-3 text-[#8fd3ff]" />
                    </span>
                    {b.text}
                  </li>
                ))}
                <li className="flex items-center gap-2 text-[13px] text-white/85">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-300" />
                  </span>
                  E todo o restante do plano GOLD
                </li>
              </ul>

              <button
                onClick={() => { onClose(); navigate("/escolher-plano"); }}
                className="mt-4 w-full py-3 rounded-xl font-black text-[#1a1206] bg-[#e8b04b] hover:bg-[#f0bd5e] active:scale-[0.98] transition inline-flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4" /> Fazer upgrade
              </button>
              <button onClick={onClose} className="mt-2 w-full py-2 text-[13px] text-white/50 hover:text-white/75 transition">
                Agora não
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
