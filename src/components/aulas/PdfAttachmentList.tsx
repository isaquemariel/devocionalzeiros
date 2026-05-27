import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import type { Arquivo } from "@/hooks/useAulas";
import { getAulasToken } from "@/lib/aulasAuth";

interface Props {
  arquivos: Arquivo[];
}

function formatSize(kb: number | null) {
  if (!kb) return "";
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

const FN_BASE = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

async function getSignedUrl(arquivoId: string): Promise<string> {
  const token = getAulasToken();
  if (!token) throw new Error("Sessão expirada. Faça login novamente.");
  const res = await fetch(`${FN_BASE}/aulas-file-signed-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: ANON,
      Authorization: `Bearer ${ANON}`,
      "x-aulas-token": token,
    },
    body: JSON.stringify({ arquivo_id: arquivoId }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.url) {
    throw new Error(data?.error || "Não foi possível gerar o link do arquivo.");
  }
  return data.url as string;
}

export function PdfAttachmentList({ arquivos }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (arquivos.length === 0) {
    return (
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center text-sm text-white/50">
        Nenhum arquivo anexado a esta aula.
      </div>
    );
  }

  const open = async (id: string, mode: "view" | "download") => {
    try {
      setLoadingId(`${id}:${mode}`);
      const url = await getSignedUrl(id);
      if (mode === "view") {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        // Force download via anchor
        const a = document.createElement("a");
        a.href = url;
        a.rel = "noopener noreferrer";
        a.click();
      }
    } catch (e: any) {
      toast({ title: "Erro", description: e.message ?? "Falha ao abrir arquivo.", variant: "destructive" });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <ul className="space-y-2">
      {arquivos.map((a) => {
        const viewLoading = loadingId === `${a.id}:view`;
        const dlLoading = loadingId === `${a.id}:download`;
        return (
          <li
            key={a.id}
            className="flex flex-col gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-red-400">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-white">{a.title}</p>
                {a.file_size_kb && (
                  <p className="text-xs text-white/50">PDF • {formatSize(a.file_size_kb)}</p>
                )}
              </div>
            </div>

            <div className="flex flex-shrink-0 gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={viewLoading || dlLoading}
                onClick={() => open(a.id, "view")}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                {viewLoading ? (
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                ) : (
                  <ExternalLink className="mr-1.5 h-4 w-4" />
                )}
                Visualizar
              </Button>
              <Button
                size="sm"
                disabled={viewLoading || dlLoading}
                onClick={() => open(a.id, "download")}
                className="bg-amber-500 text-black hover:bg-amber-400"
              >
                {dlLoading ? (
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-1.5 h-4 w-4" />
                )}
                Baixar
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
