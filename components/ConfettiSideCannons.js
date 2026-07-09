"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export function ConfettiSideCannons() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const end = Date.now() + 4 * 1000; // 3 seconds
      const colors = ["#FF9933", "#FFFFFF", "#138808"]; // Saffron, White, Green

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 5,
          angle: 270, // Downward
          spread: 80,
          startVelocity: 30,
          origin: { x: Math.random(), y: 0 }, // from top, random X
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
    }, 2000); // Delay before starting

    return () => clearTimeout(timer);
  }, []);

  return null;
}
