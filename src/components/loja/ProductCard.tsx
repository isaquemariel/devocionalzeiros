import { motion } from "framer-motion";
import { Star, ShieldCheck, Pencil, Trash2, Image as ImageIcon, PackageX, Package } from "lucide-react";
import { RatingStars, getPlaceholderRating } from "./RatingStars";
import { SecureCheckoutNote } from "./SecureCheckoutNote";

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

const badgeColor = (badge?: string | null) => {
  switch (badge) {
    case "Lançamento": return "bg-purple-600";
    case "Mais Vendido": return "bg-green-600";
    case "Kit": return "bg-amber-600";
    case "Promoção": return "bg-red-600";
    case "E-book": return "bg-gradient-to-r from-indigo-600 to-fuchsia-600";
    default: return "bg-primary";
  }
};

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
  const lowStock = typeof product.stock_quantity === "number" && product.stock_quantity > 0 && product.stock_quantity <= 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`group relative rounded-2xl border border-border/30 bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/20 ${onClick ? "cursor-pointer" : ""}`}
    >
      {/* Featured star - visible to all, clickable only for admin */}
      <button
        onClick={(e) => { e.stopPropagation(); if (isAdmin && onToggleFeatured) onToggleFeatured(); }}
        className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-colors ${
          product.is_featured
            ? "text-amber-400"
            : isAdmin ? "text-muted-foreground/40 hover:text-amber-400" : "hidden"
        } ${isAdmin ? "cursor-pointer" : "cursor-default"}`}
        disabled={!isAdmin}
        title={isAdmin ? (product.is_featured ? "Remover destaque" : "Destacar produto") : ""}
      >
        <Star className={`${product.is_featured ? "fill-amber-400" : ""}`} style={{ width: "clamp(16px, 4vw, 22px)", height: "clamp(16px, 4vw, 22px)" }} />
      </button>

      {product.discount > 0 && (
        <span
          className="absolute top-2 left-2 z-10 bg-destructive text-destructive-foreground font-bold px-2 py-0.5 rounded-full"
          style={{ fontSize: "clamp(10px, 2.8vw, 14px)" }}
        >
          {product.discount}% OFF
        </span>
      )}

      {isAdmin && (
        <div className="absolute bottom-2 left-2 z-10 flex gap-1">
          <button onClick={onEdit} className="p-1.5 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary transition-colors">
            <Pencil className="w-3 h-3" />
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-full bg-destructive/90 text-destructive-foreground hover:bg-destructive transition-colors">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}

      <div
        className="relative bg-muted/30 flex items-center justify-center overflow-hidden"
        style={{ height: "clamp(130px, 34vw, 220px)" }}
      >
        {mainImage ? (
          <img src={mainImage} alt={product.title} className={`w-full h-full object-cover ${isSoldOut ? "grayscale opacity-60" : ""}`} />
        ) : (
          <ImageIcon className="w-12 h-12 text-muted-foreground/40" />
        )}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
            <span className="bg-destructive text-destructive-foreground font-black uppercase tracking-wider px-3 py-1.5 rounded-md flex items-center gap-1.5" style={{ fontSize: "clamp(11px, 3vw, 14px)" }}>
              <PackageX className="w-4 h-4" /> Esgotado
            </span>
          </div>
        )}
        {product.badge && !isSoldOut && (
          <span
            className={`absolute bottom-0 left-0 right-0 text-center font-bold text-white py-1 ${badgeColor(product.badge)}`}
            style={{ fontSize: "clamp(10px, 2.5vw, 13px)" }}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-3 space-y-1.5">
        {lowStock && (
          <p className="text-amber-500 font-semibold flex items-center gap-1" style={{ fontSize: "clamp(10px, 2.6vw, 12px)" }}>
            <Package className="w-3 h-3" /> Restam apenas {product.stock_quantity} unidades
          </p>
        )}
        {product.author && (
          <p className="text-muted-foreground uppercase tracking-wider truncate" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
            {product.author}
          </p>
        )}
        <h4
          className="font-bold leading-tight line-clamp-2"
          style={{ fontSize: "clamp(12px, 3.2vw, 16px)", minHeight: "clamp(32px, 7vw, 42px)" }}
        >
          {product.title}
        </h4>

        {product.description && (
          <p className="text-muted-foreground line-clamp-2" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
            {product.description}
          </p>
        )}

        {product.rating > 0 && (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-muted/40"}`}
                style={{ width: "clamp(14px, 3.5vw, 18px)", height: "clamp(14px, 3.5vw, 18px)" }}
              />
            ))}
            <span className="text-muted-foreground ml-1" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
              {product.rating}
            </span>
          </div>
        )}

        <div className="space-y-0.5">
          {product.original_price > product.price && (
            <p className="text-muted-foreground line-through" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
              De: {formatBRL(product.original_price)}
            </p>
          )}
          <p className="font-black text-primary" style={{ fontSize: "clamp(16px, 4.2vw, 22px)" }}>
            <span className="font-normal text-muted-foreground" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
              Por:{" "}
            </span>
            {formatBRL(product.price)}
          </p>
          {product.pix_price > 0 && product.pix_price < product.price && (
            <p className="text-muted-foreground" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
              ou {formatBRL(product.pix_price)} no pix
            </p>
          )}
        </div>

        {isSoldOut ? (
          <button
            disabled
            className="w-full mt-2 rounded-lg bg-muted text-muted-foreground font-bold flex items-center justify-center gap-1.5 cursor-not-allowed"
            style={{ padding: "clamp(8px, 2.5vw, 12px) 0", fontSize: "clamp(12px, 3.2vw, 16px)" }}
          >
            <PackageX style={{ width: "clamp(12px, 3vw, 16px)", height: "clamp(12px, 3vw, 16px)" }} /> Esgotado
          </button>
        ) : (
          <div className="mt-2">
            <a
              href={product.buy_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition-all shadow-[0_4px_14px_-4px_rgba(16,185,129,0.5)] flex items-center justify-center gap-1.5"
              style={{ padding: "clamp(9px, 2.7vw, 13px) 0", fontSize: "clamp(12px, 3vw, 14px)" }}
              onClick={(e) => { if (!product.buy_link) e.preventDefault(); }}
            >
              <ShieldCheck style={{ width: "clamp(13px, 3.2vw, 16px)", height: "clamp(13px, 3.2vw, 16px)" }} />
              Finalizar com segurança
            </a>
            <SecureCheckoutNote />
          </div>
        )}
      </div>
    </motion.div>
  );
};
