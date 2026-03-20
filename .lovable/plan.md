
## Diagnóstico dos 3 problemas

### Problema 1 — Google OAuth não loga no app

O fluxo OAuth via `lovable.auth.signInWithOAuth` é baseado em **popup/redirect**. Quando o Google redireciona de volta, o `onAuthStateChange` no `Auth.tsx` está configurado para detectar apenas `PASSWORD_RECOVERY`. O evento `SIGNED_IN` não é tratado explicitamente — mas deveria funcionar pelo `useEffect` que observa `user`. 

O real problema: o `redirect_uri` passado é `window.location.origin` (ex: `https://devocionalzeiros.com.br`), o que faz o Google redirecionar para a raiz. Se o service worker estiver ativo e cachear a rota, pode servir o `index.html` antes que os tokens do hash sejam processados. Além disso, o `onAuthStateChange` no `Auth.tsx` só escuta `PASSWORD_RECOVERY` e não detecta `SIGNED_IN` para acionar o navigate.

**Fix**: Adicionar tratamento do evento `SIGNED_IN` no listener de `Auth.tsx` para forçar navegação para `/home`, e garantir que o `redirect_uri` aponte para `/auth` (onde o listener está ativo) em vez de `/` (raiz).

### Problema 2 — "Erro ao criar conta"

Os logs mostram `status: 422` repetidos no `/signup`. O Supabase retorna 422 com mensagens como:
- `"User already registered"` → já existe
- `"email rate limit exceeded"` → muitas tentativas

O código atual verifica `error.message.includes("already registered")` mas a mensagem real pode ser `"Email rate limit exceeded"` ou outros textos. O toast genérico "Erro ao criar conta" aparece para qualquer 422 não mapeado.

**Fix**: Ampliar o tratamento de erros no `handleSubmit` do `Auth.tsx` para cobrir os casos de 422, `email rate limit`, e exibir mensagens mais claras para o usuário.

### Problema 3 — "Mesma senha" mesmo usando senha diferente

O `SettingsDialog.tsx` detecta erro 422 com `msg.includes("different")` ou `msg.includes("same")`. A mensagem real do Supabase é `"New password should be different from the old password"` — contém "different", deveria funcionar.

O problema real: após o reset de senha via email (fluxo `PASSWORD_RECOVERY`), o Supabase estabelece uma sessão temporária. Quando o usuário define a nova senha nessa sessão e depois tenta alterar novamente nas Configurações usando **a mesma senha que acabou de definir**, o Supabase retorna 422. O usuário vê isso e acha que não funciona.

Mas há um segundo bug mais crítico: nas Configurações, o `handleSavePassword` chama `supabase.auth.updateUser()` diretamente — se o token de sessão tiver expirado (sessão de recovery), retorna 422 interpretado incorretamente.

**Fix**: Melhorar o tratamento de erro no `SettingsDialog.tsx` para mostrar mensagem mais detalhada e também corrigir a detecção de erro 422 que pode estar sendo mascarada pela ordem de verificação de condições.

---

## Arquivos a modificar

| Arquivo | Mudança |
|---|---|
| `src/pages/Auth.tsx` | Corrigir Google OAuth: redirecionar para `/auth`, tratar evento `SIGNED_IN`; melhorar erros de signup |
| `src/components/settings/SettingsDialog.tsx` | Corrigir detecção de erro 422 na troca de senha |

## Detalhes técnicos

### Auth.tsx — Google redirect_uri
```typescript
// Antes
await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });

// Depois
await lovable.auth.signInWithOAuth("google", { 
  redirect_uri: `${window.location.origin}/auth`
});
```

### Auth.tsx — listener onAuthStateChange
Adicionar detecção de `SIGNED_IN` para garantir redirecionamento:
```typescript
supabase.auth.onAuthStateChange((event) => {
  if (event === "PASSWORD_RECOVERY") { ... }
  if (event === "SIGNED_IN") { navigate("/home"); }  // ← adicionar
});
```

### Auth.tsx — erros de signup
```typescript
if (error) {
  if (error.message.includes("already registered") || error.message.includes("User already registered")) {
    toast.error("Este email já está cadastrado. Tente fazer login.");
  } else if (error.message.toLowerCase().includes("rate limit") || error.status === 429) {
    toast.error("Muitas tentativas. Aguarde alguns minutos.");
  } else if (error.status === 422) {
    toast.error("Email inválido ou já em uso. Verifique e tente novamente.");
  } else {
    toast.error("Erro ao criar conta. Tente novamente.");
  }
  return;
}
```

### SettingsDialog.tsx — detecção de erro 422
```typescript
const errorMsg = (error as any)?.message ?? "";
const errorStatus = (error as any)?.status ?? (error as any)?.code;
if (errorStatus === 422 || errorMsg.toLowerCase().includes("different from") || errorMsg.toLowerCase().includes("same password")) {
  toast.error("A nova senha deve ser diferente da senha atual.");
} else if (errorStatus === 401 || errorMsg.toLowerCase().includes("session")) {
  toast.error("Sessão expirada. Faça login novamente.");
} else {
  toast.error(`Erro ao atualizar senha: ${errorMsg || "Tente novamente."}`);
}
```
