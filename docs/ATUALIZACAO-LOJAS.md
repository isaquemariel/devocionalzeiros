# Atualização das lojas — roteiro desta versão

O app nativo (Android e iOS) abre o site publicado (`server.url` =
`https://devocionalzeiros.com.br` no `capacitor.config.ts`). Então quase tudo
desta versão chega a quem já tem o app instalado **assim que o site for
publicado** — sem passar pela loja. A loja só é necessária para o que é
configuração NATIVA.

## O que é nativo nesta versão (exige novo build)

| mudança | onde | efeito |
|---|---|---|
| Push com o app ABERTO não vai para a bandeja nem toca — só o selo | `capacitor.config.ts` → `PushNotifications.presentationOptions: ['badge']` | com o app na tela, quem avisa é o Devocionalzeiro (`useNativePushNotifications`) |

Mais nada no nativo mudou: nenhum plugin novo, nenhuma permissão nova. Os
plugins continuam Share, Filesystem, PushNotifications e TextToSpeech.

## O que chega pelo site (vale até para quem não atualizar o app)

- Tela inicial nova (Jerusalém no dia e na noite reais, com o personagem) e
  login/cadastro no visual do RPG.
- Personagem único em todo o app, com o visual do RPG; comemorações e avisos
  pelo personagem, sempre no centro (sem confete, sem toasts no topo).
- Conquistas no padrão RPG, com aviso no app e push ao sair do app.
- Push só para quem está FORA do app (presença no servidor + service worker).
- Configurações enxutas (sem tamanho de fonte, sem tema claro, sem Conquistas;
  som já vem ligado) e o botão "Baixe o app" em destaque.
- Sem o aviso de "sessão expirou" ao sair da conta.

## Ordem para subir

1. **Backend** (já feito nesta sessão)
   - migrações `20260927010000_achievement_notifications.sql` e
     `20260927020000_user_app_presence.sql` aplicadas no banco;
   - funções `notificar-conquista` (nova), `send-push-notification` e
     `send-native-push` (atualizadas) publicadas.
2. **Site**: publicar o projeto no Lovable (Publish / `deploy_project`) e
   conferir que o commit publicado é o da `main`.
3. **App nativo** (no seu computador, como no `docs/rebuild-apk-passo-a-passo.md`):
   ```
   git pull            # ou baixe o ZIP da main de novo
   npm install
   npm run build
   npx cap sync        # copia o capacitor.config (presentationOptions) para android/ e ios/
   ```
   - **Android**: em `android/app/build.gradle`, aumente `versionCode` (+1) e
     `versionName` (ex.: 1.4 → 1.5). Android Studio → Build → Generate Signed
     Bundle (AAB) → Play Console → Produção → nova versão.
   - **iOS**: no Xcode (`npx cap open ios`), aumente **Version** e **Build**
     no alvo App → Product → Archive → Distribute → App Store Connect.

## Conferências antes de enviar

- [ ] `npx cap sync` mostrou `[capacitor] PROD → https://devocionalzeiros.com.br`
      (se aparecer DEV, feche o terminal: a variável `CAP_ENV=dev` ficou ligada).
- [ ] `android/app/src/main/assets/capacitor.config.json` contém
      `"presentationOptions": ["badge"]`.
- [ ] `android/app/src/main/assets/capacitor.plugins.json` lista Share,
      Filesystem, PushNotifications e TextToSpeech.
- [ ] `android/app/google-services.json` é o do projeto Firebase
      `devocionalzeiros-app` (pacote `com.clubehd.app`).
- [ ] iOS: a capability **Push Notifications** continua ligada no alvo App.

## Teste no aparelho (5 minutos)

1. Abra o app deslogado: a tela inicial mostra o céu da hora do aparelho
   (de noite: lua e janelas acesas; de dia: sol e aves), o personagem chega
   andando e fala. Toque nele, no balão e na lua/sol.
2. Entre na conta: o app pede a permissão de notificação (primeira vez).
3. Com o app ABERTO, mande um push de teste: nada na bandeja — o
   Devocionalzeiro avisa no meio da tela.
4. Feche/minimize o app e mande outro: agora ele chega na bandeja.
5. Ganhe uma conquista e saia do app: chega o push "Resgatar", que abre a
   cena de resgate.
