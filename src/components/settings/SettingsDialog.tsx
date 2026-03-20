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
  Trophy, FileText, Trash2, AlertTriangle, MessageCircle, HelpCircle, Bell, BellOff
} from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";
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
  const { isSubscribed, isLoading: isPushLoading, isSupported: isPushSupported, permission, subscribe, unsubscribe } = usePushNotifications();

  const hasAdminAccess = isAdmin || planType === "admin";

  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  useEffect(() => {
    if (open && profile?.full_name) setFullName(profile.full_name);
  }, [open, profile?.full_name]);

  const handleGoToAdmin = () => { onOpenChange(false); navigate("/adminhd"); };

  const handleSaveName = async () => {
    if (!fullName.trim()) { toast.error("Nome não pode estar vazio"); return; }
    setIsSavingName(true);
    try {
      const { error } = await updateProfile({ full_name: fullName.trim() });
      if (error) throw error;
      toast.success("Nome atualizado com sucesso!");
    } catch { toast.error("Erro ao atualizar nome"); }
    finally { setIsSavingName(false); }
  };

  const handleSavePassword = async () => {
    if (!newPassword || !confirmPassword) { toast.error("Preencha todos os campos de senha"); return; }
    if (newPassword !== confirmPassword) { toast.error("As senhas não coincidem"); return; }
    if (newPassword.length < 6) { toast.error("A senha deve ter pelo menos 6 caracteres"); return; }
    setIsSavingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        const status = (error as any)?.status;
        const msg = (error as any)?.message ?? "";
        if (status === 422 || msg.toLowerCase().includes("different") || msg.toLowerCase().includes("same")) {
          toast.error("A nova senha deve ser diferente da senha atual.");
        } else if (status === 401 || msg.toLowerCase().includes("expired") || msg.toLowerCase().includes("invalid")) {
          toast.error("Sessão expirada. Faça login novamente.");
        } else {
          toast.error("Erro ao atualizar senha. Tente novamente.");
        }
        return;
      }
      toast.success("Senha atualizada com sucesso!");
      setNewPassword(""); setConfirmPassword("");
    } catch { toast.error("Erro ao atualizar senha. Tente novamente."); }
    finally { setIsSavingPassword(false); }
  };

  /* ─── row helper ─── */
  const Row = ({
    icon, label, sub, onClick, color = "border-border/40 hover:bg-muted/10",
    right,
  }: {
    icon: React.ReactNode;
    label: string;
    sub?: string;
    onClick?: () => void;
    color?: string;
    right?: React.ReactNode;
  }) => (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-xl border ${color} ${onClick ? "cursor-pointer active:scale-[.98] transition-transform" : ""}`}
    >
      <span className="shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-tight">{label}</p>
        {sub && <p className="text-xs text-muted-foreground leading-tight mt-0.5">{sub}</p>}
      </div>
      {right}
    </div>
  );

  /* ─── section label ─── */
  const Section = ({ title, danger }: { title: string; danger?: boolean }) => (
    <p className={`text-[10px] font-bold uppercase tracking-widest ${danger ? "text-destructive" : "text-muted-foreground"}`}>
      {title}
    </p>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/*
        key rules for mobile responsiveness:
        - w uses svw/svh so it works on all mobile browsers
        - max-h uses svh so bottom nav doesn't clip
        - overflow-x: hidden prevents horizontal scroll
        - flex-col + scroll only on the body section
      */}
      <DialogContent
        className="
          w-[calc(100svw-1.25rem)] max-w-[26rem]
          max-h-[88svh]
          flex flex-col gap-0
          overflow-hidden
          rounded-2xl
          p-0
        "
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      >
        {/* ── Fixed header ── */}
        <div className="shrink-0 px-4 pt-4 pb-3 border-b border-border/30">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Configurações</DialogTitle>
          </DialogHeader>
        </div>

        {/* ── Scrollable body (vertical only) ── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 space-y-3">

          {/* Admin */}
          {hasAdminAccess && (
            <>
              <Section title="Administração" />
              <Row
                icon={<Shield className="w-4 h-4 text-primary" />}
                label="Painel Administrativo"
                sub="Gerenciar usuários e métricas"
                color="border-primary/30 hover:bg-primary/10"
                onClick={handleGoToAdmin}
              />
              <Separator />
            </>
          )}

          {/* Gamificação */}
          <Section title="Gamificação" />
          <Row
            icon={<Trophy className="w-4 h-4 text-primary" />}
            label="Conquistas"
            sub="Visualizar e resgatar pontos"
            color="border-primary/30 hover:bg-primary/10"
            onClick={() => { onOpenChange(false); navigate("/conquistas"); }}
          />

          <Separator />

          {/* Planos */}
          <Section title="Planos" />
          <Row
            icon={<Crown className="w-4 h-4 text-amber-400" />}
            label="Comparar Planos"
            sub="Veja as funcionalidades de cada plano"
            color="border-amber-500/30 hover:bg-amber-500/10"
            onClick={() => { onOpenChange(false); navigate("/planos"); }}
          />

          <Separator />

          {/* Comunidade */}
          <Section title="Comunidade" />
          <Row
            icon={<MessageCircle className="w-4 h-4 text-green-500" />}
            label="Grupo no WhatsApp"
            sub="Entre na nossa comunidade"
            color="border-green-600/30 hover:bg-green-600/10"
            onClick={() => window.open("https://chat.whatsapp.com/G3RUHiKTrLh8mZFUDK2j5a", "_blank")}
          />
          <Row
            icon={<HelpCircle className="w-4 h-4 text-red-500" />}
            label="Suporte"
            sub="Fale com nossa equipe via WhatsApp"
            color="border-red-500/30 hover:bg-red-500/10"
            onClick={() => window.open("https://wa.me/+5584999488698?text=Oii%2C%20equipe.%20Preciso%20de%20suporte.%20", "_blank")}
          />

          <Separator />

          {/* Som */}
          <Section title="Som" />
          <Row
            icon={soundEnabled
              ? <Volume2 className="w-4 h-4 text-primary" />
              : <VolumeX className="w-4 h-4 text-muted-foreground" />}
            label="Sons do App"
            sub="Efeitos sonoros de quiz e leitura"
            right={
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
                className="shrink-0"
              />
            }
          />

          <Separator />

          {/* Notificações Push */}
          {isPushSupported && permission !== "denied" && (
            <>
              <Section title="Notificações" />
              <Row
                icon={isSubscribed
                  ? <Bell className="w-4 h-4 text-primary" />
                  : <BellOff className="w-4 h-4 text-muted-foreground" />}
                label="Notificações do App"
                sub={
                  isSubscribed
                    ? "Receba lembretes diários do devocional"
                    : "Ative para receber lembretes mesmo com o app fechado"
                }
                right={
                  <Switch
                    checked={isSubscribed}
                    onCheckedChange={isSubscribed ? unsubscribe : subscribe}
                    disabled={isPushLoading}
                    className="shrink-0"
                  />
                }
              />
              <Separator />
            </>
          )}

          {/* Legal */}
          <Section title="Legal" />
          <Row
            icon={<FileText className="w-4 h-4 text-muted-foreground" />}
            label="Política de Privacidade"
            sub="Leia nossa política de uso"
            onClick={() => { onOpenChange(false); navigate("/privacidade"); }}
          />

          <Separator />

          {/* Perfil */}
          <Section title="Perfil" />

          <div className="space-y-1.5">
            <Label htmlFor="fullName" className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <User className="w-3.5 h-3.5" /> Nome completo
            </Label>
            <div className="flex gap-2">
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu nome"
                className="flex-1 min-w-0 h-9 text-sm"
                maxLength={50}
              />
              <Button
                onClick={handleSaveName}
                disabled={isSavingName || fullName === profile?.full_name}
                size="sm"
                className="shrink-0 h-9 text-xs px-3"
              >
                {isSavingName ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Salvar"}
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="w-3.5 h-3.5" /> E-mail
            </Label>
            <Input
              id="email"
              value={user?.email || ""}
              disabled
              className="bg-muted h-9 text-sm"
            />
            <p className="text-[10px] text-muted-foreground">O e-mail não pode ser alterado</p>
          </div>

          <Separator />

          {/* Senha */}
          <Section title="Alterar Senha" />

          <div className="space-y-1.5">
            <Label htmlFor="newPassword" className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5" /> Nova senha
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-xs text-muted-foreground">
              Confirmar nova senha
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="h-9 text-sm"
            />
          </div>

          <Button
            onClick={handleSavePassword}
            disabled={isSavingPassword || !newPassword || !confirmPassword}
            className="w-full h-9 text-sm"
          >
            {isSavingPassword
              ? <><Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />Atualizando...</>
              : "Atualizar Senha"}
          </Button>

          <Separator />

          {/* Zona de Perigo */}
          <Section title="Zona de Perigo" danger />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex items-center gap-3 w-full p-3 rounded-xl border border-destructive/30 hover:bg-destructive/10 cursor-pointer active:scale-[.98] transition-transform text-destructive">
                <Trash2 className="w-4 h-4 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">Excluir minha conta</p>
                  <p className="text-xs text-muted-foreground leading-tight mt-0.5">Remove permanentemente todos os seus dados</p>
                </div>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[calc(100svw-1.25rem)] max-w-sm">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                  Excluir conta definitivamente?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-left text-sm leading-relaxed">
                  Esta ação é <strong>irreversível</strong>. Todos os seus dados serão apagados: progresso, pontos, conquistas, devocionais e histórico.
                  <br /><br />Tem certeza que deseja continuar?
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
                  {isDeletingAccount
                    ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Excluindo...</>
                    : "Sim, excluir minha conta"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* bottom spacing */}
          <div className="h-1" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
