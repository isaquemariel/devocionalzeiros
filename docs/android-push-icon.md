# Ícone do app nas notificações push (Android)

Hoje o push chega com um **quadrado branco genérico** na barra de status. Isso
acontece porque o Android exige um **ícone pequeno próprio** (silhueta branca
sobre fundo transparente) dentro do APK — ele não usa o ícone colorido do app.

O backend **já envia** `android.notification.icon = "ic_stat_notify"` e
`color = "#e8b04b"` em todos os pushes (send-native-push / test-native-push).
Enquanto o APK não tiver o recurso, o Android continua caindo no ícone padrão —
**nada quebra**. Assim que o APK for gerado com os arquivos abaixo, o ícone
passa a aparecer sozinho, sem mudança no backend.

## O que fazer no próximo build do APK

1. Os ícones já estão prontos neste repositório, em
   `assets/android-notification-icon/drawable-*/ic_stat_notify.png`
   (silhueta branca do foguinho de óculos, todas as densidades).

2. Depois de `npx cap add android` (ou no projeto Android existente), copie as
   pastas para dentro do projeto nativo:

   ```bash
   cp -r assets/android-notification-icon/drawable-* android/app/src/main/res/
   ```

3. No `android/app/src/main/AndroidManifest.xml`, dentro de `<application>`,
   adicione (define o padrão também para pushes sem o campo `icon`):

   ```xml
   <meta-data
       android:name="com.google.firebase.messaging.default_notification_icon"
       android:resource="@drawable/ic_stat_notify" />
   <meta-data
       android:name="com.google.firebase.messaging.default_notification_color"
       android:resource="@color/push_accent" />
   ```

   E em `android/app/src/main/res/values/colors.xml` (crie se não existir):

   ```xml
   <color name="push_accent">#e8b04b</color>
   ```

4. Gere o APK/AAB normalmente e publique na Play Store.

## Como validar

Com o app novo instalado, use o botão **"Testar no meu aparelho"** no painel
admin (card Avisos & Notificações Push): a notificação deve chegar com o
foguinho branco tingido de dourado na barra de status, em vez do quadrado.
