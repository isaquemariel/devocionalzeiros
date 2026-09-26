/**
 * PROFUNDIDADE DO CHÃO DA SALA.
 *
 * O jogo que serviu de referência é 3D: o chão tem plano, os objetos têm
 * volume e a câmera olha de cima em ângulo. A nossa cena é vetorial em vista
 * lateral, e o chão era um degradê chapado do horizonte para baixo — por isso
 * a sala parecia um painel pintado, e não um lugar onde se anda.
 *
 * Aqui não se refaz o motor: acrescentam-se as PISTAS DE PROFUNDIDADE que o
 * olho usa para ler um plano, todas por cima do cenário do livro e sem tocar
 * em `drawScenicHD` (que a cena viva também usa, em 500 capítulos):
 *
 * 1. DOBRA DO HORIZONTE — sombra curta onde o plano encontra o fundo. É o
 *    que diz ao olho "isto é um plano deitado", e não uma parede. (Grade de
 *    faixas alternadas foi tentada antes e saiu listrada: o olho lia banding
 *    de compressão, não profundidade.)
 * 2. TRILHA — uma faixa de terra que nasce estreita no horizonte e chega
 *    larga na frente. Ancorada no MUNDO, então desliza com a câmera.
 * 3. PRIMEIRO PLANO — moitas escuras coladas na borda de baixo que correm
 *    MAIS RÁPIDO que o chão. É a pista mais forte de todas: nada convence
 *    tanto de que se está andando quanto ver o mato perto passar voando
 *    enquanto a serra ao longe quase não se mexe.
 *
 * Tudo em alfa sobre o que já está desenhado, para funcionar em qualquer
 * paleta de livro — do deserto de Gênesis ao Céu da sala global.
 */

type G = CanvasRenderingContext2D;

/**
 * Degradês verticais em cache. São os mesmos em todo quadro — só mudam de
 * tamanho —, e `createLinearGradient` a 60 fps é alocação pura.
 */
const CACHE_GRAD = new Map<string, CanvasGradient>();
function degrade(g: G, chave: string, y0: number, y1: number, paradas: string[]): CanvasGradient {
  const achado = CACHE_GRAD.get(chave);
  if (achado) return achado;
  const lg = g.createLinearGradient(0, y0, 0, y1);
  paradas.forEach((c, i) => lg.addColorStop(i / (paradas.length - 1), c));
  if (CACHE_GRAD.size > 24) CACHE_GRAD.clear(); // troca de sala/rotação: não cresce
  CACHE_GRAD.set(chave, lg);
  return lg;
}

/** A trilha não muda de forma: só de tamanho. Pintada uma vez, esticada sempre. */
const CACHE_TRILHA: Record<string, HTMLCanvasElement | null> = {};
function trilhaCache(claro: boolean): HTMLCanvasElement | null {
  const chave = claro ? "claro" : "escuro";
  if (chave in CACHE_TRILHA) return CACHE_TRILHA[chave];
  let c: HTMLCanvasElement | null = null;
  try {
    const L = 192, A = 384;
    c = document.createElement("canvas");
    c.width = L; c.height = A;
    const q = c.getContext("2d");
    if (!q) throw new Error("sem 2d");
    const cor = claro ? "120,86,44" : "198,172,132";
    const forte = claro ? 0.22 : 0.11;
    // o trapézio: estreito em cima (horizonte), largo embaixo (frente)
    q.beginPath();
    q.moveTo(L * 0.47, 0); q.lineTo(L * 0.53, 0);
    q.lineTo(L, A); q.lineTo(0, A);
    q.closePath(); q.clip();
    const lg = q.createLinearGradient(0, 0, L, 0);
    lg.addColorStop(0, `rgba(${cor},0)`);
    lg.addColorStop(0.36, `rgba(${cor},${forte})`);
    lg.addColorStop(0.64, `rgba(${cor},${forte})`);
    lg.addColorStop(1, `rgba(${cor},0)`);
    q.fillStyle = lg; q.fillRect(0, 0, L, A);
    // some na direção do horizonte — aqui o recorte é local, então dá para
    // apagar de verdade sem comer o cenário por baixo
    q.globalCompositeOperation = "destination-out";
    const fade = q.createLinearGradient(0, 0, 0, A * 0.62);
    fade.addColorStop(0, "rgba(0,0,0,1)");
    fade.addColorStop(1, "rgba(0,0,0,0)");
    q.fillStyle = fade; q.fillRect(0, 0, L, A * 0.62);
  } catch {
    c = null; // sem DOM (teste/SSR): a sala vive sem trilha
  }
  CACHE_TRILHA[chave] = c;
  return c;
}

export interface ChaoDims {
  W: number;      // largura do MUNDO (unidades lógicas)
  H: number;      // altura da cena
  GROUND: number; // linha do horizonte
  camX: number;   // canto esquerdo da janela, no mundo
  VW: number;     // largura da janela
}

/** Fração 0..1 da faixa de chão → y na tela, com espaçamento em perspectiva. */
const yDeProfundidade = (p: number, GROUND: number, H: number) =>
  GROUND + (H - GROUND) * Math.pow(p, 1.65);

/**
 * Faixas do plano + trilha. Desenhe DEPOIS do cenário e ANTES dos props e
 * das pessoas — é chão, tem de ficar debaixo de tudo o que pisa nele.
 */
export function drawRoomFloor(g: G, d: ChaoDims, claro: boolean): void {
  const { W, H, GROUND, camX, VW } = d;
  const faixa = H - GROUND;
  if (faixa <= 4) return;

  g.save();

  // ---- 1. a dobra do horizonte -----------------------------------------
  // Uma sombra curta onde o plano encontra o fundo. É o que separa "chão"
  // de "parede pintada" — e vale mais que qualquer linha de grade.
  g.fillStyle = degrade(g, `dobra:${GROUND}:${faixa}`, GROUND, GROUND + faixa * 0.26,
    ["rgba(0,0,0,0.30)", "rgba(0,0,0,0)"]);
  g.fillRect(camX, GROUND, VW, faixa * 0.26);

  // ---- 2. trilha --------------------------------------------------------
  // Nasce estreita no horizonte e abre na frente, com as bordas suaves nos
  // DOIS eixos. Pintada uma vez num canvas de cache e esticada: montá-la em
  // fatias no quadro deixava emendas horizontais visíveis (cada fatia com a
  // sua opacidade), e com alfa chapado e aresta reta ela lia-se como facho
  // de holofote, não como caminho gasto de tanto passar gente.
  const selo = trilhaCache(claro);
  if (selo) {
    const y0 = GROUND + faixa * 0.04;
    for (const eixo of [W * 0.28, W * 0.72]) {
      const baseW = Math.max(6, W * 0.012) * 7 + faixa * 0.26;
      if (eixo + baseW < camX - 40 || eixo - baseW > camX + VW + 40) continue;
      g.drawImage(selo, eixo - baseW / 2, y0, baseW, H - y0);
    }
  }

  // ---- 3. beirada da frente --------------------------------------------
  // Escurece a borda de baixo: a moldura empurra o miolo para dentro e o
  // chão deixa de acabar no nada.
  g.fillStyle = degrade(g, `perto:${H}:${faixa}`, H - faixa * 0.3, H,
    ["rgba(0,0,0,0)", "rgba(6,4,14,0.34)"]);
  g.fillRect(camX, H - faixa * 0.3, VW, faixa * 0.3);

  g.restore();
}

/**
 * Primeiro plano: moitas e capim colados na borda de baixo, em silhueta.
 * Desenhe por ÚLTIMO, já com a transformação de parallaxe rápida aplicada
 * pelo chamador — aqui só se desenha em coordenadas do mundo.
 */
export function drawRoomForeground(g: G, W: number, H: number, camX: number, VW: number): void {
  g.save();
  // silhueta, não ilustração: perto da câmera o olho não lê detalhe, e um
  // arbusto detalhado na frente rouba a atenção de quem está conversando.
  g.fillStyle = "rgba(6,5,12,0.82)";

  // Poucas e GRANDES. Um festão baixo e contínuo some atrás da barra de
  // falar; o que se quer é passar por uma moita alta de vez em quando e
  // sentir que ela veio de lado, rápido.
  const passo = Math.max(150, W / 6);
  for (let x = 0; x < W + passo; x += passo) {
    // variação estável por posição (nada de random por quadro: piscaria)
    const h = (Math.sin(x * 0.037) * 0.5 + 0.5) * H * 0.11 + H * 0.10;
    const larg = passo * (0.34 + (Math.cos(x * 0.021) * 0.5 + 0.5) * 0.30);
    if (x + larg < camX - 60 || x - larg > camX + VW + 60) continue;

    const base = H + h * 0.22; // enterrada na borda: só a copa aparece
    g.beginPath();
    g.ellipse(x, base, larg * 0.5, h, 0, Math.PI, 0);
    g.closePath();
    g.fill();
    g.beginPath();
    g.ellipse(x - larg * 0.34, base, larg * 0.3, h * 0.72, 0, Math.PI, 0);
    g.closePath();
    g.fill();
    g.beginPath();
    g.ellipse(x + larg * 0.36, base, larg * 0.26, h * 0.62, 0, Math.PI, 0);
    g.closePath();
    g.fill();
    // fio de luz na copa: sem ele a silhueta preta some no escuro do rodapé
    g.save();
    g.strokeStyle = "rgba(150,190,150,0.20)"; g.lineWidth = 2;
    g.beginPath(); g.ellipse(x, base, larg * 0.5, h, 0, Math.PI * 1.12, Math.PI * 1.9);
    g.stroke();
    g.restore();
  }
  g.restore();
}
