import { SUPPORT_WHATSAPP_URL } from "@/lib/aulasAuth";
import { HelpCircle } from "lucide-react";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={SUPPORT_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Preciso de Ajuda"
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-black shadow-lg transition hover:scale-110 hover:bg-amber-400"
    >
      <HelpCircle className="h-6 w-6" />
    </a>
  );
}
