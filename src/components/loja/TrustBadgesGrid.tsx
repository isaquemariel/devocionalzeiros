import { Truck, CreditCard, ShieldCheck, Zap } from "lucide-react";

const BADGES = [
  { icon: Truck, title: "FRETE GRÁTIS", sub: "Em compras acima de R$200" },
  { icon: CreditCard, title: "PARCELAMENTO", sub: "Em até 12x no cartão" },
  { icon: ShieldCheck, title: "COMPRA SEGURA", sub: "Ambiente 100% protegido" },
  { icon: Zap, title: "ENVIO RÁPIDO", sub: "Postagem em até 3 dias úteis" },
];

export const TrustBadgesGrid = () => (
  <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
    {BADGES.map(({ icon: Icon, title, sub }) => (
      <div
        key={title}
        className="flex items-center gap-3 rounded-xl px-3 py-3 border transition-colors"
        style={{ backgroundColor: "var(--loja-card)", borderColor: "var(--loja-border)" }}
      >
        <div
          className="shrink-0 rounded-lg flex items-center justify-center"
          style={{
            width: 38,
            height: 38,
            backgroundColor: "rgba(245,166,35,0.12)",
            border: "1px solid rgba(245,166,35,0.35)",
          }}
        >
          <Icon className="w-5 h-5" style={{ color: "var(--loja-amber)" }} />
        </div>
        <div className="min-w-0">
          <p className="font-black leading-tight" style={{ fontSize: "clamp(11px, 2.8vw, 13px)", color: "var(--loja-text)" }}>
            {title}
          </p>
          <p className="leading-tight mt-0.5" style={{ fontSize: "clamp(10px, 2.4vw, 11px)", color: "var(--loja-text-soft)" }}>
            {sub}
          </p>
        </div>
      </div>
    ))}
  </section>
);
