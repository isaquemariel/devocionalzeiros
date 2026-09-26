import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpen, Moon, Scroll, Sun, Sunrise, Sunset, Sword, Trophy, Brain } from "lucide-react";
import { Devocionalzeiro } from "@/components/devocionalzeiro/Devocionalzeiro";
import { Balao } from "@/components/jornada/Balao";
import { ALTURA, CenaDoDia, ESTILO_CENA, ESTRADA } from "./CenaDoDia";
import { useMomentoDoDia } from "./useMomentoDoDia";
import { FALAS_DO_CEU, NOME_DA_FASE, SAUDACAO, VERSOS, VIRADA, type Fase, type Momento } from "@/lib/ceu";
import type { Expressao, Gesto } from "@/lib/jornada/tipos";
import logoOfficial from "@/assets/logo-icon.png";

/**
 * A TELA INICIAL — a porta do app, já dentro do mundo do RPG Bíblico.
 *
 * Jerusalém na luz da hora de quem abre (`CenaDoDia` + `useMomentoDoDia`): de
 * manhã, o sol nascendo e as aves; de noite, a lua na fase de hoje, as
 * janelas e as tochas acesas, vaga-lumes e estrelas cadentes. O
 * Devocionalzeiro chega andando pela estrada, para no meio, acena e conversa:
 * a saudação da hora, os versículos da hora (ARC), e dicas do app. Ele segue
 * o dedo com os olhos, reage ao toque, cochila de madrugada, se espreguiça de
 * manhã e olha as estrelas à noite. O sol e a lua se tocam (ele fala deles).
 *
 * Os dois botões são os de sempre — "Começar Jornada" e "Já tenho uma conta"
 * — com a roupa do RPG: o console de pergaminho e ouro.
 */

interface Props {
  onSignup: () => void;
  onLogin: () => void;
}

type Fala = { texto: string; detalhe?: string; gesto?: Gesto; expressao?: Expressao };

const CUTUCOES: Fala[] = [
  { texto: "Ei! Isso faz cócegas!", gesto: "pirueta", expressao: "radiante" },
  { texto: "Essa chama na minha cabeça cresce a cada passo na Palavra.", gesto: "apontar", expressao: "orgulhoso" },
  { texto: "Bora? Toca em Começar Jornada que eu vou junto.", gesto: "acenar", expressao: "feliz" },
  { texto: "Hehe. Tô pronto! E você?", gesto: "vitoria", expressao: "radiante" },
];

/** o ícone do relógio acompanha o céu: aurora, sol alto, poente, lua */
function iconeDaHora(h: number): typeof Sun {
  if (h >= 5 && h < 7.5) return Sunrise;
  if (h >= 7.5 && h < 17) return Sun;
  if (h >= 17 && h < 19.4) return Sunset;
  return Moon;
}

const RECURSOS = [
  { Icone: Scroll, nome: "Devocional" },
  { Icone: BookOpen, nome: "Leitura" },
  { Icone: Sword, nome: "RPG" },
  { Icone: Brain, nome: "Quiz" },
  { Icone: Trophy, nome: "Conquistas" },
];

const sorteio = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];
const limitar = (v: number) => Math.max(-1, Math.min(1, v));
const doisDigitos = (n: number) => String(n).padStart(2, "0");

/** o que ele vai dizendo, em volta, enquanto a pessoa decide */
function montarRoteiro(m: Momento): Fala[] {
  const versos = VERSOS[m.fase].map<Fala>((v) => ({ texto: `“${v.texto}”`, detalhe: v.ref, gesto: "parado", expressao: "feliz" }));
  const ceu = m.lua.visivel ? "na lua" : m.sol.visivel ? "no sol" : "no céu";
  const dicas: Fala[] = [
    { texto: "Em Começar Jornada eu te faço umas perguntas rápidas e monto o seu caminho na Palavra.", gesto: "apontar", expressao: "feliz" },
    { texto: `Pode tocar em mim ou ${ceu} — eu reajo!`, gesto: "acenar", expressao: "radiante" },
    { texto: "Tem devocional, leitura da Bíblia, quiz e um RPG bíblico inteiro te esperando.", gesto: "pirueta", expressao: "radiante" },
  ];
  const r: Fala[] = [{ texto: sorteio(SAUDACAO[m.fase]), gesto: "acenar", expressao: "feliz" }];
  const n = Math.max(versos.length, dicas.length);
  for (let i = 0; i < n; i++) {
    if (versos[i]) r.push(versos[i]);
    if (dicas[i]) r.push(dicas[i]);
  }
  return r;
}

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

  // ─── medidas: a cena tem 800 de altura, inteira na tela ────────────────────
  const s = tela.h / ALTURA;
  const L = Math.max(400, Math.round(ALTURA * (tela.w / tela.h)));
  const naTela = (u: number, v: number) => ({ x: tela.w / 2 + (u - L / 2) * s, y: v * s });
  const tamanho = Math.round(Math.min(176, Math.max(104, tela.h * 0.2)));
  const altBoneco = (tamanho * 229) / 205;
  const pes = (ESTRADA + 20) * s;
  const topoBoneco = pes - altBoneco * (220 / 229);
  const chama = 0.55;
  const sobre = Math.round(altBoneco * (0.26 - chama * 0.16));
  const cabeca = { x: tela.w / 2, y: topoBoneco + altBoneco * 0.42 };

  // ─── a conversa ───────────────────────────────────────────────────────────
  const [chegou, setChegou] = useState(reduzir);
  const [fala, setFala] = useState<(Fala & { chave: number }) | null>(null);
  const [gesto, setGesto] = useState<Gesto>(reduzir ? "parado" : "andar");
  const [expressao, setExpressao] = useState<Expressao>("feliz");
  const [olharOcioso, setOlharOcioso] = useState<{ x: number; y: number } | null>(null);
  const [falando, setFalando] = useState(false);
  const [pulso, setPulso] = useState(0);
  const timers = useRef<number[]>([]);
  const passo = useRef(0);
  const vezOcioso = useRef(0);
  const vezCutucao = useRef(0);
  const saindo = useRef(false);
  const roteiro = useMemo(() => montarRoteiro(m), [m.fase]); // eslint-disable-line react-hooks/exhaustive-deps
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
    passo.current = (passo.current + 1) % r.length;
    // a saudação é só da chegada: na volta do ciclo, ela fica de fora
    if (passo.current === 0) passo.current = 1 % r.length;
    dizer(r[passo.current]);
  }, [dizer]);

  // terminou de falar: um tempo para ler, a pausa com o gesto da hora, e a próxima
  const terminou = useCallback(() => {
    const texto = fala?.texto ?? "";
    const leitura = Math.min(7000, 2400 + texto.length * 38);
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
      depois(proxima, 6200);
    }, leitura);
  }, [depois, fala?.texto, proxima]);

  // chegou andando pela estrada → acena e cumprimenta
  useEffect(() => {
    if (reduzir) { setChegou(true); return; }
    const t = window.setTimeout(() => setChegou(true), 2300);
    return () => window.clearTimeout(t);
  }, [reduzir]);
  useEffect(() => {
    if (!chegou) return;
    passo.current = 0;
    const t = window.setTimeout(() => dizer(vivo.current.roteiro[0]), reduzir ? 200 : 350);
    return () => window.clearTimeout(t);
  }, [chegou, dizer, reduzir]);

  // a hora VIROU com a tela aberta: ele comenta
  const faseAntes = useRef(m.fase);
  useEffect(() => {
    if (faseAntes.current === m.fase) return;
    faseAntes.current = m.fase;
    passo.current = 0;
    if (chegou && !saindo.current) dizer({ texto: VIRADA[m.fase], gesto: "apontar", expressao: "surpreso" });
  }, [m.fase, chegou, dizer]);

  const cutucar = () => {
    if (saindo.current) return;
    setPulso((p) => p + 1);
    if (expressao === "dormindo") {
      dizer({ texto: "Opa! Cochilei... mas tô aqui!", gesto: "cocar", expressao: "surpreso" });
      return;
    }
    dizer(CUTUCOES[vezCutucao.current++ % CUTUCOES.length]);
  };

  const tocarCeu = (qual: "sol" | "lua") => {
    if (saindo.current || !chegou) return;
    setPulso((p) => p + 1);
    const f = qual === "sol" ? FALAS_DO_CEU.sol : FALAS_DO_CEU.lua(m.lua.fase);
    dizer({ ...f, gesto: "apontar", expressao: "radiante" });
    const alvo = qual === "sol" ? astroSol : astroLua;
    depois(() => setOlharOcioso({ x: limitar((alvo.x - cabeca.x) / (tela.w * 0.35)), y: -1 }), 30);
  };

  const sair = (fala: Fala, ir: () => void, ms: number) => {
    if (saindo.current) return;
    saindo.current = true;
    if (reduzir) { ir(); return; }
    dizer(fala);
    setPulso((p) => p + 1);
    depois(ir, ms);
  };

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

  const aoMover = (e: React.PointerEvent) => {
    const r = raiz.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (!reduzir) {
      alvoParalaxe.current = { x: limitar((x / r.width - 0.5) * 2), y: limitar((y / r.height - 0.5) * 2) };
      animarParalaxe();
    }
    const novo = { x: limitar((x - cabeca.x) / (r.width * 0.35)), y: limitar((y - cabeca.y) / (r.height * 0.35)) };
    setOlharPonteiro((o) => (o && Math.abs(o.x - novo.x) + Math.abs(o.y - novo.y) < 0.06 ? o : novo));
    window.clearTimeout(soltarOlhar.current);
    soltarOlhar.current = window.setTimeout(() => setOlharPonteiro(null), e.pointerType === "mouse" ? 4000 : 1800);
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
        const x = tela.w * (0.35 + Math.random() * 0.6), y = tela.h * (0.06 + Math.random() * 0.2);
        setCadentes((c) => [...c, { id, x, y }]);
        window.setTimeout(() => setCadentes((c) => c.filter((k) => k.id !== id)), 1900);
        // a primeira que passa com ele calado, ele comenta
        if (!viuCadente.current && !falaAtual.current && !saindo.current) {
          viuCadente.current = true;
          setOlharOcioso({ x: limitar((x - 130 - tela.w / 2) / (tela.w * 0.35)), y: -1 });
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

  // ─── o sol e a lua, tocáveis ──────────────────────────────────────────────
  const astroSol = naTela(m.sol.x * L, 470 - m.sol.altura * 360);
  const astroLua = naTela(m.lua.x * L, 470 - m.lua.altura * 330);
  const IconeFase = iconeDaHora(m.hora);
  const hora = `${doisDigitos(Math.floor(m.hora))}:${doisDigitos(Math.floor((m.hora % 1) * 60))}`;

  const olhar = olharPonteiro ?? olharOcioso;
  const baixa = tela.h < 700;
  const larguraBalao = Math.min(330, tela.w - 32);

  return (
    <div
      ref={raiz}
      className="rpg-root relative h-[100dvh] w-full select-none overflow-hidden"
      style={{ background: m.ceu.topo }}
      onPointerMove={aoMover}
      onPointerDown={aoMover}
    >
      <style>{ESTILO_CENA + ESTILO_TELA}</style>

      <CenaDoDia momento={m} proporcao={tela.w / tela.h} reduzir={reduzir} />

      {/* estrelas cadentes */}
      {cadentes.map((c) => (
        <div key={c.id} className="pointer-events-none absolute" style={{ left: c.x, top: c.y }}>
          <div className="dz-cadente">
            <div style={{ width: 120, height: 2, borderRadius: 2, transform: "rotate(153.4deg)", transformOrigin: "100% 50%", background: "linear-gradient(90deg, transparent, #fffbe8)", boxShadow: "0 0 6px #fff6c8" }} />
          </div>
        </div>
      ))}

      {/* o sol e a lua se tocam */}
      {chegou && m.sol.visivel && m.sol.altura > 0.04 && (
        <button type="button" aria-label="O sol" onClick={() => tocarCeu("sol")}
          className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffd889]"
          style={{ left: astroSol.x, top: astroSol.y }} />
      )}
      {chegou && m.lua.visivel && m.lua.altura > 0.04 && (
        <button type="button" aria-label="A lua" onClick={() => tocarCeu("lua")}
          className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffd889]"
          style={{ left: astroLua.x, top: astroLua.y }} />
      )}

      {/* as sombras que dão leitura ao título e ao console, em qualquer hora */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42%]" style={{ background: "linear-gradient(180deg, rgba(6,8,16,0.66) 0%, rgba(6,8,16,0.32) 45%, rgba(6,8,16,0) 100%)" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%]" style={{ background: "linear-gradient(0deg, rgba(6,8,14,0.9) 0%, rgba(6,8,14,0.55) 45%, rgba(6,8,14,0) 100%)" }} />
      <div className="rpg-vig pointer-events-none absolute inset-0" />

      {/* ── o título ── */}
      <motion.header
        className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center px-5 text-center"
        style={{ paddingTop: `max(${baixa ? 12 : 22}px, env(safe-area-inset-top))` }}
        initial={reduzir ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* o relógio da cena: a hora e a fase do dia de quem abriu */}
        <div className="dz-relogio mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{ background: "rgba(12,10,6,0.55)", border: "1px solid rgba(232,176,75,0.45)", color: "#ffd889" }}
          title="A cena acompanha o relógio do seu aparelho">
          <IconeFase className="h-3 w-3" aria-hidden="true" />
          <span>{NOME_DA_FASE[m.fase]}</span>
          <span style={{ color: "#b8a67f" }}>· {hora}</span>
        </div>

        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6" style={{ background: "linear-gradient(90deg, transparent, #e8b04b)" }} />
          <p className="rpg-eyebrow" style={{ color: "#ffd889", textShadow: "0 1px 0 #0b0805" }}>Seja bem-vindo(a) à</p>
          <span className="h-px w-6" style={{ background: "linear-gradient(90deg, #e8b04b, transparent)" }} />
        </div>

        <h1 className="rpg-title flex items-center gap-2 leading-none" style={{ fontSize: baixa ? "clamp(24px, 7vw, 40px)" : "clamp(26px, 7.6vw, 56px)" }}>
          <img src={logoOfficial} alt="" aria-hidden="true" className="shrink-0 drop-shadow-[2px_2px_0_#0b0805]" style={{ width: "1em", height: "1em" }} />
          <span className="dz-titulo">Devocionalzeiros</span>
        </h1>

        <p className="mt-2.5 max-w-[300px] text-[12.5px] font-semibold leading-snug sm:max-w-none sm:text-[14px]" style={{ color: "#ece0c6", textShadow: "0 1px 2px #000" }}>
          O lugar para todo cristão que <span style={{ color: "#ffd889" }}>ama a Palavra de Deus!</span>
        </p>

        {!baixa && (
          <ul className="mt-3 flex max-w-[360px] flex-wrap justify-center gap-1.5" aria-label="O que tem no app">
            {RECURSOS.map(({ Icone, nome }) => (
              <li key={nome} className="inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[9.5px] font-bold uppercase tracking-[0.1em]"
                style={{ background: "rgba(20,15,8,0.72)", border: "1px solid #3a2c18", color: "#d9c8a2" }}>
                <Icone className="h-2.5 w-2.5" style={{ color: "#e8b04b" }} aria-hidden="true" />
                {nome}
              </li>
            ))}
          </ul>
        )}
      </motion.header>

      {/* ── ele, na estrada ── */}
      <div
        className="absolute"
        style={{
          left: "50%", top: topoBoneco, width: tamanho, height: altBoneco, marginLeft: -tamanho / 2,
          transform: reduzir ? undefined : `translate(calc(var(--dz-px, 0) * ${(-32 * s).toFixed(1)}px), calc(var(--dz-py, 0) * ${(-10 * s).toFixed(1)}px))`,
        }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduzir ? false : { x: -(tela.w / 2 + tamanho) }}
          animate={{ x: 0 }}
          transition={{ duration: 2.3, ease: [0.3, 0.2, 0.35, 1] }}
          onAnimationComplete={() => setGesto((g) => (g === "andar" ? "parado" : g))}
        >
          {/* o balão sai da cabeça dele */}
          <div className="absolute left-1/2 z-10 -translate-x-1/2" style={{ bottom: altBoneco - sobre + 15, width: larguraBalao }}>
            <AnimatePresence mode="wait">
              {fala && (
                <motion.div
                  key={fala.chave}
                  initial={reduzir ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.14 } }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  style={{ transformOrigin: "50% 100%" }}
                >
                  <Balao
                    texto={fala.texto}
                    detalhe={fala.detalhe}
                    rabicho="centro"
                    onFalando={setFalando}
                    onTerminou={terminou}
                    onAvancar={() => !saindo.current && proxima()}
                    mais={!saindo.current}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* a luz azul da chama no chão de pedra, que a noite deixa ver */}
          <div className="pointer-events-none absolute left-1/2 top-[30%] h-[140%] w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, #5b9bff55 0%, #5b9bff00 60%)", opacity: 0.25 + (1 - m.luz) * 0.6 }} />

          <button type="button" aria-label="Tocar no Devocionalzeiro" onClick={cutucar}
            className="relative block rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd889]">
            <Devocionalzeiro
              tamanho={tamanho} gesto={gesto} expressao={expressao} chama={chama}
              falando={falando} pulso={pulso} olhar={olhar}
            />
          </button>

          {/* a poeira da estrada, quando ele para */}
          {!reduzir && chegou && (
            <div className="pointer-events-none absolute inset-x-0" style={{ top: altBoneco * 0.93 }}>
              {[-1, 1].map((l) => (
                <motion.span key={l} className="absolute left-1/2 block rounded-full"
                  style={{ width: 16, height: 8, marginLeft: -8, background: "rgba(222,200,160,0.55)" }}
                  initial={{ x: 0, opacity: 0.8, scale: 0.6 }}
                  animate={{ x: l * tamanho * 0.42, opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.7, ease: "easeOut" }} />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* ── o console: os caminhos ── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 px-4"
        style={{ paddingBottom: `max(${baixa ? 12 : 20}px, env(safe-area-inset-bottom))` }}
        initial={reduzir ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduzir ? 0 : 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`rpg-consoleframe mx-auto w-full max-w-[400px] px-4 ${baixa ? "pb-3 pt-4" : "pb-4 pt-5"}`}>
          <span className="rpg-consolelabel">▶ SUA JORNADA COMEÇA AQUI</span>

          <button
            type="button"
            className="rpg-btn dz-brilho relative w-full overflow-hidden py-3.5 text-[13px] uppercase tracking-[0.16em]"
            onClick={() => sair({ texto: "Bora! Te encontro lá dentro.", gesto: "comemorar", expressao: "radiante" }, onSignup, 520)}
          >
            <span className="relative z-10">▶ Começar Jornada</span>
          </button>
          <button
            type="button"
            className="rpg-btn-ghost mt-2.5 w-full py-3 text-[12px] uppercase tracking-[0.16em] transition-colors hover:text-[#ece0c6]"
            onClick={() => sair({ texto: "Que bom te ver de volta!", gesto: "acenar", expressao: "feliz" }, onLogin, 450)}
          >
            Já tenho uma conta
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const ESTILO_TELA = `
.dz-cadente { animation: dz-cadente 1.8s ease-out forwards; }
.dz-titulo {
  background: linear-gradient(180deg, #fff6d8 0%, #ffd889 38%, #e8b04b 70%, #b9822c 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(2px 2px 0 #0b0805) drop-shadow(0 0 18px rgba(0,0,0,.45));
}
@keyframes dz-brilho { 0% { transform: translateX(-120%) skewX(-18deg) } 60%,100% { transform: translateX(260%) skewX(-18deg) } }
.dz-brilho::after {
  content: ""; position: absolute; inset: 0 auto 0 0; width: 40%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent);
  animation: dz-brilho 3.2s ease-in-out 1.4s infinite;
}
@media (prefers-reduced-motion: reduce) { .dz-brilho::after, .dz-cadente { animation: none; display: none; } }
`;
