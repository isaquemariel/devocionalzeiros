// ============================================================================
// ÊXODO 21–22 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 21–22 — O LIVRO DA ALIANÇA (parte I): do meio do fogo do Sinai, Deus dita a
// Moisés os "estatutos que lhes proporás" — as leis do servo hebreu, da vida e
// da morte, das feridas, do boi que escorneia, do furto e da restituição, do
// zelo pelo estrangeiro, pela viúva e pelo órfão. É a voz da aliança moldando um
// povo justo.
//
// A VOZ DE DEUS (regra do projeto): Moisés está no monte, na nuvem e no fogo; a
// lei vem do céu, SEM figura — `by: "deus"`, com glória e fogo no ambiente. O
// cenário é o Sinai fumegante; o elenco (Moisés recebendo) permanece, e o
// ambiente respira entre a solenidade do fogo e a glória da aliança.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// O MONTE DA LEI (Sinai fumegante): o cume à frente e as tendas do arraial ao
// pé. A presença é fogo e nuvem — pelo AMBIENTE, sem figura.
const MONTE: StagePropSpec[] = [
  { ...P("rock", 0, 1.75, undefined, 0.24), tag: "monte-sinai" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("bush", -150, 0.75, undefined, 0.44),
  P("grass", -40, 0.78, undefined, 0.82),
  P("tent", -260, 0.95, undefined, 0.18),
  P("tent", 250, 0.9, undefined, 0.2),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 21
  // Os estatutos: o servo hebreu e a orelha à porta → a vida por vida → as
  // feridas e o boi escorneador. A voz do fogo molda a justiça do povo.
  21: {
    start: { terrain: "mountain", night: 0.3, glory: 0.7, storm: 0.35, fire: 0.7, verdure: 0.2 },
    beats: [
      b(1, { set: "monte", cast: [C("moises", -20, "kneel", { dy: 0.44, facing: 1 })], props: MONTE, env: { terrain: "mountain", glory: 0.78, fire: 0.7, night: 0.28 } }), // "estes são os estatutos que lhes proporás"
      b(2, { by: "deus", env: { glory: 0.75 } }), // "se comprares um servo hebreu, seis anos servirá; ao sétimo sairá livre"
      b(3, { by: "deus" }), // "se entrou só, só sairá; se era casado, sua mulher sairá com ele"
      b(4, { by: "deus" }), // "se o senhor lhe deu mulher e filhos, estes serão do senhor; ele sairá só"
      b(5, { by: "deus", env: { glory: 0.72 } }), // "mas se o servo disser: amo meu senhor, minha mulher e meus filhos"
      b(6, { by: "deus", env: { glory: 0.7 } }), // "seu senhor lhe furará a orelha à porta com a sovela; e o servirá para sempre"
      b(7, { by: "deus" }), // "se um homem vender sua filha para serva, não sairá como os servos"
      b(8, { by: "deus" }), // "se não agradar ao senhor, fará que se resgate"
      b(9, { by: "deus" }), // "se a desposar com seu filho, fará conforme ao direito das filhas"
      b(10, { by: "deus" }), // "se tomar outra, não lhe diminuirá o mantimento, o vestido, a obrigação"
      b(11, { by: "deus", env: { fire: 0.68 } }), // "e se não fizer estas três coisas, ela sairá de graça, sem dinheiro"
      b(12, { by: "deus", env: { fire: 0.78, storm: 0.4 } }), // "quem ferir alguém, de modo que morra, certamente será morto"
      b(13, { by: "deus", env: { storm: 0.3 } }), // "se não armou cilada, ordenar-te-ei um lugar para onde fugirá"
      b(14, { by: "deus", env: { fire: 0.8 } }), // "quem matar à traição, tirá-lo-ás do meu altar, para que morra"
      b(15, { by: "deus" }), // "o que ferir a seu pai ou a sua mãe, certamente será morto"
      b(16, { by: "deus" }), // "quem raptar um homem e o vender, certamente será morto"
      b(17, { by: "deus" }), // "quem amaldiçoar a seu pai ou a sua mãe, certamente será morto"
      b(18, { by: "deus", env: { fire: 0.72, glory: 0.72 } }), // "se dois homens pelejarem e um cair na cama, mas não morrer"
      b(19, { by: "deus" }), // "se tornar a levantar-se, o que o feriu pagará o tempo perdido e a cura"
      b(20, { by: "deus" }), // "se alguém ferir o seu servo com pau e morrer, certamente será castigado"
      b(21, { by: "deus" }), // "porém se sobreviver um ou dois dias, não será castigado"
      b(22, { by: "deus", env: { glory: 0.7 } }), // "se ferirem mulher grávida e abortar, será multado conforme os juízes"
      b(23, { by: "deus", env: { fire: 0.8, storm: 0.35 } }), // "mas se houver morte, então darás vida por vida"
      b(24, { by: "deus" }), // "olho por olho, dente por dente, mão por mão, pé por pé"
      b(25, { by: "deus" }), // "queimadura por queimadura, ferida por ferida, golpe por golpe"
      b(26, { by: "deus", env: { fire: 0.7 } }), // "quem ferir o olho do servo e o danificar, deixá-lo-á ir livre pelo olho"
      b(27, { by: "deus" }), // "se tirar o dente do servo, deixá-lo-á ir livre pelo dente"
      b(28, { by: "deus", env: { glory: 0.72 } }), // "se um boi escornear e matar, o boi será apedrejado; o dono, absolvido"
      b(29, { by: "deus" }), // "mas se o boi já escorneava e o dono não o guardou, também o dono morrerá"
      b(30, { by: "deus" }), // "se lhe for imposto resgate, dará por resgate da sua vida o que lhe impuserem"
      b(31, { by: "deus" }), // "quer escorneie filho ou filha, conforme a este estatuto lhe será feito"
      b(32, { by: "deus" }), // "se o boi escornear servo ou serva, trinta siclos ao senhor, e o boi apedrejado"
      b(33, { by: "deus", env: { fire: 0.66 } }), // "se alguém abrir uma cova e nela cair um boi ou jumento"
      b(34, { by: "deus" }), // "o dono da cova o pagará em dinheiro; o animal morto será seu"
      b(35, { by: "deus" }), // "se o boi ferir o boi do próximo, venderão o vivo e repartirão o preço"
      b(36, { by: "deus", env: { glory: 0.75 } }), // "mas se era notório escorneador, pagará boi por boi; o morto será seu"
    ],
  },

  // ------------------------------------------------------------------ Êx 22
  // O furto e a restituição → o guardar dos bens → o zelo pelo estrangeiro, pela
  // viúva e pelo órfão → e a santidade devida ao Senhor.
  22: {
    start: { terrain: "mountain", night: 0.3, glory: 0.72, storm: 0.3, fire: 0.68, verdure: 0.2 },
    beats: [
      b(1, { set: "monte", cast: [C("moises", -20, "kneel", { dy: 0.44, facing: 1 })], props: MONTE, env: { terrain: "mountain", glory: 0.75, fire: 0.68, night: 0.28 } }), // "quem furtar boi ou ovelha pagará cinco bois por um, quatro ovelhas por uma"
      b(2, { by: "deus", env: { fire: 0.72 } }), // "se o ladrão for ferido de noite e morrer, não haverá culpa de sangue"
      b(3, { by: "deus" }), // "se já era dia, haverá culpa de sangue; o ladrão fará restituição total"
      b(4, { by: "deus" }), // "se o furto for achado vivo na sua mão, pagará o dobro"
      b(5, { by: "deus", env: { glory: 0.7 } }), // "se largar o animal no campo de outro, restituirá o melhor do seu campo"
      b(6, { by: "deus", env: { fire: 0.75, storm: 0.35 } }), // "se irromper fogo e queimar a seara, quem o acendeu pagará o queimado"
      b(7, { by: "deus", env: { fire: 0.68, storm: 0.25 } }), // "se der bens a guardar e forem furtados, o ladrão, se achado, pagará o dobro"
      b(8, { by: "deus" }), // "se o ladrão não for achado, o dono da casa será levado diante dos juízes"
      b(9, { by: "deus" }), // "sobre todo negócio fraudulento, a causa de ambos será levada aos juízes"
      b(10, { by: "deus" }), // "se der a guardar animal e este morrer ou for arrebatado sem testemunha"
      b(11, { by: "deus", env: { glory: 0.72 } }), // "haverá juramento do Senhor entre ambos, e o dono o aceitará"
      b(12, { by: "deus" }), // "mas se de fato lhe foi furtado, pagá-lo-á ao seu dono"
      b(13, { by: "deus" }), // "se lhe for dilacerado, trá-lo-á em testemunho, e não pagará o dilacerado"
      b(14, { by: "deus" }), // "se pedir emprestado e o animal morrer sem o dono presente, pagá-lo-á"
      b(15, { by: "deus" }), // "se o dono estava presente, não pagará; se foi alugado, pelo seu aluguel"
      b(16, { by: "deus", env: { glory: 0.7 } }), // "se enganar virgem não desposada, certamente a dotará e tomará por mulher"
      b(17, { by: "deus" }), // "se o pai recusar dá-la, pagará em dinheiro conforme ao dote das virgens"
      b(18, { by: "deus", env: { fire: 0.8, storm: 0.4 } }), // "a feiticeira não deixarás viver"
      b(19, { by: "deus" }), // "todo aquele que se deitar com animal, certamente morrerá"
      b(20, { by: "deus", env: { fire: 0.82 } }), // "o que sacrificar a outros deuses, e não só ao Senhor, será morto"
      b(21, { by: "deus", env: { glory: 0.75, fire: 0.66 } }), // "o estrangeiro não afligirás; pois estrangeiros fostes no Egito"
      b(22, { by: "deus", env: { glory: 0.78 } }), // "a nenhuma viúva nem órfão afligireis"
      b(23, { by: "deus", env: { storm: 0.3 } }), // "se os afligires e clamarem a mim, certamente ouvirei o seu clamor"
      b(24, { by: "deus", env: { fire: 0.85, storm: 0.45 } }), // "a minha ira se acenderá; e vossas mulheres ficarão viúvas"
      b(25, { by: "deus", env: { storm: 0.2, glory: 0.74 } }), // "se emprestares ao pobre do meu povo, não lhe imporás usura"
      b(26, { by: "deus", env: { glory: 0.78 } }), // "se tomares em penhor a roupa do próximo, restituí-la-ás antes do pôr do sol"
      b(27, { by: "deus", env: { glory: 0.82 } }), // "aquela é a sua cobertura; quando clamar a mim, eu o ouvirei, porque sou misericordioso"
      b(28, { by: "deus", env: { glory: 0.76 } }), // "a Deus não amaldiçoarás, e o príncipe do teu povo não maldirás"
      b(29, { by: "deus" }), // "as tuas primícias não retardarás; o primogênito de teus filhos me darás"
      b(30, { by: "deus" }), // "assim farás dos teus bois e ovelhas: ao oitavo dia mos darás"
      b(31, { by: "deus", env: { glory: 0.85 } }), // "e ser-me-eis homens santos; não comereis carne despedaçada no campo"
    ],
  },
};
