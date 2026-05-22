import { useEffect } from "react";

/**
 * Força o tema escuro enquanto a página está montada (sem alterar
 * a preferência salva do usuário no next-themes). Usado nas páginas
 * que antecedem o app (Auth, Landing, EscolherPlano, etc.) que
 * sempre devem aparecer no tema escuro.
 */
export function useForcedDarkTheme() {
  useEffect(() => {
    const html = document.documentElement;
    const hadDark = html.classList.contains("dark");
    html.classList.add("dark");
    return () => {
      if (!hadDark) html.classList.remove("dark");
    };
  }, []);
}
