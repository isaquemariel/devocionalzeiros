import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, BookOpen, Heart, Gift, Clock } from "lucide-react";

const CATEGORIES = [
  { icon: BookOpen, label: "Bíblias", count: "Em breve" },
  { icon: Heart, label: "Devocionais", count: "Em breve" },
  { icon: Gift, label: "Presentes", count: "Em breve" },
];

const Loja = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/20">
        <div className="max-w-2xl mx-auto flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-muted/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold">Loja Devocionalzeiros</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 pb-24 space-y-8">
        {/* Coming Soon Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 py-8"
        >
          <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-black">Em Construção</h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Estamos preparando uma loja incrível com Bíblias, devocionais, presentes cristãos e muito mais. Fique ligado!
          </p>
          <div className="flex items-center justify-center gap-2 text-primary text-xs font-semibold">
            <Clock className="w-4 h-4" />
            <span>CHEGANDO EM BREVE</span>
          </div>
        </motion.div>

        {/* Category Preview */}
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="p-4 rounded-xl bg-muted/5 border border-border/20 text-center space-y-2"
            >
              <cat.icon className="w-6 h-6 text-primary mx-auto" />
              <p className="text-xs font-bold">{cat.label}</p>
              <span className="text-[10px] text-muted-foreground">{cat.count}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loja;
