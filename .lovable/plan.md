
# Área de Membros `/aulas`

Página pública (sem login) com layout estilo Netflix/Members, fora da estrutura interna do app (sem `AppHeader` nem `BottomNavBar`). Conteúdo gerenciado por admin via CRUD no próprio app.

## Estrutura visual

```text
/aulas                       → Home da área de membros
  ├─ Header próprio (logo + "Entrar" / botão admin se logado como admin)
  ├─ Hero do curso em destaque (capa grande)
  ├─ Linha 1 — Curso A
  │   └─ scroll horizontal de cards (capas dos módulos)
  ├─ Linha 2 — Curso B
  │   └─ ...
  └─ Footer enxuto

/aulas/curso/:slug           → Detalhe do curso (lista de módulos)
/aulas/aula/:id              → Player da aula
  ├─ YouTube embed responsivo (16:9)
  ├─ Título + descrição
  ├─ Navegação: aula anterior / próxima
  └─ Lista de PDFs anexos (visualizar inline + baixar)

/aulas/admin                 → Painel admin (protegido por has_role 'admin')
  └─ CRUD de cursos, módulos, aulas e arquivos
```

## Backend (Lovable Cloud)

Três tabelas novas em `public`:

- **`aulas_cursos`** — `id`, `slug` (único), `title`, `description`, `cover_url`, `order_index`, `is_published`
- **`aulas_modulos`** — `id`, `curso_id` (FK), `title`, `description`, `cover_url`, `order_index`
- **`aulas_aulas`** — `id`, `modulo_id` (FK), `title`, `description`, `youtube_url`, `duration_minutes`, `cover_url`, `order_index`, `is_published`
- **`aulas_arquivos`** — `id`, `aula_id` (FK), `title`, `file_url`, `file_size_kb`, `order_index`

Bucket de Storage **`aulas-arquivos`** (público) para PDFs e capas.

**Acesso (RLS):**
- Leitura pública (`anon` + `authenticated`) apenas de registros `is_published = true`.
- Insert/Update/Delete: somente admins (via `has_role(auth.uid(), 'admin')`).
- Bucket público para SELECT; upload restrito a admin.

## Painel admin `/aulas/admin`

Interface simples, mesma vibe do `AdminHD`:
- Lista de cursos com botão "Novo curso".
- Ao abrir um curso: lista de módulos → aulas → arquivos (acordeão).
- Modal de criação/edição para cada nível com campos relevantes.
- Upload de PDF e de capa direto para o bucket.
- Toggle "publicado" por curso e por aula.
- Reordenação simples por campo `order_index` (input numérico no MVP).

## Player de aula

- **YouTube**: extrai o `videoId` da URL (suporta `youtu.be`, `watch?v=`, `embed/`, shorts) e usa `<iframe>` em wrapper `aspect-video` com `allowFullScreen`.
- **PDFs**: cada arquivo aparece como card com nome, tamanho e dois botões: **Visualizar** (abre em nova aba com viewer nativo do browser) e **Baixar** (`<a download>`).
- Sem progresso/comentários no MVP (escopo enxuto).

## Design

- Tema dark, fundo preto puro, cards com `rounded-xl`, hover com leve `scale` e gradient overlay (estilo Netflix).
- Tipografia já global (Montserrat / Karla).
- Linha de cards com scroll horizontal sem barra visível (já é padrão do projeto).
- Componente `CourseRow` reutilizado por curso.
- Totalmente responsivo (1 card visível no mobile, 2–3 no tablet, 4–6 no desktop).

## Roteamento

Adicionar em `src/App.tsx` (lazy):
- `/aulas` → `Aulas`
- `/aulas/curso/:slug` → `AulasCurso`
- `/aulas/aula/:id` → `AulasAula`
- `/aulas/admin` → `AulasAdmin`

Sem `AppHeader`/`BottomNavBar` — header e footer próprios e enxutos para parecer área de membros, não app.

## Arquivos a criar

```text
src/pages/Aulas.tsx
src/pages/AulasCurso.tsx
src/pages/AulasAula.tsx
src/pages/AulasAdmin.tsx
src/components/aulas/AulasHeader.tsx
src/components/aulas/CourseRow.tsx
src/components/aulas/CourseCard.tsx
src/components/aulas/LessonCard.tsx
src/components/aulas/YouTubePlayer.tsx
src/components/aulas/PdfAttachmentList.tsx
src/components/aulas/admin/CourseFormModal.tsx
src/components/aulas/admin/ModuleFormModal.tsx
src/components/aulas/admin/LessonFormModal.tsx
src/components/aulas/admin/FileUploader.tsx
src/hooks/useAulas.ts
src/lib/youtubeUtils.ts
```

## Migration (resumo)

1. Criar 4 tabelas com `GRANT` para `anon` (SELECT publicado), `authenticated` (SELECT publicado), `service_role` (ALL).
2. Enable RLS em todas.
3. Políticas:
   - SELECT público para `is_published = true` (cursos/aulas) ou para todos os módulos/arquivos cujo pai esteja publicado.
   - INSERT/UPDATE/DELETE somente se `has_role(auth.uid(), 'admin')`.
4. Criar bucket `aulas-arquivos` público; policies de upload/delete restritas a admin.

## Fora do escopo (MVP)

- Progresso do aluno / "marcar como concluída".
- Comentários e anotações.
- Drag-and-drop de reordenação (uso de input numérico).
- Login obrigatório (página é pública).
