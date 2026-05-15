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
  Package,
} from "lucide-react";
import { AdminProductModal } from "@/components/loja/AdminProductModal";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { fetchShopifyProducts, type ShopifyProduct } from "@/lib/shopifyApi";
import { useCartStore } from "@/store/cartStore";
import lojaBanner from "@/assets/loja-banner.png";
import lojaBanner2 from "@/assets/loja-banner-2.png";
import manualDigitalMockup from "@/assets/manual-digital-mockup.png";

// Hardcoded digital product (sold outside Shopify, no cart)
const DIGITAL_PRODUCTS = [
  {
    id: "digital-manual-ebook",
    title: "Manual do Devocionalzeiro — E-book (PDF Digital)",
    description:
      "O Manual do Devocionalzeiro é o guia prático e devocional escrito por Isaque Mariel para te ajudar a criar uma rotina espiritual consistente, profunda e transformadora.\n\nUm passo a passo direto, com reflexões, orações, planos de leitura bíblica e práticas diárias para fortalecer sua caminhada com Deus — onde quer que você esteja.\n\nNesta versão digital (PDF), você leva o manual no bolso, leia pelo celular, tablet ou computador, sem esperar entrega e com acesso imediato após a compra.",
    author: undefined,
    price: 19.9,
    original_price: 49.9,
    pix_price: 19.9,
    discount: 60,
    buy_link: "", // empty so card click opens modal instead of navigating
    badge: "E-book",
    category: "Livros",
    is_featured: true,
    image_urls: [manualDigitalMockup],
    rating: 0,
    stock_quantity: null,
  },
];
import { CartDrawer } from "@/components/loja/CartDrawer";
import { ShopifyProductCard } from "@/components/loja/ShopifyProductCard";
import { ProductDetailModal } from "@/components/loja/ProductDetailModal";
import { EbookDetailModal } from "@/components/loja/EbookDetailModal";
import { ProductCard } from "@/components/loja/ProductCard";
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
  { icon: Package, label: "Combos", color: "hsl(160 70% 45%)" },
  { icon: Star, label: "Destaques", color: "hsl(340 70% 55%)" },
];

const Loja = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdminCheck();
  const { user, profile, signOut } = useAuth();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [selectedEbook, setSelectedEbook] = useState<(typeof DIGITAL_PRODUCTS)[number] | null>(null);
  const [localProducts, setLocalProducts] = useState<any[]>([]);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "price-desc">("relevance");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerPaused, setBannerPaused] = useState(false);
  const banners = [lojaBanner, lojaBanner2];

  useEffect(() => {
    if (bannerPaused) return;
    const id = setInterval(() => setBannerIndex((i) => (i + 1) % banners.length), 5000);
    return () => clearInterval(id);
  }, [banners.length, bannerPaused]);

  const loadLocalProducts = useCallback(async () => {
    const baseQuery = supabase.from("store_products").select("*").order("created_at", { ascending: false });
    const { data, error } = isAdmin ? await baseQuery : await baseQuery.eq("is_active", true);
    if (error) { console.error("Failed to load local products:", error); return; }
    setLocalProducts(data || []);
  }, [isAdmin]);

  useEffect(() => { loadLocalProducts(); }, [loadLocalProducts]);

  const handleDeleteLocal = async (id: string) => {
    if (!confirm("Excluir este produto?")) return;
    const { error } = await supabase.from("store_products").delete().eq("id", id);
    if (error) { toast.error("Erro ao excluir"); return; }
    toast.success("Produto excluído");
    loadLocalProducts();
  };

  const handleToggleFeatured = async (p: any) => {
    const { error } = await supabase.from("store_products").update({ is_featured: !p.is_featured }).eq("id", p.id);
    if (error) { toast.error("Erro"); return; }
    loadLocalProducts();
  };

  const handleLogin = () => navigate("/auth?redirect=/loja");
  const handleLogout = async () => {
    await signOut();
    toast.success("Você saiu da conta.");
  };
  const userInitial = (profile?.full_name || user?.email || "?").trim().charAt(0).toUpperCase();

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
      case "Combos":
        return productType === "Combos" || tags.includes("combo") || tags.includes("kit");
      default:
        return false;
    }
  });

  const filteredLocalProducts = localProducts.filter((p) => {
    const matchesSearch = !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (!activeCategory) return true;
    if (activeCategory === "Destaques") return p.is_featured;
    return p.category === activeCategory;
  });

  // Price range filter
  const inPriceRange = (price: number) => {
    switch (priceRange) {
      case "0-50": return price <= 50;
      case "50-100": return price > 50 && price <= 100;
      case "100-200": return price > 100 && price <= 200;
      case "200+": return price > 200;
      default: return true;
    }
  };

  const priceFilteredShopify = filteredProducts.filter((p) =>
    inPriceRange(parseFloat(p.node.priceRange.minVariantPrice.amount))
  );
  const priceFilteredLocal = filteredLocalProducts.filter((p) =>
    inPriceRange(parseFloat(p.price ?? 0))
  );

  // Sorting
  const sortShopify = [...priceFilteredShopify].sort((a, b) => {
    if (sortBy === "relevance") return 0;
    const pa = parseFloat(a.node.priceRange.minVariantPrice.amount);
    const pb = parseFloat(b.node.priceRange.minVariantPrice.amount);
    return sortBy === "price-asc" ? pa - pb : pb - pa;
  });
  const sortLocal = [...priceFilteredLocal].sort((a, b) => {
    if (sortBy === "relevance") return 0;
    const pa = parseFloat(a.price ?? 0);
    const pb = parseFloat(b.price ?? 0);
    return sortBy === "price-asc" ? pa - pb : pb - pa;
  });

  const filteredDigital = DIGITAL_PRODUCTS.filter((p) => {
    const matchesSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (!activeCategory) return true;
    if (activeCategory === "Destaques") return p.is_featured;
    return p.category === activeCategory;
  });
  const priceFilteredDigital = filteredDigital.filter((p) => inPriceRange(p.price));

  const totalCount = sortShopify.length + sortLocal.length + priceFilteredDigital.length;

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
            {user ? (
              <button
                onClick={() => navigate("/home")}
                className="p-2 -ml-2 rounded-lg hover:bg-muted/20 transition-colors"
                title="Voltar ao app"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <Link
                to="/"
                className="font-black tracking-tight"
                style={{ fontSize: "clamp(15px, 4vw, 20px)" }}
              >
                Devocionalzeiros
              </Link>
            )}
            <div className="flex-1" />
            <CartDrawer />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full hover:opacity-80 transition-opacity">
                    <Avatar className="h-9 w-9 border border-border/40">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/20 text-primary font-bold text-sm">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="truncate">
                    {profile?.full_name || user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/home")}>
                    <HomeIcon className="w-4 h-4 mr-2" /> Ir para o app
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate("/adminhd")}>
                      <UserIcon className="w-4 h-4 mr-2" /> Painel admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" /> Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
                style={{ fontSize: "clamp(12px, 3vw, 14px)" }}
              >
                <LogIn className="w-4 h-4" />
                Entrar
              </button>
            )}
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

        {/* ── Deals Banner Carousel ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl group"
          onMouseEnter={() => setBannerPaused(true)}
          onMouseLeave={() => setBannerPaused(false)}
          onFocus={() => setBannerPaused(true)}
          onBlur={() => setBannerPaused(false)}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Banners da Loja Devocionalzeiros"
        >
          <div className="relative w-full" style={{ aspectRatio: "1920 / 639" }}>
            {banners.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Banner Devocionalzeiros ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  bannerIndex === i ? "opacity-100" : "opacity-0"
                }`}
                loading="eager"
                decoding="async"
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setBannerIndex(i)}
                aria-label={`Ir para banner ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  bannerIndex === i ? "w-5 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Filters & Sort ── */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="flex-1 min-w-[140px] rounded-lg bg-muted/30 border border-border/40 px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30"
            style={{ fontSize: "clamp(12px, 3vw, 14px)" }}
          >
            <option value="all">Todos os preços</option>
            <option value="0-50">Até R$ 50</option>
            <option value="50-100">R$ 50 – R$ 100</option>
            <option value="100-200">R$ 100 – R$ 200</option>
            <option value="200+">Acima de R$ 200</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="flex-1 min-w-[140px] rounded-lg bg-muted/30 border border-border/40 px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30"
            style={{ fontSize: "clamp(12px, 3vw, 14px)" }}
          >
            <option value="relevance">Relevância</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
          </select>
          {(priceRange !== "all" || sortBy !== "relevance" || activeCategory || search) && (
            <button
              onClick={() => {
                setPriceRange("all");
                setSortBy("relevance");
                setActiveCategory(null);
                setSearch("");
              }}
              className="px-3 py-2 rounded-lg bg-destructive/10 text-destructive border border-destructive/30 font-semibold hover:bg-destructive/20 transition-colors"
              style={{ fontSize: "clamp(12px, 3vw, 14px)" }}
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* ── Products Grid ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold" style={{ fontSize: "clamp(13px, 3.5vw, 16px)" }}>
              {activeCategory ? activeCategory : "Todos os Produtos"}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground" style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}>
                {totalCount} produto{totalCount !== 1 ? "s" : ""}
              </span>
              {isAdmin && (
                <button
                  onClick={() => { setEditingProduct(null); setAdminModalOpen(true); }}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
                  style={{ fontSize: "clamp(10px, 2.6vw, 12px)" }}
                >
                  <Plus className="w-3 h-3" /> Novo
                </button>
              )}
            </div>
          </div>

          {loading && totalCount === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : totalCount === 0 ? (
            <div className="text-center py-12 text-muted-foreground space-y-2" style={{ fontSize: "clamp(13px, 3.5vw, 16px)" }}>
              <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground/40" />
              <p>Nenhum produto encontrado</p>
              <p className="text-sm text-muted-foreground/60">
                Tente ajustar os filtros.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sortLocal.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isAdmin={isAdmin}
                  onEdit={() => { setEditingProduct(p); setAdminModalOpen(true); }}
                  onDelete={() => handleDeleteLocal(p.id)}
                  onToggleFeatured={() => handleToggleFeatured(p)}
                />
              ))}
              {sortShopify.map((p) => (
                <ShopifyProductCard key={p.node.id} product={p} onClick={() => setSelectedProduct(p)} />
              ))}
              {priceFilteredDigital.map((p) => (
                <ProductCard key={p.id} product={p as any} onClick={() => setSelectedEbook(p)} />
              ))}
            </div>
          )}
        </section>

        <AdminProductModal
          open={adminModalOpen}
          onOpenChange={setAdminModalOpen}
          product={editingProduct}
          onSaved={loadLocalProducts}
        />

        <ProductDetailModal
          product={selectedProduct}
          open={!!selectedProduct}
          onOpenChange={(open) => { if (!open) setSelectedProduct(null); }}
        />

        <EbookDetailModal
          product={selectedEbook}
          open={!!selectedEbook}
          onOpenChange={(open) => { if (!open) setSelectedEbook(null); }}
        />

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

      {/* ── Floating WhatsApp ── */}
      <FloatingWhatsApp />
    </div>
  );
};

export default Loja;
