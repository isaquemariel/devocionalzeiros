import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CommunityOnboardingProps {
  userId: string;
  initialName: string | null;
  initialAvatarUrl: string | null;
  onComplete: (name: string, avatarUrl: string) => void;
}

export function CommunityOnboarding({
  userId,
  initialName,
  initialAvatarUrl,
  onComplete,
}: CommunityOnboardingProps) {
  const [name, setName] = useState(initialName || "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl);
  const [saving, setSaving] = useState(false);

  const trimmed = name.trim();
  const isValid = trimmed.length >= 2 && !!avatarUrl;

  const handleConfirm = async () => {
    if (!isValid) {
      toast.error("Adicione seu nome e uma foto de perfil para entrar.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: trimmed })
        .eq("user_id", userId);
      if (error) throw error;
      onComplete(trimmed, avatarUrl!);
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background/80 to-background p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.15)]">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">
          <Users className="w-3.5 h-3.5" />
          Entrar na Comunidade
        </div>

        <div className="text-center mt-3 mb-6">
          <h2 className="text-2xl font-bold mb-2">Confirme seu perfil</h2>
          <p className="text-sm text-muted-foreground">
            Para participar da Comunidade, precisamos identificar você com nome e foto.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-6">
          <AvatarUpload
            userId={userId}
            currentAvatarUrl={avatarUrl}
            size="lg"
            onAvatarChange={setAvatarUrl}
          />
          <p className="text-xs text-muted-foreground text-center">
            Toque na foto para {avatarUrl ? "alterar" : "adicionar"}
          </p>
        </div>

        <div className="space-y-2 mb-6">
          <Label htmlFor="community-name">Seu nome</Label>
          <Input
            id="community-name"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 60))}
            placeholder="Como devem te chamar?"
            className="bg-background/50"
          />
        </div>

        <Button
          onClick={handleConfirm}
          disabled={!isValid || saving}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {saving ? "Salvando..." : "Entrar na Comunidade"}
        </Button>
      </div>
    </motion.div>
  );
}
