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

function formatPhone(value: string, countryCode: string, maxDigits: number): string {
  const digits = value.replace(/\D/g, "").slice(0, maxDigits);
  if (countryCode === "+55") {
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }
  if (countryCode === "+1") {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return digits;
}

interface WhatsAppSettingsProps {
  onClose: () => void;
}

export function WhatsAppSettings({ onClose }: WhatsAppSettingsProps) {
  const { user } = useAuth();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+55");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentCountry = COUNTRY_CODES.find(c => c.code === countryCode) ?? COUNTRY_CODES[0];

  useEffect(() => {
    if (user) loadSettings();
  }, [user]);

  // Reset phone when country changes
  useEffect(() => {
    setPhone("");
  }, [countryCode]);

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
        if (data.whatsapp_phone) {
          // Try to detect country code from stored E.164 number
          const stored = data.whatsapp_phone;
          const match = COUNTRY_CODES.find(c => stored.startsWith(c.code.replace("+", "")));
          if (match) {
            setCountryCode(match.code);
            setPhone(stored.slice(match.code.replace("+", "").length));
          } else {
            setPhone(stored);
          }
        }
        setIsEnabled(data.whatsapp_enabled || false);
        setTermsAccepted(!!data.whatsapp_terms_accepted_at);
      }
    } catch (error) {
      console.error("Error loading WhatsApp settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value, countryCode, currentCountry.maxDigits));
  };

  const handleSave = async () => {
    if (!user) return;
    if (!termsAccepted) {
      toast.error("Você precisa aceitar os termos para continuar");
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 5) {
      toast.error("Número de telefone inválido");
      return;
    }
    setIsSaving(true);
    try {
      const fullPhone = `${countryCode.replace("+", "")}${digits}`;
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
        .update({ whatsapp_enabled: false })
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
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
          <h3 className="text-lg font-semibold text-foreground">Notificações via WhatsApp</h3>
          <p className="text-sm text-muted-foreground">Receba lembretes diários para sua leitura bíblica</p>
        </div>
      </div>

      {isEnabled ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-sm text-foreground">Notificações ativas</span>
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
            <Label htmlFor="wa-phone" className="text-foreground">Número do WhatsApp</Label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
                className="py-2 pl-2 pr-1 rounded-md border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring cursor-pointer min-w-[90px]"
              >
                {COUNTRY_CODES.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="wa-phone"
                  type="tel"
                  placeholder={currentCountry.placeholder}
                  value={phone}
                  onChange={handlePhoneChange}
                  className="pl-9"
                  maxLength={currentCountry.maxDigits + 4}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Selecione seu país e insira o número sem o código internacional
            </p>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50">
            <Checkbox
              id="wa-terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              className="mt-0.5"
            />
            <label htmlFor="wa-terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
              Autorizo o envio de mensagens via WhatsApp com lembretes sobre minha leitura bíblica. Posso cancelar a qualquer momento.
            </label>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !termsAccepted || !phone}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {isSaving ? "Salvando..." : "Ativar"}
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
