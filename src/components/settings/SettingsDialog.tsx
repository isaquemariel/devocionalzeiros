import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Volume2, VolumeX, User, Lock, Mail, Loader2, Shield, Crown, Trophy, FileText, Trash2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useSoundContext } from "@/contexts/SoundContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const { isAdmin } = useAdminCheck();
  const { planType } = useUserPlan(user?.email);
  const { soundEnabled, setSoundEnabled } = useSoundContext();
  
  // Admin access: either has admin role in user_roles OR has 'admin' plan type
  const hasAdminAccess = isAdmin || planType === 'admin';
  
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // Sync fullName when dialog opens or profile changes
  useEffect(() => {
    if (open && profile?.full_name) {
      setFullName(profile.full_name);
    }
  }, [open, profile?.full_name]);

  const handleGoToAdmin = () => {
    onOpenChange(false);
    navigate("/adminhd");
  };

  const handleSaveName = async () => {
    if (!fullName.trim()) {
      toast.error("Nome não pode estar vazio");
      return;
    }
    
    setIsSavingName(true);
    try {
      const { error } = await updateProfile({ full_name: fullName.trim() });
      if (error) throw error;
      toast.success("Nome atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar nome");
    } finally {
      setIsSavingName(false);
    }
  };

  const handleSavePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Preencha todos os campos de senha");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    
    setIsSavingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast.success("Senha atualizada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar senha");
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Configurações</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Admin Section - Only for admins */}
          {hasAdminAccess && (
            <>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Administração
                </h3>
                <Button
                  onClick={handleGoToAdmin}
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto p-4 border-primary/30 hover:bg-primary/10"
                >
                  <Shield className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Painel Administrativo</p>
                    <p className="text-sm text-muted-foreground">
                      Gerenciar usuários e métricas
                    </p>
                  </div>
                </Button>
              </div>
              <Separator />
            </>
          )}

          {/* Achievements Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Gamificação
            </h3>
            <Button
              onClick={() => {
                onOpenChange(false);
                navigate("/conquistas");
              }}
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-4 border-primary/30 hover:bg-primary/10"
            >
              <Trophy className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="font-medium">Conquistas</p>
                <p className="text-sm text-muted-foreground">
                  Visualizar e resgatar pontos das conquistas
                </p>
              </div>
            </Button>
          </div>

          <Separator />

          {/* Plans Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Planos
            </h3>
            <Button
              onClick={() => {
                onOpenChange(false);
                navigate("/planos");
              }}
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-4 border-amber-500/30 hover:bg-amber-500/10"
            >
              <Crown className="w-5 h-5 text-amber-400" />
              <div className="text-left">
                <p className="font-medium">Comparar Planos</p>
                <p className="text-sm text-muted-foreground">
                  Veja todas as funcionalidades de cada plano
                </p>
              </div>
            </Button>
          </div>

          <Separator />
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Som
            </h3>
            <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-primary" />
                ) : (
                  <VolumeX className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium">Sons do App</p>
                  <p className="text-sm text-muted-foreground">
                    Efeitos sonoros de quiz e leitura
                  </p>
                </div>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
          </div>

          <Separator />

          {/* Privacy Policy */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Legal
            </h3>
            <Button
              onClick={() => {
                onOpenChange(false);
                navigate("/privacidade");
              }}
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-4 border-border/50 hover:bg-muted/10"
            >
              <FileText className="w-5 h-5 text-muted-foreground" />
              <div className="text-left">
                <p className="font-medium">Política de Privacidade</p>
                <p className="text-sm text-muted-foreground">
                  Leia nossa política de uso e privacidade
                </p>
              </div>
            </Button>
          </div>

          <Separator />

          {/* Profile Settings */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Perfil
            </h3>
            
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome completo
              </Label>
              <div className="flex gap-2">
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome"
                  className="flex-1"
                  maxLength={50}
                />
                <Button 
                  onClick={handleSaveName}
                  disabled={isSavingName || fullName === profile?.full_name}
                  size="sm"
                >
                  {isSavingName ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </div>
            </div>

            {/* Email (read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-mail
              </Label>
              <Input
                id="email"
                value={user?.email || ""}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                O e-mail não pode ser alterado
              </p>
            </div>
          </div>

          <Separator />

          {/* Password Settings */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Alterar Senha
            </h3>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Nova senha
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              
              <Button 
                onClick={handleSavePassword}
                disabled={isSavingPassword || !newPassword || !confirmPassword}
                className="w-full"
              >
                {isSavingPassword ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Atualizando...
                  </>
                ) : (
                  "Atualizar Senha"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
