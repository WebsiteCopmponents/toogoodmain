// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const BASE_HEIGHT_VH = 600;
const MIN_HEIGHT_VH = 300;
const MAX_HEIGHT_VH = 2000;
const BASE_WORD_COUNT = 20;
const CHARACTER_SPLIT_TYPE = "chars,words";
const CHARACTER_Y_PERCENT_MIN = -200;
const CHARACTER_Y_PERCENT_MAX = 200;
const CHARACTER_EASE = "elastic.out(1,0.8)";

const TEXT =
  "Build faster. Animate better. Ship smarter. Hyperiux Vault gives you the tools to create high-performance interfaces that look premium and feel effortless.";

// True when the user has asked the OS to minimise animation. Safe to call
// during render - returns false on the server.
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
}

// Reduced motion: keep the per-character assembly, just far weaker - the
// main horizontal scroll (xPercent:-100) is left alone, it's the functional
// scroll-through mechanism, not decorative per-char movement.
const REDUCED_MOTION_FACTOR = 0.25;

const getDynamicHeight = (text: string) => {
  const trimmedText = text.trim();
  const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
  const scale = words / BASE_WORD_COUNT;
  const calculatedHeight = BASE_HEIGHT_VH * scale;
  const clampedHeight = Math.max(
    MIN_HEIGHT_VH,
    Math.min(calculatedHeight, MAX_HEIGHT_VH),
  );

  return `${clampedHeight}vh`;
};

gsap.registerPlugin(ScrollTrigger, SplitText);

interface TextConvergenceProps {
  heading?: string;
  text?: string;
  paragraph?: string;
  bgColor?: string;
  textColor?: string;
  charRotation?: number;
  triggerSelector?: string;
}

const HEADING = "The TooGood way";
const PARAGRAPH =
  "Design and development that holds its own — sharper sites, clearer journeys, and work UK brands actually keep.";

export default function TextConvergence({
  heading = HEADING,
  text = TEXT,
  paragraph = PARAGRAPH,
  bgColor = "#F9F4EA",
  textColor = "text-black",
  charRotation = 20,
  triggerSelector = "#new-site-hero",
}: TextConvergenceProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  const isTailwindBg = bgColor.trim().startsWith("bg-");
  const dynamicHeight = useMemo(() => getDynamicHeight(text), [text]);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    sectionRef.current.style.setProperty("--text-break-height", dynamicHeight);
  }, [dynamicHeight]);

  useEffect(() => {
    const context = gsap.context(() => {
      const textElement = textRef.current;
      const sectionElement = sectionRef.current;

      if (!textElement || !sectionElement) {
        return;
      }

      const split = SplitText.create(textElement, {
        type: CHARACTER_SPLIT_TYPE,
      });

      const reducedMotion = prefersReducedMotion();
      const charScale = reducedMotion ? REDUCED_MOTION_FACTOR : 1;
      const heroTrigger =
        document.querySelector<HTMLElement>(triggerSelector) ?? sectionElement;

      const scrollTween = gsap.to(textElement, {
        xPercent: -100,
        ease: "linear",
        scrollTrigger: {
          trigger: heroTrigger,
          start: heroTrigger === sectionElement ? "top top" : "bottom top",
          endTrigger: sectionElement,
          end: "bottom 70%",
          scrub: true,
          markers: false,
          scroller: window,
          invalidateOnRefresh: true,
        },
      });

      split.chars.forEach((character) => {
        gsap.from(character, {
          yPercent:
            gsap.utils.random(
              CHARACTER_Y_PERCENT_MIN,
              CHARACTER_Y_PERCENT_MAX,
            ) * charScale,
          rotation: gsap.utils.random(-charRotation, charRotation) * charScale,
          ease: CHARACTER_EASE,
          scrollTrigger: {
            trigger: character,
            containerAnimation: scrollTween,
            start: "left 100%",
            end: "left 30%",
            scrub: 0.4,
          },
        });
      });

      const copyStart =
        heroTrigger === sectionElement ? "top 80%" : "bottom 90%";
      const copyEnd =
        heroTrigger === sectionElement ? "top 30%" : "bottom 40%";

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            xPercent: reducedMotion ? 0 : -55,
            opacity: 0,
          },
          {
            xPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heroTrigger,
              start: copyStart,
              end: copyEnd,
              scrub: 0.65,
            },
          },
        );
      }

      if (paragraphRef.current) {
        gsap.fromTo(
          paragraphRef.current,
          {
            xPercent: reducedMotion ? 0 : 55,
            opacity: 0,
          },
          {
            xPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heroTrigger,
              start: copyStart,
              end: copyEnd,
              scrub: 0.65,
            },
          },
        );
      }
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, [text, charRotation, triggerSelector, heading, paragraph]);

  return (
    <div
      ref={sectionRef}
      className={`relative h-(--text-break-height)${isTailwindBg ? ` ${bgColor}` : ""}`}
      style={isTailwindBg ? undefined : { backgroundColor: bgColor }}
    >
      <div className="sticky top-0 h-screen overflow-x-clip">
        {heading ? (
          <div className="pointer-events-none absolute inset-x-0 top-24 z-10 px-5 md:top-28">
            <h2
              ref={headingRef}
              className="mx-auto text-center text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] font-medium tracking-[-0.03em] text-[var(--new-site-entire-site-text-color)]"
            >
              {heading}
            </h2>
          </div>
        ) : null}
        <div className="flex h-full w-full items-center overflow-clip">
          <h3
            ref={textRef}
            className={`flex w-max whitespace-nowrap gap-[4vw] pl-[100vw] text-4xl font-bold leading-[1.1] tracking-tighter ${textColor} sm:text-6xl lg:text-8xl xl:text-9xl`}
          >
            {text}
          </h3>
        </div>
        {paragraph ? (
          <div className="pointer-events-none absolute inset-x-0 top-[calc(50%+5.5rem)] z-10 px-5">
            <p
              ref={paragraphRef}
              className="mx-auto max-w-md text-center text-[15px] leading-relaxed text-[var(--new-site-entire-site-text-color)] md:text-[17px]"
            >
              {paragraph}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
