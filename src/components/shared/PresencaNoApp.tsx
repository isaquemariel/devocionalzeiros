import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { presencaSaiu, presencaVisivel } from "@/lib/presenca";
import { irPara, toast } from "@/lib/avisos";

/**
 * Mantém a presença no app (ver `lib/presenca`) e é a rede de segurança do
 * push: se um push chegar com o app aberto (o service worker o segura e manda
 * para cá), quem diz é o Devocionalzeiro, não a bandeja do sistema.
 */
export function PresencaNoApp() {
  const { user } = useAuth();
  const uid = user?.id;

  useEffect(() => {
    if (!uid) return;
    const visivel = () => document.visibilityState === "visible";
    const aoMudar = () => { if (visivel()) void presencaVisivel(uid); else presencaSaiu(uid); };
    if (visivel()) void presencaVisivel(uid);
    const renovar = window.setInterval(() => { if (visivel()) void presencaVisivel(uid); }, 90_000);
    const aoSair = () => presencaSaiu(uid);
    document.addEventListener("visibilitychange", aoMudar);
    window.addEventListener("pagehide", aoSair);
    return () => {
      window.clearInterval(renovar);
      document.removeEventListener("visibilitychange", aoMudar);
      window.removeEventListener("pagehide", aoSair);
    };
  }, [uid]);

  // o push que chegou com o app na tela (o service worker não o exibe)
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const aoReceber = (e: MessageEvent) => {
      const d = e.data as { tipo?: string; title?: string; body?: string; url?: string } | null;
      if (d?.tipo !== "push-no-app" || !d.title) return;
      toast.info(d.title, { description: d.body, action: d.url ? { label: "Ver", onClick: () => irPara(d.url!) } : undefined });
    };
    navigator.serviceWorker.addEventListener("message", aoReceber);
    return () => navigator.serviceWorker.removeEventListener("message", aoReceber);
  }, []);

  return null;
}
