import promoImg from "@/assets/aulas-promo-devocionalzeiros.png";

interface Props {
  fullWidth?: boolean;
}

export function PromoCard({ fullWidth }: Props) {
  const base = fullWidth
    ? "group relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-black ring-1 ring-amber-400/30 transition-all duration-300 hover:-translate-y-0.5 hover:ring-amber-400/60 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.5)]"
    : "group relative block aspect-[4/5] w-[170px] flex-shrink-0 overflow-hidden rounded-xl bg-black ring-1 ring-amber-400/30 transition-all duration-300 hover:-translate-y-0.5 hover:ring-amber-400/60 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.5)] sm:w-[190px] md:w-[210px]";

  return (
    <a
      href="https://devocionalzeiros.com.br"
      target="_blank"
      rel="noopener noreferrer"
      className={base}
      aria-label="Conheça a plataforma Devocionalzeiros"
    >
      <img
        src={promoImg}
        alt="Plataforma Devocionalzeiros"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </a>
  );
}
