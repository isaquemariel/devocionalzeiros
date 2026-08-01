import type { CSSProperties } from "react";

// ============================================================================
// Tag de identidade do personagem — 👑 nível + nome + DEV. O MESMO visual em
// todo lugar: cena viva, home, salas. Se mudar aqui, muda em todo o app.
// ============================================================================

interface RPGNameTagProps {
  name: string;
  level?: number;
  isAdmin?: boolean;
  className?: string;
  style?: CSSProperties;
}

const RPGNameTag = ({ name, level, isAdmin, className = "", style }: RPGNameTagProps) => (
  <div className={`pointer-events-none flex items-center gap-1 ${className}`} style={style}>
    <span className="inline-flex items-center gap-0.5 px-1 py-[1px] rounded bg-black/65 border border-[#ffd88966] text-[9px] font-black text-[#ffd889] leading-none whitespace-nowrap">
      👑{level ?? 0}
    </span>
    <span className={`px-1.5 py-[1px] rounded text-[10px] font-black leading-none whitespace-nowrap ${isAdmin ? "bg-[#c084fc22] border border-[#c084fc] text-[#e2c6ff]" : "bg-[#e8b04b26] border border-[#ffd889aa] text-[#ffe9b0]"}`}>
      {name}
    </span>
    {isAdmin && (
      <span className="px-1 py-[1px] rounded bg-[#c084fc] text-[8px] font-black text-[#2a1245] leading-none">DEV</span>
    )}
  </div>
);

export default RPGNameTag;
