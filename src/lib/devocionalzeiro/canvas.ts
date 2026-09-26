import {
  BASE_CHAMA, BOCAS, BOCHECHA_D, BOCHECHA_E, CAMADAS, CHAO, CORES, CORPO_FRENTE, CORPO_LADO, EMBLEMA, EMBLEMA_CENTRO,
  LINGUA, N_BRASAS, OLHO_D, OLHO_E, OLHO_FECHADO_D, OLHO_FECHADO_E, OLHO_FELIZ_D, OLHO_FELIZ_E, OLHO_RAIO, OMBRO_D,
  OMBRO_E, PE_D, PE_E, SOBRANCELHA, SOBRANCELHA_D, SOBRANCELHA_E, SOMBRA, alvoBracos,
  type Expressao, type Gesto,
} from "./geometria";

/**
 * O DEVOCIONALZEIRO EM CANVAS — o mesmo boneco do rig em SVG, para as cenas do
 * RPG, que desenham tudo num `<canvas>` a cada quadro.
 *
 * Lê a MESMA geometria (`./geometria`): os contornos do corpo, dos olhos, das
 * bocas e das sobrancelhas são os paths do SVG, lidos por `Path2D`; a chama é
 * a mesma conta de línguas. A diferença é que aqui não há estado nem molas —
 * o canvas redesenha tudo a cada quadro a partir do tempo `t`, então cada
 * movimento é uma função de `t` (o pulo, o balanço, a piscada, as brasas).
 *
 * Quem desenha trabalha em UNIDADES DO RIG (o viewBox 205×229, com o chão em
 * y = 196). `noChao()` monta a transformação cena → rig a partir dos pés.
 */

// ─── cor do corpo (o guarda-roupa do RPG vende cores) ───────────────────────
export interface PaletaCorpo {
  /** radial do corpo: luz, meio, borda */
  corpo: readonly [string, string, string];
  lado: readonly [string, string];
  braco: string;
  contorno: string;
  pe: string;
  /** sobrancelha e traço da boca */
  tinta: string;
  /** os arcos dos olhos fechados/felizes */
  arco: string;
  bochecha: string;
  sombra: string;
}

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const misturar = (a: string, b: string, k: number) => {
  const x = hex(a), y = hex(b);
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, "0")).join("")}`;
};

/** paleta a partir de três tons (luz, meio, sombra), com o traço certo para o fundo */
function paleta(luz: string, meio: string, borda: string, clara: boolean): PaletaCorpo {
  return {
    corpo: [luz, meio, borda],
    lado: [misturar(borda, "#000000", 0.45), misturar(borda, "#000000", 0.15)],
    braco: misturar(meio, borda, 0.35),
    contorno: misturar(luz, "#ffffff", clara ? 0.1 : 0.18),
    pe: misturar(borda, "#000000", 0.2),
    tinta: clara ? misturar(borda, "#000000", 0.6) : CORES.sobrancelha,
    arco: clara ? misturar(borda, "#000000", 0.55) : CORES.olhoFechado,
    bochecha: clara ? "#ff8aa8" : CORES.bochecha,
    sombra: CORES.sombra,
  };
}

export const PALETAS: Record<string, PaletaCorpo> = {
  blue: {
    corpo: CORES.corpo, lado: CORES.lado, braco: CORES.braco, contorno: CORES.bracoContorno, pe: CORES.pe,
    tinta: CORES.sobrancelha, arco: CORES.olhoFechado, bochecha: CORES.bochecha, sombra: CORES.sombra,
  },
  yellow: paleta("#ffd54a", "#e8a818", "#a8700a", true),
  red: paleta("#e0574f", "#b02a2a", "#6a1212", false),
  pink: paleta("#ffa6cf", "#e2679f", "#9c3466", true),
  skyblue: paleta("#8fd4f6", "#4aa8dc", "#1d6a9a", true),
  black: { ...paleta("#3a3d48", "#22242c", "#0c0d11", false), tinta: "#c9d0e2" },
  white: paleta("#ffffff", "#e3e7ef", "#a9b0c0", true),
  orange: paleta("#ffa65a", "#ec7a22", "#9a4508", true),
  green: paleta("#5fcf7a", "#34a352", "#155f2a", false),
};

// ─── pose ───────────────────────────────────────────────────────────────────
export interface PoseCanvas {
  /** relógio, em ms */
  t: number;
  reduce?: boolean;
  andando?: boolean;
  expressao?: Expressao;
  gesto?: Gesto;
  /** 0..1 — o tamanho da chama (0,34 é a chama de todo dia) */
  chama?: number;
  /** para onde ele olha, -1..1 */
  olharX?: number;
  paleta?: PaletaCorpo;
}

/** tudo o que um quadro precisa, calculado uma vez (os acessórios leem daqui) */
export interface Quadro {
  t: number;
  reduce: boolean;
  altura: number;
  sx: number;
  sy: number;
  inclinacao: number;
  bracoE: { ang: number; len: number };
  bracoD: { ang: number; len: number };
  pe: { ex: number; ey: number; dx: number; dy: number };
  expressao: Expressao;
  gesto: Gesto;
  chama: number;
  olharX: number;
  piscando: boolean;
  paleta: PaletaCorpo;
}

const TAU = Math.PI * 2;

export function calcularQuadro(p: PoseCanvas): Quadro {
  const reduce = !!p.reduce;
  const t = p.t / 1000;
  const gesto: Gesto = p.andando ? "andar" : p.gesto ?? "parado";
  const expressao: Expressao = p.expressao ?? (p.andando ? "feliz" : "neutro");

  let altura = 0, sx = 1, sy = 1;
  const pulando = (tt: number, max: number) => {
    if (tt < 0.09) { const u = tt / 0.09; sy = 1 - 0.13 * u; sx = 1 + 0.09 * u; }
    else if (tt < 0.49) { const u = (tt - 0.09) / 0.4; altura = max * 4 * u * (1 - u); sy = 1 + 0.11 * (1 - u); sx = 1 - 0.07 * (1 - u); }
    else if (tt < 0.64) { const u = (tt - 0.49) / 0.15; const k = Math.sin(Math.PI * u); sy = 1 - 0.14 * k; sx = 1 + 0.1 * k; }
  };
  if (!reduce && (gesto === "comemorar" || gesto === "vitoria")) pulando(t % 1.05, gesto === "vitoria" ? 14 : 22);
  let pe = { ex: 0, ey: 0, dx: 0, dy: 0 };
  if (gesto === "andar" && !reduce) {
    const f = t * 9;
    altura += Math.abs(Math.sin(f)) * 3.2;
    pe = { ex: Math.sin(f) * 3, ey: -Math.max(0, Math.sin(f)) * 5, dx: -Math.sin(f) * 3, dy: -Math.max(0, -Math.sin(f)) * 5 };
  }
  const resp = reduce ? 0 : Math.sin(t * 2.1) * 0.012;
  sy *= 1 + resp; sx *= 1 - resp * 0.5;
  const inclinacao = gesto === "andar" ? 4 : gesto === "pensar" ? -6 : reduce ? 0 : Math.sin(t * 0.9) * 1.2;

  const b = alvoBracos(reduce ? "parado" : gesto, t);
  const piscando = !reduce && ((p.t + 830) % 3400) < 130;
  return {
    t, reduce, altura, sx, sy, inclinacao,
    bracoE: { ang: b.e, len: b.le }, bracoD: { ang: b.d, len: b.ld }, pe,
    expressao, gesto,
    chama: Math.max(0, Math.min(1, p.chama ?? 0.34)) + (gesto === "comemorar" ? 0.15 : 0),
    olharX: Math.max(-1, Math.min(1, p.olharX ?? 0)),
    piscando,
    paleta: p.paleta ?? PALETAS.blue,
  };
}

// ─── transformações ─────────────────────────────────────────────────────────
/**
 * Leva o canvas das unidades da CENA para as do RIG: os pés em (x, fy) e o
 * boneco (do chão ao topo da cabeça, sem a chama) com `alturaCorpo` unidades.
 * `face` -1 espelha (ele olha para a esquerda). Chame dentro de save/restore.
 */
export function noChao(g: CanvasRenderingContext2D, x: number, fy: number, alturaCorpo: number, face: 1 | -1 = 1) {
  const k = alturaCorpo / (CHAO.y - 63);
  g.translate(x, fy);
  g.scale(k * face, k);
  g.translate(-CHAO.x, -CHAO.y);
  return k;
}

/** a transformação do corpo (pulo, inclinação, amasso) — acessórios presos a ele usam a mesma */
export function noCorpo(g: CanvasRenderingContext2D, q: Quadro) {
  g.translate(102, 188);
  g.translate(0, -q.altura);
  g.rotate((q.inclinacao * Math.PI) / 180);
  g.scale(q.sx, q.sy);
  g.translate(-102, -188);
}

/** centro da mão, em unidades do rig (espaço do corpo) */
export function mao(q: Quadro, lado: "e" | "d") {
  const o = lado === "e" ? OMBRO_E : OMBRO_D;
  const b = lado === "e" ? q.bracoE : q.bracoD;
  const d = b.len - 16.5;
  const a = (b.ang * Math.PI) / 180;
  return { x: o.x - Math.sin(a) * d, y: o.y + Math.cos(a) * d, ang: b.ang };
}

// ─── caminhos fixos (lidos uma vez) ─────────────────────────────────────────
let cache: Record<string, Path2D> | null = null;
function caminhos() {
  if (!cache) {
    cache = {
      frente: new Path2D(CORPO_FRENTE), lado: new Path2D(CORPO_LADO), emblema: new Path2D(EMBLEMA),
      felizE: new Path2D(OLHO_FELIZ_E), felizD: new Path2D(OLHO_FELIZ_D),
      fechadoE: new Path2D(OLHO_FECHADO_E), fechadoD: new Path2D(OLHO_FECHADO_D),
      sobE: new Path2D(SOBRANCELHA_E), sobD: new Path2D(SOBRANCELHA_D),
    };
    for (const [k, b] of Object.entries(BOCAS)) cache[`boca-${k}`] = new Path2D(b.d);
  }
  return cache;
}
/** a silhueta do corpo (frente + lombada), para recortar roupa por ela */
export function silhueta(): Path2D {
  const p = new Path2D();
  p.addPath(caminhos().frente);
  p.addPath(caminhos().lado);
  return p;
}

const elipse = (g: CanvasRenderingContext2D, e: { cx: number; cy: number; rx: number; ry: number }, cor: string) => {
  g.fillStyle = cor;
  g.beginPath();
  g.ellipse(e.cx, e.cy, e.rx, e.ry, 0, 0, TAU);
  g.fill();
};

// ─── partes ─────────────────────────────────────────────────────────────────
export function desenharSombra(g: CanvasRenderingContext2D, q: Quadro) {
  const hs = Math.max(0.55, 1 - q.altura / 55);
  g.save();
  g.globalAlpha *= 0.28 * hs;
  g.translate(SOMBRA.cx, SOMBRA.cy); g.scale(hs, 1); g.translate(-SOMBRA.cx, -SOMBRA.cy);
  elipse(g, SOMBRA, q.paleta.sombra);
  g.restore();
}

export function desenharPes(g: CanvasRenderingContext2D, q: Quadro) {
  const cor = q.paleta.pe;
  elipse(g, { ...PE_E, cx: PE_E.cx + q.pe.ex, cy: PE_E.cy + q.pe.ey - q.altura * 0.85 }, cor);
  elipse(g, { ...PE_D, cx: PE_D.cx + q.pe.dx, cy: PE_D.cy + q.pe.dy - q.altura * 0.85 }, cor);
}

/** a chama da cabeça — atrás do corpo, a base some dentro da cabeça */
export function desenharChama(g: CanvasRenderingContext2D, q: Quadro, base = BASE_CHAMA) {
  const t = q.t;
  const H = 17 + 58 * q.chama;
  const tremor = q.reduce ? 0.25 : 1;
  const cores = [CORES.fogoExt, CORES.fogoMed, CORES.fogoNuc] as const;
  const pontas: { x: number; y: number }[] = [];
  CAMADAS.forEach((cam, ci) => {
    g.globalAlpha = ci === 0 ? 0.96 : 1;
    cam.linguas.forEach((l) => {
      const lento = 1 - l.h * 0.55;
      const fl = 1 + tremor * (0.12 * Math.sin(t * (4.2 + lento * 5) + l.f) + 0.07 * Math.sin(t * (12.7 + ci * 1.3) + l.f * 2.1));
      const sway = tremor * ((2.2 + l.h * 4.2) * Math.sin(t * (1.9 + lento * 3.2) + l.f) + 1.3 * Math.sin(t * (8.9 + ci) + l.f));
      const cx = base.x + l.dx * (0.7 + q.chama * 0.4);
      const hw = l.hw * (0.62 + q.chama * 0.46);
      const ty = base.y - H * l.h * fl;
      const tx = cx + sway + l.dx * 0.35 * (0.5 + q.chama) + 2.5 * l.h;
      const by = base.y, h = by - ty, curva = sway * 1.6;
      const grd = g.createLinearGradient(0, by + hw * 0.3, 0, ty);
      const c = cores[ci];
      c.forEach((cor, i) => grd.addColorStop(i / (c.length - 1), cor));
      g.fillStyle = grd;
      g.beginPath();
      g.moveTo(cx - hw, by);
      g.bezierCurveTo(cx - hw * 1.08, by - h * 0.5, tx - hw * 0.62 + curva, ty + h * 0.46, tx, ty);
      g.bezierCurveTo(tx + hw * 0.3 + curva * 0.4, ty + h * 0.32, cx + hw * 1.06, by - h * 0.52, cx + hw, by);
      g.quadraticCurveTo(cx, by + hw * 0.55, cx - hw, by);
      g.fill();
      if (ci === 0) pontas.push({ x: tx, y: ty });
    });
  });
  g.globalAlpha = 1;
  if (q.reduce) return;
  // brasas: sem estado — cada uma tem a sua fase no relógio
  g.fillStyle = CORES.brasa;
  const n = Math.round(N_BRASAS * (0.35 + q.chama * 0.65));
  for (let i = 0; i < n; i++) {
    const dur = 0.8 + ((i * 37) % 9) / 10;
    const u = ((t + i * 0.61) % dur) / dur;
    const x0 = base.x + (((i * 53) % 21) - 10) * (0.8 + q.chama);
    const x = x0 + Math.sin(t * 3 + i) * 3 * u;
    const y = base.y - H * (0.35 + ((i * 29) % 5) / 10) - u * (22 + q.chama * 30);
    g.globalAlpha = (1 - u) * 0.9;
    g.beginPath(); g.arc(x, y, 0.6 + 1.3 * (1 - u), 0, TAU); g.fill();
  }
  g.globalAlpha = 1;
  return pontas;
}

export function desenharCorpo(g: CanvasRenderingContext2D, q: Quadro) {
  const c = caminhos();
  const pal = q.paleta;
  const lado = g.createLinearGradient(58, 0, 68, 0);
  lado.addColorStop(0, pal.lado[0]); lado.addColorStop(1, pal.lado[1]);
  g.fillStyle = lado;
  g.fill(c.lado);
  const corpo = g.createRadialGradient(122.8, 106.3, 0, 122.8, 106.3, 80);
  corpo.addColorStop(0, pal.corpo[0]); corpo.addColorStop(0.55, pal.corpo[1]); corpo.addColorStop(1, pal.corpo[2]);
  g.fillStyle = corpo;
  g.fill(c.frente);
}

/** a chama da barriga — some debaixo das roupas */
export function desenharEmblema(g: CanvasRenderingContext2D, q: Quadro) {
  const e = EMBLEMA_CENTRO;
  const px = q.reduce ? 1 : 1 + Math.sin(q.t * 5.3) * 0.05;
  const py = q.reduce ? 1 : 1 + Math.sin(q.t * 6.1) * 0.08;
  g.save();
  g.translate(e.x, e.y); g.scale(e.escala, e.escala); g.translate(-e.x, -e.y);
  g.translate(112, 149); g.scale(px, py); g.translate(-112, -149);
  const grd = g.createLinearGradient(0, 157, 0, 139);
  grd.addColorStop(0, CORES.fogoMed[0]); grd.addColorStop(1, CORES.fogoMed[1]);
  g.fillStyle = grd;
  g.fill(caminhos().emblema);
  g.restore();
}

export function desenharRosto(g: CanvasRenderingContext2D, q: Quadro) {
  const c = caminhos();
  const pal = q.paleta;
  const exp = q.expressao;
  g.save();
  g.translate(q.olharX * 1.6, 0);
  const blush = exp === "radiante" || exp === "feliz" ? 0.55 : exp === "orgulhoso" ? 0.4 : 0.22;
  g.globalAlpha = blush;
  elipse(g, BOCHECHA_E, pal.bochecha);
  elipse(g, BOCHECHA_D, pal.bochecha);
  g.globalAlpha = 1;

  const dorme = exp === "dormindo";
  const felizes = !dorme && (exp === "radiante" || q.gesto === "comemorar" || q.gesto === "pirueta");
  g.lineCap = "round"; g.lineJoin = "round";
  if (felizes || dorme) {
    g.strokeStyle = pal.arco;
    g.lineWidth = felizes ? 3 : 2.6;
    g.stroke(felizes ? c.felizE : c.fechadoE);
    g.stroke(felizes ? c.felizD : c.fechadoD);
  } else {
    const esc = exp === "surpreso" ? 1.12 : exp === "triste" ? 0.92 : 1;
    const ab = (q.piscando ? 0.08 : 1) * esc;
    for (const o of [OLHO_E, OLHO_D]) {
      g.save();
      g.translate(o.x, o.y); g.scale(esc, ab); g.translate(-o.x, -o.y);
      g.fillStyle = CORES.esclera;
      g.beginPath(); g.ellipse(o.x, o.y, OLHO_RAIO.rx, OLHO_RAIO.ry, 0, 0, TAU); g.fill();
      g.save();
      g.beginPath(); g.ellipse(o.x, o.y, OLHO_RAIO.rx, OLHO_RAIO.ry, 0, 0, TAU); g.clip();
      const ix = o.x + 0.5 + q.olharX * 3.3, iy = o.y + 1.2;
      const iris = g.createRadialGradient(ix - 1, iy - 3.1, 0, ix - 1, iy - 3.1, 14.6);
      iris.addColorStop(0, CORES.iris[0]); iris.addColorStop(0.45, CORES.iris[1]); iris.addColorStop(1, CORES.iris[2]);
      g.fillStyle = iris;
      g.beginPath(); g.arc(ix, iy, 10.4, 0, TAU); g.fill();
      g.fillStyle = CORES.pupila;
      g.beginPath(); g.arc(ix, iy + 0.2, 5, 0, TAU); g.fill();
      g.fillStyle = "#ffffff";
      g.beginPath(); g.arc(ix - 3.7, iy - 4.6, 3.5, 0, TAU); g.fill();
      g.globalAlpha = 0.9;
      g.beginPath(); g.arc(ix + 2.9, iy + 2.8, 1.4, 0, TAU); g.fill();
      g.restore();
      g.globalAlpha = 0.6;
      g.strokeStyle = CORES.contornoOlho; g.lineWidth = 1.2;
      g.beginPath(); g.ellipse(o.x, o.y, OLHO_RAIO.rx, OLHO_RAIO.ry, 0, 0, TAU); g.stroke();
      g.globalAlpha = 1;
      g.restore();
    }
  }

  const s = SOBRANCELHA[exp];
  g.strokeStyle = pal.tinta; g.lineWidth = 2.2;
  g.save(); g.translate(0, s.e[0]); g.translate(94, 79); g.rotate((s.e[1] * Math.PI) / 180); g.translate(-94, -79); g.stroke(c.sobE); g.restore();
  g.save(); g.translate(0, s.d[0]); g.translate(129, 79); g.rotate((s.d[1] * Math.PI) / 180); g.translate(-129, -79); g.stroke(c.sobD); g.restore();

  const boca = BOCAS[exp];
  const p = c[`boca-${exp}`];
  if (boca.cheia) {
    g.fillStyle = CORES.bocaCheia; g.fill(p);
    if (boca.lingua) elipse(g, LINGUA, CORES.lingua);
  } else {
    g.strokeStyle = pal.tinta === CORES.sobrancelha ? CORES.traco : pal.tinta;
    g.lineWidth = 2.2; g.stroke(p);
  }
  g.restore();
}

export function desenharBraco(g: CanvasRenderingContext2D, q: Quadro, lado: "e" | "d") {
  const o = lado === "e" ? OMBRO_E : OMBRO_D;
  const b = lado === "e" ? q.bracoE : q.bracoD;
  g.save();
  g.translate(o.x, o.y);
  g.rotate((b.ang * Math.PI) / 180);
  g.fillStyle = q.paleta.braco;
  g.strokeStyle = q.paleta.contorno;
  g.lineWidth = 1.6;
  g.beginPath();
  g.roundRect(-10.5, -6, 21, Math.max(21, b.len), 10.5);
  g.fill(); g.stroke();
  g.restore();
}

/**
 * O boneco inteiro, sem acessórios: para as telas que só precisam DELE (o
 * início do RPG, a leitura, a landing). `alturaCorpo` é a altura do chão ao
 * topo da cabeça, em unidades da cena.
 */
export function desenharDevocionalzeiro(
  g: CanvasRenderingContext2D, x: number, fy: number, alturaCorpo: number, pose: PoseCanvas, face: 1 | -1 = 1,
) {
  const q = calcularQuadro(pose);
  g.save();
  noChao(g, x, fy, alturaCorpo, face);
  desenharSombra(g, q);
  desenharPes(g, q);
  g.save();
  noCorpo(g, q);
  desenharChama(g, q);
  desenharCorpo(g, q);
  desenharEmblema(g, q);
  desenharRosto(g, q);
  desenharBraco(g, q, "e");
  desenharBraco(g, q, "d");
  g.restore();
  g.restore();
  return q;
}
