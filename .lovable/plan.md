
# Refactor da Área de Membros `/aulas`

## 1. Backend (migration)

### Novas tabelas

- **`aulas_settings`** (singleton, 1 row): controla o banner destaque global
  - `id` (fixo = 1), `banner_enabled` (bool), `banner_image_url` (text), `banner_curso_id` (uuid FK), `banner_title_override`, `banner_subtitle_override`, `updated_at`
  - Proporção sugerida: **1920×800** (info exibida no admin)

- **`aulas_product_access`**: grants de acesso por e-mail+curso
  - `id`, `email` (lower), `curso_id` (FK), `source` (`kiwify` | `manual_admin` | `signup_owner`), `kiwify_product_id` (nullable), `granted_by` (uuid nullable), `created_at`
  - Unique (`email`, `curso_id`)

- **`aulas_admins`**: lista de e-mails admin do módulo /aulas (independente do `user_roles` do app)
  - `id`, `email` (unique, lower), `created_at`
  - Seed: `devocionalzeiro@gmail.com`

- **`aulas_otp_codes`**: códigos OTP enviados por e-mail
  - `id`, `email` (lower), `code_hash` (text, sha256), `expires_at` (timestamptz), `consumed_at`, `attempts` (int default 0), `created_at`
  - Index em (email, expires_at)

- **`aulas_sessions`**: sessões custom (JWT-like simples) após validar OTP
  - `id`, `email`, `token_hash`, `expires_at` (30 dias), `last_seen_at`, `user_agent`, `ip`

### Alterações em tabelas existentes

- **`aulas_cursos`**: adicionar `kiwify_product_id` (text nullable, identifica qual produto Kiwify libera esse curso) e `card_aspect` (text default `'4/5'` — só pra futuro).

### Campos do `aulas_cursos` já existentes mantidos (slug, cover_url etc).

### RLS / GRANTs

- Toda leitura de `/aulas` passa a usar **edge functions** (já que o auth é fora do Supabase Auth). RLS atual fica permissiva pra `SELECT` público de `aulas_cursos/modulos/aulas/arquivos` (mantida) — a checagem de **acesso** (curso liberado) é feita no frontend via `aulas_product_access` consultada por edge function.
- `aulas_admins`, `aulas_product_access`, `aulas_settings`: leitura pública só para colunas necessárias via edge function. Escrita só `service_role`.
- `aulas_otp_codes`, `aulas_sessions`: nenhum acesso direto pelo cliente. Tudo via edge functions.

## 2. Auth isolada por OTP (e-mail)

Fluxo separado do Supabase Auth — não mistura com login do app principal.

### Edge functions novas

- **`aulas-auth-request-otp`** (POST `{ email }`)
  - Valida e-mail.
  - Verifica se o e-mail tem **algum** acesso ativo (`aulas_product_access` OR `aulas_admins`). Se não tiver, retorna `403 no_access` com mensagem orientando suporte WhatsApp.
  - Gera código 6 dígitos, salva hash + expira em 15min.
  - Envia e-mail via sistema transacional Lovable (`send-transactional-email` ou via Resend já configurado se houver). Template simples: "Seu código de acesso: 123456".
  - Rate-limit: 1 código a cada 60s por e-mail.

- **`aulas-auth-verify-otp`** (POST `{ email, code }`)
  - Verifica hash + expiração + attempts (<5).
  - Marca `consumed_at`, cria `aulas_sessions` com token random 64 chars, devolve `{ token, email, is_admin }`.

- **`aulas-auth-me`** (GET com header `Authorization: Bearer <token>`)
  - Valida sessão, retorna `{ email, is_admin, allowed_curso_ids: [] }`.

### Frontend

- `src/lib/aulasAuth.ts`: armazena token em `localStorage` (`aulas_token`), helpers `getSession()`, `signOut()`, `requestOtp()`, `verifyOtp()`.
- `src/hooks/useAulasSession.ts`: hook React Query que chama `aulas-auth-me`.
- **Nova página `/aulas/login`** (`src/pages/AulasLogin.tsx`):
  - Step 1: input e-mail → botão "Receber código".
  - Step 2: input código 6 dígitos → "Entrar".
  - Botão "Suporte via WhatsApp" abaixo, com `wa.me/5584999488698?text=Olá! Preciso de suporte sobre a área de membros.`
- Todas as páginas `/aulas/*` (exceto `/aulas/login`) viram protegidas: se sem sessão → redirect `/aulas/login`.

## 3. Controle de acesso por curso

- Página `/aulas` lista **todos** os cursos publicados.
- `CourseCard` recebe prop `locked: boolean`. Se locked:
  - Overlay escuro + ícone cadeado.
  - Mostra texto "Adquirir" + botão que abre WhatsApp ou link de checkout (campo `purchase_url` em `aulas_cursos`? **adicionar** esse campo na migration).
  - Click NÃO navega para o curso.
- Página de curso `/aulas/curso/:slug` e aula `/aulas/aula/:id` checam acesso no carregamento; sem acesso → toast + redirect `/aulas`.
- Admin vê tudo desbloqueado.

## 4. Cards proporção 1080×1350 (4:5)

- `CourseCard`: trocar `aspect-[16/9]` por `aspect-[4/5]`, larguras menores (`w-[200px] sm:w-[220px] md:w-[240px]`).
- `CourseRow` mantém scroll horizontal.

## 5. Banner destaque opcional

- `Aulas.tsx` lê `aulas_settings` (via `useAulasSettings`). Se `banner_enabled = false` → não renderiza hero, vai direto pras rows.
- Se `true` e `banner_image_url` setado → renderiza hero clicável que leva ao curso vinculado (`banner_curso_id`).

## 6. Header + remoção do botão "Voltar ao App"

- `AulasHeader`: remover botão `<Home> App`. Adicionar botão **Suporte** (WhatsApp) e **Sair** (se logado). Manter botão Admin (se admin).
- Logo continua linkando pra `/aulas`.

## 7. Painel Admin reformulado

Adicionar ao `/aulas/admin` (tabs no topo):

- **Tab "Conteúdo"**: o CRUD atual de cursos/módulos/aulas/arquivos (já existe). No form de **Curso**, adicionar:
  - `kiwify_product_id` (text) — qual produto da Kiwify libera esse curso.
  - `purchase_url` (text) — link para checkout/WhatsApp quando bloqueado.
  - Upload de cover (substitui input de URL) usando bucket `aulas-arquivos`, com texto guia "Proporção recomendada: **1080×1350** (4:5)".

- **Tab "Banner Destaque"** (novo): form do `aulas_settings`:
  - Switch ligar/desligar banner.
  - Upload imagem (proporção recomendada: **1920×800**, texto explícito).
  - Select curso para vincular.
  - Title/subtitle override opcionais.

- **Tab "Acessos"** (novo): gerenciar `aulas_product_access`:
  - Form: e-mail + select curso → "Liberar acesso".
  - Lista filtrável de todos os acessos, com botão revogar.
  - Lista de admins (`aulas_admins`) + form pra adicionar/remover admin.

Admin é protegido por checagem `aulas-auth-me.is_admin` (não mais `useAdminCheck` do app).

## 8. Integração Kiwify

- Atualizar `supabase/functions/kiwify-webhook/index.ts` para, além do plano do app, verificar se o `product_id` recebido bate com algum `aulas_cursos.kiwify_product_id` e, se sim, inserir/upsert em `aulas_product_access` (`email`, `curso_id`, `source='kiwify'`, `kiwify_product_id`).
- Em reembolso/chargeback/cancelamento → deletar o grant correspondente.

## 9. Lista de arquivos finais

### Migrations
- nova migration com tudo do passo 1 + seed do admin + GRANTs.

### Edge functions (novas)
- `supabase/functions/aulas-auth-request-otp/index.ts`
- `supabase/functions/aulas-auth-verify-otp/index.ts`
- `supabase/functions/aulas-auth-me/index.ts`
- `supabase/functions/aulas-admin-grant/index.ts` (admin grants/revokes via service role)

### Edge functions (editadas)
- `supabase/functions/kiwify-webhook/index.ts`

### Frontend novos
- `src/lib/aulasAuth.ts`
- `src/hooks/useAulasSession.ts`
- `src/hooks/useAulasAccess.ts`
- `src/hooks/useAulasSettings.ts`
- `src/pages/AulasLogin.tsx`
- `src/components/aulas/AulasGuard.tsx`
- `src/components/aulas/SupportButton.tsx`
- `src/components/aulas/admin/AccessManager.tsx`
- `src/components/aulas/admin/BannerSettings.tsx`
- `src/components/aulas/admin/AdminsManager.tsx`
- `src/components/aulas/admin/ImageUploader.tsx` (reuso pra cover e banner)

### Frontend editados
- `src/App.tsx` (rota `/aulas/login`)
- `src/components/aulas/AulasHeader.tsx` (remover botão App, add Suporte+Sair)
- `src/components/aulas/CourseCard.tsx` (4:5 + locked overlay)
- `src/components/aulas/CourseRow.tsx` (larguras)
- `src/pages/Aulas.tsx` (settings + locked)
- `src/pages/AulasCurso.tsx` (guard de acesso)
- `src/pages/AulasAula.tsx` (guard de acesso)
- `src/pages/AulasAdmin.tsx` (tabs + auth via aulas session + novos campos no form de curso)

## 10. Decisões assumidas

- **E-mail OTP** será enviado via sistema transacional Lovable Cloud (`send-transactional-email`); se não estiver configurado ainda, eu escalo via Resend caso já exista `RESEND_API_KEY` — verifico no momento da implementação.
- **Sessão** custom (não Supabase Auth) com token em `localStorage`, expiração 30 dias.
- WhatsApp suporte: `+5584999488698` (memória do projeto).
- Cards bloqueados: clique abre o `purchase_url` do curso em nova aba; se não houver, abre WhatsApp.
- Sem migração de admin existente — quem for admin do app NÃO é admin de /aulas automaticamente; controlado por `aulas_admins`.
