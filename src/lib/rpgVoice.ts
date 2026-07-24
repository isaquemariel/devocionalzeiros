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

export function setVoiceEnabled(b: boolean): void {
  enabled = b;
  if (!b) cancelVoice();
  else if (supported) pickVoice();
}

export function cancelVoice(): void {
  if (!supported) return;
  try { window.speechSynthesis.cancel(); } catch { /* noop */ }
}

function enqueue(text: string, role: "god" | "hero"): void {
  const t = clean(text);
  if (!t) return;
  const u = new SpeechSynthesisUtterance(t);
  if (ptVoice) u.voice = ptVoice;
  u.lang = ptVoice?.lang || "pt-BR";
  if (role === "god") { u.pitch = 0.6; u.rate = 0.82; } // grave e solene
  else { u.pitch = 1.18; u.rate = 1.03; }               // herói, mais ágil
  u.volume = 1;
  try { window.speechSynthesis.speak(u); } catch { /* noop */ }
}

/** Fala a "conversação" de um versículo: voz de Deus e/ou reação do herói. */
export function speakBeat(god?: string, reaction?: string): void {
  if (!enabled || !supported) return;
  cancelVoice(); // não acumula filas ao avançar rápido
  if (god) enqueue(god, "god");
  if (reaction) enqueue(reaction, "hero");
}
