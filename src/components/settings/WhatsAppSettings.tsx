import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const COUNTRY_CODES = [
  { code: "+55",  flag: "🇧🇷", country: "BR", maxDigits: 11, placeholder: "(11) 99999-9999" },
  { code: "+1",   flag: "🇺🇸", country: "US", maxDigits: 10, placeholder: "(555) 555-5555" },
  { code: "+351", flag: "🇵🇹", country: "PT", maxDigits: 9,  placeholder: "912 345 678" },
  { code: "+34",  flag: "🇪🇸", country: "ES", maxDigits: 9,  placeholder: "612 345 678" },
  { code: "+39",  flag: "🇮🇹", country: "IT", maxDigits: 10, placeholder: "312 345 6789" },
  { code: "+44",  flag: "🇬🇧", country: "UK", maxDigits: 10, placeholder: "7911 123456" },
  { code: "+33",  flag: "🇫🇷", country: "FR", maxDigits: 9,  placeholder: "06 12 34 56 78" },
  { code: "+49",  flag: "🇩🇪", country: "DE", maxDigits: 11, placeholder: "1512 3456789" },
  { code: "+54",  flag: "🇦🇷", country: "AR", maxDigits: 10, placeholder: "11 1234-5678" },
  { code: "+56",  flag: "🇨🇱", country: "CL", maxDigits: 9,  placeholder: "9 1234 5678" },
  { code: "+57",  flag: "🇨🇴", country: "CO", maxDigits: 10, placeholder: "312 345 6789" },
  { code: "+52",  flag: "🇲🇽", country: "MX", maxDigits: 10, placeholder: "55 1234 5678" },
  { code: "+595", flag: "🇵🇾", country: "PY", maxDigits: 9,  placeholder: "961 456789" },
  { code: "+598", flag: "🇺🇾", country: "UY", maxDigits: 8,  placeholder: "94 123 456" },
];

interface WhatsAppSettingsProps {
  onClose: () => void;
}

export function WhatsAppSettings({ onClose }: WhatsAppSettingsProps) {
  const { user } = useAuth();
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadSettings();
    }
  }, [user]);

  const loadSettings = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("whatsapp_phone, whatsapp_enabled, whatsapp_terms_accepted_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPhone(data.whatsapp_phone || "");
        setIsEnabled(data.whatsapp_enabled || false);
        setTermsAccepted(!!data.whatsapp_terms_accepted_at);
      }
    } catch (error) {
      console.error("Error loading WhatsApp settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSave = async () => {
    if (!user) return;

    if (!termsAccepted) {
      toast.error("Você precisa aceitar os termos para continuar");
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      toast.error("Número de telefone inválido");
      return;
    }

    setIsSaving(true);
    try {
      const fullPhone = `55${phoneDigits}`;
      
      const { error } = await supabase
        .from("profiles")
        .update({
          whatsapp_phone: fullPhone,
          whatsapp_enabled: true,
          whatsapp_terms_accepted_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Notificações via WhatsApp ativadas!");
      setIsEnabled(true);
      onClose();
    } catch (error) {
      console.error("Error saving WhatsApp settings:", error);
      toast.error("Erro ao salvar configurações");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDisable = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          whatsapp_enabled: false,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Notificações via WhatsApp desativadas");
      setIsEnabled(false);
      onClose();
    } catch (error) {
      console.error("Error disabling WhatsApp:", error);
      toast.error("Erro ao desativar notificações");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-green-500/20">
          <MessageCircle className="w-6 h-6 text-green-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Notificações via WhatsApp
          </h3>
          <p className="text-sm text-muted-foreground">
            Receba lembretes diários para sua leitura bíblica
          </p>
        </div>
      </div>

      {isEnabled ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-green-600 dark:text-green-400">
              Notificações ativadas para {phone}
            </span>
          </div>
          
          <Button
            variant="outline"
            onClick={handleDisable}
            disabled={isSaving}
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            {isSaving ? "Desativando..." : "Desativar notificações"}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">
              Número do WhatsApp
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={handlePhoneChange}
                className="pl-10"
                maxLength={16}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Apenas números brasileiros (+55)
            </p>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              className="mt-0.5"
            />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
            >
              Autorizo o envio de mensagens via WhatsApp com lembretes sobre minha
              leitura bíblica. Posso cancelar a qualquer momento.
            </label>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !termsAccepted || !phone}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isSaving ? "Salvando..." : "Ativar"}
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
