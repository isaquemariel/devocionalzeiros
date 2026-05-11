## Status atual das notificações

**Web Push (PWA) — funcionando:**
- Service Worker `public/sw-push.js` recebe pushes
- VAPID configurado nos secrets
- Edge functions: `save-push-subscription`, `send-push-notification`, `daily-push-reminders`
- Cron `daily-push-reminders` roda **às 8h UTC = 5h BRT** (ERRADO — deveria ser 7h BRT)

**App nativo:** não existe ainda. Hoje só PWA (Android via "instalar app", iOS apenas iOS 16.4+).

**Admin de avisos:** não existe.

---

## O que vou implementar

### 1. Corrigir horário do lembrete diário
Reagendar o cron `daily-push-reminders` para **10:00 UTC** (= 07:00 Brasília), todos os dias.

### 2. Sistema de avisos personalizados (Admin)

**Banco de dados** — nova tabela `admin_push_announcements`:
- `id`, `title`, `message`, `url` (opcional, deep link interno)
- `is_active` (ligar/desligar sem apagar)
- `schedule_type`: `now` | `once` | `recurring`
- `scheduled_at` (timestamptz, para `once`)
- `recurrence_cron` + `recurrence_time_brt` (ex: diário 09:00, semanal seg 18:00)
- `last_sent_at`, `next_run_at`
- `created_by` (uuid admin), timestamps
- RLS: SELECT/INSERT/UPDATE/DELETE só para `has_role(admin)`

**Edge function nova** `admin-broadcast-push`:
- Aceita `announcement_id`, busca a tabela, dispara `send-push-notification` para todos os `push_subscriptions`
- Atualiza `last_sent_at` e calcula `next_run_at`
- Verifica `is_active = true` antes de enviar

**Cron tick** (a cada 5 minutos): chama uma function `process-scheduled-announcements` que:
- Busca anúncios ativos com `next_run_at <= now()`
- Dispara cada um e atualiza próximas execuções recorrentes

**UI Admin** — nova aba/seção em `src/pages/AdminHD.tsx`:
- Lista de avisos com toggle ativar/desativar
- Botão "Novo aviso" (modal): título, mensagem, URL opcional, tipo (agora/agendado/recorrente), seletor de hora BRT
- Botão "Enviar agora" em cada item
- Mostra `last_sent_at` e contagem de inscritos alcançados

### 3. Preparar Capacitor para futuro app nativo

- Instalar `@capacitor/core`, `@capacitor/cli`, `@capacitor/ios`, `@capacitor/android`
- Criar `capacitor.config.ts` com `appId: app.lovable.47f659ebc9de44fca5b8a2b28fcc8773`, `appName: devocionalzeiros`, server URL apontando para o sandbox e `cleartext: true`
- Adicionar `@capacitor/push-notifications` (configuração base)
- Documentar passo-a-passo no chat para o usuário rodar `npx cap add android/ios` no próprio repo após exportar pro GitHub
- A integração efetiva de FCM/APNs (chaves, ícones nativos) fica para quando o usuário gerar os projetos nativos — código React continua o mesmo, push web continua valendo no PWA

---

## Detalhes técnicos

**Cron BRT → UTC:**
- 07:00 BRT = 10:00 UTC → `0 10 * * *`
- Tick de processamento: `*/5 * * * *`

**Recorrência:** armazenar como dia da semana (0-6 ou `*` p/ diário) + hora BRT; calcular `next_run_at` em UTC após cada disparo.

**Segurança:** todas as edge functions de envio exigem `service_role` (já é o padrão do projeto). UI admin valida via `is_current_user_admin()`.

**Capacidade:** loop em batches de 100 inscrições para não estourar timeout da function.
