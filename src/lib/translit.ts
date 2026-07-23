// ============================================================================
// Transliteração leve (cliente) de hebraico e grego para leitura fácil em pt-BR.
// Não é acadêmica — o objetivo é o leitor conseguir "ler" a palavra original.
// Ex.: מְנוּחָה → "menuchá", ἀγάπη → "agápe".
// ============================================================================

const HE_CONS: Record<string, string> = {
  "א": "", "ב": "b", "ג": "g", "ד": "d", "ה": "h", "ו": "v", "ז": "z",
  "ח": "ch", "ט": "t", "י": "y", "כ": "k", "ך": "k", "ל": "l", "מ": "m",
  "ם": "m", "נ": "n", "ן": "n", "ס": "s", "ע": "", "פ": "f", "ף": "f",
  "צ": "ts", "ץ": "ts", "ק": "k", "ר": "r", "ש": "sh", "ת": "t",
};
// niqqud (vogais). dagesh/pontos técnicos são ignorados.
const HE_VOWEL: Record<string, string> = {
  "ְ": "e", // sheva
  "ֱ": "e", "ֲ": "a", "ֳ": "o", // chataf
  "ִ": "i", // hiriq
  "ֵ": "e", "ֶ": "e", // tsere / segol
  "ַ": "a", "ָ": "a", // patach / kamatz
  "ֹ": "o", "ֺ": "o", // holam
  "ֻ": "u", // qubuts
};

function translitHebrew(input: string): string {
  const s = input.normalize("NFC");
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "ּ" || ch === "ֽ" || ch === "ֿ") continue; // dagesh/meteg/rafe
    if (HE_VOWEL[ch] != null) { out += HE_VOWEL[ch]; continue; }
    if (HE_CONS[ch] != null) {
      // vav como vogal quando seguido de dagesh (וּ=u) ou holam (וֹ=o)
      if (ch === "ו") {
        const nx = s[i + 1];
        if (nx === "ּ") { out += "u"; i++; continue; }
        if (nx === "ֹ") { out += "o"; i++; continue; }
      }
      out += HE_CONS[ch];
      continue;
    }
    // ignora outros sinais (cantilação etc.)
  }
  return tidy(out);
}

const GR_MAP: Record<string, string> = {
  "α": "a", "β": "b", "γ": "g", "δ": "d", "ε": "e", "ζ": "z", "η": "e",
  "θ": "th", "ι": "i", "κ": "k", "λ": "l", "μ": "m", "ν": "n", "ξ": "x",
  "ο": "o", "π": "p", "ρ": "r", "σ": "s", "ς": "s", "τ": "t", "υ": "y",
  "φ": "ph", "χ": "ch", "ψ": "ps", "ω": "o",
};

function translitGreek(input: string): string {
  // remove acentos/espíritos e minúscula
  const s = input.toLowerCase().normalize("NFD").replace(/[̀-ͯ͂ͅ]/g, "").normalize("NFC");
  let out = "";
  for (const ch of s) out += GR_MAP[ch] ?? (/[a-z]/.test(ch) ? ch : "");
  return tidy(out);
}

function tidy(s: string): string {
  return s.replace(/([aeiou])\1+/g, "$1").replace(/^-+|-+$/g, "").trim();
}

const isHebrew = (s: string) => /[֐-׿]/.test(s);
const isGreek = (s: string) => /[Ͱ-Ͽ]/.test(s);

/** Transliteração para leitura fácil. Retorna "" se não for hebraico/grego. */
export function transliterate(original?: string | null): string {
  if (!original) return "";
  const s = original.trim();
  if (isHebrew(s)) return translitHebrew(s);
  if (isGreek(s)) return translitGreek(s);
  return "";
}
