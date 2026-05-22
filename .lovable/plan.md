## Feedback da usuária — 3 ajustes

### 1. Modo claro (acessibilidade)

Hoje o app força tema escuro (`App.tsx`: `ThemeProvider defaultTheme="dark" enableSystem={false}`). Usuários com astigmatismo/miopia se queixam.

- Habilitar tema claro como opção: `enableSystem={false}` mantido, mas permitir alternar entre `dark` e `light`.
- Adicionar **toggle "Tema claro / escuro"** no Dialog de Configurações (já existe `mem://features/settings/dialog-and-community-v130`), usando `useTheme()` do `next-themes`.
- Auditar tokens HSL em `index.css` para garantir que o `:root` (light) tenha contraste adequado — vários componentes hoje usam classes hardcoded (`bg-zinc-900`, `text-white/60`) que ficariam ilegíveis no claro. Escopo desta entrega: **ativar o toggle e ajustar somente as telas principais** (Home, Bíblia, Devocional, Configurações). Telas secundárias permanecem escuras numa segunda passada se necessário.

### 2. Plano de leitura em ordem cronológica

Não existe hoje. Os planos são: nt60, at90, 90, 184, 365 (`src/lib/bibleData.ts`).

- Adicionar plano **`cronologico365`**: "Bíblia Cronológica - 365 Dias" — ordena os livros/capítulos pela sequência histórica dos eventos (Gênesis → Jó → Êxodo → Salmos intercalados com 1-2 Samuel → Profetas com Reis → Evangelhos paralelos → Atos com Epístolas).
- Criar `chronologicalChapterOrder` em `bibleData.ts` (array fixo da ordem cronológica padrão amplamente aceita).
- Estender `ReadingPlan` type, `readingPlans` config (scope: `"chronological"`) e `generateReadingSchedule` para usar a nova ordem.
- Adicionar card do plano em `PlanSelection.tsx` com ícone/cor próprios e descrição "Leia a Bíblia na ordem em que os eventos aconteceram".

### 3. Botão do gerador de sermão inacessível no mobile

A captura mostra o `LockedFeatureModal` (feature `sermao`) com o CTA laranja "Fazer Upgrade" sendo cortado pela `BottomNavBar`.

Causa: o modal usa `fixed inset-0 flex items-center justify-center p-4` e o conteúdo extrapola a viewport em telas pequenas (440x718). Como o conteúdo não rola, o botão fica atrás da nav inferior.

Correção em `src/components/shared/LockedFeatureModal.tsx`:
- Container: trocar `items-center` por `items-end sm:items-center` e adicionar `overflow-y-auto` + `pb-24 sm:pb-4` para escapar da BottomNav.
- Card interno: adicionar `max-h-[calc(100svh-6rem)] overflow-y-auto` para o conteúdo rolar quando necessário.
- Garantir `z-[60]` no backdrop e no card para ficar acima da `BottomNavBar` (z-50).
- Revisar os demais modais semelhantes (`DailyUpgradeModal`, `UsageLimitModal`, `UpgradeCelebrationModal`) com o mesmo padrão para evitar reincidência.

### Fora de escopo

- Recriar tema claro completo de telas raras (RPG, Quiz, Finanças) — fica para iteração futura se ela pedir.
- Não mexer em fluxo de cadastro/login (já estabilizado nas últimas conversas).

### Arquivos a tocar

- `src/App.tsx` — permitir alternância de tema.
- `src/components/shared/SettingsDialog*.tsx` (ou equivalente) — adicionar toggle.
- `src/index.css` — revisar tokens `:root` light.
- `src/lib/bibleData.ts` — adicionar plano cronológico + ordem.
- `src/components/biblia/PlanSelection.tsx` — exibir novo plano.
- `src/components/shared/LockedFeatureModal.tsx` + correlatos — corrigir corte do botão.