import { useEffect, useState } from "react";
import { Devocionalzeiro, type Expressao, type Gesto } from "@/components/devocionalzeiro/Devocionalzeiro";

type MascotMood = "happy" | "sad" | "champion" | "idle";

interface Mascot3DProps {
  mood?: MascotMood;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  /** a boca acompanha um balão de fala */
  falando?: boolean;
  /** troca o gesto do humor (ex.: acenar enquanto fala) */
  gesto?: Gesto;
}

const sizeMap = {
  xs: 40,
  sm: 70,
  md: 110,
  lg: 150,
  xl: 200,
};

/**
 * Cada humor é uma cena curta do personagem, não uma troca de cor:
 * - idle: o de todo dia, chama de sempre;
 * - happy: sorri e dá um pulinho ao aparecer;
 * - sad: a chama baixa e ele fica cabisbaixo — sem lágrima de desenho;
 * - champion: a chama sobe e ele comemora pulando.
 */
const HUMOR: Record<MascotMood, { expressao: Expressao; gesto: Gesto; chama: number }> = {
  idle: { expressao: "neutro", gesto: "parado", chama: 0.34 },
  happy: { expressao: "feliz", gesto: "parado", chama: 0.5 },
  sad: { expressao: "triste", gesto: "parado", chama: 0.14 },
  champion: { expressao: "radiante", gesto: "comemorar", chama: 0.85 },
};

/**
 * O Devocionalzeiro nas telas do app (carregamento, home, quiz, conquistas).
 *
 * O nome ficou por compatibilidade: havia aqui um SVG próprio, de óculos
 * dourados e chama laranja, com cores por humor — um personagem diferente do
 * da jornada e do RPG. Agora é o rig do app (`components/devocionalzeiro`), o
 * mesmo boneco em todo lugar.
 */
export const Mascot3D = ({ mood = "idle", size = "md", className = "", falando = false, gesto }: Mascot3DProps) => {
  const h = HUMOR[mood];
  const px = sizeMap[size];
  // o pulinho de chegada, quando o humor muda para feliz
  const [pulso, setPulso] = useState(0);
  useEffect(() => { if (mood === "happy") setPulso((p) => p + 1); }, [mood]);

  return (
    <div
      className={`relative inline-flex items-end justify-center pointer-events-none ${className}`}
      style={{ width: px, height: (px * 229) / 205 }}
    >
      <Devocionalzeiro tamanho={px} expressao={h.expressao} gesto={gesto ?? h.gesto} chama={h.chama} pulso={pulso} falando={falando} />
    </div>
  );
};

export default Mascot3D;
