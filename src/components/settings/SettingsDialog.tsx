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
import {
  Volume2, VolumeX, User, Lock, Mail, Loader2, Shield, Crown,
  Trophy, FileText, Trash2, AlertTriangle, MessageCircle
} from "lucide-react";
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
  
  const hasAdminAccess = isAdmin || planType === 'admin';
  
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

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
    } catch {
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
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast.success("Senha atualizada com sucesso!");
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
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Configurações</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-5 py-2">

          {/* Admin Section */}
          {hasAdminAccess && (
            <>
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Administração
                </h3>
                <Button
                  onClick={handleGoToAdmin}
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto p-3 border-primary/30 hover:bg-primary/10"
                >
                  <Shield className="w-5 h-5 text-primary shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="font-medium text-sm">Painel Administrativo</p>
                    <p className="text-xs text-muted-foreground truncate">
                      Gerenciar usuários e métricas
                    </p>
                  </div>
                </Button>
              </div>
              <Separator />
            </>
          )}

          {/* Gamification */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Gamificação
            </h3>
            <Button
              onClick={() => { onOpenChange(false); navigate("/conquistas"); }}
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-3 border-primary/30 hover:bg-primary/10"
            >
              <Trophy className="w-5 h-5 text-primary shrink-0" />
              <div className="text-left min-w-0">
                <p className="font-medium text-sm">Conquistas</p>
                <p className="text-xs text-muted-foreground truncate">
                  Visualizar e resgatar pontos
                </p>
              </div>
            </Button>
          </div>

          <Separator />

          {/* Plans */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Planos
            </h3>
            <Button
              onClick={() => { onOpenChange(false); navigate("/planos"); }}
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-3 border-amber-500/30 hover:bg-amber-500/10"
            >
              <Crown className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-left min-w-0">
                <p className="font-medium text-sm">Comparar Planos</p>
                <p className="text-xs text-muted-foreground truncate">
                  Veja as funcionalidades de cada plano
                </p>
              </div>
            </Button>
          </div>

          <Separator />

          {/* Community */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Comunidade
            </h3>
            <Button
              onClick={() => window.open("https://chat.whatsapp.com/G3RUHiKTrLh8mZFUDK2j5a", "_blank")}
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-3 border-green-600/40 hover:bg-green-600/10"
            >
              <MessageCircle className="w-5 h-5 text-green-500 shrink-0" />
              <div className="text-left min-w-0">
                <p className="font-medium text-sm">Grupo no WhatsApp</p>
                <p className="text-xs text-muted-foreground truncate">
                  Entre na nossa comunidade de devocionalzeiros
                </p>
              </div>
            </Button>
          </div>

          <Separator />

          {/* Sound */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Som
            </h3>
            <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 min-w-0">
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-primary shrink-0" />
                ) : (
                  <VolumeX className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="font-medium text-sm">Sons do App</p>
                  <p className="text-xs text-muted-foreground truncate">
                    Efeitos sonoros de quiz e leitura
                  </p>
                </div>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
                className="shrink-0 ml-3"
              />
            </div>
          </div>

          <Separator />

          {/* Legal */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Legal
            </h3>
            <Button
              onClick={() => { onOpenChange(false); navigate("/privacidade"); }}
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-3 border-border/50 hover:bg-muted/10"
            >
              <FileText className="w-5 h-5 text-muted-foreground shrink-0" />
              <div className="text-left min-w-0">
                <p className="font-medium text-sm">Política de Privacidade</p>
                <p className="text-xs text-muted-foreground truncate">
                  Leia nossa política de uso e privacidade
                </p>
              </div>
            </Button>
          </div>

          <Separator />

          {/* Profile */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Perfil
            </h3>
            
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 shrink-0" />
                Nome completo
              </Label>
              <div className="flex gap-2">
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome"
                  className="flex-1 min-w-0"
                  maxLength={50}
                />
                <Button 
                  onClick={handleSaveName}
                  disabled={isSavingName || fullName === profile?.full_name}
                  size="sm"
                  className="shrink-0"
                >
                  {isSavingName ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar"}
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                E-mail
              </Label>
              <Input
                id="email"
                value={user?.email || ""}
                disabled
                className="bg-muted text-sm"
              />
              <p className="text-xs text-muted-foreground">
                O e-mail não pode ser alterado
              </p>
            </div>
          </div>

          <Separator />

          {/* Password */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Alterar Senha
            </h3>
            
            <div className="space-y-2.5">
              <div className="space-y-1.5">
                <Label htmlFor="newPassword" className="flex items-center gap-2 text-sm">
                  <Lock className="w-4 h-4 shrink-0" />
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
              
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-sm">
                  Confirmar nova senha
                </Label>
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
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" />Atualizando...</>
                ) : (
                  "Atualizar Senha"
                )}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Danger Zone */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-destructive uppercase tracking-wider">
              Zona de Perigo
            </h3>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto p-3 border-destructive/30 hover:bg-destructive/10 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-5 h-5 shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="font-medium text-sm">Excluir minha conta</p>
                    <p className="text-xs text-muted-foreground truncate">
                      Remove permanentemente todos os seus dados
                    </p>
                  </div>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[calc(100vw-2rem)] max-w-sm">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                    Excluir conta definitivamente?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-left leading-relaxed text-sm">
                    Esta ação é <strong>irreversível</strong>. Todos os seus dados serão apagados permanentemente: progresso de leitura, pontos, conquistas, devocionais, quiz e histórico.
                    <br /><br />
                    Tem certeza que deseja continuar?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
                  <AlertDialogCancel className="w-full sm:w-auto">Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={async () => {
                      setIsDeletingAccount(true);
                      onOpenChange(false);
                      try {
                        const session = (await supabase.auth.getSession()).data.session;
                        if (!session) return;
                        const { error } = await supabase.functions.invoke("delete-account", {
                          headers: { Authorization: `Bearer ${session.access_token}` },
                        });
                        if (error) throw error;
                        await supabase.auth.signOut();
                        navigate("/auth");
                        toast.success("Conta excluída com sucesso.");
                      } catch {
                        toast.error("Erro ao excluir conta. Tente novamente.");
                      } finally {
                        setIsDeletingAccount(false);
                      }
                    }}
                  >
                    {isDeletingAccount ? (
                      <><Loader2 className="w-4 h-4 animate-spin mr-2" />Excluindo...</>
                    ) : (
                      "Sim, excluir minha conta"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
