# Setup Firebase (FCM) no Android

> Execute estes passos **na sua máquina**, depois de exportar pra GitHub e rodar `npx cap add android`.

## 1. Coloque o `google-services.json`

Baixado do Firebase Console → cole em:

```
android/app/google-services.json
```

## 2. Edite `android/build.gradle` (raiz do android)

No bloco `plugins { ... }` do **build.gradle do projeto** (`android/build.gradle`), adicione:

```gradle
plugins {
  // ... os plugins que já estavam aqui ...

  // Google Services Gradle plugin
  id("com.google.gms.google-services") version "4.4.4" apply false
}
```

> Se o seu `android/build.gradle` usa o formato antigo (`buildscript { dependencies { classpath ... } }`), use no lugar:
> ```gradle
> buildscript {
>   dependencies {
>     classpath 'com.google.gms:google-services:4.4.4'
>   }
> }
> ```

## 3. Edite `android/app/build.gradle`

No topo, no bloco `plugins`:

```gradle
plugins {
  id("com.android.application")
  id("com.google.gms.google-services")  // <-- adicionar
  // ... outros que já existiam (kotlin-android, etc) ...
}
```

> Se seu arquivo usa o formato antigo `apply plugin: 'com.android.application'`, adicione no final do arquivo:
> ```gradle
> apply plugin: 'com.google.gms.google-services'
> ```

E dentro de `dependencies { ... }`:

```gradle
dependencies {
  // ... outras dependências geradas pelo Capacitor ...

  // Firebase BoM — não especifique versões individuais
  implementation(platform("com.google.firebase:firebase-bom:34.13.0"))

  // Messaging (necessário para push)
  implementation("com.google.firebase:firebase-messaging")

  // Opcional: analytics
  implementation("com.google.firebase:firebase-analytics")
}
```

> **Importante:** o plugin `@capacitor/push-notifications` no Android **já depende de `firebase-messaging`** internamente — então o `implementation("com.google.firebase:firebase-messaging")` acima é redundante mas não atrapalha. O essencial é o `google-services` plugin + o `google-services.json`.

## 4. Sincronize e rode

```bash
npx cap sync android
npx cap open android      # abre Android Studio
# ou diretamente:
npx cap run android
```

No primeiro build, o Android Studio vai validar o `google-services.json` e gerar as classes. Se der erro de SHA, adicione o SHA-1 da sua keystore no Firebase Console (Project Settings → seu app Android → Add fingerprint).

## 5. Teste

1. Abra o app no celular físico (emulador funciona, mas push é mais confiável em device real).
2. Faça login.
3. Aceite a permissão de notificação quando o sistema perguntar.
4. No Supabase, confira a tabela `native_push_tokens` — deve aparecer um registro com `platform = 'android'`.
5. No painel **Admin → Avisos**, dispare uma notificação. Deve chegar tanto no PWA quanto no app nativo.

## Troubleshooting

- **Token não aparece na tabela:** abra o logcat (`adb logcat | grep native-push`) e veja erros. Geralmente é `google-services.json` no lugar errado ou faltou o plugin no `app/build.gradle`.
- **Notificação não chega:** confira logs da edge function `send-native-push` no painel Lovable Cloud → Logs. Erros tipo `UNREGISTERED` significam token inválido (o sistema já remove sozinho).
- **iOS no futuro:** depois de configurar APNs Auth Key no Firebase Console, basta `npx cap add ios && npx cap sync ios`. A mesma edge function funciona.
