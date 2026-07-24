# Ícone e splash do app nativo (Capacitor)

O app da **Play Store / App Store** é empacotado com Capacitor (`com.clubehd.app`).
O ícone que aparece na tela inicial do celular **não** vem do manifest da web —
ele vem dos recursos nativos em `android/app/src/main/res/mipmap-*` (e no iOS em
`ios/App/App/Assets.xcassets`), gerados a partir das imagens desta pasta.

> ⚠️ A pasta `android/` (e `ios/`) **não é versionada no Git**. Se o app for
> reconstruído numa máquina limpa (`npx cap add android`), o Capacitor recria os
> ícones com o **padrão** dele — foi o que fez o ícone "sumir" e virar placeholder.
> Por isso o ícone agora é gerado a partir daqui, de forma reproduzível.

## Arquivos-fonte (1024×1024)

- `icon-only.png` — logo em fundo branco (ícone legado / lojas).
- `icon-foreground.png` — camada da frente do ícone adaptativo (logo centrado
  com margem de segurança, pra não ser cortado pela máscara redonda/squircle).
- `icon-background.png` — camada de trás do ícone adaptativo (branco sólido).

## Como regenerar os ícones nativos

### Caminho blindado (recomendado) — um comando só

Na máquina onde você builda o app:

```bash
npm install                 # instala @capacitor/assets e @capacitor/cli
npm run cap:add:android     # SÓ na primeira vez (cria a pasta android/)
npm run build:android       # build + assets:generate + cap sync, na ordem certa
```

O `build:android` encadeia `vite build → capacitor-assets generate → cap sync
android` num passo só — assim **é impossível esquecer o `assets:generate`**, que
é justamente o passo cuja ausência faz o ícone virar placeholder.

> Para iOS: `npm run cap:add:ios` (1ª vez) e depois `npm run build:ios`.

### Passo a passo manual (equivalente)

```bash
npm install
npm run build               # gera o dist/
npx cap add android         # só na primeira vez (cria a pasta android/)
npm run assets:generate     # gera ícones e splash a partir de /assets
npx cap sync android        # aplica no projeto nativo
```

Depois abra o projeto no Android Studio (`npx cap open android`), gere o
**AAB assinado** e suba a nova versão no **Google Play Console**. O ícone só
troca no celular quando essa nova versão for publicada e instalada.

> ⚠️ **Nunca** rode só `npx cap add android` seguido do build sem o
> `assets:generate` — é isso que faz o Capacitor gravar o ícone padrão dele
> (placeholder) e "sumir" com o ícone do app. O script `build:android` existe
> exatamente pra impedir esse erro.
