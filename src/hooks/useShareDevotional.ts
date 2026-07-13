import { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { downloadImageSmart, shareImageSmart } from "@/lib/shareImage";



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
      // Múltiplos frames garantem renderização completa antes da captura
      await new Promise((r) => setTimeout(r, 200));
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
        width: 1080,
        height: 1920,
        style: { opacity: "1" },
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
    if (!dataUrl) dataUrl = await generateImage();
    if (!dataUrl) return;
    const filename = `devocional-${new Date().toISOString().split("T")[0]}.png`;
    await downloadImageSmart(dataUrl, filename);
  }, [imagePreview, generateImage]);

  const shareToWhatsApp = useCallback(async () => {
    let dataUrl = imagePreview;
    if (!dataUrl) dataUrl = await generateImage();
    if (!dataUrl) return;
    const filename = `devocional-${new Date().toISOString().split("T")[0]}.png`;
    await shareImageSmart(dataUrl, filename);
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
