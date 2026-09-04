#!/usr/bin/env node
// ============================================================================
// FOLHA DE CONTATO das CENAS — desenha beats REAIS (fundo + props + elenco) num
// Chromium de verdade e salva um PNG, do mesmo jeito que o app desenha.
//
// Existe porque nenhum validador vê a imagem. Foi assim que apareceram: o muro
// de Jerico intacto no versiculo em que ele cai, a casa de Dagom de pe no
// desabamento, Abraao com o cutelo erguido longe do altar, e o papel `rei`
// saindo sempre de manto roxo e coroa mesmo disfarcado.
//
// Uso:  node scripts/scene-shot.mjs "livro:cap:v,livro:cap:v,..." saida.png
// Ex.:  node scripts/scene-shot.mjs "1kings:18:38,1kings:19:12" /tmp/carmelo.png
//
// Cada quadro traz, embaixo, a referencia, o `by` do beat e o texto que o balao
// vai mostrar — para conferir de uma vez a imagem E a fala.
// ============================================================================
import { build } from "esbuild";
import { writeFileSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os"; import { join, resolve } from "node:path";
import { chromium } from "playwright-core";
const ROOT = resolve(new URL("..", import.meta.url).pathname);
const ALVOS=process.argv[2].split(",").map(s=>s.split(":"));
const OUT=process.argv[3]??"/tmp/scenes.png";
const tmp=mkdtempSync(join(tmpdir(),"sc-"));
writeFileSync(join(tmp,"e.ts"),`
import { drawBackdropHD, drawPropHD, drawHumanHD } from "${ROOT}/src/lib/rpgStageHD";
import { drawBeingHD, BEING_ROLES } from "${ROOT}/src/lib/rpgStageBeings";
import { STAGE_BOOKS } from "${ROOT}/src/lib/rpgStageRegistry";
import { stagedAt, makeDrawState, envAt, depthToFeetY, depthScale, SET_W, balloonText } from "${ROOT}/src/lib/rpgStage";
Object.assign(window as any,{drawBackdropHD,drawPropHD,drawHumanHD,drawBeingHD,BEING_ROLES,STAGE_BOOKS,stagedAt,makeDrawState,envAt,depthToFeetY,depthScale,SET_W,balloonText});`);
await build({entryPoints:[join(tmp,"e.ts")],bundle:true,format:"iife",outfile:join(tmp,"b.js"),alias:{"@":join(ROOT,"src")},logLevel:"silent"});
const js=readFileSync(join(tmp,"b.js"),"utf8");
const bible=JSON.parse(readFileSync(join(ROOT,"public/bible/arc.json"),"utf8"));
const CW=560, CH=256, COLS=2, rows=Math.ceil(ALVOS.length/COLS);
const html=`<!doctype html><meta charset=utf-8><body style="margin:0;background:#0d0f16">
<canvas id=c width=${COLS*CW} height=${rows*(CH+30)}></canvas><script>${js}</script><script>
const A=${JSON.stringify(ALVOS)}, B=${JSON.stringify(bible)}, CW=${CW},CH=${CH},COLS=${COLS};
const g=document.getElementById('c').getContext('2d');
g.fillStyle='#0d0f16'; g.fillRect(0,0,${COLS*CW},${rows*(CH+30)});
const skyPropY=(dy,ground)=>Math.round(ground*(1-Math.max(0,Math.min(1,dy)))*0.92+6);
A.forEach(([book,chS,vS],i)=>{
  const ch=+chS, v=+vS, script=window.STAGE_BOOKS[book][ch];
  const idx=script.beats.findIndex(b=>b.v===v);
  const dims={W:CW,H:CH,GROUND:Math.round(CH*0.44),BOT:CH-26};
  const cx=(i%COLS)*CW, cy=Math.floor(i/COLS)*(CH+30);
  g.save(); g.translate(cx,cy);
  g.beginPath(); g.rect(0,0,CW,CH); g.clip();
  // o app faz: state.envTarget = envAt(script, idx) e o fundo interpola ate la.
  // Aqui ja entramos com o ambiente DO BEAT nos dois lados, senao o fundo sai
  // com o env do beat 0 do capitulo (foi o bug da primeira versao deste script).
  const e=window.envAt(script,idx);
  const st={env:{...e},envTarget:{...e}};
  window.drawBackdropHD(g,{dims,t:1500,reduce:false,state:st});
  const S=window.stagedAt(script,idx);
  const items=[]; let skyN=0;
  for(const pr of S.props){
    const sx=(pr.x/window.SET_W)*dims.W;
    if(pr.sky){ const syy=skyPropY(pr.feetDy,dims.GROUND); items.push({fy:-9999+skyN++,d:()=>window.drawPropHD(g,pr.kind,sx,syy,{scale:pr.scale??1,t:1500,reduce:false,fire:pr.fire})}); continue; }
    const fy=window.depthToFeetY(pr.feetDy,dims);
    items.push({fy,d:()=>window.drawPropHD(g,pr.kind,sx,fy,{scale:(pr.scale??1)*window.depthScale(pr.feetDy),t:1500,reduce:false,fire:pr.fire})});
  }
  for(const a of S.cast){
    const fy=window.depthToFeetY(a.feetDy,dims), sx=(a.x/window.SET_W)*dims.W;
    const spec={role:a.role,pose:a.pose??'stand',facing:a.facing??1,scale:(a.scale??1)*window.depthScale(a.feetDy),t:1500,reduce:false,glow:a.glow,alpha:1,palette:a.palette,seed:a.id??a.role};
    items.push({fy,d:()=>window.BEING_ROLES.has(a.role)?window.drawBeingHD(g,sx,fy,spec):window.drawHumanHD(g,sx,fy,spec)});
  }
  items.sort((p,q)=>p.fy-q.fy).forEach(it=>it.d());
  g.restore();
  const beat=script.beats[idx];
  const vt=(B[book].chapters[ch-1][v-1].t)||'';
  const bal=window.balloonText(vt,beat.q);
  g.fillStyle='#e8ecf5'; g.font='bold 13px monospace';
  g.fillText(book+' '+ch+':'+v+(beat.by?'  by='+beat.by:''), cx+6, cy+CH+14);
  g.fillStyle='#93a0bb'; g.font='11px sans-serif';
  g.fillText((bal||'').slice(0,96), cx+6, cy+CH+27);
});
document.title='ok';
</script>`;
writeFileSync(join(tmp,"p.html"),html);
const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium"});
const p=await b.newPage({viewport:{width:COLS*CW,height:rows*(CH+30)}});
const errs=[]; p.on("pageerror",e=>errs.push(e.message));
await p.goto("file://"+join(tmp,"p.html")); await p.waitForTimeout(700);
await p.locator("#c").screenshot({path:OUT});
await b.close();
if(errs.length) console.error("ERROS:",errs.slice(0,3).join(" | "));
console.log("escrito:",OUT);
