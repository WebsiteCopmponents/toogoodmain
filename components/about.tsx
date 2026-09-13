"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionEyebrow from "@/components/section-eyebrow";
import { CtaButton, CtaStaggerButton } from "@/components/cta-button";

export default function About({ className }: { className?: string }) {
  return (
    <section
      className={
        "w-full bg-white py-[60px] px-6 md:px-[70px] font-sans " +
        (className || "")
      }
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <SectionEyebrow>About us</SectionEyebrow>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-[32px] md:text-[42px] font-medium text-[#0a0b0a] leading-[1.2] md:w-[70%] text-left md:text-right ml-auto"
          >
            A UK online studio for web design, mobile, custom dashboards,{" "}
            <br className="hidden md:block" /> and UI/UX — built to look
            considered and work hard.
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-20 border-y border-[#e1e0e0] py-10">
          {[
            { num: "UK", label: "Online studio, working remotely" },
            { num: "Web", label: "Sites, apps, and dashboards" },
            { num: "UX", label: "Research-backed interface design" },
            { num: "AI", label: "Automation and chatbots" },
          ].map((stat: { num: string; label: string }, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={
  "flex flex-col px-4 md:px-10 " +
  (index !== 3 ? "md:border-r md:border-[#e1e0e0]" : "") +
  (index === 0 || index === 2
    ? " border-r border-[#e1e0e0]"
    : "")
}
            >
              <div className="font-heading text-[24px] md:text-[42px] font-medium text-[#111] leading-tight">
                {stat.num}
              </div>
              <div className="text-[13px] text-[#888] font-medium font-sans">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[350px] bg-[#254C3C] rounded-[24px] p-[28px] flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2C12 2 4 8 4 14C4 18.4183 7.58172 22 12 22Z"
                    fill="#254C3C"
                  />
                </svg>
              </div>
              <div className="font-heading text-[28px]  font-medium text-white leading-none">
                Web + app
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-[13px] text-white/80 font-medium font-sans">
                Design through to launch
              </div>
              <div className="text-[18px] text-white leading-snug font-sans">
                From first brief to a live site, <br /> dashboard, or app.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="h-[350px] rounded-[24px] overflow-hidden relative group"
          >
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
              alt="Studio work"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[14px]">&#11088;</span>
                <span className="text-[14px] font-bold text-white font-sans">
                  Early-stage, UK based
                </span>
              </div>
              <div className="font-heading text-[52px] font-medium text-white leading-none">
                Online
              </div>
              <div className="text-[15px] font-medium text-white/90 font-sans">
                Studio, no office required
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-[350px] bg-[#254C3C] rounded-[24px] p-[28px] flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="font-heading text-[28px] font-medium text-white leading-none">
                UI/UX
              </div>
              <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3V21M3 12H21M5.63604 5.63604L18.364 18.364M18.364 5.63604L5.63604 18.364"
                    stroke="#254C3C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <div className="text-[16px] font-bold text-white mb-1 font-sans">
                  Interfaces that convert
                </div>
                <div className="text-[13px] text-white/70 font-sans">
                  Research-backed, friction-light
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <CtaButton>Start a project</CtaButton>
                <CtaStaggerButton>See the work</CtaStaggerButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
