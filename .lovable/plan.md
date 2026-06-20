# Bíblia offline — nunca mais falhar

## Problema
Hoje a Bíblia depende de uma API externa (`bolls.life`) com fallback para uma edge function. O cache no `localStorage` só guarda capítulos já abertos. Quando a API falha (rede ruim, capítulo retornando vazio, rate limit) e o capítulo ainda não foi cacheado, o usuário fica preso em "carregando" / erro — foi o que aconteceu agora em Coríntios.

## Solução
Empacotar a Bíblia ARC completa (Almeida Revista e Corrigida, domínio público) como **asset estático dentro do próprio app**. Assim:

- Qualquer capítulo abre instantaneamente, mesmo sem internet.
- Zero dependência de API para a tradução padrão.
- ARA / NTLH / NVT continuam vindo da API (são protegidas por direitos autorais), mas com o ARC sempre disponível como fallback garantido — nunca mais aparece "falha ao carregar".

## O que muda

### 1. Bundle da Bíblia ARC completa
- Adicionar `public/bible/arc.json` (~4-5 MB) com os 66 livros × capítulos × versículos no formato já usado: `{ [bookId]: { chapters: [ [{n,t}, ...], ... ] } }`.
- Fonte: dataset público da ARC (mesmo que o `bolls.life` serve em `/get-chapter/ARC/...`). Será baixado e processado uma única vez no build.
- Servido via `fetch('/bible/arc.json')` (cacheável pelo Service Worker PWA — já tem regra para JSON via NetworkFirst nas navegações; vamos adicionar regra `CacheFirst` para `/bible/*.json` no `vite.config.ts` para garantir uso offline real).

### 2. Pré-carregamento inteligente
- No primeiro acesso à aba Bíblia/Estudo, carregar o JSON ARC em memória (uma vez por sessão) e popular o cache em IndexedDB (mais espaço que localStorage, que tem limite de ~5 MB e pode falhar).
- Migrar o cache de `localStorage` para **IndexedDB** (via `idb-keyval`), mantendo a mesma API interna. Isso resolve outro risco: `localStorage` em iOS Safari pode estourar com a Bíblia inteira.

### 3. Nova ordem de prioridade em `fetchChapterVerses`
1. Cache IndexedDB (qualquer tradução já baixada).
2. Bundle local ARC (sempre disponível, instantâneo).
3. API `bolls.life` (para ARA/NTLH/NVT ou quando o usuário escolher outra tradução).
4. Edge function `bible-proxy` (fallback se a API direta falhar).
5. Se tudo falhar e a tradução pedida não for ARC → mostra o ARC com um aviso discreto "Mostrando ARC porque não foi possível carregar [NTLH] agora".

### 4. UX
- Badge sutil "Disponível offline" no header da Bíblia depois que o ARC estiver carregado.
- Sem tela de erro em capítulo nenhum da ARC — é impossível falhar.

## Detalhes técnicos

- **Arquivos novos:**
  - `public/bible/arc.json` (gerado por script único; commitado).
  - `scripts/build-arc-bundle.mjs` (busca todos os 1.189 capítulos da `bolls.life` e gera o JSON; roda manualmente, não no build).
  - `src/lib/bibleOfflineStore.ts` (wrapper IndexedDB com `idb-keyval`).

- **Arquivos editados:**
  - `src/lib/bibleService.ts` — nova ordem de prioridade, leitura do bundle local, troca de localStorage por IndexedDB, fallback transparente para ARC.
  - `vite.config.ts` — adicionar runtime caching `CacheFirst` para `/bible/*.json` no Workbox.
  - `src/pages/BibliaEstudo.tsx` (e/ou `Biblia.tsx`) — disparar o pré-carregamento do bundle ao montar.

- **Dependência nova:** `idb-keyval` (~600 B, sem peer deps).

- **Tamanho:** ~4-5 MB gzipped ~1.5 MB. Baixado uma única vez e cacheado pelo SW; nas próximas aberturas é instantâneo e offline.

- **Não afeta:** estudo do versículo (IA), planos de leitura, RPG, devocional — só a camada de busca de texto bíblico.

## Resultado
Depois disso, abrir qualquer capítulo de qualquer livro — Coríntios, Salmos 119, Apocalipse — funciona **sempre**, com ou sem internet, em qualquer tradução (ARC nativo; outras com fallback automático para ARC se a API falhar).
