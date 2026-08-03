// ============================================================================
// GÊNESIS — cena viva, caps. 39–40 (JOSÉ NO EGITO: a casa, a cova, os sonhos).
//
// Cap. 39: o refrão do capítulo é UM SÓ — "e o SENHOR estava com José". Ele
// atravessa a prosperidade (glory subindo na casa de Potifar), a tentação
// (a luz caindo, night subindo), a calúnia (storm) e a masmorra — e do outro
// lado da porta do cárcere a MESMA glória se acende outra vez. O contraste
// é a mensagem: José troca de lugar, Deus não troca de lado. Por isso José
// carrega glow ~0.3 em TODOS os beats, do mercado de escravos à cela.
// DECORO TOTAL na tentação: nenhuma encenação sensual — a mulher fala, José
// recusa, José FOGE (pose walk saindo do quadro). O drama é moral, não físico.
//
// Cap. 40: a prisão em night alto, dois sonhos numa noite, e o menino de
// Canaã que já sabe de quem vêm as interpretações. O palácio entra UMA vez
// (v.20–22, glory festiva) só para o contraste cruel do v.23: a câmera volta
// para a cela vazia, mais escura que antes — dois anos de esquecimento.
// A execução do padeiro NÃO é encenada: ele simplesmente sai de cena.
//
// DEUS NUNCA É DESENHADO: "o SENHOR estava com José" é glory/glow no
// ambiente; a ira de Faraó (40:2) acontece fora do palco, como storm.
// Elenco: Potifar e o carcereiro-mor = `homem`; a mulher de Potifar =
// `mulherComum`; o copeiro-mor = `homem` e o padeiro-mor = `servo` (dois
// oficiais visualmente distintos, cada um com sua própria voz no balão).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ------------------------------------------------------------------ Gn 39: sets
// A CASA DO EGÍPCIO: casa rica de um capitão da guarda — pátio de despensa
// (ânforas, caixas, banca), o portão, a torre do quartel ao fundo, tamareiras.
// O corredor dx -100..-190 fica LIVRE: é a vaga dos extras do versículo
// (os bens entregues na mão de José, o feixe da bênção "na casa e no campo").
const CASA: StagePropSpec[] = [
  P("tower", 300, 1.25, undefined, 0.05),      // o quartel da guarda de Faraó ao fundo
  P("door", 214, 1.15, undefined, 0.1),        // o portão da casa de Potifar
  P("stall", -300, 1.05, undefined, 0.2),      // a banca da despensa da casa
  P("crate", -258, 1.0, undefined, 0.48),
  P("amphora", -222, 0.9, undefined, 0.64),
  P("amphora", 258, 0.95, undefined, 0.42),
  P("crate", 222, 0.85, undefined, 0.6),
  P("well", 320, 1.0, undefined, 0.66),        // o poço do pátio
  P("palm", -60, 1.15, undefined, 0.06),
  P("palm", 128, 1.0, undefined, 0.14),
  P("tree", 34, 0.9, undefined, 0.04),
  P("bush", 176, 0.9, undefined, 0.3),
  P("grass", -40, 1.0, undefined, 0.86),
  P("grass", 60, 0.95, undefined, 0.9),
  P("grass", 170, 1.0, undefined, 0.82),
  P("grass", 292, 0.9, undefined, 0.7),
];

// v.4 — "entregou na sua mão TUDO o que tinha": a fazenda da casa empilhada
// no corredor de extras, sob a guarda do mordomo hebreu.
const CASA_MORDOMO: StagePropSpec[] = [
  ...CASA,
  P("crate", -134, 1.15, undefined, 0.2),
];

// v.5 — "a bênção do Senhor foi sobre tudo o que tinha, na casa E NO CAMPO":
// o feixe de trigo entra como sinal da colheita abençoada por amor de José.
const CASA_BENCAO: StagePropSpec[] = [
  ...CASA_MORDOMO,
  P("sheaf", -176, 1.05, undefined, 0.3),
];

// A CASA DO CÁRCERE: o mesmo Egito, sem nada bonito. Pedra, uma porta pesada
// em destaque no corredor de extras, a tenda da guarda, a torre do quartel —
// e cenografia mínima de propósito: a cela é a solidão do palco.
const PRISAO: StagePropSpec[] = [
  P("door", -140, 1.35, undefined, 0.16),      // a porta pesada da casa do cárcere
  P("tower", 300, 1.3, undefined, 0.04),       // a torre do capitão da guarda
  P("tent", 180, 1.0, undefined, 0.2),         // o posto dos guardas
  P("rock", -290, 1.0, undefined, 0.34),
  P("rock", 236, 0.9, undefined, 0.5),
  P("crate", -46, 0.8, undefined, 0.72),
  P("amphora", 66, 0.75, undefined, 0.78),
  P("bush", 120, 0.8, undefined, 0.66),
  P("grass", -210, 0.85, undefined, 0.84),
  P("grass", 280, 0.85, undefined, 0.74),
];

// ------------------------------------------------------------------ Gn 40: sets
// O SONHO DA VIDE (v.9–11): a vide diante da face do copeiro e o copo de Faraó
// entram como apoio visual do sonho, na vaga de extras.
const PRISAO_VIDE: StagePropSpec[] = [
  ...PRISAO,
  P("tree", -172, 1.1, undefined, 0.26),       // a vide, com os cachos amadurecendo
  P("bowl", -108, 0.9, undefined, 0.2),        // o copo de Faraó na mão do copeiro
];

// O SONHO DOS CESTOS (v.16–17): TRÊS cestos brancos, o mais alto cheio dos
// manjares de Faraó — e as aves comendo dele.
const PRISAO_CESTOS: StagePropSpec[] = [
  ...PRISAO,
  P("crate", -190, 1.0, undefined, 0.32),
  P("crate", -112, 0.95, undefined, 0.5),
  P("crate", -166, 0.9, undefined, 0.66),
];

// O PALÁCIO no dia do nascimento de Faraó: banquete a todos os seus servos —
// trono ao fundo, torres, candeeiros acesos, tamareiras. Festa que não sabe
// que decide duas vidas. Corredor de extras livre para o copo do v.21.
const PALACIO: StagePropSpec[] = [
  P("throne", 0, 1.2, undefined, 0.06),        // o trono de Faraó
  P("tower", -300, 1.3, undefined, 0.05),
  P("tower", 300, 1.2, undefined, 0.08),
  P("door", 210, 1.15, undefined, 0.12),
  P("lampstand", -240, 1.0, 1, 0.3),
  P("lampstand", 240, 1.0, 1, 0.3),
  P("amphora", -60, 0.85, undefined, 0.8),
  P("crate", 70, 0.85, undefined, 0.84),
  P("palm", 150, 1.05, undefined, 0.2),
  P("palm", 260, 0.95, undefined, 0.34),
  P("grass", -20, 1.0, undefined, 0.9),
  P("grass", 190, 0.95, undefined, 0.7),
];

// v.21 — "e este deu o copo na mão de Faraó": o copo restaurado, em destaque.
const PALACIO_COPO: StagePropSpec[] = [
  ...PALACIO,
  P("bowl", -140, 1.0, undefined, 0.22),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 39
  // Arco de env: glória crescente na casa (0.15 → 0.55) → luz caindo na
  // tentação (night 0.3) → tempestade da calúnia (storm 0.42 + fire da ira)
  // → escuridão do cárcere (night 0.6) → E A GLÓRIA VOLTA A SUBIR (0.6)
  // dentro da cela. O gráfico do ambiente é o sermão do capítulo.
  39: {
    start: { terrain: "city", night: 0.22, glory: 0.15, storm: 0, fire: 0 },
    beats: [
      b(1, { props: CASA, cast: [                                                  // José vendido a Potifar, capitão da guarda
        C("jose", -40, "walk", { glow: 0.3, dy: 0.52 }),
        C("homem", 66, "stand", { dy: 0.44, facing: -1 }),
      ] }),
      b(2, { env: { glory: 0.4 }, cast: [                                          // "o SENHOR estava com José" — homem próspero
        C("jose", -20, "stand", { glow: 0.3, dy: 0.5 }),
        C("homem", 66, "stand", { dy: 0.44, facing: -1 }),
      ] }),
      b(3, { env: { glory: 0.45 }, cast: [                                         // o senhor VÊ que o SENHOR está com ele
        C("jose", -14, "stand", { glow: 0.3, dy: 0.5 }),
        C("homem", 72, "point", { dy: 0.44, facing: -1 }),
      ] }),
      b(4, { props: CASA_MORDOMO, env: { glory: 0.5 }, cast: [                     // achou graça: posto sobre a casa toda
        C("jose", 0, "stand", { glow: 0.3, dy: 0.48 }),
        C("homem", 84, "point", { dy: 0.44, facing: -1 }),
      ] }),
      b(5, { props: CASA_BENCAO, env: { glory: 0.55 }, cast: [                     // a bênção na casa e no campo, por amor de José
        C("jose", 6, "stand", { glow: 0.3, dy: 0.46 }),
        C("homem", 90, "bow", { dy: 0.44, facing: -1 }),
      ] }),
      b(6, { env: { glory: 0.5 }, cast: [                                          // deixou TUDO na mão de José — só o pão sabia
        C("jose", 0, "stand", { glow: 0.3, dy: 0.48 }),
      ] }),
      b(7, { by: "mulherComum", q: "e disse: ", env: { night: 0.3, glory: 0.3 }, cast: [  // a mulher põe os olhos nele e fala
        C("jose", -34, "stand", { glow: 0.3, dy: 0.5 }),
        C("mulherComum", 70, "stand", { dy: 0.46, facing: -1 }),
      ] }),
      b(8, { by: "jose", q: "e disse à mulher do seu senhor: ", cast: [            // PORÉM ELE RECUSOU — a confiança do senhor
        C("jose", -62, "stand", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("mulherComum", 70, "stand", { dy: 0.46, facing: -1 }),
      ] }),
      b(9, { by: "jose", q: "porquanto tu és sua mulher; ", env: { glory: 0.5 }, cast: [  // "e pecaria contra Deus?" — o caráter brilha
        C("jose", -50, "stand", { glow: 0.45, dy: 0.5, facing: 1 }),
        C("mulherComum", 70, "stand", { dy: 0.46, facing: -1 }),
      ] }),
      b(10, { env: { night: 0.34, glory: 0.3 }, cast: [                            // cada dia ela falava; ele não dava ouvidos
        C("jose", -88, "walk", { glow: 0.3, dy: 0.52, facing: -1 }),
        C("mulherComum", 44, "stand", { dy: 0.46, facing: -1 }),
      ] }),
      b(11, { env: { night: 0.32 }, cast: [                                        // veio fazer seu serviço: ninguém da casa ali
        C("jose", -10, "stand", { glow: 0.3, dy: 0.5 }),
        C("mulherComum", 100, "stand", { dy: 0.44, facing: -1 }),
      ] }),
      b(12, { by: "mulherComum", q: "dizendo: ", env: { night: 0.3, glory: 0.15 }, cast: [  // ele deixa a roupa na mão dela e FOGE
        C("jose", -150, "walk", { glow: 0.3, dy: 0.55, facing: -1 }),
        C("mulherComum", 60, "raise", { dy: 0.46, facing: -1 }),
      ] }),
      b(13, { env: { storm: 0.15, night: 0.34 }, cast: [                           // ela vê a roupa na mão e ele fugido para fora
        C("mulherComum", 40, "stand", { dy: 0.48, facing: -1 }),
      ] }),
      b(14, { by: "mulherComum", q: "dizendo: ", env: { storm: 0.2 }, cast: [      // chama os homens da casa: a ACUSAÇÃO FALSA
        C("mulherComum", -10, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.4 }),
      ] }),
      b(15, { by: "mulherComum", env: { storm: 0.26 } }),                          // "deixou a sua roupa comigo, e fugiu"
      b(16, { env: { night: 0.42, glory: 0.1, storm: 0.18 }, cast: [               // guarda a roupa até o senhor voltar — espera fria
        C("mulherComum", 20, "stand", { dy: 0.48 }),
      ] }),
      b(17, { by: "mulherComum", q: "dizendo: ", env: { storm: 0.3 }, cast: [      // repete as mesmas palavras a Potifar
        C("homem", -64, "stand", { dy: 0.46, facing: 1 }),
        C("mulherComum", 44, "point", { dy: 0.48, facing: -1 }),
      ] }),
      b(18, { by: "mulherComum", env: { storm: 0.36 } }),                          // "gritei… ele deixou a roupa e fugiu"
      b(19, { env: { storm: 0.42, fire: 0.25, night: 0.5 }, cast: [                // A SUA IRA SE ACENDEU
        C("homem", -58, "raise", { dy: 0.46, facing: 1 }),
        C("mulherComum", 48, "stand", { dy: 0.48, facing: -1 }),
      ] }),
      b(20, { set: "prisao", props: PRISAO, env: { night: 0.6, glory: 0, storm: 0, fire: 0 }, cast: [  // entregue na casa do cárcere
        C("jose", 0, "stand", { glow: 0.25, dy: 0.52 }),
      ] }),
      b(21, { env: { glory: 0.5, night: 0.55 }, cast: [                            // O SENHOR, PORÉM, ESTAVA COM JOSÉ — graça no cárcere
        C("jose", -22, "stand", { glow: 0.4, dy: 0.5 }),
        C("homem", 90, "stand", { dy: 0.44, facing: -1 }),
      ] }),
      b(22, { env: { glory: 0.55 }, cast: [                                        // todos os presos entregues na sua mão
        C("jose", 0, "point", { glow: 0.4, dy: 0.48 }),
        C("homem", 96, "bow", { dy: 0.44, facing: -1 }),
        C("multidao", 170, "stand", { dy: 0.38 }),
      ] }),
      b(23, { env: { glory: 0.6, night: 0.48 } }),                                 // tudo o que fazia, o Senhor prosperava
    ],
  },

  // ------------------------------------------------------------------ Gn 40
  // Arco de env: cela em night 0.5 → a noite dos dois sonhos (0.75) → a manhã
  // e a luz da interpretação (glory 0.4–0.5) → a sentença do padeiro (night
  // 0.65) → o banquete do palácio (glory 0.35) → e o corte final: a cela outra
  // vez, mais escura do que começou (night 0.7). "Não se lembrou de José."
  40: {
    start: { terrain: "city", night: 0.5, glory: 0.12, storm: 0.15, fire: 0 },
    beats: [
      b(1, { props: PRISAO, cast: [                                                // o copeiro e o padeiro ofendem o rei do Egito
        C("jose", -30, "stand", { glow: 0.3, dy: 0.5 }),
        C("homem", 62, "walk", { dy: 0.44, facing: -1 }),
        C("servo", 132, "walk", { dy: 0.5, facing: -1 }),
      ] }),
      b(2, { env: { storm: 0.3 } }),                                               // Faraó indigna-se (ira FORA do palco = storm)
      b(3, { env: { night: 0.55, storm: 0.1 }, cast: [                             // presos na casa do cárcere, onde José estava
        C("jose", -30, "stand", { glow: 0.3, dy: 0.5 }),
        C("homem", 62, "stand", { dy: 0.44, facing: -1 }),
        C("servo", 124, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(4, { env: { storm: 0 }, cast: [                                            // o capitão põe-nos a cargo de José
        C("homem", -74, "stand", { dy: 0.46, facing: 1 }),
        C("jose", 0, "stand", { glow: 0.3, dy: 0.5 }),
        C("servo", 76, "stand", { dy: 0.48, facing: -1 }),
      ] }),
      b(5, { env: { night: 0.75, glory: 0.1 }, cast: [                             // NA MESMA NOITE, cada um o seu sonho
        C("homem", -76, "lie", { dy: 0.6 }),
        C("jose", -6, "lie", { glow: 0.3, dy: 0.66 }),
        C("servo", 80, "lie", { dy: 0.6 }),
      ] }),
      b(6, { env: { night: 0.4, glory: 0.2 }, cast: [                              // pela manhã: José vê que estão perturbados
        C("homem", -70, "bow", { dy: 0.48 }),
        C("jose", 4, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
        C("servo", 82, "bow", { dy: 0.5 }),
      ] }),
      b(7, { by: "jose", q: "dizendo: ", env: { night: 0.35 }, cast: [             // "Por que estão hoje tristes os vossos semblantes?"
        C("homem", -72, "bow", { dy: 0.48 }),
        C("jose", 0, "point", { glow: 0.3, dy: 0.5, facing: -1 }),
        C("servo", 80, "bow", { dy: 0.5 }),
      ] }),
      b(8, { by: "jose", q: "E José disse-lhes: ", env: { glory: 0.4 }, cast: [    // "Não são de Deus as interpretações?"
        C("homem", -70, "stand", { dy: 0.48, facing: 1 }),
        C("jose", 0, "raise", { glow: 0.45, dy: 0.5 }),
        C("servo", 78, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(9, { by: "homem", q: "e disse-lhe: ", props: PRISAO_VIDE, env: { glory: 0.35 }, cast: [  // O SONHO DA VIDE diante da sua face
        C("homem", -60, "point", { dy: 0.48, facing: 1 }),
        C("jose", 20, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
        C("servo", 96, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(10, { by: "homem" }),                                                      // três sarmentos, a flor, os cachos em uvas
      b(11, { by: "homem", cast: [                                                 // o copo de Faraó espremido na sua mão
        C("homem", -54, "raise", { dy: 0.48, facing: 1 }),
        C("jose", 24, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
        C("servo", 96, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(12, { by: "jose", q: "Então disse-lhe José: ", env: { glory: 0.45 }, cast: [ // "Os três sarmentos são três dias"
        C("homem", -66, "stand", { dy: 0.48, facing: 1 }),
        C("jose", 10, "point", { glow: 0.45, dy: 0.5, facing: -1 }),
        C("servo", 92, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(13, { by: "jose", env: { glory: 0.5 } }),                                  // em três dias Faraó te restaurará ao teu estado
      b(14, { by: "jose", env: { glory: 0.32, night: 0.45 }, cast: [               // "PORÉM LEMBRA-TE DE MIM… faze-me sair desta casa"
        C("homem", -58, "stand", { dy: 0.48, facing: 1 }),
        C("jose", -6, "stand", { glow: 0.3, dy: 0.52, facing: -1 }),
        C("servo", 92, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(15, { by: "jose", env: { glory: 0.22, night: 0.5 }, cast: [                // "fui roubado… nada fiz para me pôr nesta cova"
        C("homem", -58, "stand", { dy: 0.48, facing: 1 }),
        C("jose", -14, "kneel", { glow: 0.3, dy: 0.54 }),
        C("servo", 92, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(16, { by: "servo", q: "disse a José: ", props: PRISAO_CESTOS, env: { night: 0.55, glory: 0.28 }, cast: [  // TRÊS CESTOS BRANCOS sobre a cabeça
        C("homem", -68, "stand", { dy: 0.46, facing: 1 }),
        C("jose", 6, "stand", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("servo", 84, "point", { dy: 0.52, facing: -1 }),
      ] }),
      b(17, { by: "servo", env: { night: 0.6, storm: 0.15 } }),                    // as AVES comiam do cesto mais alto — mau presságio
      b(18, { by: "jose", q: "Então respondeu José, e disse: ", env: { night: 0.62, glory: 0.3 }, cast: [  // "Os três cestos são três dias"
        C("homem", -70, "stand", { dy: 0.46, facing: 1 }),
        C("jose", 0, "point", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("servo", 80, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(19, { by: "jose", env: { night: 0.65, storm: 0.25, glory: 0.22 } }),        // a interpretação dura: Faraó te pendurará num pau
      b(20, { set: "palacio", props: PALACIO, env: { night: 0.15, glory: 0.3, storm: 0 }, cast: [  // O TERCEIRO DIA: o banquete de Faraó
        C("farao", 0, "stand", { dy: 0.4 }),
        C("homem", -84, "bow", { dy: 0.5, facing: 1 }),
        C("servo", 88, "bow", { dy: 0.52, facing: -1 }),
        C("multidao", 210, "stand", { dy: 0.34 }),
      ] }),
      b(21, { props: PALACIO_COPO, env: { glory: 0.35 }, cast: [                    // o copeiro-mor restaurado: o copo na mão de Faraó
        C("farao", 10, "stand", { dy: 0.4 }),
        C("homem", -50, "raise", { dy: 0.48, facing: 1 }),
        C("servo", 96, "bow", { dy: 0.52, facing: -1 }),
        C("multidao", 210, "stand", { dy: 0.34 }),
      ] }),
      b(22, { env: { night: 0.3, glory: 0.15, storm: 0.3 }, cast: [                 // o padeiro-mor enforcado — ele SAI de cena, sem encenar
        C("farao", 10, "stand", { dy: 0.4 }),
        C("homem", -50, "stand", { dy: 0.48, facing: 1 }),
        C("multidao", 210, "stand", { dy: 0.34 }),
      ] }),
      b(23, { set: "prisao", props: PRISAO, env: { night: 0.7, glory: 0.14, storm: 0 }, cast: [  // "PORÉM NÃO SE LEMBROU DE JOSÉ" — a cela sozinha
        C("jose", -8, "stand", { glow: 0.3, dy: 0.52 }),
      ] }),
    ],
  },
};
