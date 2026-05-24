/**
 * @deprecated Não force mais o tema escuro em páginas específicas.
 *
 * Regra do produto: o tema padrão é escuro (definido globalmente no
 * ThemeProvider). O tema só muda quando o próprio usuário troca nas
 * configurações, e essa escolha deve ser respeitada em todas as páginas,
 * inclusive landing, auth e checkout.
 *
 * Mantido como no-op para preservar imports existentes sem quebrar o build.
 */
export function useForcedDarkTheme() {
  // intencionalmente vazio — respeita a preferência do usuário
}
