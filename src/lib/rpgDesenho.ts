// Utilitários de desenho em canvas partilhados pelo palco do RPG
// (`rpgStageHD`) e pelo herói (`rpgHero`).

type G = CanvasRenderingContext2D;

export const TAU = Math.PI * 2;

export const mixHex = (a: string, b: string, k: number): string => {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const r = Math.round(((pa >> 16) & 255) * (1 - k) + ((pb >> 16) & 255) * k);
  const gg = Math.round(((pa >> 8) & 255) * (1 - k) + ((pb >> 8) & 255) * k);
  const bl = Math.round((pa & 255) * (1 - k) + (pb & 255) * k);
  return `#${((r << 16) | (gg << 8) | bl).toString(16).padStart(6, "0")}`;
};

export const rr = (g: G, x: number, y: number, w: number, h: number, r: number) => {
  const rad = Math.min(r, w / 2, h / 2);
  g.beginPath();
  g.moveTo(x + rad, y);
  g.arcTo(x + w, y, x + w, y + h, rad);
  g.arcTo(x + w, y + h, x, y + h, rad);
  g.arcTo(x, y + h, x, y, rad);
  g.arcTo(x, y, x + w, y, rad);
  g.closePath();
};

export const softShadow = (g: G, x: number, fy: number, w: number, alpha = 0.28) => {
  g.save();
  const grd = g.createRadialGradient(x, fy, 1, x, fy, w);
  grd.addColorStop(0, `rgba(0,0,0,${alpha})`);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.beginPath(); g.ellipse(x, fy, w, w * 0.28, 0, 0, TAU); g.fill();
  g.restore();
};

export const glowCircle = (g: G, x: number, y: number, r: number, color: string, alpha: number) => {
  g.save();
  const grd = g.createRadialGradient(x, y, 0, x, y, r);
  grd.addColorStop(0, color);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.globalAlpha *= alpha;
  g.fillStyle = grd;
  g.fillRect(x - r, y - r, r * 2, r * 2);
  g.restore();
};
