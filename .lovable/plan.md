
## Diagnóstico

### Problema 1 — Download de imagem no mobile não funciona
O método atual usa `document.createElement("a")` com `link.click()` para baixar. Isso **não funciona em WebViews Android (TWA/Play Store)** nem no iOS Safari. O app já tem o código correto com `navigator.share` (Web Share API), mas o `ShareOptionsModal` **só exibe o botão "Baixar Imagem"** e nunca chama `onShareWhatsApp` (que usa a Web Share API corretamente). O modal precisa detectar o ambiente mobile e trocar o botão de download para "Compartilhar" usando a API nativa.

### Problema 2 — Notificações push não existem no projeto
Atualmente só existem dois tipos de lembretes:
- **In-app**: banner flutuante `DailyDevotionalReminder` (só aparece quando o app está aberto)
- **WhatsApp**: via API Evolution, acionado por uma Edge Function cron

Notificações push nativas (que aparecem mesmo com app fechado) não estão implementadas. Para funcionar no Android (Play Store / TWA), é necessário implementar **Web Push com VAPID**.

---

## Plano

### Parte 1 — Corrigir download/compartilhamento de imagem no mobile

**Arquivo:** `src/components/devocional/ShareOptionsModal.tsx`

Detectar se `navigator.share` está disponível (Android/TWA) e adaptar a UI:
- **Mobile com Web Share**: botão principal "📤 Compartilhar Imagem" → chama `onShareWhatsApp` (já usa `navigator.share` + arquivo)
- **Desktop / sem suporte**: botão principal "⬇️ Baixar Imagem" → comportamento atual
- Manter ambos os botões visíveis (compartilhar + baixar) para dar ao usuário a escolha

Isso resolve os três lugares que usam o modal: `Devocional.tsx`, `VerseDevotional.tsx` e `RPGChapterModal.tsx`.

---

### Parte 2 — Notificações Push nativas

#### Banco de dados
Nova tabela `push_subscriptions`:
```sql
CREATE TABLE push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  endpoint text NOT NULL,
  p256dh text NOT NULL,
  auth text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, endpoint)
);
```

#### Service Worker
Atualizar o workbox para processar o evento `push` e exibir a notificação nativa.

#### Hook `usePushNotifications`
- Solicita permissão ao usuário (`Notification.requestPermission()`)
- Registra a subscription no service worker (`registration.pushManager.subscribe`)
- Salva o endpoint + chaves no banco

#### Edge Function `send-push-notification`
- Usa a biblioteca `web-push` com chaves VAPID armazenadas como secrets
- Recebe `user_id` e `message`, busca as subscriptions e envia via Web Push

#### Edge Function `daily-push-reminders` (cron)
- Executa diariamente para buscar usuários com push habilitado
- Chama `send-push-notification` para cada usuário que não completou o devocional do dia

#### UI de permissão
- Botão nas configurações (SettingsDialog) "🔔 Ativar notificações do app"
- Solicita permissão e exibe status atual (ativado/desativado)

#### Secrets necessários
- `VAPID_PUBLIC_KEY` e `VAPID_PRIVATE_KEY` — gerados automaticamente pela Edge Function de setup

---

## Arquivos a modificar/criar

| Arquivo | Ação |
|---|---|
| `src/components/devocional/ShareOptionsModal.tsx` | Adicionar botão "Compartilhar" para mobile |
| `supabase/migrations/...sql` | Criar tabela `push_subscriptions` |
| `src/hooks/usePushNotifications.ts` | Novo hook |
| `supabase/functions/generate-vapid-keys/index.ts` | Gerar VAPID keys (executar uma vez) |
| `supabase/functions/send-push-notification/index.ts` | Enviar push |
| `supabase/functions/daily-push-reminders/index.ts` | Cron diário |
| `src/components/settings/SettingsDialog.tsx` | Botão de ativar notificações |
| `vite.config.ts` | Adicionar handler de evento `push` no service worker |
