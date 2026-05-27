import { getYouTubeEmbedUrl } from "@/lib/youtubeUtils";

interface Props {
  url: string;
  title?: string;
}

export function YouTubePlayer({ url, title }: Props) {
  const embed = getYouTubeEmbedUrl(url);

  if (!embed) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-white/5 text-sm text-white/60">
        Link de vídeo inválido
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
      <iframe
        src={embed}
        title={title ?? "Aula"}
        className="absolute inset-0 h-full w-full"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
