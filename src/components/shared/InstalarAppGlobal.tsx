import { lazy, Suspense, useEffect, useState } from "react";

const InstallAppModal = lazy(() => import("@/components/shared/InstallAppModal"));

/**
 * O "Baixe o app" em QUALQUER tela. O modal morava só na home: nas
 * configurações abertas de outra página, o botão de baixar não fazia nada.
 * Qualquer lugar pede com o evento `open-install-modal`.
 */
export function InstalarAppGlobal() {
  const [aberto, setAberto] = useState(false);
  useEffect(() => {
    const abrir = () => setAberto(true);
    window.addEventListener("open-install-modal", abrir);
    return () => window.removeEventListener("open-install-modal", abrir);
  }, []);
  if (!aberto) return null;
  return (
    <Suspense fallback={null}>
      <InstallAppModal isOpen={aberto} onClose={() => setAberto(false)} />
    </Suspense>
  );
}
