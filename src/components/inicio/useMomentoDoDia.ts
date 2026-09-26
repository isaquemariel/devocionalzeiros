import { useEffect, useMemo, useState } from "react";
import { momentoDoDia, type Momento } from "@/lib/ceu";

/**
 * A hora de agora, para os fundos que seguem o dia. Recalcula a cada meio
 * minuto (quem fica na tela vê o céu andar) e na volta ao app — quem deixou a
 * tela aberta de tarde e voltou à noite encontra a noite, não a tarde parada.
 *
 * `?hora=19.5` na URL fixa a hora (para conferir a cena em qualquer horário
 * sem mexer no relógio do aparelho).
 */
function relogio(): Date {
  const agora = new Date();
  try {
    const h = new URLSearchParams(window.location.search).get("hora");
    if (h != null && h !== "") {
      const n = Number(h);
      if (Number.isFinite(n) && n >= 0 && n < 24) {
        const d = new Date(agora);
        d.setHours(Math.floor(n), Math.round((n % 1) * 60), 0, 0);
        return d;
      }
    }
  } catch { /* sem URL: vale o relógio */ }
  return agora;
}

export function useMomentoDoDia(): Momento {
  const [agora, setAgora] = useState(relogio);
  useEffect(() => {
    const tique = () => setAgora(relogio());
    const id = window.setInterval(tique, 30_000);
    const volta = () => { if (document.visibilityState === "visible") tique(); };
    document.addEventListener("visibilitychange", volta);
    window.addEventListener("focus", tique);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", volta);
      window.removeEventListener("focus", tique);
    };
  }, []);
  return useMemo(() => momentoDoDia(agora), [agora]);
}
