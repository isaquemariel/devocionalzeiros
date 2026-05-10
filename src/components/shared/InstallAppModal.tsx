import { useState } from "react";
import { X, Download, Smartphone, MoreVertical, Share, PlusSquare, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstallAppModal = ({ isOpen, onClose }: InstallAppModalProps) => {
  const [tab, setTab] = useState<"android" | "iphone">("android");

  const steps = [
    { title: "Abra no seu navegador", desc: "Safari, Chrome, Firefox ou Edge (iOS 16.4+)", icon: <Smartphone className="w-4 h-4" /> },
    { title: "Toque no botão Compartilhar", desc: "Na barra inferior do Safari (ícone de quadrado com seta)", icon: <Share className="w-4 h-4" /> },
    { title: 'Role e toque em "Adicionar à Tela de Início"', desc: "Pode precisar rolar para baixo para encontrar", icon: <PlusSquare className="w-4 h-4" /> },
    { title: 'Confirme tocando em "Adicionar"', desc: "No canto superior direito da tela", icon: <Check className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-sm bg-[#faf8f4] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-3">
              <div className="flex items-center gap-2 text-amber-600">
                <Download className="w-5 h-5" />
                <h2 className="text-lg font-bold text-gray-900">Instalar o App</h2>
              </div>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-black/5 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="mx-5 mb-4 flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setTab("android")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all ${
                  tab === "android" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Android
              </button>
              <button
                onClick={() => setTab("iphone")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all ${
                  tab === "iphone" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                iPhone
              </button>
            </div>

            {/* Conteúdo */}
            {tab === "android" ? (
              <div className="px-5 pb-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">App oficial disponível na Play Store</p>
                    <p className="text-xs text-gray-500 mt-0.5">Baixe gratuitamente direto do Google Play e tenha a melhor experiência no Android.</p>
                  </div>
                </div>

                <a
                  href="https://play.google.com/store/apps/details?id=com.clubehd.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Baixar na Google Play
                </a>

                <p className="text-[11px] text-gray-400 text-center">
                  Ao tocar você será redirecionado para a Play Store.
                </p>
              </div>
            ) : (
              <>
                <div className="px-5 pb-3 space-y-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
                          {step.title}
                          <span className="text-gray-400">{step.icon}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-5 pb-5 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-600 text-sm">Pronto!</p>
                      <p className="text-xs text-gray-500 mt-0.5">O app aparecerá na sua tela inicial como um aplicativo normal</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallAppModal;
