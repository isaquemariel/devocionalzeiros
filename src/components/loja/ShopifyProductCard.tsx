import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ShieldCheck, Loader2, Image as ImageIcon, PackageX, Package, BellRing } from "lucide-react";
import { type ShopifyProduct, createDirectCheckout } from "@/lib/shopifyApi";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { RatingStars, getPlaceholderRating } from "./RatingStars";
import { SecureCheckoutNote } from "./SecureCheckoutNote";

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
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");

  const { node } = product;
  const mainImage = node.images?.edges?.[0]?.node;
  const variant = node.variants?.edges?.[0]?.node;
  const price = variant ? parseFloat(variant.price.amount) : parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAtPrice = variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null;
  const isPreLaunch = node.tags?.includes("pre-lancamento");
  const discount = compareAtPrice && compareAtPrice > price ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : null;
  const stock = variant?.quantityAvailable ?? node.totalInventory ?? null;
  const isSoldOut = !variant?.availableForSale || (typeof stock === "number" && stock <= 0);
  const lowStock = typeof stock === "number" && stock > 0 && stock <= 10;
  const { rating, count } = getPlaceholderRating(node.id);

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
    toast.success("Adicionado ao carrinho!", { description: node.title, position: "top-center" });
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!variant) return;
    setBuyLoading(true);
    try {
      const checkoutUrl = await createDirectCheckout(variant.id);
      if (checkoutUrl) window.open(checkoutUrl, "_blank");
    } catch (err) {
      console.error("Direct checkout failed:", err);
      toast.error("Erro ao iniciar compra. Tente novamente.");
    } finally {
      setBuyLoading(false);
    }
  };

  const handleNotify = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!notifyEmail || !notifyEmail.includes("@")) {
      toast.error("Informe um e-mail válido");
      return;
    }
    toast.success("Beleza! Te avisamos quando voltar 💙");
    setNotifyEmail("");
    setNotifyOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden transition-all cursor-pointer ${
        isPreLaunch ? "shadow-[0_0_16px_-4px_rgba(245,158,11,0.35)]" : "shadow-[0_4px_14px_-4px_rgba(0,0,0,0.5)]"
      } hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)]`}
      style={{
        backgroundColor: "#20203D",
        border: isPreLaunch ? "2px solid rgba(245,158,11,0.6)" : "1px solid #34345C",
      }}
    >
      {isPreLaunch && (
        <div className="bg-amber-400 text-amber-950 text-center font-black uppercase tracking-widest" style={{ fontSize: "clamp(8px, 2.2vw, 11px)", padding: "clamp(3px, 0.8vw, 5px) 0" }}>
          🔥 Pré-Lançamento
        </div>
      )}

      {/* Image frame — lighter so dark products stand out */}
      <div className="p-2">
        <div
          className="relative flex items-center justify-center overflow-hidden rounded-xl"
          style={{
            height: "clamp(140px, 36vw, 220px)",
            backgroundColor: "#2A2A4A",
            boxShadow: "inset 0 0 24px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {mainImage ? (
            <img src={mainImage.url} alt={mainImage.altText || node.title} className={`w-full h-full object-cover ${isSoldOut ? "grayscale opacity-60" : ""}`} />
          ) : (
            <ImageIcon className="w-12 h-12 text-muted-foreground/40" />
          )}
          {discount && !isSoldOut && (
            <span className="absolute top-2 left-2 bg-red-500 text-white font-black rounded-full px-2 py-0.5" style={{ fontSize: "clamp(9px, 2.3vw, 12px)" }}>
              -{discount}%
            </span>
          )}
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-[1px]">
              <span className="bg-muted text-foreground font-black uppercase tracking-wider px-3 py-1.5 rounded-md flex items-center gap-1.5" style={{ fontSize: "clamp(11px, 3vw, 13px)" }}>
                <PackageX className="w-4 h-4" /> Esgotado
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 pt-1 space-y-1.5">
        <h4 className="font-bold leading-tight line-clamp-2" style={{ fontSize: "clamp(12px, 3.2vw, 16px)", minHeight: "clamp(32px, 7vw, 42px)" }}>
          {node.title}
        </h4>

        <RatingStars rating={rating} count={count} />

        <div className="flex items-center gap-2 flex-wrap">
          {compareAtPrice && compareAtPrice > price && (
            <span className="line-through text-muted-foreground font-semibold" style={{ fontSize: "clamp(11px, 2.8vw, 14px)" }}>
              {formatBRL(compareAtPrice)}
            </span>
          )}
          <p className={`font-black ${isPreLaunch ? "text-amber-400" : "text-sky-300"}`} style={{ fontSize: "clamp(17px, 4.4vw, 23px)" }}>
            {formatBRL(price)}
          </p>
        </div>

        {lowStock && !isSoldOut && (
          <p className="text-amber-400 font-semibold flex items-center gap-1" style={{ fontSize: "clamp(10px, 2.6vw, 12px)" }}>
            <Package className="w-3 h-3" /> Restam {stock} {stock === 1 ? "unidade" : "unidades"}
          </p>
        )}

        {isSoldOut ? (
          <div onClick={(e) => e.stopPropagation()}>
            {!notifyOpen ? (
              <button
                onClick={(e) => { e.stopPropagation(); setNotifyOpen(true); }}
                className="w-full rounded-lg border font-bold flex items-center justify-center gap-1.5 hover:bg-muted/30 transition-colors"
                style={{ padding: "clamp(8px, 2.5vw, 11px) 0", fontSize: "clamp(11px, 3vw, 14px)", borderColor: "#34345C", color: "hsl(var(--foreground))" }}
              >
                <BellRing className="w-4 h-4" /> Avise-me quando voltar
              </button>
            ) : (
              <div className="space-y-1.5">
                <input
                  type="email"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full rounded-lg px-2.5 py-2 text-xs border focus:outline-none focus:ring-2 focus:ring-primary/40"
                  style={{ backgroundColor: "#14142B", borderColor: "#34345C" }}
                />
                <button onClick={handleNotify} className="w-full rounded-lg bg-primary text-primary-foreground font-bold text-xs py-2">
                  Quero ser avisado
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={handleBuyNow}
              disabled={buyLoading}
              className="w-full rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-white font-bold transition-all shadow-[0_4px_14px_-4px_rgba(16,185,129,0.5)] hover:shadow-[0_6px_20px_-4px_rgba(16,185,129,0.6)] flex items-center justify-center gap-1.5"
              style={{ padding: "clamp(9px, 2.7vw, 13px) 0", fontSize: "clamp(12px, 3vw, 14px)" }}
            >
              {buyLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck style={{ width: "clamp(13px, 3.2vw, 16px)", height: "clamp(13px, 3.2vw, 16px)" }} />
                  Finalizar com segurança
                </>
              )}
            </button>
            <SecureCheckoutNote />

            <button
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="w-full rounded-lg border font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5 hover:bg-muted/30"
              style={{
                padding: "clamp(5px, 1.8vw, 8px) 0",
                fontSize: "clamp(10px, 2.5vw, 13px)",
                borderColor: "#34345C",
                backgroundColor: "rgba(42,42,74,0.4)",
              }}
            >
              <ShoppingCart style={{ width: "clamp(10px, 2.5vw, 14px)", height: "clamp(10px, 2.5vw, 14px)" }} />
              Adicionar ao Carrinho
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};
