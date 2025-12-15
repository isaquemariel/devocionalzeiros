import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border/30">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="text-2xl font-bold text-gradient">CLUBE HD</span>
            <span className="text-sm text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">Clube Hábito Devocional</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            © {new Date().getFullYear()} CLUBE HD. Todos os direitos reservados.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
