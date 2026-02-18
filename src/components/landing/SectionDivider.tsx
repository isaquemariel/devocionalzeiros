import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SectionDivider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} className="relative h-20 md:h-28 overflow-hidden z-10 pointer-events-none">
      {/* Page fold shadow - top sheet lifting */}
      <motion.div
        initial={{ rotateX: -60, opacity: 0 }}
        animate={isInView ? { rotateX: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "bottom center", perspective: "600px" }}
        className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/[0.06] to-transparent dark:from-white/[0.04]"
      />

      {/* Center fold crease with shadow */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-0">
        {/* Upper shadow (page lifting) */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ transformOrigin: "bottom" }}
          className="w-full h-2 bg-gradient-to-b from-transparent to-black/[0.07] dark:to-white/[0.05]"
        />
        
        {/* Crease line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-2/3 md:w-1/2 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
        />

        {/* Lower shadow (page settling) */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ transformOrigin: "top" }}
          className="w-full h-2 bg-gradient-to-t from-transparent to-black/[0.05] dark:to-white/[0.03]"
        />
      </div>

      {/* Bottom sheet settling */}
      <motion.div
        initial={{ rotateX: 45, opacity: 0 }}
        animate={isInView ? { rotateX: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        style={{ transformOrigin: "top center", perspective: "600px" }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/[0.04] to-transparent dark:from-white/[0.03]"
      />

      {/* Subtle corner curl - right side */}
      <motion.div
        initial={{ opacity: 0, rotate: -10, scale: 0.5 }}
        animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="absolute right-[8%] md:right-[15%] top-1/2 -translate-y-1/2"
      >
        <div className="w-3 h-3 md:w-4 md:h-4 border-r border-b border-primary/15 rounded-br-sm" />
      </motion.div>

      {/* Subtle corner curl - left side */}
      <motion.div
        initial={{ opacity: 0, rotate: 10, scale: 0.5 }}
        animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        className="absolute left-[8%] md:left-[15%] top-1/2 -translate-y-1/2"
      >
        <div className="w-3 h-3 md:w-4 md:h-4 border-l border-b border-primary/15 rounded-bl-sm" />
      </motion.div>
    </div>
  );
};

export default SectionDivider;
