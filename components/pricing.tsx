"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  X,
  Headphones,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

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
    href: "/contact",
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
    href: "/contact",
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
    href: "/contact",
  },
];

export default function Pricing({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState("community");

  return (
    <section
      className={
        "w-full bg-white py-[80px] md:py-[120px] px-6 md:px-[135px] flex flex-col items-center " +
        (className || "")
      }
    >
      <div className="flex flex-col items-center gap-4 text-center max-w-[1170px] mx-auto mb-[80px]">
        <h2 className="text-[#093601] font-heading text-[32px] md:text-[52px] font-medium leading-[1.1] md:leading-[56px] tracking-[-0.8px]">
          Simple studio <br className="hidden md:block" /> packages
        </h2>
        <p className="text-[#093601] font-sans text-[16px] md:text-[18px] font-normal leading-[26px] tracking-[-0.18px] opacity-80 max-w-[600px]">
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
                  ? "bg-[#093601] scale-[1.02] shadow-[0px_20px_40px_rgba(9,54,0,0.15)] z-10"
                  : "bg-[#ECFBEA] scale-100 shadow-none z-0")
              }
            >
              <div className="flex flex-col gap-2 mb-6 w-full">
                <h3
                  className={
                    "font-heading text-[24px] font-medium leading-tight transition-colors duration-500 " +
                    (isActive ? "text-white" : "text-[#093601]")
                  }
                >
                  {plan.title}
                </h3>
                <p
                  className={
                    "font-sans text-[15px] leading-[22px] transition-colors duration-500 " +
                    (isActive ? "text-white/80" : "text-[#093601]/70")
                  }
                >
                  {plan.description}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-8 w-full">
                <span
                  className={
                    "font-sans text-[16px] leading-[24px] tracking-[-0.4px] transition-colors duration-500 " +
                    (isActive ? "text-white/70" : "text-[#093601]/70")
                  }
                >
                  Start from
                </span>
                <div className="flex items-baseline gap-1">
                  <span
                    className={
                      "font-heading text-[52px] font-medium leading-[56px] tracking-[-0.8px] transition-colors duration-500 " +
                      (isActive ? "text-white" : "text-[#093601]")
                    }
                  >
                    {"$" + plan.price}
                  </span>
                  <span
                    className={
                      "font-sans text-[16px] leading-[24px] tracking-[-0.4px] transition-colors duration-500 " +
                      (isActive ? "text-white/70" : "text-[#093601]/70")
                    }
                  >
                    /month
                  </span>
                </div>
              </div>

              <div
                className={
                  "w-full h-px mb-8 transition-colors duration-500 " +
                  (isActive ? "bg-white/10" : "bg-[#093601]/10")
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
                              ? "bg-white text-[#093601]"
                              : "bg-[#093601]/10 text-[#093601]"
                            : isActive
                              ? "bg-white/20 text-white/60"
                              : "text-[#093601]/30")
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
                              ? "text-[#093601]"
                              : "text-[#093601]/40")
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ),
                )}
              </ul>

              <Link href={plan.href} className="mt-auto w-full">
                <button
                  className={
                    "flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-4 font-sans text-[16px] font-semibold transition-all duration-500 group active:scale-[0.98] " +
                    (isActive
                      ? "bg-[#84FB6C] text-[#0A0C13] shadow-[0px_8px_24px_rgba(133,250,109,0.2)] hover:bg-[#76E161]"
                      : "bg-white text-[#093601] hover:bg-[#84FB6C] hover:text-[#0A0C13]")
                  }
                >
                  {plan.buttonText}
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <ArrowRight
                      size={18}
                      className={
                        "absolute transition-all duration-500 " +
                        (isActive
                          ? "opacity-0 scale-50"
                          : "opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-50")
                      }
                    />
                    <ArrowUpRight
                      size={18}
                      className={
                        "absolute transition-all duration-500 " +
                        (isActive
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100")
                      }
                    />
                  </div>
                </button>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-8 md:gap-6 w-full max-w-[350px] md:max-w-none mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-[#093601] w-full self-stretch">
          <div className="flex items-center gap-3">
            <div className="w-[18px] h-[18px] rounded-full bg-[#093601] flex items-center justify-center flex-shrink-0">
              <X size={10} className="text-white" strokeWidth={3} />
            </div>
            <span className="font-sans text-[14px] md:text-[16px] font-normal leading-[22px] md:leading-normal tracking-[-0.4px] opacity-90 md:opacity-100">
              No Long Term Contracts
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[18px] h-[18px] rounded-full bg-[#093601] flex items-center justify-center flex-shrink-0">
              <Headphones size={10} className="text-white" strokeWidth={3} />
            </div>
            <span className="font-sans text-[14px] md:text-[16px] font-normal leading-[22px] md:leading-normal tracking-[-0.4px] opacity-90 md:opacity-100">
              Expert Support On Demand
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[18px] h-[18px] rounded-full bg-[#093601] flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={10} className="text-white" strokeWidth={3} />
            </div>
            <span className="font-sans text-[14px] md:text-[16px] font-normal leading-[22px] md:leading-normal tracking-[-0.4px] opacity-90 md:opacity-100">
              Secure and Easy Signup
            </span>
          </div>
        </div>

        <div className="flex items-center -space-x-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.04)] bg-[#ECFBEA] rounded-full p-2 flex gap-2 shadow-sm">
          <div className="relative w-[80px] h-[32px] aspect-[5/2]">
            <Image
              src="https://cdn.jiro.build/Solra/All%20Images/Avater%203%20man.png"
              alt="Users"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center px-3 py-1 ">
            <span className="text-[#093601] font-sans text-[12px] md:text-[14px] font-normal md:font-medium leading-[18px] md:leading-[22px] tracking-[-0.192px] md:tracking-normal opacity-90">
              Join thousands who rely on our coaching programs every day.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
