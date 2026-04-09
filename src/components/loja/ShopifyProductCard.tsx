import { motion } from "framer-motion";
import { Star, ShoppingCart, Loader2, Image as ImageIcon } from "lucide-react";
import { type ShopifyProduct } from "@/lib/shopifyApi";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

interface Props {
  product: ShopifyProduct;
}

export const ShopifyProductCard = ({ product }: Props) => {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const { node } = product;
  const mainImage = node.images?.edges?.[0]?.node;
  const variant = node.variants?.edges?.[0]?.node;
  const price = variant ? parseFloat(variant.price.amount) : parseFloat(node.priceRange.minVariantPrice.amount);

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
    toast.success("Adicionado ao carrinho!", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative rounded-2xl border border-border/30 bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/20"
    >
      <div
        className="relative bg-muted/30 flex items-center justify-center overflow-hidden"
        style={{ height: "clamp(130px, 34vw, 220px)" }}
      >
        {mainImage ? (
          <img src={mainImage.url} alt={mainImage.altText || node.title} className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="w-12 h-12 text-muted-foreground/40" />
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

        <p className="font-black text-primary" style={{ fontSize: "clamp(16px, 4.2vw, 22px)" }}>
          {formatBRL(price)}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={isLoading || !variant?.availableForSale}
          className="w-full mt-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold transition-colors flex items-center justify-center gap-1.5"
          style={{ padding: "clamp(8px, 2.5vw, 12px) 0", fontSize: "clamp(12px, 3.2vw, 16px)" }}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <ShoppingCart style={{ width: "clamp(12px, 3vw, 16px)", height: "clamp(12px, 3vw, 16px)" }} />
              {variant?.availableForSale ? "Adicionar" : "Indisponível"}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
