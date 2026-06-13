import { ShieldCheck, Instagram, Facebook, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORY_LINKS = ["Livros", "Bíblias", "Presentes", "Combos", "Destaques"];
const STORE_LINKS = [
  { label: "Quem Somos", href: "/" },
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Dúvidas Frequentes", href: "#" },
  { label: "Política de Entrega", href: "#" },
  { label: "Política de Pagamento", href: "#" },
  { label: "Trocas e Devoluções", href: "#" },
];
const PAYMENTS = ["Visa", "Master", "Elo", "Amex", "Pix", "Boleto"];

export const LojaFooter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Informe um e-mail válido");
      return;
    }
    toast.success("Inscrição recebida! 💙", { description: "Você receberá nossas novidades em breve." });
    setEmail("");
  };

  return (
    <footer
      className="mt-10 rounded-2xl border overflow-hidden"
      style={{ backgroundColor: "var(--loja-bg-alt)", borderColor: "var(--loja-border)" }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8">
        {/* Categorias */}
        <div>
          <h4 className="font-black uppercase tracking-wider text-xs mb-3" style={{ color: "var(--loja-amber)" }}>
            Categorias
          </h4>
          <ul className="space-y-2">
            {CATEGORY_LINKS.map((c) => (
              <li key={c}>
                <a href={`/loja?cat=${encodeURIComponent(c)}`} className="text-xs hover:text-white transition-colors" style={{ color: "var(--loja-text-soft)" }}>
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sobre a loja */}
        <div>
          <h4 className="font-black uppercase tracking-wider text-xs mb-3" style={{ color: "var(--loja-amber)" }}>
            Sobre a loja
          </h4>
          <ul className="space-y-2">
            {STORE_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-xs hover:text-white transition-colors" style={{ color: "var(--loja-text-soft)" }}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-black uppercase tracking-wider text-xs mb-3" style={{ color: "var(--loja-amber)" }}>
            Comunidade
          </h4>
          <p className="text-xs mb-3" style={{ color: "var(--loja-text-soft)" }}>
            Faça parte da nossa comunidade! Receba ofertas e novos lançamentos.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-lg px-3 py-2 text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              style={{ backgroundColor: "var(--loja-bg)", borderColor: "var(--loja-border)", color: "var(--loja-text)" }}
            />
            <button
              type="submit"
              className="w-full rounded-lg font-black text-xs py-2 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--loja-amber)", color: "var(--loja-amber-ink)" }}
            >
              Quero receber
            </button>
          </form>
        </div>

        {/* Redes sociais */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-black uppercase tracking-wider text-xs mb-3" style={{ color: "var(--loja-amber)" }}>
            Redes sociais
          </h4>
          <div className="flex gap-2">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Youtube, label: "YouTube" },
              { Icon: Music2, label: "TikTok" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-colors hover:bg-white/5"
                style={{ borderColor: "var(--loja-border)", color: "var(--loja-text-soft)" }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t px-6 sm:px-8 py-5 space-y-4" style={{ borderColor: "var(--loja-border)", backgroundColor: "rgba(0,0,0,0.18)" }}>
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-1.5">
            {PAYMENTS.map((m) => (
              <span
                key={m}
                className="px-2 py-1 rounded-md font-bold text-[10px] border"
                style={{ backgroundColor: "var(--loja-card)", borderColor: "var(--loja-border)", color: "var(--loja-text)" }}
              >
                {m}
              </span>
            ))}
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ backgroundColor: "#0F2A1F", border: "1px solid #1E5A3D" }}
          >
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span className="text-xs font-bold text-green-400">Ambiente seguro · SSL</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]" style={{ color: "var(--loja-text-soft)" }}>
          <span>CNPJ: 00.000.000/0001-00 — preencher com o real</span>
          <span>© {new Date().getFullYear()} Devocionalzeiros. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
};
