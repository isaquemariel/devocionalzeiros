import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAulasSession } from "@/hooks/useAulasSession";
import { aulasAuth } from "@/lib/aulasAuth";
import { AulasHeader } from "@/components/aulas/AulasHeader";
import { FileUploader } from "@/components/aulas/admin/FileUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Pencil, Trash2, FileText, ChevronLeft, ImageIcon, Video } from "lucide-react";
import { toast } from "sonner";

type Any = any;

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function extractYoutubeId(input: string): string {
  const s = input.trim();
  if (!s) return "";
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : s;
}

export default function AulasAdmin() {
  const navigate = useNavigate();
  const { session, loading: loadingAdmin } = useAulasSession();
  const isAdmin = !!session?.is_admin;


  const [cursos, setCursos] = useState<Any[]>([]);
  const [modulos, setModulos] = useState<Any[]>([]);
  const [aulas, setAulas] = useState<Any[]>([]);
  const [arquivos, setArquivos] = useState<Any[]>([]);
  const [settings, setSettings] = useState<Any>(null);
  const [acessos, setAcessos] = useState<Any[]>([]);
  const [admins, setAdmins] = useState<Any[]>([]);
  const [enoqueVideos, setEnoqueVideos] = useState<Any[]>([]);
  const [videoDialog, setVideoDialog] = useState<Any | null>(null);

  const [cursoDialog, setCursoDialog] = useState<Any | null>(null);
  const [moduloDialog, setModuloDialog] = useState<{ data: Any; curso_id: string } | null>(null);
  const [aulaDialog, setAulaDialog] = useState<{ data: Any; modulo_id: string } | null>(null);
  const [arquivoDialog, setArquivoDialog] = useState<{ data: Any; aula_id: string } | null>(null);

  useEffect(() => {
    if (!loadingAdmin && !isAdmin) navigate("/aulas");
  }, [isAdmin, loadingAdmin, navigate]);

  const loadAll = async () => {
    const [c, m, a, f, s, ac, ad, ev] = await Promise.all([
      supabase.from("aulas_cursos").select("*").order("order_index"),
      supabase.from("aulas_modulos").select("*").order("order_index"),
      supabase.from("aulas_aulas").select("*").order("order_index"),
      supabase.from("aulas_arquivos").select("*").order("order_index"),
      supabase.from("aulas_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("aulas_product_access").select("*").order("created_at", { ascending: false }),
      supabase.from("aulas_admins").select("*").order("created_at"),
      supabase.from("enoque_videos").select("*").order("order_index"),
    ]);
    setCursos(c.data ?? []);
    setModulos(m.data ?? []);
    setAulas(a.data ?? []);
    setArquivos(f.data ?? []);
    setSettings(s.data ?? { id: 1, banner_enabled: false });
    setAcessos(ac.data ?? []);
    setAdmins(ad.data ?? []);
    setEnoqueVideos(ev.data ?? []);
  };

  useEffect(() => { if (isAdmin) loadAll(); }, [isAdmin]);

  const saveEnoqueVideo = async (v: Any) => {
    try {
      await aulasAuth.adminCall("save_enoque_video", {
        video: {
          id: v.id,
          title: v.title,
          youtube_id: extractYoutubeId(v.youtube_id || v.youtube_url || ""),
          description: v.description || null,
          order_index: Number(v.order_index ?? 0),
        },
      });
      toast.success("Vídeo salvo"); setVideoDialog(null); loadAll();
    } catch (e: any) { toast.error(e?.message || "Erro"); }
  };
  const deleteEnoqueVideo = async (id: string) => {
    if (!confirm("Apagar vídeo?")) return;
    try { await aulasAuth.adminCall("delete_enoque_video", { id }); loadAll(); }
    catch (e: any) { toast.error(e?.message || "Erro"); }
  };

  // ---------- CURSO ----------
  const saveCurso = async (c: Any) => {
    try {
      await aulasAuth.adminCall("save_curso", {
        curso: {
          id: c.id,
          slug: c.slug || slugify(c.title || ""),
          title: c.title,
          description: c.description || null,
          cover_url: c.cover_url || null,
          kiwify_product_id: c.kiwify_product_id || null,
          purchase_url: c.purchase_url || null,
          order_index: Number(c.order_index ?? 0),
          is_published: !!c.is_published,
        },
      });
      toast.success("Curso salvo"); setCursoDialog(null); loadAll();
    } catch (e: any) { toast.error(e?.message || "Erro ao salvar"); }
  };
  const deleteCurso = async (id: string) => {
    if (!confirm("Apagar curso e tudo dentro?")) return;
    try { await aulasAuth.adminCall("delete_curso", { id }); loadAll(); }
    catch (e: any) { toast.error(e?.message || "Erro"); }
  };

  // ---------- MÓDULO ----------
  const saveModulo = async (m: Any, curso_id: string) => {
    try {
      await aulasAuth.adminCall("save_modulo", {
        modulo: {
          id: m.id, curso_id, title: m.title, description: m.description || null,
          cover_url: m.cover_url || null, order_index: Number(m.order_index ?? 0),
        },
      });
      toast.success("Módulo salvo"); setModuloDialog(null); loadAll();
    } catch (e: any) { toast.error(e?.message || "Erro ao salvar"); }
  };
  const deleteModulo = async (id: string) => {
    if (!confirm("Apagar módulo e suas aulas?")) return;
    try { await aulasAuth.adminCall("delete_modulo", { id }); loadAll(); }
    catch (e: any) { toast.error(e?.message || "Erro"); }
  };

  // ---------- AULA ----------
  const saveAula = async (a: Any, modulo_id: string) => {
    try {
      await aulasAuth.adminCall("save_aula", {
        aula: {
          id: a.id, modulo_id, title: a.title, description: a.description || null,
          youtube_url: a.youtube_url || null,
          duration_minutes: a.duration_minutes ? Number(a.duration_minutes) : null,
          cover_url: a.cover_url || null, order_index: Number(a.order_index ?? 0),
          is_published: !!a.is_published,
        },
      });
      toast.success("Aula salva"); setAulaDialog(null); loadAll();
    } catch (e: any) { toast.error(e?.message || "Erro ao salvar"); }
  };
  const deleteAula = async (id: string) => {
    if (!confirm("Apagar aula?")) return;
    try { await aulasAuth.adminCall("delete_aula", { id }); loadAll(); }
    catch (e: any) { toast.error(e?.message || "Erro"); }
  };

  // ---------- ARQUIVO ----------
  const saveArquivo = async (f: Any, aula_id: string) => {
    try {
      await aulasAuth.adminCall("save_arquivo", {
        arquivo: {
          id: f.id, aula_id, title: f.title, file_url: f.file_url,
          file_size_kb: f.file_size_kb ? Number(f.file_size_kb) : null,
          order_index: Number(f.order_index ?? 0),
        },
      });
      toast.success("Arquivo salvo"); setArquivoDialog(null); loadAll();
    } catch (e: any) { toast.error(e?.message || "Erro ao salvar"); }
  };
  const deleteArquivo = async (id: string) => {
    if (!confirm("Apagar arquivo?")) return;
    try { await aulasAuth.adminCall("delete_arquivo", { id }); loadAll(); }
    catch (e: any) { toast.error(e?.message || "Erro"); }
  };

  // ---------- SETTINGS ----------
  const saveSettings = async () => {
    const payload = {
      id: 1,
      banner_enabled: !!settings.banner_enabled,
      banner_image_url: settings.banner_image_url || null,
      banner_curso_id: settings.banner_curso_id || null,
      banner_title_override: settings.banner_title_override || null,
      banner_subtitle_override: settings.banner_subtitle_override || null,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("aulas_settings").upsert(payload, { onConflict: "id" });
    if (error) return toast.error(error.message);
    toast.success("Banner salvo"); loadAll();
  };

  // ---------- ACESSOS ----------
  const [novoAcesso, setNovoAcesso] = useState<{ email: string; curso_id: string }>({ email: "", curso_id: "" });
  const grantAccess = async () => {
    const email = novoAcesso.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("E-mail inválido");
    if (!novoAcesso.curso_id) return toast.error("Escolha um curso");
    try {
      await aulasAuth.adminCall("grant_access", { email, curso_id: novoAcesso.curso_id });
    } catch (e: any) {
      return toast.error(e?.message || "Erro ao conceder acesso");
    }
    toast.success("Acesso concedido");
    setNovoAcesso({ email: "", curso_id: "" });
    loadAll();
  };
  const revokeAccess = async (id: string) => {
    if (!confirm("Remover acesso?")) return;
    try {
      await aulasAuth.adminCall("revoke_access", { id });
    } catch (e: any) {
      return toast.error(e?.message || "Erro ao remover");
    }
    loadAll();
  };


  // ---------- ADMINS ----------
  const [novoAdmin, setNovoAdmin] = useState("");
  const addAdmin = async () => {
    const email = novoAdmin.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("E-mail inválido");
    const { error } = await supabase.from("aulas_admins").insert({ email });
    if (error && !String(error.message).includes("duplicate")) return toast.error(error.message);
    toast.success("Admin adicionado");
    setNovoAdmin("");
    loadAll();
  };
  const removeAdmin = async (id: string) => {
    if (!confirm("Remover admin?")) return;
    const { error } = await supabase.from("aulas_admins").delete().eq("id", id);
    if (error) return toast.error(error.message);
    loadAll();
  };

  const cursoTitle = (id: string) => cursos.find((c) => c.id === id)?.title ?? "—";

  if (loadingAdmin) {
    return (
      <div className="min-h-screen bg-black text-white">
        <AulasHeader />
        <div className="p-10 text-center text-white/50">Verificando acesso…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AulasHeader />

      <main className="mx-auto max-w-5xl px-4 py-8 pb-24 sm:px-6">
        <div className="mb-6">
          <h1 className="font-montserrat text-2xl font-bold">Admin — Aulas</h1>
          <p className="text-sm text-white/50">Gerencie cursos, banner, acessos e admins.</p>
        </div>

        <Tabs defaultValue="conteudo" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-5 bg-white/5">
            <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
            <TabsTrigger value="banner">Banner</TabsTrigger>
            <TabsTrigger value="enoque">Enoque</TabsTrigger>
            <TabsTrigger value="acessos">Acessos</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
          </TabsList>

          {/* CONTEÚDO */}
          <TabsContent value="conteudo">
            <div className="mb-4 flex justify-end">
              <Button onClick={() => setCursoDialog({})} className="bg-amber-500 text-black hover:bg-amber-400">
                <Plus className="mr-1.5 h-4 w-4" /> Novo curso
              </Button>
            </div>

            {cursos.length === 0 ? (
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-10 text-center text-white/50">
                Nenhum curso ainda.
              </div>
            ) : (
              <Accordion type="multiple" className="space-y-3">
                {cursos.map((c) => {
                  const mods = modulos.filter((m) => m.curso_id === c.id);
                  return (
                    <AccordionItem key={c.id} value={c.id} className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.03]">
                      <div className="flex items-center gap-2 px-4">
                        <AccordionTrigger className="flex-1 py-4 hover:no-underline">
                          <div className="flex flex-col items-start text-left">
                            <span className="font-semibold text-white">
                              {c.title}{" "}
                              {!c.is_published && (
                                <span className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase text-white/60">rascunho</span>
                              )}
                            </span>
                            <span className="text-xs text-white/40">/{c.slug} • {mods.length} módulos</span>
                          </div>
                        </AccordionTrigger>
                        <Button size="sm" variant="ghost" onClick={() => setCursoDialog(c)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteCurso(c.id)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                      </div>

                      <AccordionContent className="space-y-3 border-t border-white/5 bg-black/30 px-4 py-4">
                        <div className="flex justify-end">
                          <Button size="sm" variant="outline" onClick={() => setModuloDialog({ data: null, curso_id: c.id })}
                            className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                            <Plus className="mr-1.5 h-3 w-3" /> Módulo
                          </Button>
                        </div>
                        {mods.length === 0 && <p className="py-4 text-center text-sm text-white/40">Sem módulos.</p>}
                        <Accordion type="multiple" className="space-y-2">
                          {mods.map((m) => {
                            const auls = aulas.filter((a) => a.modulo_id === m.id);
                            return (
                              <AccordionItem key={m.id} value={m.id} className="overflow-hidden rounded-lg border border-white/5 bg-white/[0.03]">
                                <div className="flex items-center gap-2 px-3">
                                  <AccordionTrigger className="flex-1 py-3 hover:no-underline">
                                    <div className="flex flex-col items-start text-left">
                                      <span className="font-medium text-white">{m.title}</span>
                                      <span className="text-xs text-white/40">{auls.length} aulas</span>
                                    </div>
                                  </AccordionTrigger>
                                  <Button size="sm" variant="ghost" onClick={() => setModuloDialog({ data: m, curso_id: c.id })}><Pencil className="h-4 w-4" /></Button>
                                  <Button size="sm" variant="ghost" onClick={() => deleteModulo(m.id)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                                </div>
                                <AccordionContent className="space-y-2 border-t border-white/5 bg-black/40 px-3 py-3">
                                  <div className="flex justify-end">
                                    <Button size="sm" variant="outline" onClick={() => setAulaDialog({ data: null, modulo_id: m.id })}
                                      className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                                      <Plus className="mr-1.5 h-3 w-3" /> Aula
                                    </Button>
                                  </div>
                                  {auls.length === 0 && <p className="py-3 text-center text-xs text-white/40">Sem aulas.</p>}
                                  {auls.map((a) => {
                                    const arqs = arquivos.filter((x) => x.aula_id === a.id);
                                    return (
                                      <div key={a.id} className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
                                        <div className="flex items-start gap-2">
                                          <div className="flex-1">
                                            <p className="font-medium text-white">
                                              {a.title}{" "}
                                              {!a.is_published && <span className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase text-white/60">rascunho</span>}
                                            </p>
                                            <p className="text-xs text-white/40">{a.youtube_url ? "🎬 YouTube" : "Sem vídeo"} • {arqs.length} arquivos</p>
                                          </div>
                                          <Button size="sm" variant="ghost" onClick={() => setAulaDialog({ data: a, modulo_id: m.id })}><Pencil className="h-4 w-4" /></Button>
                                          <Button size="sm" variant="ghost" onClick={() => deleteAula(a.id)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                                        </div>
                                        <div className="mt-3 space-y-1.5 border-t border-white/5 pt-3">
                                          <div className="flex items-center justify-between">
                                            <p className="text-xs uppercase tracking-wider text-white/40">Arquivos</p>
                                            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setArquivoDialog({ data: null, aula_id: a.id })}>
                                              <Plus className="mr-1 h-3 w-3" /> Anexar
                                            </Button>
                                          </div>
                                          {arqs.map((f) => (
                                            <div key={f.id} className="flex items-center gap-2 rounded bg-white/[0.03] px-2 py-1.5 text-sm">
                                              <FileText className="h-4 w-4 text-white/40" />
                                              <span className="flex-1 truncate">{f.title}</span>
                                              <Button size="sm" variant="ghost" className="h-7" onClick={() => setArquivoDialog({ data: f, aula_id: a.id })}><Pencil className="h-3 w-3" /></Button>
                                              <Button size="sm" variant="ghost" className="h-7" onClick={() => deleteArquivo(f.id)}><Trash2 className="h-3 w-3 text-red-400" /></Button>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </TabsContent>

          {/* ENOQUE — VÍDEOS */}
          <TabsContent value="enoque">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Mini aulas do Livro de Enoque</h3>
                  <p className="text-xs text-white/50">Vídeos exibidos na aba "Vídeos" do curso de Enoque.</p>
                </div>
                <Button onClick={() => setVideoDialog({})} className="bg-amber-500 text-black hover:bg-amber-400">
                  <Plus className="mr-1.5 h-4 w-4" /> Novo vídeo
                </Button>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.03]">
                {enoqueVideos.length === 0 ? (
                  <p className="p-6 text-center text-sm text-white/40">Nenhum vídeo ainda.</p>
                ) : (
                  <div className="divide-y divide-white/5">
                    {enoqueVideos.map((v) => (
                      <div key={v.id} className="flex items-center gap-3 p-3">
                        <img src={`https://i.ytimg.com/vi/${v.youtube_id}/mqdefault.jpg`} alt="" className="h-12 w-20 flex-shrink-0 rounded object-cover ring-1 ring-white/10" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{v.title}</p>
                          <p className="text-xs text-white/40">YouTube ID: {v.youtube_id} • ordem {v.order_index}</p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => setVideoDialog(v)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteEnoqueVideo(v.id)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* BANNER */}

          <TabsContent value="banner">
            <div className="space-y-5 rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <div className="flex items-center gap-3">
                <Switch
                  checked={!!settings?.banner_enabled}
                  onCheckedChange={(v) => setSettings({ ...(settings ?? { id: 1 }), banner_enabled: v })}
                />
                <Label className="text-white">Exibir banner de destaque na home</Label>
              </div>

              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-200/80">
                <ImageIcon className="mr-1.5 inline h-3.5 w-3.5" /> Proporção recomendada da imagem: <b>1920 × 800 px</b> (formato horizontal).
              </div>

              <FileUploader
                label="Imagem do banner (opcional — se vazio, usa a capa do curso)"
                value={settings?.banner_image_url ?? ""}
                onChange={(url) => setSettings({ ...(settings ?? { id: 1 }), banner_image_url: url })}
                accept="image/*" folder="banners"
              />

              <div>
                <Label>Curso de destaque</Label>
                <Select
                  value={settings?.banner_curso_id ?? ""}
                  onValueChange={(v) => setSettings({ ...(settings ?? { id: 1 }), banner_curso_id: v })}
                >
                  <SelectTrigger className="mt-1.5 bg-white/5"><SelectValue placeholder="Escolha um curso" /></SelectTrigger>
                  <SelectContent>
                    {cursos.filter((c) => c.is_published).map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Título personalizado (opcional)</Label>
                <Input className="mt-1.5 bg-white/5"
                  value={settings?.banner_title_override ?? ""}
                  onChange={(e) => setSettings({ ...(settings ?? { id: 1 }), banner_title_override: e.target.value })}
                />
              </div>
              <div>
                <Label>Subtítulo personalizado (opcional)</Label>
                <Textarea className="mt-1.5 bg-white/5" rows={2}
                  value={settings?.banner_subtitle_override ?? ""}
                  onChange={(e) => setSettings({ ...(settings ?? { id: 1 }), banner_subtitle_override: e.target.value })}
                />
              </div>

              <Button onClick={saveSettings} className="bg-amber-500 text-black hover:bg-amber-400">Salvar banner</Button>
            </div>
          </TabsContent>

          {/* ACESSOS */}
          <TabsContent value="acessos">
            <div className="space-y-4">
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                <h3 className="mb-3 font-semibold">Conceder acesso a um e-mail</h3>
                <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                  <Input placeholder="email@cliente.com" className="bg-white/5"
                    value={novoAcesso.email}
                    onChange={(e) => setNovoAcesso({ ...novoAcesso, email: e.target.value })}
                  />
                  <Select value={novoAcesso.curso_id} onValueChange={(v) => setNovoAcesso({ ...novoAcesso, curso_id: v })}>
                    <SelectTrigger className="bg-white/5"><SelectValue placeholder="Produto / Curso" /></SelectTrigger>
                    <SelectContent>
                      {cursos.map((c) => (<SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>))}
                    </SelectContent>
                  </Select>
                  <Button onClick={grantAccess} className="bg-amber-500 text-black hover:bg-amber-400">Conceder</Button>
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.03]">
                <div className="border-b border-white/5 p-3 text-sm font-semibold">Acessos concedidos ({acessos.length})</div>
                <div className="divide-y divide-white/5">
                  {acessos.length === 0 && <p className="p-6 text-center text-sm text-white/40">Nenhum acesso ainda.</p>}
                  {acessos.map((a) => (
                    <div key={a.id} className="flex items-center gap-3 p-3 text-sm">
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium">{a.email}</p>
                        <p className="text-xs text-white/50">{cursoTitle(a.curso_id)} • <span className="uppercase">{a.source}</span></p>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => revokeAccess(a.id)}>
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ADMINS */}
          <TabsContent value="admins">
            <div className="space-y-4">
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                <h3 className="mb-3 font-semibold">Adicionar admin da área de membros</h3>
                <div className="flex gap-2">
                  <Input placeholder="email@admin.com" className="bg-white/5"
                    value={novoAdmin} onChange={(e) => setNovoAdmin(e.target.value)} />
                  <Button onClick={addAdmin} className="bg-amber-500 text-black hover:bg-amber-400">Adicionar</Button>
                </div>
                <p className="mt-2 text-xs text-white/40">
                  Admins enxergam todos os cursos liberados, têm acesso ao painel e podem editar tudo.
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.03]">
                <div className="border-b border-white/5 p-3 text-sm font-semibold">Admins ({admins.length})</div>
                <div className="divide-y divide-white/5">
                  {admins.map((a) => (
                    <div key={a.id} className="flex items-center gap-3 p-3 text-sm">
                      <div className="flex-1 truncate font-medium">{a.email}</div>
                      <Button size="sm" variant="ghost" onClick={() => removeAdmin(a.id)}>
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {cursoDialog !== null && (
        <CursoForm data={cursoDialog} onSave={saveCurso} onClose={() => setCursoDialog(null)} />
      )}
      {moduloDialog !== null && (
        <ModuloForm data={moduloDialog.data} curso_id={moduloDialog.curso_id} onSave={saveModulo} onClose={() => setModuloDialog(null)} />
      )}
      {aulaDialog !== null && (
        <AulaForm data={aulaDialog.data} modulo_id={aulaDialog.modulo_id} onSave={saveAula} onClose={() => setAulaDialog(null)} />
      )}
      {arquivoDialog !== null && (
        <ArquivoForm data={arquivoDialog.data} aula_id={arquivoDialog.aula_id} onSave={saveArquivo} onClose={() => setArquivoDialog(null)} />
      )}
      {videoDialog !== null && (
        <EnoqueVideoForm data={videoDialog} onSave={saveEnoqueVideo} onClose={() => setVideoDialog(null)} />
      )}
    </div>
  );
}

// --------- FORMS ---------
function CursoForm({ data, onSave, onClose }: any) {
  const [f, setF] = useState<any>(data ?? {});
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{f.id ? "Editar curso" : "Novo curso"}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Título</Label><Input value={f.title ?? ""} onChange={(e) => setF({ ...f, title: e.target.value })} /></div>
          <div><Label>Slug (URL)</Label><Input value={f.slug ?? ""} onChange={(e) => setF({ ...f, slug: e.target.value })} placeholder="auto se vazio" /></div>
          <div><Label>Descrição</Label><Textarea value={f.description ?? ""} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 text-[11px] text-amber-200/80">
            Proporção recomendada da capa: <b>1080 × 1350 px</b> (vertical 4:5).
          </div>
          <FileUploader label="Capa" value={f.cover_url ?? ""} onChange={(url) => setF({ ...f, cover_url: url })} accept="image/*" folder="capas" />
          <div className="grid grid-cols-2 gap-3">
            <div><Label>ID do produto Kiwify</Label><Input value={f.kiwify_product_id ?? ""} onChange={(e) => setF({ ...f, kiwify_product_id: e.target.value })} placeholder="ex.: l9y7u96" /></div>
            <div><Label>Ordem</Label><Input type="number" value={f.order_index ?? 0} onChange={(e) => setF({ ...f, order_index: e.target.value })} /></div>
          </div>
          <div><Label>Link de compra</Label><Input value={f.purchase_url ?? ""} onChange={(e) => setF({ ...f, purchase_url: e.target.value })} placeholder="https://..." /></div>
          <div className="flex items-center gap-2"><Switch checked={f.is_published ?? true} onCheckedChange={(v) => setF({ ...f, is_published: v })} /><Label>Publicado</Label></div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(f)}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ModuloForm({ data, curso_id, onSave, onClose }: any) {
  const [f, setF] = useState<any>(data ?? {});
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{f.id ? "Editar módulo" : "Novo módulo"}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Título</Label><Input value={f.title ?? ""} onChange={(e) => setF({ ...f, title: e.target.value })} /></div>
          <div><Label>Descrição</Label><Textarea value={f.description ?? ""} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 text-[11px] text-amber-200/80">
            <ImageIcon className="mr-1 inline h-3 w-3" /> Proporção recomendada da capa do módulo: <b>1280 × 720 px</b> (horizontal 16:9).
          </div>
          <FileUploader label="Capa" value={f.cover_url ?? ""} onChange={(url) => setF({ ...f, cover_url: url })} accept="image/*" folder="capas" />
          <div><Label>Ordem</Label><Input type="number" value={f.order_index ?? 0} onChange={(e) => setF({ ...f, order_index: e.target.value })} /></div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-[11px] text-white/60">
            💡 Depois de salvar, expanda este módulo na lista e clique em <b>+ Aula</b> para adicionar o vídeo do <b>YouTube</b>. Em cada aula você pode anexar <b>arquivos PDF</b> (com opção de visualização ao vivo e download).
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(f, curso_id)}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AulaForm({ data, modulo_id, onSave, onClose }: any) {
  const [f, setF] = useState<any>(data ?? { is_published: true });
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{f.id ? "Editar aula" : "Nova aula"}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Título</Label><Input value={f.title ?? ""} onChange={(e) => setF({ ...f, title: e.target.value })} /></div>
          <div><Label>Link do YouTube</Label><Input value={f.youtube_url ?? ""} onChange={(e) => setF({ ...f, youtube_url: e.target.value })} placeholder="https://youtu.be/..." /></div>
          <div><Label>Descrição</Label><Textarea rows={4} value={f.description ?? ""} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
          <FileUploader label="Capa (opcional)" value={f.cover_url ?? ""} onChange={(url) => setF({ ...f, cover_url: url })} accept="image/*" folder="capas" />
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Duração (min)</Label><Input type="number" value={f.duration_minutes ?? ""} onChange={(e) => setF({ ...f, duration_minutes: e.target.value })} /></div>
            <div><Label>Ordem</Label><Input type="number" value={f.order_index ?? 0} onChange={(e) => setF({ ...f, order_index: e.target.value })} /></div>
          </div>
          <div className="flex items-center gap-2"><Switch checked={f.is_published ?? true} onCheckedChange={(v) => setF({ ...f, is_published: v })} /><Label>Publicado</Label></div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(f, modulo_id)}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ArquivoForm({ data, aula_id, onSave, onClose }: any) {
  const [f, setF] = useState<any>(data ?? {});
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{f.id ? "Editar arquivo" : "Novo arquivo"}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Nome</Label><Input value={f.title ?? ""} onChange={(e) => setF({ ...f, title: e.target.value })} /></div>
          <FileUploader label="Arquivo PDF" value={f.file_url ?? ""} onChange={(url) => setF({ ...f, file_url: url })} accept=".pdf" folder="pdfs" />
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Tamanho (KB)</Label><Input type="number" value={f.file_size_kb ?? ""} onChange={(e) => setF({ ...f, file_size_kb: e.target.value })} /></div>
            <div><Label>Ordem</Label><Input type="number" value={f.order_index ?? 0} onChange={(e) => setF({ ...f, order_index: e.target.value })} /></div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(f, aula_id)} disabled={!f.title || !f.file_url}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EnoqueVideoForm({ data, onSave, onClose }: any) {
  const [f, setF] = useState<any>(data ?? { is_published: true });
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{f.id ? "Editar vídeo" : "Novo vídeo"}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Título</Label><Input value={f.title ?? ""} onChange={(e) => setF({ ...f, title: e.target.value })} /></div>
          <div><Label>Link do YouTube</Label><Input value={f.youtube_url ?? ""} onChange={(e) => setF({ ...f, youtube_url: e.target.value })} placeholder="https://youtu.be/..." /></div>
          <div><Label>Descrição</Label><Textarea rows={3} value={f.description ?? ""} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
          <div><Label>Ordem</Label><Input type="number" value={f.order_index ?? 0} onChange={(e) => setF({ ...f, order_index: e.target.value })} /></div>
          <div className="flex items-center gap-2"><Switch checked={f.is_published ?? true} onCheckedChange={(v) => setF({ ...f, is_published: v })} /><Label>Publicado</Label></div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(f)} disabled={!f.title || !f.youtube_url}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
