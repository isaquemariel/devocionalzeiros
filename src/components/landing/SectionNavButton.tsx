import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

interface SectionNavButtonProps {
  targetId: string;
  label: string;
}

const SectionNavButton = ({ targetId, label }: SectionNavButtonProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const scrollToTarget = () => {
    const el = document.getElementById(targetId);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex justify-center py-6"
    >
      <button
        onClick={scrollToTarget}
        className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 backdrop-blur-sm transition-all duration-300 hover:scale-105"
      >
        <span className="text-sm font-semibold text-primary">{label}</span>
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-primary" />
        </motion.div>
      </button>
    </motion.div>
  );
};

export default SectionNavButton;
