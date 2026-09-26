import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useKeyboardInset } from "@/hooks/useKeyboardInset";
import { lovable } from "@/integrations/lovable";
import { DDIS } from "@/lib/ddis";
import { etapa as etapaDe, indice, progresso, proxima, ROTEIRO } from "@/lib/jornada/roteiro";
import {
  estadoInicial, reduzir, podeVoltar, lerRascunho, gravarRascunho, apagarRascunho,
  validarNome, validarEmail, validarSenha, validarWhatsapp,
} from "@/lib/jornada/motor";
import { aplicarJornada } from "@/lib/jornada/aplicar";
import type { Expressao, Fala, Gesto, IdEtapa, Respostas } from "@/lib/jornada/tipos";
import { Devocionalzeiro } from "@/components/jornada/Devocionalzeiro";
import { Trilha, posicaoDaTrilha } from "@/components/jornada/Trilha";
import { Balao } from "@/components/jornada/Balao";
import { Botao, Campo, Link, tocar } from "@/components/jornada/Controles";
import { Escala, Lanternas, MedidorSenha, Mostrador, Placa, Selos } from "@/components/jornada/Mecanicas";
import { Diario, Festa, LogoGoogle, Zzz } from "@/components/jornada/Cenas";
import { COR, FONTE, MAO } from "@/components/jornada/tema";

/** conta criada há mais que isto = a pessoa já tinha conta (entrou pelo Google) */
const CONTA_ANTIGA_MS = 5 * 60 * 1000;
/** etapas em que a conta está sendo criada — um login aqui é o fim da jornada */
const NA_CONTA: IdEtapa[] = ["salvar", "email", "senha"];
/** quanto dura a caminhada entre uma parada e outra (o mundo desliza junto) */
const CAMINHADA_MS = 1000;
/** sem mexer em nada por este tempo, ele se distrai com alguma coisa */
const OCIOSO_MS = 9000;
/** coluna do jogo: em tela larga, a cena é um celular no meio do mundo */
const COLUNA_MAX = 480;

/** tempo de leitura de uma frase depois de escrita — cresce com o tamanho */
const leitura = (t: string, fim = false) => Math.min(fim ? 3200 : 2800, Math.max(fim ? 1300 : 1100, 650 + t.length * 30));

interface Momento {
  expressao?: Expressao;
  gesto?: Gesto;
  olhar?: { x: number; y: number };
  /** uma palavrinha escrita à mão perto da cabeça dele */
  tag?: string;
}

/** o que ele faz quando ninguém mexe em nada — cada um com o seu "som" escrito */
const DISTRACOES: Momento[] = [
  { gesto: "espreguicar", expressao: "feliz", tag: "aaahh~" },
  { gesto: "cocar", expressao: "pensativo", tag: "hmm…" },
  { olhar: { x: 0.9, y: -0.9 }, expressao: "feliz", tag: "que sol!" },
  { olhar: { x: 0.35, y: 1 }, expressao: "pensativo" },
  { gesto: "acenar", expressao: "feliz", tag: "tô aqui, viu?" },
];
/** o que ele diz quando é cutucado */
const CUTUCADAS = ["hihi!", "cócegas não!", "ei!", "essa chama não queima", "tô acordado!", "de novo?"];

/**
 * A JORNADA DE BOAS-VINDAS: acender a chama.
 *
 * É madrugada numa trilha. O Devocionalzeiro está dormindo com a chama quase
 * apagada; a pessoa o acorda, e cada resposta vira lenha. A cada parada os dois
 * andam, o mundo desliza em camadas e o céu clareia; quando a conta é criada o
 * sol está no alto. Não há barra de progresso — o progresso é a chama, o céu e
 * a caminhada. Cada pergunta tem a sua mecânica (`Mecanicas.tsx`).
 *
 * A tela não decide nada sobre a ordem nem sobre o que perguntar: ela lê a
 * etapa atual do motor (`lib/jornada`) e desenha o tipo dela. O motor é puro e
 * testado (`scripts/test-jornada.mjs`); aqui ficam os efeitos — rede,
 * rascunho, navegação — e a DIREÇÃO do personagem: o que ele faz, para onde
 * olha, quando fala e quando se distrai.
 *
 * Um único lugar decide "a conta existe, vamos ao fim": o efeito que observa
 * o usuário. Ele cobre os dois caminhos — o `signUp` por e-mail (a sessão
 * chega na hora, já que a confirmação por e-mail está desligada) e a volta do
 * Google (que destrói a página e retoma pelo rascunho).
 */
export default function Jornada() {
  const navigate = useNavigate();
  const reduzirMov = useReducedMotion();
  const { user, loading, signUp } = useAuth();
  // Recarregar RECOMEÇA: a jornada vive na memória da página. O único estado
  // que se retoma é o da volta do Google (ver "rascunho" em `motor.ts`).
  const [estado, despachar] = useReducer(reduzir, undefined, () => {
    const salvo = lerRascunho();
    if (salvo?.aguardandoGoogle) return salvo;
    apagarRascunho();
    return estadoInicial();
  });
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
  const [focoNoCampo, setFocoNoCampo] = useState(false);

  // ─── direção do personagem ────────────────────────────────────────────────
  /** ele começa dormindo — só na primeira parada, e só se ninguém o acordou ainda */
  const [acordado, setAcordado] = useState(estado.etapa !== "boas-vindas");
  const [falaIdx, setFalaIdx] = useState(0);
  const [reacao, setReacao] = useState<Fala[] | null>(null);
  const [reacaoIdx, setReacaoIdx] = useState(0);
  /** a reação ao vivo das mecânicas de arrastar (planta, marcador) */
  const [aoVivo, setAoVivo] = useState<Fala | null>(null);
  /** a última frase já foi lida: o gesto dela (apontar, acenar) volta ao repouso */
  const [assentado, setAssentado] = useState(false);
  const [falando, setFalando] = useState(false);
  const [andando, setAndando] = useState(false);
  const [momento, setMomento] = useState<Momento | null>(null);
  const [pulso, setPulso] = useState(0);
  const [toque, setToque] = useState(0);
  /** lanternas soltas, voando do varal até a chama */
  const [voo, setVoo] = useState<{ valor: string; x: number; y: number }[] | null>(null);

  const timerFala = useRef<number | null>(null);
  const timerMomento = useRef<number | null>(null);
  const ultimaAcao = useRef(Date.now());
  const cutucada = useRef(0);
  const campoRef = useRef<HTMLInputElement>(null);

  // ─── medidas: tela, teclado, painel, balão ────────────────────────────────
  const raiz = useRef<HTMLDivElement>(null);
  const coluna = useRef<HTMLDivElement>(null);
  const painel = useRef<HTMLDivElement>(null);
  const balaoRef = useRef<HTMLDivElement>(null);
  const [tela, setTela] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 390,
    h: typeof window !== "undefined" ? window.innerHeight : 844,
  }));
  const [alturaPainel, setAlturaPainel] = useState(300);
  const [alturaBalao, setAlturaBalao] = useState(88);
  const [offCol, setOffCol] = useState({ x: 0, y: 0 });
  const teclado = useKeyboardInset();

  useLayoutEffect(() => {
    const medir = () => {
      if (raiz.current) setTela({ w: raiz.current.clientWidth, h: raiz.current.clientHeight });
      // arredondado: o painel muda de altura enquanto anima, e cada pixel
      // re-renderizaria a cena inteira
      if (painel.current) setAlturaPainel(Math.round(painel.current.offsetHeight / 4) * 4);
      if (balaoRef.current && balaoRef.current.offsetHeight > 0) setAlturaBalao(Math.round(balaoRef.current.offsetHeight / 4) * 4);
      const b = coluna.current?.getBoundingClientRect();
      if (b) setOffCol({ x: Math.round(b.left), y: Math.round(b.top) });
    };
    medir();
    const ro = new ResizeObserver(medir);
    [raiz.current, painel.current, balaoRef.current].forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, []);

  // ─── ao chegar numa etapa ─────────────────────────────────────────────────
  const etapaAnterior = useRef(estado.etapa);
  useEffect(() => {
    // Os campos voltam ao que a pessoa já tinha respondido — voltar uma etapa
    // mostra a resposta dela, não um campo vazio.
    setErro(null);
    setContaExiste(false);
    setAguardandoEmail(false);
    setVerSenha(false);
    setTexto(estado.etapa === "nome" ? r.apelido ?? "" : estado.etapa === "email" ? r.email ?? "" : "");
    setEscolha(
      estado.etapa === "familiaridade" ? r.familiaridade ?? null
        : estado.etapa === "meta" ? String(r.meta_min ?? 10)
        : null,
    );
    setEscolhas(estado.etapa === "motivo" ? r.motivos ?? [] : []);
    if (estado.etapa === "whatsapp" && r.whatsapp) { setDdi(r.whatsapp.ddi); setNumero(r.whatsapp.numero); }
    if (estado.etapa !== "senha") setSenha("");
    setFalaIdx(0);
    setAoVivo(null);
    setAssentado(false);
    setVoo(null);
    setFocoNoCampo(false);
    ultimaAcao.current = Date.now();

    // a caminhada: só quando a etapa MUDA (restaurar do rascunho não anda)
    if (etapaAnterior.current !== estado.etapa) {
      etapaAnterior.current = estado.etapa;
      if (!reduzirMov) {
        setAndando(true);
        const id = window.setTimeout(() => setAndando(false), CAMINHADA_MS);
        return () => window.clearTimeout(id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado.etapa]);

  useEffect(() => () => {
    if (timerFala.current) window.clearTimeout(timerFala.current);
    if (timerMomento.current) window.clearTimeout(timerMomento.current);
  }, []);

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
        apagarRascunho(); // as respostas seguem na memória; no aparelho, nada fica
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
    setAcordado(true);
    aplicarJornada(user.id, estado).finally(() => {
      limparRedirecionamento();
      setEnviando(false);
      setReacao(null);
      despachar({ tipo: "irPara", etapa: "fim" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user?.id]);

  // ─── falas: uma de cada vez ───────────────────────────────────────────────
  const limparTimerFala = () => { if (timerFala.current) { window.clearTimeout(timerFala.current); timerFala.current = null; } };

  const seguir = useCallback(() => {
    limparTimerFala();
    setReacao(null);
    setReacaoIdx(0);
    despachar({ tipo: "avancar" });
  }, []);

  /** grava a resposta; se a etapa tiver reação, ele fala antes de andar */
  const responder = (parcial: Partial<Respostas>) => {
    despachar({ tipo: "responder", parcial });
    const rx = etapa.reacao?.({ ...r, ...parcial }) ?? null;
    if (!rx?.length) { seguir(); return; }
    limparTimerFala();
    setAoVivo(null);
    setReacao(rx);
    setReacaoIdx(0);
    setPulso((p) => p + 1);
  };

  const nomeCurto = r.apelido?.trim().split(/\s+/)[0] || "amigo(a)";
  const dormindo = etapa.tipo === "despertar" && !acordado;

  let falas: Fala[] = dormindo ? [] : etapa.falas(r);
  if (estado.etapa === "fim" && contaAntiga) {
    falas = [{ texto: `Que bom te ver de novo, ${nomeCurto}! Guardei o que você me contou.`, expressao: "radiante", gesto: "comemorar" }, ...falas.slice(1)];
  }
  const sobreposta: Fala | null =
    contaExiste ? { texto: "Esse e-mail já tem conta por aqui! Quer entrar com ele?", expressao: "surpreso", gesto: "parado" }
      : aguardandoEmail ? { texto: `Te mandei um link em ${r.email}. Abre ele pra ativar a conta!`, expressao: "feliz", gesto: "apontar" }
      : estado.etapa === "senha" && verSenha && !reacao ? { texto: "Ei, você mostrou! Eu não vi nada… quase nada.", expressao: "orgulhoso", gesto: "espiar" }
      : null;
  const falaAtual: Fala | null = reacao
    ? reacao[Math.min(reacaoIdx, reacao.length - 1)]
    : sobreposta ?? aoVivo ?? falas[Math.min(falaIdx, falas.length - 1)] ?? null;
  const haMais = reacao ? reacaoIdx < reacao.length - 1 : !sobreposta && !aoVivo && falaIdx < falas.length - 1;

  /** a frase que está no balão terminou de ser escrita */
  const falaEscrita = useCallback(() => {
    limparTimerFala();
    if (!falaAtual) return;
    if (reacao) {
      const ultima = reacaoIdx >= reacao.length - 1;
      timerFala.current = window.setTimeout(
        () => (ultima ? seguir() : setReacaoIdx((i) => i + 1)),
        reduzirMov ? 1000 : leitura(falaAtual.texto, ultima),
      );
    } else if (haMais) {
      timerFala.current = window.setTimeout(() => setFalaIdx((i) => i + 1), leitura(falaAtual.texto));
    } else {
      timerFala.current = window.setTimeout(() => setAssentado(true), 2200);
    }
  }, [falaAtual, reacao, reacaoIdx, haMais, seguir, reduzirMov]);

  /** toque no balão já escrito: não espera o relógio */
  const pularFala = useCallback(() => {
    limparTimerFala();
    if (reacao) { if (reacaoIdx < reacao.length - 1) setReacaoIdx((i) => i + 1); else seguir(); return; }
    if (haMais) setFalaIdx((i) => i + 1);
  }, [reacao, reacaoIdx, haMais, seguir]);

  // ─── distrações e cutucadas ───────────────────────────────────────────────
  const viver = (m: Momento, ms: number) => {
    if (timerMomento.current) window.clearTimeout(timerMomento.current);
    setMomento(m);
    timerMomento.current = window.setTimeout(() => setMomento(null), ms);
  };

  useEffect(() => {
    const marcar = () => { ultimaAcao.current = Date.now(); };
    window.addEventListener("pointerdown", marcar);
    window.addEventListener("keydown", marcar);
    return () => { window.removeEventListener("pointerdown", marcar); window.removeEventListener("keydown", marcar); };
  }, []);

  const podeDistrair = !dormindo && !andando && !reacao && !falando && !focoNoCampo && !enviando && !voo && estado.etapa !== "senha";
  const podeDistrairRef = useRef(podeDistrair);
  podeDistrairRef.current = podeDistrair;
  useEffect(() => {
    if (reduzirMov) return;
    let n = (Math.random() * DISTRACOES.length) | 0;
    const id = window.setInterval(() => {
      if (!podeDistrairRef.current || Date.now() - ultimaAcao.current < OCIOSO_MS) return;
      ultimaAcao.current = Date.now();
      n = (n + 1 + ((Math.random() * 2) | 0)) % DISTRACOES.length; // nunca a mesma duas vezes
      viver(DISTRACOES[n], 2600);
    }, 1000);
    return () => window.clearInterval(id);
  }, [reduzirMov]);

  const acordar = () => {
    if (acordado) return;
    tocar(22);
    setAcordado(true);
    setPulso((p) => p + 1);
    setFalaIdx(0);
  };

  const cutucar = () => {
    if (dormindo) { acordar(); return; }
    if (andando) return;
    tocar(10);
    setPulso((p) => p + 1);
    viver({ expressao: "radiante", tag: CUTUCADAS[cutucada.current++ % CUTUCADAS.length] }, 1300);
  };

  // ─── ações por tipo de etapa ──────────────────────────────────────────────
  const continuar = () => {
    if (reacao) { pularFala(); return; }
    setErro(null);
    switch (etapa.tipo) {
      case "despertar":
        if (!acordado) { acordar(); return; }
        tocar();
        seguir();
        return;
      case "nome": {
        const e = validarNome(texto);
        if (e) { setErro(e); campoRef.current?.focus(); return; }
        campoRef.current?.blur();
        responder({ apelido: texto.trim().replace(/\s+/g, " ") });
        return;
      }
      case "lanternas":
        soltarLanternas();
        return;
      case "escala":
        if (escolha) responder({ familiaridade: escolha });
        return;
      case "mostrador":
        responder({ meta_min: Number(escolha ?? 10) });
        return;
      case "telefone": {
        const w = { ddi, numero: numero.replace(/\D/g, "") };
        const e = validarWhatsapp(w);
        if (e) { setErro(e); campoRef.current?.focus(); return; }
        campoRef.current?.blur();
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
      default:
        seguir();
    }
  };

  /** as lanternas acesas saem do varal e voam até a chama; só então a resposta conta */
  const soltarLanternas = () => {
    if (!escolhas.length || voo) return;
    const motivos = escolhas;
    const pos = motivos
      .map((v) => ({ v, el: document.querySelector<HTMLElement>(`[data-lanterna="${v}"] [data-papel]`) }))
      .filter((x): x is { v: string; el: HTMLElement } => !!x.el);
    tocar(24);
    if (reduzirMov || !pos.length) { responder({ motivos }); return; }
    setVoo(pos.map(({ v, el }) => { const b = el.getBoundingClientRect(); return { valor: v, x: b.left + b.width / 2, y: b.top + b.height / 2 }; }));
    window.setTimeout(() => responder({ motivos }), 950);
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
    // O único momento em que a jornada toca o armazenamento: a página vai ser
    // destruída pelo redirecionamento. Sem o e-mail — o Google traz o dele.
    gravarRascunho({ ...estado, aguardandoGoogle: true, respostas: { ...r, email: undefined } });
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
      apagarRascunho();
      setErro("Não consegui falar com o Google agora. Tenta de novo, ou usa o e-mail.");
    }
  };

  const comecar = () => {
    apagarRascunho();
    navigate("/escolher-plano", { replace: true });
  };

  const irParaLogin = () => {
    // No meio da conta, as respostas vão junto: o login (Auth.tsx) as aplica.
    if (NA_CONTA.includes(estado.etapa)) gravarRascunho({ ...estado, respostas: { ...r, email: undefined } });
    // O e-mail vai no ESTADO da navegação, nunca na URL: URL fica no
    // histórico, em log de servidor e no que o pixel de anúncio lê da página.
    navigate("/auth?entrar=1", { state: r.email ? { email: r.email } : undefined });
  };

  const voltar = () => {
    if (reacao || enviando || voo) return;
    if (podeVoltar(estado)) despachar({ tipo: "voltar" });
    else navigate("/", { replace: true });
  };

  // ─── o que ele faz agora ──────────────────────────────────────────────────
  let expressao: Expressao = falaAtual?.expressao ?? "neutro";
  let gesto: Gesto = !reacao && assentado ? "parado" : falaAtual?.gesto ?? "parado";
  let olhar: { x: number; y: number } | null = null;
  if (erro && !reacao) { expressao = "pensativo"; gesto = "parado"; }
  if (estado.etapa === "senha" && !reacao && !contaExiste && !aguardandoEmail) {
    gesto = verSenha ? "espiar" : "tampar";
    if (enviando) expressao = "feliz";
  }
  if (!reacao && focoNoCampo) {
    // ele acompanha com os olhos o que se digita
    if (estado.etapa === "nome") olhar = { x: 1, y: 0.35 };
    else if (estado.etapa === "email" || estado.etapa === "whatsapp") {
      const n = estado.etapa === "email" ? texto.length : numero.length;
      olhar = { x: -0.3 + Math.min(1, n / 26) * 1.3, y: 0.95 };
    }
  }
  if (etapa.tipo === "lanternas" && !reacao && escolhas.length && !voo) expressao = escolhas.length > 2 ? "radiante" : "feliz";
  if (voo && !reacao) { olhar = { x: 0.4, y: 0.9 }; expressao = "surpreso"; gesto = "parado"; }
  if (momento) {
    expressao = momento.expressao ?? expressao;
    gesto = momento.gesto ?? gesto;
    olhar = momento.olhar ?? olhar;
  }
  if (andando) { gesto = "andar"; expressao = expressao === "triste" ? "neutro" : "feliz"; olhar = { x: 0.6, y: 0 }; }
  if (dormindo) { expressao = "dormindo"; gesto = "parado"; olhar = null; }

  // A chama: faísca dormindo; na reação, já tem o tamanho da parada seguinte —
  // a resposta ALIMENTA o fogo na hora em que é dada.
  const seguinte = proxima(estado.etapa);
  let chama = dormindo ? 0.03 : etapa.chama;
  if (etapa.tipo === "despertar" && acordado) chama = 0.1;
  if (reacao && seguinte) chama = etapaDe(seguinte).chama;
  if (etapa.tipo === "lanternas" && !reacao) chama += escolhas.length * 0.012;

  // ─── geometria da cena ────────────────────────────────────────────────────
  const W = Math.min(tela.w, COLUNA_MAX);
  const H = tela.h;
  // O mundo tem céu de reserva por cima: assim a trilha pode descer até
  // encostar no caderno quando ele é baixo, em vez de deixar um descampado
  // vazio entre os pés dele e as perguntas.
  const reserva = Math.round(H * 0.32);
  const trilhaY = posicaoDaTrilha(tela.w, H + reserva) - reserva;
  const topoPainel = H - teclado - alturaPainel;
  // a trilha fica sempre logo acima do caderno: painel alto (ou teclado
  // aberto) empurra o mundo para cima; painel baixo o deixa descer
  const deslocar = Math.max(-reserva, Math.round(trilhaY + 12 - topoPainel));
  const pesY = trilhaY - deslocar;
  const alt = (t: number) => (t * 229) / 205;
  let tamanho = Math.max(112, Math.min(176, W * 0.4));
  // sem espaço para ele e o balão acima do caderno: ele encolhe
  const cabe = (pesY - alturaBalao - 30) / 0.62;
  if (alt(tamanho) > cabe) tamanho = Math.max(76, (cabe * 205) / 229);
  tamanho = Math.round(tamanho);
  const altura = alt(tamanho);
  const mascoteX = Math.max(tamanho * 0.5 + 6, W * 0.25);
  const topoMascote = pesY - altura * 0.96;
  // O balão mora acima da cabeça dele; sem espaço (celular baixo com o teclado
  // aberto), ele desce para o lado — nunca sai por cima da tela nem entra no caderno.
  const baseBalao = Math.min(pesY - 6, Math.max(pesY - altura * 0.62 - 17, alturaBalao + 10));
  const chamaNaTela = { x: offCol.x + mascoteX + tamanho * 0.01, y: offCol.y + pesY - altura * 0.76 };
  const transicao = reduzirMov ? "none" : "transform 420ms cubic-bezier(.3,.7,.3,1), top 420ms cubic-bezier(.3,.7,.3,1)";

  const numEstacao = indice(estado.etapa);
  // No fim, depois de ele falar, o balão sai de cena: é o momento de a pessoa
  // ver Jerusalém no horizonte, e o balão ficava bem na frente dela.
  const mostrarBalao = !!falaAtual && !andando && !dormindo && !(estado.etapa === "fim" && assentado);

  return (
    <div ref={raiz} className="jz-raiz fixed inset-0 overflow-hidden" style={{ fontFamily: FONTE, background: "#8F7BE0" }}>
      <style>{ESTILO}</style>

      {/* ── o mundo ──────────────────────────────────────────────────────── */}
      <div className="absolute inset-x-0" style={{ top: -reserva, height: H + reserva, transform: `translate3d(0, ${-deslocar}px, 0)`, transition: transicao }}>
        <Trilha
          progresso={dormindo ? 0 : progresso(estado.etapa)}
          passo={numEstacao}
          destino={estado.etapa === "fim"}
          proporcao={tela.w / (H + reserva)}
        />
      </div>

      {/* ── a coluna do jogo ─────────────────────────────────────────────── */}
      <div ref={coluna} className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2" style={{ maxWidth: COLUNA_MAX }}>
        {/* voltar */}
        <button
          type="button"
          onClick={voltar}
          disabled={estado.etapa === "fim" || enviando || !!reacao}
          aria-label="Voltar"
          className="absolute left-3 z-30 flex h-10 w-10 items-center justify-center rounded-full transition active:scale-90 disabled:opacity-0"
          style={{ top: "max(12px, env(safe-area-inset-top, 0px))", background: "rgba(255,255,255,.72)", boxShadow: "0 2px 8px rgba(27,37,80,.12)" }}
        >
          <ArrowLeft className="h-5 w-5" style={{ color: COR.tinta }} strokeWidth={2.6} />
        </button>

        {/* a placa do nome, fincada na beira da trilha */}
        <AnimatePresence>
          {estado.etapa === "nome" && !andando && (
            <motion.div
              className="absolute right-4 z-[5]"
              style={{ top: pesY - Math.min(132, W * 0.34) * 0.62 - 20, transition: transicao }}
              initial={reduzirMov ? false : { y: 40, opacity: 0, rotate: 6 }}
              animate={{ y: 0, opacity: 1, rotate: -2 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
            >
              <Placa nome={texto} largura={Math.min(132, W * 0.34)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* o Devocionalzeiro */}
        <button
          type="button"
          onClick={cutucar}
          aria-label={dormindo ? "Acordar o Devocionalzeiro" : "Devocionalzeiro"}
          className="absolute z-10 outline-none"
          style={{ left: mascoteX - tamanho / 2, top: topoMascote, width: tamanho, height: altura, transition: transicao, WebkitTapHighlightColor: "transparent" }}
        >
          <Devocionalzeiro
            tamanho={tamanho}
            expressao={expressao}
            gesto={gesto}
            chama={chama}
            falando={falando && !dormindo}
            olhar={olhar}
            pulso={pulso}
            toque={toque}
          />
          {dormindo && <Zzz />}
          <AnimatePresence>
            {momento?.tag && (
              <motion.span
                key={momento.tag}
                className="pointer-events-none absolute left-1/2 whitespace-nowrap"
                style={{ top: -8, fontFamily: MAO, fontWeight: 700, fontSize: 22, color: COR.tinta, textShadow: "0 0 6px rgba(255,255,255,.95), 0 0 2px #fff" }}
                initial={{ opacity: 0, y: 6, rotate: -6 }}
                animate={{ opacity: 1, y: -14, rotate: -4 }}
                exit={{ opacity: 0, y: -26 }}
                transition={{ duration: 0.35 }}
              >
                {momento.tag}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* o balão, à direita dele, com o rabicho descendo até a cabeça */}
        <div
          ref={balaoRef}
          className="absolute z-10"
          style={{
            left: Math.min(mascoteX + tamanho * 0.3, W - 190),
            right: 14,
            bottom: H - baseBalao,
            transition: reduzirMov ? "none" : "bottom 420ms cubic-bezier(.3,.7,.3,1)",
          }}
        >
          <AnimatePresence mode="wait">
            {mostrarBalao && falaAtual && (
              <motion.div
                key={falaAtual.texto}
                initial={reduzirMov ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduzirMov ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 6, transition: { duration: 0.12 } }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                style={{ transformOrigin: "12% 100%" }}
              >
                <Balao texto={falaAtual.texto} onTerminou={falaEscrita} onFalando={setFalando} onAvancar={pularFala} mais={haMais} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── o caderno: onde a pessoa responde ────────────────────────── */}
        <div
          ref={painel}
          className="absolute inset-x-0 z-20"
          style={{ bottom: teclado, transition: reduzirMov ? "none" : "bottom 180ms ease-out" }}
        >
          {/* borda de papel rasgado */}
          <svg className="absolute -top-[9px] left-0 h-[10px] w-full" viewBox="0 0 400 10" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 10 L0 5 L14 3 L27 6 L41 2 L58 5 L70 3 L86 6 L99 2 L117 4 L130 7 L146 3 L160 5 L175 2 L191 6 L206 3 L220 5 L236 2 L250 6 L266 3 L280 5 L297 2 L311 6 L326 3 L340 5 L355 2 L371 6 L386 3 L400 5 L400 10 Z" fill={COR.papel} />
          </svg>
          <div
            className="max-h-[78dvh] overflow-y-auto px-5 pt-2"
            style={{
              background: COR.papel,
              paddingBottom: teclado ? 12 : "max(16px, env(safe-area-inset-bottom, 0px))",
              boxShadow: "0 -12px 28px -18px rgba(27,37,80,.35)",
            }}
          >
            <p className="mb-2 text-[21px] leading-none" style={{ fontFamily: MAO, fontWeight: 700, color: COR.lapis }}>
              {numEstacao > 0 && numEstacao < ROTEIRO.length - 1 ? `parada ${numEstacao} · ` : ""}{etapa.estacao}
            </p>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={estado.etapa + (dormindo ? "-z" : "")}
                initial={reduzirMov ? { opacity: 0 } : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0, transition: { delay: reduzirMov ? 0 : 0.18, duration: 0.3, ease: "easeOut" } }}
                exit={reduzirMov ? { opacity: 0 } : { opacity: 0, y: 18, transition: { duration: 0.16 } }}
                className={reacao ? "pointer-events-none" : undefined}
              >
                {conteudoDaEtapa()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* as lanternas voando até a chama */}
      {voo && !reduzirMov && voo.map((l, i) => (
        <motion.span
          key={l.valor}
          className="pointer-events-none fixed z-40 block h-[44px] w-[38px]"
          style={{
            left: l.x - 19, top: l.y - 22,
            borderRadius: "14px 14px 16px 16px / 18px 18px 22px 22px",
            background: "radial-gradient(circle at 50% 62%, #FFF6C9 0%, #FFD36B 40%, #FF9F3A 100%)",
            boxShadow: "0 0 26px 8px rgba(255,170,60,.6)",
          }}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{
            x: [0, (chamaNaTela.x - l.x) * 0.35 + (i % 2 ? 30 : -30), chamaNaTela.x - l.x],
            y: [0, (chamaNaTela.y - l.y) * 0.7 - 50, chamaNaTela.y - l.y],
            scale: [1, 0.8, 0.15],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.85, delay: i * 0.07, ease: [0.4, 0, 0.6, 1] }}
        />
      ))}

      {estado.etapa === "fim" && !andando && <Festa origem={chamaNaTela} />}
    </div>
  );

  // ─── o conteúdo do caderno, por mecânica ──────────────────────────────────
  function conteudoDaEtapa() {
    if (contaExiste) {
      return (
        <div className="space-y-3 pb-1">
          <Botao onClick={irParaLogin}>Entrar com esse e-mail</Botao>
          <Botao variante="papel" onClick={() => despachar({ tipo: "irPara", etapa: "email" })}>Usar outro e-mail</Botao>
        </div>
      );
    }
    if (aguardandoEmail) {
      return <div className="pb-1"><Botao onClick={irParaLogin}>Já confirmei, quero entrar</Botao></div>;
    }

    switch (etapa.tipo) {
      case "despertar":
        return (
          <div className="flex flex-col items-center gap-2 pb-1">
            {dormindo && (
              <p className="pb-1 text-center text-[27px] leading-tight" style={{ fontFamily: MAO, fontWeight: 700, color: COR.tinta }}>
                Psiu… ele ainda tá dormindo.
              </p>
            )}
            <Botao onClick={continuar}>{dormindo ? "Acordar o Devocionalzeiro" : etapa.botao}</Botao>
            <Link onClick={irParaLogin} cor={COR.tinta2}>Já tenho uma conta</Link>
          </div>
        );

      case "nome":
        return (
          <form onSubmit={(e) => { e.preventDefault(); continuar(); }} className="space-y-3 pb-1">
            <Campo
              ref={campoRef}
              value={texto}
              onChange={(e) => {
                const v = e.target.value;
                if (v.length > texto.length) setToque((t) => t + 1);
                setTexto(v);
                setErro(null);
              }}
              onFocus={() => setFocoNoCampo(true)}
              onBlur={() => setFocoNoCampo(false)}
              placeholder={etapa.placeholder}
              erro={erro}
              maxLength={30}
              enterKeyHint="done"
              type="text"
              autoComplete="given-name"
              autoCapitalize="words"
              aria-label="Como te chamam"
            />
            <Botao onClick={continuar} desabilitado={!texto.trim()}>{etapa.botao}</Botao>
          </form>
        );

      case "lanternas":
        return (
          <div className="space-y-3 pb-1">
            <Lanternas
              opcoes={etapa.opcoes!}
              marcadas={escolhas}
              soltas={!!voo}
              onAlternar={(v) => {
                if (!escolhas.includes(v)) setToque((t) => t + 1);
                setEscolhas((a) => (a.includes(v) ? a.filter((x) => x !== v) : [...a, v]));
              }}
            />
            <Botao onClick={continuar} desabilitado={!escolhas.length} carregando={!!voo}>
              {escolhas.length > 1 ? `Soltar as ${escolhas.length} lanternas` : escolhas.length ? "Soltar a lanterna" : "Acende pelo menos uma"}
            </Botao>
          </div>
        );

      case "escala":
        return (
          <div className="space-y-4 pb-1">
            <Escala
              opcoes={etapa.opcoes!}
              valor={escolha}
              onMudar={(v) => {
                if (v === escolha) return;
                setEscolha(v);
                const o = etapa.opcoes!.find((x) => x.valor === v);
                limparTimerFala();
                setAoVivo(o?.reacao ?? null);
                setAssentado(false);
                if ((o?.nivel ?? 0) >= 4) setPulso((p) => p + 1);
                else setToque((t) => t + 1);
              }}
            />
            <Botao onClick={continuar} desabilitado={!escolha}>{etapa.botao}</Botao>
          </div>
        );

      case "mostrador":
        return (
          <div className="space-y-3 pb-1">
            <Mostrador
              opcoes={etapa.opcoes!}
              valor={escolha ?? "10"}
              onMudar={(v) => {
                setEscolha(v);
                const o = etapa.opcoes!.find((x) => x.valor === v);
                limparTimerFala();
                setAoVivo(o?.reacao ?? null);
                setAssentado(false);
                if (v === "20") setPulso((p) => p + 1);
                else setToque((t) => t + 1);
              }}
            />
            <Botao onClick={continuar}>{etapa.botao}</Botao>
          </div>
        );

      case "selos":
        return (
          <div className="pb-2">
            <Selos
              opcoes={etapa.opcoes!}
              valor={escolha}
              onEscolher={(v) => {
                setEscolha(v);
                window.setTimeout(() => responder({ origem: v }), reduzirMov ? 150 : 520);
              }}
            />
          </div>
        );

      case "telefone": {
        const d = DDIS.find((x) => x.code === ddi);
        return (
          <form onSubmit={(e) => { e.preventDefault(); continuar(); }} className="space-y-2 pb-1">
            <Campo
              ref={campoRef}
              value={numero}
              onChange={(e) => {
                const v = e.target.value.replace(/[^\d\s()-]/g, "");
                if (v.length > numero.length) setToque((t) => t + 1);
                setNumero(v);
                setErro(null);
              }}
              onFocus={() => setFocoNoCampo(true)}
              onBlur={() => setFocoNoCampo(false)}
              placeholder={d?.placeholder ?? etapa.placeholder}
              erro={erro}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              enterKeyHint="done"
              maxLength={(d?.maxDigits ?? 11) + 5}
              aria-label="Número de WhatsApp"
              esquerda={
                <select
                  value={ddi}
                  onChange={(e) => { setDdi(e.target.value); setErro(null); campoRef.current?.focus(); }}
                  aria-label="País"
                  className="ml-2 shrink-0 cursor-pointer rounded-xl bg-transparent py-2 pl-2 pr-1 text-[16px] font-extrabold outline-none"
                  style={{ color: COR.tinta, fontFamily: FONTE }}
                >
                  {DDIS.map((x) => <option key={x.code} value={x.code}>{x.flag} {x.code}</option>)}
                </select>
              }
            />
            <div className="pt-1"><Botao onClick={continuar} desabilitado={!numero.replace(/\D/g, "")}>{etapa.botao}</Botao></div>
            <div className="text-center"><Link onClick={() => { tocar(); responder({ whatsapp: null }); }} cor={COR.tinta2}>Agora não</Link></div>
          </form>
        );
      }

      case "conta":
        return (
          <div className="space-y-3 pb-1">
            <Botao variante="papel" onClick={entrarComGoogle} carregando={enviando}
              icone={enviando ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogoGoogle />}>
              Continuar com Google
            </Botao>
            <Botao onClick={() => { tocar(); seguir(); }} desabilitado={enviando} icone={<Mail className="h-5 w-5" strokeWidth={2.4} />}>
              Continuar com e-mail
            </Botao>
            {erro && <p className="px-1 text-center text-[14px] font-bold" style={{ color: COR.erro }} role="alert">{erro}</p>}
            <p className="text-center text-[15px] font-bold" style={{ color: COR.tinta2 }}>
              Já tem uma conta? <Link onClick={irParaLogin}>Entrar</Link>
            </p>
          </div>
        );

      case "email":
        return (
          <form onSubmit={(e) => { e.preventDefault(); continuar(); }} className="space-y-3 pb-1">
            <Campo
              ref={campoRef}
              value={texto}
              onChange={(e) => { setTexto(e.target.value); setErro(null); }}
              onFocus={() => setFocoNoCampo(true)}
              onBlur={() => setFocoNoCampo(false)}
              placeholder={etapa.placeholder}
              erro={erro}
              maxLength={120}
              enterKeyHint="next"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              aria-label="Seu e-mail"
            />
            <Botao onClick={continuar} desabilitado={!texto.trim()}>{etapa.botao}</Botao>
          </form>
        );

      case "senha":
        return (
          <form onSubmit={(e) => { e.preventDefault(); continuar(); }} className="pb-1">
            <p className="mb-2.5 px-1 text-[14px] font-bold" style={{ color: COR.tinta2 }}>
              Conta para <span style={{ color: COR.tinta }}>{r.email}</span>{" "}
              <button type="button" className="font-extrabold" style={{ color: COR.chama }} onClick={() => despachar({ tipo: "voltar" })}>
                trocar
              </button>
            </p>
            <Campo
              ref={campoRef}
              type={verSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => { setSenha(e.target.value); setErro(null); }}
              onFocus={() => setFocoNoCampo(true)}
              onBlur={() => setFocoNoCampo(false)}
              placeholder={etapa.placeholder}
              autoComplete="new-password"
              enterKeyHint="done"
              erro={erro}
              aria-label="Crie uma senha"
              direita={
                <button type="button" onClick={() => setVerSenha((v) => !v)} className="px-4 py-3" aria-label={verSenha ? "Esconder senha" : "Mostrar senha"}>
                  {verSenha ? <EyeOff className="h-5 w-5" style={{ color: COR.tinta2 }} /> : <Eye className="h-5 w-5" style={{ color: COR.tinta2 }} />}
                </button>
              }
            />
            <MedidorSenha senha={senha} />
            <div className="mt-3">
              <Botao onClick={continuar} desabilitado={!senha} carregando={enviando}
                icone={enviando ? <Loader2 className="h-5 w-5 animate-spin" /> : undefined}>
                {enviando ? "Guardando sua chama…" : etapa.botao}
              </Botao>
            </div>
          </form>
        );

      case "fim":
        return (
          <div className="space-y-4 pb-1">
            <Diario r={r} />
            <Botao variante="ouro" onClick={continuar}>{etapa.botao}</Botao>
          </div>
        );
    }
  }
}

/** Tira o redirecionamento pendente para esta tela, se foi ela quem o pôs. */
function limparRedirecionamento() {
  try {
    if (localStorage.getItem("post_signup_redirect") === "/jornada") localStorage.removeItem("post_signup_redirect");
  } catch { /* ok */ }
}

// O app, no tema claro, força fundo e cor em TODO input com !important
// (index.css). Na jornada o campo é desenhado pela caixa em volta — o fundo
// branco do input cobria o anel de foco e pintava o trilho da escala.
const ESTILO = `
.jz-raiz input.jz-campo,.jz-raiz select,.jz-raiz input.jz-range{background-color:transparent!important;color:${COR.tinta}!important}
.jz-caixa:focus-within{box-shadow:inset 0 0 0 2px ${COR.chama},0 0 0 4px rgba(47,123,255,.14)!important}
.jz-campo::placeholder{color:#AFA38A;opacity:1;font-weight:600}
@keyframes jz-balanca{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
.jz-balanca{animation:jz-balanca 2.6s ease-in-out infinite}
@keyframes jz-pisca{0%,100%{transform:scaleY(1);opacity:1}50%{transform:scaleY(1.35) translateX(.5px);opacity:.8}}
.jz-pisca{animation:jz-pisca .45s ease-in-out infinite;transform-origin:50% 100%}
@keyframes jz-seta{0%,100%{transform:translateY(0);opacity:1}50%{transform:translateY(2px);opacity:.5}}
.jz-seta{animation:jz-seta .9s ease-in-out infinite}
.jz-range{-webkit-appearance:none;appearance:none;height:34px;background:transparent!important;border:0;padding:0;cursor:pointer;touch-action:pan-y}
.jz-range::-webkit-slider-runnable-track{height:10px;border-radius:99px;background:linear-gradient(90deg,${COR.verde} var(--jz-p),#EFE5D1 var(--jz-p))}
.jz-range::-moz-range-track{height:10px;border-radius:99px;background:linear-gradient(90deg,${COR.verde} var(--jz-p),#EFE5D1 var(--jz-p))}
.jz-range::-webkit-slider-thumb{-webkit-appearance:none;width:32px;height:32px;margin-top:-11px;border-radius:50%;background:#fff;border:4px solid ${COR.verde};box-shadow:0 3px 8px rgba(27,37,80,.25)}
.jz-range::-moz-range-thumb{width:24px;height:24px;border-radius:50%;background:#fff;border:4px solid ${COR.verde};box-shadow:0 3px 8px rgba(27,37,80,.25)}
.jz-range:focus-visible{outline:none}
.jz-range:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 5px rgba(47,174,102,.25)}
@media (prefers-reduced-motion:reduce){.jz-balanca,.jz-pisca,.jz-seta{animation:none}}
`;
