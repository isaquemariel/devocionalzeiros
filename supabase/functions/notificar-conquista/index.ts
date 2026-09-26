import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * NOTIFICAR CONQUISTA — a notificação nativa de "você desbloqueou uma
 * conquista, venha resgatar".
 *
 * As conquistas são contadas no aparelho (lib/conquistas). Dentro do app,
 * quem avisa é o Devocionalzeiro. Esta função é chamada quando a pessoa SAI
 * do app (a tela some) deixando conquistas por resgatar — o push só faz
 * sentido para quem está fora. Aqui:
 * 1. confere quem pediu (JWT) — só notifica A PRÓPRIA conta;
 * 2. aceita só ids do catálogo (`achievement_catalog`);
 * 3. registra em `achievement_notifications` (chave usuário+conquista): cada
 *    conquista notifica UMA vez na vida, mesmo com vários aparelhos abertos;
 * 4. para as novas, põe o aviso no sino do app (`user_notifications`) e manda o
 *    push (web + nativo, via `send-push-notification`), que abre o resgate.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);
    const userClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) return json({ error: "Unauthorized" }, 401);

    const body = await req.json().catch(() => ({}));
    const pedidas: { id: string; titulo: string }[] = Array.isArray(body?.conquistas)
      ? body.conquistas
          .filter((c: unknown) => c && typeof (c as { id?: unknown }).id === "string")
          .slice(0, 50)
          .map((c: { id: string; titulo?: unknown }) => ({
            id: c.id.slice(0, 64),
            // o título só vai para a própria pessoa; ainda assim, curto e sem marcação
            titulo: String(c.titulo ?? "").replace(/[<>]/g, "").slice(0, 60),
          }))
      : [];
    if (!pedidas.length) return json({ novas: 0 });

    const db = createClient(url, service);
    const { data: catalogo } = await db.from("achievement_catalog").select("achievement_id, points").in("achievement_id", pedidas.map((c) => c.id));
    const pontos = new Map((catalogo ?? []).map((c: { achievement_id: string; points: number }) => [c.achievement_id, c.points]));
    const validas = pedidas.filter((c) => pontos.has(c.id));
    if (!validas.length) return json({ novas: 0 });

    // só as que ainda não foram notificadas (a chave primária decide)
    const { data: inseridas, error: insErr } = await db
      .from("achievement_notifications")
      .upsert(validas.map((c) => ({ user_id: user.id, achievement_id: c.id })), { onConflict: "user_id,achievement_id", ignoreDuplicates: true })
      .select("achievement_id");
    if (insErr) return json({ error: insErr.message }, 500);
    const novas = validas.filter((c) => (inseridas ?? []).some((i: { achievement_id: string }) => i.achievement_id === c.id));
    if (!novas.length) return json({ novas: 0 });

    const uma = novas.length === 1;
    const titulo = uma ? "Conquista desbloqueada!" : `${novas.length} conquistas desbloqueadas!`;
    const texto = uma
      ? `${novas[0].titulo || "Uma nova conquista"} — toque para resgatar seus ${pontos.get(novas[0].id)} pontos.`
      : "Toque para resgatar seus pontos.";
    const link = uma ? `/conquistas?resgatar=${encodeURIComponent(novas[0].id)}` : "/conquistas";

    // o sino do app
    await db.from("user_notifications").insert({
      user_id: user.id, type: "achievement", title: titulo, body: texto, link,
      metadata: { conquistas: novas.map((c) => c.id) },
    });

    // o push (web + nativo)
    const r = await fetch(`${url}/functions/v1/send-push-notification`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${service}` },
      // ela está saindo agora: a presença ainda pode dizer "no app"
      body: JSON.stringify({ user_id: user.id, title: titulo, message: texto, url: link, source: "achievement", ignorar_presenca: true }),
    }).catch(() => null);

    return json({ novas: novas.length, push: r?.ok ?? false });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
