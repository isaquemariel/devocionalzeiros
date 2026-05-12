
# Devocionalzeiros Rotina

Módulo completo de produtividade cristã: dashboard "Hoje", tarefas, calendário, hábitos espirituais, notas, metas (Roda da Vida), lista de oração e reflexão semanal guiada. Tudo integrado ao ecossistema existente (Devocional, Bíblia, gamificação).

---

## Acesso e plano

**Free (básico — sem fricção):**
- Dashboard "Hoje"
- Tarefas (ilimitadas)
- Lista de Oração (ilimitada)

**Gold/Premium/Embaixador (completo):**
- Tudo acima
- Calendário (próprio + sync Google Calendar opcional)
- Hábitos espirituais (tracker com streak)
- Notas e Estudos (com templates: SOAP, Sermão, Célula)
- Metas (Roda da Vida cristã)
- Reflexão Semanal guiada
- Sincronização com Google Calendar (na fase 2 de configuração)

Free vendo qualquer módulo bloqueado → modal de upgrade (mesmo padrão dos outros locks).

---

## Navegação

- Card de destaque na Home (entre Devocional e Bíblia, ou abaixo do "Hoje" — ajustamos no design)
- Rota nova: `/rotina`
- Acesso secundário pelo SettingsDialog ("Minha Rotina")
- BottomNavBar fica intocado

---

## Os 8 módulos

### 1. Dashboard "Hoje" (rota inicial de /rotina)
- Saudação personalizada + data
- Versículo do dia (puxa do `/devocional` atual)
- Mini-card "Devocional de hoje" (concluído / pendente)
- Próximas 3 tarefas do dia (+ progresso geral)
- Próximos compromissos do calendário (Gold)
- Hábitos do dia (checks rápidos — Gold)
- Frase cristã rotativa
- Botão "Reflexão da Semana" (Gold, aparece sex–dom)

### 2. Tarefas (Free + Gold)
- Áreas: **Espiritual, Família, Trabalho, Saúde, Ministério, Estudos, Pessoal**
- Campos: título, descrição, área, prioridade (alta/média/baixa), prazo, status (a fazer/fazendo/feita), tags, recorrência (nenhuma/diária/semanal/mensal)
- **Versículo âncora opcional** (input com parser bíblico já existente)
- Subtarefas (checklist dentro da tarefa)
- Visões: Hoje, Próximos 7 dias, Atrasadas, Por área, Concluídas
- Quick-add no topo (digita Enter, cria tarefa pra hoje)
- Drag-and-drop para reordenar prioridade

### 3. Calendário (Gold)
- Visões: Mês, Semana, Dia, Lista
- Eventos com cor por categoria (Culto, Célula, Família, Trabalho, Jejum, Pessoal, Outro)
- Categorias pré-definidas cristãs + custom
- Recorrência (nenhuma/diária/semanal/mensal/anual)
- "Bloquear tempo com Deus" — botão atalho que cria evento devocional
- Lembrete via push (opcional)
- Sub-fase: integração com **Google Calendar** (sync bidirecional). Requer setup OAuth — explicado em "Detalhes técnicos". Disponibilizamos botão "Conectar Google Calendar" no topo, desabilitado até as credenciais OAuth serem configuradas.

### 4. Hábitos Espirituais (Gold)
- Hábitos sugeridos prontos: Oração, Leitura Bíblica, Devocional, Jejum, Gratidão, Exercício, Sono, Água
- Custom (criar próprio)
- Frequência: diária / dias da semana específicos / X vezes por semana
- Heatmap mensal (estilo GitHub)
- Streak atual + maior streak
- Marcação rápida no Dashboard "Hoje"

### 5. Lista de Oração (Free + Gold)
- Categorias: Família, Igreja, Missões, Pessoal, Liderança, Ministério, Outro
- Campos: pedido, descrição, categoria, status (orando / respondido / pausado)
- Quando marca "respondido" → abre campo de **testemunho** + data
- Filtro por status, ordenar por data
- "Lembrete diário" (push opcional Gold) para orar pela lista
- Aba "Testemunhos" — galeria de pedidos respondidos (testimony wall pessoal)

### 6. Notas e Estudos (Gold)
- Categorias: Sermão, Estudo Bíblico, Reflexão, Célula, Reunião, Ideias
- Editor markdown simples (negrito, itálico, lista, citação)
- Tags livres
- Versículos relacionados (parser)
- **Templates prontos:**
  - **SOAP** (Scripture, Observation, Application, Prayer)
  - **Esboço de Sermão** (texto, contexto, pontos, aplicação)
  - **Ata de Célula** (presentes, tema, pedidos, próximos passos)
- Busca por título/conteúdo/tag
- Favoritar nota

### 7. Metas — Roda da Vida Cristã (Gold)
- 7 áreas: Espiritual, Família, Saúde, Trabalho, Financeiro, Ministério, Estudos
- Cada área tem nota 0–10 (auto-avaliação) + meta principal do trimestre/ano
- Visualização gráfico radar (recharts já está no projeto)
- Cada meta vira marcos → cada marco vira tarefas (link com módulo Tarefas)
- Progresso automático conforme tarefas vinculadas são concluídas

### 8. Reflexão Semanal Guiada (Gold, sex/sáb/dom)
- Wizard de 5 perguntas:
  1. O que Deus fez essa semana? (gratidão)
  2. Onde falhei? (confissão)
  3. O que aprendi?
  4. Foco da próxima semana
  5. Versículo da semana (parser)
- Salva no histórico, gera card compartilhável (usa html-to-image já no projeto)
- Push de lembrete na sexta às 18h (Gold)

---

## Integrações com o que já existe

- **Devocional**: dashboard mostra status do devocional do dia
- **Gamificação**: completar tarefa diária = +1 ponto; manter streak de hábito 7d/30d = conquistas novas (`rotina_streak_7`, `rotina_streak_30`, `rotina_meta_concluida`)
- **Push Notifications**: lembretes de tarefas, hábitos, oração, reflexão
- **Bible parser**: usado em versículo âncora, notas e reflexão
- **Plano do usuário** (`useUserPlan`): controla travas Free vs Gold

---

## Detalhes técnicos

### Banco de dados (10 tabelas novas, todas com RLS por user_id)

```text
rotina_tasks             id, user_id, title, description, area, priority,
                         due_date, status, tags[], recurrence, anchor_verse,
                         parent_task_id (subtasks), goal_id (link metas),
                         completed_at, created_at, updated_at

rotina_calendar_events   id, user_id, title, description, category, color,
                         start_at, end_at, all_day, recurrence,
                         google_event_id (sync), reminder_minutes, created_at, updated_at

rotina_habits            id, user_id, name, icon, color, frequency_type,
                         frequency_days[], target_per_week, is_active, created_at

rotina_habit_logs        id, user_id, habit_id, log_date (UNIQUE com habit_id), created_at

rotina_prayers           id, user_id, title, description, category,
                         status (praying/answered/paused), answered_at,
                         testimony, created_at, updated_at

rotina_notes             id, user_id, title, content, category, tags[],
                         template_type, related_verses[], is_favorite,
                         created_at, updated_at

rotina_goals             id, user_id, title, description, area, target_date,
                         progress_percent, current_score (0-10), parent_goal_id,
                         status (active/completed/paused), created_at, updated_at

rotina_weekly_reviews    id, user_id, week_start (UNIQUE com user_id), gratitude,
                         confessions, learnings, next_focus, week_verse, created_at

rotina_google_calendar   id, user_id, access_token (encrypted), refresh_token,
                         expires_at, calendar_id, sync_enabled, last_synced_at
                         (só se for usar sync)

rotina_settings          id, user_id, default_view, week_start_day,
                         show_completed_tasks, prayer_reminder_time,
                         weekly_review_day, created_at, updated_at
```

Todos com:
- `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
- 4 policies (SELECT/INSERT/UPDATE/DELETE) com `auth.uid() = user_id`
- Trigger `update_updated_at_column` onde aplicável
- Datas em `America/Sao_Paulo` na UI (regra global)

### Estrutura de código

```text
src/pages/
  Rotina.tsx                       (rota /rotina, layout com sidebar/tabs)

src/components/rotina/
  RotinaDashboard.tsx              (Hoje)
  RotinaTasksSection.tsx
  RotinaCalendarSection.tsx
  RotinaHabitsSection.tsx
  RotinaPrayersSection.tsx
  RotinaNotesSection.tsx
  RotinaGoalsSection.tsx
  RotinaWeeklyReviewSection.tsx
  RotinaSidebar.tsx                (navegação interna do módulo, igual Finanças)
  modals/
    TaskModal.tsx
    EventModal.tsx
    HabitModal.tsx
    PrayerModal.tsx
    NoteModal.tsx
    GoalModal.tsx
    WeeklyReviewWizard.tsx
  shared/
    AnchorVerseInput.tsx           (input de versículo c/ parser)
    AreaSelector.tsx
    CategoryBadge.tsx

src/hooks/
  useRotinaTasks.ts
  useRotinaEvents.ts
  useRotinaHabits.ts
  useRotinaPrayers.ts
  useRotinaNotes.ts
  useRotinaGoals.ts
  useRotinaWeeklyReview.ts
  useRotinaSettings.ts

src/components/landing/   (sem mudanças)
src/components/shared/Home   (adicionar card "Rotina" na Home)
```

### Calendário próprio
- Construído com `date-fns` (já no projeto), sem libs novas
- Visão mês: grid 7 colunas, dots por evento
- Visão semana: 7 colunas com horários
- Visão dia: lista cronológica
- Eventos clicáveis abrem `EventModal`

### Google Calendar sync (Gold, sub-fase opcional)

Como o connector padrão Lovable é da conta do dev, não serve aqui. Cada usuário precisa conectar o **próprio** Google Calendar via OAuth.

Para isso vai precisar:
1. Você (admin) cria credenciais OAuth no [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Habilita Google Calendar API
3. Configura URLs de redirect (será nosso edge function)
4. Adiciona `GOOGLE_OAUTH_CLIENT_ID` e `GOOGLE_OAUTH_CLIENT_SECRET` como secrets

Implementação:
- Edge function `rotina-google-oauth-start` (gera URL de consent)
- Edge function `rotina-google-oauth-callback` (recebe code, troca por token, salva criptografado)
- Edge function `rotina-google-sync` (sync bidirecional, agendado a cada hora via cron)
- UI: botão "Conectar Google Calendar" em `/rotina/calendario` → abre popup OAuth

**Decisão pra confirmar**: deixo a infra de sync pronta mas o **botão desabilitado** com aviso "Em breve" até você configurar as credenciais Google? Ou faço a infra agora e você me passa as credenciais depois?

### Conquistas novas (gamificação)
- `rotina_streak_7` — 7 dias completando todas tarefas planejadas
- `rotina_streak_30` — 30 dias
- `rotina_habit_master` — manter um hábito por 30 dias
- `rotina_first_goal` — concluir primeira meta
- `rotina_prayer_warrior` — registrar 10 testemunhos respondidos
- `rotina_reflective` — completar 4 reflexões semanais

### Limites e validações
- Validação Zod em todos os modais (título obrigatório, max 200 chars, etc.)
- Sanitização de markdown nas notas (DOMPurify)
- Tarefas/eventos não podem ter prazo > 5 anos no futuro
- Lock de plano centralizado em `useUserPlan` + `LockedFeatureModal`

---

## O que NÃO entra nessa entrega

- Compartilhamento de tarefas entre usuários (família/equipe)
- Pomodoro integrado (já existe no Bíblia)
- Importação de outras ferramentas (Todoist, Notion)
- Botão Google Calendar **funcional** — entra como "Em breve" até credenciais OAuth serem fornecidas

---

## Ordem de implementação

1. Migration SQL (10 tabelas + RLS + triggers + conquistas novas)
2. Hooks de dados (`useRotina*`)
3. `Rotina.tsx` + `RotinaSidebar.tsx`
4. RotinaDashboard (Hoje)
5. Tarefas + Lista de Oração (Free)
6. Hábitos + Calendário próprio + Notas + Metas + Reflexão Semanal (Gold)
7. Card de destaque na Home
8. Integração com conquistas
9. Hook do botão Google Calendar (desabilitado, pronto pra ativar)

Após aprovação, vou rodar a migration e te pedir confirmação. Em seguida construo todo o frontend numa sequência de mensagens (vai ser grande, mas estruturado).
