"use client";

import ArrowFillButton from "@/components/NewDesignComponents/ArrowFillButton";

const BRANDS = [
  "Web Design",
  "Development",
  "Mobile Apps",
  "AI Automation",
  "UI/UX",
  "Dashboards",
  "Chatbots",
  "Brand Sites",
  "E‑commerce",
  "SaaS",
  "Healthcare",
  "Finance",
  "Real Estate",
  "Hospitality",
  "Education",
  "Retail",
];

function BrandPill({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-2xl bg-white px-5 py-3 text-[13px] font-medium tracking-tight text-new-site-fg shadow-[0_1px_0_rgba(0,0,0,0.04)] md:px-6 md:py-3.5 md:text-[14px]">
      {label}
    </span>
  );
}

function BrandMarquee({ reverse = false }: { reverse?: boolean }) {
  const items = [...BRANDS, ...BRANDS];
  return (
    <div className="relative overflow-hidden">
      <div
        className={
          "flex w-max gap-3 " +
          (reverse ? "animate-marquee-right" : "animate-marquee-left")
        }
      >
        {items.map((label, i) => (
          <BrandPill key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  );
}

export default function NewHero() {
  return (
    <section
      id="new-site-hero"
      className="relative flex min-h-[calc(100dvh-7rem)] w-full flex-col bg-[var(--new-site-background-color)] text-[var(--new-site-entire-site-text-color)]"
    >
      <div className="mx-auto flex w-full max-w-[1340px] flex-1 flex-col items-center justify-center px-5 pt-16 pb-12 text-center md:px-8 md:pt-20 md:pb-16">
        <p
          data-reveal-02="words"
          className="mb-6 inline-flex rounded-full bg-[#d8ecf8] px-4 py-2 text-[13px] font-medium text-[#1a5f8a] md:mb-8 md:text-[14px]"
        >
          Now shipping sites UK brands actually keep
        </p>

        <h1 className="max-w-[18ch] text-[clamp(2.75rem,9.5vw,5.75rem)] leading-[0.9] font-extrabold tracking-[-0.035em] text-[var(--new-site-entire-site-text-color)] capitalize [font-family:var(--font-circular),sans-serif]">
          <span data-reveal-02="words" className="block">
            The best way to
          </span>
          <span data-reveal-02="words" data-delay="0.08" className="block">
            build TooGood
          </span>
        </h1>

        <p
          data-reveal-02="words"
          data-delay="0.15"
          className="mt-6 max-w-[34rem] text-[16px] leading-relaxed text-[var(--new-site-entire-site-text-color)] md:mt-8 md:text-[18px]"
        >
          Unlock sharper websites, grow customer trust, and ship experiences
          people actually love — design and development that holds its own.
        </p>

        <div className="mt-8 md:mt-10">
          <ArrowFillButton
            href="#contact"
            btnText="Book a demo"
            className="new-site-header-fill-btn px-6 py-5"
            bgColor="var(--new-site-button-secondary-bg-color)"
            textColor="#ffffff"
            fillBgColor="black"
            fillTextColor="white"
            hoverFillBgColor="black"
            hoverFillTextColor="white"
            arrowColor="white"
            hoverArrowColor="white"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 pb-8 md:gap-4 md:pb-10">
        <BrandMarquee />
        <BrandMarquee reverse />
      </div>
    </section>
  );
}
