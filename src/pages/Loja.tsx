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

/* ─── Product Card — fluid sizing with clamp() ─── */
const ProductCard = ({ product }: { product: Product }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="group relative rounded-2xl border border-border/30 bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/20"
  >
    {product.discount > 0 && (
      <span className="absolute top-2 right-2 z-10 bg-destructive text-destructive-foreground font-bold px-2 py-0.5 rounded-full"
        style={{ fontSize: "clamp(10px, 2.8vw, 14px)" }}
      >
        {product.discount}% OFF
      </span>
    )}

    <div
      className="relative bg-muted/30 flex items-center justify-center"
      style={{ height: "clamp(130px, 34vw, 220px)", fontSize: "clamp(44px, 12vw, 80px)" }}
    >
      {product.image}
      {product.badge && (
        <span
          className={`absolute bottom-0 left-0 right-0 text-center font-bold text-white py-1 ${badgeColor(product.badge)}`}
          style={{ fontSize: "clamp(10px, 2.5vw, 13px)" }}
        >
          {product.badge}
        </span>
      )}
    </div>

    <div className="p-3 space-y-1.5">
      <p
        className="text-muted-foreground uppercase tracking-wider truncate"
        style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}
      >
        {product.author}
      </p>
      <h4
        className="font-bold leading-tight line-clamp-2"
        style={{ fontSize: "clamp(12px, 3.2vw, 16px)", minHeight: "clamp(32px, 7vw, 42px)" }}
      >
        {product.title}
      </h4>

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

      <div className="space-y-0.5">
        <p className="text-muted-foreground line-through" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
          De: {formatBRL(product.originalPrice)}
        </p>
        <p className="font-black text-primary" style={{ fontSize: "clamp(16px, 4.2vw, 22px)" }}>
          <span className="font-normal text-muted-foreground" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
            Por:{" "}
          </span>
          {formatBRL(product.price)}
        </p>
        <p className="text-muted-foreground" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
          ou {formatBRL(product.pixPrice)} no pix
        </p>
      </div>

      <button
        className="w-full mt-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition-colors"
        style={{ padding: "clamp(8px, 2.5vw, 12px) 0", fontSize: "clamp(12px, 3.2vw, 16px)" }}
      >
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
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden pb-24">
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
              <h1 className="font-bold" style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>
                Loja Devocionalzeiros
              </h1>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              style={{ width: "clamp(16px, 4vw, 20px)", height: "clamp(16px, 4vw, 20px)" }}
            />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-muted/30 border border-border/30 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              style={{
                paddingLeft: "clamp(36px, 9vw, 44px)",
                paddingRight: "16px",
                paddingTop: "clamp(8px, 2.5vw, 12px)",
                paddingBottom: "clamp(8px, 2.5vw, 12px)",
                fontSize: "clamp(13px, 3.5vw, 16px)",
              }}
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
                className={`flex flex-col items-center gap-1.5 rounded-xl transition-all text-center ${
                  active
                    ? "bg-primary/10 border border-primary/30"
                    : "border border-transparent hover:bg-muted/20"
                }`}
                style={{
                  minWidth: "clamp(64px, 18vw, 90px)",
                  padding: "clamp(8px, 2vw, 12px) clamp(10px, 3vw, 16px)",
                }}
              >
                <div
                  className={`rounded-full flex items-center justify-center transition-colors ${
                    active ? "bg-primary/20" : "bg-muted/20"
                  }`}
                  style={{
                    width: "clamp(40px, 11vw, 56px)",
                    height: "clamp(40px, 11vw, 56px)",
                  }}
                >
                  <cat.icon
                    style={{
                      color: cat.color,
                      width: "clamp(20px, 5.5vw, 28px)",
                      height: "clamp(20px, 5.5vw, 28px)",
                    }}
                  />
                </div>
                <span className="font-bold whitespace-nowrap" style={{ fontSize: "clamp(10px, 2.5vw, 13px)" }}>
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
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent"
          style={{ padding: "clamp(16px, 4vw, 28px)" }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Tag style={{ width: "clamp(14px, 3.5vw, 18px)", height: "clamp(14px, 3.5vw, 18px)" }} className="text-primary-foreground" />
              <span className="font-bold uppercase tracking-widest text-primary-foreground/80" style={{ fontSize: "clamp(9px, 2.3vw, 12px)" }}>
                Só essa semana
              </span>
            </div>
            <h2 className="font-black text-primary-foreground leading-tight" style={{ fontSize: "clamp(20px, 5.5vw, 32px)" }}>
              Até 62% OFF
            </h2>
            <p className="text-primary-foreground/70 mt-1" style={{ fontSize: "clamp(11px, 2.8vw, 14px)" }}>
              Bíblias, devocionais e presentes cristãos
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12" style={{ fontSize: "clamp(60px, 18vw, 100px)" }}>
            📚
          </div>
        </motion.div>

        {/* ── Deals Row ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold flex items-center gap-2" style={{ fontSize: "clamp(13px, 3.5vw, 16px)" }}>
              🔥 Ofertas da Semana
            </h3>
            <button className="text-primary font-bold flex items-center gap-0.5" style={{ fontSize: "clamp(10px, 2.5vw, 13px)" }}>
              Ver tudo <ChevronRight style={{ width: "clamp(12px, 3vw, 16px)", height: "clamp(12px, 3vw, 16px)" }} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 no-scrollbar">
            {DEALS.map((p) => (
              <div key={p.id} style={{ minWidth: "clamp(160px, 42vw, 220px)", maxWidth: "clamp(180px, 46vw, 240px)" }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>

        {/* ── All Products Grid ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold" style={{ fontSize: "clamp(13px, 3.5vw, 16px)" }}>
              {activeCategory ? activeCategory : "Todos os Produtos"}
            </h3>
            <span className="text-muted-foreground" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
              {searchFiltered.length} produto
              {searchFiltered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {searchFiltered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground" style={{ fontSize: "clamp(13px, 3.5vw, 16px)" }}>
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
              className="flex flex-col items-center gap-1.5 rounded-xl bg-muted/10 border border-border/20 text-center"
              style={{ padding: "clamp(10px, 3vw, 16px)" }}
            >
              <item.icon
                className="text-primary"
                style={{ width: "clamp(20px, 5.5vw, 28px)", height: "clamp(20px, 5.5vw, 28px)" }}
              />
              <span className="font-bold" style={{ fontSize: "clamp(10px, 2.5vw, 13px)" }}>
                {item.label}
              </span>
            </div>
          ))}
        </section>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Loja;
