Deno.serve(() => {
  const sk = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
  const pk = Deno.env.get("STRIPE_PUBLIC_KEY") ?? Deno.env.get("STRIPE_PUBLISHABLE_KEY") ?? "";
  return new Response(JSON.stringify({
    secret: sk.startsWith("sk_live_") ? "sk_live_" : sk.startsWith("sk_test_") ? "sk_test_" : sk.slice(0, 8),
    publishable: pk.startsWith("pk_live_") ? "pk_live_" : pk.startsWith("pk_test_") ? "pk_test_" : pk.slice(0, 8),
  }), { headers: { "content-type": "application/json" } });
});
