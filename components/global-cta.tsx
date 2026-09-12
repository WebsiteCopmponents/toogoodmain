"use client";

import React from "react";
import { Phone } from "lucide-react";

const ROW_1_TAGS = [
  {
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=100",
    label: "Web Design",
  },
  {
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=100",
    label: "Web Development",
  },
  {
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=100",
    label: "Web Applications",
  },
  {
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=100",
    label: "Mobile Applications",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=100",
    label: "UI/UX Design",
  },
];

const ROW_2_TAGS = [
  {
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=100",
    label: "AI Automation",
  },
  {
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=100",
    label: "AI Chatbots",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=100",
    label: "360 SEO",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=100",
    label: "Google advertising",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=100",
    label: "Social advertising",
  },
];

export default function GlobalCta({ className }: { className?: string }) {
  return (
    <section
      className={
        "w-full bg-[#f9f8f8] py-16 md:py-[120px] overflow-hidden selection:bg-black selection:text-white font-sans " +
        (className || "")
      }
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col items-center mb-[28px]">
          <div className="inline-flex items-center gap-[12px] bg-white border border-[#e8e8e8] rounded-[50px] p-[8px] sm:p-[10px] pr-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
              alt="TooGood.agency"
              className="w-[36px] sm:w-[44px] h-[36px] sm:h-[44px] rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="leading-tight">
              <div className="text-[13px] sm:text-[14px] font-semibold text-[#111010] font-sans">
                TooGood.agency
              </div>
              <div className="text-[11px] sm:text-[12px] text-[#898888] font-normal font-sans">
                UK online studio
              </div>
            </div>
            <button
              type="button"
              className="w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] bg-[#f1f0f1] rounded-full flex items-center justify-center text-[#545554] hover:bg-[#e0e0e0] transition-colors cursor-pointer ml-1 sm:ml-2"
            >
              <Phone size={12} className="fill-[#545554]" />
            </button>
          </div>
        </div>

        <div className="max-w-[520px] mx-auto text-center mb-[48px]">
          <p className="text-[15px] sm:text-[17px] text-[#545554] font-normal leading-[1.6] px-4 font-sans">
            &ldquo;Hi — we&apos;re TooGood. An early-stage UK studio for web,
            mobile, dashboards, and UI/UX. Send the brief. We design, build,
            and stay on for the work around it.&rdquo;
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-[12px]">
        <div className="relative flex overflow-hidden group">
          <div
            className="flex min-w-full animate-marquee-left whitespace-nowrap motion-reduce:animate-none"
          >
            {[...ROW_1_TAGS, ...ROW_1_TAGS, ...ROW_1_TAGS, ...ROW_1_TAGS].map(
              (tag: { image: string; label: string }, idx: number) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-[10px] sm:gap-[14px] bg-transparent border border-[#e2e3e2] rounded-full pl-[8px] pr-[24px] sm:pr-[36px] py-[8px] sm:py-[10px] h-14 sm:h-[72px] mr-[16px] shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
                >
                  <div className="w-10 sm:w-[52px] h-10 sm:h-[52px] bg-[#f4f5f4] rounded-full flex items-center justify-center overflow-hidden border border-[#eeefee]">
                    <img
                      src={tag.image}
                      alt={tag.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="font-heading text-[20px] sm:text-[28px] md:text-[32px] font-medium text-[#111010] tracking-tight">
                    {tag.label}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="relative flex overflow-hidden group">
          <div
            className="flex min-w-full animate-marquee-right whitespace-nowrap motion-reduce:animate-none"
          >
            {[...ROW_2_TAGS, ...ROW_2_TAGS, ...ROW_2_TAGS, ...ROW_2_TAGS].map(
              (tag: { image: string; label: string }, idx: number) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-[10px] sm:gap-[14px] bg-transparent border border-[#e2e3e2] rounded-full pl-[8px] pr-[24px] sm:pr-[36px] py-[8px] sm:py-[10px] h-14 sm:h-[72px] mr-[16px] shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
                >
                  <div className="w-10 sm:w-[52px] h-10 sm:h-[52px] bg-[#f4f5f4] rounded-full flex items-center justify-center overflow-hidden border border-[#eeefee]">
                    <img
                      src={tag.image}
                      alt={tag.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="font-heading text-[20px] sm:text-[28px] md:text-[32px] font-medium text-[#111010] tracking-tight">
                    {tag.label}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
