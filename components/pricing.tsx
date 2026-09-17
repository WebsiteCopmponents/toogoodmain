"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSiteModal } from "@/components/ContactModal";
import { Check, X, Headphones, ShieldCheck } from "lucide-react";
import ArrowFillButton from "@/components/NewDesignComponents/ArrowFillButton";

const pricingPlans = [
  {
    id: "online",
    title: "Site",
    description: "A conversion-focused website with design, build, and SEO basics.",
    price: "49",
    features: [
      { text: "Web design and development", included: true },
      { text: "UI/UX for the main journeys", included: true },
      { text: "Domain and business email setup", included: true },
      { text: "On-page SEO to launch", included: true },
      { text: "Custom dashboard or app", included: false },
    ],
    buttonText: "Start a project",
  },
  {
    id: "community",
    title: "Product",
    description: "The site plus a web app or dashboard that matches how you work.",
    price: "99",
    features: [
      { text: "Everything in Site", included: true },
      { text: "Custom web application", included: true },
      { text: "Internal or client dashboard", included: true },
      { text: "360 SEO after launch", included: true },
      { text: "Native mobile application", included: false },
    ],
    buttonText: "Start a project",
  },
  {
    id: "personal",
    title: "Studio",
    description: "Web, mobile, and the connected work — ads, SEO, and social.",
    price: "249",
    features: [
      { text: "Web and mobile applications", included: true },
      { text: "UI/UX across every surface", included: true },
      { text: "AI automation or chatbot", included: true },
      { text: "Social and Google advertising", included: true },
      { text: "Domain, email, and social management", included: true },
    ],
    buttonText: "Start a project",
  },
];

export default function Pricing({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState("community");
  const { open } = useSiteModal();

  return (
    <section
      className={
        "flex w-full flex-col items-center bg-[var(--new-site-background-color)] px-6 py-[80px] text-[var(--new-site-entire-site-text-color)] md:px-[135px] md:py-[120px] " +
        (className || "")
      }
    >
      <div className="flex flex-col items-center gap-4 text-center max-w-[1170px] mx-auto mb-[80px]">
        <h2 className="font-heading text-[32px] md:text-[52px] font-medium leading-[1.1] md:leading-[56px] tracking-[-0.8px] text-black">
          Simple studio <br className="hidden md:block" /> packages
        </h2>
        <p className="max-w-[600px] font-sans text-[16px] leading-[26px] font-normal tracking-[-0.18px] text-black/70 md:text-[18px]">
          Pick the shape of the work — site, product, or the full studio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-[1170px] mx-auto mb-12">
        {pricingPlans.map((plan) => {
          const isActive = activeId === plan.id;
          return (
            <div
              key={plan.id}
              onMouseEnter={() => setActiveId(plan.id)}
              onClick={() => setActiveId(plan.id)}
              className={
                "relative flex flex-col items-start p-8 rounded-[30px] transition-all duration-500 transform-gpu cursor-default " +
                (isActive
                  ? "z-10 scale-[1.02] bg-black shadow-[0px_20px_40px_rgba(0,0,0,0.18)]"
                  : "z-0 scale-100 bg-[#ece7dc] shadow-none")
              }
            >
              <div className="flex flex-col gap-2 mb-6 w-full">
                <h3
                  className={
                    "font-heading text-[24px] font-medium leading-tight transition-colors duration-500 " +
                    (isActive ? "text-white" : "text-black")
                  }
                >
                  {plan.title}
                </h3>
                <p
                  className={
                    "font-sans text-[15px] leading-[22px] transition-colors duration-500 " +
                    (isActive ? "text-white/80" : "text-black/70")
                  }
                >
                  {plan.description}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-8 w-full">
                <span
                  className={
                    "font-sans text-[16px] leading-[24px] tracking-[-0.4px] transition-colors duration-500 " +
                    (isActive ? "text-white/70" : "text-black/70")
                  }
                >
                  Start from
                </span>
                <div className="flex items-baseline gap-1">
                  <span
                    className={
                      "font-heading text-[52px] font-medium leading-[56px] tracking-[-0.8px] transition-colors duration-500 " +
                      (isActive ? "text-white" : "text-black")
                    }
                  >
                    {"$" + plan.price}
                  </span>
                  <span
                    className={
                      "font-sans text-[16px] leading-[24px] tracking-[-0.4px] transition-colors duration-500 " +
                      (isActive ? "text-white/70" : "text-black/70")
                    }
                  >
                    /month
                  </span>
                </div>
              </div>

              <div
                className={
                  "w-full h-px mb-8 transition-colors duration-500 " +
                  (isActive ? "bg-white/10" : "bg-black/10")
                }
              />

              <ul className="flex flex-col gap-4 mb-10 w-full">
                {plan.features.map(
                  (
                    feature: { text: string; included: boolean },
                    idx: number,
                  ) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div
                        className={
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 " +
                          (feature.included
                            ? isActive
                              ? "bg-[#FFAEE7] text-black"
                              : "bg-black/10 text-black"
                            : isActive
                              ? "bg-white/20 text-white/60"
                              : "text-black/30")
                        }
                      >
                        {feature.included ? (
                          <Check size={12} strokeWidth={3} />
                        ) : (
                          <X size={12} strokeWidth={3} />
                        )}
                      </div>
                      <span
                        className={
                          "font-sans text-[15px] transition-colors duration-500 " +
                          (isActive
                            ? feature.included
                              ? "text-white"
                              : "text-white/40"
                            : feature.included
                              ? "text-black"
                              : "text-black/40")
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ),
                )}
              </ul>

              <ArrowFillButton
                href="#contact"
                btnText={plan.buttonText}
                className="new-site-header-fill-btn mt-auto w-full justify-center px-6 py-5"
                bgColor={
                  isActive
                    ? "var(--new-site-button-secondary-bg-color)"
                    : "#ffffff"
                }
                textColor="#000000"
                fillBgColor="black"
                fillTextColor="white"
                hoverFillBgColor="black"
                hoverFillTextColor="white"
                arrowColor="white"
                hoverArrowColor="white"
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  open("project");
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-8 md:gap-6 w-full max-w-[350px] md:max-w-none mx-auto">
        <div className="flex w-full flex-col items-center justify-center gap-4 self-stretch text-black md:flex-row md:gap-12">
          <div className="flex items-center gap-3">
            <div className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-black">
              <X size={10} className="text-white" strokeWidth={3} />
            </div>
            <span className="font-sans text-[14px] md:text-[16px] font-normal leading-[22px] md:leading-normal tracking-[-0.4px] opacity-90 md:opacity-100">
              No Long Term Contracts
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-black">
              <Headphones size={10} className="text-white" strokeWidth={3} />
            </div>
            <span className="font-sans text-[14px] md:text-[16px] font-normal leading-[22px] md:leading-normal tracking-[-0.4px] opacity-90 md:opacity-100">
              Expert Support On Demand
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-black">
              <ShieldCheck size={10} className="text-white" strokeWidth={3} />
            </div>
            <span className="font-sans text-[14px] md:text-[16px] font-normal leading-[22px] md:leading-normal tracking-[-0.4px] opacity-90 md:opacity-100">
              Secure and Easy Signup
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-[var(--new-site-background-color)] p-2 ring-1 ring-black/10">
          <div className="relative w-[80px] h-[32px] aspect-[5/2]">
            <Image
              src="https://cdn.jiro.build/Solra/All%20Images/Avater%203%20man.png"
              alt="Users"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center px-3 py-1 ">
            <span className="font-sans text-[12px] leading-[18px] font-normal tracking-[-0.192px] text-black md:text-[14px] md:leading-[22px] md:font-medium md:tracking-normal">
              Join thousands who rely on our coaching programs every day.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
