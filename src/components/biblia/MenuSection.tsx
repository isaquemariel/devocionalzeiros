import { motion } from "framer-motion";
import { 
  Settings, 
  Book, 
  Bell, 
  Palette, 
  HelpCircle,
  ChevronRight,
  Sparkles
} from "lucide-react";

interface MenuSectionProps {
  onChangePlan: () => void;
  onOpenDevotional: () => void;
}

const MenuSection = ({ onChangePlan, onOpenDevotional }: MenuSectionProps) => {
  const menuItems = [
    {
      id: "devotional",
      label: "Devocional do Dia",
      description: "Reflexão e oração diária",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
      onClick: onOpenDevotional,
    },
    {
      id: "change-plan",
      label: "Alterar Plano de Leitura",
      description: "Mude seu ritmo de leitura",
      icon: Book,
      color: "from-primary to-accent",
      onClick: onChangePlan,
    },
    {
      id: "notifications",
      label: "Notificações",
      description: "Configure lembretes",
      icon: Bell,
      color: "from-amber-500 to-orange-500",
      onClick: () => {},
      disabled: true,
      comingSoon: true,
    },
    {
      id: "theme",
      label: "Aparência",
      description: "Personalize o visual",
      icon: Palette,
      color: "from-teal-500 to-cyan-500",
      onClick: () => {},
      disabled: true,
      comingSoon: true,
    },
    {
      id: "help",
      label: "Ajuda",
      description: "Dúvidas e suporte",
      icon: HelpCircle,
      color: "from-slate-500 to-slate-600",
      onClick: () => {},
      disabled: true,
      comingSoon: true,
    },
  ];

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Settings className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold">Menu</h2>
          <p className="text-sm text-muted-foreground">Configurações e recursos</p>
        </div>
      </div>

      <div className="space-y-3">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={item.onClick}
            disabled={item.disabled}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
              item.disabled
                ? "bg-muted/5 border-border/30 opacity-60 cursor-not-allowed"
                : "bg-muted/5 border-border/50 hover:bg-muted/10 hover:border-primary/30"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={!item.disabled ? { scale: 1.01 } : {}}
            whileTap={!item.disabled ? { scale: 0.99 } : {}}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.label}</span>
                {item.comingSoon && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-muted/30 text-muted-foreground">
                    Em breve
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <ChevronRight className={`w-5 h-5 flex-shrink-0 ${
              item.disabled ? "text-muted-foreground/50" : "text-muted-foreground"
            }`} />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
