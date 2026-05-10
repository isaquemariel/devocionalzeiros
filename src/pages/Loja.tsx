import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  BookOpen,
  BookMarked,
  Gift,
  Star,
  Tag,
  Truck,
  ShieldCheck,
  CreditCard,
  Plus,
  Loader2,
  ShoppingCart,
  LogIn,
  LogOut,
  User as UserIcon,
  Home as HomeIcon,
} from "lucide-react";
import { AdminProductModal } from "@/components/loja/AdminProductModal";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { fetchShopifyProducts, type ShopifyProduct } from "@/lib/shopifyApi";
import { useCartStore } from "@/store/cartStore";
import { CartDrawer } from "@/components/loja/CartDrawer";
import { ShopifyProductCard } from "@/components/loja/ShopifyProductCard";
import { ProductDetailModal } from "@/components/loja/ProductDetailModal";
import { FloatingWhatsApp } from "@/components/loja/FloatingWhatsApp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* ─── Categories ─── */
const CATEGORIES = [
  { icon: BookOpen, label: "Livros", color: "hsl(var(--primary))" },
  { icon: BookMarked, label: "Bíblias", color: "hsl(215 90% 55%)" },
  { icon: Gift, label: "Presentes", color: "hsl(45 93% 47%)" },
  { icon: Star, label: "Destaques", color: "hsl(340 70% 55%)" },
];

const Loja = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdminCheck();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);

  const loadProducts = useCallback(async (retries = 3) => {
    setLoading(true);
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const products = await fetchShopifyProducts(50);
        if (products && products.length > 0) {
          setShopifyProducts(products);
          setLoading(false);
          return;
        }
        // Empty result — retry after short delay
        if (attempt < retries) {
          await new Promise(r => setTimeout(r, 1500 * attempt));
        }
      } catch (err) {
        console.error(`Failed to load Shopify products (attempt ${attempt}):`, err);
        if (attempt < retries) {
          await new Promise(r => setTimeout(r, 1500 * attempt));
        }
      }
    }
    // After all retries, set whatever we have
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = shopifyProducts.filter((p) => {
    const matchesSearch = !search || 
      p.node.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.node.description?.toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;
    if (!activeCategory) return true;

    const tags = p.node.tags || [];
    const productType = (p.node as any).productType || "";
    const isPreLaunch = tags.includes("pre-lancamento");

    switch (activeCategory) {
      case "Destaques":
        return isPreLaunch || tags.includes("destaque");
      case "Livros":
        return productType === "Livros" || tags.includes("livros");
      case "Bíblias":
        return productType === "Bíblias" || tags.includes("biblias");
      case "Presentes":
        return productType === "Presentes" || tags.includes("presentes");
      default:
        return true;
    }
  });

  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden pb-32">
      {/* ── Header ── */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/20">
        {/* Free Shipping Banner */}
        <div className="bg-green-600 text-white text-center font-semibold py-1.5" style={{ fontSize: "clamp(11px, 2.8vw, 13px)" }}>
          🚚 Frete Grátis para compras acima de R$ 200!
        </div>
        <div className="max-w-3xl mx-auto px-4 py-3 space-y-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { if (window.history.length > 1) navigate(-1); else navigate("/home"); }}
              className="p-2 -ml-2 rounded-lg hover:bg-muted/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1" />
            <CartDrawer />
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 rounded-lg hover:bg-muted/20 transition-colors"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
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
              className="w-full rounded-xl bg-muted/30 border border-white/60 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
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
                onClick={() => setActiveCategory(active ? null : cat.label)}
                className={`flex flex-col items-center gap-1.5 rounded-xl transition-all text-center shrink-0 ${
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
                Loja Devocionalzeiros
              </span>
            </div>
            <h2 className="font-black text-primary-foreground leading-tight" style={{ fontSize: "clamp(20px, 5.5vw, 32px)" }}>
              Produtos Cristãos
            </h2>
            <p className="text-primary-foreground/70 mt-1" style={{ fontSize: "clamp(11px, 2.8vw, 14px)" }}>
              Bíblias, devocionais e presentes cristãos
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12" style={{ fontSize: "clamp(60px, 18vw, 100px)" }}>
            📚
          </div>
        </motion.div>

        {/* ── Products Grid ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold" style={{ fontSize: "clamp(13px, 3.5vw, 16px)" }}>
              {activeCategory ? activeCategory : "Todos os Produtos"}
            </h3>
            <span className="text-muted-foreground" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground space-y-2" style={{ fontSize: "clamp(13px, 3.5vw, 16px)" }}>
              <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground/40" />
              <p>Nenhum produto encontrado</p>
              <p className="text-sm text-muted-foreground/60">
                Os produtos serão exibidos aqui em breve!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredProducts.map((p) => (
                <ShopifyProductCard key={p.node.id} product={p} onClick={() => setSelectedProduct(p)} />
              ))}
            </div>
          )}
        </section>

        {/* ── Trust Badges ── */}
        <section className="grid grid-cols-3 gap-3 py-4">
          {[
            { icon: Truck, label: "Entrega Garantida" },
            { icon: ShieldCheck, label: "Compra Segura" },
            { icon: CreditCard, label: "Até 12x c/juros" },
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

      <ProductDetailModal product={selectedProduct} open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)} />
      <FloatingWhatsApp />
      <BottomNavBar />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default Loja;
