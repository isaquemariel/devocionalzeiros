import { Capacitor } from "@capacitor/core";
import { supabase } from "@/integrations/supabase/client";

/**
 * O PUSH DESTE APARELHO pertence a quem está logado nele.
 *
 * Num celular ou computador compartilhado, a inscrição do navegador (web) e o
 * token do FCM/APNs (nativo) ficavam salvos na conta de quem entrou primeiro:
 * quem saía continuava recebendo os pushes no aparelho de quem entrou, e a
 * pessoa nova não recebia nada. Agora:
 * - ao ENTRAR, a inscrição/token existente passa para a conta atual;
 * - ao SAIR, eles deixam de ser da conta que saiu.
 */

let tokenNativo: string | null = null;
export const guardarTokenNativo = (t: string | null) => { tokenNativo = t; };

async function inscricaoWeb(): Promise<PushSubscription | null> {
  try {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return null;
    const reg = await navigator.serviceWorker.getRegistration();
    return (await reg?.pushManager.getSubscription()) ?? null;
  } catch { return null; }
}

/** entrou: a inscrição que o navegador já tem passa a ser DESTA conta */
export async function reclamarPushDesteAparelho(): Promise<void> {
  if (Capacitor.isNativePlatform()) return; // o nativo reclama ao registrar o token
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
  const sub = await inscricaoWeb();
  if (!sub) return;
  const j = sub.toJSON();
  const chave = sub.options?.applicationServerKey
    ? btoa(String.fromCharCode(...new Uint8Array(sub.options.applicationServerKey as ArrayBuffer)))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
    : undefined;
  await supabase.functions.invoke("save-push-subscription", {
    body: { endpoint: j.endpoint, p256dh: j.keys?.p256dh, auth: j.keys?.auth, vapid_key: chave },
  }).catch(() => { /* melhor esforço */ });
}

/** vai sair: chame ANTES do signOut (ainda com a sessão válida) */
export async function soltarPushDesteAparelho(): Promise<void> {
  const tarefas: Promise<unknown>[] = [];
  const sub = await inscricaoWeb();
  if (sub) {
    tarefas.push(supabase.functions.invoke("save-push-subscription", { body: { endpoint: sub.endpoint, unsubscribe: true } }).catch(() => null));
  }
  if (tokenNativo) {
    const t = tokenNativo;
    tarefas.push((async () => {
      const { error } = await supabase.rpc("soltar_token_nativo" as never, { p_token: t } as never);
      // banco ainda sem a função: apaga direto (o RLS deixa apagar a própria linha)
      if (error) await supabase.from("native_push_tokens").delete().eq("token", t);
    })().catch(() => null));
  }
  // não segura a saída mais que um instante
  await Promise.race([Promise.all(tarefas), new Promise((r) => setTimeout(r, 2500))]);
}
