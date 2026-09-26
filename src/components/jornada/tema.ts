/**
 * PALETA DA JORNADA — clara, quente, e tirada do próprio personagem.
 *
 * A tinta é o azul-noite do corpo do Devocionalzeiro; o destaque é o azul da
 * chama dele; o ouro é o do sol que nasce na trilha. O fundo das perguntas é
 * PAPEL — o caderno de trilha onde ele anota o que a pessoa conta —, e não um
 * cartão branco de formulário.
 *
 * Duas letras: Nunito, para ler (balão, campos, botões), e Caveat, a letra de
 * mão, para o que ele ESCREVE (o nome da parada, a placa, o diário). A letra
 * de mão nunca carrega informação que precise ser lida depressa.
 */
export const COR = {
  papel: "#FFFBF2",
  papelSombra: "#F3E9D6",
  papelBorda: "#E6D9BF",
  lapis: "#A98457",

  tinta: "#1B2550",
  tinta2: "#5E6485",
  tinta3: "#9A9AB0",

  /** a chama do Devocionalzeiro */
  chama: "#2F7BFF",
  chamaFunda: "#1B55D6",
  chamaClara: "#E3EEFF",

  /** o sol */
  ouro: "#FFB21E",
  ouroFundo: "#C98300",

  madeira: "#A0703F",
  madeiraEscura: "#6E4A28",

  verde: "#2FAE66",
  erro: "#E0474C",
  erroClaro: "#FFEDEC",
} as const;

export const FONTE = "'Nunito', 'Montserrat', system-ui, sans-serif";
export const MAO = "'Caveat', 'Nunito', cursive";
