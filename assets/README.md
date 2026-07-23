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

Rode na raiz do projeto, na máquina onde você builda o app (com as pastas
`android/`/`ios/` já criadas via `npx cap add`):

```bash
npm install                 # instala o @capacitor/assets
npm run build               # gera o dist/
npx cap add android         # só na primeira vez (cria a pasta android/)
npm run assets:generate     # gera ícones e splash a partir de /assets
npx cap sync android        # aplica no projeto nativo
```

Depois abra o projeto no Android Studio (`npx cap open android`), gere o
**AAB assinado** e suba a nova versão no **Google Play Console**. O ícone só
troca no celular quando essa nova versão for publicada e instalada.

Para iOS, troque `android` por `ios` nos comandos acima.
