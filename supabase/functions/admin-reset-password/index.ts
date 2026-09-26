import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function generateTempPassword(): string {
  // 10 chars: mix letters + numbers, easy to read (no 0/O, 1/l)
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let out = "";
  const arr = new Uint32Array(10);
  crypto.getRandomValues(arr);
  for (let i = 0; i < 10; i++) out += chars[arr[i] % chars.length];
  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Validate caller is admin
    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: claimsErr } = await userClient.auth.getClaims(token);
    if (claimsErr || !claims?.claims?.sub) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const callerId = claims.claims.sub as string;
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    const { data: roleData, error: roleErr } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", callerId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleErr || !roleData) {
      return new Response(JSON.stringify({ error: "Forbidden: admin only" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const targetEmail = (body?.email || "").toString().trim().toLowerCase();
    if (!targetEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Acha a conta pelo e-mail direto no banco (paginar listUsers parava nos
    // primeiros 10 mil usuários e devolvia "User not found" para o resto)
    let targetUserId: string | null = null;
    const { data: achado, error: achaErr } = await admin.rpc("admin_find_user_id_by_email", { p_email: targetEmail });
    if (!achaErr) {
      targetUserId = (achado as string | null) ?? null;
    } else {
      // banco ainda sem a função: procura página a página (sem teto)
      console.warn("admin_find_user_id_by_email indisponível, usando listUsers:", achaErr.message);
      for (let page = 1; !targetUserId; page++) {
        const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
        if (error) throw error;
        targetUserId = data.users.find((u) => u.email?.toLowerCase() === targetEmail)?.id ?? null;
        if (data.users.length < 1000) break;
      }
    }

    if (!targetUserId) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const tempPassword = generateTempPassword();

    const { error: updErr } = await admin.auth.admin.updateUserById(targetUserId, {
      password: tempPassword,
    });
    if (updErr) throw updErr;

    // Mark profile so the app forces a password change on next login
    const { error: perfErr } = await admin
      .from("profiles")
      .update({ must_change_password: true, updated_at: new Date().toISOString() })
      .eq("user_id", targetUserId);
    if (perfErr) throw perfErr;

    // Derruba TODAS as sessões da conta (se a troca foi por conta invadida, o
    // invasor sai junto). `auth.admin.signOut` pede o token da pessoa, não o
    // id — com o id ele falhava em silêncio e as sessões continuavam vivas.
    // (a senha já foi trocada: se o banco ainda não tem a função, avisa no log
    // em vez de devolver erro para uma troca que deu certo)
    const { error: sessErr } = await admin.rpc("admin_revoke_sessions", { p_user_id: targetUserId });
    if (sessErr) console.error("não consegui derrubar as sessões:", sessErr.message);

    return new Response(
      JSON.stringify({
        success: true,
        email: targetEmail,
        temp_password: tempPassword,
        must_change_password: true,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (e: any) {
    console.error("admin-reset-password error:", e);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
