import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Trophy, User, Crown, Medal, Star, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

interface HistoryChampion {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  rank: number;
  total_points: number;
  chapters_read: number;
  quiz_points: number;
  devotional_points: number;
  month_year: string;
}

interface RankingHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RankingHistoryModal = ({ open, onOpenChange }: RankingHistoryModalProps) => {
  const [history, setHistory] = useState<Record<string, HistoryChampion[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      fetchHistory();
    }
  }, [open]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_all_monthly_champions");
      
      if (error) throw error;

      // Group by month_year
      const grouped: Record<string, HistoryChampion[]> = {};
      (data || []).forEach((item: HistoryChampion) => {
        if (!grouped[item.month_year]) {
          grouped[item.month_year] = [];
        }
        grouped[item.month_year].push(item);
      });

      setHistory(grouped);
    } catch (error) {
      console.error("Error fetching ranking history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatMonthYear = (monthYear: string) => {
    try {
      const date = parse(monthYear, "yyyy-MM", new Date());
      return format(date, "MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return monthYear;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30";
      default:
        return "bg-muted/50 border-border/50";
    }
  };

  const sortedMonths = Object.keys(history).sort((a, b) => b.localeCompare(a));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Histórico de Campeões
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : sortedMonths.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum histórico de ranking disponível ainda.</p>
          </div>
        ) : (
          <div className="overflow-y-auto h-[60vh] pr-4">
            <div className="space-y-6">
              {sortedMonths.map((monthYear) => (
                <div key={monthYear}>
                  <h3 className="font-semibold text-sm text-primary mb-3 capitalize flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    {formatMonthYear(monthYear)}
                  </h3>
                  <div className="space-y-2">
                    {history[monthYear].map((champion) => (
                      <div
                        key={`${champion.user_id}-${champion.rank}`}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${getRankBg(champion.rank)}`}
                      >
                        <div className="flex items-center justify-center w-8">
                          {getRankIcon(champion.rank)}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                          {champion.avatar_url ? (
                            <img
                              src={champion.avatar_url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate text-sm">
                            {champion.full_name || "Anônimo"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {champion.chapters_read} caps · {champion.quiz_points} quiz · {champion.devotional_points} dev
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-yellow-500 text-sm">
                            {champion.total_points} pts
                          </p>
                          <p className="text-xs text-muted-foreground">{champion.rank}º lugar</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
