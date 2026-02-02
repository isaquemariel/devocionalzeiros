
# Plano: Configurar PWA para App Instalável

## Resumo
Vamos transformar seu app em um PWA (Progressive Web App) que poderá ser instalado diretamente pelo navegador no celular, aparecendo na tela inicial como um app nativo.

## O que o usuário vai ganhar
- App instalável pelo navegador (Chrome/Safari)
- Ícone na tela inicial do celular
- Tela de splash ao abrir
- Funciona offline (páginas já visitadas)
- Experiência de app nativo sem barra de navegador

---

## Etapas de Implementação

### 1. Instalar Plugin PWA
Adicionar a dependência `vite-plugin-pwa` que automatiza toda configuração.

### 2. Configurar vite.config.ts
Adicionar o plugin com as configurações:
- **Nome do app**: "Devocionalzeiros"
- **Tema**: Cores escuras (#1a1a2e)
- **Ícones**: Configurar ícones para diferentes tamanhos
- **Cache**: Estratégia para funcionar offline

### 3. Criar Ícones PWA
Adicionar na pasta `public/`:
- `pwa-192x192.png` - Ícone padrão Android
- `pwa-512x512.png` - Ícone alta resolução
- `apple-touch-icon-180x180.png` - Ícone iOS

**Nota**: Você precisará fornecer uma imagem do logo em alta resolução (512x512px mínimo) para eu criar os ícones, ou posso usar o logo existente.

### 4. Atualizar index.html
Adicionar meta tags para melhor experiência mobile:
- `theme-color` - Cor da barra de status
- `apple-mobile-web-app-capable` - Suporte iOS
- `apple-touch-icon` - Ícone para Safari/iOS

### 5. Criar Página de Instalação (Opcional)
Página `/instalar` com instruções e botão para acionar o prompt de instalação no Android.

---

## Detalhes Técnicos

### Configuração do Plugin (vite.config.ts)
```text
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'Devocionalzeiros',
    short_name: 'Devocionalzeiros',
    description: 'App de Leitura Bíblica com Gamificação',
    theme_color: '#1a1a2e',
    background_color: '#1a1a2e',
    display: 'standalone',
    icons: [...]
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
  }
})
```

### Meta Tags (index.html)
```text
<meta name="theme-color" content="#1a1a2e">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png">
```

### Arquivos a Criar/Modificar
| Arquivo | Ação |
|---------|------|
| `vite.config.ts` | Adicionar plugin VitePWA |
| `index.html` | Adicionar meta tags PWA |
| `public/pwa-192x192.png` | Criar ícone |
| `public/pwa-512x512.png` | Criar ícone |
| `public/apple-touch-icon-180x180.png` | Criar ícone iOS |
| `src/pages/Instalar.tsx` | Página com instruções (opcional) |

---

## Como Instalar (Para Usuários)

**Android (Chrome):**
1. Acessar o site
2. Menu (3 pontinhos) → "Instalar app" ou "Adicionar à tela inicial"

**iPhone (Safari):**
1. Acessar o site
2. Botão Compartilhar → "Adicionar à Tela de Início"

---

## Próximos Passos após Aprovação
1. Você tem o logo em alta resolução (512x512px ou maior)? Posso usar o logo atual ou você pode fornecer uma versão melhor.
2. Após implementação, será necessário publicar para testar a instalação.
