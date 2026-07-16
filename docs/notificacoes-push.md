# Handoff — corrigir notificações push nativas (Android/FCM)

## Sintoma
Notificações push nativas não chegam nos aparelhos, mesmo com o Firebase
"configurado". Registro de token funciona (há centenas de tokens salvos), mas o
ENVIO falha.

## Diagnóstico já feito (confirmado)
- ✅ Código de envio correto: `send-native-push` usa a **FCM HTTP v1 API** com
  OAuth de service account (`FIREBASE_SERVICE_ACCOUNT_JSON`). Não é a API legada.
- ✅ Service account **válida**: autentica no Google e chega ao FCM.
- ✅ Código de registro do token no app (`useNativePushNotifications`) está correto.
- ❌ O FCM responde **404 `UNREGISTERED` / NotRegistered** para os tokens —
  inclusive um token do admin renovado no mesmo dia.
- 📊 Dos 230 tokens, só ~93 foram atualizados nos últimos 30 dias.

`UNREGISTERED` = o token não é válido no projeto Firebase de onde o backend está
enviando. As causas prováveis, em ordem:

### Causa nº 1 (mais provável): projeto Firebase do APK ≠ do backend
O `google-services.json` embutido no APK precisa ser do **mesmo projeto Firebase**
de onde foi baixada a service account (`FIREBASE_SERVICE_ACCOUNT_JSON`). Se forem
projetos diferentes, os tokens gerados pelo app são inválidos para o backend.

> **CONFIRMADO:** o backend envia pelo projeto Firebase **`devocionalzeiros-app`**
> (retornado pela função de teste). O `google-services.json` do APK precisa ser
> desse mesmo projeto `devocionalzeiros-app`. Se o APK foi buildado com um
> `google-services.json` de OUTRO projeto, é essa a causa do `UNREGISTERED`.
> Ação: baixar o `google-services.json` do projeto `devocionalzeiros-app`
> (Firebase Console → devocionalzeiros-app → app Android → google-services.json),
> colocar em `android/app/` e recompilar o APK.

**Como verificar (2 min):**
1. `project_id` do BACKEND: no Firebase Console, veja de qual projeto a service
   account foi gerada (Configurações → Contas de serviço). Ou rode a função
   `test-native-push` pelo app (botão "Testar no meu aparelho" no admin) — o
   retorno traz `project_id`.
2. `project_id` do APK: abra o `google-services.json` usado no build →
   `project_info.project_id`.
3. **Os dois têm que ser IDÊNTICOS.** Se forem diferentes:
   - Baixe a service account do MESMO projeto do `google-services.json` e
     atualize o secret `FIREBASE_SERVICE_ACCOUNT_JSON` no backend; **ou**
   - Recompile o APK com o `google-services.json` do projeto da service account.

### Causa nº 2: tokens antigos/expirados
Se os project_ids batem, então são tokens velhos. O envio de produção
(`send-native-push`) já apaga tokens `UNREGISTERED` automaticamente; usuários que
reabrirem o app registram um token novo. Para forçar: reinstale o app / limpe os
dados, reabra, permita notificações e teste de novo.

## Confirmação de setup no APK (checklist do build)
- `google-services.json` presente em `android/app/` e do projeto certo.
- Plugin gradle `com.google.gms.google-services` aplicado.
- `@capacitor/push-notifications` sincronizado (`npx cap sync android`).
- Permissão `POST_NOTIFICATIONS` (Android 13+) — o app já solicita em runtime.
- No Firebase Console, Cloud Messaging API (v1) habilitada no projeto.

## Ferramenta de diagnóstico no app
Admin → "Avisos & Notificações Push" → botão **"Testar no meu aparelho"**: envia
um push só para o próprio admin e mostra o resultado exato do FCM + o `project_id`
do backend. Use para validar antes/depois do ajuste.
