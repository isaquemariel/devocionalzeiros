import { BookMarked, Gift, Package } from "lucide-react";

interface Props {
  onSelectCategory: (label: string) => void;
}

const PROMOS = [
  {
    label: "Bíblias",
    title: "Bíblias com propósito",
    sub: "Edições para sua jornada",
    icon: BookMarked,
    bg: "linear-gradient(135deg, #1E3A8A 0%, #312E81 100%)",
  },
  {
    label: "Combos",
    title: "Combos especiais",
    sub: "Economize comprando junto",
    icon: Package,
    bg: "linear-gradient(135deg, #7C5CFF 0%, #4F46E5 100%)",
  },
  {
    label: "Presentes",
    title: "Presentes com fé",
    sub: "Pra abençoar quem você ama",
    icon: Gift,
    bg: "linear-gradient(135deg, #F59E0B 0%, #B45309 100%)",
  },
];

export const PromoBanners = ({ onSelectCategory }: Props) => (
  <section className="space-y-3">
    <h3 className="font-black tracking-tight" style={{ fontSize: "clamp(15px, 4vw, 20px)" }}>
      Promoções
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {PROMOS.map(({ label, title, sub, icon: Icon, bg }) => (
        <button
          key={label}
          onClick={() => onSelectCategory(label)}
          className="group relative overflow-hidden rounded-2xl text-left p-5 min-h-[160px] flex flex-col justify-between gap-5 transition-transform hover:-translate-y-0.5"
          style={{ background: bg }}
        >
          <div
            className="loja-glass-icon w-12 h-12 rounded-2xl flex items-center justify-center"
          >
            <Icon
              className="w-6 h-6 text-white"
              strokeWidth={1.8}
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))", position: "relative", zIndex: 1 }}
            />
          </div>

          <div>
            <p className="font-black text-white leading-tight" style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>
              {title}
            </p>
            <p className="text-white/80 mt-1" style={{ fontSize: "clamp(11px, 2.8vw, 13px)" }}>
              {sub}
            </p>
            <span
              className="inline-block mt-3 font-bold rounded-full px-3 py-1 backdrop-blur-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.18)", color: "#fff", fontSize: "clamp(10px, 2.5vw, 12px)" }}
            >
              Conferir →
            </span>
          </div>
        </button>
      ))}

    </div>
  </section>
);
