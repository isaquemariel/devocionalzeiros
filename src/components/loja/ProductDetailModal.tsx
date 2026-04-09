import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShoppingCart, ExternalLink, Loader2, Image as ImageIcon } from "lucide-react";
import { type ShopifyProduct } from "@/lib/shopifyApi";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

interface Props {
  product: ShopifyProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDetailModal = ({ product, open, onOpenChange }: Props) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  if (!product) return null;

  const { node } = product;
  const images = node.images?.edges || [];
  const variant = node.variants?.edges?.[0]?.node;
  const price = variant ? parseFloat(variant.price.amount) : parseFloat(node.priceRange.minVariantPrice.amount);
  const comparePrice = variant?.price ? null : null; // Shopify compare_at not in storefront by default

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

  const handleBuyNow = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        {/* Image */}
        <div className="relative bg-muted/30 flex items-center justify-center overflow-hidden rounded-t-lg" style={{ height: "clamp(220px, 50vw, 360px)" }}>
          {images[0]?.node ? (
            <img src={images[0].node.url} alt={images[0].node.altText || node.title} className="w-full h-full object-contain" />
          ) : (
            <ImageIcon className="w-16 h-16 text-muted-foreground/40" />
          )}
        </div>

        <div className="p-5 space-y-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-black leading-tight">{node.title}</DialogTitle>
          </DialogHeader>

          {/* Price */}
          <p className="font-black text-primary" style={{ fontSize: "clamp(22px, 5vw, 28px)" }}>
            {formatBRL(price)}
          </p>

          {/* Description */}
          {node.description && (
            <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {node.description}
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleBuyNow}
              disabled={isLoading || !variant?.availableForSale}
              className="w-full rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold transition-colors flex items-center justify-center gap-2 py-3 text-base"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <ExternalLink className="w-5 h-5" />
                  {variant?.availableForSale ? "Comprar Agora" : "Indisponível"}
                </>
              )}
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isLoading || !variant?.availableForSale}
              className="w-full rounded-lg border border-border bg-muted/20 hover:bg-muted/40 disabled:opacity-50 text-foreground font-semibold transition-colors flex items-center justify-center gap-2 py-2.5 text-sm"
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
