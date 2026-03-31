import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingBag,
  Search,
  BookOpen,
  Heart,
  Gift,
  Gamepad2,
  Star,
  ChevronRight,
  Tag,
  Truck,
  ShieldCheck,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { BottomNavBar } from "@/components/shared/BottomNavBar";

/* ─── Types ─── */
interface Product {
  id: string;
  title: string;
  author: string;
  originalPrice: number;
  price: number;
  pixPrice: number;
  discount: number;
  image: string;
  badge?: string;
  rating: number;
  category: string;
}

/* ─── Fictional data ─── */
const CATEGORIES = [
  { icon: BookOpen, label: "Bíblias", color: "hsl(var(--primary))" },
  { icon: Heart, label: "Devocionais", color: "hsl(215 90% 55%)" },
  { icon: Gift, label: "Presentes", color: "hsl(45 93% 47%)" },
  { icon: Gamepad2, label: "Jogos", color: "hsl(150 60% 45%)" },
  { icon: Star, label: "Destaques", color: "hsl(340 70% 55%)" },
];

const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Bíblia de Estudo NVI | Capa Luxo Marrom",
    author: "Editora Vida",
    originalPrice: 189.9,
    price: 129.9,
    pixPrice: 123.4,
    discount: 32,
    image: "📖",
    badge: "Destaque",
    rating: 4.8,
    category: "Bíblias",
  },
  {
    id: "2",
    title: "Devocional Mananciais no Deserto | Edição Atualizada",
    author: "Editora Betânia",
    originalPrice: 79.9,
    price: 49.9,
    pixPrice: 47.4,
    discount: 38,
    image: "📕",
    badge: "Mais Vendido",
    rating: 4.9,
    category: "Devocionais",
  },
  {
    id: "3",
    title: "Jogo Bíblico de Cartas | Quem Sou Eu",
    author: "Penkal Books",
    originalPrice: 69.9,
    price: 39.9,
    pixPrice: 37.9,
    discount: 43,
    image: "🃏",
    badge: "Lançamento",
    rating: 4.7,
    category: "Jogos",
  },
  {
    id: "4",
    title: "Eu, Minhas Lutas Internas e Deus",
    author: "Editora Penkal Books",
    originalPrice: 59.9,
    price: 22.9,
    pixPrice: 21.76,
    discount: 62,
    image: "📗",
    badge: "Destaque",
    rating: 4.6,
    category: "Devocionais",
  },
  {
    id: "5",
    title: "Bíblia Sagrada NVT | Capa Dura Leão",
    author: "Mundo Cristão",
    originalPrice: 99.9,
    price: 59.9,
    pixPrice: 56.9,
    discount: 40,
    image: "📘",
    rating: 4.9,
    category: "Bíblias",
  },
  {
    id: "6",
    title: "Caneca Cristã | Salmo 23",
    author: "Presentes Cristãos",
    originalPrice: 49.9,
    price: 29.9,
    pixPrice: 28.4,
    discount: 40,
    image: "☕",
    rating: 4.5,
    category: "Presentes",
  },
  {
    id: "7",
    title: "Eu, Minha Ansiedade e Deus | Abner Bueno",
    author: "Editora Penkal Books",
    originalPrice: 59.9,
    price: 26.9,
    pixPrice: 25.56,
    discount: 55,
    image: "📙",
    badge: "Destaque",
    rating: 4.8,
    category: "Devocionais",
  },
  {
    id: "8",
    title: "Kit Devocional Casal | 365 Dias Juntos",
    author: "Editora Fé",
    originalPrice: 129.9,
    price: 79.9,
    pixPrice: 75.9,
    discount: 38,
    image: "💑",
    badge: "Kit",
    rating: 4.7,
    category: "Presentes",
  },
];

const DEALS = PRODUCTS.filter((p) => p.discount >= 40);

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/* ─── Badge color helper ─── */
const badgeColor = (badge?: string) => {
  switch (badge) {
    case "Lançamento":
      return "bg-purple-600";
    case "Mais Vendido":
      return "bg-green-600";
    case "Kit":
      return "bg-amber-600";
    default:
      return "bg-primary";
  }
};

/* ─── Product Card ─── */
const ProductCard = ({ product }: { product: Product }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="group relative rounded-xl border border-border/30 bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/20"
  >
    {/* Discount badge */}
    {product.discount > 0 && (
      <span className="absolute top-2 right-2 z-10 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
        {product.discount}% OFF
      </span>
    )}

    {/* Image area */}
    <div className="relative h-36 sm:h-44 bg-muted/30 flex items-center justify-center text-5xl sm:text-6xl">
      {product.image}
      {product.badge && (
        <span
          className={`absolute bottom-0 left-0 right-0 text-center text-[10px] font-bold text-white py-1 ${badgeColor(product.badge)}`}
        >
          {product.badge}
        </span>
      )}
    </div>

    {/* Info */}
    <div className="p-3 space-y-1.5">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">
        {product.author}
      </p>
      <h4 className="text-xs font-bold leading-tight line-clamp-2 min-h-[2rem]">
        {product.title}
      </h4>

      {/* Rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-muted/40"}`}
          />
        ))}
        <span className="text-[10px] text-muted-foreground ml-1">
          {product.rating}
        </span>
      </div>

      {/* Price */}
      <div className="space-y-0.5">
        <p className="text-[10px] text-muted-foreground line-through">
          De: {formatBRL(product.originalPrice)}
        </p>
        <p className="text-sm font-black text-primary">
          <span className="text-[10px] font-normal text-muted-foreground">
            Por:{" "}
          </span>
          {formatBRL(product.price)}
        </p>
        <p className="text-[10px] text-muted-foreground">
          ou {formatBRL(product.pixPrice)} no pix
        </p>
      </div>

      {/* CTA */}
      <button className="w-full mt-2 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-colors">
        Comprar
      </button>
    </div>
  </motion.div>
);

/* ─── Main Page ─── */
const Loja = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? PRODUCTS.filter((p) => p.category === activeCategory)
    : PRODUCTS;

  const searchFiltered = search
    ? filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.author.toLowerCase().includes(search.toLowerCase())
      )
    : filtered;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pb-24">
      {/* ── Header ── */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/20">
        <div className="max-w-3xl mx-auto px-4 py-3 space-y-3">
          {/* Top row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-lg hover:bg-muted/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 flex-1">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h1 className="text-base font-bold">Loja Devocionalzeiros</h1>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/30 border border-border/30 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 space-y-6 mt-4">
        {/* ── Categories ── */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
          {CATEGORIES.map((cat, i) => {
            const active = activeCategory === cat.label;
            return (
              <motion.button
                key={cat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() =>
                  setActiveCategory(active ? null : cat.label)
                }
                className={`flex flex-col items-center gap-1.5 min-w-[64px] py-2 px-3 rounded-xl transition-all text-center ${
                  active
                    ? "bg-primary/10 border border-primary/30"
                    : "border border-transparent hover:bg-muted/20"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    active ? "bg-primary/20" : "bg-muted/20"
                  }`}
                >
                  <cat.icon
                    className="w-5 h-5"
                    style={{ color: cat.color }}
                  />
                </div>
                <span className="text-[10px] font-bold whitespace-nowrap">
                  {cat.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ── Deals Banner ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent p-4 sm:p-6"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Tag className="w-4 h-4 text-primary-foreground" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/80">
                Só essa semana
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-primary-foreground leading-tight">
              Até 62% OFF
            </h2>
            <p className="text-xs text-primary-foreground/70 mt-1">
              Bíblias, devocionais e presentes cristãos
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 text-7xl opacity-20 rotate-12">
            📚
          </div>
        </motion.div>

        {/* ── Deals Row ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              🔥 Ofertas da Semana
            </h3>
            <button className="text-[10px] text-primary font-bold flex items-center gap-0.5">
              Ver tudo <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 no-scrollbar">
            {DEALS.map((p) => (
              <div key={p.id} className="min-w-[160px] max-w-[180px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>

        {/* ── All Products Grid ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">
              {activeCategory ? activeCategory : "Todos os Produtos"}
            </h3>
            <span className="text-[10px] text-muted-foreground">
              {searchFiltered.length} produto
              {searchFiltered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {searchFiltered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Nenhum produto encontrado
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {searchFiltered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        {/* ── Trust Badges ── */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
          {[
            { icon: Truck, label: "Entrega Garantida" },
            { icon: ShieldCheck, label: "Compra Segura" },
            { icon: CreditCard, label: "Até 10x sem juros" },
            { icon: ExternalLink, label: "Troca Garantida" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/10 border border-border/20 text-center"
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold">{item.label}</span>
            </div>
          ))}
        </section>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Loja;
