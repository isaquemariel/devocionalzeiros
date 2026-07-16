# Handoff — corrigir "baixar" e "compartilhar" no app nativo (Android)

## Sintoma
No app nativo (Play Store): ao **baixar**, aparece "Imagem baixada" mas o arquivo
não é salvo; ao **compartilhar**, aparece "anexe manualmente" em vez de abrir a
folha de compartilhamento do Android (WhatsApp, Instagram, etc.).

## Causa raiz (confirmada)
O app é uma casca **Capacitor WebView** que carrega o site publicado
(`capacitor.config.ts` → `server.url = https://devocionalzeiros.com.br`).

- O **conteúdo web** (telas/JS) atualiza pelo Publish do Lovable — OK.
- **Salvar arquivo** e **abrir a folha de compartilhamento** só funcionam pelos
  **plugins nativos** `@capacitor/filesystem` e `@capacitor/share`, que precisam
  estar **registrados no APK/AAB**. Dentro de uma WebView do Capacitor, os
  fallbacks web (`<a download>`, `navigator.share`) **não funcionam** — por isso
  o "baixada" falso e o "anexe manualmente".

Conclusão: os plugins nativos **não estão no build atual** da Play Store. O
código JS (`src/lib/shareImage.ts`) já está correto e passa a funcionar assim que
os plugins estiverem no APK. **É necessário recompilar e republicar o APK/AAB.**

## Passos para o build (terceiro que compila o app)

Pré-requisitos: Node + a mesma versão do Capacitor do projeto (v8), Android SDK,
e a keystore de assinatura já usada na Play Store.

```sh
# 1. Puxar o código mais recente (branch main já tem tudo)
git pull origin main

# 2. Instalar dependências (usa o registro do projeto)
npm install        # ou: bun install

# 3. Registrar/atualizar os plugins nativos no projeto Android
#    (NÃO exportar CAP_ENV=dev — o app deve apontar para produção)
npx cap sync android

# 4. VERIFICAR que os plugins foram registrados:
#    android/app/src/main/assets/capacitor.plugins.json deve conter
#    "SharePlugin" e "FilesystemPlugin". Confirmar também que aparecem em
#    android/capacitor.settings.gradle e android/app/capacitor.build.gradle.
```

### Verificar o FileProvider (importante)
O plugin Share expõe o arquivo por um `<provider>` com autoridade
`${applicationId}.fileprovider`. Como o app também usa Firebase/push, confirmar
no `AndroidManifest.xml` **mesclado** que:
- existe o provider do Share (`androidx.core.content.FileProvider`) com essa
  autoridade e o `file_paths.xml`;
- **nenhum outro** provider (Firebase, push, custom) reusa a mesma autoridade —
  conflito no merge derruba o `file_paths.xml` e causa `FileUriExposedException`.

### Rebuild e republish
```sh
# 5. Subir o versionCode/versionName (android/app/build.gradle) e gerar o AAB assinado
cd android && ./gradlew bundleRelease   # ou pelo Android Studio: Build > Generate Signed Bundle
```
Enviar o novo AAB para a Play Console e publicar.

## Como confirmar que resolveu
Com o device conectado, rodar `adb logcat` ao tocar em compartilhar. Se ainda
falhar, o erro real agora vai ao console (o JS foi endurecido para logar):
- `"Share" plugin is not implemented on android` → o `cap sync` do passo 3 não
  registrou os plugins (repetir e conferir o passo 4).
- `Failed to find configured root ...` / `FileUriExposedException` → conflito de
  `FileProvider` (ver seção acima).

Depois do build correto: **baixar** salva a imagem em Documentos e
**compartilhar** abre a folha nativa (WhatsApp/Instagram/etc.).

## Observação
Nenhuma mudança de código web resolve isso sozinha numa WebView — o fix é o
rebuild nativo acima. O lado web (Lovable) já está correto.
