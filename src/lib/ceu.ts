/**
 * O CÉU DO APP — dia e noite de verdade, pelo relógio de quem abre.
 *
 * Quem entra de manhã vê a manhã; ao meio-dia, o céu alto; no fim da tarde, o
 * pôr do sol dourando as pedras de Jerusalém; à noite, estrelas, a lua na fase
 * certa do dia e as janelas acesas. E o céu ANDA: quem fica na tela vê a luz
 * mudar (a tela pede um novo `momentoDoDia` a cada meio minuto).
 *
 * Tudo sai de uma função pura da hora: as cores são interpoladas entre
 * "paradas" do dia (madrugada, aurora, nascer, manhã, meio-dia, tarde, pôr do
 * sol, crepúsculo, noite), então não há salto entre uma fase e outra.
 *
 * Os fundos que seguem o dia (a tela inicial, o login) leem daqui.
 */

export type Fase = "madrugada" | "manha" | "tarde" | "noite";

export interface Momento {
  /** a hora, em horas decimais (13,5 = 13h30) */
  hora: number;
  fase: Fase;
  ceu: { topo: string; meio: string; horizonte: string };
  /** 0 = noite fechada, 1 = dia pleno — clareia pedras, casas, chão */
  luz: number;
  /** 0..1 — a luz dourada do nascer e do pôr do sol */
  calor: number;
  /** 0..1 — quanto as estrelas aparecem */
  estrelas: number;
  /** 0..1 — quantas janelas e lamparinas estão acesas */
  janelas: number;
  /** o sol: x e altura em 0..1 (altura 0 = horizonte); `visivel` só de dia */
  sol: { x: number; altura: number; visivel: boolean };
  /** a lua: x, altura, e a fase (0 = nova, 0,5 = cheia, 1 = nova de novo) */
  lua: { x: number; altura: number; visivel: boolean; fase: number };
}

type Parada = { h: number; topo: string; meio: string; horizonte: string; luz: number; calor: number; estrelas: number; janelas: number };

// As paradas do dia. As horas seguem o céu do Brasil (sol ~6h às ~18h).
const PARADAS: Parada[] = [
  { h: 0, topo: "#060a1c", meio: "#0c1434", horizonte: "#18214a", luz: 0.1, calor: 0, estrelas: 1, janelas: 0.9 },
  { h: 4.4, topo: "#080d26", meio: "#141c44", horizonte: "#2a2a5c", luz: 0.12, calor: 0, estrelas: 0.9, janelas: 0.55 },
  { h: 5.4, topo: "#141a48", meio: "#433c78", horizonte: "#c9786e", luz: 0.3, calor: 0.55, estrelas: 0.45, janelas: 0.45 },
  { h: 6.2, topo: "#2f5596", meio: "#8ea6d0", horizonte: "#ffc98f", luz: 0.62, calor: 0.65, estrelas: 0.05, janelas: 0.15 },
  { h: 7.4, topo: "#3f7fc8", meio: "#86b8e6", horizonte: "#e7eef0", luz: 0.9, calor: 0.2, estrelas: 0, janelas: 0 },
  { h: 12, topo: "#3a84d6", meio: "#79bbef", horizonte: "#cfe7f6", luz: 1, calor: 0, estrelas: 0, janelas: 0 },
  { h: 15.8, topo: "#4581c8", meio: "#96bfe4", horizonte: "#f0dcb0", luz: 0.96, calor: 0.15, estrelas: 0, janelas: 0 },
  { h: 17.4, topo: "#394f95", meio: "#c9807a", horizonte: "#ffb25a", luz: 0.72, calor: 0.85, estrelas: 0.03, janelas: 0.25 },
  { h: 18.3, topo: "#1c2358", meio: "#553f7c", horizonte: "#d06f58", luz: 0.4, calor: 0.45, estrelas: 0.35, janelas: 0.7 },
  { h: 19.4, topo: "#0a112e", meio: "#172150", horizonte: "#2c3062", luz: 0.16, calor: 0.05, estrelas: 0.9, janelas: 1 },
  { h: 24, topo: "#060a1c", meio: "#0c1434", horizonte: "#18214a", luz: 0.1, calor: 0, estrelas: 1, janelas: 0.9 },
];

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const misturar = (a: string, b: string, k: number) => {
  const x = hex(a), y = hex(b);
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, "0")).join("")}`;
};
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
/** suaviza a passagem entre paradas (sem "quina" na cor) */
const suave = (k: number) => k * k * (3 - 2 * k);

/** fase da lua (0 nova · 0,5 cheia), pela data — mês sinódico de 29,53 dias */
export function faseDaLua(data: Date): number {
  const novaDeReferencia = Date.UTC(2000, 0, 6, 18, 14); // lua nova de 6/1/2000
  const dias = (data.getTime() - novaDeReferencia) / 86_400_000;
  const f = (dias / 29.530588853) % 1;
  return f < 0 ? f + 1 : f;
}

const NASCER = 6.0, POR = 18.0;

export function momentoDoDia(data: Date = new Date()): Momento {
  const hora = data.getHours() + data.getMinutes() / 60 + data.getSeconds() / 3600;
  let i = 0;
  while (i < PARADAS.length - 2 && hora >= PARADAS[i + 1].h) i++;
  const a = PARADAS[i], b = PARADAS[i + 1];
  const k = suave(Math.max(0, Math.min(1, (hora - a.h) / (b.h - a.h))));

  const u = (hora - NASCER) / (POR - NASCER);
  const sol = { x: 0.08 + 0.84 * u, altura: Math.max(0, Math.sin(Math.PI * u)), visivel: u > -0.02 && u < 1.02 };
  // a lua cruza a noite (das 18h30 às 5h30)
  const hn = hora < 12 ? hora + 24 : hora;
  const v = (hn - 18.5) / 11;
  const lua = { x: 0.1 + 0.8 * v, altura: Math.max(0, Math.sin(Math.PI * v)), visivel: v > 0 && v < 1, fase: faseDaLua(data) };

  const fase: Fase = hora < 5 ? "madrugada" : hora < 12 ? "manha" : hora < 18 ? "tarde" : "noite";
  return {
    hora, fase,
    ceu: { topo: misturar(a.topo, b.topo, k), meio: misturar(a.meio, b.meio, k), horizonte: misturar(a.horizonte, b.horizonte, k) },
    luz: lerp(a.luz, b.luz, k), calor: lerp(a.calor, b.calor, k),
    estrelas: lerp(a.estrelas, b.estrelas, k), janelas: lerp(a.janelas, b.janelas, k),
    sol, lua,
  };
}

/** uma cor de pedra/casa na luz do momento: noite azulada → dia dourado, com o calor do pôr do sol */
export function naLuz(m: Momento, dia: string, noite: string, quente = "#ff9f5a"): string {
  const base = misturar(noite, dia, m.luz);
  return misturar(base, quente, m.calor * 0.28);
}

// ─── o que o Devocionalzeiro diz em cada hora ───────────────────────────────
/** Versículos da ARC, conferidos palavra por palavra (scripts/test-ceu.mjs). */
export const VERSOS: Record<Fase, { texto: string; ref: string }[]> = {
  madrugada: [
    { texto: "Os meus olhos anteciparam as vigílias da noite, para meditar na tua palavra.", ref: "Salmos 119:148" },
    { texto: "Eis que não tosquenejará nem dormirá o guarda de Israel.", ref: "Salmos 121:4" },
  ],
  manha: [
    { texto: "Novas são cada manhã; grande é a tua fidelidade.", ref: "Lamentações 3:23" },
    { texto: "Pela manhã ouvirás a minha voz, ó Senhor", ref: "Salmos 5:3" },
    { texto: "Levanta-te, resplandece, porque vem a tua luz", ref: "Isaías 60:1" },
  ],
  tarde: [
    { texto: "Este é o dia que fez o Senhor; regozijemo-nos, e alegremo-nos nele.", ref: "Salmos 118:24" },
    { texto: "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.", ref: "Salmos 119:105" },
    { texto: "Desde o nascimento do sol até ao ocaso, seja louvado o nome do Senhor.", ref: "Salmos 113:3" },
  ],
  noite: [
    { texto: "Em paz também me deitarei e dormirei, porque só tu, Senhor, me fazes habitar em segurança.", ref: "Salmos 4:8" },
    { texto: "Os céus declaram a glória de Deus e o firmamento anuncia a obra das suas mãos.", ref: "Salmos 19:1" },
    { texto: "de noite a sua canção estará comigo", ref: "Salmos 42:8" },
  ],
};

/** antes das 7h o sol ainda não subiu: a manhã é aurora */
export const SAUDACAO_AURORA = ["Bom dia! O dia está nascendo, e a chama também.", "Bom dia! Chegou cedo — o sol ainda nem subiu."];

export const SAUDACAO: Record<Fase, string[]> = {
  madrugada: ["Acordado a essa hora? A Palavra também é pra madrugada.", "Madrugada quieta... boa hora pra ouvir a Deus."],
  manha: ["Bom dia! Que tal começar o dia na Palavra?", "Bom dia! O sol já brilha lá fora, e a chama aqui também."],
  tarde: ["Boa tarde! Uma pausa na Palavra cai bem agora.", "Boa tarde! Bora dar mais um passo na estrada?"],
  noite: ["Boa noite! Uma leitura antes de descansar?", "Boa noite! Olha as estrelas — e a Palavra pra fechar o dia."],
};

/** o nome da fase da lua de hoje, como se fala */
export function nomeDaLua(f: number): string {
  if (f < 0.03 || f > 0.97) return "nova";
  if (f < 0.22) return "crescente";
  if (f < 0.28) return "no quarto crescente";
  if (f < 0.47) return "crescendo, quase cheia";
  if (f < 0.53) return "cheia";
  if (f < 0.72) return "minguando";
  if (f < 0.78) return "no quarto minguante";
  return "minguante";
}

/** o que ele diz quando alguém toca o sol, a lua, ou vê uma estrela cadente */
export const FALAS_DO_CEU = {
  sol: { texto: "Esse sol aí quem fez foi Deus. E ele ainda é maior que o sol.", detalhe: "“Porque o Senhor Deus é um sol e escudo” — Salmos 84:11" },
  lua: (f: number) => ({
    texto: `Hoje a lua está ${nomeDaLua(f)}. Olha que linda!`,
    detalhe: "“Designou a lua para as estações” — Salmos 104:19",
  }),
  cadente: { texto: "Viu essa? Uma estrela cadente!", detalhe: "“Conta o número das estrelas, chama-as a todas pelos seus nomes.” — Salmos 147:4" },
};

/** quando a hora VIRA com a tela aberta (o sol nasce, o sol se põe…) */
export const VIRADA: Record<Fase, string> = {
  madrugada: "Já virou madrugada! Uma leitura curta e depois cama, combinado?",
  manha: "O sol nasceu! Agora é bom dia de verdade.",
  tarde: "Passou do meio-dia. O dia voa, né?",
  noite: "O sol se pôs... olha o céu mudando de cor!",
};
