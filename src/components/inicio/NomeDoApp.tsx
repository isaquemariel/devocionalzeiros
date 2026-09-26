/**
 * O NOME DO APP no letreiro do RPG — o mesmo de "O JOGO DA BÍBLIA": caixa alta,
 * pergaminho com a parte de ouro (`.rpg-title .hl`) e a sombra "pixel". Fica
 * sobre o céu da hora (que de dia é claro), então leva um halo escuro a mais
 * por trás das letras, para ler em qualquer hora.
 */
export function NomeDoApp({ tamanho, className = "" }: { tamanho: string; className?: string }) {
  return (
    <span
      className={`rpg-title inline-block whitespace-nowrap leading-none tracking-[0.01em] ${className}`}
      style={{
        fontSize: tamanho,
        textShadow: "2px 2px 0 #0b0805, 4px 4px 0 rgba(232,176,75,0.14), 0 0 14px rgba(0,0,0,0.55)",
      }}
    >
      DEVOCIONAL<span className="hl">ZEIROS</span>
    </span>
  );
}
