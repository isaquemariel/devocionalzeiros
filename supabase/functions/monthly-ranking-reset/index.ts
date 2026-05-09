import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Require service-role caller
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  const parts = token.split(".");
  let role: string | undefined;
  if (parts.length >= 2) {
    try {
      const payload = parts[1].replaceAll("-", "+").replaceAll("_", "/")
        .padEnd(Math.ceil(parts[1].length / 4) * 4, "=");
      role = (JSON.parse(atob(payload)) as any)?.role;
    } catch {}
  }
  if (role !== "service_role") {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Starting monthly ranking reset...");

    // Call the save_monthly_ranking_and_reset function
    const { data, error } = await supabase.rpc("save_monthly_ranking_and_reset");

    if (error) {
      console.error("Error executing monthly reset:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Erro interno. Tente novamente." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Monthly ranking reset completed successfully!");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Monthly ranking saved and reset completed",
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Unexpected error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(
      JSON.stringify({ success: false, error: "Erro interno. Tente novamente." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
