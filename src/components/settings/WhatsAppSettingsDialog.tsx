import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WhatsAppSettings } from "./WhatsAppSettings";

interface WhatsAppSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WhatsAppSettingsDialog({
  open,
  onOpenChange,
}: WhatsAppSettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">Configurações do WhatsApp</DialogTitle>
        </DialogHeader>
        <WhatsAppSettings onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
