import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Curso = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  order_index: number;
  is_published: boolean;
};

export type Modulo = {
  id: string;
  curso_id: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  order_index: number;
};

export type Aula = {
  id: string;
  modulo_id: string;
  title: string;
  description: string | null;
  youtube_url: string | null;
  duration_minutes: number | null;
  cover_url: string | null;
  order_index: number;
  is_published: boolean;
};

export type Arquivo = {
  id: string;
  aula_id: string;
  title: string;
  file_url: string;
  file_size_kb: number | null;
  order_index: number;
};

export function useCursos(isAdmin = false) {
  return useQuery({
    queryKey: ["aulas-cursos", isAdmin],
    queryFn: async () => {
      if (isAdmin) {
        const { aulasAuth } = await import("@/lib/aulasAuth");
        const r = await aulasAuth.adminCall("list_cursos");
        return (r.items ?? []) as Curso[];
      }
      const { data, error } = await supabase
        .from("aulas_cursos")
        .select("*")
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data as Curso[];
    },
  });
}

export function useCursoCompleto(slug: string) {
  return useQuery({
    queryKey: ["aulas-curso", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data: curso, error: e1 } = await supabase
        .from("aulas_cursos")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (e1) throw e1;
      if (!curso) return null;

      const { data: modulos, error: e2 } = await supabase
        .from("aulas_modulos")
        .select("*")
        .eq("curso_id", curso.id)
        .order("order_index", { ascending: true });
      if (e2) throw e2;

      const modIds = (modulos ?? []).map((m) => m.id);
      let aulas: Aula[] = [];
      if (modIds.length > 0) {
        const { data: aulasData, error: e3 } = await supabase
          .from("aulas_aulas")
          .select("*")
          .in("modulo_id", modIds)
          .order("order_index", { ascending: true });
        if (e3) throw e3;
        aulas = (aulasData ?? []) as Aula[];
      }

      return {
        curso: curso as Curso,
        modulos: (modulos ?? []) as Modulo[],
        aulas,
      };
    },
  });
}

export function useAula(aulaId: string) {
  return useQuery({
    queryKey: ["aulas-aula", aulaId],
    enabled: !!aulaId,
    queryFn: async () => {
      const { data: aula, error } = await supabase
        .from("aulas_aulas")
        .select("*")
        .eq("id", aulaId)
        .maybeSingle();
      if (error) throw error;
      if (!aula) return null;

      const [{ data: arquivos }, { data: modulo }] = await Promise.all([
        supabase
          .from("aulas_arquivos")
          .select("*")
          .eq("aula_id", aulaId)
          .order("order_index", { ascending: true }),
        supabase
          .from("aulas_modulos")
          .select("*, curso:aulas_cursos(*)")
          .eq("id", aula.modulo_id)
          .maybeSingle(),
      ]);

      // siblings for prev/next
      const { data: siblings } = await supabase
        .from("aulas_aulas")
        .select("id, title, order_index")
        .eq("modulo_id", aula.modulo_id)
        .eq("is_published", true)
        .order("order_index", { ascending: true });

      return {
        aula: aula as Aula,
        arquivos: (arquivos ?? []) as Arquivo[],
        modulo: modulo as any,
        siblings: (siblings ?? []) as { id: string; title: string; order_index: number }[],
      };
    },
  });
}
