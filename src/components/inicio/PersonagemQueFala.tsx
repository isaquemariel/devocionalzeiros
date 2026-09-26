import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Devocionalzeiro, type Gesto } from "@/components/devocionalzeiro/Devocionalzeiro";
import { Balao } from "@/components/jornada/Balao";
import type { PedidoAviso } from "@/lib/avisos";
import { useOcuparPalco } from "@/lib/devocionalzeiro/palco";
import { JEITO, tempoDeLeitura } from "@/lib/devocionalzeiro/jeitoDoAviso";

/**
 * O personagem de uma tela que já o tem em cena (o login) — e que, por isso,
 * é quem DIZ os avisos dela: "senha incorreta", "confirme seu e-mail"… O balão
 * sai dele, para baixo (ele fica no alto da tela), e o palco central não sobe
 * um segundo boneco (`lib/devocionalzeiro/palco`).
 *
 * `registrar` diz se é ESTE o boneco que fala agora (no computador, o do painel
 * ao lado; no celular, o do alto do formulário — nunca os dois).
 */
export function PersonagemQueFala({
  tamanho, gestoBase = "acenar", registrar, largura = 300,
}: { tamanho: number; gestoBase?: Gesto; registrar: boolean; largura?: number }) {
  const reduzir = useReducedMotion();
  const [fala, setFala] = useState<(PedidoAviso & { chave: number }) | null>(null);
  const [falando, setFalando] = useState(false);
  const [pulso, setPulso] = useState(0);
  const [reagindo, setReagindo] = useState(false);

  useOcuparPalco((aviso) => {
    setFala({ ...aviso, chave: Date.now() });
    setPulso((p) => p + 1);
    return true;
  }, registrar);

  useEffect(() => {
    if (!fala) return;
    setReagindo(true);
    const a = window.setTimeout(() => setReagindo(false), 1600);
    const b = window.setTimeout(() => setFala(null), fala.duracao ?? tempoDeLeitura(fala.texto, fala.detalhe, !!fala.acao));
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, [fala]);

  const jeito = fala ? JEITO[fala.tipo] : null;
  return (
    <div className="relative inline-block">
      <Devocionalzeiro
        tamanho={tamanho}
        gesto={jeito ? (reagindo ? jeito.gesto : jeito.depois) : gestoBase}
        expressao={jeito?.expressao ?? "feliz"}
        chama={jeito?.chama ?? 0.5}
        pulso={pulso}
        falando={falando}
      />
      <AnimatePresence>
        {fala && (
          <div className="absolute left-1/2 top-full z-30 mt-3 -translate-x-1/2" style={{ width: largura }}>
            <motion.div
              key={fala.chave}
              initial={reduzir ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              style={{ transformOrigin: "50% 0%" }}
            >
              <Balao
                texto={fala.texto}
                detalhe={fala.detalhe}
                rabicho="cima"
                onFalando={setFalando}
                onAvancar={() => setFala(null)}
                acao={fala.acao ? { rotulo: fala.acao.rotulo, onClick: () => { fala.acao?.onClick(); setFala(null); } } : undefined}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
