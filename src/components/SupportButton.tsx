import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_SUPPORT_URL = "https://wa.me/+5584998982478?text=Oii%2C%20equipe.%20Preciso%20de%20suporte.%20";

export const SupportButton = () => {
  const handleClick = () => {
    window.open(WHATSAPP_SUPPORT_URL, "_blank");
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium shadow-lg transition-colors"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-4 h-4" />
      <span className="hidden sm:inline">Suporte</span>
    </motion.button>
  );
};

export const SUPPORT_URL = WHATSAPP_SUPPORT_URL;
