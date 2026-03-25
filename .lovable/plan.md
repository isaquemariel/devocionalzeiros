
## Changes Requested

Three clear modifications:

### 1. Header — Botão "UPGRADE" → "AJUDE-NOS" com ícone de coração
**File:** `src/components/shared/AppHeader.tsx` (lines 294–317)

- Replace `<Zap>` icon with `<Heart>` icon
- Change text from `UPGRADE` to `AJUDE-NOS`
- Keep the same pulsing animation and navigate to `/planos`
- Import `Heart` from lucide-react (already imported in Planos.tsx, need to add to AppHeader.tsx)

### 2. Página Planos — "O que seu plano oferece" vira acordeão colapsável
**File:** `src/pages/Planos.tsx` (lines 174–212)

- Transformar o card fixo em um botão tipo accordion: "Seu plano atual: GOLD ▼"
- Quando clicado, expande/colapsa as features do plano atual
- Começa fechado por padrão (ou aberto — mas fechado economiza espaço e foca na doação)
- Usar `useState` para controlar `isOpen` do accordion

### 3. Página Planos — Card de doação sobe antes dos cards de planos
**File:** `src/pages/Planos.tsx` (lines 214–391)

- Mover o `{/* Donation Card */}` (atualmente depois dos plans grid) para **antes** do `{/* Plans Grid */}`
- Adicionar subtítulo abaixo do card de doação: `"Ou assine um dos planos e acesse o APP de forma completa"`
- Ordem final na página:
  1. Badge do plano atual (colapsável com features)
  2. Card de doação (PRIORIDADE)
  3. Texto separador: "Ou assine um dos planos..."
  4. Grid de planos (Gold / Premium)
  5. Tabela comparativa (desktop)
  6. FAQ

## Technical Details

**AppHeader.tsx:**
- Add `Heart` to the lucide-react imports (line 3)
- Replace `<Zap className="w-4 h-4 text-white" />` with `<Heart className="w-4 h-4 text-white" />`
- Replace `UPGRADE` text with `AJUDE-NOS`

**Planos.tsx:**
- Add `useState` to control accordion open state (already imported via React, just need to add `useState` usage)
- Add `ChevronDown` to lucide-react imports for the accordion chevron
- Wrap the features list in a collapsible div controlled by `isExpanded` state
- The badge button becomes clickable, toggling the features list
- Move the Donation Card block (lines 364–391) to between the current plan section and the plans grid
- Add a separator text after the donation card
