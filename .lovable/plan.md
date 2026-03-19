
## Root Cause

The **ARA (Almeida Revista e Atualizada) dataset on bolls.life has corrupted data** for certain verses. For example, Genesis 17:10 in ARA returns:

> *"Este é o meu pacto, que guardareis entre mim e vós, e a tua descendência depois de ti: todo varão dentre vugar para aquele que me"*

This is exactly what the user's screenshot shows — the verse ends mid-sentence. This is a known data quality issue with the upstream ARA source, not a code bug.

The **NTLH translation on the same API** has complete, clean data for all verses.

## Fix Strategy

Two-layer fix: client-side + server-side (bible-proxy).

### 1. Client-side: Strip HTML and detect truncation (`bibleService.ts`)

Add a `sanitizeVerseText()` function that:
- Strips any residual HTML tags from verse text (some ARA verses contain `<i>`, `<b>` etc.)
- Detects suspiciously short verses (< 15 characters) that may indicate truncation
- Apply sanitization when processing verses from the API response

### 2. Server-side: Fallback to NTLH in `bible-proxy` edge function

When a verse from ARA appears truncated or too short (< 15 chars), or the entire chapter fetch from ARA returns fewer verses than expected, fall back to **NTLH** as the secondary source (same bolls.life API, just different translation code).

**Updated fallback chain:**
1. Try ARA from bolls.life directly
2. If any verse text is < 15 chars, re-fetch the same chapter using NTLH
3. If bolls.life fails entirely, fall back to getBible.net

### Files to change

- `supabase/functions/bible-proxy/index.ts` — add NTLH fallback when ARA has short/truncated verses
- `src/lib/bibleService.ts` — add HTML tag stripping and short-verse fallback logic when fetching directly

### Technical detail

```text
ARA verse text check:
  verse.text.trim().length < 15 → flag as truncated
  OR verse.text ends without punctuation (.;:!?) → flag as truncated

On flag: re-request chapter using NTLH translation
  https://bolls.life/get-chapter/NTLH/{bookNumber}/{chapter}/

Cache: save NTLH result normally (same cache key, transparent to user)
```

Cache key stays the same (`bible_almeida_cache_v7`) — we just store clean complete text regardless of which translation it came from as a fallback. No cache invalidation needed for users who don't yet have the broken verses cached.

For users who already have corrupted verses in localStorage cache, the existing cache version (`v7`) will continue to serve bad data. We will **bump the cache version to `v8`** so all users get fresh data on their next visit.
