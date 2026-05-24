import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Força o tema escuro enquanto a página está montada e restaura
 * a preferência salva do usuário ao desmontar. Usado nas páginas
 * que antecedem o app (Auth, Landing, EscolherPlano, etc.) que
 * sempre devem aparecer no tema escuro.
 */
export function useForcedDarkTheme() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const previous = theme;
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");

    return () => {
      // Restaura a preferência real do usuário ao sair da página
      if (previous && previous !== "dark") {
        setTheme(previous);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
