import { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";

interface DevotionalData {
  title: string;
  verse: string;
  meditation: string;
  date: Date;
}

export const useShareDevotional = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const generateImage = useCallback(async (): Promise<string | null> => {
    if (!cardRef.current) {
      toast.error("Erro ao gerar imagem");
      return null;
    }

    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 1,
        cacheBust: true,
      });
      setImagePreview(dataUrl);
      return dataUrl;
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Erro ao gerar imagem. Tente novamente.");
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const downloadImage = useCallback(async () => {
    let dataUrl = imagePreview;
    
    if (!dataUrl) {
      dataUrl = await generateImage();
    }

    if (!dataUrl) return;

    const link = document.createElement("a");
    link.download = `devocional-${new Date().toISOString().split("T")[0]}.png`;
    link.href = dataUrl;
    link.click();
    
    toast.success("Imagem baixada! Poste nos Stories do Instagram 📸");
  }, [imagePreview, generateImage]);

  const shareToWhatsApp = useCallback(async () => {
    let dataUrl = imagePreview;
    
    if (!dataUrl) {
      dataUrl = await generateImage();
    }

    if (!dataUrl) return;

    // Check if native share is available (mobile)
    if (navigator.share && navigator.canShare) {
      try {
        // Convert base64 to blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], "devocional.png", { type: "image/png" });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Devocional do Dia",
            text: "Confira o devocional de hoje! 🙏\n\nAcesse: devocionalzeiros.com.br",
          });
          toast.success("Compartilhado com sucesso!");
          return;
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Share failed:", error);
        }
      }
    }

    // Fallback: Download and open WhatsApp
    const link = document.createElement("a");
    link.download = `devocional-${new Date().toISOString().split("T")[0]}.png`;
    link.href = dataUrl;
    link.click();

    // Open WhatsApp with text
    const whatsappText = encodeURIComponent(
      "Confira o devocional de hoje! 🙏\n\nAcesse: devocionalzeiros.com.br"
    );
    
    setTimeout(() => {
      window.open(`https://wa.me/?text=${whatsappText}`, "_blank");
      toast.success("Imagem baixada! Anexe no WhatsApp 📱");
    }, 500);
  }, [imagePreview, generateImage]);

  return {
    cardRef,
    isGenerating,
    imagePreview,
    generateImage,
    downloadImage,
    shareToWhatsApp,
    setImagePreview,
  };
};
