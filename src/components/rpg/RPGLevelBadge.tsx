import { getLevelTier } from "@/lib/rpgLevel";

interface Props {
  level: number;
  /** diâmetro em px */
  size?: number;
  /** mostra o emblema (emoji) acima do número */
  showEmoji?: boolean;
}

/** Medalha de nível: cor/emblema/brilho evoluem por patente. */
export const RPGLevelBadge = ({ level, size = 96, showEmoji = true }: Props) => {
  const tier = getLevelTier(level);
  return (
    <div
      className="relative flex flex-col items-center justify-center rounded-full shrink-0"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 50% 35%, ${tier.gradient[0]}, ${tier.gradient[1]})`,
        border: `${Math.max(2, size * 0.03)}px solid ${tier.color}`,
        boxShadow: tier.glow
          ? `0 0 ${size * 0.28}px ${tier.color}, inset 0 0 ${size * 0.12}px rgba(255,255,255,0.35)`
          : `inset 0 0 ${size * 0.1}px rgba(0,0,0,0.4)`,
      }}
    >
      {showEmoji && (
        <span style={{ fontSize: size * 0.28, lineHeight: 1 }} aria-hidden="true">
          {tier.emoji}
        </span>
      )}
      <span
        className="font-black leading-none"
        style={{ fontSize: size * 0.34, color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,0.7)" }}
      >
        {level}
      </span>
    </div>
  );
};

export default RPGLevelBadge;
