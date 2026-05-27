# Tornar a liberação da Área de Membros à prova de falhas

## Diagnóstico

Os webhooks da sua compra de teste **chegaram** ao servidor, mas foram rejeitados:

```
2026-05-27 17:52 / 17:54 / 17:57  →  ERROR "Invalid or missing webhook token"
```

Causa: o token recebido da Kiwify não bate com o segredo `KIWIFY_WEBHOOK_TOKEN`. Sem passar nessa validação, o webhook nunca chega no trecho que:
1. Grava em `authorized_purchases` (libera plano)
2. Faz upsert em `aulas_product_access` (libera curso da Área de Membros)
3. Envia o e-mail de boas-vindas

Além disso, mesmo com webhook funcionando, o e-mail de boas-vindas da Área de Membros só dispara quando o `product_id` da compra bate com algum `kiwify_product_id` cadastrado em `aulas_cursos`. Hoje só existe **1 curso** cadastrado (`oR51sse` — Os Segredos do Livro de Enoque). Se a compra teste foi de outro produto, nada de e-mail.

## Plano

### 1. Corrigir o token do webhook (causa imediata)
- Pedir ao usuário o token atual configurado na Kiwify (painel da Kiwify → Apps/Webhooks → ver token) e atualizar o segredo `KIWIFY_WEBHOOK_TOKEN` para casar exatamente.
- Adicionar log do *campo* onde o token chegou (query, body, header) e dos primeiros caracteres do token recebido vs esperado para facilitar debug futuro (sem expor o segredo inteiro).

### 2. Logar TODOS os webhooks recebidos (auditoria)
- Nova tabela `kiwify_webhook_log` (id, received_at, event_type, email, product_id, raw_payload jsonb, status: accepted/rejected/processed, error_message).
- Gravar uma linha **antes** da validação de token, para nunca mais perder um webhook.
- Painel admin mostra os últimos 50 e permite reprocessar manualmente.

### 3. Botão admin "Reenviar acesso por e-mail"
No `AdminHD` (gestão de usuários / área de membros):
- Campo: e-mail do comprador + seleção de curso.
- Ação: força upsert em `aulas_product_access` + reseta `welcome_sent_at` + reenfileira o e-mail de boas-vindas.
- Resolve qualquer caso onde o webhook falhou ou o cliente não recebeu o e-mail (caixa de spam, etc.).

### 4. Job de reconciliação diária (defesa em profundidade)
Edge function agendada (cron diário) que:
- Varre `authorized_purchases` ativos das últimas 48h cujo `product_id` bate com algum `aulas_cursos.kiwify_product_id`.
- Garante que existe linha em `aulas_product_access` e que o e-mail de boas-vindas foi enviado.
- Logs claros do que foi corrigido.

### 5. Endpoint de teste manual do webhook
Botão no admin "Simular webhook Kiwify" que aceita JSON colado pelo admin e dispara o mesmo fluxo (autenticado por admin, sem precisar de token), útil para testar sem fazer compra real.

## Detalhes técnicos

- Migração: criar `kiwify_webhook_log` com RLS (apenas admin lê).
- `supabase/functions/kiwify-webhook/index.ts`: inserir log raw antes da verificação de token; melhorar mensagens de erro; **não** mudar a lógica de matching de produto.
- `supabase/functions/aulas-resend-welcome/index.ts` (nova): autenticada via JWT admin; reusa o template `AulasWelcomeEmail`.
- `supabase/functions/reconcile-aulas-access/index.ts` (nova): rodada por `pg_cron` diariamente às 03:00 BRT.
- UI admin: nova aba "Webhooks Kiwify" em `AdminHD` com lista + botão reenviar; modal de reenvio de acesso por e-mail.

## O que preciso de você antes de implementar

1. **Confirme o token atual da Kiwify** (Painel Kiwify → Apps → Webhook → "Token"). Vou atualizar o segredo.
2. A compra teste foi do **curso de Enoque** (Área de Membros) ou de um plano da plataforma (Gold/Premium)? Isso determina se o problema é só o token ou se também falta cadastrar `kiwify_product_id` em outros cursos.
