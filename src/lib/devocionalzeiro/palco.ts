import { useEffect, useRef, useSyncExternalStore } from "react";
import type { PedidoAviso } from "@/lib/avisos";

/**
 * O PALCO É DE UM SÓ — nunca dois Devocionalzeiros na tela.
 *
 * O personagem aparece sozinho (`Comemoracao`: avisos e festas no centro da
 * tela), mas algumas telas JÁ o têm em cena: a tela inicial, o login, o
 * carregamento. Se o aviso subisse por cima delas, eram dois bonecos, um em
 * cima do outro — foi o que aconteceu com o "Bem-vindo de volta!" ao entrar.
 *
 * Então a tela que tem o personagem OCUPA o palco:
 * - com `falar`, é o boneco DELA que diz o aviso (no balão dele), e o palco
 *   central não sobe; `falar` devolve `true` quando cuidou do aviso;
 * - sem `falar` (o carregamento), o aviso ESPERA e sobe quando ela sai.
 *
 * Vale o último que ocupou (quem abre um carregamento por cima da tela
 * inicial é quem manda até sair).
 */

export interface DonoDoPalco {
  falar?: (aviso: PedidoAviso) => boolean;
}

const donos: DonoDoPalco[] = [];
const ouvintes = new Set<() => void>();
let versao = 0;
const avisar = () => { versao++; ouvintes.forEach((f) => f()); };

export function ocuparPalco(dono: DonoDoPalco): () => void {
  donos.push(dono);
  avisar();
  return () => {
    const i = donos.lastIndexOf(dono);
    if (i >= 0) donos.splice(i, 1);
    avisar();
  };
}

/** quem está com o personagem em cena agora (ou `null`: o palco central é livre) */
export function donoDoPalco(): DonoDoPalco | null {
  return donos.length ? donos[donos.length - 1] : null;
}

const assinar = (f: () => void) => { ouvintes.add(f); return () => { ouvintes.delete(f); }; };

/** muda sempre que alguém ocupa ou libera o palco */
export function useVersaoDoPalco(): number {
  return useSyncExternalStore(assinar, () => versao, () => 0);
}

/**
 * A tela que já mostra o personagem chama isto enquanto está montada. `falar`
 * pode mudar a cada render: vale sempre o mais recente.
 */
export function useOcuparPalco(falar?: (aviso: PedidoAviso) => boolean, ativo = true): void {
  const ref = useRef(falar);
  ref.current = falar;
  const temFala = !!falar;
  useEffect(() => {
    if (!ativo) return;
    return ocuparPalco(temFala ? { falar: (a) => ref.current?.(a) ?? false } : {});
  }, [ativo, temFala]);
}

// ─── o palco CENTRAL (a `Comemoracao`) no ar ────────────────────────────────
// Quando ele sobe no meio da tela para avisar ou comemorar, os bonecos fixos
// das telas (o que se arrasta na home, o do cabeçalho) saem de cena até ele
// descer — o mesmo personagem não aparece em dois lugares ao mesmo tempo.
let centroAtivo = false;
const ouvintesCentro = new Set<() => void>();

export function definirCentroAtivo(ativo: boolean): void {
  if (ativo === centroAtivo) return;
  centroAtivo = ativo;
  ouvintesCentro.forEach((f) => f());
}

const assinarCentro = (f: () => void) => { ouvintesCentro.add(f); return () => { ouvintesCentro.delete(f); }; };

/** `true` enquanto o personagem está no meio da tela (aviso ou festa) */
export function useCentroAtivo(): boolean {
  return useSyncExternalStore(assinarCentro, () => centroAtivo, () => false);
}
