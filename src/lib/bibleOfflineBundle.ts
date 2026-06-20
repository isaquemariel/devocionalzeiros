// Offline bundle da Bíblia (ACF/ARC — Almeida Corrigida).
// Carregado uma única vez do arquivo estático /bible/arc.json e mantido em memória.
// Garante que QUALQUER capítulo da ARC abra mesmo sem internet ou quando a API falhar.

export interface OfflineVerse { n: number; t: string }
interface OfflineBundle { [bookId: string]: { chapters: OfflineVerse[][] } }

let bundle: OfflineBundle | null = null;
let inflight: Promise<OfflineBundle | null> | null = null;

async function loadBundle(): Promise<OfflineBundle | null> {
  if (bundle) return bundle;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const res = await fetch('/bible/arc.json', { cache: 'force-cache' });
      if (!res.ok) return null;
      bundle = await res.json();
      return bundle;
    } catch (e) {
      console.warn('[bible-offline] falha ao carregar bundle:', e);
      return null;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

// Disparar pré-carregamento em background (chamado ao entrar na Bíblia).
export function preloadOfflineBible(): void {
  loadBundle();
}

// Buscar capítulo do bundle offline (síncrono se já carregado).
export async function getOfflineChapter(
  bookId: string,
  chapter: number,
): Promise<OfflineVerse[] | null> {
  const b = await loadBundle();
  const ch = b?.[bookId]?.chapters?.[chapter - 1];
  if (!ch || ch.length === 0) return null;
  return ch;
}

export function isOfflineBundleReady(): boolean {
  return bundle !== null;
}
