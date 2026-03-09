
# Bloquear Estágios do RPG ao Atingir Limite Diário

## Objetivo
Quando o usuário gratuito ou gold clicar em um estágio novo do RPG e já tiver atingido o limite diário (4 para Free, 10 para Gold), exibir o modal de limite ao invés de abrir o capítulo. Capítulos já completados (review) continuam acessíveis.

## Mudanças

### Arquivo: `src/pages/RPG.tsx`

1. **Novos imports**:
   - `useUsageLimits` de `@/hooks/useUsageLimits`
   - `UsageLimitModal` de `@/components/shared/UsageLimitModal`

2. **Novo hook e estado**:
   - Chamar `useUsageLimits(user?.id, planType)` para ter acesso ao `checkLimit`
   - Adicionar estado `showLimitModal` com dados de usage (`{ currentUsage, limit }`) ou `null`

3. **Modificar `handleChapterClick`**:
   - Verificar se o capítulo ja esta completo (review mode)
   - Se for review: abrir o modal normalmente (sem consumir cota)
   - Se for novo E `checkLimit('rpg_quiz').canUse === false`: setar `showLimitModal` com os dados do limite
   - Se for novo E `canUse === true`: abrir o modal normalmente
   - Admins passam direto (sem verificacao)

4. **Renderizar `UsageLimitModal`** no JSX:
   - `isOpen={!!showLimitModal}`
   - `onClose={() => setShowLimitModal(null)}`
   - `featureName="Estagios do RPG"`
   - `currentUsage` e `limit` vindos do estado
   - `planType` do hook existente

## Detalhes Tecnicos

```text
handleChapterClick(chapter):
  1. Se selectedLevel === null -> return
  2. isCompleted = stageProgress tem esse capitulo completo?
  3. Se isCompleted OU isAdmin -> abre RPGChapterModal (review mode)
  4. Senao:
     limitResult = checkLimit('rpg_quiz')
     Se limitResult.canUse === false:
       setShowLimitModal({ currentUsage, limit })
     Senao:
       abre RPGChapterModal normalmente
```

Nenhuma mudanca no backend ou em outros arquivos e necessaria -- toda a logica de limites ja existe no `useUsageLimits`.
