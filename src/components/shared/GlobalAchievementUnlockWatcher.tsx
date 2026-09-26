import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useClaimableAchievements } from "@/hooks/useClaimableAchievements";
import { pedidoAoSair } from "@/lib/presenca";
import { toast } from "@/lib/avisos";
import { EVENTO_CELEBRAR } from "@/lib/celebrar";

/**
 * O AVISO DE CONQUISTA — quando uma conquista fica pronta para resgatar, a
 * pessoa fica sabendo, em qualquer tela:
 * - NO APP: o Devocionalzeiro aparece e diz qual foi, com o botão "Resgatar",
 *   que leva direto à cena de resgate daquela conquista;
 * - FORA DO APP: push só faz sentido para quem não está aqui. Quando a pessoa
 *   SAI do app (a tela vai para o fundo) deixando conquistas por resgatar, a
 *   função `notificar-conquista` põe o aviso no sino e manda o push (celular e
 *   navegador), que abre o mesmo resgate. O servidor garante UM push por
 *   conquista, mesmo com vários aparelhos.
 *
 * Cada conquista é avisada uma vez (a lista fica no aparelho). Na primeira vez
 * que a conta passa por aqui, o que já estava pendente vira um resumo só, sem
 * push — para não despejar dez notificações de uma vez em quem já jogava.
 *
 * As conquistas são recontadas quando algo pode tê-las mudado: depois de cada
 * comemoração (capítulo, devocional…) e ao trocar de tela.
 */
export const GlobalAchievementUnlockWatcher = () => {
  const { user } = useAuth();
  const uid = user?.id;
  const location = useLocation();
  const navigate = useNavigate();
  const { resgataveis, loading, refetch } = useClaimableAchievements(uid);
  const ultimaConta = useRef(0);

  // comemorou → as estatísticas mudaram: reconta logo depois da festa
  useEffect(() => {
    const aoCelebrar = () => window.setTimeout(() => { ultimaConta.current = Date.now(); refetch(); }, 1800);
    window.addEventListener(EVENTO_CELEBRAR, aoCelebrar);
    return () => window.removeEventListener(EVENTO_CELEBRAR, aoCelebrar);
  }, [refetch]);

  // trocou de tela: reconta, no máximo a cada 45 s
  useEffect(() => {
    if (!uid || Date.now() - ultimaConta.current < 45_000) return;
    ultimaConta.current = Date.now();
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, uid]);

  useEffect(() => {
    if (!uid || loading) return;
    const chave = `dz.conquistas.avisadas.${uid}`;
    let lido: string | null = null;
    try { lido = localStorage.getItem(chave); } catch { /* sem armazenamento */ }
    const avisadas = new Set<string>(lido ? (JSON.parse(lido) as string[]) : []);
    const novas = resgataveis.filter((c) => !avisadas.has(c.id));
    if (!novas.length) return;
    novas.forEach((c) => avisadas.add(c.id));
    try { localStorage.setItem(chave, JSON.stringify([...avisadas])); } catch { /* sem armazenamento */ }

    const uma = novas.length === 1 ? novas[0] : null;
    const link = uma ? `/conquistas?resgatar=${encodeURIComponent(uma.id)}` : "/conquistas";
    // na própria página de conquistas, o painel já mostra tudo
    if (location.pathname !== "/conquistas") {
      toast.success(uma ? `Conquista desbloqueada: ${uma.titulo}!` : `${novas.length} conquistas prontas para resgatar!`, {
        description: uma ? `${uma.pontos} pontos esperando por você.` : "Os pontos estão esperando por você.",
        action: { label: "Resgatar", onClick: () => navigate(link) },
        duration: 8000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resgataveis, loading, uid]);

  // saiu do app com conquistas por resgatar → o push (uma vez por conquista)
  const pendentes = useRef(resgataveis);
  pendentes.current = resgataveis;
  useEffect(() => {
    if (!uid) return;
    const chave = `dz.conquistas.push.${uid}`;
    const aoSair = () => {
      if (document.visibilityState !== "hidden") return;
      let ja = new Set<string>();
      try { ja = new Set(JSON.parse(localStorage.getItem(chave) || "[]") as string[]); } catch { /* sem armazenamento */ }
      const faltam = pendentes.current.filter((c) => !ja.has(c.id));
      if (!faltam.length) return;
      faltam.forEach((c) => ja.add(c.id));
      try { localStorage.setItem(chave, JSON.stringify([...ja])); } catch { /* sem armazenamento */ }
      pedidoAoSair("/functions/v1/notificar-conquista", "POST", { conquistas: faltam.map((c) => ({ id: c.id, titulo: c.titulo })) });
    };
    document.addEventListener("visibilitychange", aoSair);
    return () => document.removeEventListener("visibilitychange", aoSair);
  }, [uid]);

  return null;
};
