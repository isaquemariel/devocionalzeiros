import { toast } from "sonner";
import { Capacitor } from "@capacitor/core";

type WebSharePayload = {
  files?: File[];
  title?: string;
  text?: string;
  url?: string;
};

type WebShareNavigator = Navigator & {
  canShare?: (data?: WebSharePayload) => boolean;
  share?: (data: WebSharePayload) => Promise<void>;
};

const isNative = () => {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
};

// Verifica se o plugin nativo está realmente registrado no build (APK/IPA).
// Se o app foi publicado sem rodar `npx cap sync`, o plugin pode não existir
// e chamá-lo lança "not implemented" — nesse caso preferimos o fallback web.
const pluginAvailable = (name: string) => {
  try {
    return Capacitor.isPluginAvailable(name);
  } catch {
    return false;
  }
};

const isCancel = (err: unknown) =>
  ((err as Error)?.message?.toLowerCase?.().includes("cancel")) ?? false;

const dataUrlToBlob = async (dataUrl: string) => {
  if (!dataUrl.startsWith("data:")) {
    const res = await fetch(dataUrl);
    if (!res.ok) throw new Error("Não foi possível carregar a imagem");
    return await res.blob();
  }

  const [header, base64Data] = dataUrl.split(",");
  if (!base64Data) throw new Error("Imagem inválida");

  const mimeMatch = header.match(/^data:([^;]+);base64$/);
  const mime = mimeMatch?.[1] || "image/png";
  const binary = atob(base64Data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: mime });
};

const dataUrlToBase64 = (dataUrl: string) => {
  const idx = dataUrl.indexOf(",");
  return idx >= 0 ? dataUrl.slice(idx + 1) : dataUrl;
};

const getWebShareNavigator = (): WebShareNavigator | null => {
  if (typeof navigator === "undefined") return null;
  const webNavigator = navigator as WebShareNavigator;
  return webNavigator.canShare && webNavigator.share ? webNavigator : null;
};

/**
 * Baixa a imagem. Em Android/iOS nativo (Capacitor) salva no armazenamento
 * do dispositivo via Filesystem plugin. Em navegador comum usa <a download>
 * com blob URL. Se `<a download>` não funcionar (WebView antigo), cai para
 * navigator.share como fallback para o usuário poder salvar.
 */
export async function downloadImageSmart(dataUrl: string, filename: string) {
  if (!dataUrl) return;

  // Nativo (Capacitor Android/iOS) — só se o plugin Filesystem existir no build.
  if (isNative() && pluginAvailable("Filesystem")) {
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
      // Não recorre a shareImageSmart (evita loop); cai para o caminho web abaixo.
      console.error("Native save failed, falling back to web:", err);
    }
  }

  // Web / PWA: no mobile, o download direto pode ser bloqueado por WebView.
  // Nesses casos abrimos primeiro a folha nativa de compartilhamento com o
  // arquivo, que permite salvar a imagem no dispositivo.
  const webShareNavigator = getWebShareNavigator();
  if (webShareNavigator) {
    try {
      const blob = await dataUrlToBlob(dataUrl);
      const file = new File([blob], filename, { type: blob.type || "image/png" });
      if (webShareNavigator.canShare?.({ files: [file] })) {
        await webShareNavigator.share?.({ files: [file] });
        return;
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      console.error("Native web save sheet failed:", err);
    }
  }

  // Web desktop / fallback
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
    try {
      const imageWindow = window.open(dataUrl, "_blank", "noopener,noreferrer");
      if (imageWindow) {
        toast.message("Imagem aberta — toque e segure para salvar 📸");
        return;
      }
    } catch {
      // mantém o toast de erro abaixo
    }
    toast.error("Erro ao baixar imagem");
  }
}

/**
 * Compartilha a imagem. Envia SOMENTE o arquivo (sem `text`), porque o
 * WhatsApp Android prioriza o texto e descarta a imagem quando ambos são
 * enviados juntos. O usuário digita a mensagem no chat.
 */
export async function shareImageSmart(dataUrl: string, filename: string) {
  if (!dataUrl) return;

  // Nativo (Capacitor) — só se os plugins Share e Filesystem existirem no build.
  // Se o APK foi publicado sem `npx cap sync`, os plugins não estão registrados;
  // nesse caso pulamos direto para o fallback web em vez de falhar.
  if (isNative() && pluginAvailable("Share") && pluginAvailable("Filesystem")) {
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
        files: [written.uri],
        dialogTitle: "Compartilhar devocional",
      });
      return;
    } catch (err) {
      if (isCancel(err)) return; // usuário fechou a folha de compartilhamento
      // Não falha aqui: registra o erro real e cai para os fallbacks web/download.
      console.error("Native share failed, falling back to web/download:", err);
    }
  }

  // Web Share API com arquivo (mobile browsers / PWA)
  const webShareNavigator = getWebShareNavigator();
  if (webShareNavigator) {
    try {
      const blob = await dataUrlToBlob(dataUrl);
      const file = new File([blob], filename, { type: "image/png" });
      if (webShareNavigator.canShare?.({ files: [file] })) {
        // IMPORTANTE: NÃO enviar `text` ou `url` — WhatsApp descarta a imagem
        // quando há texto/link junto. Só o arquivo garante que a imagem vá.
        await webShareNavigator.share?.({ files: [file] });
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
