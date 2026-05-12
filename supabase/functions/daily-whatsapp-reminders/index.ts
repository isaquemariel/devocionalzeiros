import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Motivational messages that start with "Fala Devocionalzeiro!"
// Messages are selected by day of year, so all users get the same message on the same day
const motivationalMessages = [
  "Fala Devocionalzeiro! 🙏 Hoje é mais um dia para se conectar com a Palavra. Seus capítulos e o devocional te esperam!",
  "Fala Devocionalzeiro! ✨ A Bíblia e o devocional têm algo especial pra você hoje. Bora ler?",
  "Fala Devocionalzeiro! 🔥 Não deixe o dia passar sem alimentar sua alma. Hora da leitura e do devocional!",
  "Fala Devocionalzeiro! 📖 Cada capítulo lido e devocional feito é um passo mais perto de Deus. Vamos juntos?",
  "Fala Devocionalzeiro! 💪 Força na caminhada! Seus capítulos e devocional de hoje estão te chamando.",
  "Fala Devocionalzeiro! 🌟 Deus tem uma mensagem pra você hoje. Abre a Bíblia e faz o devocional!",
  "Fala Devocionalzeiro! 🙌 Mais um dia de vitória te aguarda. Começa pela Palavra e pelo devocional!",
  "Fala Devocionalzeiro! 📚 Lembrete do dia: a leitura bíblica e o devocional transformam vidas. A sua também!",
  "Fala Devocionalzeiro! ⭐ Não importa como foi seu dia, a Palavra e o devocional sempre renovam. Bora ler!",
  "Fala Devocionalzeiro! 🕊️ Paz e sabedoria te esperam nos capítulos e no devocional de hoje. Vem!",
  "Fala Devocionalzeiro! 💫 Deus está falando. Você está ouvindo? Hora de abrir a Bíblia e o devocional!",
  "Fala Devocionalzeiro! 🎯 Foco na meta! Cada dia conta na sua jornada bíblica e devocional.",
  "Fala Devocionalzeiro! ❤️ A Palavra de Deus e o devocional são os melhores presentes do dia. Abre e recebe!",
  "Fala Devocionalzeiro! 🌈 Promessas incríveis te aguardam na leitura e no devocional de hoje!",
  "Fala Devocionalzeiro! 🚀 Sua sequência depende de você. Não quebra o ritmo! Leitura + devocional te esperam.",
];

// Get message index based on day of year (same message for all users on same day)
function getDailyMessageIndex(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return dayOfYear % motivationalMessages.length;
}

function getDailyMessage(): string {
  const index = getDailyMessageIndex();
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

  // Require service-role caller (cron) — verify by direct key comparison
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  if (!token || token !== Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
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

    // Get today's date in Brazil timezone (UTC-3)
    const now = new Date();
    const brazilOffset = -3 * 60;
    const brazilTime = new Date(now.getTime() + (brazilOffset - now.getTimezoneOffset()) * 60000);
    const todayDate = brazilTime.toISOString().split('T')[0];
    
    console.log(`Processing reminders for date: ${todayDate}`);

    // Get the daily message (same for all users on the same day)
    const messageIndex = getDailyMessageIndex();
    const dailyMessage = getDailyMessage();
    
    console.log(`Today's message index: ${messageIndex}`);

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

    console.log(`Found ${users.length} users with WhatsApp enabled`);

    // Get users who already received a reminder today
    const { data: alreadySent, error: sentError } = await supabase
      .from("whatsapp_reminders_sent")
      .select("user_id")
      .eq("sent_date", todayDate);

    if (sentError) {
      console.error("Error checking sent reminders:", sentError);
      throw sentError;
    }

    const alreadySentUserIds = new Set((alreadySent || []).map(r => r.user_id));
    
    // Filter out users who already received today's reminder
    const usersToNotify = users.filter(u => !alreadySentUserIds.has(u.user_id));
    
    console.log(`${alreadySentUserIds.size} users already received today's reminder`);
    console.log(`${usersToNotify.length} users to notify`);

    if (usersToNotify.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: "All users already notified today", 
          sent: 0,
          alreadySent: alreadySentUserIds.size 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    let successCount = 0;
    let failCount = 0;

    // Send messages with delay between each to avoid rate limiting
    for (let i = 0; i < usersToNotify.length; i++) {
      const user = usersToNotify[i];
      
      // Personalize message with user name if available
      const personalizedMessage = user.full_name 
        ? dailyMessage.replace("Devocionalzeiro!", `Devocionalzeiro, ${user.full_name.split(' ')[0]}!`)
        : dailyMessage;

      const success = await sendWhatsAppMessage(
        user.whatsapp_phone,
        personalizedMessage,
        apiUrl,
        apiKey
      );

      if (success) {
        // Record that we sent a reminder to this user today
        await supabase
          .from("whatsapp_reminders_sent")
          .insert({
            user_id: user.user_id,
            sent_date: todayDate,
            message_index: messageIndex,
          });
        
        successCount++;
      } else {
        failCount++;
      }

      // Wait 2-5 seconds between messages to avoid rate limiting
      if (i < usersToNotify.length - 1) {
        const delay = 2000 + Math.random() * 3000; // 2-5 seconds
        await sleep(delay);
      }
    }

    console.log(`Sent ${successCount} messages, ${failCount} failed`);

    return new Response(
      JSON.stringify({
        message: "Daily reminders sent",
        total: usersToNotify.length,
        sent: successCount,
        failed: failCount,
        skipped: alreadySentUserIds.size,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in daily-whatsapp-reminders:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno. Tente novamente." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
