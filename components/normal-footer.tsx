"use client";

import React, { useState } from "react";

export default function NormalFooter({ className }: { className?: string }) {
  const [email, setEmail] = useState("");

  return (
    <footer
      className={
        "bg-[#101110] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans " +
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

          <div className="flex flex-col sm:flex-row items-center gap-0 w-full max-w-[560px] bg-[#fff] rounded-full p-1 border border-white/5">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-[15px] text-white placeholder:text-[#898989] w-full font-sans"
            />
            <button
              type="button"
              onClick={() => setEmail("")}
              className="bg-[#034F47] hover:bg-[#023d36] transition-colors text-white font-bold px-8 py-4 rounded-full text-[15px] w-full sm:w-auto min-w-[140px] font-sans"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#2B2A2A] mb-16"></div>

        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-12 lg:gap-0">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.jiro.build/Sumon/orbit%20logo.png"
                alt="TooGood.agency"
                className="w-20 h-20 object-contain"
                referrerPolicy="no-referrer"
              />
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
                      className="text-[#898989] text-[13px] hover:text-[#D4FE3F] transition-colors font-sans"
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
                {["Work", "Industries", "FAQ"].map(
                  (item: string) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-[#898989] text-[13px] hover:text-[#D4FE3F] transition-colors font-sans"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <h4 className="font-heading text-[15px] font-medium">Company</h4>
              <ul className="flex flex-col gap-3">
                {["About", "Contact", "Privacy Policy"].map((item: string) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#898989] text-[13px] hover:text-[#D4FE3F] transition-colors font-sans"
                    >
                      {item}
                    </a>
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
