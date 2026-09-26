import { supabase } from "@/integrations/supabase/client";

/**
 * PRESENÇA NO APP — quem está com o app na tela não recebe push.
 *
 * O app diz ao banco "estou aqui" quando a tela fica visível (e renova a cada
 * 90 s enquanto ela segue visível) e "saí" quando ela some. O envio de push
 * pula quem está presente; lá dentro, quem avisa é o Devocionalzeiro.
 *
 * "Saí" acontece no instante em que a página vai para o fundo — quando o
 * navegador pode congelá-la a qualquer momento. Por isso os pedidos de saída
 * vão por `fetch` com `keepalive` (terminam mesmo com a página congelada) e
 * com o token já em mãos (não dá tempo de esperar a sessão).
 */

const URL_BASE = import.meta.env.VITE_SUPABASE_URL as string;
const CHAVE = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

let token: string | null = null;
supabase.auth.getSession().then(({ data }) => { token = data.session?.access_token ?? null; });
supabase.auth.onAuthStateChange((_evento, sessao) => { token = sessao?.access_token ?? null; });

/** um pedido que sobrevive à página indo para o fundo */
export function pedidoAoSair(caminho: string, metodo: "POST" | "PATCH", corpo: unknown, extra: Record<string, string> = {}) {
  if (!token || !URL_BASE) return;
  try {
    void fetch(`${URL_BASE}${caminho}`, {
      method: metodo,
      keepalive: true,
      headers: { "Content-Type": "application/json", apikey: CHAVE, Authorization: `Bearer ${token}`, ...extra },
      body: JSON.stringify(corpo),
    }).catch(() => { /* saída: melhor esforço */ });
  } catch { /* sem fetch keepalive: melhor esforço */ }
}

export const presencaVisivel = (userId: string) =>
  supabase
    .from("user_app_presence" as never)
    .upsert({ user_id: userId, visivel: true, visto_em: new Date().toISOString() } as never, { onConflict: "user_id" });

export const presencaSaiu = (userId: string) =>
  pedidoAoSair(`/rest/v1/user_app_presence?user_id=eq.${userId}`, "PATCH", { visivel: false, visto_em: new Date().toISOString() }, { Prefer: "return=minimal" });
