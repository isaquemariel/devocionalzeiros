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

/**
 * Um pedido que sobrevive à página indo para o fundo. Devolve se o pedido
 * SAIU (sem sessão em mãos, não sai — quem chama não deve dar por feito).
 */
export function pedidoAoSair(caminho: string, metodo: "POST" | "PATCH", corpo: unknown, extra: Record<string, string> = {}): boolean {
  if (!token || !URL_BASE) return false;
  try {
    void fetch(`${URL_BASE}${caminho}`, {
      method: metodo,
      keepalive: true,
      headers: { "Content-Type": "application/json", apikey: CHAVE, Authorization: `Bearer ${token}`, ...extra },
      body: JSON.stringify(corpo),
    }).catch(() => { /* saída: melhor esforço */ });
    return true;
  } catch { return false; /* sem fetch keepalive */ }
}

/**
 * Cada aparelho tem a sua linha de presença: o celular no bolso não marca
 * "fora do app" enquanto o computador está com o app na tela. O id do
 * aparelho é aleatório e só vive neste navegador.
 */
function idDoAparelho(): string {
  try {
    let id = localStorage.getItem("dz.aparelho");
    if (!id) {
      id = (crypto.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`).slice(0, 64);
      localStorage.setItem("dz.aparelho", id);
    }
    return id;
  } catch { return "sem-armazenamento"; }
}
const APARELHO = idDoAparelho();
/** banco ainda sem a coluna do aparelho (migração não aplicada): uma linha por pessoa */
let semAparelho = false;

/**
 * "Estou aqui". O construtor de consulta do supabase-js só ENVIA quando alguém
 * espera por ele (`then`) — antes a chamada era `void presencaVisivel(...)`,
 * nada saía, e o servidor nunca soube que ninguém estava no app.
 */
export async function presencaVisivel(userId: string): Promise<void> {
  // (com a migração, o gatilho do banco troca `visto_em` pela hora do servidor)
  const agora = new Date().toISOString();
  const linha = semAparelho
    ? { user_id: userId, visivel: true, visto_em: agora }
    : { user_id: userId, device_id: APARELHO, visivel: true, visto_em: agora };
  const { error } = await supabase
    .from("user_app_presence" as never)
    .upsert(linha as never, { onConflict: semAparelho ? "user_id" : "user_id,device_id" });
  if (error && !semAparelho && /device_id|42703|PGRST204|42P10/.test(`${error.code} ${error.message}`)) {
    semAparelho = true;
    return presencaVisivel(userId);
  }
  if (error) console.warn("presença:", error.message);
}

export const presencaSaiu = (userId: string): boolean =>
  pedidoAoSair(
    `/rest/v1/user_app_presence?user_id=eq.${encodeURIComponent(userId)}${semAparelho ? "" : `&device_id=eq.${encodeURIComponent(APARELHO)}`}`,
    "PATCH", { visivel: false, visto_em: new Date().toISOString() }, { Prefer: "return=minimal" },
  );
