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
- Rode sempre, antes de commitar, e ambos têm de terminar com **0 erro(s)**:
  - `node scripts/validate-stage.mjs` — ESTRUTURA (beats 1..N, `q` exato, whitelists).
  - `node scripts/checkup-stage.mjs` — PADRÕES DE DIREÇÃO (ver abaixo).
  - `npx tsc -p tsconfig.app.json --noEmit`.
- E, para o que os dois primeiros não veem:
  - `node scripts/qa-stage.mjs [livro]` — CONTEÚDO: cena congelada (6+ beats sem
    mudar nada), fala com palco vazio, balão órfão, deixa sem fala depois, papel
    `mulher` (que ignora a pose), voz do céu sem glória.
  - `node scripts/scene-shot.mjs "livro:cap:v,…" saida.png` — desenha os beats
    num Chromium real e salva um PNG. **Olhe a imagem.** Nenhum validador vê o
    desenho: foi assim que apareceram o muro de Jericó intacto no versículo em
    que ele cai, a casa de Dagom de pé no desabamento e Abraão com o cutelo
    erguido longe do altar.

## Padrões de direção da cena viva (o que o checkup cobra)

Verdades do motor que, se ignoradas, produzem cena errada **sem quebrar tipo nenhum**:

1. **Props do céu só com `sky: true`** (`sun`,`moon`,`starfield`,`birds`,`clouds`,
   `firmament`). Com `sky`, `dy` vira ALTURA no céu (0 = horizonte, 1 = zênite):
   sol/lua ~0.6, estrelas ~0.8, aves ~0.5. Sem `sky`, caem **no chão**.
   O terreno `desert` desenha um astro próprio (sol de dia, lua de noite) fixo
   em W*0,7. Se a cena declarar o seu `sun`/`moon`, o motor cala o do terreno e
   vale a posição do autor — mas declare **um** astro só, nunca dois props.
2. **`multidao` ignora a pose** e é SEMPRE desenhada comemorando (braços erguidos,
   palmas). Nunca no 1º plano de morte/juízo/luto — ali use figuras individuais
   (`homem`/`mulherComum`/`servo`) em `lie`/`bow`/`kneel`.
3. **`mulher` ignora a pose** e é sempre dourada e em pé. Para deitar/curvar/ajoelhar,
   ou para qualquer mulher que não seja figura de glória, use **`mulherComum`**.
4. **Fogo só é desenhado por `campfire`, `pillar` ou `altar` com `fire`.** `env.fire`
   NÃO desenha chama (é ambiência/som) — cidade queimada precisa de `campfire`.
5. **`terrain:"mountain"` escurece o céu** e mata o sol de glória. Cena de bênção ou
   glória radiante → `field`/`desert`.
6. **Props e cast VAZAM por herança** entre beats: no beat de clímax, declare os seus
   próprios `props`/`cast` para não herdar o cenário anterior.
7. **Quem fala tem de estar no cast do beat**, e ser o PRIMEIRO do seu papel — o balão
   é resolvido por `cast.find(id === by) ?? cast.find(role === by)` e nomeado pelo `id`.
   Se não estiver em cena, a fala vai para a barra do narrador **creditando a voz**
   (é assim que Moisés narra os flashbacks de Deuteronômio) — legítimo para quem narra
   de fora, errado para um diálogo em cena.

## Objetos: use o prop certo, nunca um parecido

O motor tem ilustração própria para as armas, a realeza, a casa e as montarias.
**Não improvise** — foi exatamente isso que produziu, em 1 Samuel, espadas e
flechas desenhadas com o prop `rod`, que é a VARA DE ARÃO QUE FLORESCEU (Nm
17:8), com flores e amêndoas no topo:

| precisa de | use | NÃO use |
|---|---|---|
| espada | `sword` | `rod` |
| lança | `spear` | `rod` |
| arco / flechas | `bow` | `rod` |
| coroa | `crown` | `bowl`, `censer` |
| harpa, lira | `harp` | `scroll` |
| leito, divã | `bed` | `crate`, `stall` |
| tanque, açude | `pool` | `river`, `well` |
| carro de guerra | `chariot` | `stall` |
| cavalo / jumento / mula | `horse` / `donkey` | `rebanho` |
| coluna de prédio | `column` | `pillar` |

`pillar` é SÓ a coluna de nuvem e de fogo do Êxodo (a presença do SENHOR indo
adiante do povo) — nunca uma coluna de arquitetura, que é `column`. Havia 279
colunas de fogo ardendo dentro de palácios e templos em Juízes, Samuel e Reis
antes de isto ser separado.

`rod` é só a vara de Arão. `calf` é só um ídolo fundido (o bezerro de ouro, os
terafins, Dagom) — nunca um animal vivo, que é `rebanho` ou `horse`/`donkey`.

Se o objeto que a cena pede não existe na whitelist, **conte a cena pela pose e
pelo enquadramento** em vez de etiquetar um prop que mente. Uma tag num prop
errado é pior do que nenhuma tag: o balão do "?" passa a afirmar uma coisa que
o desenho contradiz.

## Fichas "?" — nada de genérico

Se uma figura está na cena, é **alguém do contexto bíblico daquele capítulo**. A
resolução é: `id` em `CHAR_INFO` → (livro→capítulo→papel) em `src/lib/stageInfo/<livro>.ts`
→ (livro→papel) → papel genérico. **Cair no genérico é defeito** e o checkup acusa.
Objetos-marco com `tag` precisam de verbete em `PROP_TAG_INFO`.
