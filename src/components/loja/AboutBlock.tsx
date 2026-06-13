import { Flame } from "lucide-react";

export const AboutBlock = () => (
  <section
    className="rounded-2xl border p-6 sm:p-8 text-center space-y-4"
    style={{ backgroundColor: "var(--loja-bg-alt)", borderColor: "var(--loja-border)" }}
  >
    <div
      className="mx-auto w-14 h-14 rounded-full flex items-center justify-center"
      style={{ backgroundColor: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.35)" }}
    >
      <Flame className="w-7 h-7" style={{ color: "var(--loja-amber)" }} />
    </div>
    <h3 className="font-black tracking-tight" style={{ fontSize: "clamp(18px, 4.6vw, 24px)" }}>
      Sobre os Devocionalzeiros
    </h3>
    <p
      className="max-w-2xl mx-auto leading-relaxed"
      style={{ color: "var(--loja-text-soft)", fontSize: "clamp(13px, 3.2vw, 15px)" }}
    >
      Existimos para ajudar você a sair da superficialidade e construir uma vida devocional real,
      bíblica e transformadora. Cada produto da nossa loja foi escolhido para caminhar com você
      na constância da Palavra — sem fórmulas vazias, só o que edifica e aproxima de Deus.
    </p>
    <a
      href="/"
      className="inline-block rounded-xl px-5 py-2.5 font-bold border transition-colors hover:bg-white/5"
      style={{ borderColor: "var(--loja-border)", color: "var(--loja-text)", fontSize: "clamp(12px, 3vw, 14px)" }}
    >
      Conheça nossa história
    </a>
  </section>
);
