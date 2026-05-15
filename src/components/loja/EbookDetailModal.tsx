import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, FileText, Smartphone, Mail, Zap, Infinity as InfinityIcon } from "lucide-react";

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

interface EbookProduct {
  id: string;
  title: string;
  description: string;
  author?: string;
  price: number;
  buy_link: string;
  image_urls: string[];
}

interface Props {
  product: EbookProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EbookDetailModal = ({ product, open, onOpenChange }: Props) => {
  if (!product) return null;
  const image = product.image_urls?.[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        <div
          className="relative bg-gradient-to-br from-indigo-950 via-slate-900 to-fuchsia-950 flex items-center justify-center overflow-hidden rounded-t-lg"
          style={{ height: "clamp(220px, 50vw, 360px)" }}
        >
          {image && (
            <img src={image} alt={product.title} className="w-full h-full object-contain" />
          )}
          <span className="absolute top-3 left-3 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> E-book Digital
          </span>
        </div>

        <div className="p-5 space-y-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-black leading-tight text-left">
              {product.title}
            </DialogTitle>
          </DialogHeader>

          {product.author && (
            <p className="text-muted-foreground uppercase tracking-wider text-xs font-semibold">
              por {product.author}
            </p>
          )}

          <p className="font-black text-primary" style={{ fontSize: "clamp(22px, 5vw, 28px)" }}>
            {formatBRL(product.price)}
          </p>

          {/* What you get */}
          <div className="rounded-xl bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 border border-indigo-500/20 p-4 space-y-3">
            <h4 className="font-black text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Como funciona o e-book
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                <span><strong>Arquivo PDF</strong> de alta qualidade, pronto para ler em qualquer dispositivo.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Smartphone className="w-4 h-4 text-fuchsia-400 mt-0.5 shrink-0" />
                <span>Leia no <strong>celular, tablet ou computador</strong> — onde e quando quiser.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Após a compra, o link de download chega <strong>direto no seu e-mail</strong> em poucos minutos.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <InfinityIcon className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span><strong>Acesso vitalício</strong> ao arquivo — baixe quantas vezes precisar.</span>
              </li>
            </ul>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-black text-sm mb-2">Sobre o livro</h4>
            <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </div>
          </div>

          <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-amber-700 dark:text-amber-300">
            <strong>Atenção:</strong> Este é um produto <strong>100% digital</strong>. Você não receberá um livro físico em casa. O acesso é entregue por e-mail logo após a confirmação do pagamento.
          </div>

          <div className="pt-2">
            <a
              href={product.buy_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:opacity-90 text-white font-bold transition-opacity flex items-center justify-center gap-2 py-3 text-base"
            >
              <ExternalLink className="w-5 h-5" /> Comprar E-book Agora
            </a>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Pagamento seguro via Kiwify · Cartão, Pix ou Boleto
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
