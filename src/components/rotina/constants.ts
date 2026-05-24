import { Heart, Users, Briefcase, Activity, Cross, GraduationCap, User, Hexagon, BookOpen, Flame, HandHeart, Coffee, Moon, Droplets, Pencil } from "lucide-react";

export const AREAS = [
  { value: "espiritual", label: "Espiritual", color: "#8b5cf6", icon: Cross },
  { value: "familia", label: "Família", color: "#ec4899", icon: Heart },
  { value: "trabalho", label: "Trabalho", color: "#3b82f6", icon: Briefcase },
  { value: "saude", label: "Saúde", color: "#10b981", icon: Activity },
  { value: "ministerio", label: "Ministério", color: "#f59e0b", icon: HandHeart },
  { value: "estudos", label: "Estudos", color: "#06b6d4", icon: GraduationCap },
  { value: "pessoal", label: "Pessoal", color: "#6366f1", icon: User },
] as const;

export const TASK_PRIORITIES = [
  { value: "baixa", label: "Baixa", color: "text-muted-foreground" },
  { value: "media", label: "Média", color: "text-blue-400" },
  { value: "alta", label: "Alta", color: "text-red-400" },
] as const;

export const TASK_STATUSES = [
  { value: "todo", label: "A fazer" },
  { value: "doing", label: "Fazendo" },
  { value: "done", label: "Concluída" },
] as const;

export const EVENT_CATEGORIES = [
  { value: "culto", label: "Culto", color: "#8b5cf6" },
  { value: "celula", label: "Célula", color: "#f59e0b" },
  { value: "jejum", label: "Jejum", color: "#ec4899" },
  { value: "familia", label: "Família", color: "#10b981" },
  { value: "trabalho", label: "Trabalho", color: "#3b82f6" },
  { value: "estudos", label: "Estudos", color: "#06b6d4" },
  { value: "pessoal", label: "Pessoal", color: "#6366f1" },
  { value: "devocional", label: "Tempo com Deus", color: "#a855f7" },
] as const;

export const PRAYER_CATEGORIES = [
  { value: "familia", label: "Família" },
  { value: "igreja", label: "Igreja" },
  { value: "missoes", label: "Missões" },
  { value: "pessoal", label: "Pessoal" },
  { value: "lideranca", label: "Liderança" },
  { value: "ministerio", label: "Ministério" },
  { value: "saude", label: "Saúde" },
  { value: "outro", label: "Outro" },
] as const;

export const NOTE_CATEGORIES = [
  { value: "sermao", label: "Sermão" },
  { value: "estudo", label: "Estudo Bíblico" },
  { value: "reflexao", label: "Reflexão" },
  { value: "celula", label: "Célula" },
  { value: "reuniao", label: "Reunião" },
  { value: "ideias", label: "Ideias" },
] as const;

export const NOTE_TEMPLATES = {
  soap: {
    label: "SOAP (Versículo, Observação, Aplicação, Oração)",
    content: `## S — Versículo (Scripture)\n_Cole aqui o(s) versículo(s) que falaram com você._\n\n## O — Observação\n_O que esse texto diz? Qual o contexto?_\n\n## A — Aplicação\n_Como aplico isso na minha vida hoje?_\n\n## P — Oração\n_Sua resposta a Deus em oração._`,
  },
  sermao: {
    label: "Esboço de Sermão",
    content: `## Texto Base\n_Referência bíblica principal_\n\n## Tema\n\n## Introdução\n\n## Pontos Principais\n1. \n2. \n3. \n\n## Aplicação Prática\n\n## Conclusão / Apelo`,
  },
  celula: {
    label: "Ata de Célula",
    content: `## Data\n\n## Presentes\n\n## Tema da Semana\n\n## Pedidos de Oração\n\n## Próximos Passos`,
  },
} as const;

export const SUGGESTED_HABITS = [
  { name: "Oração", icon: "HandHeart", color: "#8b5cf6" },
  { name: "Leitura Bíblica", icon: "BookOpen", color: "#3b82f6" },
  { name: "Devocional", icon: "Sparkles", color: "#a855f7" },
  { name: "Jejum", icon: "Flame", color: "#ec4899" },
  { name: "Gratidão", icon: "Heart", color: "#f43f5e" },
  { name: "Exercício", icon: "Activity", color: "#10b981" },
  { name: "Sono saudável", icon: "Moon", color: "#6366f1" },
  { name: "Beber água", icon: "Droplets", color: "#06b6d4" },
] as const;

export const HABIT_ICONS: Record<string, any> = {
  HandHeart, BookOpen, Sparkles, Flame, Heart, Activity, Moon, Droplets, Coffee, Pencil, Cross,
};

export const GOAL_AREAS = [
  { value: "espiritual", label: "Espiritual", color: "#8b5cf6" },
  { value: "familia", label: "Família", color: "#ec4899" },
  { value: "saude", label: "Saúde", color: "#10b981" },
  { value: "trabalho", label: "Trabalho", color: "#3b82f6" },
  { value: "financeiro", label: "Financeiro", color: "#f59e0b" },
  { value: "ministerio", label: "Ministério", color: "#a855f7" },
  { value: "estudos", label: "Estudos", color: "#06b6d4" },
] as const;

export const getAreaConfig = (value: string) =>
  AREAS.find((a) => a.value === value) || AREAS[AREAS.length - 1];

export const getEventCategoryConfig = (value: string) =>
  EVENT_CATEGORIES.find((c) => c.value === value) || EVENT_CATEGORIES[6];

export const getGoalAreaConfig = (value: string) =>
  GOAL_AREAS.find((a) => a.value === value) || GOAL_AREAS[0];
