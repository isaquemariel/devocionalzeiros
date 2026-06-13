const ITEMS = [
  "FRETE GRÁTIS ACIMA DE R$200",
  "ENTREGA PARA TODO O BRASIL",
  "ATÉ 12X NO CARTÃO",
  "AMBIENTE SEGURO · SSL",
];

export const ShippingMarquee = () => {
  const seq = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]; // duplicate for seamless loop
  return (
    <div
      className="w-full overflow-hidden border-b"
      style={{ backgroundColor: "var(--loja-amber)", borderColor: "rgba(0,0,0,0.15)" }}
      aria-label="Avisos da loja"
    >
      <div className="loja-marquee-track py-1.5">
        {[...seq, ...seq].map((item, i) => (
          <span
            key={i}
            className="font-black uppercase tracking-wider px-6 inline-flex items-center"
            style={{
              color: "var(--loja-amber-ink)",
              fontSize: "clamp(10px, 2.6vw, 12px)",
              letterSpacing: "0.08em",
            }}
          >
            {item}
            <span className="mx-3 opacity-50">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};
