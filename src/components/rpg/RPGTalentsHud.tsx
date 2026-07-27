import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRPGTalents } from "@/hooks/useRPGTalents";

// Pop-up estilo RPG para resgatar Talentos (1 botão só: Resgatar)
const ClaimModal = ({ isOpen, amount, onClaim }: { isOpen: boolean; amount: number; onClaim: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-[125] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-[280px] rounded-2xl border-2 border-[#e8b04b] p-6 text-center overflow-hidden"
          style={{ background: "linear-gradient(180deg,#1c1710,#0c0a06)" }}
          initial={{ scale: 0.7, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-30"
            style={{ background: "radial-gradient(circle at 50% 30%, #ffd54a55, transparent 60%)" }} />
          <p className="relative text-xs font-black tracking-[0.2em] text-[#ffd889]/80 uppercase mb-1">Talentos recebidos!</p>
          <motion.div className="relative text-6xl my-3 mx-auto w-fit"
            animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >🪙</motion.div>
          <p className="relative text-4xl font-black text-[#ffd54a] leading-none">+{amount}</p>
          <p className="relative mt-3 text-xs text-white/65 leading-snug">
            Você ganha Talentos concluindo capítulos e acertando desafios. Use-os na loja!
          </p>
          <button
            onClick={onClaim}
            className="relative mt-5 w-full py-2.5 rounded-xl font-black text-[#2a1c05] bg-gradient-to-b from-[#ffe08a] to-[#e8b04b] active:scale-95 transition"
          >
            Resgatar
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

interface FlyCoin { id: number; x: number; y: number; dx: number; dy: number; delay: number }

/** Pílula de saldo de Talentos + pop-up de resgate + animação de moedas voando. */
export const RPGTalentsHud = ({ userId }: { userId?: string }) => {
  const { balance, unclaimed, loading, claim } = useRPGTalents(userId);
  const [display, setDisplay] = useState(0);
  const [showClaim, setShowClaim] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [coins, setCoins] = useState<FlyCoin[]>([]);
  const pillRef = useRef<HTMLButtonElement>(null);
  const shownRef = useRef(false);

  // enquanto não anima, o saldo exibido acompanha o real
  useEffect(() => { if (!claiming) setDisplay(balance); }, [balance, claiming]);

  // abre o pop-up quando há talentos a resgatar (uma vez por entrada na home)
  useEffect(() => {
    if (!loading && unclaimed > 0 && !shownRef.current) { shownRef.current = true; setShowClaim(true); }
  }, [loading, unclaimed]);

  const countUp = (from: number, to: number, ms: number) => {
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const handleClaim = async () => {
    if (claiming) return;
    setClaiming(true);
    const amount = unclaimed;
    const from = balance;

    const pill = pillRef.current?.getBoundingClientRect();
    const originX = window.innerWidth / 2;
    const originY = window.innerHeight / 2;
    const targetX = pill ? pill.left + pill.width / 2 : originX;
    const targetY = pill ? pill.top + pill.height / 2 : 40;

    const n = Math.max(6, Math.min(16, amount));
    const arr: FlyCoin[] = Array.from({ length: n }, (_, i) => {
      const ox = originX + (Math.random() * 60 - 30);
      const oy = originY + (Math.random() * 40 - 20);
      return { id: i, x: ox, y: oy, dx: targetX - ox, dy: targetY - oy, delay: i * 0.05 };
    });

    setShowClaim(false);
    setCoins(arr);
    const claimed = await claim();               // resgata no servidor
    countUp(from, from + (claimed || amount), 950); // saldo sobe enquanto voam
    window.setTimeout(() => { setCoins([]); setClaiming(false); }, 1150 + n * 50);
  };

  if (!userId) return null;

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button
            ref={pillRef}
            type="button"
            aria-label={`Talentos: ${display}. Toque para saber mais.`}
            className="flex items-center gap-1 bg-black/55 border rounded-lg px-2 py-1 hover:bg-black/70 active:scale-95 transition cursor-pointer"
            style={{ borderColor: "#ffd88966" }}
          >
            <span className="text-[11px] leading-none" aria-hidden="true">🪙</span>
            <motion.span
              key={display}
              className="text-[11px] font-black text-[#ffd889]"
              initial={{ scale: 1 }} animate={claiming ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              {display}
            </motion.span>
          </button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="start" className="w-60 p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base leading-none" aria-hidden="true">🪙</span>
            <span className="font-bold text-sm">Talentos</span>
          </div>
          <p className="text-xs text-muted-foreground leading-snug">
            A moeda do jogo. Você ganha concluindo capítulos e acertando desafios, e usa na loja
            para desbloquear itens do seu personagem.
          </p>
        </PopoverContent>
      </Popover>

      {/* moedas voando até a pílula de saldo */}
      <AnimatePresence>
        {coins.map((c) => (
          <motion.div
            key={c.id}
            className="fixed z-[130] text-xl pointer-events-none select-none"
            style={{ left: c.x, top: c.y }}
            initial={{ x: 0, y: 0, scale: 0.6, opacity: 0 }}
            animate={{ x: c.dx, y: c.dy, scale: [0.6, 1.15, 0.7], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.95, delay: c.delay, ease: "easeIn" }}
          >
            🪙
          </motion.div>
        ))}
      </AnimatePresence>

      <ClaimModal isOpen={showClaim} amount={unclaimed} onClaim={handleClaim} />
    </>
  );
};

export default RPGTalentsHud;
