import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ShieldCheck, Loader2, Image as ImageIcon, PackageX, Flame, BellRing, Lock } from "lucide-react";
import { type ShopifyProduct, createDirectCheckout } from "@/lib/shopifyApi";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { RatingStars, getPlaceholderRating } from "./RatingStars";

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

interface Props {
  product: ShopifyProduct;
  onClick?: () => void;
}

export const ShopifyProductCard = ({ product, onClick }: Props) => {
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);
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
  const lowStock = typeof stock === "number" && stock > 0 && stock < 20;
  const { rating, count } = getPlaceholderRating(node.id);

  const installments = 12;
  const installmentValue = price / installments;


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
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        backgroundColor: "var(--loja-card)",
        border: `1px solid ${isPreLaunch ? "rgba(124,92,255,0.55)" : "var(--loja-border)"}`,
        boxShadow: "0 6px 20px -8px rgba(0,0,0,0.55)",
      }}
    >
      {/* Image frame — light off-white so dark products pop */}
      <div className="p-2.5 pb-0">
        <div
          className="relative rounded-xl overflow-hidden flex items-center justify-center"
          style={{
            backgroundColor: "var(--loja-offwhite)",
            aspectRatio: "3 / 4",
          }}
        >
          {mainImage ? (
            <img
              src={mainImage.url}
              alt={mainImage.altText || node.title}
              className={`w-full h-full object-contain p-3 transition-transform group-hover:scale-[1.03] ${isSoldOut ? "grayscale opacity-60" : ""}`}
              loading="lazy"
            />
          ) : (
            <ImageIcon className="w-12 h-12 text-black/20" />
          )}

          {/* Badges top-left */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {isPreLaunch && (
              <span
                className="font-black uppercase tracking-wider rounded-md px-2 py-1 text-white shadow"
                style={{ backgroundColor: "var(--loja-purple)", fontSize: "clamp(9px, 2.2vw, 10px)" }}
              >
                Pré-lançamento
              </span>
            )}
            {discount && !isPreLaunch && (
              <span
                className="font-black uppercase tracking-wider rounded-md px-2 py-1 text-white shadow"
                style={{ backgroundColor: "#DC2626", fontSize: "clamp(9px, 2.2vw, 10px)" }}
              >
                -{discount}% OFF
              </span>
            )}
            {lowStock && !isSoldOut && !isPreLaunch && !discount && (
              <span
                className="font-black uppercase tracking-wider rounded-md px-2 py-1 shadow"
                style={{ backgroundColor: "var(--loja-amber)", color: "var(--loja-amber-ink)", fontSize: "clamp(9px, 2.2vw, 10px)" }}
              >
                Últimas unidades
              </span>
            )}
          </div>

          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-[1px]">
              <span className="bg-white text-black font-black uppercase tracking-wider px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs">
                <PackageX className="w-4 h-4" /> Esgotado
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col gap-2">
        <h4
          className="font-bold leading-tight line-clamp-2"
          style={{ fontSize: "clamp(12px, 3.2vw, 15px)", color: "var(--loja-text)", minHeight: "2.6em" }}
        >
          {node.title}
        </h4>

        <RatingStars rating={rating} count={count} />

        {lowStock && !isSoldOut && (
          <p className="font-bold flex items-center gap-1" style={{ color: "var(--loja-amber)", fontSize: "clamp(10px, 2.6vw, 11px)" }}>
            <Flame className="w-3 h-3" /> Últimas unidades! Restam {stock}
          </p>
        )}

        {/* Price block */}
        <div className="space-y-0.5 mt-auto">
          {compareAtPrice && compareAtPrice > price && (
            <p className="line-through font-semibold" style={{ color: "var(--loja-text-soft)", fontSize: "clamp(10px, 2.6vw, 12px)" }}>
              De {formatBRL(compareAtPrice)}
            </p>
          )}
          <p className="font-black tracking-tight flex items-baseline gap-1.5" style={{ color: "var(--loja-text)", fontSize: "clamp(18px, 4.6vw, 22px)", lineHeight: 1.1 }}>
            {formatBRL(price)}
            <span className="font-bold" style={{ color: "#22C55E", fontSize: "clamp(10px, 2.6vw, 12px)" }}>
              à vista no Pix
            </span>
          </p>
          <p style={{ color: "var(--loja-text-soft)", fontSize: "clamp(10px, 2.5vw, 11px)" }}>
            ou até <span className="font-bold">{installments}x de {formatBRL(installmentValue)}</span> no cartão
          </p>
        </div>


        {isSoldOut ? (
          <div onClick={(e) => e.stopPropagation()} className="pt-1">
            {!notifyOpen ? (
              <button
                onClick={() => setNotifyOpen(true)}
                className="w-full rounded-xl border font-bold flex items-center justify-center gap-1.5 py-2.5 hover:bg-white/5 transition-colors text-xs"
                style={{ borderColor: "var(--loja-border)", color: "var(--loja-text)" }}
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
                  className="w-full rounded-lg px-2.5 py-2 text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                  style={{ backgroundColor: "var(--loja-bg)", borderColor: "var(--loja-border)", color: "var(--loja-text)" }}
                />
                <button
                  onClick={handleNotify}
                  className="w-full rounded-lg font-black text-xs py-2"
                  style={{ backgroundColor: "var(--loja-amber)", color: "var(--loja-amber-ink)" }}
                >
                  Quero ser avisado
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="pt-1 space-y-1.5">
            <button
              onClick={handleBuyNow}
              disabled={buyLoading}
              className="w-full rounded-xl font-black flex items-center justify-center gap-1.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110"
              style={{
                backgroundColor: "var(--loja-amber)",
                color: "var(--loja-amber-ink)",
                padding: "12px 0",
                fontSize: "clamp(12px, 3.1vw, 14px)",
                minHeight: 44,
                boxShadow: "0 6px 16px -6px rgba(245,166,35,0.55)",
              }}
            >
              {buyLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Comprar agora
                </>
              )}
            </button>
            <p className="flex items-center justify-center gap-1 text-[10px]" style={{ color: "var(--loja-text-soft)" }}>
              <Lock className="w-2.5 h-2.5" /> Pagamento em ambiente seguro
            </p>

            <button
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="w-full rounded-xl border font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5 hover:bg-white/5 py-2"
              style={{ borderColor: "var(--loja-border)", color: "var(--loja-text)", fontSize: "clamp(10px, 2.6vw, 12px)" }}
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Adicionar ao carrinho
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
