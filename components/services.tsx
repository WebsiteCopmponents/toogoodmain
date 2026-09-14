import React from "react";
import SectionEyebrow from "@/components/section-eyebrow";
//File : services.tsx
export interface BenefitItem {
  num: string;
  title: string;
  desc: string;
  mosaic: string;
  chat: string;
}

interface ServicesProps {
  eyebrow?: string;
  headline?: [string, string];
  blurb?: string;
  items?: BenefitItem[];
  className?: string;
}

const CHAT_IMG =
  "https://framerusercontent.com/images/2MEG3woz70bTopuFKzgkWTZ8Wk.png";
const MOSAIC_1 =
  "https://framerusercontent.com/images/ienddKMr5YHn8OtJfjhZUVFgCo.png";
const MOSAIC_2 =
  "https://framerusercontent.com/images/sdp9AiOfotrZg64RT2mspNduuM.png";
const MOSAIC_3 =
  "https://framerusercontent.com/images/R0ysj5aZ9R2YoXztXqL6eynb9Uo.png";

const DEFAULT_ITEMS: BenefitItem[] = [
  {
    num: "01.",
    title: "Web Design",
    mosaic: MOSAIC_1,
    chat: CHAT_IMG,
    desc: "Purposeful, conversion-focused design that turns visitors into customers and positions your brand as the obvious choice in your market.",
  },
  {
    num: "02.",
    title: "Web Development",
    mosaic: MOSAIC_2,
    chat: CHAT_IMG,
    desc: "Fast, secure, scalable websites built on clean code — engineered for performance, SEO, and easy long-term maintenance.",
  },
  {
    num: "03.",
    title: "Web Applications",
    mosaic: MOSAIC_2,
    chat: CHAT_IMG,
    desc: "Custom web apps built around your actual workflows — from internal dashboards to customer-facing platforms — designed to scale with your business.",
  },
  {
    num: "04.",
    title: "Mobile Applications",
    mosaic: MOSAIC_3,
    chat: CHAT_IMG,
    desc: "Native and cross-platform mobile apps that feel fast, intuitive, and on-brand — built for iOS and Android from a single, efficient codebase.",
  },
  {
    num: "05.",
    title: "AI Automation",
    mosaic: MOSAIC_1,
    chat: CHAT_IMG,
    desc: "We identify the repetitive, time-draining tasks in your business and replace them with intelligent workflows — so your team can focus on what actually needs a human.",
  },
  {
    num: "06.",
    title: "AI Chatbots",
    mosaic: MOSAIC_2,
    chat: CHAT_IMG,
    desc: "Custom-trained chatbots that qualify leads, answer customer questions, and support your team 24/7 — trained on your business, not a generic script.",
  },
  {
    num: "07.",
    title: "UI/UX Design",
    mosaic: MOSAIC_3,
    chat: CHAT_IMG,
    desc: "Research-backed interface design that removes friction, guides users to action, and makes every product you ship feel effortless to use.",
  },
];

export default function Services({
  eyebrow = "Our Services",
  headline = ["Web, mobile, and", "the work around them."],
  blurb = "UI/UX, AI automation, chatbots, domain and social management, SEO, and business email setup — the same studio, start to finish.",
  items = DEFAULT_ITEMS,
  className,
}: ServicesProps) {
  return (
    <section
      className={
        "w-full bg-[#fff] font-sans text-[#16233d] " + (className || "")
      }
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-5 py-20">
        <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:items-end md:gap-0">
          <div className="flex flex-col gap-3">
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <h2 className="font-heading m-0 text-[40px] leading-[1.05] font-medium text-[#16233d] md:text-[52px]">
              {headline[0]}
              <br />
              {headline[1]}
            </h2>
          </div>
          <p className="m-0 max-w-[420px] text-base leading-[1.2] text-[#5e6472]">
            {blurb}
          </p>
        </div>

        <div className="grid h-auto w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <article
              key={i}
              tabIndex={0}
              className="group relative min-h-[320px] cursor-pointer overflow-hidden rounded-[20px] bg-white shadow-[0_12px_24px_0_rgba(51,88,223,0.1)] outline-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-md:min-h-0 max-md:flex-none md:min-h-[380px] md:rounded-xl md:bg-[#e6ecf7] md:shadow-none md:hover:rounded-[20px] md:hover:bg-white md:hover:shadow-[0_12px_24px_0_rgba(51,88,223,0.1)] md:focus-within:rounded-[20px] md:focus-within:bg-white md:focus-within:shadow-[0_12px_24px_0_rgba(51,88,223,0.1)] motion-reduce:transition-opacity motion-reduce:duration-200"
            >
              <div className="absolute inset-0 hidden flex-col justify-between px-5 pt-5 pb-10 opacity-100 transition-[opacity,transform] duration-400 ease-in-out md:flex group-hover:pointer-events-none group-hover:-translate-y-2.5 group-hover:opacity-0 group-focus-within:pointer-events-none group-focus-within:-translate-y-2.5 group-focus-within:opacity-0 motion-reduce:transform-none">
                <div className="font-heading text-[52px] leading-none font-medium text-[#c8d3e5]">
                  {item.num}
                </div>
                <div className="relative my-4 flex-1">
                  <img
                    src={item.mosaic}
                    alt=""
                    className="absolute inset-0 size-full object-cover mix-blend-multiply hue-rotate-[190deg] saturate-110"
                  />
                </div>
                <h3 className="font-heading m-0 text-xl font-medium text-[#16233d]">
                  {item.title}
                </h3>
              </div>

              <div className="flex flex-col p-2 max-md:relative max-md:translate-y-0 max-md:opacity-100 max-md:pointer-events-auto md:absolute md:inset-0 md:translate-y-2.5 md:opacity-0 md:pointer-events-none md:transition-[opacity,transform] md:duration-400 md:ease-in-out md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 motion-reduce:transform-none">
                <img
                  src={item.chat}
                  alt=""
                  className="aspect-[1.56/1] w-full rounded-xl object-cover hue-rotate-[190deg] saturate-110"
                />
                <div className="flex flex-1 flex-col justify-center gap-2 px-4 py-4">
                  <h3 className="font-heading m-0 text-[28px] leading-[1.1] font-medium text-[#16233d] md:text-[32px]">
                    {item.title}
                  </h3>
                  <p className="m-0 text-sm leading-[1.4] text-[#5e6472]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
