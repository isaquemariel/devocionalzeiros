import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Motivational messages that start with "Fala Devocionalzeiro!"
const motivationalMessages = [
  "Fala Devocionalzeiro! 🙏 Hoje é mais um dia para se conectar com a Palavra. Seus capítulos te esperam!",
  "Fala Devocionalzeiro! ✨ A Bíblia tem algo especial pra você hoje. Bora ler?",
  "Fala Devocionalzeiro! 🔥 Não deixe o dia passar sem alimentar sua alma. Hora da leitura!",
  "Fala Devocionalzeiro! 📖 Cada capítulo lido é um passo mais perto de Deus. Vamos juntos?",
  "Fala Devocionalzeiro! 💪 Força na caminhada! Seus capítulos de hoje estão te chamando.",
  "Fala Devocionalzeiro! 🌟 Deus tem uma mensagem pra você hoje. Abre a Bíblia e descubra!",
  "Fala Devocionalzeiro! 🙌 Mais um dia de vitória te aguarda. Começa pela Palavra!",
  "Fala Devocionalzeiro! 📚 Lembrete do dia: a leitura bíblica transforma vidas. A sua também!",
  "Fala Devocionalzeiro! ⭐ Não importa como foi seu dia, a Palavra sempre renova. Bora ler!",
  "Fala Devocionalzeiro! 🕊️ Paz e sabedoria te esperam nos capítulos de hoje. Vem!",
  "Fala Devocionalzeiro! 💫 Deus está falando. Você está ouvindo? Hora de abrir a Bíblia!",
  "Fala Devocionalzeiro! 🎯 Foco na meta! Cada dia conta na sua jornada bíblica.",
  "Fala Devocionalzeiro! ❤️ A Palavra de Deus é o melhor presente do dia. Abre e recebe!",
  "Fala Devocionalzeiro! 🌈 Promessas incríveis te aguardam na leitura de hoje!",
  "Fala Devocionalzeiro! 🚀 Sua sequência de leitura depende de você. Não quebra o ritmo!",
];

function getRandomMessage(): string {
  const index = Math.floor(Math.random() * motivationalMessages.length);
  return motivationalMessages[index];
}

async function sendWhatsAppMessage(phone: string, message: string, apiUrl: string, apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": apiKey,
      },
      body: JSON.stringify({
        phone: phone,
        message: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to send to ${phone}:`, errorText);
      return false;
    }

    console.log(`Successfully sent to ${phone}`);
    return true;
  } catch (error) {
    console.error(`Error sending to ${phone}:`, error);
    return false;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const apiUrl = Deno.env.get("EVOLUTION_API_URL");
    const apiKey = Deno.env.get("EVOLUTION_API_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    if (!apiUrl || !apiKey) {
      throw new Error("Missing WhatsApp API configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all users with WhatsApp enabled
    const { data: users, error } = await supabase
      .from("profiles")
      .select("user_id, full_name, whatsapp_phone")
      .eq("whatsapp_enabled", true)
      .not("whatsapp_phone", "is", null);

    if (error) {
      console.error("Error fetching users:", error);
      throw error;
    }

    if (!users || users.length === 0) {
      console.log("No users with WhatsApp enabled");
      return new Response(
        JSON.stringify({ message: "No users to notify", sent: 0 }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Found ${users.length} users to notify`);

    let successCount = 0;
    let failCount = 0;

    // Send messages with delay between each to avoid rate limiting
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const message = getRandomMessage();
      
      // Personalize message with user name if available
      const personalizedMessage = user.full_name 
        ? message.replace("Devocionalzeiro!", `Devocionalzeiro, ${user.full_name.split(' ')[0]}!`)
        : message;

      const success = await sendWhatsAppMessage(
        user.whatsapp_phone,
        personalizedMessage,
        apiUrl,
        apiKey
      );

      if (success) {
        successCount++;
      } else {
        failCount++;
      }

      // Wait 2-5 seconds between messages to avoid rate limiting
      if (i < users.length - 1) {
        const delay = 2000 + Math.random() * 3000; // 2-5 seconds
        await sleep(delay);
      }
    }

    console.log(`Sent ${successCount} messages, ${failCount} failed`);

    return new Response(
      JSON.stringify({
        message: "Daily reminders sent",
        total: users.length,
        sent: successCount,
        failed: failCount,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in daily-whatsapp-reminders:", error);
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
