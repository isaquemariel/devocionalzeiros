import { SUPPORT_WHATSAPP_URL } from "@/lib/aulasAuth";
import supportIcon from "@/assets/support-icon.png";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={SUPPORT_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Preciso de Ajuda"
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full transition hover:scale-110"
    >
      <img src={supportIcon} alt="Suporte" className="h-12 w-12 object-contain drop-shadow-[0_4px_12px_rgba(220,38,38,0.5)]" />
    </a>
  );
}
