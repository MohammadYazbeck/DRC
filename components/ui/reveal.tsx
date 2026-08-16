"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type RevealProps = HTMLMotionProps<"div"> & {
  as?: ElementType;
  children: ReactNode;
  delay?: number;
};

export function Reveal({ as = "div", children, delay = 0, ...props }: RevealProps) {
  const Component = motion.create(as);

  return (
    <Component
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </Component>
  );
}
