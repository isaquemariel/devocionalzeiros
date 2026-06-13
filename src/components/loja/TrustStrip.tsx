import { Lock, CreditCard, RotateCcw, Truck } from "lucide-react";

const items = [
  { icon: Lock, label: "Compra 100% segura" },
  { icon: CreditCard, label: "Pix, cartão e boleto" },
  { icon: RotateCcw, label: "Troca em até 7 dias" },
  { icon: Truck, label: "Enviamos pra todo o Brasil" },
];

export const TrustStrip = () => (
  <div
    className="rounded-xl border px-2 py-2 grid grid-cols-2 sm:grid-cols-4 gap-2"
    style={{ backgroundColor: "#1B1B38", borderColor: "#34345C" }}
  >
    {items.map((it) => (
      <div key={it.label} className="flex items-center gap-2 text-foreground/90">
        <it.icon className="w-4 h-4 shrink-0 text-amber-400" />
        <span className="font-semibold leading-tight" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
          {it.label}
        </span>
      </div>
    ))}
  </div>
);
