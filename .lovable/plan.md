
## Problema raiz e solução

O problema real é que a API bolls.life tem **dados corrompidos na tradução ARA** para vários versículos. O sistema já tem fallback para NTLH, mas isso acontece silenciosamente e às vezes falha — e o usuário não tem controle sobre qual versão ler.

A solução mais robusta é **deixar o usuário escolher a tradução** e garantir que o sistema sempre busque a tradução certa sem "adivinhar" o fallback.

### Traduções disponíveis no bolls.life em português

- **ARA** — Almeida Revista e Atualizada (tem dados corrompidos em alguns capítulos)
- **ARC** — Almeida Revista e Corrigida (versão mais antiga, geralmente íntegra)
- **NTLH** — Nova Tradução na Linguagem de Hoje (linguagem moderna)
- **NVI** — Nova Versão Internacional (muito usada)

### Plano de implementação

**1. Persistir preferência de tradução do usuário**
- Salvar no `localStorage` a tradução escolhida: `bible_translation_pref` (default: `ARC`)
- Trocar o default de ARA → **ARC** (Almeida Revista e Corrigida), que tem dados mais íntegros no bolls.life

**2. Atualizar `bible-proxy` (Edge Function)**
- Receber o parâmetro `translation` na requisição (ex: `{ bookNumber, chapter, translation: 'ARC' }`)
- Usar a tradução solicitada como primária
- Fallback chain: tradução escolhida → ARC (se não for ARC) → NTLH → getBible.net

**3. Atualizar `bibleService.ts`**
- Adicionar `getBibleTranslation()` e `setBibleTranslation()` para ler/gravar do localStorage
- Incluir `translation` na cache key para não misturar versículos de traduções diferentes: `bible_cache_v8_{translation}`
- Passar `translation` como parâmetro em `fetchChapterFromAPI()` e `fetchChapterViaProxy()`
- Limpar caches antigos (v8 sem sufixo de tradução)

**4. Seletor de tradução na `BibliaEstudo.tsx`**
- Adicionar um `<Select>` compacto no header da página (ao lado do título/verso)
- Opções: ARC, ARA, NTLH, NVI
- Ao trocar a tradução: limpa os versículos atuais, invalida o cache do capítulo atual, recarrega

**5. Cache separado por tradução**
- Chave: `bible_cache_v9_{TRANSLATION}` (ex: `bible_cache_v9_ARC`)
- Limpar caches anteriores (v7 e v8)

### Arquivos a alterar

- `supabase/functions/bible-proxy/index.ts` — aceitar parâmetro `translation`, usar como primária
- `src/lib/bibleService.ts` — funções de preferência, cache por tradução, passar translation nos fetches
- `src/hooks/useStudyBible.ts` — passar translation para `fetchChapter`
- `src/pages/BibliaEstudo.tsx` — adicionar seletor de tradução no topo

### UX

```text
[ Bíblia de Estudo ]
Tradução: [ARC ▼]  ← seletor pequeno ao lado do subtítulo
          ARC - Almeida Revista e Corrigida
          ARA - Almeida Revista e Atualizada  
          NTLH - Nova Tradução Linguagem de Hoje
          NVI - Nova Versão Internacional
```

Ao trocar a tradução, o capítulo atual recarrega imediatamente com a nova versão. A preferência fica salva para próximas visitas.
