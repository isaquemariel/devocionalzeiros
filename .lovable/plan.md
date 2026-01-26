
# Plano: Implementar Tela de Redefinição de Senha

## Resumo
Completar o fluxo de "Esqueci minha senha" adicionando a lógica para detectar quando o usuário clica no link do email e exibir um formulário para definir uma nova senha.

## O Que Falta Atualmente
O sistema já envia o email de recuperação corretamente, mas quando o usuário clica no link e volta para `/auth`, não há lógica para:
1. Detectar que é uma sessão de recuperação (`recovery` event)
2. Exibir um formulário para inserir a nova senha
3. Chamar `supabase.auth.updateUser()` para salvar a nova senha

---

## Alterações Planejadas

### 1. Atualizar `useAuth.ts`
- Adicionar função `updatePassword(newPassword)` que chama `supabase.auth.updateUser({ password })`
- Exportar essa nova função no hook

### 2. Atualizar `Auth.tsx`
- Adicionar novo estado `isSettingNewPassword` para controlar quando mostrar o formulário de nova senha
- Adicionar estados para `newPassword` e `confirmPassword`
- Detectar o evento `PASSWORD_RECOVERY` no `onAuthStateChange` e ativar o modo de redefinição
- Criar UI para o formulário de nova senha com:
  - Campo de nova senha
  - Campo de confirmação de senha
  - Validação de que as senhas coincidem
  - Validação de força da senha (mínimo 6 caracteres)
- Ao submeter, chamar `updatePassword()` e exibir sucesso
- Redirecionar para `/home` após redefinição bem-sucedida

---

## Fluxo do Usuário
1. Usuário clica em "Esqueceu sua senha?"
2. Digita o email e clica "Enviar email"
3. Recebe email com link de recuperação
4. Clica no link → volta para `/auth`
5. **NOVO**: Sistema detecta sessão de recuperação e exibe formulário de nova senha
6. **NOVO**: Usuário digita nova senha e confirma
7. **NOVO**: Sistema atualiza a senha e redireciona para a home

---

## Detalhes Técnicos

### Hook `useAuth.ts`
```typescript
const updatePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { data, error };
};
```

### Detecção de Recuperação em `Auth.tsx`
```typescript
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsSettingNewPassword(true);
      }
    }
  );
  return () => subscription.unsubscribe();
}, []);
```

### Novo Formulário de Nova Senha
- Título: "Defina sua nova senha"
- Campo: Nova senha (com toggle de visibilidade)
- Campo: Confirmar senha
- Validações:
  - Mínimo 6 caracteres
  - Senhas devem coincidir
- Botão: "Salvar nova senha"
- Toast de sucesso: "Senha alterada com sucesso!"

---

## Arquivos a Modificar
1. `src/hooks/useAuth.ts` - Adicionar função `updatePassword`
2. `src/pages/Auth.tsx` - Adicionar lógica de detecção e formulário de nova senha
