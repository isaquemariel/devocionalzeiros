/**
 * PALETA DA JORNADA — clara, quente e colorida.
 *
 * O resto do app é escuro e dourado; a jornada é o primeiro contato, e a
 * pessoa ainda nem sabe o que é o Devocionalzeiros. Ela precisa de cor e de
 * personalidade, não de solenidade. O fundo creme é o da própria arte do
 * mascote, e o azul é o da chama dele — a jornada inteira sai do personagem.
 *
 * Os botões e cartões têm "espessura": uma borda inferior mais escura que
 * afunda ao toque. É o que faz um toque parecer um botão sendo apertado, e não
 * um retângulo trocando de cor.
 */
export const COR = {
  fundo: "#FFF8EC",
  superficie: "#FFFFFF",
  texto: "#27283A",
  texto2: "#6C6F86",
  borda: "#E9E1D2",
  bordaFunda: "#DCD2BF",

  /** a chama do Devocionalzeiro */
  azul: "#1E7BFF",
  azulFundo: "#1461D8",
  azulClaro: "#E6F1FF",
  azulBorda: "#7DB4FF",

  /** celebração */
  ouro: "#FFB21E",
  ouroFundo: "#DB8F00",

  verde: "#22B866",
  erro: "#F2555A",
  erroClaro: "#FFECEC",
} as const;

/** Fonte arredondada da jornada (carregada em index.html). */
export const FONTE = "'Nunito', 'Montserrat', system-ui, sans-serif";
