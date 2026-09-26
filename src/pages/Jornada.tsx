import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { lovable } from "@/integrations/lovable";
import { DDIS } from "@/lib/ddis";
import { etapa as etapaDe, progresso } from "@/lib/jornada/roteiro";
import {
  estadoInicial, reduzir, podeVoltar, lerRascunho, gravarRascunho, apagarRascunho,
  validarNome, validarEmail, validarSenha, validarWhatsapp, forcaSenha,
} from "@/lib/jornada/motor";
import { aplicarJornada } from "@/lib/jornada/aplicar";
import { planoDeLeitura } from "@/lib/jornada/plano";
import type { Humor, IdEtapa, Reacao, Respostas } from "@/lib/jornada/tipos";
import { Mascote } from "@/components/jornada/Mascote";
import { Balao } from "@/components/jornada/Balao";
import { BarraProgresso, Botao, Campo, CartaoOpcao, tocar } from "@/components/jornada/Controles";
import { Confete, LogoGoogle, PlanoRevelado } from "@/components/jornada/Cenas";
import { COR, FONTE } from "@/components/jornada/tema";

/**
 * Quanto a reação fica no ar DEPOIS de terminar de ser falada. Contar do
 * começo deixava ~0,3 s para ler "Prazer, Ana Clara! Que alegria ter você
 * aqui." inteira — a frase trocava de tela antes de alguém terminar de ler.
 */
const LEITURA_REACAO = 1100;
/** conta criada há mais que isto = a pessoa já tinha conta (entrou pelo Google) */
const CONTA_ANTIGA_MS = 5 * 60 * 1000;
/** etapas em que a conta está sendo criada — um login aqui é o fim da jornada */
const NA_CONTA: IdEtapa[] = ["salvar", "email", "senha"];

/**
 * A JORNADA DE BOAS-VINDAS: o cadastro virou uma conversa com o
 * Devocionalzeiro.
 *
 * A tela não decide nada sobre a ordem nem sobre o que perguntar: ela lê a
 * etapa atual do motor (`lib/jornada`) e desenha o tipo dela. O motor é puro e
 * testado (`scripts/test-jornada.mjs`); aqui ficam só os efeitos — rede,
 * rascunho, navegação.
 *
 * Um único lugar decide "a conta existe, vamos ao fim": o efeito que observa
 * o usuário. Ele cobre os dois caminhos — o `signUp` por e-mail (a sessão
 * chega na hora, já que a confirmação por e-mail está desligada) e a volta do
 * Google (que destrói a página e retoma pelo rascunho). Centralizar aqui evita
 * aplicar as respostas duas vezes, uma por caminho.
 */
export default function Jornada() {
  const navigate = useNavigate();
  const reduzirMov = useReducedMotion();
  const { user, loading, signUp } = useAuth();
  const [estado, despachar] = useReducer(reduzir, undefined, () => lerRascunho() ?? estadoInicial());
  const etapa = etapaDe(estado.etapa);
  const r = estado.respostas;

  // ─── estado local da etapa ────────────────────────────────────────────────
  const [texto, setTexto] = useState("");
  const [escolha, setEscolha] = useState<string | null>(null);
  const [escolhas, setEscolhas] = useState<string[]>([]);
  const [ddi, setDdi] = useState("+55");
  const [numero, setNumero] = useState("");
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  /** o e-mail digitado já tem conta — a etapa da senha vira "quer entrar?" */
  const [contaExiste, setContaExiste] = useState(false);
  /** fallback: o servidor pediu confirmação por e-mail (não deveria mais) */
  const [aguardandoEmail, setAguardandoEmail] = useState(false);
  const [contaAntiga, setContaAntiga] = useState(false);

  const [reacao, setReacao] = useState<Reacao | null>(null);
  const [pulo, setPulo] = useState(0);
  const timerReacao = useRef<number | null>(null);
  const campoRef = useRef<HTMLInputElement>(null);

  // Ao entrar numa etapa, os campos voltam ao que a pessoa já tinha
  // respondido — voltar uma etapa mostra a resposta dela, não um campo vazio.
  useEffect(() => {
    setErro(null);
    setContaExiste(false);
    setAguardandoEmail(false);
    setTexto(estado.etapa === "nome" ? r.apelido ?? "" : estado.etapa === "email" ? r.email ?? "" : "");
    setEscolha(
      estado.etapa === "familiaridade" ? r.familiaridade ?? null
        : estado.etapa === "meta" ? (r.meta_min ? String(r.meta_min) : null)
        : estado.etapa === "origem" ? r.origem ?? null
        : null,
    );
    setEscolhas(estado.etapa === "motivo" ? r.motivos ?? [] : []);
    if (estado.etapa === "whatsapp" && r.whatsapp) { setDdi(r.whatsapp.ddi); setNumero(r.whatsapp.numero); }
    if (estado.etapa !== "senha") setSenha("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado.etapa]);

  // Rascunho a cada mudança. No fim não se grava: a conta já existe, e um
  // rascunho parado em "fim" faria a celebração reaparecer na próxima visita.
  useEffect(() => {
    if (estado.etapa !== "fim") gravarRascunho(estado);
  }, [estado]);

  useEffect(() => () => { if (timerReacao.current) window.clearTimeout(timerReacao.current); }, []);

  // ─── a conta passou a existir → fim ───────────────────────────────────────
  const aplicando = useRef(false);
  useEffect(() => {
    if (loading) return;
    if (!user) {
      // Voltou do Google sem entrar: desfaz a espera e o redirecionamento
      // pendente, senão um login futuro por outro caminho cairia aqui.
      if (estado.aguardandoGoogle) {
        despachar({ tipo: "cancelarGoogle" });
        limparRedirecionamento();
      }
      return;
    }
    if (estado.etapa === "fim") return;
    const emCurso = estado.aguardandoGoogle || NA_CONTA.includes(estado.etapa);
    if (!emCurso) {
      // logado, sem jornada em andamento: esta tela não é para ele
      navigate("/home", { replace: true });
      return;
    }
    if (aplicando.current) return;
    aplicando.current = true;
    const criadaEm = user.created_at ? new Date(user.created_at).getTime() : Date.now();
    setContaAntiga(Date.now() - criadaEm > CONTA_ANTIGA_MS);
    aplicarJornada(user.id, estado).finally(() => {
      limparRedirecionamento();
      setEnviando(false);
      despachar({ tipo: "irPara", etapa: "fim" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user?.id]);

  // ─── reação e avanço ──────────────────────────────────────────────────────
  const seguir = useCallback(() => {
    if (timerReacao.current) { window.clearTimeout(timerReacao.current); timerReacao.current = null; }
    setReacao(null);
    despachar({ tipo: "avancar" });
  }, []);

  /** grava a resposta e, se a etapa tiver reação, deixa o Devocionalzeiro falar antes de seguir */
  const responder = (parcial: Partial<Respostas>) => {
    despachar({ tipo: "responder", parcial });
    const novas = { ...r, ...parcial };
    const rx = etapa.reacao?.(novas) ?? null;
    if (!rx) { seguir(); return; }
    setReacao(rx);
    setPulo((p) => p + 1);
    // o relógio começa em `reacaoFalada`, quando o balão termina a frase
  };

  const reacaoFalada = useCallback(() => {
    if (timerReacao.current) window.clearTimeout(timerReacao.current);
    timerReacao.current = window.setTimeout(seguir, reduzirMov ? 900 : LEITURA_REACAO);
  }, [seguir, reduzirMov]);

  // ─── ações por tipo de etapa ──────────────────────────────────────────────
  const continuar = () => {
    if (reacao) { seguir(); return; }
    setErro(null);
    switch (estado.etapa) {
      case "boas-vindas":
      case "plano":
        tocar();
        seguir();
        return;
      case "nome": {
        const e = validarNome(texto);
        if (e) { setErro(e); campoRef.current?.focus(); return; }
        responder({ apelido: texto.trim().replace(/\s+/g, " ") });
        return;
      }
      case "motivo":
        responder({ motivos: escolhas });
        return;
      case "familiaridade":
        if (escolha) responder({ familiaridade: escolha });
        return;
      case "meta":
        if (escolha) responder({ meta_min: Number(escolha) });
        return;
      case "origem":
        if (escolha) responder({ origem: escolha });
        return;
      case "whatsapp": {
        const w = { ddi, numero: numero.replace(/\D/g, "") };
        const e = validarWhatsapp(w);
        if (e) { setErro(e); campoRef.current?.focus(); return; }
        responder({ whatsapp: w });
        return;
      }
      case "email": {
        const e = validarEmail(texto);
        if (e) { setErro(e); campoRef.current?.focus(); return; }
        responder({ email: texto.trim().toLowerCase() });
        return;
      }
      case "senha":
        void criarConta();
        return;
      case "fim":
        comecar();
        return;
    }
  };

  const criarConta = async () => {
    const e = validarSenha(senha);
    if (e) { setErro(e); campoRef.current?.focus(); return; }
    if (!r.email) { despachar({ tipo: "irPara", etapa: "email" }); return; }
    setEnviando(true);
    const { data, error } = await signUp(r.email, senha, r.apelido);
    if (error) {
      setEnviando(false);
      const msg = (error.message ?? "").toLowerCase();
      const code = String((error as { code?: string }).code ?? "").toLowerCase();
      const status = (error as { status?: number }).status;
      if (code === "user_already_exists" || code === "email_exists" || msg.includes("already")) { setContaExiste(true); return; }
      if (code === "weak_password" || /weak|pwned|compromised|leaked|breach/.test(msg)) {
        setErro("Essa senha é fácil de adivinhar, ou já apareceu num vazamento de outro site. Tenta outra?");
        return;
      }
      if (code === "email_address_invalid" || (msg.includes("email") && msg.includes("invalid"))) {
        despachar({ tipo: "irPara", etapa: "email" });
        return;
      }
      if (status === 429 || msg.includes("rate limit")) { setErro("Muitas tentativas seguidas. Espera um minutinho e tenta de novo."); return; }
      setErro("Não consegui criar sua conta agora. Tenta de novo em instantes?");
      return;
    }
    // O Supabase devolve "sucesso" com `identities` vazio quando o e-mail já
    // existe (para não revelar quem tem conta). Na jornada vale ser claro.
    const identidades = (data?.user as { identities?: unknown[] } | null)?.identities;
    if (data?.user && Array.isArray(identidades) && identidades.length === 0) {
      setEnviando(false);
      setContaExiste(true);
      return;
    }
    if (!data?.session) {
      // Não deveria mais acontecer (confirmação desligada), mas se o servidor
      // voltar a pedir, a pessoa não pode ficar num botão girando para sempre.
      setEnviando(false);
      setAguardandoEmail(true);
      return;
    }
    // Com sessão, o efeito que observa o usuário leva ao fim — `enviando`
    // continua ligado até lá, para o botão não aceitar um segundo toque.
  };

  const entrarComGoogle = async () => {
    setEnviando(true);
    setErro(null);
    despachar({ tipo: "aguardarGoogle" });
    // Grava AGORA, fora do ciclo do React: o redirecionamento pode acontecer
    // antes do efeito de rascunho rodar, e a volta encontraria o estado velho.
    gravarRascunho({ ...estado, aguardandoGoogle: true });
    try { localStorage.setItem("post_signup_redirect", "/jornada"); } catch { /* ok */ }
    try {
      const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
      if (res.redirected) return; // o navegador está indo para o Google
      if (res.error) throw res.error;
      // Sessão criada sem sair da página (app nativo): o efeito do usuário leva ao fim.
    } catch {
      setEnviando(false);
      despachar({ tipo: "cancelarGoogle" });
      limparRedirecionamento();
      setErro("Não consegui falar com o Google agora. Tenta de novo, ou usa o e-mail.");
    }
  };

  const comecar = () => {
    apagarRascunho();
    navigate("/escolher-plano", { replace: true });
  };

  const irParaLogin = () => {
    const q = new URLSearchParams({ entrar: "1" });
    if (r.email) q.set("email", r.email);
    navigate(`/auth?${q.toString()}`);
  };

  // ─── o que o Devocionalzeiro diz e como está ──────────────────────────────
  let humor: Humor = reacao?.humor ?? etapa.humor;
  let fala = reacao?.fala ?? etapa.fala(r);
  if (!reacao && contaExiste) { humor = "triste"; fala = "Esse e-mail já tem uma conta por aqui! Quer entrar com ele?"; }
  if (!reacao && aguardandoEmail) { humor = "feliz"; fala = `Te mandei um link em ${r.email}. Abre ele pra ativar sua conta!`; }
  if (!reacao && estado.etapa === "fim" && contaAntiga) {
    fala = `Que bom te ver de novo, ${r.apelido?.trim() || "amigo(a)"}! Guardei o que você me contou.`;
  }

  const heroi = estado.etapa === "boas-vindas" || estado.etapa === "fim";

  // ─── botão principal: rótulo e se está liberado ───────────────────────────
  const liberado = (() => {
    if (reacao) return true;
    switch (etapa.tipo) {
      case "texto": return texto.trim().length > 0;
      case "multipla": return escolhas.length > 0;
      case "unica": return escolha !== null;
      case "telefone": return numero.replace(/\D/g, "").length > 0;
      case "senha": return senha.length > 0;
      default: return true;
    }
  })();
  const mostrarRodape = etapa.tipo !== "conta" && !contaExiste && !aguardandoEmail;

  return (
    <div className="flex min-h-[100dvh] flex-col" style={{ background: COR.fundo, fontFamily: FONTE }}>
      {/* ── topo: voltar + progresso ─────────────────────────────────────── */}
      <header
        className="flex items-center gap-3 px-4 pb-2"
        style={{ paddingTop: "max(0.9rem, var(--safe-area-inset-top, env(safe-area-inset-top, 0px)))" }}
      >
        <button
          type="button"
          onClick={() => { if (reacao) return; if (podeVoltar(estado)) despachar({ tipo: "voltar" }); else navigate("/", { replace: true }); }}
          disabled={estado.etapa === "fim" || enviando}
          className="-ml-1 rounded-xl p-2 transition active:scale-90 disabled:opacity-0"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-6 w-6" style={{ color: "#B3AC9C" }} strokeWidth={2.6} />
        </button>
        <BarraProgresso valor={progresso(estado.etapa)} />
      </header>

      {/* ── conteúdo da etapa ────────────────────────────────────────────── */}
      <main className="flex flex-1 flex-col overflow-y-auto px-4 pb-6" onClick={reacao ? seguir : undefined}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={estado.etapa}
            initial={reduzirMov ? { opacity: 0 } : { opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduzirMov ? { opacity: 0 } : { opacity: 0, x: -36 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`mx-auto w-full max-w-md ${heroi ? "flex flex-1 flex-col justify-center" : ""}`}
          >
            {heroi ? (
              <div className="flex flex-col items-center gap-5 py-4">
                <Mascote humor={humor} pulo={pulo} tamanho={estado.etapa === "fim" ? 210 : 200} />
                <Balao texto={fala} rabo="cima" onTerminou={reacao ? reacaoFalada : undefined} />
              </div>
            ) : (
              <div className="flex items-start gap-2 pt-3">
                <Mascote humor={humor} pulo={pulo} tamanho={112} />
                <div className="flex min-w-0 flex-1 pt-3">
                  <Balao texto={fala} onTerminou={reacao ? reacaoFalada : undefined} />
                </div>
              </div>
            )}

            {etapa.apoio && !reacao && !contaExiste && (
              <p className="mt-4 px-1 text-[14px] font-bold" style={{ color: COR.texto2 }}>{etapa.apoio}</p>
            )}

            <div className={`mt-5 ${reacao ? "pointer-events-none opacity-60 transition-opacity" : ""}`}>
              {/* escolhas */}
              {(etapa.tipo === "unica" || etapa.tipo === "multipla") && (
                <div
                  className="space-y-3"
                  role={etapa.tipo === "unica" ? "radiogroup" : "group"}
                  aria-label={etapa.fala(r)}
                >
                  {etapa.opcoes!.map((o) => (
                    <CartaoOpcao
                      key={o.valor}
                      opcao={o}
                      multipla={etapa.tipo === "multipla"}
                      marcada={etapa.tipo === "unica" ? escolha === o.valor : escolhas.includes(o.valor)}
                      onEscolher={() =>
                        etapa.tipo === "unica"
                          ? setEscolha(o.valor)
                          : setEscolhas((a) => (a.includes(o.valor) ? a.filter((v) => v !== o.valor) : [...a, o.valor]))
                      }
                    />
                  ))}
                </div>
              )}

              {/* nome / e-mail */}
              {etapa.tipo === "texto" && (
                <form onSubmit={(e) => { e.preventDefault(); continuar(); }}>
                  <Campo
                    ref={campoRef}
                    autoFocus
                    value={texto}
                    onChange={(e) => { setTexto(e.target.value); setErro(null); }}
                    placeholder={etapa.placeholder}
                    erro={erro}
                    maxLength={estado.etapa === "nome" ? 30 : 120}
                    enterKeyHint="next"
                    {...(estado.etapa === "email"
                      ? { type: "email", inputMode: "email" as const, autoComplete: "email", autoCapitalize: "none", spellCheck: false }
                      : { type: "text", autoComplete: "given-name", autoCapitalize: "words" })}
                  />
                </form>
              )}

              {/* WhatsApp: o país mora dentro do campo, à esquerda do número */}
              {etapa.tipo === "telefone" && (
                <form onSubmit={(e) => { e.preventDefault(); continuar(); }}>
                  <Campo
                    ref={campoRef}
                    value={numero}
                    onChange={(e) => { setNumero(e.target.value.replace(/[^\d\s()-]/g, "")); setErro(null); }}
                    placeholder={DDIS.find((d) => d.code === ddi)?.placeholder}
                    erro={erro}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    enterKeyHint="done"
                    maxLength={(DDIS.find((d) => d.code === ddi)?.maxDigits ?? 11) + 5}
                    aria-label="Número de WhatsApp"
                    esquerda={
                      <select
                        value={ddi}
                        onChange={(e) => { setDdi(e.target.value); setErro(null); campoRef.current?.focus(); }}
                        aria-label="País"
                        className="ml-2 shrink-0 cursor-pointer rounded-xl bg-transparent py-2 pl-2 pr-1 text-[16px] font-extrabold outline-none"
                        style={{ color: COR.texto, fontFamily: FONTE }}
                      >
                        {DDIS.map((d) => (
                          <option key={d.code} value={d.code}>{d.flag} {d.code}</option>
                        ))}
                      </select>
                    }
                  />
                </form>
              )}

              {/* plano */}
              {etapa.tipo === "plano" && r.meta_min && !reacao && <PlanoRevelado metaMin={r.meta_min} />}

              {/* salvar: Google ou e-mail */}
              {etapa.tipo === "conta" && !reacao && (
                <div className="space-y-3 pt-2">
                  <Botao variante="branco" onClick={entrarComGoogle} carregando={enviando}
                    icone={enviando ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogoGoogle />}>
                    Continuar com Google
                  </Botao>
                  <Botao onClick={() => { tocar(); seguir(); }} desabilitado={enviando} icone={<Mail className="h-5 w-5" strokeWidth={2.6} />}>
                    Continuar com e-mail
                  </Botao>
                  {erro && <p className="px-1 text-center text-[14px] font-bold" style={{ color: COR.erro }} role="alert">{erro}</p>}
                  <p className="pt-3 text-center text-[15px] font-bold" style={{ color: COR.texto2 }}>
                    Já tem uma conta?{" "}
                    <button type="button" onClick={irParaLogin} className="font-black underline-offset-2 hover:underline" style={{ color: COR.azul }}>
                      Entrar
                    </button>
                  </p>
                </div>
              )}

              {/* senha */}
              {etapa.tipo === "senha" && !contaExiste && !aguardandoEmail && (
                <form onSubmit={(e) => { e.preventDefault(); continuar(); }}>
                  <p className="mb-3 px-1 text-[14px] font-bold" style={{ color: COR.texto2 }}>
                    Conta para <span style={{ color: COR.texto }}>{r.email}</span>{" "}
                    <button type="button" className="font-black" style={{ color: COR.azul }} onClick={() => despachar({ tipo: "voltar" })}>
                      trocar
                    </button>
                  </p>
                  <Campo
                    ref={campoRef}
                    autoFocus
                    type={verSenha ? "text" : "password"}
                    value={senha}
                    onChange={(e) => { setSenha(e.target.value); setErro(null); }}
                    placeholder={etapa.placeholder}
                    autoComplete="new-password"
                    enterKeyHint="done"
                    erro={erro}
                    direita={
                      <button type="button" onClick={() => setVerSenha((v) => !v)} className="px-4" aria-label={verSenha ? "Esconder senha" : "Mostrar senha"}>
                        {verSenha ? <EyeOff className="h-5 w-5" style={{ color: COR.texto2 }} /> : <Eye className="h-5 w-5" style={{ color: COR.texto2 }} />}
                      </button>
                    }
                  />
                  <MedidorSenha senha={senha} />
                </form>
              )}

              {/* e-mail já tem conta */}
              {contaExiste && (
                <div className="space-y-3 pt-1">
                  <Botao onClick={irParaLogin}>Entrar com esse e-mail</Botao>
                  <Botao variante="branco" onClick={() => despachar({ tipo: "irPara", etapa: "email" })}>Usar outro e-mail</Botao>
                </div>
              )}

              {/* fim: o resumo do que a pessoa construiu na jornada */}
              {etapa.tipo === "fim" && r.meta_min && <ResumoFinal metaMin={r.meta_min} />}

              {/* fallback: pediram confirmação por e-mail */}
              {aguardandoEmail && (
                <div className="pt-1">
                  <Botao onClick={irParaLogin}>Já confirmei, quero entrar</Botao>
                </div>
              )}
            </div>
          </motion.section>
        </AnimatePresence>
      </main>

      {estado.etapa === "fim" && <Confete />}

      {/* ── rodapé: o botão principal ────────────────────────────────────── */}
      {mostrarRodape && (
        <footer
          className="sticky bottom-0 mx-auto w-full max-w-md px-4 pt-3"
          style={{
            paddingBottom: "max(1rem, var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px)))",
            background: `linear-gradient(to top, ${COR.fundo} 70%, rgba(255,248,236,0))`,
          }}
        >
          {reacao ? (
            <p className="py-[15px] text-center text-[14px] font-bold" style={{ color: COR.texto2 }}>Toque para continuar</p>
          ) : (
            <>
              <Botao
                onClick={continuar}
                desabilitado={!liberado}
                carregando={enviando}
                variante={estado.etapa === "fim" ? "ouro" : "azul"}
                icone={enviando ? <Loader2 className="h-5 w-5 animate-spin" /> : undefined}
              >
                {enviando ? "Criando sua conta…" : etapa.botao ?? "Continuar"}
              </Botao>
              {etapa.tipo === "telefone" && (
                <button
                  type="button"
                  onClick={() => { tocar(); responder({ whatsapp: null }); }}
                  className="mt-3 w-full py-2 text-center text-[15px] font-black uppercase tracking-wide"
                  style={{ color: COR.azul }}
                >
                  Agora não
                </button>
              )}
            </>
          )}
        </footer>
      )}
    </div>
  );
}

/** Tira o redirecionamento pendente para esta tela, se foi ela quem o pôs. */
function limparRedirecionamento() {
  try {
    if (localStorage.getItem("post_signup_redirect") === "/jornada") localStorage.removeItem("post_signup_redirect");
  } catch { /* ok */ }
}

/**
 * O resumo da celebração: a meta e o destino que a pessoa escolheu. É o que
 * ela leva da jornada — e o compromisso que acabou de assumir, dito de volta.
 */
function ResumoFinal({ metaMin }: { metaMin: number }) {
  const reduzir = useReducedMotion();
  const p = planoDeLeitura(metaMin);
  const itens = [
    { icone: "🔥", rotulo: "Sua meta", valor: `${metaMin} min por dia` },
    { icone: "📖", rotulo: "A Bíblia inteira", valor: p.biblia },
  ];
  return (
    <motion.div
      initial={reduzir ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduzir ? 0 : 0.9, duration: 0.35 }}
      className="mx-auto grid max-w-sm grid-cols-2 gap-3"
    >
      {itens.map((i) => (
        <div key={i.rotulo} className="rounded-2xl border-2 px-3 py-3 text-center"
          style={{ background: COR.superficie, borderColor: COR.borda, borderBottomWidth: 4, borderBottomColor: COR.bordaFunda }}>
          <span className="block text-[26px] leading-none" aria-hidden="true">{i.icone}</span>
          <span className="mt-1.5 block text-[12px] font-extrabold uppercase tracking-wide" style={{ color: COR.texto2 }}>{i.rotulo}</span>
          <span className="block text-[16px] font-black leading-tight" style={{ color: COR.texto }}>{i.valor}</span>
        </div>
      ))}
    </motion.div>
  );
}

/** Quatro gomos que acendem conforme a senha fica forte. */
function MedidorSenha({ senha }: { senha: string }) {
  const f = forcaSenha(senha);
  const cores = ["#E7E3DA", COR.erro, COR.ouro, "#7BCB4A", COR.verde];
  const rotulos = ["", "Fraca", "Razoável", "Boa", "Forte"];
  if (!senha) return null;
  return (
    <div className="mt-3 px-1" aria-live="polite">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className="h-2 flex-1 rounded-full transition-colors" style={{ background: i <= f ? cores[f] : "#E7E3DA" }} />
        ))}
      </div>
      <p className="mt-1.5 text-[13px] font-extrabold" style={{ color: cores[f] }}>{rotulos[f]}</p>
    </div>
  );
}
