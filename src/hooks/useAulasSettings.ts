import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AulasSettings {
  id: number;
  banner_enabled: boolean;
  banner_image_url: string | null;
  banner_curso_id: string | null;
  banner_title_override: string | null;
  banner_subtitle_override: string | null;
}

export function useAulasSettings() {
  return useQuery({
    queryKey: ["aulas-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("aulas_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return (data ?? { id: 1, banner_enabled: false }) as AulasSettings;
    },
  });
}
