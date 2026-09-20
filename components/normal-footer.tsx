"use client";
//File : normal-footer.tsx
import React, { useState } from "react";
import { useSiteModal } from "@/components/ContactModal";

export default function NormalFooter({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const { open } = useSiteModal();

  return (
    <footer
      className={
        "bg-[var(--new-site-button-primary-bg-color)] text-[var(--new-site-button-primary-text-color)] pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans " +
        (className || "")
      }
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[42px] leading-tight mb-6">
            <span className="block font-medium">Start a project</span>
            <span className="block font-medium text-gray-200">
              with TooGood.agency
            </span>
          </h2>

          <p className="text-[#898989] text-base md:text-[15px] max-w-lg mb-10 leading-relaxed font-sans">
            Notes from the studio on web, mobile, dashboards,
            <br className="hidden md:block" />
            and the work that sits around a launch.
          </p>

          <div className="flex w-full max-w-[560px] flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:border sm:border-white/5 sm:bg-[#fff] sm:p-1">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full flex-1 rounded-full border-none bg-[#fff] px-6 py-4 font-sans text-[15px] text-[#111] outline-none placeholder:text-[#898989] sm:bg-transparent"
            />
            <button
              type="button"
              onClick={() => setEmail("")}
              className="w-full min-w-[140px] rounded-full bg-[#00BF63] px-8 py-4 font-sans text-[15px] font-bold text-white transition-colors hover:bg-white hover:text-black sm:w-auto"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#2B2A2A] mb-16"></div>

        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-12 lg:gap-0">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="font-sans text-[1.25em] tracking-[-0.02em] text-[#f4f4f4]"
                aria-label="TooGood.agency"
              >
                TooGood.agency
              </a>
            </div>
            <p className="text-[#898989] text-sm leading-relaxed max-w-[200px] font-sans">
              A UK online studio for web,
              <br />
              mobile, and UI/UX.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:pl-12">
            <div className="flex flex-col gap-5">
              <h4 className="font-heading text-[15px] font-medium">Services</h4>
              <ul className="flex flex-col gap-3">
                {["Web design", "Web apps", "Mobile"].map((item: string) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#898989] text-[13px] hover:text-white transition-colors font-sans"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <h4 className="font-heading text-[15px] font-medium">
                Resources
              </h4>
              <ul className="flex flex-col gap-3">
                {["Work", "Industries", "FAQ"].map((item: string) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#898989] text-[13px] hover:text-white transition-colors font-sans"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <h4 className="font-heading text-[15px] font-medium">Company</h4>
              <ul className="flex flex-col gap-3">
                {(
                  [
                    { label: "About", href: "#" },
                    { label: "Contact", view: "project" as const },
                    { label: "Privacy Policy", view: "privacy" as const },
                    { label: "Terms & Conditions", view: "terms" as const },
                  ] as const
                ).map((item) => (
                  <li key={item.label}>
                    {"view" in item ? (
                      <button
                        type="button"
                        onClick={() => open(item.view)}
                        className="font-sans text-[13px] text-[#898989] transition-colors hover:text-white"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        className="font-sans text-[13px] text-[#898989] transition-colors hover:text-white"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#898989] text-[11px] uppercase tracking-widest font-sans">
            &copy; 2026 TooGood.agency. All rights reserved.
          </p>
          <div className="flex gap-6"></div>
        </div>
      </div>
    </footer>
  );
}
