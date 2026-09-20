"use client";
//File: app/components/NewDesignComponents/BentoGrid.tsx
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import FloatingDotNav from "@/components/NewDesignComponents/FloatingDotNav";
import { useSiteModal } from "@/components/ContactModal";

type Service = {
  id: string;
  number: string;
  title: string;
  body: string;
};

const SERVICES: Service[] = [
  {
    id: "web-design",
    number: "01.",
    title: "Web Design",
    body: "Purposeful, conversion-focused design that turns visitors into customers and positions your brand as the obvious choice in your market.",
  },
  {
    id: "web-development",
    number: "02.",
    title: "Web Development",
    body: "Fast, secure, scalable websites built on clean code — engineered for performance, SEO, and easy long-term maintenance.",
  },
  {
    id: "web-applications",
    number: "03.",
    title: "Web Applications",
    body: "Custom web apps built around your actual workflows — from internal dashboards to customer-facing platforms — designed to scale with your business.",
  },
  {
    id: "mobile-applications",
    number: "04.",
    title: "Mobile Applications",
    body: "Native and cross-platform mobile apps that feel fast, intuitive, and on-brand — built for iOS and Android from a single, efficient codebase.",
  },
  {
    id: "ai-automation",
    number: "05.",
    title: "AI Automation",
    body: "We identify the repetitive, time-draining tasks in your business and replace them with intelligent workflows — so your team can focus on what actually needs a human.",
  },
  {
    id: "ai-chatbots",
    number: "06.",
    title: "AI Chatbots",
    body: "Custom-trained chatbots that qualify leads, answer customer questions, and support your team 24/7 — trained on your business, not a generic script.",
  },
  {
    id: "ui-ux",
    number: "07.",
    title: "UI/UX Design",
    body: "Research-backed interface design that removes friction, guides users to action, and makes every product you ship feel effortless to use.",
  },
];

const PAGE_SIZE = 4;
const PAGE_COUNT = Math.ceil(SERVICES.length / PAGE_SIZE);
const MOBILE_DELAY_MS = 1000;
const MOBILE_INTERVAL_MS = 1000;

function getPageItems(page: number) {
  const start = page * PAGE_SIZE;
  return SERVICES.slice(start, start + PAGE_SIZE).map((service, slot) => ({
    slot,
    service,
  }));
}

function PhoneVisual() {
  const { open } = useSiteModal();

  return (
    <div className="flex h-full items-end justify-center overflow-hidden px-6 pt-4">
      <div className="h-full w-[min(100%,11.5rem)] overflow-hidden rounded-[1.6rem] border-[5px] border-black/80 bg-[#1a1a1a] shadow-[0_16px_32px_rgba(0,0,0,0.22)]">
        <div className="flex h-full flex-col bg-[#f9f4ea] px-3 pt-6 pb-3">
          <p className="mb-2 text-center text-[10px] font-medium tracking-tight text-black/70">
            TooGood.agency
          </p>
          <div className="mb-2 overflow-hidden rounded-xl bg-white p-2 shadow-sm">
            <div className="mb-1.5 h-12 rounded-lg bg-[#d8ecf8]" />
            <div className="h-1.5 w-3/4 rounded-full bg-black/10" />
          </div>
          <button
            type="button"
            onClick={() => open("project")}
            className="mt-auto rounded-xl bg-white p-2 text-left shadow-sm"
          >
            <p className="text-[10px] font-semibold text-black">Book a demo</p>
            <div className="mt-2 h-6 rounded-full bg-black" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StackVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute top-3 right-6 h-[78%] w-[78%] rotate-6 rounded-[28px] bg-[#ffd0b8]" />
      <div className="absolute top-8 left-4 z-10 flex h-[72%] w-[82%] flex-col justify-between rounded-[28px] bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
        <p className="text-[1.2rem] leading-[1.15] font-semibold tracking-tight text-black">
          Your site
          <br />
          includes the work
        </p>
        <span className="inline-flex w-fit rounded-full bg-[#f3eee4] px-4 py-2 text-[13px] font-medium text-black">
          Take a look
        </span>
      </div>
    </div>
  );
}

function ConfirmVisual() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden px-4 pt-4">
      <div className="h-24 shrink-0 overflow-hidden rounded-[24px] bg-[#111]" />
      <div className="relative z-10 -mt-8 rounded-[28px] bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
        <p className="text-[15px] font-semibold tracking-tight text-black">
          You&apos;ve shipped a site worth keeping
        </p>
        <div className="mt-4 h-9 rounded-full bg-[#00BF63]" />
      </div>
    </div>
  );
}

function PhotoVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-[#FF7043] text-xl text-black">
        ✦
      </div>
      <div className="absolute bottom-4 left-4 flex size-11 items-center justify-center rounded-full bg-[#ffba43] text-xl">
        ●
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  visualSlot,
  className = "",
  isSlide = false,
}: {
  service: Service;
  visualSlot: number;
  className?: string;
  isSlide?: boolean;
}) {
  const isPink = visualSlot % 4 === 0;
  const visual = visualSlot % 4;
  const textClass = "text-black";
  const mutedClass = "text-black/70";

  return (
    <article
      data-service-slide={isSlide ? "" : undefined}
      className={
        "flex h-[42rem] flex-col rounded-[60px] p-8 md:p-10 " +
        (isPink ? "bg-[#FF7043] text-black" : "bg-[#ece7dc]") +
        (className ? ` ${className}` : "")
      }
    >
      <div className="mb-6 min-h-0 w-full flex-1 overflow-hidden rounded-[36px]">
        {visual === 0 ? <PhoneVisual /> : null}
        {visual === 1 ? <StackVisual /> : null}
        {visual === 2 ? <ConfirmVisual /> : null}
        {visual === 3 ? <PhotoVisual /> : null}
      </div>
      <div className="shrink-0">
        <p className={`mb-2 text-[13px] font-medium tracking-tight ${mutedClass}`}>
          {service.number}
        </p>
        <h3
          className={`text-[1.65rem] leading-[1.15] font-semibold tracking-tight !font-sans ${textClass}`}
        >
          {service.title}
        </h3>
        <p
          className={`mt-3 line-clamp-4 text-[15px] leading-relaxed md:text-[16px] ${mutedClass}`}
        >
          {service.body}
        </p>
      </div>
    </article>
  );
}

function cardHidden(slot: number, dir: number) {
  const fromX = slot % 2 === 0 ? -110 : 110;
  const fromY = slot < 2 ? -48 : 48;
  return { opacity: 0, x: fromX * dir, y: fromY * dir };
}

const cardShow = {
  opacity: 1,
  x: 0,
  y: 0,
  transition: {
    type: "spring" as const,
    stiffness: 62,
    damping: 16,
    mass: 1.35,
  },
};

export default function BentoGrid() {
  const reduceMotion = useReducedMotion();
  const [page, setPage] = useState(0);
  const [mobileSlide, setMobileSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const pauseMobile = useRef(false);
  const items = getPageItems(page);
  const dir = page % 2 === 0 ? 1 : -1;

  const scrollMobileTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-service-slide]");
    if (!track || !card) return;
    const gap = 20;
    track.scrollTo({
      left: index * (card.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const sync = () =>
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    if (isDesktop || reduceMotion) return;
    const track = trackRef.current;
    if (!track) return;

    const startId = window.setTimeout(() => {
      const tickId = window.setInterval(() => {
        if (pauseMobile.current) return;
        setMobileSlide((current) => {
          const next = (current + 1) % SERVICES.length;
          scrollMobileTo(next);
          return next;
        });
      }, MOBILE_INTERVAL_MS);
      track.dataset.tick = String(tickId);
    }, MOBILE_DELAY_MS);

    const onScroll = () => {
      const card = track.querySelector<HTMLElement>("[data-service-slide]");
      if (!card) return;
      const gap = 20;
      const index = Math.round(track.scrollLeft / (card.offsetWidth + gap));
      setMobileSlide(Math.min(SERVICES.length - 1, Math.max(0, index)));
    };

    track.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(startId);
      const tick = Number(track.dataset.tick);
      if (tick) window.clearInterval(tick);
      track.removeEventListener("scroll", onScroll);
    };
  }, [isDesktop, reduceMotion]);

  return (
    <section
      id="services"
      aria-labelledby="bento-heading"
      className="relative bg-[var(--new-site-background-color)] py-20 text-[var(--new-site-entire-site-text-color)] md:py-28"
    >
      <div className="mx-auto w-full max-w-[1080px] px-5 md:px-8">
        <h2
          id="bento-heading"
          className="mx-auto mb-12 max-w-[14ch] text-center text-5xl font-bold leading-[0.9] md:mb-16"
        >
          <span className="block">Where brands</span>
          <span className="block">come first</span>
        </h2>

        <div className="hidden md:block">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={page}
              className="grid grid-cols-2 gap-6"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.11,
                    delayChildren: reduceMotion ? 0 : 0.04,
                  },
                },
              }}
            >
              {items.map(({ service, slot }) => (
                <motion.div
                  key={`${service.id}-${page}-${slot}`}
                  custom={slot}
                  variants={{
                    hidden: () =>
                      reduceMotion ? { opacity: 0 } : cardHidden(slot, dir),
                    show: reduceMotion ? { opacity: 1 } : cardShow,
                  }}
                >
                  <ServiceCard service={service} visualSlot={slot} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          ref={trackRef}
          onPointerDown={() => {
            pauseMobile.current = true;
          }}
          onPointerUp={() => {
            pauseMobile.current = false;
          }}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
        >
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              visualSlot={index % 4}
              className="w-[min(100%,22rem)] shrink-0 snap-center"
              isSlide
            />
          ))}
        </div>
      </div>
      <FloatingDotNav
        canPrev={isDesktop ? page > 0 : mobileSlide > 0}
        canNext={
          isDesktop
            ? page < PAGE_COUNT - 1
            : mobileSlide < SERVICES.length - 1
        }
        onPrev={() => {
          if (isDesktop) {
            setPage((current) => Math.max(0, current - 1));
            return;
          }
          pauseMobile.current = true;
          setMobileSlide((current) => {
            const next = Math.max(0, current - 1);
            scrollMobileTo(next);
            return next;
          });
        }}
        onNext={() => {
          if (isDesktop) {
            setPage((current) => Math.min(PAGE_COUNT - 1, current + 1));
            return;
          }
          pauseMobile.current = true;
          setMobileSlide((current) => {
            const next = Math.min(SERVICES.length - 1, current + 1);
            scrollMobileTo(next);
            return next;
          });
        }}
      />
    </section>
  );
}
