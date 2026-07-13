import { toast } from "sonner";
import { Capacitor } from "@capacitor/core";

const isNative = () => {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
};

const dataUrlToBlob = async (dataUrl: string) => {
  const res = await fetch(dataUrl);
  return await res.blob();
};

const dataUrlToBase64 = (dataUrl: string) => {
  const idx = dataUrl.indexOf(",");
  return idx >= 0 ? dataUrl.slice(idx + 1) : dataUrl;
};

/**
 * Baixa a imagem. Em Android/iOS nativo (Capacitor) salva no armazenamento
 * do dispositivo via Filesystem plugin. Em navegador comum usa <a download>
 * com blob URL. Se `<a download>` não funcionar (WebView antigo), cai para
 * navigator.share como fallback para o usuário poder salvar.
 */
export async function downloadImageSmart(dataUrl: string, filename: string) {
  if (!dataUrl) return;

  // Nativo (Capacitor Android/iOS)
  if (isNative()) {
    try {
      const { Filesystem, Directory } = await import("@capacitor/filesystem");
      const base64 = dataUrlToBase64(dataUrl);
      await Filesystem.writeFile({
        path: filename,
        data: base64,
        directory: Directory.Documents,
      });
      toast.success("Imagem salva em Documentos 📸");
      return;
    } catch (err) {
      console.error("Native save failed:", err);
      // Cai para share como fallback nativo
      try {
        await shareImageSmart(dataUrl, filename);
        return;
      } catch {}
      toast.error("Erro ao salvar imagem");
      return;
    }
  }

  // Web / PWA
  try {
    const blob = await dataUrlToBlob(dataUrl);
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.style.display = "none";
    link.download = filename;
    link.href = blobUrl;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, 200);
    toast.success("Imagem baixada! 📸");
  } catch (err) {
    console.error("Download error:", err);
    // Fallback: usa Web Share com arquivo (usuário escolhe salvar)
    try {
      await shareImageSmart(dataUrl, filename);
    } catch {
      toast.error("Erro ao baixar imagem");
    }
  }
}

/**
 * Compartilha a imagem. Envia SOMENTE o arquivo (sem `text`), porque o
 * WhatsApp Android prioriza o texto e descarta a imagem quando ambos são
 * enviados juntos. O usuário digita a mensagem no chat.
 */
export async function shareImageSmart(dataUrl: string, filename: string) {
  if (!dataUrl) return;

  // Nativo (Capacitor)
  if (isNative()) {
    try {
      const { Filesystem, Directory } = await import("@capacitor/filesystem");
      const { Share } = await import("@capacitor/share");
      const base64 = dataUrlToBase64(dataUrl);
      const written = await Filesystem.writeFile({
        path: filename,
        data: base64,
        directory: Directory.Cache,
      });
      await Share.share({
        title: "Devocional",
        url: written.uri,
        dialogTitle: "Compartilhar devocional",
      });
      return;
    } catch (err) {
      if ((err as Error)?.message?.toLowerCase?.().includes("cancel")) return;
      console.error("Native share failed:", err);
      toast.error("Erro ao compartilhar");
      return;
    }
  }

  // Web Share API com arquivo (mobile browsers / PWA)
  if (typeof navigator !== "undefined" && (navigator as any).canShare) {
    try {
      const blob = await dataUrlToBlob(dataUrl);
      const file = new File([blob], filename, { type: "image/png" });
      if ((navigator as any).canShare({ files: [file] })) {
        // IMPORTANTE: NÃO enviar `text` ou `url` — WhatsApp descarta a imagem
        // quando há texto/link junto. Só o arquivo garante que a imagem vá.
        await (navigator as any).share({ files: [file] });
        return;
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      console.error("Web share failed:", err);
    }
  }

  // Fallback desktop: baixa a imagem
  await downloadImageSmart(dataUrl, filename);
  toast.message("Imagem baixada — anexe manualmente no chat 📎");
}
