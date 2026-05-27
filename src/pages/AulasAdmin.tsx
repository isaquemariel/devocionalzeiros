import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { AulasHeader } from "@/components/aulas/AulasHeader";
import { FileUploader } from "@/components/aulas/admin/FileUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Pencil, Trash2, FileText, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

type Curso = any;
type Modulo = any;
type Aula = any;
type Arquivo = any;

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AulasAdmin() {
  const navigate = useNavigate();
  const { isAdmin, loading: loadingAdmin } = useAdminCheck();

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);

  // dialogs
  const [cursoDialog, setCursoDialog] = useState<Curso | null>(null);
  const [moduloDialog, setModuloDialog] = useState<{ data: Modulo | null; curso_id: string } | null>(null);
  const [aulaDialog, setAulaDialog] = useState<{ data: Aula | null; modulo_id: string } | null>(null);
  const [arquivoDialog, setArquivoDialog] = useState<{ data: Arquivo | null; aula_id: string } | null>(null);

  useEffect(() => {
    if (!loadingAdmin && !isAdmin) navigate("/aulas");
  }, [isAdmin, loadingAdmin, navigate]);

  const loadAll = async () => {
    const [c, m, a, f] = await Promise.all([
      supabase.from("aulas_cursos").select("*").order("order_index"),
      supabase.from("aulas_modulos").select("*").order("order_index"),
      supabase.from("aulas_aulas").select("*").order("order_index"),
      supabase.from("aulas_arquivos").select("*").order("order_index"),
    ]);
    setCursos(c.data ?? []);
    setModulos(m.data ?? []);
    setAulas(a.data ?? []);
    setArquivos(f.data ?? []);
  };

  useEffect(() => {
    if (isAdmin) loadAll();
  }, [isAdmin]);

  // ---------- CURSO ----------
  const saveCurso = async (c: Curso) => {
    const payload = {
      slug: c.slug || slugify(c.title),
      title: c.title,
      description: c.description || null,
      cover_url: c.cover_url || null,
      order_index: Number(c.order_index ?? 0),
      is_published: !!c.is_published,
    };
    const { error } = c.id
      ? await supabase.from("aulas_cursos").update(payload).eq("id", c.id)
      : await supabase.from("aulas_cursos").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Curso salvo");
    setCursoDialog(null);
    loadAll();
  };

  const deleteCurso = async (id: string) => {
    if (!confirm("Apagar curso e tudo dentro?")) return;
    const { error } = await supabase.from("aulas_cursos").delete().eq("id", id);
    if (error) return toast.error(error.message);
    loadAll();
  };

  // ---------- MÓDULO ----------
  const saveModulo = async (m: Modulo, curso_id: string) => {
    const payload = {
      curso_id,
      title: m.title,
      description: m.description || null,
      cover_url: m.cover_url || null,
      order_index: Number(m.order_index ?? 0),
    };
    const { error } = m.id
      ? await supabase.from("aulas_modulos").update(payload).eq("id", m.id)
      : await supabase.from("aulas_modulos").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Módulo salvo");
    setModuloDialog(null);
    loadAll();
  };

  const deleteModulo = async (id: string) => {
    if (!confirm("Apagar módulo e suas aulas?")) return;
    const { error } = await supabase.from("aulas_modulos").delete().eq("id", id);
    if (error) return toast.error(error.message);
    loadAll();
  };

  // ---------- AULA ----------
  const saveAula = async (a: Aula, modulo_id: string) => {
    const payload = {
      modulo_id,
      title: a.title,
      description: a.description || null,
      youtube_url: a.youtube_url || null,
      duration_minutes: a.duration_minutes ? Number(a.duration_minutes) : null,
      cover_url: a.cover_url || null,
      order_index: Number(a.order_index ?? 0),
      is_published: !!a.is_published,
    };
    const { error } = a.id
      ? await supabase.from("aulas_aulas").update(payload).eq("id", a.id)
      : await supabase.from("aulas_aulas").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Aula salva");
    setAulaDialog(null);
    loadAll();
  };

  const deleteAula = async (id: string) => {
    if (!confirm("Apagar aula?")) return;
    const { error } = await supabase.from("aulas_aulas").delete().eq("id", id);
    if (error) return toast.error(error.message);
    loadAll();
  };

  // ---------- ARQUIVO ----------
  const saveArquivo = async (f: Arquivo, aula_id: string) => {
    const payload = {
      aula_id,
      title: f.title,
      file_url: f.file_url,
      file_size_kb: f.file_size_kb ? Number(f.file_size_kb) : null,
      order_index: Number(f.order_index ?? 0),
    };
    const { error } = f.id
      ? await supabase.from("aulas_arquivos").update(payload).eq("id", f.id)
      : await supabase.from("aulas_arquivos").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Arquivo salvo");
    setArquivoDialog(null);
    loadAll();
  };

  const deleteArquivo = async (id: string) => {
    if (!confirm("Apagar arquivo?")) return;
    const { error } = await supabase.from("aulas_arquivos").delete().eq("id", id);
    if (error) return toast.error(error.message);
    loadAll();
  };

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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link to="/aulas" className="mb-1 inline-flex items-center gap-1 text-xs text-white/60 hover:text-white">
              <ChevronLeft className="h-3 w-3" /> Voltar
            </Link>
            <h1 className="font-montserrat text-2xl font-bold">Admin — Aulas</h1>
            <p className="text-sm text-white/50">Gerencie cursos, módulos, aulas e arquivos.</p>
          </div>
          <Button onClick={() => setCursoDialog({})} className="bg-amber-500 text-black hover:bg-amber-400">
            <Plus className="mr-1.5 h-4 w-4" /> Novo curso
          </Button>
        </div>

        {cursos.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-10 text-center text-white/50">
            Nenhum curso ainda. Crie o primeiro.
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-3">
            {cursos.map((c) => {
              const mods = modulos.filter((m) => m.curso_id === c.id);
              return (
                <AccordionItem
                  key={c.id}
                  value={c.id}
                  className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.03]"
                >
                  <div className="flex items-center gap-2 px-4">
                    <AccordionTrigger className="flex-1 py-4 hover:no-underline">
                      <div className="flex flex-col items-start text-left">
                        <span className="font-semibold text-white">
                          {c.title}{" "}
                          {!c.is_published && (
                            <span className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase text-white/60">
                              rascunho
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-white/40">
                          /{c.slug} • {mods.length} módulos
                        </span>
                      </div>
                    </AccordionTrigger>
                    <Button size="sm" variant="ghost" onClick={() => setCursoDialog(c)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteCurso(c.id)}>
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>

                  <AccordionContent className="space-y-3 border-t border-white/5 bg-black/30 px-4 py-4">
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setModuloDialog({ data: null, curso_id: c.id })}
                        className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                      >
                        <Plus className="mr-1.5 h-3 w-3" /> Módulo
                      </Button>
                    </div>

                    {mods.length === 0 && (
                      <p className="py-4 text-center text-sm text-white/40">Sem módulos.</p>
                    )}

                    <Accordion type="multiple" className="space-y-2">
                      {mods.map((m) => {
                        const auls = aulas.filter((a) => a.modulo_id === m.id);
                        return (
                          <AccordionItem
                            key={m.id}
                            value={m.id}
                            className="overflow-hidden rounded-lg border border-white/5 bg-white/[0.03]"
                          >
                            <div className="flex items-center gap-2 px-3">
                              <AccordionTrigger className="flex-1 py-3 hover:no-underline">
                                <div className="flex flex-col items-start text-left">
                                  <span className="font-medium text-white">{m.title}</span>
                                  <span className="text-xs text-white/40">{auls.length} aulas</span>
                                </div>
                              </AccordionTrigger>
                              <Button size="sm" variant="ghost" onClick={() => setModuloDialog({ data: m, curso_id: c.id })}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => deleteModulo(m.id)}>
                                <Trash2 className="h-4 w-4 text-red-400" />
                              </Button>
                            </div>

                            <AccordionContent className="space-y-2 border-t border-white/5 bg-black/40 px-3 py-3">
                              <div className="flex justify-end">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setAulaDialog({ data: null, modulo_id: m.id })}
                                  className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                                >
                                  <Plus className="mr-1.5 h-3 w-3" /> Aula
                                </Button>
                              </div>

                              {auls.length === 0 && (
                                <p className="py-3 text-center text-xs text-white/40">Sem aulas.</p>
                              )}

                              {auls.map((a) => {
                                const arqs = arquivos.filter((x) => x.aula_id === a.id);
                                return (
                                  <div key={a.id} className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
                                    <div className="flex items-start gap-2">
                                      <div className="flex-1">
                                        <p className="font-medium text-white">
                                          {a.title}{" "}
                                          {!a.is_published && (
                                            <span className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase text-white/60">
                                              rascunho
                                            </span>
                                          )}
                                        </p>
                                        <p className="text-xs text-white/40">
                                          {a.youtube_url ? "🎬 YouTube" : "Sem vídeo"} • {arqs.length} arquivos
                                        </p>
                                      </div>
                                      <Button size="sm" variant="ghost" onClick={() => setAulaDialog({ data: a, modulo_id: m.id })}>
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                      <Button size="sm" variant="ghost" onClick={() => deleteAula(a.id)}>
                                        <Trash2 className="h-4 w-4 text-red-400" />
                                      </Button>
                                    </div>

                                    <div className="mt-3 space-y-1.5 border-t border-white/5 pt-3">
                                      <div className="flex items-center justify-between">
                                        <p className="text-xs uppercase tracking-wider text-white/40">Arquivos</p>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-7 text-xs"
                                          onClick={() => setArquivoDialog({ data: null, aula_id: a.id })}
                                        >
                                          <Plus className="mr-1 h-3 w-3" /> Anexar
                                        </Button>
                                      </div>
                                      {arqs.map((f) => (
                                        <div key={f.id} className="flex items-center gap-2 rounded bg-white/[0.03] px-2 py-1.5 text-sm">
                                          <FileText className="h-4 w-4 text-white/40" />
                                          <span className="flex-1 truncate">{f.title}</span>
                                          <Button size="sm" variant="ghost" className="h-7" onClick={() => setArquivoDialog({ data: f, aula_id: a.id })}>
                                            <Pencil className="h-3 w-3" />
                                          </Button>
                                          <Button size="sm" variant="ghost" className="h-7" onClick={() => deleteArquivo(f.id)}>
                                            <Trash2 className="h-3 w-3 text-red-400" />
                                          </Button>
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
      </main>

      {/* CURSO DIALOG */}
      {cursoDialog !== null && (
        <CursoForm data={cursoDialog} onSave={saveCurso} onClose={() => setCursoDialog(null)} />
      )}
      {moduloDialog !== null && (
        <ModuloForm
          data={moduloDialog.data}
          curso_id={moduloDialog.curso_id}
          onSave={saveModulo}
          onClose={() => setModuloDialog(null)}
        />
      )}
      {aulaDialog !== null && (
        <AulaForm
          data={aulaDialog.data}
          modulo_id={aulaDialog.modulo_id}
          onSave={saveAula}
          onClose={() => setAulaDialog(null)}
        />
      )}
      {arquivoDialog !== null && (
        <ArquivoForm
          data={arquivoDialog.data}
          aula_id={arquivoDialog.aula_id}
          onSave={saveArquivo}
          onClose={() => setArquivoDialog(null)}
        />
      )}
    </div>
  );
}

// --------- FORMS ---------

function CursoForm({ data, onSave, onClose }: any) {
  const [f, setF] = useState<any>(data ?? {});
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{f.id ? "Editar curso" : "Novo curso"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div><Label>Título</Label><Input value={f.title ?? ""} onChange={(e) => setF({ ...f, title: e.target.value })} /></div>
          <div><Label>Slug (URL)</Label><Input value={f.slug ?? ""} onChange={(e) => setF({ ...f, slug: e.target.value })} placeholder="auto se vazio" /></div>
          <div><Label>Descrição</Label><Textarea value={f.description ?? ""} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
          <FileUploader label="Capa" value={f.cover_url ?? ""} onChange={(url) => setF({ ...f, cover_url: url })} accept="image/*" folder="capas" />
          <div><Label>Ordem</Label><Input type="number" value={f.order_index ?? 0} onChange={(e) => setF({ ...f, order_index: e.target.value })} /></div>
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{f.id ? "Editar módulo" : "Novo módulo"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div><Label>Título</Label><Input value={f.title ?? ""} onChange={(e) => setF({ ...f, title: e.target.value })} /></div>
          <div><Label>Descrição</Label><Textarea value={f.description ?? ""} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
          <FileUploader label="Capa" value={f.cover_url ?? ""} onChange={(url) => setF({ ...f, cover_url: url })} accept="image/*" folder="capas" />
          <div><Label>Ordem</Label><Input type="number" value={f.order_index ?? 0} onChange={(e) => setF({ ...f, order_index: e.target.value })} /></div>
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
        <DialogHeader>
          <DialogTitle>{f.id ? "Editar aula" : "Nova aula"}</DialogTitle>
        </DialogHeader>
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
        <DialogHeader>
          <DialogTitle>{f.id ? "Editar arquivo" : "Novo arquivo"}</DialogTitle>
        </DialogHeader>
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
