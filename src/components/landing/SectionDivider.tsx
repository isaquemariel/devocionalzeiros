import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SectionDivider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="relative h-16 md:h-24 overflow-hidden z-10">
      {/* Page curl effect */}
      <motion.div
        initial={{ rotateX: -90, opacity: 0 }}
        animate={isInView ? { rotateX: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: "top center", perspective: 800 }}
        className="absolute inset-x-0 top-0 h-full"
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="foldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0.15" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
              <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 C360,60 1080,60 1440,0 L1440,80 L0,80 Z"
            fill="url(#foldGrad)"
          />
        </svg>
      </motion.div>

      {/* Fold line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
      />
    </div>
  );
};

export default SectionDivider;
