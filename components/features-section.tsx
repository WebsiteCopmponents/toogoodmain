"use client";
//File : features-section.tsx
import React from "react";
import { motion } from "framer-motion";
import { Lock, Bell, ChevronRight } from "lucide-react";
import SectionEyebrow from "@/components/section-eyebrow";
import { CtaButton } from "@/components/cta-button";

export default function FeaturesSection({ className }: { className?: string }) {
  return (
    <section
      className={
        "relative overflow-hidden bg-white px-6 py-[90px] font-sans md:px-[60px] " +
        (className || "")
      }
    >
      <div className="relative z-10 mx-auto max-w-[1350px]">
        <header className="mb-[60px] flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="flex-1">
            <SectionEyebrow className="mb-3">Features</SectionEyebrow>
            <h2 className="mb-4 max-w-[820px] text-[36px] leading-[1.1] font-medium text-black md:text-[52px]">
              Design, build, and the work that sits around it.
            </h2>
            <p className="text-[16px] font-medium text-[#555555]">
              With TooGood, the site, the app, and the ops around them stay in
              one place.
            </p>
          </div>

          <CtaButton className="self-start md:self-end">
            Start a project
          </CtaButton>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-10">
          <div className="group relative flex min-h-[520px] flex-col overflow-hidden rounded-[24px] bg-[#F6F6F7] p-8 md:col-span-4">
            <div className="mb-8 inline-flex items-center gap-2 self-start rounded-full border border-[#E8E8EA] bg-white px-4 py-2">
              <Lock size={12} className="text-[#555555]" />
              <span className="text-[12px] font-medium tracking-wide text-[#555555]">
                Secure by default
              </span>
            </div>

            <h3 className="mb-3 text-[32px] font-medium text-black">
              Built to last
            </h3>
            <p className="max-w-[260px] text-[14px] leading-[1.6] text-[#555555]">
              Fast, secure, scalable work — clean code, real SEO, and easy
              long-term maintenance.
            </p>

            <div className="relative flex flex-1 items-end pt-8">
              <div className="relative mt-auto flex h-[300px] w-full justify-center md:justify-start">
                <div
                  className="absolute bottom-0 left-[60px] z-0 h-[220px] w-[350px] rounded-[24px] border border-[#E4E4E6] bg-[#ECECEE] transition-transform duration-500 group-hover:-translate-y-8"
                  style={{ transform: "rotate(-10deg) translateY(-45px)" }}
                >
                  <div className="absolute top-7 right-7 h-12 w-16 rounded-lg bg-black/5" />
                </div>
                <div
                  className="absolute bottom-0 left-[30px] z-10 h-[220px] w-[350px] rounded-[24px] border border-[#E0E0E2] bg-[#E8E8EA] transition-transform duration-500 group-hover:-translate-y-4"
                  style={{ transform: "rotate(-5deg) translateY(-22px)" }}
                >
                  <div className="absolute top-7 right-7 h-12 w-16 rounded-lg bg-black/5" />
                </div>
                <div
                  className="absolute bottom-0 left-0 z-20 h-[220px] w-[350px] overflow-hidden rounded-[24px] border border-[#E0E0E2] shadow-xl transition-all duration-500 group-hover:translate-x-5 group-hover:rotate-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f3f3f5 50%, #ffffff 100%)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-transparent" />
                  <div
                    className="pointer-events-none absolute right-0 bottom-0 h-[220px] w-[220px] bg-black/[0.03]"
                    style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                  />
                  <div className="relative z-10 flex h-full flex-col justify-between p-9">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[16px] text-[#A855F6]">
                        &#10035;
                      </span>
                      <span className="text-[24px] font-medium tracking-tight text-black">
                        TooGood
                      </span>
                    </div>
                    <div className="pointer-events-none text-[18px] font-bold tracking-[0.4em] text-black/10 uppercase">
                      TooGood &reg;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex min-h-[520px] flex-col gap-10 overflow-hidden rounded-[24px] bg-[#F6F6F7] p-8 md:col-span-6 md:p-10">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
              <div className="flex-1">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E8E8EA] bg-white px-4 py-2">
                  <span className="text-[14px] font-medium text-[#555555]">
                    $
                  </span>
                  <span className="text-[12px] font-medium tracking-wide text-[#555555]">
                    Connected services
                  </span>
                </div>
                <h3 className="mb-2 text-[32px] leading-[1.1] font-medium text-black">
                  Ads, SEO, and alerts that stay useful
                </h3>
              </div>
              <p className="flex-1 text-[14px] leading-[1.7] text-[#555555] transition-colors md:mt-12">
                Social ads, 360 SEO, and Google campaigns wired to the same
                conversion paths as the product we ship.
              </p>
            </div>

            <div className="flex flex-1 flex-col justify-center rounded-[20px] border border-[#E8E8EA] bg-white p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E8EA] bg-[#F6F6F7]">
                  <Bell size={18} className="text-[#555555]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-medium text-black">
                    Project updates
                  </h4>
                  <p className="text-[12px] text-[#777777]">
                    Know when a launch, fix, or campaign actually moved
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    label: "Site live: homepage shipped",
                    time: "2m ago",
                    color: "#2fcc71",
                  },
                  {
                    label: "SEO: 12 pages indexed",
                    time: "1h ago",
                    color: "#3b83f6",
                  },
                  {
                    label: "Review needed: mobile nav",
                    time: "5h ago",
                    color: "#f49f0a",
                  },
                ].map(
                  (
                    alert: { label: string; time: string; color: string },
                    i: number,
                  ) => (
                    <div
                      key={i}
                      className="group/alert flex cursor-pointer items-center justify-between rounded-[12px] border border-[#E8E8EA] bg-[#F6F6F7] p-3.5 px-5 transition-all hover:border-[#D4D4D6]"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-2 w-2 rounded-full transition-transform group-hover/alert:scale-110"
                          style={{ backgroundColor: alert.color }}
                        />
                        <span
                          className={
                            "text-[14px] font-[500] transition-colors group-hover/alert:text-black " +
                            (i === 0 ? "text-black" : "text-[#666666]")
                          }
                        >
                          {alert.label}
                        </span>
                      </div>
                      <span className="text-[12px] text-[#777777]">
                        {alert.time}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="flex min-h-[440px] flex-col gap-10 overflow-hidden rounded-[24px] bg-[#F6F6F7] p-8 md:col-span-6 md:p-10">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
              <div className="flex-1">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E8E8EA] bg-white px-4 py-2">
                  <span className="text-[14px] font-medium text-[#555555]">
                    $
                  </span>
                  <span className="text-[12px] font-medium tracking-wide text-[#555555]">
                    Clear product UI
                  </span>
                </div>
                <h3 className="mb-2 text-[32px] leading-[1.1] font-medium text-black">
                  Dashboards that stay readable
                </h3>
              </div>
              <p className="flex-1 text-[14px] leading-[1.7] text-[#555555] transition-colors md:mt-12">
                Custom dashboards around your actual workflows — numbers people
                can act on without a support call.
              </p>
            </div>

            <div className="flex flex-1 flex-col justify-center overflow-hidden rounded-[20px] border border-[#E8E8EA] bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <motion.span
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" as const }}
                  className="text-[13px] font-medium tracking-wider text-[#555555] uppercase"
                >
                  This sprint
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut" as const,
                    delay: 0.1,
                  }}
                  className="text-[13px] font-medium tracking-wide text-black/50"
                >
                  12 tickets
                </motion.span>
              </div>

              <div className="mb-6 flex h-[36px] gap-[4px]">
                {Array.from({ length: 42 }).map((_: unknown, i: number) => {
                  let color = "#E4E4E6";
                  if (i < 12) color = "#A855F6";
                  else if (i < 18) color = "#c185fc";
                  else if (i < 24) color = "#e9d5ff";

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20, scaleY: 0.2 }}
                      whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.025,
                        duration: 0.6,
                        ease: [0.215, 0.61, 0.355, 1.0] as const,
                      }}
                      className="relative origin-bottom flex-1 rounded-full"
                      style={{ backgroundColor: color }}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: [0, 1, 0] }}
                        viewport={{ once: true }}
                        transition={{
                          delay: i * 0.025,
                          duration: 0.8,
                        }}
                        className="absolute inset-0 rounded-full bg-white/40 blur-[4px]"
                      />
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut" as const,
                    delay: 1.0,
                  }}
                  className="text-[12px] font-medium text-[#555555]"
                >
                  8 shipped
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut" as const,
                    delay: 1.2,
                  }}
                  className="text-[12px] font-medium tracking-wider text-[#A855F6] uppercase"
                >
                  4 in review
                </motion.span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:col-span-4">
            <div className="group relative flex flex-1 flex-col justify-center overflow-hidden rounded-[32px] bg-[#F6F6F7] p-9">
              <p className="mb-2 text-[12px] font-medium text-[#555555]">
                This month
              </p>
              <h4 className="text-[48px] leading-none font-normal tracking-tight text-black">
                4 live
              </h4>
              <div className="mt-6 flex">
                <div className="rounded-full bg-[#E8F8EE] px-4 py-1.5 text-[13px] font-medium text-[#1a9a4a]">
                  +2 vs last month
                </div>
              </div>

              <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-90 transition-opacity group-hover:opacity-100">
                <svg
                  width="110"
                  height="45"
                  viewBox="0 0 80 32"
                  fill="none"
                  className="overflow-visible"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" as const }}
                    d="M0 22 C10 22 15 10 25 14 C35 18 40 10 50 16 C60 22 65 14 80 10"
                    stroke="#A855F6"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="group relative flex flex-1 flex-col justify-center overflow-hidden rounded-[32px] bg-[#F6F6F7] p-9">
              <div className="absolute top-8 right-9 left-9 flex items-center justify-end">
                <div className="flex cursor-pointer items-center gap-1 text-[12px] font-medium text-[#555555] transition-colors hover:text-black">
                  More <ChevronRight size={14} />
                </div>
              </div>

              <div className="mt-12">
                <p className="mb-2 text-[12px] font-medium text-[#555555]">
                  Products shipped
                </p>
                <h4 className="text-[48px] leading-none font-normal tracking-tight text-black">
                  12
                </h4>
                <div className="mt-6 flex">
                  <div className="rounded-full bg-[#E8F8EE] px-4 py-1.5 text-[13px] font-medium text-[#1a9a4a]">
                    +3 this quarter
                  </div>
                </div>
              </div>

              <div className="absolute right-10 bottom-12 opacity-90 transition-opacity group-hover:opacity-100">
                <svg
                  width="110"
                  height="45"
                  viewBox="0 0 80 32"
                  fill="none"
                  className="overflow-visible"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut" as const,
                      delay: 0.3,
                    }}
                    d="M0 25 C15 25 25 15 35 18 C45 21 55 10 80 6"
                    stroke="#A855F6"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
