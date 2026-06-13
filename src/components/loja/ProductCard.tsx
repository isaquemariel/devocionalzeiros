import { motion } from "framer-motion";
import { Star, ShieldCheck, Pencil, Trash2, Image as ImageIcon, PackageX, Flame, Lock } from "lucide-react";
import { RatingStars, getPlaceholderRating } from "./RatingStars";

interface Product {
  id: string;
  title: string;
  description?: string | null;
  author?: string | null;
  price: number;
  original_price: number;
  pix_price: number;
  discount: number;
  buy_link: string;
  badge?: string | null;
  category: string;
  is_featured: boolean;
  image_urls: string[];
  rating: number;
  stock_quantity?: number | null;
}

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

interface Props {
  product: Product;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleFeatured?: () => void;
  onClick?: () => void;
}

export const ProductCard = ({ product, isAdmin, onEdit, onDelete, onToggleFeatured, onClick }: Props) => {
  const mainImage = product.image_urls?.[0];
  const isSoldOut = product.stock_quantity === 0;
  const lowStock = typeof product.stock_quantity === "number" && product.stock_quantity > 0 && product.stock_quantity < 20;

  const rating = product.rating && product.rating > 0
    ? { rating: product.rating, count: 0 }
    : getPlaceholderRating(product.id);

  const installments = 12;
  const installmentValue = product.price / installments;


  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group relative rounded-2xl overflow-hidden flex flex-col ${onClick ? "cursor-pointer" : ""}`}
      style={{
        backgroundColor: "var(--loja-card)",
        border: "1px solid var(--loja-border)",
        boxShadow: "0 6px 20px -8px rgba(0,0,0,0.55)",
      }}
    >
      {isAdmin && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFeatured?.(); }}
            className={`absolute top-2 right-2 z-10 p-1.5 rounded-full ${product.is_featured ? "text-amber-400" : "text-white/40 hover:text-amber-400"}`}
            title={product.is_featured ? "Remover destaque" : "Destacar produto"}
          >
            <Star className={`w-5 h-5 ${product.is_featured ? "fill-amber-400" : ""}`} />
          </button>
          <div className="absolute bottom-2 left-2 z-10 flex gap-1">
            <button onClick={(e) => { e.stopPropagation(); onEdit?.(); }} className="p-1.5 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary">
              <Pencil className="w-3 h-3" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDelete?.(); }} className="p-1.5 rounded-full bg-destructive/90 text-destructive-foreground hover:bg-destructive">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </>
      )}

      {/* Image frame */}
      <div className="p-2.5 pb-0">
        <div
          className="relative rounded-xl overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: "var(--loja-offwhite)", aspectRatio: "3 / 4" }}
        >
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.title}
              className={`w-full h-full object-contain p-3 transition-transform group-hover:scale-[1.03] ${isSoldOut ? "grayscale opacity-60" : ""}`}
              loading="lazy"
            />
          ) : (
            <ImageIcon className="w-12 h-12 text-black/20" />
          )}

          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {product.discount > 0 && (
              <span
                className="font-black uppercase tracking-wider rounded-md px-2 py-1 text-white shadow"
                style={{ backgroundColor: "#DC2626", fontSize: "clamp(9px, 2.2vw, 10px)" }}
              >
                -{product.discount}% OFF
              </span>
            )}
            {product.badge && (
              <span
                className="font-black uppercase tracking-wider rounded-md px-2 py-1 text-white shadow"
                style={{ backgroundColor: "var(--loja-purple)", fontSize: "clamp(9px, 2.2vw, 10px)" }}
              >
                {product.badge}
              </span>
            )}
            {lowStock && !isSoldOut && (
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
        {product.author && (
          <p className="uppercase tracking-wider truncate" style={{ color: "var(--loja-text-soft)", fontSize: "clamp(9px, 2.3vw, 11px)" }}>
            {product.author}
          </p>
        )}
        <h4
          className="font-bold leading-tight line-clamp-2"
          style={{ fontSize: "clamp(12px, 3.2vw, 15px)", color: "var(--loja-text)", minHeight: "2.6em" }}
        >
          {product.title}
        </h4>

        <RatingStars rating={rating.rating} count={rating.count} />

        {lowStock && !isSoldOut && (
          <p className="font-bold flex items-center gap-1" style={{ color: "var(--loja-amber)", fontSize: "clamp(10px, 2.6vw, 11px)" }}>
            <Flame className="w-3 h-3" /> Últimas unidades! Restam {product.stock_quantity}
          </p>
        )}

        <div className="space-y-0.5 mt-auto">
          {product.original_price > product.price && (
            <p className="line-through font-semibold" style={{ color: "var(--loja-text-soft)", fontSize: "clamp(10px, 2.6vw, 12px)" }}>
              {formatBRL(product.original_price)}
            </p>
          )}
          <p className="font-black tracking-tight" style={{ color: "var(--loja-text)", fontSize: "clamp(18px, 4.6vw, 22px)", lineHeight: 1.1 }}>
            {formatBRL(product.price)}
          </p>
          <p style={{ color: "var(--loja-text-soft)", fontSize: "clamp(10px, 2.5vw, 11px)" }}>
            ou {installments}x de <span className="font-bold">{formatBRL(installmentValue)}</span> sem juros
          </p>
          <p className="font-bold flex items-center gap-1" style={{ color: "#22C55E", fontSize: "clamp(10px, 2.6vw, 12px)" }}>
            <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: "#22C55E" }} />
            {formatBRL(pixPrice)} no Pix
          </p>
        </div>

        {isSoldOut ? (
          <button
            disabled
            className="w-full mt-1 rounded-xl bg-white/10 text-white/50 font-bold flex items-center justify-center gap-1.5 cursor-not-allowed py-2.5 text-xs"
          >
            <PackageX className="w-4 h-4" /> Esgotado
          </button>
        ) : (
          <div className="pt-1 space-y-1.5">
            <a
              href={product.buy_link || "#"}
              target={product.buy_link ? "_blank" : undefined}
              rel="noopener noreferrer"
              onClick={(e) => { if (!product.buy_link) e.preventDefault(); }}
              className="w-full rounded-xl font-black flex items-center justify-center gap-1.5 transition-all hover:brightness-110"
              style={{
                backgroundColor: "var(--loja-amber)",
                color: "var(--loja-amber-ink)",
                padding: "12px 0",
                fontSize: "clamp(12px, 3.1vw, 14px)",
                minHeight: 44,
                boxShadow: "0 6px 16px -6px rgba(245,166,35,0.55)",
              }}
            >
              <ShieldCheck className="w-4 h-4" />
              Comprar agora
            </a>
            <p className="flex items-center justify-center gap-1 text-[10px]" style={{ color: "var(--loja-text-soft)" }}>
              <Lock className="w-2.5 h-2.5" /> Pagamento em ambiente seguro
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
