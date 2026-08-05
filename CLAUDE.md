# Devocionalzeiros — convenções para o agente

## A VOZ DE DEUS na cena viva (regra fixa)

Deus **nunca é desenhado como figura**. Como a fala de Deus entra na cena depende de **haver ou não um mediador visível**:

1. **Voz direta, SEM mediador** (voz do céu, visão, sonho, oráculo interior): balão
   **"voz do céu"** — `by: "deus"` — com glória no ambiente (`env.glory`). O balão é
   dourado e centralizado, sem figura. Ex.: Gn 12, 15, 17, 20, 21, 22:2, 25, 26, 28,
   31, 35, 46.

2. **Deus fala ATRAVÉS de alguém, ATRAVÉS de um objeto, ou em TEOFANIA visível**:
   NÃO use a voz do céu genérica — **personifique Deus conforme o contexto**, fazendo
   o balão sair do mediador em cena:
   - **Através de um mensageiro** (o Anjo do SENHOR): `by: "anjo"`, com a figura
     luminosa em cena. Ex.: Gn 18 (o SENHOR como o varão central entre os três),
     Gn 16 e 21 (o anjo a Agar), Gn 22:11 (o brado de Moriá).
   - **Através de um objeto**: o balão sai do objeto/mediador e o traço dele domina o
     ambiente. Ex. (Êxodo): a **sarça ardente** (fogo na sarça), a **coluna de nuvem /
     de fogo** que guia o povo.
   - **Em teofania** (aparição visível): personifique conforme a cena pede, sempre sem
     desenhar Deus como pessoa — a presença é luz/fogo/nuvem, e o balão vem do
     mediador daquela teofania.

Resumo: **voz do céu quando não há mediador; personificação pelo mediador quando Deus
fala através de alguém, de um objeto, ou em teofania.**

## Validação obrigatória de cenas

Ao editar qualquer roteiro em `src/lib/stage/**`:
- Todo `by` tem de ser um papel válido (ou `"deus"`), e todo `q` tem de ser
  **substring EXATA** do versículo no texto ARC (`public/bible/arc.json`).
- Rode sempre `node scripts/validate-stage.mjs` (tem de terminar com **0 erro(s)**) e
  `npx tsc -p tsconfig.app.json --noEmit` antes de commitar.
