# Revisão de Segurança — Devocionalzeiros

Data: 2026-07-16 · Escopo: sistema inteiro (RLS/Postgres, Edge Functions, frontend).

Postura geral **boa**: nenhuma tabela com RLS desativado, sem escalonamento de
privilégio via `user_roles`, quase todas as funções `admin_*` com guarda
`has_role`, webhooks reais com verificação HMAC, sem `dangerouslySetInnerHTML`/
`eval`/segredos privados no client. Os itens abaixo são as exceções.

Legenda de status: ✅ corrigido neste branch · ⏳ pendente · ⚠️ ação manual necessária.

---

## 🔴 HIGH

### H1 — `send-transactional-email` chamável por qualquer um ✅
`supabase/functions/send-transactional-email/index.ts`. Dependia só de
`verify_jwt=true`, que aceita a anon key pública → qualquer um enviava e-mails/OTP
arbitrários do domínio verificado (phishing, spam, spoofing de OTP).
**Fix:** check explícito de `role === 'service_role'` nos claims do JWT (espelha
`process-email-queue`). Nenhum código do repo chama essa função — é backend-only.
⚠️ Requer **deploy da edge function** para valer em produção.

### H2 — Tokens OAuth do Google Calendar legíveis pelo client ✅
Tabela `rotina_google_calendar` (guarda `access_token`/`refresh_token` em texto
puro). Migration `20260527172131` reabriu SELECT ao dono via SDK anon; XSS/vazamento
→ exfiltração de refresh token → acesso persistente ao Google Calendar.
**Fix:** migration `20260716000000_lock_rotina_google_calendar_tokens.sql` remove
todas as policies de client; só service_role acessa. Client usa a view
`rotina_google_calendar_status` (sem tokens). ⚠️ Requer **aplicar a migration**.

---

## 🟠 MEDIUM

### M1 — Paywall/limite diário burlável por escrita direta ✅
`daily_usage_limits` dava INSERT/UPDATE ao usuário → `UPDATE ... SET usage_count=0`
liberava IA paga ilimitada. **Fix:** migration `20260716000100` remove as policies
de INSERT/UPDATE; só `increment_daily_usage` (SECURITY DEFINER) escreve. SELECT
mantido. ⚠️ Requer aplicar a migration.

### M2 — Cache de IA envenenável / prompt injection armazenado ✅
`verse-study` e `verse-devotional-generator` cacheavam saída derivada do `verseText`
do client sob as coordenadas reais do versículo → um usuário injetava conteúdo falso
visto por todos. **Fix:** só serve cache quando o `verse_text` armazenado bate com o
texto da requisição (normalizado) — auto-corretivo; + limite de tamanho do texto.
⚠️ Requer deploy das edge functions.

### M3 — `enoque-chapter-audio`: overwrite de áudio compartilhado + abuso de TTS ✅
Path determinístico com `upsert:true`, `text` do client, sem limite. **Fix:** auth
movido para antes de qualquer trabalho; capítulo limitado (1–120); `upsert:false`
(conflito tratado como cache hit) → nunca sobrescreve narração existente.
⚠️ Requer deploy. Residual: primeiro gerador legítimo de um capítulo ainda define o
conteúdo (mitigação total exigiria texto server-side).

### M4 — `get_community_profiles` permite enumeração de usuários arbitrários ✅
Retornava nome/avatar para qualquer array de `user_id`. **Fix:** migration
`20260716000100` restringe aos usuários que realmente têm conteúdo na comunidade
(posts/replies). ⚠️ Requer aplicar a migration. Nota: opt-out `show_in_rankings`
não foi forçado na comunidade (participar da comunidade é um contexto de consentimento
distinto do ranking) — decisão de produto, revisar se desejado.

### M5 — `aulas-admin-migrate-covers` roda com service_role e auth desativado ✅
Endpoint público (`verify_jwt=false`) que mexe em storage e `cover_url`. **Fix:**
exige sessão de aulas-admin válida (token → `aulas_sessions` → `aulas_admins`).
⚠️ Requer deploy. Alternativa: remover a função (migração one-shot já concluída).

### M6 — `/aulas/admin` sem guarda de rota ✅
Única rota `/aulas/*` sem `<AulasGuard>`. **Fix:** rota agora envolvida em
`<AulasGuard requireAdmin>` (revalida admin no servidor). Escalonamento via
`aulas_admins.insert()` já era bloqueado pela RLS. Follow-up recomendado (não é
vuln aberta): mover os writes diretos de `aulas_admins` em `AulasAdmin.tsx` para a
edge function `aulas-admin`.

### M7 — `admin_get_referral_metrics()` sem guarda de admin ✅
Única função `admin_*` sem `has_role`, execute PUBLIC. **Fix:** migration
`20260716000100` reescreve em plpgsql com `has_role(auth.uid(),'admin')` +
`REVOKE ... FROM PUBLIC`. ⚠️ Requer aplicar a migration.

### M8 — OTP gerado com `Math.random()` ✅
`aulas-auth-request-otp` usava `Math.random()` (não-CSPRNG) para sessões de 30 dias.
**Fix:** `crypto.getRandomValues` com rejection sampling (sem viés de módulo).
⚠️ Requer deploy.

---

## 🟡 LOW / hardening (⏳ pendente — não corrigido neste branch)

- **`authorized_purchases`**: policy de SELECT direto expõe CPF/telefone/transaction_id
  do próprio usuário; deveria ir só via view `my_purchase_summary`.
- **`kiwify-webhook`**: token via query string (risco de log/referrer), compare não
  constant-time, PII crua logada mesmo em rejeição. (Forjar compra exige o token.)
- **OTP aulas**: enumera e-mails de membros (403 vs 200) + email bombing (só throttle
  60s/e-mail, sem por-IP). Adicionar rate limit por IP e resposta uniforme.
- **`admin-reset-password`**: retorna senha temporária em texto puro e ecoa exceção.
- **Shopify Storefront token hardcoded** (`src/lib/shopifyApi.ts:6`): token de
  storefront (público por design); mover p/ env e ⚠️ **rotacionar** (está no histórico git).
- **`.env` versionado** (fora do `.gitignore`): hoje só valores públicos; adicionar ao
  `.gitignore` + `.env.example` para evitar vazamento futuro de segredos.
- Open redirect fraco (`Auth.tsx` aceita `//evil.com`), tokens em `localStorage`,
  compares de segredo não constant-time (vários), CORS `*`, `postMessage` com `"*"`
  (`VSLModal.tsx`), ausência de header `Content-Security-Policy` (`vercel.json`).

---

## Ações manuais necessárias (fora do código)

1. **Aplicar as migrations** `20260716000000` e `20260716000100` no projeto Supabase
   (`qwkitwlppplhiabquxsx`). Não foram aplicadas automaticamente porque esse projeto
   não está conectado à integração Supabase desta sessão.
2. **Deploy das edge functions** alteradas: `send-transactional-email`, `verse-study`,
   `verse-devotional-generator`, `enoque-chapter-audio`, `aulas-auth-request-otp`,
   `aulas-admin-migrate-covers`.
3. **Rotacionar** o token Shopify Storefront (está no histórico do git) ao tratar os LOW.

---

## Confirmado seguro (verificado)

`user_roles` (sem self-insert → sem escalonamento), tabelas `financial_*`/`rotina_*`/
`rpg_*` com ownership correto, caches com `INSERT WITH CHECK(false)`, OTP/sessão aulas
deny-all, `bible-proxy` não é SSRF-able, `devocionalzeiro-chat` protege o system prompt
contra injeção, webhooks `auth-email-hook`/`handle-email-suppression` com HMAC.
