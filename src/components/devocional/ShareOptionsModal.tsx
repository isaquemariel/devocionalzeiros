import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  imagePreview: string | null;
  isGenerating: boolean;
  onShareWhatsApp: () => void;
  onDownload: () => void;
}

export const ShareOptionsModal: React.FC<ShareOptionsModalProps> = ({
  isOpen,
  onClose,
  imagePreview,
  isGenerating,
  onDownload,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          style={{ pointerEvents: "auto" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 sm:p-6 max-w-xs w-full shadow-2xl border border-white/10 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Compartilhar Devocional</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Preview */}
            <div className="mb-4 rounded-xl overflow-hidden bg-black/20 aspect-[9/16] max-h-[30vh] flex items-center justify-center mx-auto w-2/3">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center gap-3 h-full">
                  <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-white/60 text-xs">Gerando...</p>
                </div>
              ) : imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview do devocional"
                  className="max-w-full max-h-full object-contain mx-auto"
                />
              ) : (
                <p className="text-white/40 text-xs text-center">Gerando preview...</p>
              )}
            </div>

            {/* Download Button */}
            <Button
              onClick={onDownload}
              disabled={isGenerating || !imagePreview}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-5 h-5" />
              Baixar Imagem Devocional
            </Button>

            <p className="text-xs text-white/40 text-center mt-4">
              Baixe a imagem e compartilhe este devocional para abençoar a vida de alguém também.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
