# Compartilhar / Baixar devocional no app nativo (Android/iOS)

## Contexto
O app é uma casca WebView (Capacitor) que carrega o site ao vivo
(`capacitor.config.ts` → `server.url`). Por isso, o **JavaScript** de
compartilhamento é entregue pelo bundle web e atualiza sozinho a cada deploy —
mas os **plugins nativos** (`@capacitor/share`, `@capacitor/filesystem`) só
funcionam se estiverem registrados no APK/IPA publicado.

## O que foi corrigido no código (JS)
`src/lib/shareImage.ts`:
- Antes de chamar o plugin nativo, checa `Capacitor.isPluginAvailable(...)`. Se o
  plugin não existe no build, cai automaticamente para o **Web Share API** e, por
  fim, para **download** — em vez de exibir "Erro ao compartilhar".
- Em falha nativa (ex.: erro de `FileProvider`), não falha mais de forma dura:
  registra o erro real no console e usa o fallback web/download.
- Removida a recursão entre `downloadImageSmart` e `shareImageSmart` (evita loop).

Isso já melhora a experiência mesmo sem rebuild, porque o fallback web funciona
na maioria dos WebViews. Mas o compartilhamento nativo "de verdade" (folha do
Android com a imagem) só volta 100% com o passo abaixo.

## O que precisa ser feito no build nativo (fora deste repo)
O projeto `android/` não está versionado aqui — é gerado/editado localmente.
Para o compartilhamento nativo funcionar no APK da Play Store:

1. **Sincronizar os plugins**:
   ```sh
   npx cap sync android
   ```
   Confirme que `@capacitor/share` e `@capacitor/filesystem` aparecem em
   `android/app/src/main/assets/capacitor.plugins.json` e em
   `capacitor.settings.gradle`.

2. **Verificar o `FileProvider`** no `AndroidManifest.xml` mesclado: o plugin
   Share expõe o arquivo via um `<provider>` com autoridade
   `${applicationId}.fileprovider`. Como o app também usa Firebase/push
   (ver `docs/firebase-android-setup.md`), garanta que **nenhum outro provider
   reutiliza a mesma autoridade** (conflito no merge do manifest derruba o
   `file_paths.xml` do Share e causa `FileUriExposedException`).

3. **Rebuild + republish** do APK/AAB. O build atual da Play Store é o suspeito
   (provavelmente publicado antes de os plugins serem sincronizados).

## Como confirmar a causa exata (se persistir)
Com o device conectado, rode `adb logcat` ao tocar em compartilhar. O erro real
agora vai ao console:
- `"Share" plugin is not implemented on android` → falta o `cap sync` (passo 1).
- `Failed to find configured root ...` / `FileUriExposedException` → conflito de
  `FileProvider` (passo 2).
