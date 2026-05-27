## Diagnóstico

Encontrei 3 lacunas que impedem a liberação automática hoje:

1. **Curso "Os Segredos do Livro de Enoque" está sem `kiwify_product_id`** no banco. Mesmo que o webhook funcione, ele não consegue ligar a compra ao curso → nenhuma linha em `aulas_product_access` é criada → login OTP retorna "no_access".
2. **Webhook da Kiwify nunca chegou a executar** (zero logs em `kiwify-webhook`). A URL/token configurada na Kiwify provavelmente está errada.
3. **Não existe e-mail de boas-vindas pós-compra.** Hoje o cliente precisaria adivinhar que deve ir em `/aulas/login` e pedir um código.

Bom: `KIWIFY_WEBHOOK_TOKEN` já está configurado, a função `kiwify-webhook` já cria acesso ao curso automaticamente quando o `product_id` bate, e o template OTP já está funcional.

## O que vou fazer

### 1. Vincular o curso ao produto Kiwify
Atualizar `aulas_cursos` (id `b1683dea-...`) setando `kiwify_product_id = 'oR51sse'`.

### 2. Criar e-mail de boas-vindas automático
Novo template `aulas-welcome.tsx` e disparo dentro da `kiwify-webhook` logo após gravar o `aulas_product_access`. Conteúdo:
- Saudação personalizada com nome do cliente
- Confirmação do produto comprado
- Botão grande "Acessar minha área" → `https://devocionalzeiros.com.br/aulas/login`
- Instrução curta: "Digite este e-mail (o da compra) e receberá um código de 6 dígitos para entrar"
- Suporte WhatsApp +5584999488698

Idempotência: marca `aulas_product_access.welcome_sent_at` para não reenviar em renovações.

### 3. Configuração na Kiwify (você faz no painel)
Vou te entregar exatamente:
- **URL do webhook:** `https://qwkitwlppplhiabquxsx.supabase.co/functions/v1/kiwify-webhook?signature=SEU_TOKEN_AQUI`
- **Eventos a marcar:** Compra Aprovada, Assinatura Renovada, Compra Reembolsada, Chargeback, Assinatura Cancelada, Assinatura Atrasada
- **Onde colar o token:** o valor de `KIWIFY_WEBHOOK_TOKEN` (já está salvo nos secrets — te mostro como conferir/rotacionar)

### 4. Validação end-to-end
- Migration: adiciona coluna `welcome_sent_at` em `aulas_product_access`
- Teste com `curl_edge_functions` simulando payload Kiwify `compra_aprovada` com `product_id: 'oR51sse'`
- Confere: linha em `aulas_product_access` criada, e-mail enfileirado em `email_send_log`, OTP funciona para o e-mail de teste

## Detalhes técnicos

- **Migration:** `ALTER TABLE aulas_product_access ADD COLUMN welcome_sent_at timestamptz;`
- **Update de dados:** `UPDATE aulas_cursos SET kiwify_product_id = 'oR51sse' WHERE id = 'b1683dea-7dfa-4cf2-8728-8a8a2d47027b';`
- **Novo arquivo:** `supabase/functions/_shared/transactional-email-templates/aulas-welcome.tsx`
- **Edit:** `supabase/functions/kiwify-webhook/index.ts` — após o upsert em `aulas_product_access`, se `welcome_sent_at IS NULL`, renderiza template + `enqueue_email` (queue `transactional_emails`) + grava `welcome_sent_at = now()`
- **Domínio remetente:** `notify.devocionalzeiros.com.br` (já verificado, mesmo padrão do OTP)
- **Deploy:** `kiwify-webhook`

## Arquivos / itens fora de escopo

- Não vou trocar o fluxo de OTP atual (continua igual; o e-mail de boas-vindas só guia o usuário até ele).
- Não vou tocar no fluxo principal da plataforma (`authorized_purchases` continua igual para os planos start/gold/premium).
