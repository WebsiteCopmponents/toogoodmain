"use client";

import { motion } from "framer-motion";

type SectionEyebrowProps = {
  children: string;
  className?: string;
};

export default function SectionEyebrow({
  children,
  className,
}: SectionEyebrowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={
        "inline-flex w-fit items-center gap-2 self-start rounded-full bg-[#f0f0f0] px-[14px] py-[6px]  mb-4" +
        (className || "")
      }
    >
      <div className="h-2 w-2 rounded-full bg-[#0a0b0a]" />
      <span className="font-sans text-[13px] font-medium text-[#0a0b0a]">
        {children}
      </span>
    </motion.div>
  );
}
