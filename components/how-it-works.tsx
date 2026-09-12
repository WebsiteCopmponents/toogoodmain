"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const cardHoverVariants: Variants = {
  hover: {
    y: -4,
  },
};

const stepBadgeVariants: Variants = {
  hover: { backgroundColor: "#00bd7d", color: "#fff" },
};

const borderVariants: Variants = {
  hover: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" as const },
  },
};

const steps = [
  {
    step: "01",
    title: "Send the brief",
    desc: "Tell us what you need — a site, an app, a dashboard, or the work around it.",
    delay: 0.4,
  },
  {
    step: "02",
    title: "Design and build",
    desc: "We shape the UI, then ship it as a fast site, app, or custom web application.",
    delay: 0.5,
  },
  {
    step: "03",
    title: "Launch and care",
    desc: "Go live with SEO, email, domain, and ads if you need them — then we stay on.",
    delay: 0.6,
  },
];

export default function HowItWorks04Kelo({
  className,
}: {
  className?: string;
}) {
  return (
    <section
      className={
        "w-full bg-white py-[140px] px-5 md:px-20 overflow-hidden " +
        (className || "")
      }
    >
        <div className="max-w-[1200px] mx-auto">
          {/* Row 1 — Three Fanned 3D Object Cards */}
          <div className="relative flex justify-center items-center h-[240px] mb-12">
            {/* Left Card (Video - Hero 1) */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -110, rotate: -15 }}
              whileInView={{ opacity: 1, y: 25, x: -110, rotate: -15 }}
              whileHover={{ rotate: 90, scale: 1.05 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: "easeOut" as const,
              }}
              className="absolute w-[180px] h-[180px] bg-gradient-to-br from-[#fdfdfd] to-[#f2f2f3] rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-white flex items-center justify-center z-[2] overflow-hidden cursor-pointer"
            >
              <video
                src="https://cdn.jiro.build/Kelo/Hero%201%20Video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Right Card (Video - Hero 2) */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: 110, rotate: 12 }}
              whileInView={{ opacity: 1, y: 15, x: 110, rotate: 12 }}
              whileHover={{ rotate: 90, scale: 1.05 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeOut" as const,
              }}
              className="absolute w-[180px] h-[180px] bg-gradient-to-br from-[#fdfdfd] to-[#f2f2f3] rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-white flex items-center justify-center z-[1] overflow-hidden cursor-pointer"
            >
              <video
                src="https://cdn.jiro.build/Kelo/Hero%202%20Video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Center Card (Video - Animate) */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: 0, rotate: 0 }}
              whileInView={{ opacity: 1, y: -10, x: 0, rotate: 0 }}
              whileHover={{ rotate: 90, scale: 1.05 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: "easeOut" as const,
              }}
              className="absolute w-[180px] h-[180px] bg-gradient-to-br from-[#fdfdfd] to-[#f2f2f3] rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-white flex items-center justify-center z-[3] overflow-hidden cursor-pointer"
            >
              <video
                src="https://cdn.jiro.build/Kelo/video/animate.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Row 2 — Centered Heading + Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" as const }}
            className="text-center mb-12"
          >
            <h2 className="text-[48px] font-semibold text-[#0d0d0d] leading-[1.1] mb-3">
              How it works
            </h2>
            <p className="text-[15px] text-[#888] leading-[1.6] max-w-[380px] mx-auto">
              Brief, design, build, launch — one studio from the first note to a live product.
            </p>
          </motion.div>

          {/* Row 3 — Three Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover="hover"
                viewport={{ once: true }}
                transition={{
                  delay: item.delay,
                  duration: 0.6,
                  ease: "easeOut" as const,
                }}
                className="relative bg-[#f6f6f7] rounded-[32px] p-10 flex flex-col items-start min-h-[280px] transition-colors hover:bg-[#f2f2f3] cursor-pointer group"
              >
                {/* Animated Border Stroke */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20">
                  <motion.rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    rx="32"
                    fill="none"
                    stroke="#00bd7d"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    variants={borderVariants}
                  />
                </svg>

                <motion.div
                  variants={cardHoverVariants}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 flex flex-col items-start"
                >
                  <motion.div
                    variants={stepBadgeVariants}
                    className="w-10 h-10 rounded-full bg-[#ebeaeb] flex items-center justify-center text-[13px] font-semibold text-[#555] mb-8 transition-colors duration-300"
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-[28px] font-bold text-[#0d0d0d] leading-tight mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[16px] text-[#666] leading-relaxed max-w-[280px]">
                    {item.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
    </section>
  );
}
