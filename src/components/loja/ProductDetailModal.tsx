import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShoppingCart, ShieldCheck, Loader2, Image as ImageIcon, PackageX, Package, Lock, RotateCcw, Truck } from "lucide-react";
import { type ShopifyProduct, createDirectCheckout } from "@/lib/shopifyApi";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { RatingStars, getPlaceholderRating } from "./RatingStars";
import { SecureCheckoutNote } from "./SecureCheckoutNote";

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const PLACEHOLDER_REVIEWS = [
  { stars: 5, text: "Chegou rápido e a qualidade superou minha expectativa.", author: "Ana C." },
  { stars: 5, text: "Item lindo e com propósito. Já virou parte do meu devocional.", author: "Lucas M." },
];

interface Props {
  product: ShopifyProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDetailModal = ({ product, open, onOpenChange }: Props) => {
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);
  const [buyLoading, setBuyLoading] = useState(false);

  if (!product) return null;

  const { node } = product;
  const images = node.images?.edges || [];
  const variant = node.variants?.edges?.[0]?.node;
  const price = variant ? parseFloat(variant.price.amount) : parseFloat(node.priceRange.minVariantPrice.amount);
  const stock = variant?.quantityAvailable ?? node.totalInventory ?? null;
  const isSoldOut = !variant?.availableForSale || (typeof stock === "number" && stock <= 0);
  const lowStock = typeof stock === "number" && stock > 0 && stock <= 10;
  const { rating, count } = getPlaceholderRating(node.id);

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho!", { description: node.title, position: "top-center" });
  };

  const handleBuyNow = async () => {
    if (!variant) return;
    setBuyLoading(true);
    try {
      const checkoutUrl = await createDirectCheckout(variant.id);
      if (checkoutUrl) {
        window.open(checkoutUrl, "_blank");
        onOpenChange(false);
      }
    } catch (err) {
      console.error("Direct checkout failed:", err);
      toast.error("Erro ao iniciar compra. Tente novamente.");
    } finally {
      setBuyLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0" style={{ backgroundColor: "#14142B" }}>
        {/* Image frame */}
        <div className="p-3 pb-0">
          <div
            className="relative flex items-center justify-center overflow-hidden rounded-xl"
            style={{
              height: "clamp(220px, 50vw, 360px)",
              backgroundColor: "#2A2A4A",
              boxShadow: "inset 0 0 32px rgba(255,255,255,0.05), inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            {images[0]?.node ? (
              <img src={images[0].node.url} alt={images[0].node.altText || node.title} className="w-full h-full object-contain" />
            ) : (
              <ImageIcon className="w-16 h-16 text-muted-foreground/40" />
            )}
          </div>
        </div>

        <div className="p-5 pt-3 space-y-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-black leading-tight">{node.title}</DialogTitle>
          </DialogHeader>

          <RatingStars rating={rating} count={count} size="md" />

          <p className="font-black text-sky-300" style={{ fontSize: "clamp(22px, 5vw, 28px)" }}>
            {formatBRL(price)}
          </p>

          {isSoldOut ? (
            <div className="flex items-center gap-2 text-destructive font-bold text-sm">
              <PackageX className="w-4 h-4" /> Produto esgotado
            </div>
          ) : lowStock ? (
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Package className="w-4 h-4" /> Restam apenas {stock} {stock === 1 ? "unidade" : "unidades"}
            </div>
          ) : typeof stock === "number" && stock > 0 ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Package className="w-4 h-4" /> {stock} unidades em estoque
            </div>
          ) : null}

          {node.description && (
            <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {node.description}
            </div>
          )}

          {/* Mini trust strip */}
          <div
            className="rounded-xl border px-3 py-2.5 grid grid-cols-3 gap-2"
            style={{ backgroundColor: "#1B1B38", borderColor: "#34345C" }}
          >
            {[
              { icon: Lock, label: "Compra segura" },
              { icon: RotateCcw, label: "Troca em 7 dias" },
              { icon: Truck, label: "Frete Brasil" },
            ].map((it) => (
              <div key={it.label} className="flex flex-col items-center gap-1 text-center">
                <it.icon className="w-4 h-4 text-amber-400" />
                <span className="text-[10.5px] font-semibold leading-tight">{it.label}</span>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">O que dizem</p>
            {PLACEHOLDER_REVIEWS.map((r, i) => (
              <div key={i} className="rounded-lg border px-3 py-2.5" style={{ backgroundColor: "#1B1B38", borderColor: "#2E2E52" }}>
                <p className="text-amber-400 text-xs mb-1">{"★".repeat(r.stars)}</p>
                <p className="text-sm leading-snug">{r.text}</p>
                <p className="text-xs text-muted-foreground mt-1">— {r.author}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleBuyNow}
              disabled={buyLoading || isSoldOut}
              className="w-full rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-white font-bold transition-all shadow-[0_4px_14px_-4px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 py-3.5 text-base"
            >
              {buyLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isSoldOut ? (
                <><PackageX className="w-5 h-5" /> Esgotado</>
              ) : (
                <><ShieldCheck className="w-5 h-5" /> Finalizar compra com segurança</>
              )}
            </button>
            <SecureCheckoutNote size="md" />

            <button
              onClick={handleAddToCart}
              disabled={cartLoading || isSoldOut}
              className="w-full rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed text-foreground font-semibold transition-colors flex items-center justify-center gap-2 py-2.5 text-sm hover:bg-muted/30"
              style={{ borderColor: "#34345C", backgroundColor: "rgba(42,42,74,0.4)" }}
            >
              <ShoppingCart className="w-4 h-4" />
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
