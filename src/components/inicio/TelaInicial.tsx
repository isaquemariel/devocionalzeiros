import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpen, Brain, HeartHandshake, Scroll, Sword, Trophy, type LucideIcon } from "lucide-react";
import { Devocionalzeiro } from "@/components/devocionalzeiro/Devocionalzeiro";
import { Balao } from "@/components/jornada/Balao";
import { RPGJoystick, JOY_RADIUS } from "@/components/rpg/RPGJoystick";
import { ALTURA, CenaDoDia, ESTILO_CENA, ESTRADA } from "./CenaDoDia";
import { useMomentoDoDia } from "./useMomentoDoDia";
import { NomeDoApp } from "./NomeDoApp";
import { CUTUCOES, CUTUCOES_DESKTOP, RECURSOS, montarRoteiro, type Fala, type IdRecurso } from "./roteiro";
import { FALAS_DO_CEU, VIRADA, type Fase } from "@/lib/ceu";
import type { Expressao, Gesto } from "@/lib/jornada/tipos";
import { lerRascunho } from "@/lib/jornada/motor";
import { useOcuparPalco } from "@/lib/devocionalzeiro/palco";
import { lerQuemVolta } from "@/lib/devocionalzeiro/quemVolta";
import { paraOApp } from "@/lib/devocionalzeiro/visual";
import { equipToLook, getEquip } from "@/lib/rpgRewards";
import logoOfficial from "@/assets/logo-icon.png";

/**
 * A TELA INICIAL — a porta do app, já dentro do mundo do RPG Bíblico.
 *
 * Jerusalém na luz da hora de quem abre (`CenaDoDia` + `useMomentoDoDia`). O
 * Devocionalzeiro chega andando pela estrada e APRESENTA o app (`roteiro`):
 * o que tem lá dentro, por que fazer parte — e chama para o botão certo. Quem
 * já entrou neste aparelho é recebido pelo nome, vestido como deixou o boneco
 * no RPG; quem parou a jornada no meio é chamado a terminar.
 *
 * Ele se CONTROLA como no RPG:
 * - celular: segurar e arrastar em qualquer lugar abre o controle invisível
 *   (o joystick flutuante da cena viva) e ele anda pela estrada; um toque
 *   avança a conversa (no boneco, ele reage); DOIS toques, ele pula;
 * - computador: setas (ou A/D) andam, espaço pula, clique conversa.
 * Segue o dedo com os olhos, cochila de madrugada, se espreguiça de manhã e
 * olha as estrelas à noite. O sol e a lua se tocam.
 *
 * No computador a tela usa a largura: um painel à esquerda (nome, o que tem
 * lá dentro em cartões, os botões, as teclas) e a cidade aberta à direita,
 * com ele na porta do Templo.
 */

interface Props {
  onSignup: () => void;
  onLogin: () => void;
}

const ICONE: Record<IdRecurso, LucideIcon> = {
  devocional: Scroll, leitura: BookOpen, rpg: Sword, quiz: Brain, conquistas: Trophy, comunidade: HeartHandshake,
};

const limitar = (v: number, a = -1, b = 1) => Math.max(a, Math.min(b, v));
/** deslocamento máximo do dedo para ainda ser um toque (e não o controle) */
const TOQUE_PX = 12;
/** janela do toque duplo */
const DUPLO_MS = 300;
const CHAVE_DICA = "dz.inicio.controlou";

/** o que ele faz sozinho, nas pausas, conforme a hora */
function ocioso(fase: Fase, vez: number): { gesto: Gesto; expressao: Expressao; olhar?: { x: number; y: number } } {
  switch (fase) {
    case "madrugada": return vez % 2 ? { gesto: "parado", expressao: "dormindo" } : { gesto: "cocar", expressao: "pensativo" };
    case "manha": return vez % 2 ? { gesto: "parado", expressao: "feliz", olhar: { x: 0.6, y: -0.7 } } : { gesto: "espreguicar", expressao: "feliz" };
    case "tarde": return vez % 2 ? { gesto: "pensar", expressao: "pensativo" } : { gesto: "apontar", expressao: "feliz", olhar: { x: 0.8, y: -0.2 } };
    default: return { gesto: "parado", expressao: "feliz", olhar: { x: vez % 2 ? -0.4 : 0.35, y: -1 } };
  }
}

export default function TelaInicial({ onSignup, onLogin }: Props) {
  const reduzir = !!useReducedMotion();
  const m = useMomentoDoDia();
  const raiz = useRef<HTMLDivElement>(null);
  const [tela, setTela] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      if (width > 0 && height > 0) setTela({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ─── quem chega ───────────────────────────────────────────────────────────
  const [quem] = useState(() => {
    const r = lerRascunho();
    return { volta: lerQuemVolta(), jornadaPelaMetade: !!r && r.etapa !== "boas-vindas" };
  });
  // quem volta encontra o boneco vestido como o deixou no RPG (só o que fica nele)
  const lookDeQuemVolta = useMemo(() => (quem.volta ? paraOApp(equipToLook(getEquip(quem.volta.uid))) : null), [quem]);

  // ─── medidas: a cena tem 800 de altura, inteira na tela ────────────────────
  const desktop = tela.w >= 1024;
  const s = tela.h / ALTURA;
  const L = Math.max(400, Math.round(ALTURA * (tela.w / tela.h)));
  const naTela = (u: number, v: number) => ({ x: tela.w / 2 + (u - L / 2) * s, y: v * s });
  const painel = desktop ? Math.round(Math.min(640, Math.max(460, tela.w * 0.42))) : 0;
  // a "casa" dele: o meio da tela no celular; a porta do Templo, no meio da
  // área aberta à direita do painel, no computador
  const xCasa = desktop ? painel + (tela.w - painel) / 2 : tela.w / 2;
  const centroCena = desktop ? xCasa / tela.w : 0.5;
  const tamanho = desktop
    ? Math.round(Math.min(210, Math.max(130, tela.h * 0.22)))
    : Math.round(Math.min(176, Math.max(104, tela.h * 0.2)));
  const altBoneco = (tamanho * 229) / 205;
  const pes = (ESTRADA + 20) * s;
  const topoBoneco = pes - altBoneco * (220 / 229);
  const chama = 0.55;
  const sobre = Math.round(altBoneco * (0.26 - chama * 0.16));
  const xMin = painel + tamanho * 0.45;
  const xMax = tela.w - tamanho * 0.45;

  // ─── andar pela estrada ───────────────────────────────────────────────────
  // (entra pela esquerda no celular; no computador, pela direita, e para na porta)
  const inicioX = reduzir ? xCasa : desktop ? tela.w + tamanho * 0.7 : -tamanho * 0.7;
  const [x, setX] = useState(inicioX);
  const [anda, setAnda] = useState<-1 | 0 | 1>(0);
  const [chegou, setChegou] = useState(reduzir);
  const mov = useRef({ x: inicioX, alvo: (reduzir ? null : xCasa) as number | null, esq: false, dir: false, joy: 0, ultimo: 0, raf: 0 });
  const lim = useRef({ min: xMin, max: xMax, vel: 200 });
  lim.current = { min: xMin, max: xMax, vel: Math.max(170, Math.min(340, tela.w * 0.38)) };
  const aoChegar = useRef(() => {});
  aoChegar.current = () => { if (!chegou) setChegou(true); };

  const andar = useCallback(() => {
    const mv = mov.current;
    if (mv.raf) return;
    mv.ultimo = performance.now();
    const passo = (agora: number) => {
      const dt = Math.min(0.05, (agora - mv.ultimo) / 1000);
      mv.ultimo = agora;
      const { min, max, vel } = lim.current;
      let v = 0;
      if (mv.esq !== mv.dir) v = mv.dir ? 1 : -1;
      else if (mv.joy) v = mv.joy;
      else if (mv.alvo != null) {
        const d = mv.alvo - mv.x;
        if (Math.abs(d) < 3) { mv.x = mv.alvo; mv.alvo = null; aoChegar.current(); }
        else v = Math.sign(d) * Math.min(1, 0.3 + Math.abs(d) / 60);
      }
      let moveu = false;
      if (v) {
        const nx = mv.x + v * vel * dt;
        // indo para a casa (a chegada) ele pode vir de fora da tela
        const px = mv.alvo != null ? nx : limitar(nx, min, max);
        moveu = Math.abs(px - mv.x) > 0.01;
        mv.x = px;
      }
      setX(mv.x);
      setAnda(moveu ? (v > 0 ? 1 : -1) : 0);
      const segue = moveu || mv.alvo != null || mv.esq || mv.dir || mv.joy !== 0;
      mv.raf = segue ? requestAnimationFrame(passo) : 0;
    };
    mv.raf = requestAnimationFrame(passo);
  }, []);
  useEffect(() => {
    const mv = mov.current;
    if (mv.alvo != null) andar();
    return () => cancelAnimationFrame(mv.raf);
  }, [andar]);
  // a tela mudou de tamanho: a casa muda de lugar e ele continua dentro da estrada
  useEffect(() => {
    const mv = mov.current;
    if (!chegou) { mv.alvo = xCasa; andar(); return; }
    const nx = limitar(mv.x, xMin, xMax);
    if (nx !== mv.x) { mv.x = nx; setX(nx); }
  }, [xCasa, xMin, xMax, chegou, andar]);

  // ─── o pulo ───────────────────────────────────────────────────────────────
  const [salto, setSalto] = useState(0);
  const [festejo, setFestejo] = useState(false);
  const noAr = useRef(0);
  const pular = useCallback(() => {
    const agora = performance.now();
    if (agora < noAr.current) return;
    noAr.current = agora + 880;
    setSalto((n) => n + 1);
    setFestejo(true);
    window.setTimeout(() => setFestejo(false), 900);
  }, []);

  // ─── a conversa ───────────────────────────────────────────────────────────
  const [fala, setFala] = useState<(Fala & { chave: number }) | null>(null);
  const [gesto, setGesto] = useState<Gesto>("parado");
  const [expressao, setExpressao] = useState<Expressao>("feliz");
  const [olharOcioso, setOlharOcioso] = useState<{ x: number; y: number } | null>(null);
  const [falando, setFalando] = useState(false);
  const [pulso, setPulso] = useState(0);
  const timers = useRef<number[]>([]);
  const passoRoteiro = useRef(0);
  const vezOcioso = useRef(0);
  const vezCutucao = useRef(0);
  const saindo = useRef(false);
  const roteiro = useMemo(() => montarRoteiro(m, quem), [m.fase, quem]); // eslint-disable-line react-hooks/exhaustive-deps
  const vivo = useRef({ roteiro, fase: m.fase });
  vivo.current = { roteiro, fase: m.fase };

  const depois = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);
  const limpar = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);
  useEffect(() => limpar, [limpar]);

  const dizer = useCallback((f: Fala) => {
    limpar();
    setOlharOcioso(null);
    setFala({ ...f, chave: Date.now() + Math.random() });
    setGesto(f.gesto ?? "parado");
    setExpressao(f.expressao ?? "feliz");
    // um aceno ou uma festa não duram a fala inteira
    if (f.gesto && f.gesto !== "parado" && f.gesto !== "pensar") depois(() => setGesto("parado"), 2200);
  }, [depois, limpar]);

  const proxima = useCallback(() => {
    const r = vivo.current.roteiro;
    passoRoteiro.current = (passoRoteiro.current + 1) % r.length;
    // a saudação é só da chegada: na volta do ciclo, ela fica de fora
    if (passoRoteiro.current === 0) passoRoteiro.current = 1 % r.length;
    dizer(r[passoRoteiro.current]);
  }, [dizer]);

  // terminou de falar: um tempo para ler, a pausa com o gesto da hora, e a próxima
  const terminou = useCallback(() => {
    const texto = fala?.texto ?? "";
    const leitura = Math.min(7000, 2600 + texto.length * 40);
    depois(() => {
      setFala(null);
      setGesto("parado");
      depois(() => {
        const o = ocioso(vivo.current.fase, vezOcioso.current++);
        setGesto(o.gesto);
        setExpressao(o.expressao);
        setOlharOcioso(o.olhar ?? null);
        if (o.gesto !== "parado" && o.gesto !== "pensar") depois(() => setGesto("parado"), 2600);
      }, 700);
      depois(proxima, 4200);
    }, leitura);
  }, [depois, fala?.texto, proxima]);

  // chegou na casa → acena e começa a conversa
  useEffect(() => {
    if (!chegou) return;
    passoRoteiro.current = 0;
    const t = window.setTimeout(() => dizer(vivo.current.roteiro[0]), reduzir ? 200 : 300);
    return () => window.clearTimeout(t);
  }, [chegou, dizer, reduzir]);

  // a hora VIROU com a tela aberta: ele comenta
  const faseAntes = useRef(m.fase);
  useEffect(() => {
    if (faseAntes.current === m.fase) return;
    faseAntes.current = m.fase;
    passoRoteiro.current = 0;
    if (chegou && !saindo.current) dizer({ texto: VIRADA[m.fase], gesto: "apontar", expressao: "surpreso" });
  }, [m.fase, chegou, dizer]);

  // O palco é dele: um aviso que chegar com esta tela aberta (um erro de rede,
  // por exemplo) é dito por ELE, no balão dele — nunca um segundo boneco no
  // meio da tela. Sobras da conta que acabou de sair (sucesso/info) não são
  // assunto de quem está deslogado: ficam caladas.
  const dizerRef = useRef(dizer);
  dizerRef.current = dizer;
  useOcuparPalco((aviso) => {
    if (aviso.tipo === "erro" || aviso.tipo === "alerta") dizerRef.current({ texto: aviso.texto, detalhe: aviso.detalhe, gesto: "cocar", expressao: "pensativo" });
    return true;
  });

  const cutucar = () => {
    if (saindo.current || !chegou) return;
    setPulso((p) => p + 1);
    if (expressao === "dormindo") {
      dizer({ texto: "Opa! Cochilei... mas tô aqui!", gesto: "cocar", expressao: "surpreso" });
      return;
    }
    const lista = desktop ? CUTUCOES_DESKTOP : CUTUCOES;
    dizer(lista[vezCutucao.current++ % lista.length]);
  };

  const avancar = () => {
    if (saindo.current || !chegou) return;
    proxima();
  };

  const cabeca = { x, y: topoBoneco + altBoneco * 0.42 };
  const astroSol = naTela(m.sol.x * L, 470 - m.sol.altura * 360);
  const astroLua = naTela(m.lua.x * L, 470 - m.lua.altura * 330);

  const tocarCeu = (qual: "sol" | "lua") => {
    if (saindo.current || !chegou) return;
    setPulso((p) => p + 1);
    const f = qual === "sol" ? FALAS_DO_CEU.sol : FALAS_DO_CEU.lua(m.lua.fase);
    dizer({ ...f, gesto: "apontar", expressao: "radiante" });
    const alvo = qual === "sol" ? astroSol : astroLua;
    depois(() => setOlharOcioso({ x: limitar((alvo.x - cabeca.x) / (tela.w * 0.35)), y: -1 }), 30);
  };

  const sair = (f: Fala, ir: () => void, ms: number) => {
    if (saindo.current) return;
    saindo.current = true;
    if (reduzir) { ir(); return; }
    dizer(f);
    setPulso((p) => p + 1);
    depois(ir, ms);
  };

  // ─── a dica do controle (some depois do primeiro uso) ─────────────────────
  const [dica, setDica] = useState(() => { try { return localStorage.getItem(CHAVE_DICA) !== "1"; } catch { return true; } });
  const controlou = useCallback(() => {
    setDica(false);
    try { localStorage.setItem(CHAVE_DICA, "1"); } catch { /* ok */ }
  }, []);

  // ─── olhos no dedo e paralaxe (sem re-render da cena) ─────────────────────
  const [olharPonteiro, setOlharPonteiro] = useState<{ x: number; y: number } | null>(null);
  const alvoParalaxe = useRef({ x: 0, y: 0 });
  const atualParalaxe = useRef({ x: 0, y: 0 });
  const quadro = useRef(0);
  const soltarOlhar = useRef(0);

  const animarParalaxe = useCallback(() => {
    if (quadro.current) return;
    const passoQuadro = () => {
      const a = atualParalaxe.current, b = alvoParalaxe.current;
      a.x += (b.x - a.x) * 0.08;
      a.y += (b.y - a.y) * 0.08;
      raiz.current?.style.setProperty("--dz-px", a.x.toFixed(3));
      raiz.current?.style.setProperty("--dz-py", a.y.toFixed(3));
      quadro.current = Math.abs(b.x - a.x) + Math.abs(b.y - a.y) > 0.002 ? requestAnimationFrame(passoQuadro) : 0;
    };
    quadro.current = requestAnimationFrame(passoQuadro);
  }, []);
  useEffect(() => () => cancelAnimationFrame(quadro.current), []);

  const olharPara = (px: number, py: number, rapido: boolean) => {
    const r = raiz.current?.getBoundingClientRect();
    if (!r) return;
    if (!reduzir) {
      alvoParalaxe.current = { x: limitar((px / r.width - 0.5) * 2), y: limitar((py / r.height - 0.5) * 2) };
      animarParalaxe();
    }
    const novo = { x: limitar((px - cabeca.x) / (r.width * 0.35)), y: limitar((py - cabeca.y) / (r.height * 0.35)) };
    setOlharPonteiro((o) => (o && Math.abs(o.x - novo.x) + Math.abs(o.y - novo.y) < 0.06 ? o : novo));
    window.clearTimeout(soltarOlhar.current);
    soltarOlhar.current = window.setTimeout(() => setOlharPonteiro(null), rapido ? 1800 : 4000);
  };
  useEffect(() => () => window.clearTimeout(soltarOlhar.current), []);

  // o celular inclinado também mexe a cena (onde o aparelho entrega o giroscópio)
  useEffect(() => {
    if (reduzir) return;
    const girar = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      alvoParalaxe.current = { x: limitar(e.gamma / 25), y: limitar((e.beta - 45) / 30) };
      animarParalaxe();
    };
    window.addEventListener("deviceorientation", girar);
    return () => window.removeEventListener("deviceorientation", girar);
  }, [reduzir, animarParalaxe]);

  // ─── o controle invisível: toque, toque duplo, arrastar ───────────────────
  const [joy, setJoy] = useState<{ x: number; y: number; kx: number; ky: number } | null>(null);
  const dedo = useRef<{ id: number; sx: number; sy: number; ativo: boolean; noBoneco: boolean } | null>(null);
  const ultimoToque = useRef<{ t: number; x: number; y: number } | null>(null);
  const toqueSimples = useRef(0);
  useEffect(() => () => window.clearTimeout(toqueSimples.current), []);

  const local = (e: React.PointerEvent) => {
    const r = raiz.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  // botões, balão e painéis têm o seu próprio toque
  const eDoControle = (alvo: EventTarget | null) =>
    !(alvo as HTMLElement | null)?.closest?.("button, a, input, [data-sem-controle]");

  const aoTocar = (e: React.PointerEvent) => {
    const p = local(e);
    olharPara(p.x, p.y, e.pointerType !== "mouse");
    if (!eDoControle(e.target) || (e.pointerType === "mouse" && e.button !== 0)) return;
    try { raiz.current?.setPointerCapture(e.pointerId); } catch { /* ok */ }
    dedo.current = { id: e.pointerId, sx: p.x, sy: p.y, ativo: false, noBoneco: !!(e.target as HTMLElement).closest?.("[data-personagem]") };
  };
  const aoArrastar = (e: React.PointerEvent) => {
    const p = local(e);
    const d = dedo.current;
    if (!d || e.pointerId !== d.id) { if (e.pointerType === "mouse") olharPara(p.x, p.y, false); return; }
    const dx = p.x - d.sx, dy = p.y - d.sy;
    const dist = Math.hypot(dx, dy);
    if (!d.ativo && dist > TOQUE_PX) { d.ativo = true; mov.current.alvo = null; }
    if (!d.ativo) return;
    const k = Math.min(dist, JOY_RADIUS) / (dist || 1);
    const kx = dx * k, ky = dy * k;
    // a estrada é uma linha: só o eixo de lado conta
    mov.current.joy = Math.abs(kx) < 6 ? 0 : kx / JOY_RADIUS;
    setJoy({ x: d.sx, y: d.sy, kx, ky });
    if (mov.current.joy) { andar(); controlou(); }
    olharPara(p.x, p.y, true);
  };
  const aoSoltar = (e: React.PointerEvent) => {
    const d = dedo.current;
    if (!d || e.pointerId !== d.id) return;
    dedo.current = null;
    setJoy(null);
    mov.current.joy = 0;
    if (d.ativo) return;
    // um toque: espera um instante para ver se vem o segundo (o pulo)
    const agora = performance.now();
    const u = ultimoToque.current;
    if (u && agora - u.t < DUPLO_MS && Math.hypot(d.sx - u.x, d.sy - u.y) < 48) {
      window.clearTimeout(toqueSimples.current);
      ultimoToque.current = null;
      pular();
      controlou();
      return;
    }
    ultimoToque.current = { t: agora, x: d.sx, y: d.sy };
    const noBoneco = d.noBoneco;
    toqueSimples.current = window.setTimeout(() => {
      ultimoToque.current = null;
      if (noBoneco) cutucar(); else avancar();
    }, DUPLO_MS);
  };
  const aoCancelar = () => { dedo.current = null; setJoy(null); mov.current.joy = 0; };

  // teclado (computador): setas / A-D andam, espaço / seta para cima pula
  useEffect(() => {
    const livre = () => {
      const a = document.activeElement as HTMLElement | null;
      return !a || a === document.body || a === raiz.current || a.dataset?.personagem !== undefined;
    };
    const esq = (k: string) => k === "ArrowLeft" || k === "a" || k === "A";
    const dir = (k: string) => k === "ArrowRight" || k === "d" || k === "D";
    const baixo = (e: KeyboardEvent) => {
      if (saindo.current) return;
      if (esq(e.key) || dir(e.key)) {
        if (esq(e.key)) mov.current.esq = true; else mov.current.dir = true;
        mov.current.alvo = null;
        andar();
        controlou();
        e.preventDefault();
      } else if ((e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W") && livre()) {
        e.preventDefault();
        if (!e.repeat) { pular(); controlou(); }
      }
    };
    const cima = (e: KeyboardEvent) => {
      if (esq(e.key)) mov.current.esq = false;
      if (dir(e.key)) mov.current.dir = false;
    };
    const perdeu = () => { mov.current.esq = false; mov.current.dir = false; };
    window.addEventListener("keydown", baixo);
    window.addEventListener("keyup", cima);
    window.addEventListener("blur", perdeu);
    return () => {
      window.removeEventListener("keydown", baixo);
      window.removeEventListener("keyup", cima);
      window.removeEventListener("blur", perdeu);
    };
  }, [andar, pular, controlou]);

  // ─── estrelas cadentes, de noite ──────────────────────────────────────────
  const [cadentes, setCadentes] = useState<{ id: number; x: number; y: number }[]>([]);
  const viuCadente = useRef(false);
  const falaAtual = useRef(fala);
  falaAtual.current = fala;
  const noiteFechada = m.estrelas > 0.5;
  useEffect(() => {
    if (reduzir || !noiteFechada) return;
    let t = 0;
    const agendar = (primeira: boolean) => {
      t = window.setTimeout(() => {
        const id = Date.now();
        const cx = tela.w * (0.35 + Math.random() * 0.6), cy = tela.h * (0.06 + Math.random() * 0.2);
        setCadentes((c) => [...c, { id, x: cx, y: cy }]);
        window.setTimeout(() => setCadentes((c) => c.filter((k) => k.id !== id)), 1900);
        // a primeira que passa com ele calado, ele comenta
        if (!viuCadente.current && !falaAtual.current && !saindo.current) {
          viuCadente.current = true;
          setOlharOcioso({ x: limitar((cx - 130 - mov.current.x) / (tela.w * 0.35)), y: -1 });
          window.setTimeout(() => {
            if (!falaAtual.current && !saindo.current) dizer({ ...FALAS_DO_CEU.cadente, gesto: "apontar", expressao: "surpreso" });
          }, 700);
        }
        agendar(false);
      }, (primeira ? 5000 : 7000) + Math.random() * 9000);
    };
    agendar(true);
    return () => window.clearTimeout(t);
  }, [reduzir, noiteFechada, tela.w, tela.h, dizer]);

  // ─── o que se desenha ─────────────────────────────────────────────────────
  // andando, ele olha para a frente (o espelho vira o olhar junto)
  const olhar = anda ? { x: 0.8, y: 0.05 } : olharPonteiro ?? olharOcioso;
  const baixa = tela.h < 700;
  const recursoAtivo = fala?.recurso ?? null;
  const areaMin = painel + 16;
  const larguraBalao = Math.min(330, tela.w - painel - 32);
  const balaoX = limitar(x - larguraBalao / 2, areaMin, tela.w - 16 - larguraBalao);
  const ponta = limitar(x - balaoX, 22, larguraBalao - 22);
  const paralaxeDoChao = reduzir ? undefined : `translate(calc(var(--dz-px, 0) * ${(-32 * s).toFixed(1)}px), calc(var(--dz-py, 0) * ${(-10 * s).toFixed(1)}px))`;
  const primarioEntrar = !!quem.volta;
  const rotuloJornada = quem.jornadaPelaMetade ? "Continuar Jornada" : "Começar Jornada";
  const irJornada = () => sair({ texto: quem.jornadaPelaMetade ? "Bora terminar!" : "Bora! Te encontro lá dentro.", gesto: "comemorar", expressao: "radiante" }, onSignup, 520);
  const irEntrar = () => sair({ texto: quem.volta?.nome ? `Bem-vindo de volta, ${quem.volta.nome}!` : "Que bom te ver de volta!", gesto: "acenar", expressao: "feliz" }, onLogin, 450);

  const botoes = (lado: boolean) => {
    const jornada = (
      <button key="j" type="button"
        className={`${primarioEntrar ? "rpg-btn-ghost hover:text-[#ece0c6]" : "rpg-btn dz-brilho"} relative overflow-hidden ${lado ? "flex-1" : "w-full"} py-3.5 text-[13px] uppercase tracking-[0.16em]`}
        onClick={irJornada}>
        <span className="relative z-10">{primarioEntrar ? rotuloJornada : `▶ ${rotuloJornada}`}</span>
      </button>
    );
    const entrar = (
      <button key="e" type="button"
        className={`${primarioEntrar ? "rpg-btn dz-brilho" : "rpg-btn-ghost hover:text-[#ece0c6]"} relative overflow-hidden ${lado ? "flex-1" : "w-full"} py-3.5 text-[12.5px] uppercase tracking-[0.16em] transition-colors`}
        onClick={irEntrar}>
        <span className="relative z-10">{primarioEntrar ? "▶ Já tenho uma conta" : "Já tenho uma conta"}</span>
      </button>
    );
    const ordem = primarioEntrar ? [entrar, jornada] : [jornada, entrar];
    return <div className={lado ? "flex gap-3" : "flex flex-col gap-2.5"}>{ordem}</div>;
  };

  return (
    <div
      ref={raiz}
      className="rpg-root relative h-[100dvh] w-full touch-none select-none overflow-hidden outline-none"
      style={{ background: m.ceu.topo }}
      tabIndex={-1}
      onPointerDown={aoTocar}
      onPointerMove={aoArrastar}
      onPointerUp={aoSoltar}
      onPointerCancel={aoCancelar}
    >
      <style>{ESTILO_CENA + ESTILO_TELA}</style>

      <CenaDoDia momento={m} proporcao={tela.w / tela.h} reduzir={reduzir} centro={centroCena} />

      {/* estrelas cadentes */}
      {cadentes.map((c) => (
        <div key={c.id} className="pointer-events-none absolute" style={{ left: c.x, top: c.y }}>
          <div className="dz-cadente">
            <div style={{ width: 120, height: 2, borderRadius: 2, transform: "rotate(153.4deg)", transformOrigin: "100% 50%", background: "linear-gradient(90deg, transparent, #fffbe8)", boxShadow: "0 0 6px #fff6c8" }} />
          </div>
        </div>
      ))}

      {/* o sol e a lua se tocam */}
      {chegou && m.sol.visivel && m.sol.altura > 0.04 && astroSol.x > painel && (
        <button type="button" aria-label="O sol" onClick={() => tocarCeu("sol")}
          className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffd889]"
          style={{ left: astroSol.x, top: astroSol.y }} />
      )}
      {chegou && m.lua.visivel && m.lua.altura > 0.04 && astroLua.x > painel && (
        <button type="button" aria-label="A lua" onClick={() => tocarCeu("lua")}
          className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffd889]"
          style={{ left: astroLua.x, top: astroLua.y }} />
      )}

      {/* as sombras que dão leitura ao texto, em qualquer hora */}
      {desktop ? (
        <div className="pointer-events-none absolute inset-y-0 left-0" style={{ width: painel + 160, background: "linear-gradient(90deg, rgba(8,7,5,0.86) 0%, rgba(8,7,5,0.74) 62%, rgba(8,7,5,0) 100%)" }} />
      ) : (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[42%]" style={{ background: "linear-gradient(180deg, rgba(6,8,16,0.66) 0%, rgba(6,8,16,0.32) 45%, rgba(6,8,16,0) 100%)" }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%]" style={{ background: "linear-gradient(0deg, rgba(6,8,14,0.9) 0%, rgba(6,8,14,0.55) 45%, rgba(6,8,14,0) 100%)" }} />
        </>
      )}
      <div className="rpg-vig pointer-events-none absolute inset-0" />

      {desktop ? (
        /* ── computador: o painel à esquerda ── */
        <motion.aside
          data-sem-controle
          className="absolute inset-y-0 left-0 flex items-center"
          style={{ width: painel }}
          initial={reduzir ? false : { opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full px-10 py-8 xl:px-14">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0" style={{ width: 76, height: 76 }}>
                <div className="absolute left-1/2 top-1/2 h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,200,110,0.32) 0%, rgba(255,200,110,0) 62%)" }} />
                <img src={logoOfficial} alt="" aria-hidden="true" className="relative h-full w-full object-contain drop-shadow-[2px_3px_0_#0b0805]" />
              </div>
              <div className="min-w-0">
                <h1 className="leading-none"><NomeDoApp tamanho={`${Math.round(limitar((painel - 190) / 9.9, 26, 50))}px`} /></h1>
                <p className="mt-2 text-[14px] font-semibold leading-snug" style={{ color: "#ece0c6" }}>
                  O lugar para todo cristão que <span style={{ color: "#ffd889" }}>ama a Palavra de Deus!</span>
                </p>
              </div>
            </div>

            <p className="rpg-eyebrow mb-3 mt-7">O que te espera lá dentro</p>
            <ul className="grid grid-cols-2 gap-2.5">
              {RECURSOS.map((r) => {
                const Icone = ICONE[r.id];
                const aceso = recursoAtivo === r.id;
                return (
                  <li key={r.id} className="dz-cartao rounded-[10px] px-3 py-2.5" data-aceso={aceso || undefined}>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md" style={{ background: "#20180d", border: "1px solid #6e4e18" }}>
                        <Icone className="h-3.5 w-3.5" style={{ color: "#e8b04b" }} aria-hidden="true" />
                      </span>
                      <span className="text-[11.5px] font-extrabold uppercase tracking-[0.12em]" style={{ color: aceso ? "#ffd889" : "#ece0c6" }}>{r.nome}</span>
                    </div>
                    <p className="mt-1.5 text-[11.5px] leading-snug" style={{ color: "#b8a67f" }}>{r.texto}</p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6">{botoes(true)}</div>

            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]" style={{ color: "#9c8b68" }}>
              <span><kbd className="dz-tecla">←</kbd> <kbd className="dz-tecla">→</kbd> andar</span>
              <span><kbd className="dz-tecla">espaço</kbd> pular</span>
              <span>clique na cena para conversar</span>
            </p>
          </div>
        </motion.aside>
      ) : (
        /* ── celular: o título no alto ── */
        <motion.header
          className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center px-5 text-center"
          style={{ paddingTop: `max(${baixa ? 12 : 22}px, env(safe-area-inset-top))` }}
          initial={reduzir ? false : { opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mb-2.5" style={{ width: baixa ? 54 : 74, height: baixa ? 54 : 74 }}>
            <div className="absolute left-1/2 top-1/2 h-[190%] w-[190%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,200,110,0.38) 0%, rgba(255,200,110,0) 62%)" }} />
            <img src={logoOfficial} alt="" aria-hidden="true" className="relative h-full w-full object-contain drop-shadow-[2px_3px_0_#0b0805]" />
          </div>
          <h1 className="leading-none">
            <NomeDoApp tamanho={baixa ? "clamp(22px, 7.6vw, 40px)" : "clamp(24px, 8.4vw, 58px)"} />
          </h1>
          <p className="mt-2.5 max-w-[300px] text-[12.5px] font-semibold leading-snug sm:max-w-none sm:text-[14px]" style={{ color: "#ece0c6", textShadow: "0 1px 2px #000" }}>
            O lugar para todo cristão que <span style={{ color: "#ffd889" }}>ama a Palavra de Deus!</span>
          </p>
          {!baixa && (
            <ul className="mt-3 flex max-w-[380px] flex-wrap justify-center gap-1.5" aria-label="O que tem no app">
              {RECURSOS.map((r) => {
                const Icone = ICONE[r.id];
                return (
                  <li key={r.id} className="dz-chip inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[9.5px] font-bold uppercase tracking-[0.1em]" data-aceso={recursoAtivo === r.id || undefined}>
                    <Icone className="h-2.5 w-2.5" style={{ color: "#e8b04b" }} aria-hidden="true" />
                    {r.nome}
                  </li>
                );
              })}
            </ul>
          )}
        </motion.header>
      )}

      {/* ── o balão, saindo da cabeça dele (e dentro da tela, onde quer que ele ande) ── */}
      <div className="pointer-events-none absolute inset-0 z-10" style={{ transform: paralaxeDoChao }}>
        <div className="pointer-events-auto absolute" data-sem-controle style={{ left: balaoX, bottom: tela.h - (topoBoneco + sobre - 15), width: larguraBalao }}>
          <AnimatePresence mode="wait">
            {fala && (
              <motion.div
                key={fala.chave}
                initial={reduzir ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.14 } }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                style={{ transformOrigin: `${ponta}px 100%` }}
              >
                <Balao
                  texto={fala.texto}
                  detalhe={fala.detalhe}
                  rabicho="centro"
                  ponta={ponta}
                  onFalando={setFalando}
                  onTerminou={terminou}
                  onAvancar={avancar}
                  mais={!saindo.current}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── ele, na estrada ── */}
      <div className="absolute" style={{ left: x - tamanho / 2, top: topoBoneco, width: tamanho, height: altBoneco, transform: paralaxeDoChao }}>
        {/* a luz azul da chama no chão de pedra, que a noite deixa ver */}
        <div className="pointer-events-none absolute left-1/2 top-[30%] h-[140%] w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, #5b9bff55 0%, #5b9bff00 60%)", opacity: 0.25 + (1 - m.luz) * 0.6 }} />
        <div
          data-personagem=""
          role="button"
          tabIndex={0}
          aria-label="Devocionalzeiro — toque para conversar, toque duas vezes para pular"
          onKeyDown={(e) => { if (e.key === "Enter") cutucar(); }}
          className="relative h-full w-full cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd889]"
          style={{ transform: anda < 0 ? "scaleX(-1)" : undefined }}
        >
          <Devocionalzeiro
            tamanho={tamanho} gesto={anda ? "andar" : gesto} expressao={festejo ? "radiante" : expressao} chama={chama}
            falando={falando} pulso={pulso} salto={salto} olhar={olhar}
            look={lookDeQuemVolta ?? undefined}
          />
        </div>
      </div>

      {joy && <RPGJoystick x={joy.x} y={joy.y} kx={joy.kx} ky={joy.ky} />}

      {/* ── celular: a dica do controle e o console dos caminhos ── */}
      {!desktop && (
        <>
          <AnimatePresence>
            {dica && chegou && !baixa && (
              <motion.p
                className="pointer-events-none absolute inset-x-0 text-center text-[10.5px] font-bold uppercase tracking-[0.14em]"
                style={{ top: pes + 10, color: "#ece0c6", textShadow: "0 1px 2px #000" }}
                initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} exit={{ opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                Arraste para andar · toque 2x para pular
              </motion.p>
            )}
          </AnimatePresence>
          <motion.div
            data-sem-controle
            className="absolute inset-x-0 bottom-0 px-4"
            style={{ paddingBottom: `max(${baixa ? 12 : 20}px, env(safe-area-inset-bottom))` }}
            initial={reduzir ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduzir ? 0 : 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`rpg-consoleframe mx-auto w-full max-w-[400px] px-4 ${baixa ? "pb-3 pt-4" : "pb-4 pt-5"}`}>
              <span className="rpg-consolelabel">{quem.volta ? "▶ CONTINUE DE ONDE PAROU" : "▶ SUA JORNADA COMEÇA AQUI"}</span>
              {botoes(false)}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

const ESTILO_TELA = `
.dz-cadente { animation: dz-cadente 1.8s ease-out forwards; }
@keyframes dz-brilho { 0% { transform: translateX(-120%) skewX(-18deg) } 60%,100% { transform: translateX(260%) skewX(-18deg) } }
.dz-brilho::after {
  content: ""; position: absolute; inset: 0 auto 0 0; width: 40%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent);
  animation: dz-brilho 3.2s ease-in-out 1.4s infinite;
}
.dz-chip { background: rgba(20,15,8,0.72); border: 1px solid #3a2c18; color: #d9c8a2; transition: all .25s ease; }
.dz-chip[data-aceso] { background: #e8b04b; border-color: #ffd889; color: #1a1206; transform: translateY(-1px) scale(1.06); box-shadow: 0 0 14px rgba(255,216,137,.55); }
.dz-chip[data-aceso] svg { color: #1a1206 !important; }
.dz-cartao { background: rgba(28,21,9,0.78); border: 2px solid #3a2c18; transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease; }
.dz-cartao[data-aceso] { border-color: #e8b04b; box-shadow: 0 0 0 1px #0b0805, 0 0 22px rgba(232,176,75,.35); transform: translateY(-2px); }
.dz-tecla { display: inline-block; min-width: 20px; padding: 1px 6px; border-radius: 5px; border: 1px solid #3a2c18; border-bottom-width: 3px; background: #20180d; color: #ece0c6; font-size: 10.5px; font-weight: 800; text-align: center; }
@media (prefers-reduced-motion: reduce) { .dz-brilho::after, .dz-cadente { animation: none; display: none; } .dz-chip, .dz-cartao { transition: none; } }
`;
