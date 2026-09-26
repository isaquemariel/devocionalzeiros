import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Devocionalzeiro, type Expressao, type Gesto } from "./Devocionalzeiro";
import { Balao } from "@/components/jornada/Balao";
import { EVENTO_CELEBRAR, type MotivoCelebracao, type PedidoCelebracao } from "@/lib/celebrar";
import { EVENTO_AVISO, type PedidoAviso, type TipoAviso } from "@/lib/avisos";
import { definirCentroAtivo, donoDoPalco, useVersaoDoPalco } from "@/lib/devocionalzeiro/palco";
import { JEITO, tempoDeLeitura } from "@/lib/devocionalzeiro/jeitoDoAviso";

/**
 * O PALCO DO DEVOCIONALZEIRO — o único lugar onde ele aparece por conta
 * própria no app. É ele quem COMEMORA (no lugar do confete, `lib/celebrar`) e
 * quem AVISA (no lugar dos toasts, `lib/avisos`).
 *
 * O balão SEMPRE sai dele: fica logo acima da cabeça, com o rabicho apontando
 * para a chama — como os balões das pessoas na cena viva do RPG. Nada de caixa
 * solta no canto da tela.
 *
 * Tamanhos da comemoração, conforme o peso do que aconteceu:
 * - PEQUENA (um capítulo lido) e MÉDIA (plano traçado, conquista): ele sobe no
 *   rodapé, comemora e diz a frase;
 * - GRANDE (a leitura do dia, o devocional): a tela escurece, uma luz dourada
 *   abre atrás dele, ele dá uma pirueta e a chama sobe alta.
 *
 * Os avisos usam o mesmo rodapé, com a cara do que aconteceu: sorri e vibra no
 * sucesso, coça a cabeça no erro, aponta na dica, se espanta no alerta.
 *
 * Um aviso de sucesso que chega junto de uma comemoração (o "+1 ponto!
 * Gênesis 2 marcado como lido" do capítulo) vira a FALA dela — um personagem
 * só, dizendo a coisa certa, em vez de dois balões brigando.
 *
 * E o palco é de um só (`lib/devocionalzeiro/palco`): se a tela já tem o
 * personagem em cena (tela inicial, login, carregamento), é ele quem diz o
 * aviso, ou o aviso espera ela sair. Nunca dois bonecos ao mesmo tempo.
 */

type Tamanho = "pequena" | "media" | "grande";

interface Cena {
  tamanho: Tamanho;
  gesto: Gesto;
  falas: string[];
  titulo?: string;
  dura: number;
}

const CENAS: Record<MotivoCelebracao, Cena> = {
  capitulo: {
    tamanho: "pequena", gesto: "comemorar", dura: 2600,
    falas: ["Mais um capítulo!", "Capítulo lido!", "A chama cresceu!", "Isso! Mais um passo."],
  },
  "leitura-do-dia": {
    tamanho: "grande", gesto: "pirueta", dura: 5200, titulo: "Leitura do dia completa",
    falas: [
      "Leitura do dia feita! Hoje a chama ardeu bonito.",
      "Dia cumprido! Lâmpada para os meus pés é tua palavra.",
      "Tudo lido por hoje! Amanhã tem mais estrada.",
    ],
  },
  "plano-criado": {
    tamanho: "media", gesto: "vitoria", dura: 3800,
    falas: ["Plano traçado! Bora caminhar juntos.", "Caminho escolhido. Eu levo a lamparina!"],
  },
  devocional: {
    tamanho: "grande", gesto: "comemorar", dura: 5000, titulo: "Devocional concluído",
    falas: [
      "Amém! Tempo bem gasto com Deus.",
      "Devocional feito! Coração aquecido pro dia.",
      "Que bom começar assim. A chama tá forte!",
    ],
  },
  conquista: {
    tamanho: "media", gesto: "vitoria", dura: 3600,
    falas: ["Conquista resgatada! Tá brilhando, hein?", "Mais uma conquista na bagagem!"],
  },
};

const PESO: Record<Tamanho, number> = { pequena: 0, media: 1, grande: 2 };
const sortear = (l: string[]) => l[Math.floor(Math.random() * l.length)];
type Festa = { id: number; tipo: "festa"; motivo: MotivoCelebracao; fala: string; detalhe?: string; desde: number };
type Aviso = { id: number; tipo: "aviso"; aviso: TipoAviso; fala: string; detalhe?: string; acao?: PedidoAviso["acao"]; dura: number; desde: number };
type Item = Festa | Aviso;

/** na fila de espera há mais de 30 s, o aviso já não é notícia: cai */
const VALIDADE_NA_FILA = 30_000;

export function Comemoracao() {
  const [ativo, setAtivoEstado] = useState<Item | null>(null);
  const ativoRef = useRef<Item | null>(null);
  const fila = useRef<Item[]>([]);
  const seq = useRef(0);
  const versaoPalco = useVersaoDoPalco();

  // Tudo o que decide a fila vive em refs e em funções estáveis: antes as
  // decisões moravam dentro de `setAtivo((a) => …)` com efeitos colaterais
  // (mexer na fila, somar o contador) — updater tem de ser puro, e o React
  // pode repeti-lo.
  const ops = useRef({
    fresco: (p: Item) => Date.now() - p.desde < VALIDADE_NA_FILA,
    /** "no ar" = falando OU esperando na fila: o boneco do canto fica fora de cena */
    marcarCentro: () => {
      queueMicrotask(() => definirCentroAtivo(!!ativoRef.current || fila.current.some(ops.current.fresco)));
    },
    setAtivo: (i: Item | null) => {
      ativoRef.current = i;
      setAtivoEstado(i);
      ops.current.marcarCentro();
    },
    proximo: (): Item | null => {
      while (fila.current.length) {
        const p = fila.current.shift()!;
        if (ops.current.fresco(p)) return { ...p, desde: Date.now() };
      }
      return null;
    },
    /** palco livre e ninguém falando: sobe o próximo da fila (depois da troca) */
    puxarSeLivre: () => {
      window.setTimeout(() => {
        if (donoDoPalco() || ativoRef.current) return;
        const p = ops.current.proximo();
        if (p) ops.current.setAtivo(p);
        else ops.current.marcarCentro();
      }, 350);
    },
    enfileirar: (i: Item, frente = false) => {
      if (frente) fila.current.unshift(i); else fila.current.push(i);
      // teto de 5: sai o mais velho que NÃO é erro (erro não se perde calado)
      while (fila.current.length > 5) {
        const k = fila.current.findIndex((x) => !(x.tipo === "aviso" && x.aviso === "erro"));
        fila.current.splice(k >= 0 ? k : 0, 1);
      }
      ops.current.marcarCentro();
      // quando ele vencer na fila, o boneco do canto tem de poder voltar
      window.setTimeout(ops.current.marcarCentro, VALIDADE_NA_FILA + 50);
      ops.current.puxarSeLivre();
    },
  });

  useEffect(() => () => definirCentroAtivo(false), []);

  // alguém pôs o personagem em cena (ou tirou): o palco central cede ou volta
  useEffect(() => {
    const o = ops.current;
    if (donoDoPalco()) {
      const a = ativoRef.current;
      if (a) { fila.current.unshift({ ...a, desde: Date.now() }); o.setAtivo(null); }
    } else if (!ativoRef.current) {
      o.puxarSeLivre();
    }
  }, [versaoPalco]);

  useEffect(() => {
    const o = ops.current;
    const aoCelebrar = (e: Event) => {
      const p = (e as CustomEvent<PedidoCelebracao>).detail;
      if (!p || !CENAS[p.motivo]) return;
      const cena = CENAS[p.motivo];
      const nova: Festa = { id: ++seq.current, tipo: "festa", motivo: p.motivo, fala: p.fala || sortear(cena.falas), desde: Date.now() };
      // palco ocupado por outra tela: a festa espera a vez
      if (donoDoPalco()) { o.enfileirar(nova); return; }
      const a = ativoRef.current;
      if (!a) { o.setAtivo(nova); return; }
      // o aviso de sucesso que acabou de chegar vira a fala da festa — no MESMO
      // palco (mesmo id): sem um segundo boneco entrando por cima do primeiro
      if (a.tipo === "aviso" && a.aviso === "sucesso" && !a.acao && Date.now() - a.desde < 1200) {
        o.setAtivo(cena.tamanho === "grande" ? { ...nova, id: a.id, detalhe: a.fala } : { ...nova, id: a.id, fala: a.fala, detalhe: a.detalhe });
        return;
      }
      if (a.tipo === "aviso") { o.enfileirar(nova, true); return; }
      // o capítulo que fecha o dia dispara "capítulo" e, logo depois,
      // "leitura do dia": a maior toma o lugar da menor (no mesmo palco)
      if (PESO[cena.tamanho] > PESO[CENAS[a.motivo].tamanho]) { o.setAtivo({ ...nova, id: a.id }); return; }
      if (p.motivo === a.motivo) return;
      o.enfileirar(nova);
    };
    const aoAvisar = (e: Event) => {
      const p = (e as CustomEvent<PedidoAviso>).detail;
      if (!p?.texto) return;
      const novo: Aviso = {
        id: ++seq.current, tipo: "aviso", aviso: p.tipo, fala: p.texto, detalhe: p.detalhe, acao: p.acao,
        dura: p.duracao ? Math.min(12000, Math.max(2500, p.duracao)) : tempoDeLeitura(p.texto, p.detalhe, !!p.acao),
        desde: Date.now(),
      };
      // aviso da PRÓXIMA tela: vai para a fila e espera ela abrir
      if (p.naProximaTela) { o.enfileirar(novo); return; }
      // a tela que já tem o personagem em cena diz o aviso pela boca dele
      const dono = donoDoPalco();
      if (dono?.falar?.(p)) return;
      // (o carregamento, a jornada): espera ela sair
      if (dono) { o.enfileirar(novo); return; }
      const a = ativoRef.current;
      if (!a) { o.setAtivo(novo); return; }
      // o sucesso que chega junto da festa vira a fala dela
      // (um aviso com botão — "Resgatar" — nunca se funde: o botão sumiria)
      if (a.tipo === "festa" && p.tipo === "sucesso" && !p.acao && Date.now() - a.desde < 1200) {
        o.setAtivo(CENAS[a.motivo].tamanho === "grande" ? { ...a, detalhe: p.texto } : { ...a, fala: p.texto, detalhe: p.detalhe });
        return;
      }
      if (a.tipo === "aviso") {
        // um ERRO ou um aviso com BOTÃO não é atropelado: o novo espera a vez
        // (antes "o mais novo ganha" apagava o erro de salvar e o "Resgatar")
        if (a.aviso === "erro" || a.acao) { o.enfileirar(novo, novo.aviso === "erro" || !!novo.acao); return; }
        o.setAtivo(novo);
        return;
      }
      o.enfileirar(novo);
    };
    window.addEventListener(EVENTO_CELEBRAR, aoCelebrar);
    window.addEventListener(EVENTO_AVISO, aoAvisar);
    return () => {
      window.removeEventListener(EVENTO_CELEBRAR, aoCelebrar);
      window.removeEventListener(EVENTO_AVISO, aoAvisar);
    };
  }, []);

  /** o palco que acabou é ESTE? (um palco saindo não derruba o que entrou) */
  const encerrar = useCallback((id: number) => {
    if (ativoRef.current?.id !== id) return;
    ops.current.setAtivo(null);
    // o próximo entra depois que este saiu de cena (se o palco estiver livre)
    ops.current.puxarSeLivre();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {/* quando o aviso vira a fala da festa, o mesmo palco segue e o balão reescreve */}
      {ativo && <Palco key={ativo.id} item={ativo} onFim={() => encerrar(ativo.id)} />}
    </AnimatePresence>
  );
}

type Tempo = "chega" | "reage" | "festa" | "tchau";

function Palco({ item, onFim }: { item: Item; onFim: () => void }) {
  const reduzir = useReducedMotion();
  const festa = item.tipo === "festa" ? CENAS[item.motivo] : null;
  const dura = item.tipo === "festa" ? CENAS[item.motivo].dura : item.dura;
  const [tempo, setTempo] = useState<Tempo>("chega");
  const [pulso, setPulso] = useState(0);
  const [falando, setFalando] = useState(false);
  const fim = useRef(onFim);
  fim.current = onFim;

  useEffect(() => {
    const ts = [
      window.setTimeout(() => { setPulso((p) => p + 1); setTempo("reage"); }, reduzir ? 0 : 380), // aterrissa
      window.setTimeout(() => setTempo("festa"), reduzir ? 0 : festa ? 700 : 1500),
      window.setTimeout(() => setTempo("tchau"), dura - 900),
      window.setTimeout(() => fim.current(), dura),
    ];
    return () => ts.forEach(clearTimeout);
  }, [dura, reduzir, festa]);

  let expressao: Expressao, gesto: Gesto, chama: number;
  if (festa) {
    expressao = tempo === "chega" ? "feliz" : tempo === "reage" ? "surpreso" : tempo === "festa" ? "radiante" : "feliz";
    gesto = tempo === "festa" ? festa.gesto : tempo === "tchau" ? "acenar" : "parado";
    // a chama é o placar da festa: sobe no auge e assenta na despedida
    chama = tempo === "festa" ? (festa.tamanho === "grande" ? 1 : 0.85) : tempo === "tchau" ? 0.55 : 0.4;
  } else {
    const j = JEITO[(item as Aviso).aviso];
    expressao = j.expressao;
    gesto = tempo === "reage" ? j.gesto : tempo === "tchau" ? "acenar" : j.depois;
    chama = j.chama;
  }
  const mostrarBalao = tempo !== "chega";
  const acao = item.tipo === "aviso" ? item.acao : undefined;

  /** o boneco, com o balão SAINDO dele: logo acima da cabeça, rabicho na chama */
  const falaComBoneco = (tamanho: number, centro: boolean) => {
    const H = (tamanho * 229) / 205;
    // a ponta do rabicho (15 px abaixo do balão) mira ~22% abaixo do topo da
    // caixa dele — a chama e o alto da cabeça
    // quanto mais alta a chama, mais acima fica o balão (a ponta mira o topo dela)
    const sobre = Math.round(H * (0.26 - Math.min(1, chama) * 0.16));
    return (
      <div className={`flex flex-col ${centro ? "items-center" : "items-start"}`}>
        <div
          className={`relative w-full ${centro ? "max-w-[340px]" : "max-w-[min(330px,calc(100vw-24px))]"}`}
          style={{ marginBottom: -sobre + 15, minHeight: 1 }}
        >
          <AnimatePresence>
            {mostrarBalao && (
              <motion.div
                initial={reduzir ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
                style={{ transformOrigin: centro ? "50% 100%" : `${Math.round(tamanho * 0.52)}px 100%` }}
              >
                <Balao
                  texto={item.fala}
                  detalhe={item.detalhe}
                  acao={acao ? { rotulo: acao.rotulo, onClick: () => { acao.onClick(); fim.current(); } } : undefined}
                  onFalando={setFalando}
                  onAvancar={() => fim.current()}
                  rabicho={centro ? "centro" : "esquerda"}
                  ponta={centro ? undefined : Math.round(tamanho * 0.517)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative">
          {/* uma luz azul atrás dele, que cresce com a chama */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[34%] h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, #5b9bff55 0%, #5b9bff00 62%)" }}
            animate={{ opacity: tempo === "festa" ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
          />
          <Devocionalzeiro
            tamanho={tamanho} expressao={expressao} gesto={gesto} chama={chama} pulso={pulso} falando={falando}
            olhar={tempo === "reage" && festa ? { x: 0, y: -0.6 } : null}
          />
        </div>
      </div>
    );
  };

  if (festa?.tamanho === "grande") {
    return (
      <motion.div
        data-palco-central=""
        className="rpg-root fixed inset-0 z-[200] flex items-center justify-center px-6"
        style={{ background: "rgba(5,7,12,0.82)", backdropFilter: "blur(3px)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }}
        onClick={() => fim.current()}
      >
        <div className="relative flex w-full max-w-[340px] flex-col items-center">
          {/* a luz que abre atrás dele (o giro fica no filho: o framer-motion
              reescreve o transform e apagaria o translate que centra) */}
          <div className="pointer-events-none absolute left-1/2 top-[68%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="h-full w-full rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent 0 6%, #ffd88933 8% 11%, transparent 13% 22%, #ffd88926 24% 27%, transparent 29% 38%, #ffd88933 40% 43%, transparent 45% 55%, #ffd88926 57% 60%, transparent 62% 71%, #ffd88933 73% 76%, transparent 78% 88%, #ffd88926 90% 93%, transparent 95%)",
                maskImage: "radial-gradient(circle, #000 18%, transparent 68%)",
                WebkitMaskImage: "radial-gradient(circle, #000 18%, transparent 68%)",
              }}
              initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
              animate={{ opacity: tempo === "festa" || tempo === "tchau" ? 1 : 0.4, scale: 1, rotate: reduzir ? 0 : 60 }}
              transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.8 }, rotate: { duration: 6, ease: "linear" } }}
            />
          </div>

          {festa.titulo && (
            <motion.p
              className="relative mb-3 text-center text-[11px] font-extrabold uppercase tracking-[0.2em]"
              style={{ color: "#ffd889" }}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: mostrarBalao ? 1 : 0, y: 0 }} transition={{ delay: 0.3 }}
            >
              {festa.titulo}
            </motion.p>
          )}

          <motion.div
            className="relative w-full"
            initial={reduzir ? { opacity: 0 } : { y: 260, scale: 0.8 }}
            animate={reduzir ? { opacity: 1 } : { y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 17 }}
          >
            {falaComBoneco(172, true)}
          </motion.div>

          <motion.p
            className="relative mt-4 text-[10.5px] font-bold uppercase tracking-[0.14em]"
            style={{ color: "#9c8b68" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          >
            Toque para continuar
          </motion.p>
        </div>
      </motion.div>
    );
  }

  // Toda aparição dele é NO CENTRO da tela — nunca no rodapé ou no topo. Sem
  // fundo escuro (só a festa grande escurece): a tela segue tocável em volta,
  // e só o boneco com o balão recebe o toque (que o dispensa).
  const tamanho = festa ? (festa.tamanho === "pequena" ? 104 : 124) : 112;
  return (
    <div data-palco-central="" className="rpg-root pointer-events-none fixed inset-0 z-[200] flex items-center justify-center px-4" style={{ background: "transparent" }}>
      {/* um halo suave atrás dele, para ler sobre qualquer tela */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(5,7,12,0.55) 0%, rgba(5,7,12,0.25) 45%, transparent 70%)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      />
      <motion.div
        className="pointer-events-auto relative w-full max-w-[340px]"
        initial={reduzir ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: 40 }}
        animate={reduzir ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={reduzir ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 30, transition: { duration: 0.25, ease: "easeIn" } }}
        transition={{ type: "spring", stiffness: 340, damping: 18 }}
        onClick={() => fim.current()}
      >
        {falaComBoneco(tamanho, true)}
      </motion.div>
    </div>
  );
}
