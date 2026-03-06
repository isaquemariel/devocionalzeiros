
## Diagnóstico e Ideias para Reduzir Custos de Cloud e IA

Analisei o código e identifiquei os principais pontos de gasto. Aqui está um relatório honesto com sugestões práticas que não mudam a estrutura do projeto:

---

### Onde o dinheiro está indo

**IA (OpenAI)**
- Chat (`devocionalzeiro-chat`): usa `gpt-4o-mini`, sem limite de tokens por resposta (usa até 4000 tokens por mensagem)
- Sermão (`sermao-generator`): usa **`gpt-4o`** (o mais caro) com streaming sem `max_tokens`
- Quiz, RPG, versículos: usam `gpt-4o-mini` e já têm cache — OK

**Supabase (Cloud)**
- Realtime Presence: cada usuário logado mantém um canal WebSocket aberto **continuamente** com heartbeat a cada **25 segundos** — isso gera muitas mensagens Realtime
- `refetchOnWindowFocus: true` no QueryClient: toda vez que o usuário troca de aba, dispara queries ao banco
- `daily_usage_limits`: cada uso de feature faz um `UPDATE` no banco

---

### Ideias concretas (sem mudar a estrutura)

**1. Sermão: trocar `gpt-4o` por `gpt-4o-mini`**
O sermão usa `gpt-4o` que custa ~15x mais que `gpt-4o-mini`. A qualidade do esboço gerado seria praticamente igual com mini, já que o prompt já é muito bem detalhado. **Maior economia de IA**.

**2. Sermão: adicionar `max_tokens: 2000`**
Atualmente não há limite de tokens no sermão, o que pode gerar respostas de 3000-4000 tokens. Com `max_tokens: 2000` o esboço ainda fica completo mas pela metade do custo.

**3. Chat: reduzir `max_tokens` de 4000 para 2000**
Respostas teológicas de 2000 tokens são mais que suficientes. Corte de ~50% no custo de saída do chat.

**4. Presence: aumentar heartbeat de 25s para 60s**
O heartbeat atual envia uma mensagem Realtime a cada 25 segundos por usuário ativo. Aumentar para 60 segundos reduz as mensagens em ~60% sem impacto perceptível no usuário.

**5. Presence: mostrar o contador só para admins**
O `OnlinePresenceContext` conecta TODOS os usuários no canal de presença. Se o contador online só é visível para admins (no `AdminUserCounter`), pode-se conectar ao canal somente quando `isAdmin === true`. Para usuários normais, não há benefício em manter o canal aberto.

**6. QueryClient: desativar `refetchOnWindowFocus`**
Com `refetchOnWindowFocus: true`, cada vez que qualquer usuário alterna entre abas, o app dispara queries ao banco. Com `staleTime: 2min` já configurado, os dados são frescos. Desativar o focus refetch economiza muitas chamadas desnecessárias ao banco.

**7. Adicionar cache para sermões gerados (igual ao quiz)**
Hoje sermões não são cacheados globalmente. Se dois usuários pedem um sermão sobre "João 3", a IA é chamada duas vezes. Uma tabela `sermons_cache` por tema/tipo evitaria chamadas duplicadas.

---

### Ranking de impacto estimado

```text
Prioridade | Ação                                  | Economia
-----------|---------------------------------------|----------
ALTA       | Trocar gpt-4o → gpt-4o-mini (sermão) | ~70% no custo de sermão
ALTA       | Desativar refetchOnWindowFocus        | Muitas queries a menos
ALTA       | Presence só para admins               | -100% Realtime de usuários comuns
MÉDIA      | Reduzir max_tokens chat/sermão        | ~30-50% tokens de saída
MÉDIA      | Heartbeat: 25s → 60s                  | -60% mensagens Realtime
BAIXA      | Cache global de sermões               | Longo prazo, evita duplicatas
```

---

### O que eu implementaria agora (sem risco)

1. **`sermao-generator`**: trocar modelo para `gpt-4o-mini` + `max_tokens: 2000`
2. **`devocionalzeiro-chat`**: reduzir `max_tokens` de 4000 para 2000
3. **`OnlinePresenceContext`**: só conectar ao canal de presença se `isAdmin`, para usuários normais não há necessidade
4. **`App.tsx`**: `refetchOnWindowFocus: false` (o `staleTime: 2min` já garante dados frescos)
5. **Heartbeat**: aumentar de 25s para 60s

Todas essas mudanças são em arquivos existentes, sem novos componentes ou tabelas.

**Quer que eu implemente todas ou quer escolher quais?**
