import { TextToSpeech, QueueStrategy } from "@capacitor-community/text-to-speech";

// ============================================================================
// Vozes do RPG — narração das falas. No NAVEGADOR usa a Web Speech API do
// aparelho (speechSynthesis). No APP NATIVO (Capacitor) usa o motor de voz do
// próprio Android via plugin TextToSpeech — porque o WebView do Android NÃO tem
// Web Speech (por isso a narração ficava muda no app). A API pública é a mesma.
// Deus fala em tom grave e lento; o herói (mascote), mais ágil e natural.
// ============================================================================

let ptVoice: SpeechSynthesisVoice | null = null;
let enabled = false;

const supported = typeof window !== "undefined" && "speechSynthesis" in window;

// App nativo (Capacitor)? Aí a narração vai pelo TTS nativo do Android/iOS.
const cap = typeof window !== "undefined"
  ? (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor
  : undefined;
const isNative = !!cap?.isNativePlatform?.();

function pickVoice() {
  if (!supported) return;
  const vs = window.speechSynthesis.getVoices();
  if (!vs.length) return;
  // prefere voz pt-BR; senão qualquer pt; senão a padrão
  ptVoice = vs.find((v) => /pt[-_]?br/i.test(v.lang)) || vs.find((v) => /^pt/i.test(v.lang)) || vs[0] || null;
}
if (supported) {
  pickVoice();
  try { window.speechSynthesis.onvoiceschanged = pickVoice; } catch { /* noop */ }
}

// remove emojis/símbolos pra não serem lidos ("estrela brilhante" etc.)
function clean(s: string): string {
  return s
    .replace(/[\u{1F000}-\u{1FAFF}]/gu, "")
    .replace(/[\u{2190}-\u{21FF}\u{2300}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{2600}-\u{26FF}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function isVoiceSupported(): boolean { return supported || isNative; }
export function isVoiceEnabled(): boolean { return enabled; }

// No celular a síntese de voz só é liberada se o PRIMEIRO `speak()` acontecer
// dentro de um gesto do usuário (um toque). Chamamos isto ao iniciar a leitura
// e no primeiro toque de avançar: carrega as vozes e "destrava" o motor com uma
// fala silenciosa. Sem isto, a narração disparada por efeito ficava muda no
// mobile mesmo com a API presente.
let primed = false;
export function primeVoice(): void {
  if (isNative) return; // TTS nativo não precisa de "destravar" por gesto
  if (!supported || primed) return;
  primed = true;
  try {
    pickVoice();
    const u = new SpeechSynthesisUtterance(" ");
    u.volume = 0; // inaudível — serve só pra liberar o motor no mobile
    if (ptVoice) u.voice = ptVoice;
    u.lang = ptVoice?.lang || "pt-BR";
    window.speechSynthesis.resume();
    window.speechSynthesis.speak(u);
  } catch { /* noop */ }
}

export function setVoiceEnabled(b: boolean): void {
  enabled = b;
  if (!b) cancelVoice();
  else if (supported) { pickVoice(); try { window.speechSynthesis.resume(); } catch { /* noop */ } }
}

// ---------------------------------------------------------------------------
// FIM DA FALA — quem chama precisa saber QUANDO a narração terminou.
//
// Sem isto, a batalha do chefe avançava de fase num tempo fixo (1,2 s) e a
// vitória saía sozinha em 2,6 s: quem acertava rápido cortava a fala no meio e
// nunca ouvia o narrador até o fim. `geracao` invalida o aviso de falas que
// foram substituídas ou canceladas, para não disparar o callback errado.
// ---------------------------------------------------------------------------
let geracao = 0;
let falando = false;

/** Está narrando alguma coisa agora? */
export function isSpeaking(): boolean { return falando; }

export function cancelVoice(): void {
  geracao++;
  falando = false;
  if (isNative) { TextToSpeech.stop().catch(() => { /* noop */ }); return; }
  if (!supported) return;
  try { window.speechSynthesis.cancel(); } catch { /* noop */ }
}

// ---- Caminho NATIVO (Capacitor): usa o motor de voz do Android/iOS ----
function speakNativeLine(text: string, role: "god" | "hero", strategy: QueueStrategy): void {
  const t = clean(text);
  if (!t) return;
  const tuning = role === "god" ? { pitch: 0.7, rate: 0.85 } : { pitch: 1.1, rate: 1.0 };
  TextToSpeech.speak({ text: t, lang: "pt-BR", volume: 1, queueStrategy: strategy, ...tuning })
    .catch(() => { /* motor indisponível — ignora silenciosamente */ });
}

function speakNativeLineAsync(text: string, role: "god" | "hero", strategy: QueueStrategy): Promise<void> {
  const t = clean(text);
  if (!t) return Promise.resolve();
  const tuning = role === "god" ? { pitch: 0.7, rate: 0.85 } : { pitch: 1.1, rate: 1.0 };
  // no plugin nativo a Promise só resolve quando o motor TERMINA de falar
  return TextToSpeech.speak({ text: t, lang: "pt-BR", volume: 1, queueStrategy: strategy, ...tuning })
    .then(() => undefined)
    .catch(() => undefined);
}

function speakBeatNative(god?: string, reaction?: string, aviso?: () => void): void {
  // Deus com Flush (interrompe fala anterior); herói com Add (entra na fila após Deus).
  if (!aviso) {
    if (god) speakNativeLine(god, "god", QueueStrategy.Flush);
    if (reaction) speakNativeLine(reaction, "hero", god ? QueueStrategy.Add : QueueStrategy.Flush);
    return;
  }
  const minha = geracao;
  const fim = () => { if (minha === geracao) { falando = false; aviso(); } };
  const p1 = god ? speakNativeLineAsync(god, "god", QueueStrategy.Flush) : Promise.resolve();
  p1.then(() => (reaction ? speakNativeLineAsync(reaction, "hero", god ? QueueStrategy.Add : QueueStrategy.Flush) : Promise.resolve()))
    .then(fim, fim);
}

// Fala um enunciado com robustez de WebView (Android/iOS):
//  • getVoices() costuma vir vazio no 1º acesso — se não há voz ainda, tenta de
//    novo quando `onvoiceschanged` disparar;
//  • o motor às vezes inicia PAUSADO — chamamos resume() logo após o speak.
function doSpeak(u: SpeechSynthesisUtterance): void {
  try {
    const s = window.speechSynthesis;
    s.speak(u);
    // alguns WebViews sobem o utterance pausado; garante a reprodução
    setTimeout(() => { try { s.resume(); } catch { /* noop */ } }, 50);
    setTimeout(() => { try { s.resume(); } catch { /* noop */ } }, 300);
  } catch { /* noop */ }
}

function enqueue(text: string, role: "god" | "hero"): SpeechSynthesisUtterance | null {
  const t = clean(text);
  if (!t || !supported) return null;
  const u = new SpeechSynthesisUtterance(t);
  if (!ptVoice) pickVoice();
  if (ptVoice) u.voice = ptVoice;
  u.lang = ptVoice?.lang || "pt-BR";
  if (role === "god") { u.pitch = 0.6; u.rate = 0.82; } // grave e solene
  else { u.pitch = 1.12; u.rate = 1.0; }                // narrador/herói, natural
  u.volume = 1;
  doSpeak(u);
  return u;
}

/** Estimativa grosseira de duração — rede de segurança para o `onDone` sempre
 *  disparar, mesmo se o motor de voz engolir o evento `end` (acontece em
 *  WebView). ~13 caracteres por segundo, com teto. */
function tetoMs(god?: string, reaction?: string): number {
  const n = (clean(god ?? "").length + clean(reaction ?? "").length) || 1;
  return Math.min(30000, 1200 + (n / 13) * 1000);
}

/**
 * Fala a "conversação" de um versículo: voz de Deus e/ou reação do herói.
 *
 * `onDone` (opcional) avisa quando a narração ACABOU — é o que permite à cena
 * esperar o narrador em vez de cortar a fala num tempo fixo. Ele dispara uma
 * única vez, e NÃO dispara se a fala for cancelada ou substituída por outra.
 * Com a voz desligada ou sem suporte, dispara no próximo tique, para que a
 * lógica de quem chamou continue igual.
 */
export function speakBeat(god?: string, reaction?: string, onDone?: () => void): void {
  if (!enabled) { if (onDone) window.setTimeout(onDone, 0); return; }
  if (isNative) { falando = true; speakBeatNative(god, reaction, onDone); return; }
  if (!supported) { if (onDone) window.setTimeout(onDone, 0); return; }
  cancelVoice(); // não acumula filas ao avançar rápido
  const minha = ++geracao;          // esta fala passa a ser a vigente
  falando = true;
  let avisado = false;
  const fim = () => {
    if (avisado || minha !== geracao) return;
    avisado = true;
    falando = false;
    onDone?.();
  };
  const guarda = onDone ? window.setTimeout(fim, tetoMs(god, reaction)) : 0;
  // O bug clássico do Chrome/WebView: um speak() logo após cancel() é engolido.
  // Um pequeno atraso resolve; se as vozes ainda não carregaram, espera um pouco
  // mais (o motor precisa da lista antes de tocar de forma consistente).
  const voicesReady = !!window.speechSynthesis.getVoices().length;
  const delay = voicesReady ? 40 : 200;
  window.setTimeout(() => {
    if (!enabled || minha !== geracao) { window.clearTimeout(guarda); return; }
    const u1 = god ? enqueue(god, "god") : null;
    const u2 = reaction ? enqueue(reaction, "hero") : null;
    const ultimo = u2 ?? u1;
    if (!ultimo) { window.clearTimeout(guarda); fim(); return; }
    ultimo.onend = () => { window.clearTimeout(guarda); fim(); };
    ultimo.onerror = () => { window.clearTimeout(guarda); fim(); };
  }, delay);
}
