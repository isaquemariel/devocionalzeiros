import type { Etapa, Fala, IdEtapa, Opcao, Respostas } from "./tipos";
import { reacaoAoNome } from "./nomes";

/**
 * O ROTEIRO DA JORNADA — acender a chama.
 *
 * A história: é madrugada, e o Devocionalzeiro está dormindo com a chama da
 * cabeça quase apagada. A pessoa o acorda, e cada coisa que ela conta vira
 * lenha. Os dois caminham por uma trilha enquanto o céu clareia; quando a
 * conta é criada, o sol está no alto e a cidade aparece no horizonte. Não há
 * barra de progresso: o progresso é a chama, o céu e a caminhada.
 *
 * A ordem é de propósito: a pessoa INVESTE antes de pagar o pedágio. Ela conta
 * quem é, por que veio e quanto quer se dedicar; vê o plano que isso gera; SÓ
 * ENTÃO cria a conta — que deixa de ser um formulário e passa a ser "guardar a
 * chama que eu já acendi".
 *
 * Tudo aqui é dado. Para tirar, trocar ou incluir pergunta, mexa nesta lista.
 * As falas são curtas de propósito — o balão tem uns 26 caracteres por linha,
 * e fala comprida vira duas falas.
 */

/** O primeiro nome que a pessoa deu, ou um tratamento neutro enquanto não deu. */
const nome = (r: Respostas) => r.apelido?.trim().split(/\s+/)[0] || "amigo(a)";

export const MOTIVOS: Opcao[] = [
  { valor: "deus", rotulo: "Me aproximar de Deus", icone: "maos" },
  { valor: "habito", rotulo: "Criar o hábito da leitura", icone: "livro" },
  { valor: "entender", rotulo: "Entender o que leio", icone: "lampada" },
  { valor: "juntos", rotulo: "Crescer com outras pessoas", icone: "pessoas" },
  { valor: "divertido", rotulo: "Aprender brincando", icone: "controle" },
  { valor: "outro", rotulo: "Outro motivo", icone: "balao" },
];

/** O nível é o estágio da planta que cresce na escala. */
export const FAMILIARIDADE: Opcao[] = [
  {
    valor: "comecando", rotulo: "Estou começando agora", detalhe: "Semente", nivel: 0,
    reacao: { texto: "Semente é o melhor jeito de começar. Tudo que cresce começou assim.", expressao: "feliz" },
  },
  {
    valor: "historias", rotulo: "Conheço algumas histórias", detalhe: "Broto", nivel: 1,
    reacao: { texto: "Davi e Golias, a arca, Jonas… já é chão firme pra crescer.", expressao: "feliz" },
  },
  {
    valor: "alguns-livros", rotulo: "Já li alguns livros", detalhe: "Muda", nivel: 2,
    reacao: { texto: "Opa, já tem raiz! Então dá pra ir mais fundo.", expressao: "orgulhoso" },
  },
  {
    valor: "frequente", rotulo: "Leio com frequência", detalhe: "Árvore", nivel: 3,
    reacao: { texto: "Árvore de dar sombra, hein? Os desafios vão ser dos difíceis.", expressao: "orgulhoso", gesto: "apontar" },
  },
  {
    valor: "inteira", rotulo: "Já li a Bíblia inteira", detalhe: "Com fruto", nivel: 4,
    reacao: { texto: "A Bíblia INTEIRA?! Tá, agora quem vai aprender aqui sou eu.", expressao: "surpreso" },
  },
];

/** O valor é a meta em minutos — é ele que alimenta o cálculo do plano. */
export const METAS: Opcao[] = [
  { valor: "5", rotulo: "5 min", detalhe: "Leve", reacao: { texto: "Cinco minutos todo dia valem mais que uma hora de vez em quando.", expressao: "feliz" } },
  { valor: "10", rotulo: "10 min", detalhe: "Constante", reacao: { texto: "Dez é um ritmo bom de manter. Nem corrido, nem parado.", expressao: "feliz" } },
  { valor: "15", rotulo: "15 min", detalhe: "Firme", reacao: { texto: "Quinze! Nesse ritmo o Novo Testamento passa voando.", expressao: "orgulhoso" } },
  { valor: "20", rotulo: "20 min", detalhe: "Intensa", reacao: { texto: "Vinte por dia?! Vou precisar de fôlego pra te acompanhar.", expressao: "surpreso" } },
];

/**
 * Os seis primeiros valores são os que o cadastro antigo gravava em
 * `referral_source`. Mantidos IGUAIS de propósito: o admin e os relatórios
 * contam por eles, e trocar a grafia partiria a série histórica ao meio.
 */
export const ORIGENS: Opcao[] = [
  { valor: "instagram", rotulo: "Instagram", icone: "camera", cor: "#F35A8B",
    reacao: { texto: "Entre uma foto e outra, você achou a Palavra. Gosto disso.", expressao: "feliz" } },
  { valor: "tiktok", rotulo: "TikTok", icone: "nota", cor: "#2B2B3A",
    reacao: { texto: "Do meio dos vídeos direto pra trilha. Bem-vindo(a) ao ritmo daqui.", expressao: "feliz" } },
  { valor: "threads", rotulo: "Threads", icone: "arroba", cor: "#4A4A58",
    reacao: { texto: "Uma conversa puxou outra, e aqui estamos.", expressao: "feliz" } },
  { valor: "kwai", rotulo: "Kwai", icone: "claquete", cor: "#FF8A1F",
    reacao: { texto: "Kwai! Então você gosta de história curta. Aqui tem das boas.", expressao: "feliz" } },
  { valor: "anuncios", rotulo: "Anúncio", icone: "megafone", cor: "#8A63E8",
    reacao: { texto: "Então o anúncio funcionou! Sorte a minha.", expressao: "radiante" } },
  { valor: "indicacao", rotulo: "Alguém me indicou", icone: "coracao", cor: "#EF4E5A",
    reacao: { texto: "Alguém lembrou de você. Agradece essa pessoa por mim?", expressao: "radiante" } },
  { valor: "youtube", rotulo: "YouTube", icone: "play", cor: "#E8332F",
    reacao: { texto: "YouTube! Prometo ser mais curto que o vídeo que te trouxe.", expressao: "feliz" } },
  { valor: "igreja", rotulo: "Na minha igreja", icone: "igreja", cor: "#2E8C6A",
    reacao: { texto: "Na igreja! Então tem gente lá orando por você, pode apostar.", expressao: "radiante" } },
  { valor: "google", rotulo: "Procurando no Google", icone: "lupa", cor: "#3C7BF0",
    reacao: { texto: "Você procurou e achou: \"buscai, e encontrareis\" (Mt 7:7).", expressao: "orgulhoso" } },
  { valor: "outro", rotulo: "Outro caminho", icone: "estrela", cor: "#E0A21A",
    reacao: { texto: "Caminho próprio. Os melhores costumam ser assim.", expressao: "feliz" } },
];

const opcaoDe = (lista: Opcao[], valor?: string) => lista.find((o) => o.valor === valor);

export const ROTEIRO: Etapa[] = [
  {
    // Antes destas falas ele está DORMINDO — a tela cuida disso. Elas são o
    // que ele diz ao ser acordado.
    id: "boas-vindas",
    tipo: "despertar",
    estacao: "antes do sol",
    chama: 0.06,
    falas: () => [
      { texto: "Opa! Nem vi você chegar.", expressao: "surpreso", gesto: "parado" },
      { texto: "Eu sou o Devocionalzeiro.", expressao: "feliz", gesto: "acenar" },
      { texto: "Toda noite minha chama baixa, e de manhã eu preciso de ajuda pra acender.", expressao: "pensativo", gesto: "cocar" },
      { texto: "Cada coisa que você me contar vira lenha. Caminha comigo até o sol nascer?", expressao: "radiante", gesto: "apontar" },
    ],
    botao: "Bora caminhar",
  },
  {
    id: "nome",
    tipo: "nome",
    estacao: "o nome",
    chama: 0.16,
    falas: () => [{ texto: "Primeiro o mais importante: como te chamam?", expressao: "feliz", gesto: "apontar" }],
    placeholder: "Seu nome ou apelido",
    botao: "Gravar na placa",
    reacao: (r) => (r.apelido ? [reacaoAoNome(r.apelido)] : null),
  },
  {
    id: "motivo",
    tipo: "lanternas",
    estacao: "as lanternas",
    chama: 0.26,
    opcoes: MOTIVOS,
    falas: (r) => [
      { texto: `Tá vendo essas lanternas, ${nome(r)}? Cada uma é um motivo pra estar aqui.`, expressao: "feliz", gesto: "apontar" },
      { texto: "Acende as que são suas. Pode ser mais de uma.", expressao: "neutro", gesto: "parado" },
    ],
    botao: "Soltar as lanternas",
    reacao: (r): Fala[] => {
      const m = r.motivos ?? [];
      if (m.includes("deus")) return [{ texto: "Sentiu? Não existe lenha melhor que essa.", expressao: "radiante", gesto: "comemorar" }];
      if (m.includes("juntos")) return [{ texto: "\"Melhor é serem dois do que um\" (Ec 4:9). Por isso eu tô aqui.", expressao: "radiante", gesto: "comemorar" }];
      if (m.length >= 3) return [{ texto: `${m.length} lanternas de uma vez! Olha como ela subiu.`, expressao: "surpreso", gesto: "comemorar" }];
      return [{ texto: "Pegou! Tá vendo a chama crescer?", expressao: "radiante", gesto: "comemorar" }];
    },
  },
  {
    id: "familiaridade",
    tipo: "escala",
    estacao: "a raiz",
    chama: 0.38,
    opcoes: FAMILIARIDADE,
    falas: () => [
      { texto: "E a Bíblia, você já conhece bem?", expressao: "pensativo", gesto: "pensar" },
      { texto: "Arrasta sem vergonha. Toda árvore já foi semente.", expressao: "feliz", gesto: "parado" },
    ],
    botao: "É isso",
  },
  {
    // A meta e o plano são UMA etapa: o plano muda enquanto o marcador gira, e
    // a pessoa vê na hora o que cada minuto a mais compra.
    id: "meta",
    tipo: "mostrador",
    estacao: "o ritmo",
    chama: 0.5,
    opcoes: METAS,
    falas: () => [{ texto: "Quanto tempo por dia a gente separa pra Palavra? Gira o marcador.", expressao: "pensativo", gesto: "pensar" }],
    botao: "Combinado",
    reacao: (r) => [{ texto: `Fechado: ${r.meta_min ?? 10} minutos por dia. Tá anotado no meu caderno.`, expressao: "orgulhoso", gesto: "parado" }],
  },
  {
    id: "origem",
    tipo: "selos",
    estacao: "o mapa",
    chama: 0.6,
    opcoes: ORIGENS,
    falas: () => [{ texto: "Agora me conta: por onde você ouviu falar da gente?", expressao: "feliz", gesto: "parado" }],
    reacao: (r) => {
      const o = opcaoDe(ORIGENS, r.origem);
      return o?.reacao ? [{ ...o.reacao, gesto: o.reacao.gesto ?? "acenar" }] : null;
    },
  },
  {
    // Honesto de propósito: hoje o app não manda mensagem automática pelo
    // WhatsApp, então ele não promete versículo diário.
    id: "whatsapp",
    tipo: "telefone",
    estacao: "o recado",
    chama: 0.68,
    falas: () => [
      { texto: "Quer deixar seu WhatsApp? É só pra novidade importante…", expressao: "neutro", gesto: "parado" },
      { texto: "…e pra te ajudar se algo der errado. Nada de corrente, prometo.", expressao: "feliz", gesto: "parado" },
    ],
    placeholder: "(11) 91234-5678",
    botao: "Deixar meu número",
    reacao: (r) =>
      r.whatsapp
        ? [{ texto: "Anotado. Prometo não encher.", expressao: "feliz", gesto: "acenar" }]
        : [{ texto: "Sem problema. Fica pra outra hora.", expressao: "neutro", gesto: "parado" }],
  },
  {
    id: "salvar",
    tipo: "conta",
    estacao: "a lamparina",
    chama: 0.76,
    falas: (r) => [
      { texto: `${nome(r)}, olha o tamanho dessa chama!`, expressao: "radiante", gesto: "comemorar" },
      { texto: "Pra ela não apagar amanhã, vamos guardar tudo numa conta.", expressao: "feliz", gesto: "apontar" },
    ],
  },
  {
    id: "email",
    tipo: "email",
    estacao: "o endereço",
    chama: 0.82,
    falas: () => [{ texto: "Qual e-mail eu uso pra guardar a sua chama?", expressao: "neutro", gesto: "parado" }],
    placeholder: "voce@exemplo.com",
    botao: "Seguir",
  },
  {
    id: "senha",
    tipo: "senha",
    estacao: "a chave",
    chama: 0.9,
    falas: () => [{ texto: "Agora uma senha. Pode digitar, eu não tô olhando.", expressao: "feliz", gesto: "tampar" }],
    placeholder: "8 ou mais, com letra e número",
    botao: "Guardar minha chama",
  },
  {
    id: "fim",
    tipo: "fim",
    estacao: "o nascer do sol",
    chama: 1,
    falas: (r) => [
      { texto: `Olha o sol, ${nome(r)}! A chama tá acesa.`, expressao: "radiante", gesto: "comemorar" },
      { texto: "Lá na frente fica a cidade. Cada dia de leitura é um passo até ela.", expressao: "orgulhoso", gesto: "apontar" },
    ],
    botao: "Entrar na cidade",
  },
];

export const ORDEM: IdEtapa[] = ROTEIRO.map((e) => e.id);

const INDICE = new Map(ROTEIRO.map((e, i) => [e.id, i]));

export function existeEtapa(id: string): id is IdEtapa {
  return INDICE.has(id as IdEtapa);
}

export function etapa(id: IdEtapa): Etapa {
  const i = INDICE.get(id);
  if (i === undefined) throw new Error(`Etapa desconhecida: ${id}`);
  return ROTEIRO[i];
}

/** A etapa seguinte na ordem linear, ou `null` no fim. */
export function proxima(id: IdEtapa): IdEtapa | null {
  const i = INDICE.get(id) ?? -1;
  return i >= 0 && i < ORDEM.length - 1 ? ORDEM[i + 1] : null;
}

/** Índice da etapa na trilha — é o passo que o mundo anda. */
export function indice(id: IdEtapa): number {
  return INDICE.get(id) ?? 0;
}

/** Fração 0..1 do caminho: é a hora do dia no céu. */
export function progresso(id: IdEtapa): number {
  return indice(id) / (ORDEM.length - 1);
}
