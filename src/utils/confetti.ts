import confetti from "canvas-confetti";

export type ConfettiType = "complete" | "achievement" | "streak" | "celebration";

const confettiConfigs: Record<ConfettiType, () => void> = {
  complete: () => {
    // Simple burst for completing a chapter
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#3b82f6", "#8b5cf6", "#22c55e"],
      ticks: 100,
      gravity: 1.2,
      scalar: 0.9,
    });
  },

  achievement: () => {
    // Grand celebration for achievements
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#fbbf24", "#f59e0b", "#d97706"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#8b5cf6", "#7c3aed", "#6d28d9"],
      });
    }, 250);
  },

  streak: () => {
    // Fire-themed for streaks
    const count = 100;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#ff6b35", "#f7931e", "#ffd23f", "#ff4d4d"],
    };

    confetti({
      ...defaults,
      particleCount: count * 0.25,
      spread: 26,
      startVelocity: 55,
    });

    confetti({
      ...defaults,
      particleCount: count * 0.2,
      spread: 60,
    });

    confetti({
      ...defaults,
      particleCount: count * 0.35,
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    confetti({
      ...defaults,
      particleCount: count * 0.1,
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
  },

  celebration: () => {
    // Full celebration for completing all readings
    const end = Date.now() + 3000;
    const colors = ["#3b82f6", "#8b5cf6", "#22c55e", "#f59e0b", "#ec4899"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  },
};

export const triggerConfetti = (type: ConfettiType) => {
  confettiConfigs[type]();
};

export default triggerConfetti;
