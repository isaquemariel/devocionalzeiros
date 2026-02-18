import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Mail, Phone, Calendar, Trophy, BookOpen, Star } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UserDetails {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  email?: string;
  phone?: string;
  plan_type?: string;
  created_at?: string;
  chapters_read: number;
  quiz_points: number;
  devotional_points: number;
  rpg_points: number;
  total_points: number;
  active_days: number;
  rank: number;
}

interface AllTimeStats {
  chapters_read: number;
  quiz_points: number;
  devotional_points: number;
  achievement_points: number;
  rpg_points: number;
  total_points: number;
  active_days: number;
}

interface UserDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserDetails | null;
}

export const UserDetailsModal = ({ open, onOpenChange, user }: UserDetailsModalProps) => {
  const [allTimeStats, setAllTimeStats] = useState<AllTimeStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    const fetchAllTimeStats = async () => {
      if (!user?.user_id || !open) return;
      
      setLoadingStats(true);
      try {
        // Use the admin RPC to fetch all-time stats (bypasses RLS)
        const { data, error } = await supabase.rpc('admin_get_user_all_time_stats', {
          target_user_id: user.user_id
        });

        if (error) {
          console.error('Error fetching all-time stats:', error);
          return;
        }

        if (data && data.length > 0) {
          const stats = data[0];
          setAllTimeStats({
            chapters_read: Number(stats.chapters_read) || 0,
            quiz_points: Number(stats.quiz_points) || 0,
            devotional_points: Number(stats.devotional_points) || 0,
            achievement_points: Number(stats.achievement_points) || 0,
            rpg_points: Number((stats as any).rpg_points) || 0,
            total_points: Number(stats.total_points) || 0,
            active_days: Number(stats.active_days) || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching all-time stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchAllTimeStats();
  }, [user?.user_id, open]);

  if (!user) return null;

  const stats = allTimeStats || {
    chapters_read: user.chapters_read,
    quiz_points: user.quiz_points,
    devotional_points: user.devotional_points,
    achievement_points: 0,
    rpg_points: user.rpg_points || 0,
    total_points: user.total_points,
    active_days: user.active_days,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Detalhes do Usuário
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar and Name */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user.full_name || "Anônimo"}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                {user.rank}º lugar no ranking deste mês
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 p-4 rounded-lg bg-muted/30">
            <h4 className="font-medium text-sm text-muted-foreground">Informações de Contato</h4>
            
            {user.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
            )}
            
            {user.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{user.phone}</span>
              </div>
            )}

            {user.plan_type && (
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm capitalize">Plano: {user.plan_type}</span>
              </div>
            )}

            {user.created_at && (
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  Membro desde: {format(new Date(user.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </span>
              </div>
            )}
          </div>

          {/* Stats - All Time */}
          <div className="space-y-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h4 className="font-medium text-sm text-primary">Estatísticas Totais</h4>
            
            {loadingStats ? (
              <div className="text-center py-4 text-muted-foreground text-sm">Carregando...</div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 rounded bg-background">
                    <p className="text-2xl font-bold text-yellow-500">{stats.total_points}</p>
                    <p className="text-xs text-muted-foreground">Pontos Totais</p>
                  </div>
                  
                  <div className="text-center p-2 rounded bg-background">
                    <p className="text-2xl font-bold text-primary">{stats.active_days}</p>
                    <p className="text-xs text-muted-foreground">Dias Ativos</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> Capítulos Lidos
                    </span>
                    <span className="font-medium">{stats.chapters_read}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quiz Points</span>
                    <span className="font-medium">{stats.quiz_points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Devocional Points</span>
                    <span className="font-medium">{stats.devotional_points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">🎮 Jogo da Bíblia</span>
                    <span className="font-medium">{stats.rpg_points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Star className="w-3 h-3" /> Conquistas
                    </span>
                    <span className="font-medium">{stats.achievement_points}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
