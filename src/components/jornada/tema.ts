/**
 * PALETA E LETRA DA JORNADA — as mesmas do RPG Bíblico.
 *
 * A jornada é a porta de entrada do RPG: a pessoa sai dela para as salas, a
 * cena viva e o mapa. Então fala a mesma língua visual, a do `.rpg-root` em
 * `src/index.css` — pergaminho, ouro e tinta, a letra monoespaçada JetBrains
 * Mono, a caixa de diálogo azul-noite de borda dourada e o botão de ouro com
 * pressão 3D. Estes valores ESPELHAM as variáveis `--rpg-*` de lá; se a
 * paleta do RPG mudar, é aqui que a jornada acompanha.
 *
 * O que continua próprio da jornada é o CÉU: claro e colorido, amanhecendo
 * sobre Jerusalém. A interface é escura e dourada por cima dele, como o HUD do
 * RPG por cima da cena.
 */
export const COR = {
  /** fundo dos painéis (`.rpg-panel`) */
  painel: "#241b10",
  painelFundo: "#1c1509",
  painelBrilho: "#4a3820",
  /** campo, chip, botão secundário (`.rpg-btn-ghost`) */
  campo: "#20180d",
  borda: "#3a2c18",
  tintaEscura: "#0b0805",

  /** texto: pergaminho em três tons */
  texto: "#ece0c6",
  texto2: "#b8a67f",
  texto3: "#9c8b68",

  ouro: "#e8b04b",
  ouroClaro: "#ffd889",
  ouroFundo: "#6e4e18",
  /** texto sobre ouro */
  sobreOuro: "#1a1206",

  /** a caixa de diálogo (`.rpg-dialogue`) */
  dialogo: "#141c30",
  dialogoFundo: "#0b1120",
  dialogoTexto: "#dfe7ff",

  /** a chama do Devocionalzeiro */
  chama: "#5b9bff",

  verde: "#93d453",
  erro: "#e8846b",
  erroFundo: "#301818",

  /** pergaminho claro (o diário, a placa) e a tinta que escreve nele */
  pergaminho: "#ece0c6",
  tintaPergaminho: "#2a1c05",
} as const;

/** a letra do RPG (`--rpg-mono`) */
export const FONTE = '"JetBrains Mono", ui-monospace, "Cascadia Mono", "Consolas", "SF Mono", Menlo, monospace';
