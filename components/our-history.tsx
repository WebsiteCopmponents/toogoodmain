"use client";

import React from "react";
import { User, Flame, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { CtaButton, CtaStaggerButton } from "@/components/cta-button";

export default function OurHistory({ className }: { className?: string }) {
  return (
    <section
      className={
        "w-full bg-[#F7F7F4] flex justify-center py-24 px-6 md:px-12 lg:px-20 " +
        (className || "")
      }
    >
      <div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading font-medium text-[48px] leading-[56px] text-[#0E1F1B] tracking-tight max-w-[440px]"
            >
              An early-stage studio. UK based. Online.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-[16px] font-normal leading-[24px] text-[#49514E] max-w-[480px]"
            >
              Web design, mobile, custom dashboards, and UI/UX — plus the
              connected work that keeps a brand live.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <CtaButton>Start a project</CtaButton>
            <CtaStaggerButton>See the work</CtaStaggerButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mt-4"
          >
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=64&h=64&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=64&h=64&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=64&h=64&auto=format&fit=crop",
              ].map((url: string, i: number) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#F7F7F4] overflow-hidden bg-gray-200"
                >
                  <img
                    src={url}
                    alt={"User " + (i + 1)}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
            <span className="text-[14px] text-[#888] font-sans">
              Early-stage. Taking on the right briefs.
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#E9EFEA] rounded-[40px] p-12 flex flex-col gap-16"
          >
            <div className="flex items-center gap-3 text-[20px] text-[#0E1F1B] font-sans">
              <User className="h-6 w-6" />
              <span>Studio scope</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-heading text-[80px] font-medium text-[#0E1F1B] leading-none tracking-tight">
                Full
              </div>
              <div className="text-[20px] text-[#0E1F1B] leading-snug font-sans">
                Design, build, and the work around them
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-[#E9EFEA] rounded-[40px] p-12 flex flex-col gap-16"
            >
              <div className="flex items-center gap-3 text-[20px] text-[#0E1F1B] font-sans">
                <Flame className="h-6 w-6" />
                <span>UK online</span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="font-heading text-[80px] font-medium text-[#0E1F1B] leading-none tracking-tight">
                  UK
                </div>
                <div className="text-[20px] text-[#0E1F1B] leading-snug font-sans">
                  Based here, working remotely
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-[#E9EFEA] rounded-[40px] p-12 flex flex-col gap-16"
            >
              <div className="flex items-center gap-3 text-[20px] text-[#0E1F1B] font-sans">
                <Brain className="h-6 w-6" />
                <span>UI / UX</span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="font-heading text-[80px] font-medium text-[#0E1F1B] leading-none tracking-tight">
                  UX
                </div>
                <div className="text-[20px] text-[#0E1F1B] leading-snug font-sans">
                  Research-backed interfaces, shipped
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
