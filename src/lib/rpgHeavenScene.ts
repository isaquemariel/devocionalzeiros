// ============================================================================
// Cena da SALA GLOBAL — o Céu, como a Bíblia descreve (Apocalipse 21–22):
// glória e trono de Deus, arco-íris ao redor do trono (Ap 4:3), muros de
// jaspe/cristal com portas de pérola, rua de ouro puro "como vidro
// transparente", o rio da água da vida e anjos. Pixel-art, com animação sutil.
// ============================================================================
import type { SceneDims } from "@/lib/rpgScene";

type G = CanvasRenderingContext2D;

const R = (g: G, x: number, y: number, w: number, h: number, c: string) => { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)); };

// rand determinístico (o Céu é igual pra todos → layout estável)
function mkRand(seed: number) { let s = seed >>> 0; return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff; }

export function drawHeavenScene(g: G, dims: SceneDims, t: number, reduce: boolean) {
  const { W, H, GROUND } = dims;
  const pulse = reduce ? 0.5 : 0.5 + 0.5 * Math.abs(Math.sin(t * 0.0016));

  // ---- céu de glória (dourado → branco) ----
  const sky = g.createLinearGradient(0, 0, 0, GROUND + 10);
  sky.addColorStop(0, "#fff6df");
  sky.addColorStop(0.45, "#ffe9b8");
  sky.addColorStop(1, "#ffd489");
  R(g, 0, 0, W, GROUND + 12, "#000"); g.fillStyle = sky; g.fillRect(0, 0, W, GROUND + 12);

  // glória radial atrás do trono
  const cx = Math.round(W * 0.5), throneY = Math.round(GROUND * 0.52);
  const glow = g.createRadialGradient(cx, throneY, 4, cx, throneY, GROUND * 0.95);
  glow.addColorStop(0, `rgba(255,255,255,${0.85 * (0.7 + pulse * 0.3)})`);
  glow.addColorStop(0.35, "rgba(255,246,205,0.55)");
  glow.addColorStop(1, "rgba(255,246,205,0)");
  g.fillStyle = glow; g.fillRect(0, 0, W, GROUND + 12);

  // raios de luz saindo do trono
  if (!reduce) {
    g.save(); g.globalAlpha = 0.10 + pulse * 0.10; g.fillStyle = "#fffdf2";
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + t * 0.0002;
      g.beginPath(); g.moveTo(cx, throneY);
      g.lineTo(cx + Math.cos(a) * W, throneY + Math.sin(a) * H * 0.7);
      g.lineTo(cx + Math.cos(a + 0.10) * W, throneY + Math.sin(a + 0.10) * H * 0.7);
      g.closePath(); g.fill();
    }
    g.restore();
  }

  // ---- muros de cristal/jaspe + portas de pérola (horizonte) ----
  const wallTop = Math.round(GROUND * 0.66), wallBot = GROUND + 2;
  for (let x = 0; x < W; x += 26) {
    R(g, x, wallTop, 24, wallBot - wallTop, "rgba(150,214,224,0.34)");   // cristal translúcido
    R(g, x, wallTop, 24, 3, "rgba(255,255,255,0.5)");                    // topo iluminado
    R(g, x + 22, wallTop, 2, wallBot - wallTop, "rgba(120,180,200,0.4)"); // junta
    // ameias
    R(g, x + 4, wallTop - 4, 6, 4, "rgba(180,230,238,0.5)");
    R(g, x + 15, wallTop - 4, 6, 4, "rgba(180,230,238,0.5)");
  }
  // portas de pérola (arcos claros) espaçadas
  for (let gx = Math.round(W * 0.2); gx < W; gx += Math.round(W * 0.34)) {
    R(g, gx - 9, wallTop + 6, 18, wallBot - wallTop - 6, "rgba(255,250,240,0.55)");
    g.fillStyle = "rgba(255,255,255,0.7)";
    g.beginPath(); g.arc(gx, wallTop + 8, 9, Math.PI, 0); g.fill();
  }

  // ---- trono de Deus (dourado, elevado) + arco-íris ao redor ----
  // arco-íris (Ap 4:3 — esmeralda em destaque)
  const rbow = ["rgba(120,220,170,0.5)", "rgba(150,200,255,0.4)", "rgba(255,220,150,0.4)"];
  for (let i = 0; i < rbow.length; i++) {
    g.strokeStyle = rbow[i]; g.lineWidth = 3;
    g.beginPath(); g.arc(cx, throneY + 10, 26 + i * 5, Math.PI * 1.05, Math.PI * 1.95); g.stroke();
  }
  // dais + trono
  R(g, cx - 16, throneY + 6, 32, 10, "#e8b04b");
  R(g, cx - 12, throneY + 4, 24, 4, "#ffdf9a");
  R(g, cx - 9, throneY - 12, 18, 18, "#f4c85a");       // assento/encosto
  R(g, cx - 9, throneY - 12, 18, 4, "#fff0c0");        // topo do encosto
  R(g, cx - 11, throneY - 6, 3, 12, "#d99a2e"); R(g, cx + 8, throneY - 6, 3, 12, "#d99a2e"); // braços
  // brilho central (a glória)
  g.save(); g.globalAlpha = 0.6 + pulse * 0.4; R(g, cx - 4, throneY - 8, 8, 10, "#fffdf0"); g.restore();

  // ---- rio da água da vida (faixa cristalina que corre) ----
  const rivY = GROUND + 4, rivH = Math.max(6, Math.round(H * 0.03));
  const riv = g.createLinearGradient(0, rivY, 0, rivY + rivH);
  riv.addColorStop(0, "#bff4ff"); riv.addColorStop(0.5, "#7fe0ff"); riv.addColorStop(1, "#4fb8e6");
  g.fillStyle = riv; g.fillRect(0, rivY, W, rivH);
  if (!reduce) {
    g.fillStyle = "rgba(255,255,255,0.75)";
    for (let x = 0; x < W; x += 12) {
      const yy = rivY + 2 + Math.sin((x + t * 0.05) * 0.25) * 1.6;
      g.fillRect(Math.round(x + ((t * 0.03) % 12)), Math.round(yy), 4, 1);
    }
  }

  // ---- rua de ouro puro ("como vidro transparente") ----
  const floorY = rivY + rivH;
  const floor = g.createLinearGradient(0, floorY, 0, H);
  floor.addColorStop(0, "#f6cf72"); floor.addColorStop(0.5, "#eab945"); floor.addColorStop(1, "#c98f2a");
  g.fillStyle = floor; g.fillRect(0, floorY, W, H - floorY);
  // ladrilhos de ouro em perspectiva (linhas convergindo)
  g.strokeStyle = "rgba(120,80,20,0.22)"; g.lineWidth = 1;
  for (let i = -6; i <= 6; i++) {
    const fx = cx + i * (W * 0.09);
    g.beginPath(); g.moveTo(cx + i * 6, floorY); g.lineTo(fx, H); g.stroke();
  }
  for (let j = 1; j <= 5; j++) {
    const yy = floorY + (H - floorY) * (j / 5.5) * (j / 5.5);
    g.beginPath(); g.moveTo(0, yy); g.lineTo(W, yy); g.stroke();
  }
  // reflexos/brilhos no ouro
  const rnd = mkRand(97);
  g.fillStyle = "rgba(255,248,210,0.6)";
  for (let i = 0; i < 26; i++) {
    const sx = rnd() * W, sy = floorY + rnd() * (H - floorY);
    const tw = reduce ? 1 : (0.5 + 0.5 * Math.sin(t * 0.005 + i));
    if (tw > 0.6) g.fillRect(Math.round(sx), Math.round(sy), 2, 1);
  }

  // ---- anjos flutuando ----
  const angels = [[0.16, 0.30], [0.83, 0.26], [0.30, 0.16], [0.68, 0.18], [0.5, 0.12]];
  angels.forEach(([ax, ay], i) => {
    const x = Math.round(ax * W), y = Math.round(ay * GROUND + (reduce ? 0 : Math.sin(t * 0.002 + i * 1.7) * 4));
    // asas
    R(g, x - 8, y - 1, 6, 4, "rgba(255,255,255,0.9)");
    R(g, x + 4, y - 1, 6, 4, "rgba(255,255,255,0.9)");
    // corpo/túnica
    R(g, x - 2, y - 3, 5, 8, "#fdf3d6");
    R(g, x - 2, y - 6, 5, 4, "#ffe6b0"); // cabeça
    // auréola
    g.strokeStyle = "rgba(255,220,120,0.9)"; g.lineWidth = 1;
    g.beginPath(); g.arc(x, y - 7, 3, 0, Math.PI * 2); g.stroke();
  });

  // faíscas de glória no ar
  if (!reduce) {
    const r2 = mkRand(31); g.fillStyle = "rgba(255,255,255,0.85)";
    for (let i = 0; i < 22; i++) {
      const sx = r2() * W, sy = r2() * GROUND;
      if (Math.sin(t * 0.004 + i * 2) > 0.4) g.fillRect(Math.round(sx), Math.round(sy), 1, 1);
    }
  }
}
