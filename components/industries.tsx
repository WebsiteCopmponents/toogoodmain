"use client";
//File : industries.tsx
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionEyebrow from "@/components/section-eyebrow";

const PROXY = "https://wsrv.nl/?url=";

export type FaqItem = {
  num: string;
  question: string;
  answer: string;
  img: string;
};

const DEFAULT_ITEMS: FaqItem[] = [
  {
    num: "01",
    question: "Healthcare",
    answer:
      "Clinic sites, patient portals, and internal dashboards that keep bookings, records, and staff workflows in one place — without looking like a template.",
    img:
      PROXY +
      encodeURIComponent(
        "images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&auto=format&fit=crop",
      ),
  },
  {
    num: "02",
    question: "Real estate",
    answer:
      "Listing sites, agent tools, and enquiry flows that make a property easy to find, easy to trust, and easy to enquire on — on desktop and on the phone.",
    img:
      PROXY +
      encodeURIComponent(
        "images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&auto=format&fit=crop",
      ),
  },
  {
    num: "03",
    question: "Restaurants",
    answer:
      "Menus, bookings, and brand sites that feel as considered as the room — plus the SEO and ads that fill the tables mid-week.",
    img:
      PROXY +
      encodeURIComponent(
        "images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop",
      ),
  },
  {
    num: "04",
    question: "Finance",
    answer:
      "Clear product sites and client dashboards where the numbers have to be right — designed so people can act without a support call.",
    img:
      PROXY +
      encodeURIComponent(
        "images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&auto=format&fit=crop",
      ),
  },
  {
    num: "05",
    question: "SaaS",
    answer:
      "Marketing sites, onboarding, and the app UI itself — so the product you ship feels like one system, not a pile of tools.",
    img:
      PROXY +
      encodeURIComponent(
        "images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop",
      ),
  },
  {
    num: "06",
    question: "Education",
    answer:
      "Course platforms, school sites, and learning dashboards that get out of the way — so the lesson is what people remember.",
    img:
      PROXY +
      encodeURIComponent(
        "images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&auto=format&fit=crop",
      ),
  },
];

type Props = {
  eyebrow?: string;
  items?: FaqItem[];
  defaultOpen?: number;
  className?: string;
};

export default function Industries({
  eyebrow = "Industries",
  items = DEFAULT_ITEMS,
  defaultOpen = 0,
  className,
}: Props) {
  const [active, setActive] = useState<number | null>(defaultOpen);
  const [lastImg, setLastImg] = useState<number>(defaultOpen);

  const onClick = (i: number) => {
    if (active === i) {
      setActive(null);
      return;
    }
    setActive(i);
    setLastImg(i);
  };

  const go = (dir: -1 | 1) => {
    const next = (lastImg + dir + items.length) % items.length;
    setActive(next);
    setLastImg(next);
  };

  return (
    <section className={className}>
      <div className="grid min-h-screen w-full grid-cols-1 bg-[#F6F6F7] text-black antialiased font-sans max-[900px]:min-h-0 max-[900px]:grid-rows-[auto_40vh] min-[901px]:grid-cols-2">
        <aside className="relative flex flex-col bg-[#F6F6F7] px-6 py-8 max-[900px]:px-6 min-[901px]:px-[72px] min-[901px]:py-14">
          <div className="mb-auto">
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </div>

          <div>
            {items.map((it, i) => {
              const open = active === i;
              return (
                <div
                  key={it.num}
                  data-open={open ? "" : undefined}
                  className="group border-b border-white/20"
                >
                  <button
                    className="grid w-full cursor-pointer appearance-none grid-cols-[40px_1fr_22px] items-center gap-x-6 border-0 bg-transparent py-[22px] text-left font-inherit text-black opacity-30 transition-opacity duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-55 group-data-[open]:opacity-100 motion-reduce:duration-150"
                    type="button"
                    onClick={() => onClick(i)}
                  >
                    <span className="font-heading text-[12px] font-bold uppercase leading-none tracking-[-0.02em]">
                      {it.num}
                    </span>
                    <h3 className="font-heading  font-medium leading-[1.15]  min-[901px]:text-lg">
                      {it.question}
                    </h3>
                    <span className="relative inline-block h-[14px] w-[14px] justify-self-end">
                      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[open]:rotate-90 motion-reduce:duration-150" />
                      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[open]:rotate-180 motion-reduce:duration-150" />
                    </span>
                  </button>
                  <div className="grid grid-cols-[40px_1fr_22px] gap-x-6">
                    <span />
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[open]:grid-rows-[1fr] motion-reduce:duration-150">
                      <div className="min-h-0 overflow-hidden">
                        <p className="m-0 pb-[26px] font-sans text-[15px] leading-[1.48] tracking-[-0.005em] text-black/60">
                          {it.answer}
                        </p>
                      </div>
                    </div>
                    <span />
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        <aside className="relative min-h-[40vh] overflow-hidden bg-[#0e1214] after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(80%_60%_at_60%_40%,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.04)_55%,rgba(0,10,20,0.2)_100%)] after:mix-blend-overlay">
          {items.map((it, i) => (
            <img
              key={it.num}
              src={it.img}
              alt=""
              draggable={false}
              className={
                "absolute inset-0 size-full object-cover  saturate-[1.15] transition-[opacity,transform,filter] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] " +
                (lastImg === i
                  ? "scale-110 opacity-100"
                  : "scale-[1.18] opacity-0")
              }
            />
          ))}
        </aside>
      </div>

      <div className="flex items-center gap-3 bg-black px-6 py-5 min-[901px]:hidden">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-[width] duration-300"
            style={{ width: `${((lastImg + 1) / items.length) * 100}%` }}
          />
        </div>
        <span className="shrink-0 text-[12px] tabular-nums text-white/60">
          {items[lastImg]?.num} / {String(items.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous industry"
            onClick={() => go(-1)}
            className="flex size-10 items-center justify-center rounded-full border border-white/30 text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next industry"
            onClick={() => go(1)}
            className="flex size-10 items-center justify-center rounded-full border border-white/30 text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
