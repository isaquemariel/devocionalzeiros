// ============================================================================
// Ambientação sonora do RPG — 100% procedural (Web Audio API), sem arquivos.
// Camadas de ruído filtrado (chuva, vento, mar, fogo) + um "drone" de foco,
// que reagem ao estado da cena. Trovões e estalos de fogo entram por eventos.
// Tudo respeita autoplay (só inicia após um gesto do usuário) e um mute global.
// ============================================================================

export interface Ambience {
  rain?: number; storm?: number; sea?: number; fire?: number; wind?: number; night?: number; glory?: number;
}

type Ctx = AudioContext & { webkitAudioContext?: never };
let ctx: Ctx | null = null;
let master: GainNode | null = null;
let noiseBuf: AudioBuffer | null = null;
let muted = false;
export type Soundscape = "scene" | "rain" | "white" | "brown" | "waves" | "off";
let mode: Soundscape = "scene";
let target: Required<Ambience> = { rain: 0, storm: 0, sea: 0, fire: 0, wind: 0, night: 0, glory: 0 };
let thunderTimer: number | null = null;
let crackleTimer: number | null = null;

interface Layer { gain: GainNode; setTarget: (v: number) => void }
const layers: Record<string, Layer> = {};

function makeNoise(c: AudioContext): AudioBuffer {
  const len = Math.floor(c.sampleRate * 2);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function noiseSource(c: AudioContext): AudioBufferSourceNode {
  const s = c.createBufferSource(); s.buffer = noiseBuf; s.loop = true; s.start(); return s;
}

// camada de ruído filtrado com ganho suavizado
function buildNoiseLayer(c: AudioContext, out: GainNode, filter: { type: BiquadFilterType; freq: number; q?: number }, lfo?: { rate: number; depth: number }): Layer {
  const src = noiseSource(c);
  const bq = c.createBiquadFilter(); bq.type = filter.type; bq.frequency.value = filter.freq; if (filter.q) bq.Q.value = filter.q;
  const g = c.createGain(); g.gain.value = 0;
  src.connect(bq); bq.connect(g); g.connect(out);
  if (lfo) { // modula o volume (ondas do mar, rajadas de vento)
    const osc = c.createOscillator(); osc.frequency.value = lfo.rate;
    const dep = c.createGain(); dep.gain.value = lfo.depth;
    osc.connect(dep); dep.connect(g.gain); osc.start();
  }
  return { gain: g, setTarget: (v: number) => { try { g.gain.setTargetAtTime(Math.max(0, v), c.currentTime, 0.6); } catch { g.gain.value = v; } } };
}

// drone suave (foco / noite / glória) — dois osciladores em quinta
function buildPad(c: AudioContext, out: GainNode): Layer {
  const g = c.createGain(); g.gain.value = 0;
  const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 700;
  [110, 164.8].forEach((f) => { const o = c.createOscillator(); o.type = "sine"; o.frequency.value = f; const og = c.createGain(); og.gain.value = 0.5; o.connect(og); og.connect(lp); o.start(); });
  lp.connect(g); g.connect(out);
  return { gain: g, setTarget: (v: number) => { try { g.gain.setTargetAtTime(Math.max(0, v), c.currentTime, 1.2); } catch { g.gain.value = v; } } };
}

function burst(c: AudioContext, out: GainNode, o: { freq: number; type: BiquadFilterType; q?: number; peak: number; attack: number; decay: number }) {
  const src = c.createBufferSource(); src.buffer = noiseBuf; src.loop = true;
  const bq = c.createBiquadFilter(); bq.type = o.type; bq.frequency.value = o.freq; if (o.q) bq.Q.value = o.q;
  const g = c.createGain(); g.gain.value = 0;
  src.connect(bq); bq.connect(g); g.connect(out);
  const now = c.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(o.peak, now + o.attack);
  g.gain.exponentialRampToValueAtTime(0.0001, now + o.attack + o.decay);
  src.start(now); src.stop(now + o.attack + o.decay + 0.1);
}

/** Cria o contexto (chamar dentro de um gesto do usuário). Idempotente. */
export function initAudio(): void {
  if (ctx) { if (ctx.state === "suspended") ctx.resume().catch(() => {}); return; }
  const AC = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
  if (!AC) return;
  ctx = new AC() as Ctx;
  noiseBuf = makeNoise(ctx);
  master = ctx.createGain(); master.gain.value = muted ? 0 : 0.55; master.connect(ctx.destination);
  layers.rain = buildNoiseLayer(ctx, master, { type: "highpass", freq: 1100 });
  layers.wind = buildNoiseLayer(ctx, master, { type: "lowpass", freq: 480 }, { rate: 0.12, depth: 0.05 });
  layers.sea = buildNoiseLayer(ctx, master, { type: "lowpass", freq: 700 }, { rate: 0.16, depth: 0.09 });
  layers.fire = buildNoiseLayer(ctx, master, { type: "bandpass", freq: 900, q: 0.7 });
  layers.white = buildNoiseLayer(ctx, master, { type: "highshelf", freq: 1000 });   // ruído branco (espectro cheio)
  layers.brown = buildNoiseLayer(ctx, master, { type: "lowpass", freq: 240 });        // ruído "marrom"/foco (grave)
  layers.pad = buildPad(ctx, master);
  applyTarget();
  // trovões (quando storm alto) e estalos de fogo (quando fire alto)
  thunderTimer = window.setInterval(() => {
    if (!ctx || muted) return;
    if (target.storm > 0.3 && Math.random() < 0.25) burst(ctx, master!, { freq: 90, type: "lowpass", peak: 0.5 * target.storm, attack: 0.05, decay: 1.4 });
  }, 2600);
  crackleTimer = window.setInterval(() => {
    if (!ctx || muted) return;
    if (target.fire > 0.2 && Math.random() < 0.5) burst(ctx, master!, { freq: 1800, type: "bandpass", q: 1.2, peak: 0.15 * target.fire, attack: 0.005, decay: 0.09 });
  }, 320);
}

function applyTarget(): void {
  if (!ctx) return;
  const set = (rain: number, wind: number, sea: number, fire: number, white: number, brown: number, pad: number) => {
    layers.rain?.setTarget(rain); layers.wind?.setTarget(wind); layers.sea?.setTarget(sea);
    layers.fire?.setTarget(fire); layers.white?.setTarget(white); layers.brown?.setTarget(brown); layers.pad?.setTarget(pad);
  };
  if (mode === "rain") return set(0.6, 0.12, 0, 0, 0, 0, 0.03);
  if (mode === "white") return set(0, 0, 0, 0, 0.32, 0, 0);
  if (mode === "brown") return set(0, 0, 0, 0, 0, 0.5, 0.04);   // foco
  if (mode === "waves") return set(0, 0.1, 0.6, 0, 0, 0, 0.03);
  if (mode === "off") return set(0, 0, 0, 0, 0, 0, 0);
  // modo "cena": reage ao estado do capítulo
  set(
    (target.rain + target.storm * 0.5) * 0.5,
    (target.wind + target.storm * 0.6) * 0.4,
    target.sea * 0.5,
    target.fire * 0.4,
    0, 0,
    Math.max(target.night, target.glory) * 0.10 + 0.02,
  );
}

export function setSoundscape(m: Soundscape): void { mode = m; applyTarget(); }
export function getSoundscape(): Soundscape { return mode; }

/** Atualiza a ambientação-alvo a partir do estado da cena. */
export function setAmbience(a: Ambience): void {
  target = { rain: a.rain ?? 0, storm: a.storm ?? 0, sea: a.sea ?? 0, fire: a.fire ?? 0, wind: a.wind ?? 0, night: a.night ?? 0, glory: a.glory ?? 0 };
  if (mode === "scene") applyTarget(); // em modo fixo, ignora a cena
}

export function setAudioMuted(m: boolean): void {
  muted = m;
  if (master && ctx) { try { master.gain.setTargetAtTime(m ? 0 : 0.55, ctx.currentTime, 0.2); } catch { master.gain.value = m ? 0 : 0.55; } }
}
export function isAudioMuted(): boolean { return muted; }

/** Silencia e suspende (ao sair da leitura). Mantém o contexto pra reusar. */
export function stopAudio(): void {
  if (!ctx) return;
  setAmbience({});
  if (master) { try { master.gain.setTargetAtTime(0, ctx.currentTime, 0.3); } catch { /* noop */ } }
  window.setTimeout(() => { ctx?.suspend?.().catch(() => {}); }, 400);
}
