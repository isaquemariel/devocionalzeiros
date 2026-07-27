import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Gift } from "lucide-react";
import { useRPGDaily, type DailyClaimResult } from "@/hooks/useRPGDaily";

// chave local só para não reabrir o pop-up várias vezes no mesmo dia após fechar
const seenKey = (uid: string) => {
  const d = new Date();
  const day = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  return `rpg_daily_seen_${uid}_${day}`;
};

/**
 * Recompensa diária de Talentos por constância.
 * - Renderiza a BARRA de progresso de constância (inline, posicionada por quem usa).
 * - Renderiza o POP-UP de boas-vindas/resgate (overlay fixo) no primeiro login do dia.
 */
export const RPGDailyReward = ({ userId, className }: { userId?: string; className?: string }) => {
  const { state, loading, claim } = useRPGDaily(userId);
  const [open, setOpen] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [result, setResult] = useState<DailyClaimResult | null>(null);
  const autoRef = useRef(false);

  // Abre o pop-up automaticamente no primeiro login do dia (uma vez).
  useEffect(() => {
    if (loading || !state || !userId || autoRef.current) return;
    autoRef.current = true;
    if (state.canClaim) {
      let seen = false;
      try { seen = !!localStorage.getItem(seenKey(userId)); } catch { /* ignore */ }
      if (!seen) setOpen(true);
    }
  }, [loading, state, userId]);

  const markSeen = () => { try { if (userId) localStorage.setItem(seenKey(userId), "1"); } catch { /* ignore */ } };

  const handleClaim = async () => {
    if (claiming) return;
    setClaiming(true);
    const res = await claim();
    setClaiming(false);
    if (res && (res.claimed || res.alreadyClaimed)) {
      setResult(res);
      markSeen();
    } else {
      // falha (rede/RPC ausente): fecha sem quebrar a experiência
      setOpen(false);
    }
  };

  const close = () => { markSeen(); setOpen(false); setResult(null); };

  // Sem usuário, carregando, ou RPC ainda indisponível (migration não aplicada):
  // não renderiza nada (degradação suave — a barra aparece quando os dados chegam).
  if (!userId || !state) return null;

  const streak = state?.streak ?? 0;
  const next = state?.nextMilestone ?? null;
  const canClaim = !!state?.canClaim;
  const pct = next ? Math.max(0, Math.min(100, (streak / next) * 100)) : 100;

  return (
    <>
      {/* ===== BARRA DE CONSTÂNCIA ===== */}
      <div className={className}>
        <div className="flex items-center gap-2 bg-black/55 border border-[#e8846b55] rounded-xl px-2.5 py-1.5">
          <Flame className="w-4 h-4 text-[#e8846b] shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5 gap-2">
              <span className="text-[10px] font-black text-[#e8b04b] tracking-wide">CONSTÂNCIA</span>
              <span className="text-[10px] font-bold text-[#e8846b] whitespace-nowrap">
                {next ? `${streak}/${next} dias` : `${streak} dias · máx`}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-black/50 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#e8846b] to-[#ffd889]"
                initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6 }}
              />
            </div>
          </div>
          {canClaim && (
            <button
              onClick={() => setOpen(true)}
              className="shrink-0 inline-flex items-center gap-1 text-[10px] font-black text-[#2a1c05] bg-gradient-to-b from-[#ffe08a] to-[#e8b04b] rounded-lg px-2 py-1 shadow-[0_0_10px_rgba(232,176,75,0.5)] animate-pulse"
            >
              <Gift className="w-3 h-3" /> Resgatar
            </button>
          )}
        </div>
      </div>

      {/* ===== POP-UP DE BOAS-VINDAS / RESGATE ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[125] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { if (result) close(); }}
          >
            <motion.div
              className="relative w-full max-w-[300px] rounded-2xl border-2 border-[#e8b04b] p-6 text-center overflow-hidden"
              style={{ background: "linear-gradient(180deg,#1c1710,#0c0a06)" }}
              initial={{ scale: 0.7, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 pointer-events-none opacity-40"
                style={{ background: "radial-gradient(circle at 50% 25%, #ffd54a55, transparent 62%)" }} />

              {!result ? (
                /* --- Oferta: boas-vindas + resgatar --- */
                <>
                  <p className="relative text-[11px] font-black tracking-[0.22em] text-[#ffd889]/80 uppercase mb-1">
                    Bem-vindo(a) de volta!
                  </p>
                  <div className="relative flex items-center justify-center gap-1.5 mb-2">
                    <Flame className="w-4 h-4 text-[#e8846b]" />
                    <span className="text-sm font-black text-[#e8846b]">{streak} {streak === 1 ? "dia" : "dias"} de constância</span>
                  </div>
                  <motion.div className="relative text-6xl my-2 mx-auto w-fit"
                    animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >🪙</motion.div>
                  <p className="relative text-lg font-black text-[#ffd54a] leading-tight">
                    +{state?.dailyAmount ?? 1} Talento{(state?.dailyAmount ?? 1) > 1 ? "s" : ""} de hoje
                  </p>
                  <p className="relative mt-2 text-xs text-white/70 leading-snug">
                    Essa é uma recompensa pela sua constância. Continue assim!
                    {next && (
                      <> Faltam <span className="text-[#ffd889] font-bold">{Math.max(0, next - streak)}</span> dia(s) para o bônus de <span className="text-[#ffd889] font-bold">{next}</span>.</>
                    )}
                  </p>
                  <button
                    onClick={handleClaim}
                    disabled={claiming}
                    className="relative mt-5 w-full py-2.5 rounded-xl font-black text-[#2a1c05] bg-gradient-to-b from-[#ffe08a] to-[#e8b04b] active:scale-95 transition disabled:opacity-60"
                  >
                    {claiming ? "Resgatando…" : "Resgatar"}
                  </button>
                </>
              ) : (
                /* --- Confirmação: total creditado (+ bônus de marco) --- */
                <>
                  <p className="relative text-[11px] font-black tracking-[0.22em] text-[#ffd889]/80 uppercase mb-1">
                    {result.alreadyClaimed ? "Recompensa de hoje" : "Recompensa resgatada!"}
                  </p>
                  <motion.div className="relative text-6xl my-2 mx-auto w-fit"
                    initial={{ scale: 0.4, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 240, damping: 12 }}
                  >{result.bonusMilestone ? "🏆" : "🪙"}</motion.div>

                  {result.alreadyClaimed ? (
                    <p className="relative text-sm text-white/75 leading-snug">
                      Você já resgatou o talento de hoje. Volte amanhã para manter a sua constância!
                    </p>
                  ) : (
                    <>
                      <p className="relative text-4xl font-black text-[#ffd54a] leading-none">+{result.total}</p>
                      <p className="relative mt-1 text-[11px] text-white/60">Talento{result.total > 1 ? "s" : ""} creditado{result.total > 1 ? "s" : ""}</p>
                      {result.bonusMilestone && (
                        <motion.div
                          className="relative mt-3 rounded-xl border border-[#ffd88966] bg-[#ffd8891a] px-3 py-2"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                        >
                          <p className="text-xs font-black text-[#ffd889]">🎉 {result.bonusMilestone} dias de constância!</p>
                          <p className="text-[11px] text-white/70">Bônus de +{result.bonusAmount} talentos pela sua dedicação.</p>
                        </motion.div>
                      )}
                    </>
                  )}
                  <button
                    onClick={close}
                    className="relative mt-5 w-full py-2.5 rounded-xl font-black text-[#2a1c05] bg-gradient-to-b from-[#ffe08a] to-[#e8b04b] active:scale-95 transition"
                  >
                    Continuar
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RPGDailyReward;
