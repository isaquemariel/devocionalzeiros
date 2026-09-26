import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { equipToLook, getEquip, syncCosmeticsFromDB } from "@/lib/rpgRewards";
import { EVENTO_VISUAL, definirVisual } from "@/lib/devocionalzeiro/visual";

/**
 * Mantém o visual do Devocionalzeiro do app igual ao do RPG.
 *
 * - ao entrar: lê o que está equipado neste aparelho na hora, e em seguida
 *   busca a escolha salva na conta (outro aparelho, cache limpo);
 * - ao trocar de peça no guarda-roupa (nesta aba: o evento `dz:visual`; em
 *   outra aba: o `storage` do navegador), atualiza em todo lugar;
 * - ao sair: volta ao Devocionalzeiro padrão.
 *
 * O guarda-roupa só grava o que a pessoa possui, então o equipamento salvo
 * já vem filtrado.
 */
export function SincronizaVisual() {
  const { user } = useAuth();
  const uid = user?.id;

  useEffect(() => {
    if (!uid) { definirVisual(null); return; }
    const ler = () => definirVisual(equipToLook(getEquip(uid)));
    ler();
    let vivo = true;
    syncCosmeticsFromDB(uid).then(() => { if (vivo) ler(); });
    const aoTrocar = () => ler();
    const aoStorage = (e: StorageEvent) => { if (!e.key || e.key === `rpg_equip_${uid}`) ler(); };
    window.addEventListener(EVENTO_VISUAL, aoTrocar);
    window.addEventListener("storage", aoStorage);
    return () => {
      vivo = false;
      window.removeEventListener(EVENTO_VISUAL, aoTrocar);
      window.removeEventListener("storage", aoStorage);
    };
  }, [uid]);

  return null;
}
