#!/usr/bin/env node
// ============================================================================
// SHOOT-SCENE — QA VISUAL da cena viva. Renderiza beats reais em Chromium e
// salva PNGs, para revisar o que o JOGADOR vê (não o que o código promete).
//
//   node scripts/shoot-scene.mjs genesis 1 1,2,3,9,14,20,26   [--w 844 --h 390]
//
// Padrão: viewport de celular DEITADO (844×390) — o formato real de jogo.
// Saída: .scene-shots/<livro><cap>-v<versículo>.png
// ============================================================================
import { build } from "esbuild";
import { mkdirSync, writeFileSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { chromium } from "playwright-core";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const [book = "genesis", chapterArg = "1", versesArg = "1"] = process.argv.slice(2).filter(a => !a.startsWith("--"));
const flag = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? Number(process.argv[i + 1]) : d; };
const W = flag("w", 844), H = flag("h", 390);
const chapter = Number(chapterArg);
const wanted = versesArg.split(",").map(Number);

// bundle do motor (mesmo código do app)
const tmp = mkdtempSync(join(tmpdir(), "shot-"));
writeFileSync(join(tmp, "e.mjs"), `
export { getStageScript } from "${join(ROOT, "src/lib/rpgStageRegistry.ts")}";
export { stagedAt, envAt, makeDrawState, SET_W, depthToFeetY, depthScale } from "${join(ROOT, "src/lib/rpgStage.ts")}";
export { drawBackdropHD, drawPropHD, drawHumanHD, drawHeroHD } from "${join(ROOT, "src/lib/rpgStageHD.ts")}";
export { BEING_ROLES, drawBeingHD } from "${join(ROOT, "src/lib/rpgStageBeings.ts")}";
export { DEFAULT_LOOK } from "${join(ROOT, "src/lib/rpgMascot.ts")}";
`);
await build({ entryPoints: [join(tmp, "e.mjs")], bundle: true, format: "iife", globalName: "ENGINE", outfile: join(tmp, "engine.js"), alias: { "@": join(ROOT, "src") }, logLevel: "silent" });
const engineJs = readFileSync(join(tmp, "engine.js"), "utf8");

const page = `<!doctype html><html><body style="margin:0;background:#0b0805">
<canvas id="c" style="position:absolute;inset:0;width:100%;height:100%"></canvas>
<script>${engineJs}</script>
<script>
const CAM_H = 256;
window.shoot = ({ book, chapter, v, W, H }) => {
  const { getStageScript, stagedAt, envAt, makeDrawState, SET_W, depthToFeetY, depthScale,
          drawBackdropHD, drawPropHD, drawHumanHD, drawHeroHD, BEING_ROLES, drawBeingHD, DEFAULT_LOOK } = ENGINE;
  const script = getStageScript(book, chapter);
  if (!script) return "sem roteiro";
  const idx = script.beats.findIndex(b => b.v === v);
  if (idx < 0) return "sem beat";
  const aspect = W / H;
  const camW = Math.max(320, Math.min(760, Math.round(CAM_H * aspect)));
  const dims = { W: camW, H: CAM_H, GROUND: Math.round(CAM_H * 0.44), BOT: CAM_H - 26 };
  const c = document.getElementById("c");
  const px = 3;
  c.width = camW * px; c.height = CAM_H * px;
  c.style.width = W + "px"; c.style.height = Math.round(W / (camW / CAM_H)) + "px";
  const g = c.getContext("2d");
  g.setTransform(px, 0, 0, px, 0, 0);
  g.clearRect(0, 0, camW, CAM_H);
  // ambiente FINAL do beat (sem interpolação — o estado estável)
  const env = envAt(script, idx);
  const state = makeDrawState(script);
  state.env = { ...env }; state.envTarget = { ...env };
  const t = 1500;
  drawBackdropHD(g, { dims, t, reduce: false, state });
  const st = stagedAt(script, idx);
  const items = [];
  let skyN = 0;
  for (const p of st.props) {
    const sx = (p.x / SET_W) * dims.W;
    if (p.sky) {
      // MESMA regra do app: dy é ALTURA (0 horizonte → 1 zênite), sem
      // depthScale, desenhado ATRÁS de tudo.
      const sy = Math.round((1 - Math.max(0, Math.min(1, p.dy ?? 0.5))) * dims.GROUND);
      items.push({ fy: -9999 + (skyN++), d: () => drawPropHD(g, p.kind, sx, sy, { scale: p.scale ?? 1, t, reduce: false, fire: p.fire }) });
      continue;
    }
    const fy = depthToFeetY(p.feetDy, dims);
    items.push({ fy, d: () => drawPropHD(g, p.kind, sx, fy, { scale: (p.scale ?? 1) * depthScale(p.feetDy), t, reduce: false, fire: p.fire }) });
  }
  for (const a of st.cast) {
    const fy = depthToFeetY(a.feetDy, dims);
    const sx = Math.max(0.05, Math.min(0.95, a.x / SET_W)) * dims.W;
    const spec = { role: a.role, pose: a.pose ?? "stand", facing: a.facing ?? 1, scale: (a.scale ?? 1) * depthScale(a.feetDy), t, reduce: false, glow: a.glow, palette: a.palette, seed: a.id ?? a.role };
    items.push({ fy, d: () => (BEING_ROLES.has(a.role) ? drawBeingHD(g, sx, fy, spec) : drawHumanHD(g, sx, fy, spec)) });
  }
  // o JOGADOR (herói) — onde ele nasce na cena
  const hdy = 0.62, hfy = depthToFeetY(hdy, dims);
  items.push({ fy: hfy, d: () => { const k = depthScale(hdy) * 0.85; g.save(); g.translate(0.32 * dims.W, hfy); g.scale(k, k); g.translate(-0.32 * dims.W, -hfy);
    drawHeroHD(g, 0.32 * dims.W, hfy, DEFAULT_LOOK, { t, reduce: false, walking: false, face: 1 }); g.restore(); } });
  items.sort((a, b) => a.fy - b.fy).forEach(i => i.d());
  return "ok";
};
</script></body></html>`;

const out = join(ROOT, ".scene-shots");
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox"] });
const pg = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
await pg.setContent(page, { waitUntil: "load" });
for (const v of wanted) {
  const r = await pg.evaluate((a) => window.shoot(a), { book, chapter, v, W, H });
  if (r !== "ok") { console.log(`v.${v}: ${r}`); continue; }
  const el = await pg.$("#c");
  await el.screenshot({ path: join(out, `${book}${chapter}-v${v}.png`) });
  console.log(`✓ ${book} ${chapter}:${v} → .scene-shots/${book}${chapter}-v${v}.png`);
}
await browser.close();
