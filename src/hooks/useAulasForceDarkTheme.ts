import { useEffect } from "react";

/**
 * Força tema escuro na área de membros (/aulas) independentemente da
 * preferência global do usuário, e restaura ao desmontar.
 */
export function useAulasForceDarkTheme() {
  useEffect(() => {
    const html = document.documentElement;
    const hadDark = html.classList.contains("dark");
    const hadLight = html.classList.contains("light");
    const prevColorScheme = html.style.colorScheme;
    html.classList.remove("light");
    html.classList.add("dark");
    html.style.colorScheme = "dark";
    return () => {
      if (!hadDark) html.classList.remove("dark");
      if (hadLight) html.classList.add("light");
      html.style.colorScheme = prevColorScheme;
    };
  }, []);
}
