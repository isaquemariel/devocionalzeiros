import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { equipToLook, getEquip, syncCosmeticsFromDB } from "@/lib/rpgRewards";
import { EVENTO_VISUAL, definirVisual, paraOApp } from "@/lib/devocionalzeiro/visual";
import { lembrarQuemVolta } from "@/lib/devocionalzeiro/quemVolta";

/**
 * Mantém o visual do Devocionalzeiro do app igual ao do RPG.
 *
 * - ao entrar: lê o que está equipado neste aparelho na hora, e em seguida
 *   busca a escolha salva na conta (outro aparelho, cache limpo);
 * - ao trocar de peça no guarda-roupa (nesta aba: o evento `dz:visual`; em
 *   outra aba: o `storage` do navegador), atualiza em todo lugar;
 * - ao sair: volta ao Devocionalzeiro padrão.
 *
 * Quando há algo equipado, o boneco vestido (canvas) é baixado NA HORA: sem
 * isso, cada tela o mostrava primeiro sem roupa e trocava no meio da animação.
 * E guarda o primeiro nome de quem entrou (`quemVolta`), para a tela inicial
 * a receber pelo nome quando ela voltar.
 *
 * O guarda-roupa só grava o que a pessoa possui, então o equipamento salvo
 * já vem filtrado.
 */
export function SincronizaVisual() {
  const { user, profile } = useAuth();
  const uid = user?.id;
  const nome = profile?.full_name;

  useEffect(() => { if (uid) lembrarQuemVolta(uid, nome); }, [uid, nome]);

  useEffect(() => {
    if (!uid) { definirVisual(null); return; }
    let vez = 0;
    const ler = () => {
      const look = equipToLook(getEquip(uid));
      const minha = ++vez;
      // veste só quando o desenho vestido já baixou: uma troca, no lugar de
      // "sem roupa → carregando → vestido" no meio da animação
      if (paraOApp(look)) import("./DevocionalzeiroVestido").then(() => { if (vivo && minha === vez) definirVisual(look); }, () => { if (vivo && minha === vez) definirVisual(look); });
      else definirVisual(look);
    };
    let vivo = true;
    ler();
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
