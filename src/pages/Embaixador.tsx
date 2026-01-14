import { motion } from "framer-motion";
import { ArrowRight, Check, Heart, BookOpen, Users, DollarSign, Gift, Target, HandHeart, ChevronRight } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { useNavigate } from "react-router-dom";
import embaixadorHero from "@/assets/embaixador-hero.png";

const WHATSAPP_LINK = "https://wa.me/+5584999488698?text=Quero%20me%20tornar%20um%20Embaixador%20do%20Devocionalzeiros!%20";

const Embaixador = () => {
  const navigate = useNavigate();
  
  const handleCTA = () => {
    window.open(WHATSAPP_LINK, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-600/[0.05] rounded-full blur-[200px] -translate-y-1/2" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-amber-600/[0.03] rounded-full blur-[180px] -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        {/* Back button */}
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span className="text-sm">Voltar</span>
          </button>
        </div>

        {/* SEÇÃO 1 — HERO */}
        <section className="relative py-12 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-center lg:text-left order-2 lg:order-1"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
                  Seja um{" "}
                  <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-clip-text text-transparent">
                    Embaixador
                  </span>{" "}
                  do Devocionalzeiros
                </h1>
                
                <h2 className="text-lg sm:text-xl text-white/70 font-medium mb-6">
                  Leve a Palavra mais longe, abençoe vidas e seja recompensado por isso.
                </h2>
                
                <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
                  O Devocionalzeiros nasceu com um propósito claro: formar cristãos que desenvolvem o hábito diário de buscar a Deus, ler a Bíblia e viver uma fé prática e constante. Agora, você pode fazer parte ativa dessa missão — ajudando outras pessoas a se aproximarem da Palavra e recebendo <strong className="text-amber-400">10% de comissão</strong> por cada nova assinatura indicada.
                </p>
                
                <PremiumButton
                  size="lg"
                  onClick={handleCTA}
                  className="group"
                >
                  <span>👉 Quero ser um Embaixador</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </PremiumButton>
              </motion.div>
              
              {/* Hero Image - Animated Phone Mockup */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
                className="flex justify-center order-1 lg:order-2"
              >
                <div className="relative">
                  {/* Glow effect behind phone */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/40 to-blue-600/40 rounded-[3rem] blur-3xl scale-110" />
                  
                  {/* Floating coins animation */}
                  <motion.div
                    className="absolute -left-8 top-1/4 w-8 h-8 text-amber-400"
                    animate={{ 
                      y: [-10, 10, -10],
                      rotate: [0, 15, -15, 0],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <DollarSign className="w-8 h-8" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute -right-6 top-1/3 w-6 h-6 text-amber-500"
                    animate={{ 
                      y: [10, -10, 10],
                      rotate: [0, -20, 20, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <DollarSign className="w-6 h-6" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute -left-4 bottom-1/3 w-5 h-5 text-amber-300"
                    animate={{ 
                      y: [5, -15, 5],
                      x: [-5, 5, -5],
                      opacity: [0.4, 0.9, 0.4]
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <DollarSign className="w-5 h-5" />
                  </motion.div>
                  
                  {/* Phone mockup */}
                  <motion.div
                    className="relative"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Phone frame */}
                    <div className="relative w-[260px] sm:w-[300px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-2xl border border-white/10">
                      {/* Phone notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
                      
                      {/* Screen */}
                      <div className="relative rounded-[2rem] overflow-hidden bg-black">
                        <img
                          src={embaixadorHero}
                          alt="Seja um Embaixador"
                          className="w-full h-auto"
                        />
                        
                        {/* Screen reflection */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                      </div>
                      
                      {/* Home indicator */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full" />
                    </div>
                    
                    {/* Commission badge */}
                    <motion.div
                      className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      +10% Comissão
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 2 — O PROPÓSITO */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-black mb-4">
                Mais do que indicar um app.{" "}
                <span className="text-amber-400">É sobre cumprir um chamado.</span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="space-y-6 text-white/70 text-center"
            >
              <p>
                Vivemos em uma geração cheia de informação, mas com pouca formação espiritual. Milhares de cristãos desejam ler a Bíblia, ter constância devocional e entender melhor as Escrituras — mas não sabem por onde começar ou não conseguem manter o hábito.
              </p>
              
              <p className="font-semibold text-white">
                O Devocionalzeiros existe para mudar isso.
              </p>
              
              <p>E como Embaixador, você se torna um instrumento para:</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid sm:grid-cols-2 gap-4 mt-8"
            >
              {[
                { icon: BookOpen, text: "Levar pessoas a desenvolverem um hábito devocional diário" },
                { icon: Heart, text: "Incentivar a leitura e o entendimento da Bíblia" },
                { icon: Target, text: "Ajudar cristãos a crescerem espiritualmente de forma prática" },
                { icon: Users, text: "Fazer parte de um movimento que valoriza a Palavra acima de tudo" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-white/80 text-sm">{item.text}</p>
                </div>
              ))}
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="text-center mt-8 text-lg font-semibold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent"
            >
              Você indica. Deus transforma. Nós estruturamos o caminho.
            </motion.p>
          </div>
        </section>

        {/* SEÇÃO 3 — COMO FUNCIONA */}
        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-black">
                Como funciona ser um{" "}
                <span className="text-amber-400">Embaixador Devocionalzeiros</span>
              </h2>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "1️⃣",
                  title: "Afiliado ao propósito",
                  text: "Você se cadastra como Embaixador e recebe seu link exclusivo de indicação."
                },
                {
                  step: "2️⃣",
                  title: "Indique com verdade",
                  text: "Compartilhe o Devocionalzeiros com pessoas que precisam criar constância espiritual."
                },
                {
                  step: "3️⃣",
                  title: "Pessoas se tornam assinantes",
                  text: "Quando alguém assina o Devocionalzeiros através do seu link..."
                },
                {
                  step: "4️⃣",
                  title: "Você recebe 10% de comissão",
                  text: "Você ganha 10% de comissão sobre a primeira assinatura do usuário indicado."
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  className="relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-amber-500/30 transition-colors"
                >
                  <div className="text-3xl mb-4">{item.step}</div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-8 p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 text-center"
            >
              <p className="text-white/70 text-sm">
                📌 O pagamento da comissão é efetuado em até <strong className="text-white">7 dias úteis</strong>, após o processamento da assinatura.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SEÇÃO 4 — POR QUE VALE A PENA */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-transparent via-amber-500/[0.03] to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-black mb-2">
                Você abençoa vidas.{" "}
                <span className="text-amber-400">E também é recompensado.</span>
              </h2>
              <p className="text-white/60">Benefícios de ser um Embaixador:</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {[
                "Comissão de 10% na primeira assinatura",
                "Pagamento rápido e organizado",
                "Produto com propósito e valor espiritual real",
                "Fácil de indicar (app completo e intuitivo)",
                "Você não vende promessas vazias — você compartilha uma ferramenta que edifica",
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-white/80 text-sm">{benefit}</p>
                </div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-10 text-center"
            >
              <p className="text-white/60 mb-2">Aqui, a recompensa não é só financeira.</p>
              <p className="text-lg font-semibold text-white">
                É saber que alguém está lendo a Bíblia hoje porque <span className="text-amber-400">você indicou o caminho</span>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SEÇÃO 5 — PARA QUEM É O PROGRAMA */}
        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-black mb-2">
                Esse programa é para você se:
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="space-y-4"
            >
              {[
                { icon: Heart, text: "Ama a Palavra de Deus" },
                { icon: BookOpen, text: "Acredita na importância do hábito devocional" },
                { icon: Users, text: "Quer impactar pessoas de forma prática" },
                { icon: DollarSign, text: "Deseja gerar renda extra com algo que faz sentido" },
                { icon: HandHeart, text: 'Não quer apenas "vender", mas servir com propósito' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <p className="text-white font-medium">{item.text}</p>
                </div>
              ))}
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center mt-8 text-white/70"
            >
              Se você carrega isso no coração, você já é um Embaixador — <span className="text-amber-400 font-semibold">só falta oficializar</span>.
            </motion.p>
          </div>
        </section>

        {/* SEÇÃO 6 — CHAMADA FINAL (CTA) */}
        <section className="py-16 sm:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6">
                Vamos alcançar mais{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                  leitores da Bíblia
                </span>{" "}
                juntos?
              </h2>
              
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                O Reino cresce quando pessoas comuns decidem obedecer a um chamado simples: compartilhar aquilo que edifica. Seja um Embaixador Devocionalzeiros e faça parte dessa missão.
              </p>
              
              <PremiumButton
                size="lg"
                onClick={handleCTA}
                className="group text-lg px-8"
              >
                <span>👉 Quero me tornar Embaixador Devocionalzeiros</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </PremiumButton>
            </motion.div>
          </div>
        </section>

        {/* SEÇÃO 7 — OBSERVAÇÕES LEGAIS */}
        <section className="py-8 border-t border-white/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center text-white/40 text-xs space-y-1">
              <p>• A comissão corresponde a 10% sobre a primeira assinatura do usuário indicado.</p>
              <p>• O pagamento é realizado em até 7 dias úteis, após o processamento e confirmação da assinatura.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 text-center">
          <p className="text-xs text-white/30">
            CLUBE HD © {new Date().getFullYear()} • Todos os direitos reservados
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Embaixador;
