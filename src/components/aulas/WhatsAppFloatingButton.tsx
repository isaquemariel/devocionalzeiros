import { MessageCircle } from "lucide-react";
import { SUPPORT_WHATSAPP_URL } from "@/lib/aulasAuth";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={SUPPORT_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Suporte via WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg shadow-green-900/40 transition hover:scale-105 hover:bg-green-500"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
