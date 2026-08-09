import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_LOOK, type MascotLook } from "@/lib/rpgMascot";
import {
  stagedAt, envAt, balloonText, makeDrawState, SET_W,
  depthToFeetY, depthScale,
  type StageScript, type StageDims,
} from "@/lib/rpgStage";
import { drawBackdropHD, drawPropHD, drawHumanHD, drawHeroHD, heroMountLift } from "@/lib/rpgStageHD";
import { BEING_ROLES, drawBeingHD } from "@/lib/rpgStageBeings";
import RPGNameTag from "@/components/rpg/RPGNameTag";

// altura visual (px) de cada objeto de cena — ancora o badge "?" no objeto REAL
const PROP_H: Record<string, number> = {
  palm: 56, rock: 19, lampstand: 60, church: 82, tower: 73, tree: 59, star: 60, door: 50,
  well: 42, stall: 43, amphora: 22, crate: 15, bush: 17, grass: 9,
  altar: 30, tent: 32, boat: 36, campfire: 17, scroll: 21, river: 14,
  throne: 66, trumpet: 26, bowl: 16, censer: 30, ark: 34,
  arkship: 88, ladder: 84, rainbow: 70, sheaf: 18, ziggurat: 92,
  // Éden (Gn 2–3)
  treeOfLife: 78, treeOfKnowledge: 70, edenRiver: 26, riverFork: 20, flamingSword: 44, cherub: 56,
  // corpos do CÉU (sky:true) — altura visual usada só p/ ancorar o badge
  sun: 54, moon: 34, starfield: 40, birds: 30, clouds: 40, firmament: 60,
};

/** y (px) de um objeto do CÉU: `dy` é ALTURA (0 = horizonte, 1 = zênite). */
const skyPropY = (dy: number, ground: number): number =>
  Math.round((1 - Math.max(0, Math.min(1, dy))) * ground);
import { setAmbience, initAudio } from "@/lib/rpgAudio";
import { speakBeat, cancelVoice, primeVoice, isVoiceSupported, setVoiceEnabled } from "@/lib/rpgVoice";
import { actorInfo, namedActorInfo, propBadgeInfo, type StageInfo } from "@/lib/rpgStageInfo";
import { useLandscape } from "./LandscapeShell";
import { RPGJoystick, JOY_RADIUS } from "@/components/rpg/RPGJoystick";

// ============================================================================
// RPGStageScene HD — CENA VIVA contida na tela (como as salas): tudo acontece
// dentro do enquadramento — elenco, balões e a porta do desafio. O jogador
// anda livre em 4 direções (fração da cena + profundidade). Arte VETORIAL
// moderna em canvas de alta resolução (pós pixel-art).
// ============================================================================

interface Props {
  bookName: string;
  bookId?: string;
  chapter: number;
  verses: { number: number; text: string }[];
  script: StageScript;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  look?: Partial<MascotLook>;
  onFinish: () => void;
  onClose?: () => void;
  characterName?: string | null;
  level?: number;
  isAdmin?: boolean;
  /** presença multiplayer: outros leitores aparecem na MESMA cena (a leitura,
   *  o desafio e o avanço continuam 100% individuais) */
  userId?: string;
}

const CAM_H = 256;
const WALK_FX = 0.00024;   // fração da cena / ms
const WALK_DY = 0.0024;    // profundidade / ms
const NPC_WALK = 0.00013;
const DOOR_FX = 0.9;       // porta do desafio: fração da cena
const DOOR_DY = 0.3;
const HERO_H = 54;         // altura visual do herói HD (para a tag)
// herói no PADRÃO DE TAMANHO DOS NPCS (pensando no multiplayer) — a montaria
// e todos os acessórios escalam junto, proporcionais a ele
const HERO_SCALE = 0.85;
const ACTOR_H = 46;        // altura visual dos humanos HD (para balões)

const SPEAKER_NAME: Record<string, string> = {
  cristo: "Jesus", anjo: "Anjo", joao: "João", anciao: "Ancião", hero: "Você",
  // "deus" = a VOZ do Criador. Nunca desenhado; fala em balão de VOZ DO CÉU
  // (voice: true), pois nunca está no elenco (cast) da cena.
  deus: "Deus",
  // patriarcas / AT (nomes exibidos no balão quando falam)
  adao: "Adão", eva: "Eva", serpente: "Serpente", noe: "Noé", abraao: "Abraão",
  sara: "Sara", isaque: "Isaque", rebeca: "Rebeca", jaco: "Jacó", esau: "Esaú",
  jose: "José", farao: "Faraó", rei: "Rei", pastor: "Pastor", servo: "Servo",
  patriarca: "Patriarca", homem: "Homem", mulherComum: "Mulher",
  melquisedeque: "Melquisedeque",
};

// estado vivo de um ator (posições em FRAÇÃO da cena)
interface LiveActor {
  fx: number; dy: number; alpha: number;
  tfx: number; tdy: number;
  id?: string;
  role: string; pose?: string; facing?: 1 | -1; scale?: number; palette?: string; glow?: number;
  leaving?: boolean;
}

export const RPGStageScene = ({ bookName, bookId, chapter, verses, script, isLoading, error, onRetry, look, onFinish, onClose, characterName, level, isAdmin, userId }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Os ESTÁGIOS são INDIVIDUAIS: cada leitor vive a cena no seu ritmo, sozinho.
  // Presença/multiplayer é EXCLUSIVO das salas (RPGWorldRoom) — a cena viva não
  // tem outros jogadores, por decisão de produto.

  // A cena viva já vive dentro do LandscapeShell do modal (tela cheia paisagem
  // automática). Aqui só consumimos o conversor de ponteiro correto sob rotação.
  const { rotated, toLocal } = useLandscape();

  // ---------- estado do jogo ----------
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0); idxRef.current = idx;
  const beat = script.beats[idx];
  const done = idx >= script.beats.length - 1;

  const playerRef = useRef({ fx: 0.32, dy: 0.62, tfx: null as number | null, tdy: null as number | null, keys: { l: false, r: false, u: false, d: false }, face: 1 as 1 | -1, moving: false });
  const dimsRef = useRef<StageDims>({ W: 360, H: CAM_H, GROUND: Math.round(CAM_H * 0.44), BOT: CAM_H - 26 });
  const pxScaleRef = useRef(1);
  const drawStateRef = useRef(makeDrawState(script));
  const [cssSize, setCssSize] = useState({ w: 0, h: 0 });
  const cssSizeRef = useRef(cssSize); cssSizeRef.current = cssSize;
  // retângulo REAL do canvas dentro do palco (encaixe exato, sem distorção)
  const [canvasRect, setCanvasRect] = useState({ ox: 0, oy: 0, dw: 0, dh: 0 });
  const canvasRectRef = useRef(canvasRect); canvasRectRef.current = canvasRect;
  const [compact, setCompact] = useState(false);

  // elenco vivo (tween) + fade de troca de set
  const liveRef = useRef<Map<string, LiveActor>>(new Map());
  const setKeyRef = useRef<string>("");
  const fadeRef = useRef(0);

  const staged = useMemo(() => stagedAt(script, idx), [script, idx]);
  useEffect(() => {
    drawStateRef.current.envTarget = envAt(script, idx);
    const live = liveRef.current;
    const changedSet = setKeyRef.current !== "" && staged.setKey !== setKeyRef.current;
    if (changedSet) { fadeRef.current = 1; live.clear(); }
    setKeyRef.current = staged.setKey;

    // MULTIPLAYER-READY: a troca de cena NUNCA move o jogador — só a paisagem,
    // objetos e personagens mudam ao redor (posições em fração: tudo cabe na tela).
    const seen = new Set<string>();
    for (const c of staged.cast) {
      const key = c.id ?? c.role;
      seen.add(key);
      const fx = Math.max(0.05, Math.min(0.95, c.x / SET_W));
      const cur = live.get(key);
      if (!cur) {
        live.set(key, { fx, dy: c.feetDy, alpha: changedSet ? 0 : 0.01, tfx: fx, tdy: c.feetDy, id: c.id, role: c.role, pose: c.pose, facing: c.facing, scale: c.scale, palette: c.palette, glow: c.glow });
      } else {
        cur.tfx = fx; cur.tdy = c.feetDy; cur.pose = c.pose; cur.facing = c.facing;
        cur.scale = c.scale; cur.palette = c.palette; cur.glow = c.glow; cur.leaving = false;
      }
    }
    for (const [key, a] of live) if (!seen.has(key)) a.leaving = true;
  }, [script, idx, staged]);

  // versículo do beat atual
  const verse = useMemo(() => {
    if (!verses.length || !beat) return null;
    return verses.find((v) => v.number === beat.v) ?? verses[Math.min(idx, verses.length - 1)];
  }, [verses, beat, idx]);

  // ---------- typewriter (fala no balão; narração na barra) ----------
  const quote = useMemo(() => (beat?.by && verse ? balloonText(verse.text, beat.q) : null), [beat, verse]);
  const [shown, setShown] = useState("");
  const fullText = quote ?? verse?.text ?? "";
  const typeDone = shown.length >= fullText.length;
  useEffect(() => {
    setShown("");
    if (!fullText) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(fullText); return; }
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setShown(fullText.slice(0, i));
      if (i >= fullText.length) window.clearInterval(id);
    }, 22);
    return () => window.clearInterval(id);
  }, [fullText]);

  // mantém o final do texto visível enquanto digita, se o balão precisar rolar
  useEffect(() => {
    const el = balloonScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown]);

  // ---------- voz + ambiente ----------
  useEffect(() => {
    if (!beat || !verse) return;
    if (beat.by) {
      const q2 = balloonText(verse.text, beat.q);
      // Deus e Cristo falam com a VOZ principal (grave, do céu); os demais,
      // com a voz secundária.
      if (beat.by === "cristo" || beat.by === "deus") speakBeat(q2, undefined);
      else speakBeat(undefined, q2);
    } else {
      speakBeat(undefined, verse.text);
    }
  }, [idx, beat, verse]);
  useEffect(() => {
    const e = envAt(script, idx);
    // SOM DA CENA: acompanha o que está NA TELA, não só o terreno. A água que
    // o texto criou (env.water) vira rumor de mar; o abismo de Gn 1 tem a voz
    // grave das águas profundas; cada terreno tem o seu vento (brisa do
    // jardim, vento seco do deserto, ventania da montanha).
    const WIND: Record<string, number> = {
      abyss: 0.14, garden: 0.16, desert: 0.42, mountain: 0.5,
      patmos: 0.35, field: 0.24, city: 0.16, glory: 0.2, throne: 0.12,
    };
    const seaFromWater = Math.min(1, e.water * 0.9);
    setAmbience({
      sea: Math.max(
        e.terrain === "abyss" ? 0.7 : e.terrain === "patmos" ? 0.55 : 0,
        seaFromWater,
      ),
      wind: WIND[e.terrain] ?? 0.2,
      storm: e.storm, fire: e.fire, rain: 0,
      night: e.night, glory: e.glory,
    });
  }, [script, idx]);
  useEffect(() => () => cancelVoice(), []);
  const audioPrimedRef = useRef(false);
  const primeSceneAudio = () => {
    if (audioPrimedRef.current) return;
    audioPrimedRef.current = true;
    // 1º gesto do usuário no palco: destrava o áudio no mobile e garante que a
    // narração esteja habilitada conforme a preferência salva (sem isto, quem
    // entra direto na cena ficava sem voz).
    try { initAudio(); } catch { /* ok */ }
    try {
      const voiceOn = isVoiceSupported() && localStorage.getItem("rpg_voice") !== "off";
      setVoiceEnabled(voiceOn);
      if (voiceOn) {
        primeVoice();
        // re-narra o versículo ATUAL — o primeiro beat pode ter "falado" antes
        // de a voz estar liberada, ficando mudo.
        if (beat && verse) {
          const q2 = balloonText(verse.text, beat.q);
          if (beat.by === "cristo" || beat.by === "deus") speakBeat(q2, undefined);
          else if (beat.by) speakBeat(undefined, q2);
          else speakBeat(undefined, verse.text);
        }
      }
    } catch { /* ok */ }
  };

  // ---------- avanço / voltar ----------
  const advance = useCallback(() => {
    if (!typeDone) { setShown(fullText); return; }
    if (done) return;
    setIdx((i) => Math.min(i + 1, script.beats.length - 1));
  }, [typeDone, fullText, done, script.beats.length]);

  // fim do capítulo: conduz o herói até a porta (única exceção de posição)
  const finishedRef = useRef(false);
  useEffect(() => {
    if (done && typeDone && !finishedRef.current) {
      const p = playerRef.current;
      p.tfx = DOOR_FX; p.tdy = DOOR_DY;
    }
  }, [done, typeDone]);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const p = playerRef.current;
      if (k === "arrowright" || k === "d") { p.keys.r = true; p.tfx = null; p.tdy = null; e.preventDefault(); }
      else if (k === "arrowleft" || k === "a") { p.keys.l = true; p.tfx = null; p.tdy = null; e.preventDefault(); }
      else if (k === "arrowup" || k === "w") { p.keys.u = true; p.tfx = null; p.tdy = null; e.preventDefault(); }
      else if (k === "arrowdown" || k === "s") { p.keys.d = true; p.tfx = null; p.tdy = null; e.preventDefault(); }
      else if (k === " " || k === "enter") { advance(); e.preventDefault(); }
    };
    const ku = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const p = playerRef.current;
      if (k === "arrowright" || k === "d") p.keys.r = false;
      else if (k === "arrowleft" || k === "a") p.keys.l = false;
      else if (k === "arrowup" || k === "w") p.keys.u = false;
      else if (k === "arrowdown" || k === "s") p.keys.d = false;
    };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  }, [advance]);

  // ---------- fichas + toque no chão ----------
  const [info, setInfo] = useState<StageInfo | null>(null);
  const qSpotsRef = useRef<{ fx: number; y: number; info: StageInfo }[]>([]);

  // ---------- estudo do versículo (✏️) ----------
  const [study, setStudy] = useState<{ open: boolean; loading: boolean; text?: string; words?: { term: string; meaning: string }[]; blocked?: boolean }>({ open: false, loading: false });
  const openStudy = useCallback(async () => {
    if (!verse) return;
    setStudy({ open: true, loading: true });
    try {
      const { data, error: fnError } = await supabase.functions.invoke("verse-study", {
        body: {
          bookId: bookId ?? "revelation",
          bookName, chapter,
          verseNumber: verse.number,
          verseText: verse.text,
          testament: "new",
          featureKey: "rpg_verse_explanation",
        },
      });
      if (fnError) throw fnError;
      setStudy({
        open: true, loading: false,
        text: (data?.commentary as string) || "Não foi possível carregar a explicação.",
        words: (data?.keyWords as { term: string; meaning: string }[] | undefined)?.slice(0, 4),
      });
    } catch (err) {
      let status: number | undefined;
      try { status = (err as { context?: Response })?.context?.status; } catch { /* ok */ }
      if (status === 402) setStudy({ open: true, loading: false, blocked: true });
      else setStudy({ open: true, loading: false, text: "Não foi possível carregar a explicação. Tente novamente." });
    }
  }, [verse, bookId, bookName, chapter]);

  const toWorld = (e: React.PointerEvent) => {
    const el = wrapRef.current!;
    const pt = toLocal(e.clientX, e.clientY, el);
    const dims = dimsRef.current;
    const cr = canvasRectRef.current;
    const scaleX = cr.dw / dims.W || 1;
    const scaleY = cr.dh / dims.H || 1;
    const fx = ((pt.x - cr.ox) / scaleX) / dims.W;
    const py = (pt.y - cr.oy) / scaleY;
    const bandTop = dims.GROUND + 8, bandBot = dims.BOT ?? (dims.H - 18);
    const wdy = (py - bandTop) / Math.max(1, bandBot - bandTop);
    return { fx, wdy, py };
  };
  const hitQSpot = (fx: number, py: number): StageInfo | null => {
    const dims = dimsRef.current;
    // Alvo generoso para o dedo (mobile): pega o badge "?" MAIS PRÓXIMO dentro
    // de um raio confortável, em vez de exigir acerto de pixel — era por isso
    // que "clicar na interrogação e nada aparecer" acontecia (aves/animais).
    const R = 22;
    let best: StageInfo | null = null, bestD = Infinity;
    for (const q of qSpotsRef.current) {
      const ddx = (q.fx - fx) * dims.W, ddy = q.y - py;
      const d = Math.hypot(ddx, ddy);
      if (d < R && d < bestD) { bestD = d; best = q.info; }
    }
    return best;
  };
  const walkToWorld = (fx: number, wdy: number) => {
    const p = playerRef.current;
    p.tfx = Math.max(0.04, Math.min(0.96, fx));
    p.tdy = Math.max(0, Math.min(1, wdy));
  };
  // ---------- joystick flutuante (segure e arraste em QUALQUER lugar) ----------
  // Toque curto (tap) continua andando até o ponto / abrindo a ficha "?".
  // Segurar e ARRASTAR cria um joystick no ponto do toque (estilo jogo de
  // celular): o vetor do arrasto vira velocidade contínua do personagem.
  const TAP_PX = 12; // deslocamento máximo p/ ainda contar como tap
  const [joy, setJoy] = useState<{ x: number; y: number; kx: number; ky: number } | null>(null);
  const joyRef = useRef<{ id: number; sx: number; sy: number; active: boolean; ax: number; ay: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    primeSceneAudio();
    const el = wrapRef.current!;
    try { el.setPointerCapture(e.pointerId); } catch { /* ok */ }
    const pt = toLocal(e.clientX, e.clientY, el);
    joyRef.current = { id: e.pointerId, sx: pt.x, sy: pt.y, active: false, ax: 0, ay: 0 };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const j = joyRef.current;
    if (!j || e.pointerId !== j.id) return;
    const pt = toLocal(e.clientX, e.clientY, wrapRef.current!);
    const dx = pt.x - j.sx, dy = pt.y - j.sy;
    const dist = Math.hypot(dx, dy);
    if (!j.active && dist > TAP_PX) {
      j.active = true;
      const p = playerRef.current; p.tfx = null; p.tdy = null; // cancela walk-to
    }
    if (j.active) {
      const cl = Math.min(dist, JOY_RADIUS) / (dist || 1);
      const kx = dx * cl, ky = dy * cl;
      j.ax = kx / JOY_RADIUS; j.ay = ky / JOY_RADIUS;
      setJoy({ x: j.sx, y: j.sy, kx, ky });
    }
  };
  const onPointerUp = (e?: React.PointerEvent) => {
    const j = joyRef.current;
    if (!j) return;
    if (e && e.pointerId !== j.id) return;
    if (!j.active && e) {
      // tap: comportamento clássico — ficha "?" ou andar até o ponto
      const { fx, wdy, py } = toWorld(e);
      const inf = hitQSpot(fx, py);
      if (inf) setInfo(inf); else walkToWorld(fx, wdy);
    }
    joyRef.current = null;
    setJoy(null);
  };

  // ---------- medidas / canvas ALTA RESOLUÇÃO ----------
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth, h = el.offsetHeight;
      if (!w || !h) return;
      setCssSize({ w, h });
      const isCompact = h < 470;
      setCompact(isCompact);
      const aspect = w / h;
      const camW = Math.max(320, Math.min(760, Math.round(CAM_H * aspect)));
      dimsRef.current = {
        W: camW, H: CAM_H,
        GROUND: Math.round(CAM_H * (isCompact ? 0.38 : 0.44)),
        BOT: CAM_H - (isCompact ? 60 : 26),
      };
      // GARANTIA ANTI-ESTICADO: o canvas é exibido SEMPRE na proporção interna
      // exata (contain). No caso normal preenche o palco inteiro; se o clamp da
      // largura travar (telas extremas / medida transitória na rotação), sobram
      // barras discretas em vez de cena distorcida.
      const camAspect = camW / CAM_H;
      let dw = w, dh = Math.round(w / camAspect);
      if (dh > h) { dh = h; dw = Math.round(h * camAspect); }
      const ox = Math.round((w - dw) / 2), oy = Math.round((h - dh) / 2);
      setCanvasRect({ ox, oy, dw, dh });
      canvasRectRef.current = { ox, oy, dw, dh };
      // RESOLUÇÃO DO CANVAS = 1 texel por PIXEL FÍSICO da tela.
      // O teto fixo de 4.5 que havia aqui era a causa do "personagem borrado":
      // numa tela grande de alta densidade (dpr 2–3) o canvas ficava com MENOS
      // pixels do que a área exibida e o navegador ampliava a imagem. Agora o
      // alvo é exato (dh * dpr) e o único limite é o tamanho máximo de canvas
      // suportado pelo navegador (16384 px, com margem).
      const dpr = window.devicePixelRatio || 1;
      const want = (dh * dpr) / CAM_H;                       // exatamente 1:1
      const maxByCanvas = Math.min(8192 / camW, 8192 / CAM_H); // limite seguro
      const pxScale = Math.max(1, Math.min(want, maxByCanvas));
      pxScaleRef.current = pxScale;
      const c = canvasRef.current;
      if (c) {
        c.width = Math.round(camW * pxScale);
        c.height = Math.round(CAM_H * pxScale);
        const g = c.getContext("2d")!;
        g.imageSmoothingEnabled = true;
        g.imageSmoothingQuality = "high";
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [rotated]);

  // ---------- game loop ----------
  const balloonElRef = useRef<HTMLDivElement>(null);
  const balloonScrollRef = useRef<HTMLDivElement>(null);
  const balloonKeyRef = useRef<string | null>(null);
  const heroTagRef = useRef<HTMLDivElement>(null);
  const doorOpenRef = useRef(false);
  const onFinishRef = useRef(onFinish); onFinishRef.current = onFinish;
  const typeDoneRef = useRef(false); typeDoneRef.current = typeDone;
  doorOpenRef.current = done && typeDone;
  const dustRef = useRef<{ fx: number; fy: number; born: number }[]>([]);
  const lastDustRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0; let last = 0; let mounted = true;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16); last = now;
      const c = canvasRef.current; const g = c?.getContext("2d");
      if (!c || !g) { raf = requestAnimationFrame(frame); return; }
      const dims = dimsRef.current;
      const p = playerRef.current;
      const px2 = pxScaleRef.current;
      g.setTransform(px2, 0, 0, px2, 0, 0);
      g.clearRect(0, 0, dims.W, dims.H);

      // ---- movimento do jogador
      let vx = 0, vdy = 0;
      if (p.keys.l) vx -= 1; if (p.keys.r) vx += 1;
      if (p.keys.u) vdy -= 1; if (p.keys.d) vdy += 1;
      // joystick flutuante (mobile): vetor analógico -1..1 vira velocidade
      const jj = joyRef.current;
      if (jj?.active && (jj.ax !== 0 || jj.ay !== 0)) { vx = jj.ax; vdy = jj.ay * 1.6; }
      if (vx === 0 && vdy === 0 && p.tfx != null && p.tdy != null) {
        const dx = p.tfx - p.fx, ddy = p.tdy - p.dy;
        if (Math.abs(dx) > 0.008 || Math.abs(ddy) > 0.04) {
          vx = Math.abs(dx) > 0.008 ? Math.sign(dx) : 0;
          vdy = Math.abs(ddy) > 0.04 ? Math.sign(ddy) : 0;
        } else { p.tfx = null; p.tdy = null; }
      }
      p.moving = vx !== 0 || vdy !== 0;
      if (vx !== 0) { p.face = vx > 0 ? 1 : -1; p.fx = Math.max(0.04, Math.min(0.96, p.fx + vx * WALK_FX * dt)); }
      if (vdy !== 0) p.dy = Math.max(0, Math.min(1, p.dy + vdy * WALK_DY * dt));

      // ---- fundo HD
      drawBackdropHD(g, { dims, t: now, reduce, state: drawStateRef.current });

      // ---- atores vivos (tween em fração)
      const live = liveRef.current;
      for (const [key, a] of live) {
        if (a.leaving) {
          a.alpha -= dt * 0.002;
          if (a.alpha <= 0) { live.delete(key); continue; }
        } else if (a.alpha < 1) a.alpha = Math.min(1, a.alpha + dt * 0.002);
        const dx = a.tfx - a.fx, ddy = a.tdy - a.dy;
        const moving = Math.abs(dx) > 0.006 || Math.abs(ddy) > 0.03;
        if (moving) {
          if (Math.abs(dx) > 0.006) a.fx += Math.sign(dx) * Math.min(Math.abs(dx), NPC_WALK * dt);
          if (Math.abs(ddy) > 0.03) a.dy += Math.sign(ddy) * Math.min(Math.abs(ddy), 0.0016 * dt);
        }
        (a as LiveActor & { _walking?: boolean; _dir?: number })._walking = moving;
        (a as LiveActor & { _walking?: boolean; _dir?: number })._dir = dx !== 0 ? Math.sign(dx) : undefined;
      }

      // ---- itens ordenados por profundidade
      type DrawItem = { fy: number; draw: () => void };
      const items: DrawItem[] = [];
      let skyN = 0;
      for (const pr of stagedRef.current.props) {
        const sx = (pr.x / SET_W) * dims.W;
        if (pr.sky) {
          // CORPO DO CÉU (sol, lua, estrelas, aves, nuvens, firmamento):
          // não tem pés no chão — `dy` é ALTURA no céu, a escala não sofre
          // profundidade e ele é desenhado ATRÁS de todo o resto.
          const syy = skyPropY(pr.feetDy, dims.GROUND);
          const ssc = pr.scale ?? 1;
          items.push({
            fy: -9999 + skyN++,
            draw: () => drawPropHD(g, pr.kind, sx, syy, { scale: ssc, t: now, reduce, fire: pr.fire }),
          });
          continue;
        }
        const fy = depthToFeetY(pr.feetDy, dims);
        items.push({ fy, draw: () => drawPropHD(g, pr.kind, sx, fy, { scale: (pr.scale ?? 1) * depthScale(pr.feetDy), t: now, reduce, fire: pr.fire }) });
      }
      for (const [, a] of live) {
        const fy = depthToFeetY(a.dy, dims);
        const sx = a.fx * dims.W;
        const walking = (a as LiveActor & { _walking?: boolean })._walking;
        const dir = (a as LiveActor & { _dir?: number })._dir;
        // seres simbólicos (dragão, besta, cordeiro…) têm renderer HD próprio;
        // humanos seguem no drawHumanHD
        const spec = {
          role: a.role,
          pose: walking ? "walk" : (a.pose ?? "stand"),
          facing: (dir ?? a.facing ?? (a.fx > 0.5 ? -1 : 1)) as 1 | -1,
          scale: (a.scale ?? 1) * depthScale(a.dy),
          t: now, reduce, glow: a.glow, alpha: a.alpha, palette: a.palette,
          // VARIEDADE: cada pessoa distinta (id próprio) recebe uma aparência
          // estável e diferente — dois "homem" na mesma cena não são clones.
          seed: a.id ?? a.role,
        };
        items.push({
          fy, draw: () => (BEING_ROLES.has(a.role) ? drawBeingHD(g, sx, fy, spec) : drawHumanHD(g, sx, fy, spec)),
        });
      }
      // poeira dos pés
      if (p.moving && !reduce && now - lastDustRef.current > 140) {
        lastDustRef.current = now;
        dustRef.current.push({ fx: p.fx - p.face * 0.015, fy: depthToFeetY(p.dy, dims), born: now });
        if (dustRef.current.length > 10) dustRef.current.shift();
      }
      for (const d of dustRef.current) {
        const age = (now - d.born) / 520;
        if (age >= 1) continue;
        g.save(); g.globalAlpha = (1 - age) * 0.3;
        g.fillStyle = "#cbb98d";
        g.beginPath(); g.arc(d.fx * dims.W, d.fy - 2 - age * 6, 1.6 + age * 1.6, 0, Math.PI * 2); g.fill();
        g.restore();
      }
      dustRef.current = dustRef.current.filter((d) => now - d.born < 520);

      // herói HD (o MEU personagem) — a cena é individual, só ele caminha aqui
      {
        const fy = depthToFeetY(p.dy, dims);
        const k = depthScale(p.dy) * HERO_SCALE;
        const sx = p.fx * dims.W;
        items.push({
          fy, draw: () => {
            g.save();
            g.translate(sx, fy);
            g.scale(k, k);
            g.translate(-sx, -fy);
            drawHeroHD(g, sx, fy, { ...DEFAULT_LOOK, ...(look || {}) }, { t: now, reduce, walking: p.moving, face: p.face });
            g.restore();
          },
        });
      }

      // porta do desafio — DENTRO da cena
      if (doorOpenRef.current) {
        const doorFy = depthToFeetY(DOOR_DY, dims);
        const doorSx = DOOR_FX * dims.W;
        items.push({
          fy: doorFy, draw: () => {
            drawPropHD(g, "door", doorSx, doorFy, { scale: 1.4, t: now, reduce });
            // seta convite
            const bobA = reduce ? 0 : Math.sin(now * 0.005) * 3;
            g.save();
            g.fillStyle = "#ffd24a";
            g.beginPath();
            g.moveTo(doorSx - 5, doorFy - 56 + bobA);
            g.lineTo(doorSx + 5, doorFy - 56 + bobA);
            g.lineTo(doorSx, doorFy - 48 + bobA);
            g.closePath(); g.fill();
            g.restore();
          },
        });
        if (!finishedRef.current && Math.abs(p.fx - DOOR_FX) < 0.05 && Math.abs(p.dy - DOOR_DY) < 0.24) {
          finishedRef.current = true;
          onFinishRef.current();
        }
      }

      items.sort((a2, b2) => a2.fy - b2.fy);
      for (const it of items) it.draw();

      // ---- badges "?" (um por tipo, HD)
      const spots: { fx: number; y: number; info: StageInfo }[] = [];
      const best = new Map<string, { fx: number; y: number; info: StageInfo; d: number }>();
      const consider = (key: string, fx: number, y: number, inf: StageInfo) => {
        const d = Math.abs(fx - 0.5);
        const cur = best.get(key);
        if (!cur || d < cur.d) best.set(key, { fx, y, info: inf, d });
      };
      const infoBook = bookId ?? "revelation";
      for (const [, a] of live) {
        if (a.alpha < 0.6) continue;
        // Personagem identificado (Caim, Raquel, Ló…) ganha SEU próprio badge e
        // ficha. Extra anônimo (filhoA, moço1…) cai na ficha do papel e um único
        // badge por papel — evita poluir a cena com dezenas de "?" iguais.
        const named = namedActorInfo(a.id);
        const inf = named ?? actorInfo(a.role, infoBook);
        if (!inf) continue;
        const fy = depthToFeetY(a.dy, dims);
        consider(named ? `a:${a.id}` : `a:${a.role}`, a.fx, fy - ACTOR_H * (a.scale ?? 1) * depthScale(a.dy) - 10, inf);
      }
      for (const pr of stagedRef.current.props) {
        // Só OBJETOS-MARCO (tipo específico, sentido do livro ou etiquetados)
        // mostram badge; rocha/árvore/moita de cenário ficam silenciosos.
        const inf = propBadgeInfo(pr.kind, infoBook, pr.tag);
        if (!inf) continue;
        const pkey = pr.tag ? `p:${pr.tag}` : `p:${pr.kind}`;
        // ancora na ALTURA REAL do objeto (rocha baixa = badge baixinho)
        const hh = PROP_H[pr.kind] ?? 30;
        if (pr.sky) {
          // corpo do céu: badge no PRÓPRIO objeto lá em cima (nunca no chão)
          const syy = skyPropY(pr.feetDy, dims.GROUND);
          consider(pkey, pr.x / SET_W, syy - hh * 0.5 * (pr.scale ?? 1) - 7, inf);
          continue;
        }
        const fy = depthToFeetY(pr.feetDy, dims);
        consider(pkey, pr.x / SET_W, fy - hh * (pr.scale ?? 1) * depthScale(pr.feetDy) - 7, inf);
      }
      g.save();
      g.textAlign = "center"; g.textBaseline = "middle";
      g.font = "bold 9px ui-monospace, monospace";
      for (const [, b2] of best) {
        spots.push({ fx: b2.fx, y: b2.y, info: b2.info });
        const sx = b2.fx * dims.W;
        const pulse = reduce ? 0 : Math.sin(now * 0.004) * 1.4;
        // trava o badge dentro da tela: mesmo ator alto perto do topo mostra o "?"
        const yy = Math.max(14, b2.y + pulse);
        g.fillStyle = "rgba(20,14,6,0.85)";
        g.beginPath(); g.arc(sx, yy, 6, 0, Math.PI * 2); g.fill();
        g.strokeStyle = "#e8b04b"; g.lineWidth = 1.2;
        g.beginPath(); g.arc(sx, yy, 6, 0, Math.PI * 2); g.stroke();
        g.fillStyle = "#ffd889";
        g.fillText("?", sx, yy + 0.5);
      }
      g.restore();
      qSpotsRef.current = spots;

      // ---- fade de troca de set
      if (fadeRef.current > 0.01) {
        fadeRef.current *= reduce ? 0 : 0.92;
        g.save(); g.globalAlpha = Math.min(1, fadeRef.current); g.fillStyle = "#060403"; g.fillRect(0, 0, dims.W, dims.H); g.restore();
      }

      // ---- tag do herói (acima da cabeça) — segue o retângulo REAL do canvas
      if (heroTagRef.current) {
        const cs = cssSizeRef.current;
        const cr = canvasRectRef.current;
        const scaleX = (cr.dw || cs.w) / dims.W || 1;
        const scaleY = (cr.dh || cs.h) / dims.H || 1;
        const k2 = depthScale(p.dy) * HERO_SCALE;
        const fy = depthToFeetY(p.dy, dims);
        const tagY = fy - (HERO_H + 6 + heroMountLift(look?.mount)) * k2;
        heroTagRef.current.style.left = `${cr.ox + p.fx * dims.W * scaleX}px`;
        heroTagRef.current.style.bottom = `${cs.h - (cr.oy + tagY * scaleY)}px`;
      }

      // ---- balão segue o ator que fala
      if (balloonElRef.current && balloonKeyRef.current) {
        const a = live.get(balloonKeyRef.current);
        if (a) {
          const cs = cssSizeRef.current;
          const cr = canvasRectRef.current;
          const scaleX = (cr.dw || cs.w) / dims.W || 1;
          const scaleY = (cr.dh || cs.h) / dims.H || 1;
          // margem = ~metade da largura do balão, p/ ele nunca sair pela lateral
          const halfBal = Math.min(cs.w * 0.46, 224);
          const bx = Math.max(halfBal, Math.min(cs.w - halfBal, cr.ox + a.fx * dims.W * scaleX));
          const h = ACTOR_H * (a.scale ?? 1) * depthScale(a.dy);
          const byRaw = cs.h - (cr.oy + (depthToFeetY(a.dy, dims) - h - 6) * scaleY);
          // trava vertical: o balão nunca sobe além de ~54% da tela, para que a
          // tampa (max-height) sempre caiba sem cruzar a borda superior no mobile.
          const by = Math.max(cs.h * 0.22, Math.min(cs.h * 0.54, byRaw));
          balloonElRef.current.style.left = `${bx}px`;
          balloonElRef.current.style.bottom = `${by}px`;
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { mounted = false; cancelAnimationFrame(raf); };
  }, [script, look]);
  const stagedRef = useRef(staged); stagedRef.current = staged;

  // ---------- balão (conteúdo) ----------
  const balloon = useMemo(() => {
    if (!beat?.by || !verse) return null;
    // O `by` é sempre um PAPEL (ou "deus"). O ator que fala pode ter um `id`
    // próprio (ex.: a mulher de Potifar, o mordomo): então casamos por id OU
    // papel e seguimos o ator pela sua CHAVE viva (id ?? role) — assim o balão
    // gruda na figura certa mesmo quando ela tem ficha de personagem.
    const speaker = staged.cast.find((c) => c.id === beat.by) ?? staged.cast.find((c) => c.role === beat.by);
    balloonKeyRef.current = speaker ? (speaker.id ?? speaker.role) : null;
    return { name: SPEAKER_NAME[beat.by] ?? beat.by, voice: !speaker };
  }, [beat, verse, staged]);

  // ---------- loading / error ----------
  if (isLoading) {
    return <div className="h-full flex items-center justify-center text-[#cdbfa0] text-sm animate-pulse">Preparando a cena…</div>;
  }
  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm text-red-300">{error}</p>
        {onRetry && <button onClick={onRetry} className="rpg-btn px-4 py-2 text-sm">Tentar de novo</button>}
      </div>
    );
  }

  const lastV = script.beats[script.beats.length - 1]?.v ?? verses.length;

  return (
    <div
      ref={wrapRef}
      style={{ position: "absolute", inset: 0 }}
      className="bg-[#0b0805] overflow-hidden select-none touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <canvas
        ref={canvasRef}
        className="absolute"
        style={canvasRect.dw > 0
          ? { left: canvasRect.ox, top: canvasRect.oy, width: canvasRect.dw, height: canvasRect.dh }
          : { inset: 0, width: "100%", height: "100%" }}
      />
      {joy && <RPGJoystick x={joy.x} y={joy.y} kx={joy.kx} ky={joy.ky} />}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(130% 100% at 50% 38%, transparent 62%, rgba(5,7,12,.42) 100%)" }} />

      {/* topo: referência + progresso + fechar */}
      <div className="absolute top-2 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5">
          <div className="px-2.5 py-1 rounded-lg bg-black/55 border border-[#e8b04b55]">
            <span className="text-[11px] font-black text-[#ffd889]">{bookName} {chapter}</span>
            <span className="text-[10px] text-[#cdbfa0]"> • v. {beat?.v ?? 1}/{lastV}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {onClose && (
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onClick={onClose}
              className="pointer-events-auto p-1.5 rounded-lg bg-black/55 border border-[#3a2c18] text-[#cdbfa0]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* tag do herói (👑 nível + nome + DEV) — componente padronizado */}
      {characterName && (
        <div
          ref={heroTagRef}
          className="absolute pointer-events-none z-10"
          style={{ transform: "translateX(-50%)", left: "50%", bottom: "45%" }}
        >
          <RPGNameTag name={characterName} level={level} isAdmin={isAdmin} />
        </div>
      )}

      {/* balão de fala — largura fixa, texto digitado */}
      <AnimatePresence mode="wait">
        {balloon && (
          <motion.div
            key={`${idx}`}
            ref={balloonElRef}
            initial={{ opacity: 0, scale: 0.85, y: 6, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%" }}
            className="absolute pointer-events-none"
            style={balloon.voice
              ? { left: "50%", bottom: "52%", width: "min(90vw, 480px)" }
              : { left: cssSize.w / 2, bottom: cssSize.h * 0.5, width: "min(88vw, 440px)" }}
          >
            <div className={`relative rounded-xl border-2 shadow-[0_4px_18px_rgba(0,0,0,0.5)] ${balloon.voice ? "bg-[#241a08f2] border-[#e8b04b] text-[#ffedbd]" : "bg-[#101a2ef2] border-[#5b9bff] text-blue-50"}`}>
              <div ref={balloonScrollRef} className="px-3 py-2 text-[12px] leading-snug overflow-y-auto overscroll-contain" style={{ maxHeight: "min(40vh, 300px)" }}>
                <span className={`block text-[9px] font-black tracking-wider uppercase mb-0.5 ${balloon.voice ? "text-[#ffd889]" : "text-[#8ab8ff]"}`}>{balloon.name}</span>
                {shown}
                {!typeDone && <span className="animate-pulse text-[#ffd889]">▌</span>}
              </div>
              {!balloon.voice && (
                <span className="absolute left-1/2 -bottom-[7px] -translate-x-1/2 w-3 h-3 rotate-45 bg-[#101a2ef2] border-r-2 border-b-2 border-[#5b9bff]" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ficha do personagem/objeto */}
      <AnimatePresence>
        {info && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/55"
            onPointerDown={(e) => { e.stopPropagation(); }}
            onPointerUp={(e) => { e.stopPropagation(); }}
            onClick={(e) => { e.stopPropagation(); setInfo(null); }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="relative w-full max-w-sm rounded-2xl border-2 border-[#e8b04b] p-4 text-left"
              style={{ background: "linear-gradient(180deg,#1c1710,#0c0a06)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setInfo(null)}
                className="absolute top-2 right-2 p-1 rounded-md bg-black/40 border border-[#3a2c18] text-[#cdbfa0]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <h3 className="text-base font-black text-[#ffd889] pr-6">{info.title}</h3>
              <p className="text-[10px] font-bold tracking-wide text-[#9c8b68] uppercase mb-2">{info.subtitle}</p>
              <p className="text-[12px] leading-relaxed text-[#e8dfc8]">{info.text}</p>
              <p className="mt-2 text-[9px] text-[#6d5f43]">toque fora para fechar</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* narrador — caixa clássica com controles minimalistas */}
      <div className="absolute left-0 right-0 bottom-0 px-3" style={{ paddingBottom: "max(0.4rem, env(safe-area-inset-bottom))" }}>
        <div className={`rpg-dialogue max-w-3xl mx-auto px-4 ${compact ? "py-2" : "py-3"}`}>
          <span className="who block">✒️ {bookName} {chapter}:{beat?.v}</span>
          <p className={`${compact ? "text-[12px] min-h-[1.7em]" : "text-[14px] min-h-[2.2em]"} leading-snug mt-0.5`}>
            {done && typeDone ? (
              <span className="text-[#ffd889]">✨ Uma porta se abriu — entre nela para o desafio!</span>
            ) : quote ? (
              <span className="text-[#8ab8ff] italic text-[12px]">💬 {SPEAKER_NAME[beat?.by ?? ""] ?? beat?.by} está falando…</span>
            ) : (
              <>
                {shown}
                {!typeDone && <span className="animate-pulse text-[#ffd889]">▌</span>}
              </>
            )}
          </p>
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center gap-1.5">
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); setIdx((i) => Math.max(0, i - 1)); }}
                disabled={idx === 0}
                aria-label="Versículo anterior"
                className={`w-9 h-8 rounded-lg inline-flex items-center justify-center border transition active:scale-95 ${idx === 0 ? "border-[#2a2a3a] text-[#4a4a5c]" : "border-[#3a4258] text-[#cdd6f0] bg-black/30"}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {!(done && typeDone) && (
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onPointerUp={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); advance(); }}
                  aria-label="Avançar versículo"
                  className={`w-9 h-8 rounded-lg inline-flex items-center justify-center transition active:scale-95 ${typeDone
                    ? "text-[#2a1c05] bg-gradient-to-b from-[#ffe08a] to-[#e8b04b]"
                    : "text-[#cdd6f0] bg-black/30 border border-[#3a4258]"}`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              <span className="text-[9px] text-[#6d7590] ml-1 hidden sm:inline">toque no chão p/ andar</span>
            </div>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); openStudy(); }}
              className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg font-black text-[12px] text-[#2a1c05] bg-gradient-to-b from-[#ffe08a] to-[#e8b04b] active:scale-95 transition"
            >
              <Pencil className="w-3.5 h-3.5" /> Estudar
            </button>
          </div>
        </div>
      </div>

      {/* overlay de estudo do versículo */}
      <AnimatePresence>
        {study.open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/60"
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); if (!study.loading) setStudy({ open: false, loading: false }); }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
              className="rpg-dialogue w-full max-w-md px-4 py-3 max-h-[70%] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="who">✏️ Estudo • {bookName} {chapter}:{beat?.v}</span>
                {!study.loading && (
                  <button onClick={() => setStudy({ open: false, loading: false })} className="p-1 rounded-md bg-black/40 border border-[#3a4258] text-[#cdd6f0]">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {study.loading ? (
                <p className="text-[12px] mt-2 animate-pulse text-[#cdd6f0]">Carregando explicação do versículo…</p>
              ) : study.blocked ? (
                <p className="text-[12px] mt-2 text-[#ffd889]">Você atingiu o limite diário de explicações. Faça upgrade do plano para estudar sem limites. ✨</p>
              ) : (
                <>
                  <p className="text-[12px] leading-relaxed mt-2 whitespace-pre-line">{study.text}</p>
                  {!!study.words?.length && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {study.words.map((w2) => (
                        <span key={w2.term} className="px-2 py-0.5 rounded-full bg-[#e8b04b22] border border-[#e8b04b66] text-[10px] text-[#ffd889]">
                          <b>{w2.term}</b>: {w2.meaning}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RPGStageScene;
