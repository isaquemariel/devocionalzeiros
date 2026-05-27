import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink } from "lucide-react";
import type { Arquivo } from "@/hooks/useAulas";

interface Props {
  arquivos: Arquivo[];
}

function formatSize(kb: number | null) {
  if (!kb) return "";
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function PdfAttachmentList({ arquivos }: Props) {
  if (arquivos.length === 0) {
    return (
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center text-sm text-white/50">
        Nenhum arquivo anexado a esta aula.
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {arquivos.map((a) => (
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
            <Button asChild variant="outline" size="sm" className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <a href={a.file_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-4 w-4" />
                Visualizar
              </a>
            </Button>
            <Button asChild size="sm" className="bg-amber-500 text-black hover:bg-amber-400">
              <a href={a.file_url} download={a.title}>
                <Download className="mr-1.5 h-4 w-4" />
                Baixar
              </a>
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
