import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CATEGORIES = ["Livros", "Bíblias", "Presentes", "Combos", "Destaques"];
const BADGES = ["", "Destaque", "Lançamento", "Mais Vendido", "Kit", "Promoção"];

interface Product {
  id?: string;
  title: string;
  description: string;
  author: string;
  price: number;
  original_price: number;
  pix_price: number;
  discount: number;
  buy_link: string;
  badge: string;
  category: string;
  is_featured: boolean;
  image_urls: string[];
  rating: number;
  is_active: boolean;
  stock_quantity: number | null;
}

const emptyProduct: Product = {
  title: "",
  description: "",
  author: "",
  price: 0,
  original_price: 0,
  pix_price: 0,
  discount: 0,
  buy_link: "",
  badge: "",
  category: "Livros",
  is_featured: false,
  image_urls: [],
  rating: 5.0,
  is_active: true,
  stock_quantity: null,
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSaved: () => void;
}

export const AdminProductModal = ({ open, onOpenChange, product, onSaved }: Props) => {
  const [form, setForm] = useState<Product>(product ?? emptyProduct);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const isEdit = !!product?.id;

  const handleChange = (key: keyof Product, value: any) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // Auto-calculate discount logic
      if (key === "price" && next.price > 0 && next.discount > 0) {
        next.original_price = next.price;
        next.pix_price = Math.round((next.price * (1 - next.discount / 100)) * 100) / 100;
      } else if (key === "price" && next.discount === 0) {
        next.original_price = next.price;
        next.pix_price = next.price;
      } else if (key === "discount" && next.price > 0) {
        const disc = Math.max(0, Math.min(99, Number(value) || 0));
        next.discount = disc;
        next.original_price = next.price;
        next.pix_price = disc > 0 ? Math.round((next.price * (1 - disc / 100)) * 100) / 100 : next.price;
      } else if (key === "pix_price" && next.price > 0) {
        const finalPrice = Number(value) || 0;
        next.pix_price = finalPrice;
        next.original_price = next.price;
        next.discount = finalPrice < next.price ? Math.round((1 - finalPrice / next.price) * 100) : 0;
      }
      return next;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (form.image_urls.length >= 3) {
      toast.error("Máximo de 3 imagens");
      return;
    }

    setUploading(true);
    try {
      for (let i = 0; i < Math.min(files.length, 3 - form.image_urls.length); i++) {
        const file = files[i];
        const ext = file.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("product-images").upload(path, file);
        if (error) throw error;
        const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
        setForm((prev) => ({ ...prev, image_urls: [...prev.image_urls, urlData.publicUrl] }));
      }
    } catch (err: any) {
      toast.error("Erro ao enviar imagem: " + err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const removeImage = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== idx),
    }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast.error("Título é obrigatório");
      return;
    }
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const payload = {
        title: form.title,
        description: form.description,
        author: form.author,
        price: form.price,
        original_price: form.original_price,
        pix_price: form.pix_price,
        discount: form.discount,
        buy_link: form.buy_link,
        badge: form.badge || null,
        category: form.category,
        is_featured: form.is_featured,
        image_urls: form.image_urls,
        rating: form.rating,
        is_active: form.is_active,
        stock_quantity: form.stock_quantity,
        created_by: user?.id,
      };

      if (isEdit && product?.id) {
        const { error } = await supabase
          .from("store_products")
          .update(payload)
          .eq("id", product.id);
        if (error) throw error;
        toast.success("Produto atualizado!");
      } else {
        const { error } = await supabase
          .from("store_products")
          .insert(payload as any);
        if (error) throw error;
        toast.success("Produto criado!");
      }
      onSaved();
      onOpenChange(false);
    } catch (err: any) {
      toast.error("Erro: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Reset form when modal opens
  const handleOpenChange = (v: boolean) => {
    if (v) setForm(product ?? emptyProduct);
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Produto" : "Novo Produto"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Images */}
          <div>
            <Label>Imagens (até 3)</Label>
            <div className="flex gap-2 mt-1 flex-wrap">
              {form.image_urls.map((url, i) => (
                <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {form.image_urls.length < 3 && (
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 transition-colors"
                >
                  {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Upload className="w-5 h-5" /><span className="text-[10px] mt-1">Adicionar</span></>}
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          </div>

          <div>
            <Label>Título *</Label>
            <Input value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
          </div>

          <div>
            <Label>Autor / Editora</Label>
            <Input value={form.author} onChange={(e) => handleChange("author", e.target.value)} />
          </div>

          <div>
            <Label>Descrição</Label>
            <textarea
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div>
            <Label>Preço (R$) *</Label>
            <Input type="number" step="0.01" value={form.price || ""} onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)} placeholder="Ex: 89.90" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Desconto (%)</Label>
              <Input type="number" min="0" max="99" value={form.discount || ""} onChange={(e) => handleChange("discount", parseInt(e.target.value) || 0)} placeholder="Ex: 20" />
            </div>
            <div>
              <Label>Preço c/ desconto (R$)</Label>
              <Input type="number" step="0.01" value={form.pix_price || ""} onChange={(e) => handleChange("pix_price", parseFloat(e.target.value) || 0)} placeholder="Automático" />
            </div>
          </div>

          {form.price > 0 && form.discount > 0 && (
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/30 border border-border/50 text-sm">
              <span className="text-muted-foreground line-through">R$ {form.price.toFixed(2)}</span>
              <span className="text-emerald-400 font-bold text-base">R$ {form.pix_price.toFixed(2)}</span>
              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold">-{form.discount}%</span>
            </div>
          )}

          <div>
            <Label>Avaliação (0-5)</Label>
            <Input type="number" step="0.1" min="0" max="5" value={form.rating || ""} onChange={(e) => handleChange("rating", parseFloat(e.target.value) || 0)} />
          </div>

          <div>
            <Label>Link de Compra</Label>
            <Input value={form.buy_link} onChange={(e) => handleChange("buy_link", e.target.value)} placeholder="https://..." />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Categoria</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <Label>Tag / Badge</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={form.badge}
                onChange={(e) => handleChange("badge", e.target.value)}
              >
                {BADGES.map((b) => <option key={b} value={b}>{b || "Nenhuma"}</option>)}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Oferta da Semana (Destaque)</Label>
            <Switch checked={form.is_featured} onCheckedChange={(v) => handleChange("is_featured", v)} />
          </div>

          <div>
            <Label>Estoque (vazio = ilimitado, 0 = esgotado)</Label>
            <Input
              type="number"
              min="0"
              value={form.stock_quantity ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                handleChange("stock_quantity", v === "" ? null : Math.max(0, parseInt(v) || 0));
              }}
              placeholder="Ex: 96 — ou vazio para ilimitado"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Produto Ativo</Label>
            <Switch checked={form.is_active} onCheckedChange={(v) => handleChange("is_active", v)} />
          </div>

          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {isEdit ? "Salvar Alterações" : "Criar Produto"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
