#!/usr/bin/env node
// ============================================================================
// PROVA A AUTO-VERIFICAÇÃO DO PAR VAPID.
//
// `send-push-notification` passou a verificar, antes de enviar, se
// VAPID_PUBLIC_KEY e VAPID_PRIVATE_KEY são mesmo do mesmo par — porque quando
// não são, o Google recusa TODOS os envios com 403 e a Apple com 400, e o único
// sinal disso era uma coluna de zeros no log. A verificação é matemática: uma
// chave P-256 só se importa com `d` e `x`/`y` juntos se os três forem
// consistentes.
//
// Este teste gera dois pares REAIS e confirma que a verificação aprova o par
// coerente e reprova o par trocado. Sem ele, a verificação nova podia estar a
// devolver "ok" para tudo e ninguém notaria.
//
//   node scripts/test-vapid-par.mjs
// ============================================================================
const b64u = (s) => s.replace(/-/g, "+").replace(/_/g, "/");
const parOk = async (pub, priv) => {
  try {
    const raw = Uint8Array.from(atob(b64u(pub) + "==".slice(0, (4 - pub.length % 4) % 4)), (c) => c.charCodeAt(0));
    if (raw.length !== 65 || raw[0] !== 0x04) return false;
    const enc = (b) => btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    await crypto.subtle.importKey("jwk",
      { kty: "EC", crv: "P-256", x: enc(raw.slice(1, 33)), y: enc(raw.slice(33, 65)), d: priv, ext: true },
      { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
    return true;
  } catch { return false; }
};
const b64urlBuf = (buf) => Buffer.from(buf).toString("base64url");
async function gera() {
  const kp = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
  const pub = b64urlBuf(await crypto.subtle.exportKey("raw", kp.publicKey));
  const jwk = await crypto.subtle.exportKey("jwk", kp.privateKey);
  return { pub, priv: jwk.d };
}
const A = await gera(), B = await gera();
const casos = [
  ["par coerente (A.pub + A.priv)", await parOk(A.pub, A.priv), true],
  ["par trocado  (A.pub + B.priv)", await parOk(A.pub, B.priv), false],
  ["par trocado  (B.pub + A.priv)", await parOk(B.pub, A.priv), false],
  ["pública lixo", await parOk("nao-e-uma-chave", A.priv), false],
  ["privada vazia", await parOk(A.pub, ""), false],
];
let mau = 0;
for (const [nome, obtido, esperado] of casos) {
  const ok = obtido === esperado;
  if (!ok) mau++;
  console.log(`${ok ? "✅" : "❌"} ${nome.padEnd(32)} → ${obtido} (esperado ${esperado})`);
}
console.log(mau ? `\n✗ ${mau} caso(s) errado(s)` : "\n✓ a verificação distingue par bom de par trocado");
process.exit(mau ? 1 : 0);
