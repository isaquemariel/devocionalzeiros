import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WhatsAppRequest {
  phone: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("Missing authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error("Authentication failed:", authError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { phone, message }: WhatsAppRequest = await req.json();

    if (!phone || !message) {
      console.error("Missing phone or message");
      return new Response(
        JSON.stringify({ error: "Phone and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Verify user can only send to their own registered phone number
    const { data: profile } = await supabase
      .from('profiles')
      .select('whatsapp_phone, whatsapp_enabled')
      .eq('user_id', user.id)
      .single();

    // Clean phone numbers for comparison
    const cleanPhone = phone.replace(/\D/g, "");
    const cleanProfilePhone = profile?.whatsapp_phone?.replace(/\D/g, "") || "";

    if (!profile?.whatsapp_enabled || cleanProfilePhone !== cleanPhone) {
      console.error("User not authorized to send to this phone number");
      return new Response(
        JSON.stringify({ error: "Can only send to your verified phone number" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const apiUrl = Deno.env.get("EVOLUTION_API_URL");
    const apiKey = Deno.env.get("EVOLUTION_API_KEY");

    if (!apiUrl || !apiKey) {
      console.error("Missing API configuration");
      return new Response(
        JSON.stringify({ error: "WhatsApp API not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Sending WhatsApp message to ${cleanPhone} for user ${user.id}`);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": apiKey,
      },
      body: JSON.stringify({
        phone: cleanPhone,
        message: message,
      }),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error("WhatsApp API error:", responseData);
      return new Response(
        JSON.stringify({ error: "Failed to send WhatsApp message", details: responseData }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("WhatsApp message sent successfully:", responseData);

    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-whatsapp function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
