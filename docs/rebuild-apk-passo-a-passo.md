# Rebuild do app Android — passo a passo para leigos

Este rebuild conserta de uma vez: **compartilhar/baixar imagem** (plugins nativos)
e **notificações push** (google-services.json do projeto certo).

Pacote do app: **`com.clubehd.app`** · Projeto Firebase: **`devocionalzeiros-app`**

---

## ⚠️ FASE 0 — Verificar a "chave de assinatura" (faça ISSO primeiro!)

Para **atualizar** o app que já está na Play Store, o novo arquivo precisa ser
assinado com a mesma chave. Se você não tiver a chave e não estiver usando o
"Play App Signing", você NÃO consegue atualizar o app existente.

1. Acesse **Google Play Console** (play.google.com/console) → seu app.
2. Menu esquerdo → **Configurações → Integridade do app → Assinatura de apps**
   (App integrity → App signing).
3. Veja se aparece **"Assinatura de apps do Google Play" ATIVADA**.
   - ✅ **Ativada** → ótimo. O Google guarda a chave principal; você só precisa de
     uma **"chave de upload"**. Se você tiver essa chave, siga em frente. Se não
     tiver, dá pra **redefinir a chave de upload** ali mesmo (botão "Solicitar
     redefinição da chave de upload").
   - ❌ **Não ativada** e você **não tem** o arquivo `.jks/.keystore` original →
     você não conseguirá atualizar este app. Nesse caso, pare e me chame: a saída
     é publicar como app novo (ruim) ou recuperar a chave.

> Se você nunca gerou o app (foi um terceiro), procure no e-mail/arquivos por um
> arquivo terminado em **`.jks`** ou **`.keystore`** e a senha dele.

**Só siga para a Fase 1 se a Fase 0 estiver resolvida.**

---

## FASE 1 — Instalar os programas (uma vez só)

No seu computador (Windows ou Mac):

1. **Node.js** — https://nodejs.org → baixe a versão **LTS** → instale (next, next).
2. **Android Studio** — https://developer.android.com/studio → instale. Ele já
   vem com o Java (JDK) necessário. Na primeira abertura, deixe ele baixar o
   "Android SDK" que ele sugerir.

---

## FASE 2 — Baixar o código

Opção fácil (sem git):
1. No GitHub, abra o repositório `isaquemariel/devocionalzeiros`.
2. Botão verde **"Code"** → **"Download ZIP"**.
3. Extraia o ZIP numa pasta fácil (ex.: `Documentos/devocionalzeiros`).

Abra o **Terminal** (Mac) ou **Prompt de Comando/PowerShell** (Windows) e entre
na pasta:
```
cd caminho/da/pasta/devocionalzeiros
```

Instale as dependências:
```
npm install
```

---

## FASE 3 — Colocar o Firebase certo

1. No **Firebase Console** → projeto **`devocionalzeiros-app`** → engrenagem ⚙️
   → **Configurações do projeto** → seção **"Seus apps"** → app Android
   **`com.clubehd.app`** → botão **"google-services.json"** (baixar).
2. Guarde esse arquivo — você vai colocá-lo no lugar certo no próximo passo.

---

## FASE 4 — Gerar o projeto Android e sincronizar os plugins

No terminal, dentro da pasta do projeto:
```
npm run build
npx cap add android
```
Isso cria a pasta `android/`.

Agora **coloque o `google-services.json`** que você baixou dentro de:
```
android/app/google-services.json
```

Depois edite dois arquivos (abra com o Bloco de Notas / editor do Android Studio):

**`android/build.gradle`** — dentro de `plugins { ... }` adicione:
```gradle
id("com.google.gms.google-services") version "4.4.4" apply false
```

**`android/app/build.gradle`** — dentro de `plugins { ... }` no topo adicione:
```gradle
id("com.google.gms.google-services")
```

Salve e rode:
```
npx cap sync android
```
Isso registra os plugins nativos (Share, Filesystem, Push).

> Confira: o arquivo `android/app/src/main/assets/capacitor.plugins.json` deve
> conter `SharePlugin`, `FilesystemPlugin` e `PushNotificationsPlugin`.

---

## FASE 5 — Abrir no Android Studio e gerar o app assinado

```
npx cap open android
```
Isso abre o Android Studio. Espere ele terminar de carregar (barra de baixo).

1. Menu **Build → Generate Signed Bundle / APK**.
2. Escolha **Android App Bundle (.aab)** → Next.
3. Em **Key store path**:
   - Se você tem o `.jks/.keystore` → selecione-o e digite as senhas.
   - Se usa Play App Signing e vai criar uma chave de upload nova → "Create new…"
     e guarde bem o arquivo e as senhas.
4. Next → escolha **release** → Finish.
5. O Android Studio gera o arquivo `.aab` (ele mostra o caminho, algo como
   `android/app/release/app-release.aab`).

> **Importante:** antes de gerar, aumente o número da versão. Abra
> `android/app/build.gradle` e aumente o `versionCode` (ex.: de 10 para 11) e o
> `versionName`. A Play Store exige um `versionCode` maior que o publicado.

---

## FASE 6 — Enviar para a Play Store

1. **Play Console** → seu app → **Testes → Teste interno** (recomendado testar
   antes de ir pra produção).
2. **Criar nova versão** → faça upload do `.aab`.
3. Avance e envie para revisão do teste interno.
4. Instale a versão de teste no seu celular pelo link do teste interno.
5. Teste **compartilhar**, **baixar** e o botão **"Testar no meu aparelho"**
   (notificação). Se tudo funcionar, promova a versão para **Produção**.

---

## Se algo der errado
- Erro de SHA no Firebase: Play Console → Assinatura de apps → copie o
  **SHA-1** e **SHA-256** e adicione no Firebase Console (app Android → "Adicionar
  impressão digital").
- Erro "package não corresponde": confirme que o `google-services.json` é do app
  `com.clubehd.app` e que `capacitor.config.ts` está com `appId: 'com.clubehd.app'`.
- Push ainda não chega após o rebuild: rode o botão "Testar no meu aparelho" — o
  erro exato aparece no toast.

## Alternativa (se preferir não fazer você mesmo)
Contratar um freelancer Android para **um serviço pontual** de "sincronizar
plugins Capacitor + trocar google-services.json + gerar AAB assinado + subir na
Play Console". É um trabalho de ~1h para quem tem o ambiente pronto. Você entrega
este documento + o `google-services.json` + a chave de assinatura.
