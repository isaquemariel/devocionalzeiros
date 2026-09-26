import {
  BOCAS, BRACO_REPOUSO, REPOUSO_D, REPOUSO_E, alvoBracos, type Boca, type Expressao, type Gesto,
} from "./geometria";

/**
 * A ANIMAÇÃO DO DEVOCIONALZEIRO — o "corpo" dele, sem desenho.
 *
 * Um simulador: a cada quadro recebe o ALVO (expressão, gesto, chama, para
 * onde olhar, a fala, os pulsos de reação) e devolve a POSE — onde está cada
 * parte naquele instante. As molas dão peso ao movimento; a piscada tem
 * intervalo irregular; o olhar vagueia quando ninguém dá um alvo.
 *
 * Quem desenha só lê a pose: o rig em SVG escreve nos atributos, o boneco
 * vestido (canvas, com o guarda-roupa do RPG) pinta. Por isso os dois se
 * mexem exatamente igual — o mesmo pulo, a mesma pirueta, a mesma boca.
 */

export interface AlvoAnimacao {
  expressao: Expressao;
  gesto: Gesto;
  /** 0..1 */
  chama: number;
  falando: boolean;
  /** -1..1; `null` = vagueia */
  olhar: { x: number; y: number } | null;
  /** muda → pulinho */
  pulso: number;
  /** muda → aceno curto de cabeça */
  toque: number;
  /** muda → PULO de verdade (alto, o da tela inicial: toque duplo / espaço) */
  salto?: number;
}

export interface Pose {
  /** quanto o corpo subiu (pulo), em unidades do rig */
  altura: number;
  sx: number;
  sy: number;
  /** inclinação do corpo, em graus */
  tilt: number;
  /** escala da sombra no chão */
  sombra: number;
  peE: { x: number; y: number };
  peD: { x: number; y: number };
  gazeX: number;
  gazeY: number;
  escalaOlho: number;
  /** abertura vertical do olho (já com a piscada) */
  abertura: number;
  olhosFelizes: boolean;
  olhosFechados: boolean;
  /** a expressão das sobrancelhas */
  expressao: Expressao;
  boca: Boca;
  bochecha: number;
  bracoE: { ang: number; len: number };
  bracoD: { ang: number; len: number };
  /** a chama já amortecida (com o "susto" das reações) */
  chama: number;
  /** a chama se inclina contra o movimento, -1..1 */
  inclinacao: number;
  gesto: Gesto;
}

export interface EstadoAnimacao {
  bracoE: number; bracoD: number; lenE: number; lenD: number;
  gazeX: number; gazeY: number; chama: number;
  pulsoVisto: number; pulsoEm: number;
  toqueVisto: number; toqueEm: number;
  proximaPiscada: number; piscandoEm: number; piscadaDupla: boolean;
  vagarX: number; vagarY: number; proximoVagar: number;
  alturaAnt: number; inclinacao: number;
  saltoVisto: number; saltoEm: number;
}

export function criarEstado(a: AlvoAnimacao): EstadoAnimacao {
  return {
    bracoE: REPOUSO_E, bracoD: REPOUSO_D, lenE: BRACO_REPOUSO, lenD: BRACO_REPOUSO,
    gazeX: 0, gazeY: 0, chama: a.chama,
    pulsoVisto: a.pulso, pulsoEm: -10,
    toqueVisto: a.toque, toqueEm: -10,
    proximaPiscada: 1.2 + Math.random() * 2, piscandoEm: -10, piscadaDupla: false,
    vagarX: 0, vagarY: 0, proximoVagar: 2,
    alturaAnt: 0, inclinacao: 0,
    saltoVisto: a.salto ?? 0, saltoEm: -10,
  };
}

const mola = (atual: number, alvoV: number, k: number, dt: number) => atual + (alvoV - atual) * (1 - Math.exp(-k * dt));
const festivo = (g: Gesto) => g === "comemorar" || g === "pirueta" || g === "vitoria";

/** avança o simulador: `t` em segundos desde o início, `dt` o passo */
export function avancar(s: EstadoAnimacao, a: AlvoAnimacao, t: number, dt: number, reduzir: boolean): Pose {
  // ── pulo (reação) ──────────────────────────────────────────────────────
  if (a.pulso !== s.pulsoVisto) { s.pulsoVisto = a.pulso; s.pulsoEm = t; }
  let altura = 0, sx = 1, sy = 1;
  const pulando = (tt: number, alturaMax: number) => {
    if (tt < 0.09) { const u = tt / 0.09; sy = 1 - 0.13 * u; sx = 1 + 0.09 * u; }            // antecipação
    else if (tt < 0.49) { const u = (tt - 0.09) / 0.4; altura = alturaMax * 4 * u * (1 - u); // voo
      sy = 1 + 0.11 * (1 - u); sx = 1 - 0.07 * (1 - u); }
    else if (tt < 0.64) { const u = (tt - 0.49) / 0.15; const k = Math.sin(Math.PI * u);     // pouso
      sy = 1 - 0.14 * k; sx = 1 + 0.1 * k; }
  };
  if ((a.salto ?? 0) !== s.saltoVisto) { s.saltoVisto = a.salto ?? 0; s.saltoEm = t; }
  // o pulo grande: o mesmo arco (antecipa, voa, amassa no pouso), mais alto e
  // um pouco mais lento; a sombra fica no chão e encolhe com a altura
  const noSalto = t - s.saltoEm;
  if (!reduzir && noSalto < 0.86) pulando(noSalto * (0.64 / 0.86), 66);
  else if (!reduzir) {
    if (a.gesto === "comemorar" || a.gesto === "vitoria") pulando(t % 1.05, a.gesto === "vitoria" ? 14 : 22);
    else if (a.gesto === "pirueta") pulando((t % 1.4) * 0.75, 34);
    else if (t - s.pulsoEm < 0.64) pulando(t - s.pulsoEm, 18);
  }
  // andar: quique curto, alternando os pés
  const peE = { x: 0, y: 0 }, peD = { x: 0, y: 0 };
  if (a.gesto === "andar" && !reduzir) {
    const f = t * 9;
    altura += Math.abs(Math.sin(f)) * 3.2;
    peE.y = -Math.max(0, Math.sin(f)) * 5; peD.y = -Math.max(0, -Math.sin(f)) * 5;
    peE.x = Math.sin(f) * 3; peD.x = -Math.sin(f) * 3;
  }
  // aceno curto: amassa e volta, em 0,22 s
  if (a.toque !== s.toqueVisto) { s.toqueVisto = a.toque; s.toqueEm = t; }
  const tq = t - s.toqueEm;
  let aceno = 0;
  if (!reduzir && tq < 0.22) { const k = Math.sin((Math.PI * tq) / 0.22); sy *= 1 - 0.05 * k; sx *= 1 + 0.03 * k; aceno = 4 * k; }
  // respiração: dormindo é mais funda e mais lenta
  const dorme = a.expressao === "dormindo";
  const resp = reduzir ? 0 : dorme ? Math.sin(t * 1.25) * 0.028 : Math.sin(t * 2.1) * 0.012;
  sy *= 1 + resp; sx *= 1 - resp * 0.5;
  // espreguiçar estica o corpo inteiro
  if (a.gesto === "espreguicar" && !reduzir) { const k = 0.5 + 0.5 * Math.sin(t * 2); sy *= 1 + 0.06 * k; sx *= 1 - 0.035 * k; }
  // inclinação da chama contra o movimento (ação secundária)
  const velY = (altura - s.alturaAnt) / Math.max(dt, 0.001);
  s.alturaAnt = altura;
  s.inclinacao = mola(s.inclinacao, Math.max(-1, Math.min(1, velY / 120)), 10, dt);
  // cabeça inclinada ao pensar; dormindo, ela pende devagar; andando, ele se inclina para a frente
  const tilt = (a.gesto === "pensar" ? -6
    : dorme ? 5 + Math.sin(t * 0.6) * (reduzir ? 0 : 2.5)
    : a.gesto === "andar" ? 4
    : a.expressao === "surpreso" ? 0 : Math.sin(t * 0.9) * (reduzir ? 0 : 1.2)) + aceno;
  // pirueta: no ar, ele dá uma volta inteira — em 2D, a largura passa por zero
  if (a.gesto === "pirueta" && !reduzir) {
    const u = ((t % 1.4) * 0.75 - 0.09) / 0.4;
    if (u > 0 && u < 1) sx *= Math.cos(u * Math.PI * 2);
  }

  // ── olhar ──────────────────────────────────────────────────────────────
  if (!a.olhar && t > s.proximoVagar) {
    const olharPraGente = Math.random() < 0.45;
    s.vagarX = olharPraGente ? 0 : (Math.random() - 0.5) * 1.6;
    s.vagarY = olharPraGente ? 0 : (Math.random() - 0.5) * 0.9;
    s.proximoVagar = t + 1.6 + Math.random() * 3.4;
  }
  const gx = a.olhar ? a.olhar.x : s.vagarX;
  const gy = a.olhar ? a.olhar.y : s.vagarY;
  s.gazeX = mola(s.gazeX, Math.max(-1, Math.min(1, gx)), a.olhar ? 14 : 7, dt);
  s.gazeY = mola(s.gazeY, Math.max(-1, Math.min(1, gy)), a.olhar ? 14 : 7, dt);

  // ── piscar: intervalo irregular, às vezes duplo ────────────────────────
  if (!reduzir && t > s.proximaPiscada) {
    s.piscandoEm = t;
    s.piscadaDupla = Math.random() < 0.18;
    s.proximaPiscada = t + 2.2 + Math.random() * 3.8;
  }
  let fechar = 0;
  const tp = t - s.piscandoEm;
  if (tp < 0.15) fechar = Math.sin((Math.PI * tp) / 0.15);
  else if (s.piscadaDupla && tp > 0.22 && tp < 0.37) fechar = Math.sin((Math.PI * (tp - 0.22)) / 0.15);
  const exp = a.expressao;
  const bocejo = a.gesto === "espreguicar";
  const olhosFechados = dorme || bocejo;
  const olhosFelizes = !olhosFechados && (exp === "radiante" || a.gesto === "comemorar" || a.gesto === "pirueta");
  const escalaOlho = exp === "surpreso" ? 1.12 : exp === "triste" ? 0.92 : 1;
  const abertura = Math.max(0.06, 1 - fechar) * escalaOlho;

  // ── boca: expressão, ou fala ───────────────────────────────────────────
  let boca: Boca = bocejo ? BOCAS.surpreso : BOCAS[exp];
  if (a.falando && !reduzir) {
    const f = Math.sin(t * 17) + Math.sin(t * 11.3) * 0.6;
    boca = f > 0.55 ? BOCAS.falaAberta : f > -0.2 ? BOCAS.falaMeia : BOCAS[exp === "triste" ? "triste" : "neutro"];
  }
  const bochecha = exp === "radiante" || exp === "feliz" ? 0.55 : exp === "orgulhoso" ? 0.4 : 0.22;

  // ── braços (mola) ──────────────────────────────────────────────────────
  const ab = alvoBracos(reduzir && a.gesto !== "tampar" && a.gesto !== "espiar" ? "parado" : a.gesto, t);
  const kb = a.gesto === "acenar" || a.gesto === "andar" || festivo(a.gesto) ? 18 : 11;
  s.bracoE = mola(s.bracoE, ab.e, kb, dt); s.bracoD = mola(s.bracoD, ab.d, kb, dt);
  s.lenE = mola(s.lenE, ab.le, 12, dt); s.lenD = mola(s.lenD, ab.ld, 12, dt);

  // ── chama ──────────────────────────────────────────────────────────────
  const excit = festivo(a.gesto) ? 0.18 : t - s.pulsoEm < 0.9 ? 0.12 : 0;
  s.chama = mola(s.chama, Math.max(0, Math.min(1, a.chama)) + excit, 2.6, dt);

  return {
    altura, sx, sy, tilt, sombra: Math.max(0.35, 1 - altura / 90), peE, peD,
    gazeX: s.gazeX, gazeY: s.gazeY, escalaOlho, abertura, olhosFelizes, olhosFechados,
    expressao: exp, boca, bochecha,
    bracoE: { ang: s.bracoE, len: s.lenE }, bracoD: { ang: s.bracoD, len: s.lenD },
    chama: s.chama, inclinacao: s.inclinacao, gesto: a.gesto,
  };
}
