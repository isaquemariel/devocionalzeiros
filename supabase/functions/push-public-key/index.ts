// ============================================================================
// A CHAVE PÚBLICA VAPID, SERVIDA PELO MESMO LUGAR DE ONDE SAI A PRIVADA.
//
// O navegador assina a inscrição com uma chave pública (applicationServerKey) e
// o servidor assina cada envio com a privada correspondente. Se as duas não
// forem do MESMO par, o Google devolve 403 e a Apple devolve 400 em TODOS os
// envios — que foi exatamente o que aconteceu: o app lia a pública de
// `VITE_VAPID_PUBLIC_KEY`, embutida no bundle em tempo de build, e a função de
// envio lia `VAPID_PUBLIC_KEY`/`VAPID_PRIVATE_KEY` dos segredos da edge
// function. Duas fontes de verdade, nada a comparar as duas, e uma rotação de
// chave (ou um build feito com outro ambiente) matava o push inteiro em
// silêncio.
//
// Aqui há uma fonte só. O cliente pergunta a chave a este endpoint, que a lê do
// MESMO ambiente de onde a privada sai. Não há segredo nenhum nesta resposta: a
// chave pública VAPID é, por definição, pública — ela vai dentro de cada
// inscrição e é enviada ao Google e à Apple em texto claro.
// ============================================================================
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/** Tira aspas e o padding "=" — o web-push e o navegador querem Base64url limpo. */
const sanitize = (k: string) => k.replace(/^"/, "").replace(/"$/, "").replace(/=+$/, "");

Deno.serve((req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const key = sanitize(Deno.env.get("VAPID_PUBLIC_KEY") ?? "");
  return new Response(
    JSON.stringify(key ? { key } : { key: null, error: "VAPID_PUBLIC_KEY não configurada" }),
    {
      status: key ? 200 : 503,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        // A chave muda muito raramente, mas quando muda TEM de ser vista já:
        // é ela que decide se o push do leitor funciona. Cinco minutos.
        "Cache-Control": "public, max-age=300",
      },
    },
  );
});
