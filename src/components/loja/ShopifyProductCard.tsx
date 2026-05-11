import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ExternalLink, Loader2, Image as ImageIcon, PackageX, Package } from "lucide-react";
import { type ShopifyProduct, createDirectCheckout } from "@/lib/shopifyApi";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

interface Props {
  product: ShopifyProduct;
  onClick?: () => void;
}

export const ShopifyProductCard = ({ product, onClick }: Props) => {
  const addItem = useCartStore((state) => state.addItem);
  const cartLoading = useCartStore((state) => state.isLoading);
  const [buyLoading, setBuyLoading] = useState(false);

  const { node } = product;
  const mainImage = node.images?.edges?.[0]?.node;
  const variant = node.variants?.edges?.[0]?.node;
  const price = variant ? parseFloat(variant.price.amount) : parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAtPrice = variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null;
  const isPreLaunch = node.tags?.includes("pre-lancamento");
  const discount = compareAtPrice && compareAtPrice > price ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : null;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho!", {
      description: node.title,
      position: "top-center",
    });
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!variant) return;
    setBuyLoading(true);
    try {
      const checkoutUrl = await createDirectCheckout(variant.id);
      if (checkoutUrl) {
        window.open(checkoutUrl, "_blank");
      }
    } catch (err) {
      console.error("Direct checkout failed:", err);
      toast.error("Erro ao iniciar compra. Tente novamente.");
    } finally {
      setBuyLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden transition-all hover:shadow-lg cursor-pointer ${
        isPreLaunch
          ? "border-2 border-amber-400/60 shadow-[0_0_16px_-4px_rgba(245,158,11,0.3)]"
          : "border border-border/30"
      } bg-card`}
    >
      {/* Pre-launch header badge */}
      {isPreLaunch && (
        <div className="bg-amber-400 text-amber-950 text-center font-black uppercase tracking-widest" style={{ fontSize: "clamp(8px, 2.2vw, 11px)", padding: "clamp(3px, 0.8vw, 5px) 0" }}>
          🔥 Pré-Lançamento
        </div>
      )}

      <div
        className="relative bg-muted/30 flex items-center justify-center overflow-hidden"
        style={{ height: "clamp(130px, 34vw, 220px)" }}
      >
        {mainImage ? (
          <img src={mainImage.url} alt={mainImage.altText || node.title} className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="w-12 h-12 text-muted-foreground/40" />
        )}
        {/* Discount badge */}
        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white font-black rounded-full px-2 py-0.5" style={{ fontSize: "clamp(9px, 2.3vw, 12px)" }}>
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-3 space-y-1.5">
        <h4
          className="font-bold leading-tight line-clamp-2"
          style={{ fontSize: "clamp(12px, 3.2vw, 16px)", minHeight: "clamp(32px, 7vw, 42px)" }}
        >
          {node.title}
        </h4>

        {node.description && (
          <p className="text-muted-foreground line-clamp-2" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
            {node.description}
          </p>
        )}

        {/* Price with compare-at */}
        <div className="flex items-center gap-2 flex-wrap">
          {compareAtPrice && compareAtPrice > price && (
            <span className="line-through text-muted-foreground font-semibold" style={{ fontSize: "clamp(12px, 3vw, 15px)" }}>
              {formatBRL(compareAtPrice)}
            </span>
          )}
          <p className={`font-black ${isPreLaunch ? "text-amber-500" : "text-primary"}`} style={{ fontSize: "clamp(16px, 4.2vw, 22px)" }}>
            {formatBRL(price)}
          </p>
        </div>

        <button
          onClick={handleBuyNow}
          disabled={buyLoading || !variant?.availableForSale}
          className="w-full rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold transition-colors flex items-center justify-center gap-1.5"
          style={{ padding: "clamp(8px, 2.5vw, 12px) 0", fontSize: "clamp(12px, 3.2vw, 16px)" }}
        >
          {buyLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <ExternalLink style={{ width: "clamp(12px, 3vw, 16px)", height: "clamp(12px, 3vw, 16px)" }} />
              {variant?.availableForSale ? "Comprar" : "Indisponível"}
            </>
          )}
        </button>

        <button
          onClick={handleAddToCart}
          disabled={cartLoading || !variant?.availableForSale}
          className="w-full rounded-lg border border-border/40 bg-muted/20 hover:bg-muted/40 disabled:opacity-50 text-foreground font-semibold transition-colors flex items-center justify-center gap-1.5"
          style={{ padding: "clamp(5px, 1.8vw, 8px) 0", fontSize: "clamp(10px, 2.5vw, 13px)" }}
        >
          <ShoppingCart style={{ width: "clamp(10px, 2.5vw, 14px)", height: "clamp(10px, 2.5vw, 14px)" }} />
          Adicionar ao Carrinho
        </button>
      </div>
    </motion.div>
  );
};
