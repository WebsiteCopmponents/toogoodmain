"use client";
//File : our-services.tsx
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import SectionEyebrow from "@/components/section-eyebrow";
import { CtaButton, CtaStaggerButton } from "@/components/cta-button";

export default function OurServices({ className }: { className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const updateProgress = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max <= 0 ? 1 : el.scrollLeft / max);
    const card = el.querySelector<HTMLElement>("[data-service-card]");
    const step = card ? card.offsetWidth + 20 : 1;
    setActiveIndex(
      Math.min(cards.length - 1, Math.max(0, Math.round(el.scrollLeft / step))),
    );
  };

  const scrollByCard = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-service-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

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
            <SectionEyebrow className="mb-6">Our Projects</SectionEyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-[40px] md:text-[48px] font-medium text-[#131313] leading-[1.1] tracking-tight"
            >
              Main build, plus the work <br className="hidden md:block" /> that
              sits around it
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

        <div>
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:pb-12"
          >
            {cards.map((card, index) => {
              const open = openId === card.id;
              return (
                <motion.div
                  key={card.id}
                  data-service-card=""
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-[85vw] md:w-[580px] snap-start group cursor-pointer"
                >
                  <div className="mb-6 overflow-hidden rounded-[20px] h-[70vw] max-h-[420px] transition-[height] duration-500 ease-out md:max-h-none md:h-[550px] md:group-hover:h-[400px]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex flex-col gap-2 md:hidden">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading text-[24px] font-medium text-[#131313]">
                        {card.title}
                      </h3>
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-label={
                          open
                            ? "Hide " + card.title + " description"
                            : "Show " + card.title + " description"
                        }
                        onClick={() => setOpenId(open ? null : card.id)}
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-[#FDFCFD]"
                      >
                        <ChevronDown
                          size={18}
                          className={
                            "transition-transform duration-500 ease-out " +
                            (open ? "rotate-180" : "")
                          }
                        />
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key={card.id}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1] as const,
                          }}
                          className="overflow-hidden"
                        >
                          <p className="pt-1 pb-2 text-[#767777] text-[16px] leading-relaxed font-sans">
                            {card.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="hidden md:flex flex-col gap-2 transition-all duration-500 ease-out opacity-0 -translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
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
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-3 md:hidden">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#131313]/10">
              <div
                className="h-full rounded-full bg-[#131313] transition-[width] duration-300"
                style={{ width: `${Math.max(progress * 100, 8)}%` }}
              />
            </div>
            <span className="shrink-0 text-[12px] tabular-nums text-[#767777]">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(cards.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous service"
                onClick={() => scrollByCard(-1)}
                className="flex size-10 items-center justify-center rounded-full border border-[#131313]/20 text-[#131313]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next service"
                onClick={() => scrollByCard(1)}
                className="flex size-10 items-center justify-center rounded-full border border-[#131313]/20 text-[#131313]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
