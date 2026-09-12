"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionEyebrow from "@/components/section-eyebrow";
import { CtaButton, CtaStaggerButton } from "@/components/cta-button";
//File : our-services.tsx
export default function OurServices({ className }: { className?: string }) {
  const cards = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
      title: "Social media advertising",
      description:
        "Paid social that points at the work we already built — clear offers, clean landing pages, and ads that match the brand.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1489945052260-4f21c52268b9?q=80&w=800&auto=format&fit=crop",
      title: "360 SEO",
      description:
        "Technical, on-page, and content work so the site we ship can actually be found — not a report that sits in a folder.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800&auto=format&fit=crop",
      title: "Google advertising",
      description:
        "Search and performance campaigns wired to the same conversion paths as your site, dashboard, or app.",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop",
      title: "Domain, email & social",
      description:
        "Domain management, business email setup, and social management — the unglamorous layer that keeps a brand live.",
    },
  ];

  return (
    <section
      className={
        "bg-white py-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans " +
        (className || "")
      }
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <SectionEyebrow className="mb-6">Connected services</SectionEyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-[40px] md:text-[48px] font-medium text-[#131313] leading-[1.1] tracking-tight"
            >
              Main build, plus the work <br className="hidden md:block" />{" "}
              that sits around it
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <CtaButton>Start a project</CtaButton>
          </motion.div>
        </div>

        <div className="relative">
          <div
            className="flex gap-5 overflow-x-auto pb-12 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[85vw] md:w-[580px] snap-start group cursor-pointer"
              >
                <motion.div
                  className="rounded-[20px] overflow-hidden mb-6"
                  initial={{ height: 550 }}
                  whileHover={{ height: 400 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                <div className="flex flex-col gap-2 transition-all duration-500 ease-out opacity-0 -translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                  <div className="flex justify-between items-center">
                    <h3 className="font-heading text-[24px] font-medium text-[#131313]">
                      {card.title}
                    </h3>
                    <CtaStaggerButton className="px-6 py-3 text-[14px]">
                      Read more
                    </CtaStaggerButton>
                  </div>
                  <p className="text-[#767777] text-[16px] leading-relaxed max-w-[400px] font-sans">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
