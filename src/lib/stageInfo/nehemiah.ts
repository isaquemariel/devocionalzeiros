// Fichas por (capítulo → papel) de NEEMIAS — rede de segurança contextual para
// os figurantes anônimos (o `id` nomeado vence esta ficha; ver actorInfo).
// Agrega as faixas autorais do livro.
//
// São treze capítulos em que Deus não fala uma única vez: não há voz do céu em
// nenhum dos quatrocentos e seis versículos, e a providência aparece só na
// frase que o copeiro repete — "segundo a boa mão de Deus sobre mim". Por isso
// o povo aqui quase nunca é "o povo": é o guarda da porta da fortaleza de
// Susã, o lenhador da floresta do rei, os filhos de Hassenaá com as fechaduras
// e os ferrolhos da porta do peixe, o ourives e o boticário no andaime, Salum
// e as suas filhas, o carregador cujas forças desfaleceram debaixo do pó, o
// que edificava com uma das mãos e na outra tinha as armas, a filha sujeita
// que já não estava no poder das mãos do pai, os treze levitas que declaravam
// o sentido para que, lendo, se entendesse, o netinim de Ofel, o cantor que
// fugiu para o seu campo e o tírio que vendia peixe no sábado.
import type { StageInfo } from "@/lib/rpgStageInfo";
import { CHAPTER_ACTORS_01_07 } from "@/lib/stageInfo/nehemiah-01-07";
import { CHAPTER_ACTORS_08_13 } from "@/lib/stageInfo/nehemiah-08-13";

export const CHAPTER_ACTORS: Record<number, Record<string, StageInfo>> = {
  ...CHAPTER_ACTORS_01_07,
  ...CHAPTER_ACTORS_08_13,
};
