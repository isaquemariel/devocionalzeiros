import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const whatsappMessage = encodeURIComponent("Oii, Isaque. Tenho dúvidas sobre o APP.");
  const whatsappLink = `https://wa.me/5511999999999?text=${whatsappMessage}`;

  return (
    <section ref={ref} className="relative py-12 md:py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20" />
      
      <div className="container relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Ainda tem dúvidas?{" "}
            <span className="text-primary">Fale conosco.</span>
          </h2>

          <p className="text-muted-foreground mb-6">
            Estamos prontos para te ajudar a começar sua jornada devocional.
          </p>

          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Falar no WhatsApp</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
