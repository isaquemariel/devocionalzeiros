import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CenaDoDia, ESTILO_CENA } from "./CenaDoDia";
import { useMomentoDoDia } from "./useMomentoDoDia";

/**
 * A cena do dia como FUNDO de uma tela que não é a inicial (o login, o
 * cadastro): a mesma Jerusalém na hora de agora, com um véu escuro por cima
 * para o formulário ler. Quem entra de dia continua de dia; à noite, à noite.
 * O sol (ou a lua) fica num canto do alto: o meio é do formulário e do
 * personagem.
 */
export function FundoDoDia({ veu = "rgba(4,8,16,0.72)" }: { veu?: string }) {
  const m = useMomentoDoDia();
  const reduzir = !!useReducedMotion();
  const caixa = useRef<HTMLDivElement>(null);
  const [proporcao, setProporcao] = useState(() => window.innerWidth / Math.max(1, window.innerHeight));

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      if (width > 0 && height > 0) setProporcao(width / height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={caixa} className="pointer-events-none absolute inset-0 overflow-hidden" style={{ background: m.ceu.topo }} aria-hidden="true">
      <style>{ESTILO_CENA}</style>
      <CenaDoDia momento={m} proporcao={proporcao} reduzir={reduzir} astro="canto" />
      <div className="absolute inset-0" style={{ background: veu }} />
    </div>
  );
}
