"use client";

import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect } from "react";

export function AnimatedNumber({
  value,
  digits = 1,
  suffix = "",
  className,
}: {
  value: number;
  digits?: number;
  suffix?: string;
  className?: string;
}) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) =>
    Number.isFinite(v) ? v.toFixed(digits) : "·",
  );

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [mv, value]);

  return (
    <span className={className}>
      <motion.span>{text}</motion.span>
      {suffix}
    </span>
  );
}
