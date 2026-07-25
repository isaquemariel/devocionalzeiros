// ============================================================================
// Proteção de dados sensíveis no chat (LGPD).
// Detecta e MASCARA e-mail, telefone e CPF ANTES de transmitir — o dado nunca
// sai do dispositivo em claro. Também é aplicado ao RECEBER (defesa em
// profundidade, caso outro cliente não tenha mascarado). É um filtro por
// padrões (rápido, roda a cada mensagem); pode evoluir para IA no futuro.
// ============================================================================

const MASK = "•••••";

// e-mail
const RE_EMAIL = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
// CPF (com ou sem pontuação): 000.000.000-00
const RE_CPF = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;
// telefone: sequências com muitos dígitos (com +, espaços, () e -). Ex.:
// (84) 99948-8698 / 84999488698 / +55 84 99948-8698
const RE_PHONE = /\+?\(?\d[\d\s().-]{7,}\d/g;

// conta dígitos de um trecho
const digitCount = (s: string) => (s.match(/\d/g) || []).length;

/**
 * Mascara dados sensíveis (e-mail, CPF, telefone) num texto de chat.
 * Retorna o texto seguro para exibir/transmitir.
 */
export function maskSensitive(input: string): string {
  if (!input) return input;
  let out = input;

  // e-mail e CPF são inequívocos → mascara direto
  out = out.replace(RE_EMAIL, MASK);
  out = out.replace(RE_CPF, MASK);

  // telefone: só mascara trechos com 8+ dígitos E que tenham um bloco de 4+
  // dígitos seguidos (telefone real). Evita mascarar "1 2 3 4 5 6 7 8",
  // "Salmo 23", "10 min", listas de versículos etc.
  out = out.replace(RE_PHONE, (m) => (digitCount(m) >= 8 && /\d{4,}/.test(m) ? MASK : m));

  return out;
}

/** Diz se o texto contém algo que seria mascarado (para avisar o usuário). */
export function hasSensitive(input: string): boolean {
  return !!input && maskSensitive(input) !== input;
}
