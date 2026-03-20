// @deno-types="npm:@types/web-push"
import webpush from "npm:web-push";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// One-time utility to generate VAPID keys
// Call this once, save the keys as secrets, then you won't need it again
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const existingPublic = Deno.env.get("VAPID_PUBLIC_KEY");
  const existingPrivate = Deno.env.get("VAPID_PRIVATE_KEY");

  // If already generated, just return the public key
  if (existingPublic && existingPrivate) {
    return new Response(
      JSON.stringify({
        message: "VAPID keys already configured",
        publicKey: existingPublic,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const vapidKeys = webpush.generateVAPIDKeys();

  return new Response(
    JSON.stringify({
      message: "Save these as secrets: VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY",
      publicKey: vapidKeys.publicKey,
      privateKey: vapidKeys.privateKey,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
