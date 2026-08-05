// ============================================================================
// Vozes do RPG — narração das falas usando a síntese do próprio aparelho
// (Web Speech API), sem baixar áudio. Deus fala em tom grave e lento; o herói
// (mascote), mais ágil e agudo. Fala só as falas que já existem no roteiro.
// ============================================================================

let ptVoice: SpeechSynthesisVoice | null = null;
let enabled = false;

const supported = typeof window !== "undefined" && "speechSynthesis" in window;

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

export function isVoiceSupported(): boolean { return supported; }
export function isVoiceEnabled(): boolean { return enabled; }

// No celular a síntese de voz só é liberada se o PRIMEIRO `speak()` acontecer
// dentro de um gesto do usuário (um toque). Chamamos isto ao iniciar a leitura
// e no primeiro toque de avançar: carrega as vozes e "destrava" o motor com uma
// fala silenciosa. Sem isto, a narração disparada por efeito ficava muda no
// mobile mesmo com a API presente.
let primed = false;
export function primeVoice(): void {
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

export function cancelVoice(): void {
  if (!supported) return;
  try { window.speechSynthesis.cancel(); } catch { /* noop */ }
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

function enqueue(text: string, role: "god" | "hero"): void {
  const t = clean(text);
  if (!t || !supported) return;
  const u = new SpeechSynthesisUtterance(t);
  if (!ptVoice) pickVoice();
  if (ptVoice) u.voice = ptVoice;
  u.lang = ptVoice?.lang || "pt-BR";
  if (role === "god") { u.pitch = 0.6; u.rate = 0.82; } // grave e solene
  else { u.pitch = 1.12; u.rate = 1.0; }                // narrador/herói, natural
  u.volume = 1;
  doSpeak(u);
}

/** Fala a "conversação" de um versículo: voz de Deus e/ou reação do herói. */
export function speakBeat(god?: string, reaction?: string): void {
  if (!enabled || !supported) return;
  cancelVoice(); // não acumula filas ao avançar rápido
  // O bug clássico do Chrome/WebView: um speak() logo após cancel() é engolido.
  // Um pequeno atraso resolve; se as vozes ainda não carregaram, espera um pouco
  // mais (o motor precisa da lista antes de tocar de forma consistente).
  const voicesReady = !!window.speechSynthesis.getVoices().length;
  const delay = voicesReady ? 40 : 200;
  window.setTimeout(() => {
    if (!enabled) return;
    if (god) enqueue(god, "god");
    if (reaction) enqueue(reaction, "hero");
  }, delay);
}
