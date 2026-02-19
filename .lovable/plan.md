
# Plano: Bloquear estágios do RPG ao atingir limite diário

## Problema Atual
Quando o usuário gratuito (ou gold) atinge o limite diário de estágios no RPG, ele ainda consegue clicar e abrir o capítulo. O bloqueio só acontece dentro do modal quando tenta avançar para o quiz. Isso causa confusão porque o usuário lê o capítulo mas não consegue progredir.

## Solução
Interceptar o clique no estágio **antes** de abrir o modal do capítulo. Se o limite diário de `rpg_quiz` já foi atingido, exibir o `UsageLimitModal` com a contagem regressiva para o reset (meia-noite, horário de Brasília) e a opção de upgrade.

## Mudanças Necessárias

### 1. Arquivo: `src/pages/RPG.tsx`
- Importar `useUsageLimits` e `useUserPlan` (já importado)
- Importar o componente `UsageLimitModal`
- Importar `FEATURE_DISPLAY_NAMES` do hook de limites
- Adicionar estado para controlar a exibição do `UsageLimitModal`
- Modificar `handleChapterClick`:
  - Antes de abrir o `chapterModal`, verificar `checkLimit('rpg_quiz')`
  - Se `canUse === false` (e o capítulo **não** está completo, ou seja, não é review mode), exibir o `UsageLimitModal` ao invés de abrir o capítulo
  - Se o capítulo já está completo (review mode), permitir abrir normalmente (revisar não consome cota)
- Renderizar o `UsageLimitModal` no JSX com os dados do limite atingido

### 2. Lógica de Review vs Novo Estágio
- Capítulos já completados (review mode) continuam acessíveis sem restrição -- o usuário pode revisar leituras, quiz e devocionais anteriores
- Apenas capítulos **novos** (não completados) são bloqueados ao atingir o limite

## Detalhes Técnicos

```text
Fluxo atual:
  Clique no estágio -> Abre RPGChapterModal -> (dentro do modal) verifica limite no quiz

Fluxo proposto:
  Clique no estágio ->
    Se capítulo completo (review): Abre RPGChapterModal normalmente
    Se capítulo novo:
      checkLimit('rpg_quiz').canUse == true: Abre RPGChapterModal
      checkLimit('rpg_quiz').canUse == false: Exibe UsageLimitModal
```

### Dados passados ao UsageLimitModal
- `featureName`: "Estágios do RPG" (nome amigável)
- `currentUsage` e `limit`: vindos de `checkLimit('rpg_quiz')`
- `planType`: tipo do plano atual do usuário
- `isBlocked`: false (não é bloqueado, é limite atingido)

Isso funciona para **ambos** os planos (Gratuito com limite de 4 e Gold com limite de 10), pois usa o sistema de limites já existente.
