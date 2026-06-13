import { ShieldCheck } from "lucide-react";

export const LojaFooter = () => (
  <footer
    className="mt-8 rounded-2xl border px-5 py-6 space-y-5"
    style={{ backgroundColor: "#1B1B38", borderColor: "#34345C" }}
  >
    <div className="grid sm:grid-cols-2 gap-5">
      <div className="space-y-2">
        <h4 className="font-black text-base">Devocionalzeiros</h4>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Produtos com propósito pra acompanhar sua caminhada com Deus. Cuidado,
          segurança e entrega pra todo o Brasil.
        </p>
        <p className="text-muted-foreground text-xs pt-1">CNPJ: 00.000.000/0001-00</p>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Formas de pagamento
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["Visa", "Master", "Elo", "Amex", "Pix", "Boleto"].map((m) => (
              <span
                key={m}
                className="px-2 py-1 rounded-md font-bold text-[10px] border"
                style={{ backgroundColor: "#2A2A4A", borderColor: "#3A3A5E" }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-lg w-fit" style={{ backgroundColor: "#0F2A1F", border: "1px solid #1E5A3D" }}>
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="text-xs font-bold text-green-400">Ambiente seguro · SSL</span>
        </div>
      </div>
    </div>

    <div className="border-t pt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs" style={{ borderColor: "#34345C" }}>
      <a href="/politica-troca" className="text-muted-foreground hover:text-foreground transition-colors">
        Política de Troca e Devolução
      </a>
      <a href="/privacidade" className="text-muted-foreground hover:text-foreground transition-colors">
        Política de Privacidade
      </a>
      <span className="text-muted-foreground/60 ml-auto">© {new Date().getFullYear()} Devocionalzeiros</span>
    </div>
  </footer>
);
