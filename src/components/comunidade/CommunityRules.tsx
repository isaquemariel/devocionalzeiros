import { motion } from "framer-motion";
import { Shield, HandHeart, Ban, AlertCircle, Heart } from "lucide-react";

const RULES = [
  {
    icon: HandHeart,
    title: "Apenas oração e gratidão",
    desc: "Este é um espaço sagrado. Use somente para pedir oração ou agradecer. Conteúdos fora desse propósito serão removidos.",
  },
  {
    icon: Heart,
    title: "Respeito sempre",
    desc: "Trate cada irmão com amor, paciência e empatia. Críticas, julgamentos ou ataques pessoais não serão tolerados.",
  },
  {
    icon: Ban,
    title: "Sem palavrões ou conteúdo sexual",
    desc: "Linguagem ofensiva, vulgar, sexual ou imoral é bloqueada automaticamente. Mantenha o tom edificante.",
  },
  {
    icon: AlertCircle,
    title: "Nada de spam, divulgação ou política",
    desc: "Proibido vender produtos, divulgar links externos, doutrinas controversas, discursos políticos ou correntes.",
  },
  {
    icon: Shield,
    title: "Privacidade em primeiro lugar",
    desc: "Não compartilhe dados pessoais (telefone, endereço, CPF) seus ou de outros, mesmo nas respostas.",
  },
  {
    icon: Heart,
    title: "Celebre as vitórias",
    desc: "Sempre que um pedido for respondido, marque como respondido e, se quiser, compartilhe na aba de Agradecimentos. Inspire outros!",
  },
];

const PENALTIES = [
  "Aviso na primeira infração leve.",
  "Remoção do post + notificação ao usuário.",
  "Bloqueio temporário (horas ou dias) em caso de reincidência.",
  "Banimento permanente para condutas graves ou repetidas.",
];

export function CommunityRules() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-5 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold">Regras da Comunidade</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          A Comunidade Devocionalzeiros é um lugar para <span className="text-foreground font-semibold">orarmos juntos e celebrarmos as obras de Deus</span>. Para manter esse ambiente saudável, todos devem seguir estas regras.
        </p>
      </div>

      <div className="grid gap-3">
        {RULES.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-3 rounded-xl border border-border/60 bg-card/40 p-4 backdrop-blur-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <r.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold mb-1">{r.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <h3 className="text-sm font-bold text-destructive">Consequências por descumprimento</h3>
        </div>
        <ul className="space-y-1.5">
          {PENALTIES.map((p) => (
            <li key={p} className="text-xs text-muted-foreground flex gap-2">
              <span className="text-destructive">•</span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-xs text-muted-foreground italic px-4">
        "Acima de tudo, porém, revistam-se do amor, que é o elo perfeito." — Colossenses 3:14
      </p>
    </motion.div>
  );
}
