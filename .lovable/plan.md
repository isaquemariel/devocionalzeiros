

# Plano de Otimização de Custos do Backend

## Objetivo
Reduzir o consumo do Lovable Cloud sem perder funcionalidades, dados ou usabilidade.

## Análise
Após revisar todas as edge functions e queries:

1. **`chapter-explanation`** é a ÚNICA função usando GPT-4o (caro). Todas as outras já usam GPT-4o-mini.
2. **`get_user_rankings()`** e **`get_my_points()`** são queries pesadas que fazem JOINs em 6+ tabelas — executadas frequentemente.
3. O cache client-side de pontos já existe (2 min TTL), mas o ranking não tem cache no cliente.

## Mudanças Planejadas

### 1. Migrar `chapter-explanation` de GPT-4o para GPT-4o-mini
- Trocar `model: "gpt-4o"` por `model: "gpt-4o-mini"` na edge function
- Reduz custo de tokens em ~90% para essa função
- Qualidade permanece excelente para explicações bíblicas (todas as outras funções já usam gpt-4o-mini com sucesso)
- O cache existente (`chapter_explanations_cache`) continua funcionando normalmente

### 2. Adicionar cache client-side para rankings
- Criar cache em memória no `Ranking.tsx` similar ao `useUserPoints` (TTL de 3 minutos)
- Evita re-executar a query pesada `get_user_rankings()` a cada navegação
- O botão de refresh manual continua forçando atualização
- As subscriptions Realtime continuam atualizando quando há mudanças

### 3. Aumentar TTL do cache de pontos
- Subir o TTL de `useUserPoints` de 2 para 5 minutos
- Reduz chamadas à função `get_my_points()` (também pesada)

### 4. Reduzir `max_tokens` do `chapter-explanation`
- De 3000 para 2000 (alinhado com o limite de 1500 palavras do prompt)
- Economia adicional por chamada

## O que NÃO muda
- Nenhuma tabela ou dado é alterado
- Todas as funcionalidades permanecem idênticas
- Cache de AI (quiz, explicações, estudos de versículos) continua funcionando
- Autenticação, RLS e segurança permanecem intactos

## Arquivos afetados
- `supabase/functions/chapter-explanation/index.ts` — modelo e max_tokens
- `src/pages/Ranking.tsx` — cache client-side
- `src/hooks/useUserPoints.ts` — TTL do cache

