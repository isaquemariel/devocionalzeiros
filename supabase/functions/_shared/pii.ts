// Helpers para redigir dados pessoais (PII) antes de logar — conformidade LGPD.
// Logs são retidos; e-mail, telefone e CPF não devem aparecer em texto puro.

export function redactEmail(email?: string | null): string {
  if (!email) return "(vazio)";
  const s = String(email);
  const at = s.indexOf("@");
  if (at <= 0) return "***";
  const domain = s.slice(at + 1);
  return `${s[0]}***@${domain}`;
}

export function redactPhone(phone?: string | null): string {
  if (!phone) return "(vazio)";
  const s = String(phone).replace(/\D/g, "");
  return s.length <= 4 ? "***" : `***${s.slice(-4)}`;
}
