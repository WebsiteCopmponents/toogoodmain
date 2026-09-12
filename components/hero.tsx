"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { CtaButton, CtaStaggerButton } from "@/components/cta-button";

const STAGGER_EASE = "cubic-bezier(0.625, 0.05, 0, 1)";

function NavStaggerLabel({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={
        "relative inline-block overflow-hidden whitespace-nowrap leading-[1.3] " +
        (className || "font-heading")
      }
    >
      {[...text].map((char, index) => (
        <span
          key={`${index}-${char}`}
          className="relative inline-block translate-y-0 rotate-[0.001deg] [text-shadow:0_1.3em_currentColor] transition-transform duration-[600ms] group-hover:-translate-y-[1.3em] group-hover:rotate-[0.001deg]"
          style={{
            transitionTimingFunction: STAGGER_EASE,
            transitionDelay: `${index * 0.01}s`,
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

gsap.registerPlugin(CustomEase);

if (!CustomEase.get("energy")) {
  CustomEase.create("energy", "M0,0 C0.32,0.72 0,1 1,1");
}

const PRIMARY_LINKS = [
  { href: "/", label: "Home", current: true },
  { href: "#", label: "Projects" },
  { href: "#", label: "About" },
  { href: "#", label: "Services" },
  { href: "#", label: "News" },
  { href: "#", label: "Contact" },
];

type HeroProps = {
  children?: ReactNode;
  className?: string;
};

export default function Hero({ children, className }: HeroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spacer = document.querySelector("[data-footer-reveal]");
    if (!spacer) return;

    const io = new IntersectionObserver(
      ([entry]) => setOverFooter(entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(spacer);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const toggleBtn = toggleRef.current;
    const menuEl = menuRef.current;
    const overlayEl = overlayRef.current;
    const mainEl = mainRef.current;
    if (!root || !toggleBtn || !menuEl || !overlayEl || !mainEl) return;

    const toggleLabels = root.querySelectorAll<HTMLElement>(
      "[data-toggle-label]",
    );
    const toggleBars = root.querySelectorAll<HTMLElement>("[data-toggle-bar]");
    const largeItems = root.querySelectorAll<HTMLElement>("[data-reveal-l]");
    const smallItems = root.querySelectorAll<HTMLElement>("[data-reveal-s]");
    const menuBorder = root.querySelector<HTMLElement>("[data-menu-border]");
    const darkEl = root.querySelector<HTMLElement>("[data-nav-dark]");
    const corners = root.querySelectorAll<HTMLElement>("[data-nav-corner]");
    const overlayBorders =
      root.querySelectorAll<HTMLElement>("[data-border-row]");

    if (!menuBorder || !darkEl || overlayBorders.length < 2) return;

    let menuOpen = false;
    let enterEndTime = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const getMenuOffset = () => -menuEl.offsetWidth;

    gsap.set(overlayEl, { visibility: "hidden", pointerEvents: "none" });
    gsap.set(darkEl, { autoAlpha: 0 });
    gsap.set(mainEl, { x: 0 });
    gsap.set(toggleLabels, { yPercent: 0 });
    gsap.set(toggleBars, { y: 0, rotation: 0 });
    gsap.set(menuBorder, { scaleX: 0 });
    gsap.set(overlayBorders[0], { yPercent: -100 });
    gsap.set(overlayBorders[1], { yPercent: 100 });
    gsap.set(corners, { scale: 0 });

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "energy",
      },
    });

    tl.set(overlayEl, { visibility: "visible", pointerEvents: "auto" }, 0);

    tl.to(
      [mainEl, overlayEl],
      {
        x: getMenuOffset,
        duration: 0.7,
      },
      0,
    )
      .to(
        darkEl,
        {
          autoAlpha: 1,
          duration: 0.5,
        },
        0,
      )
      .to(
        corners,
        {
          scale: 1,
          duration: 0.5,
        },
        0,
      )
      .to(
        overlayBorders,
        {
          yPercent: 0,
          duration: 0.5,
        },
        0,
      )
      .to(
        toggleLabels,
        {
          yPercent: -100,
          duration: 0.4,
        },
        0,
      )
      .to(
        toggleBars[0],
        {
          y: "0.25em",
          rotation: 45,
          duration: 0.35,
          ease: "back.out(1.4)",
        },
        0.05,
      )
      .to(
        toggleBars[1],
        {
          y: "-0.25em",
          rotation: -45,
          duration: 0.35,
          ease: "back.out(1.4)",
        },
        0.05,
      )
      .fromTo(
        largeItems,
        { autoAlpha: 0, xPercent: 25 },
        {
          autoAlpha: 1,
          xPercent: 0,
          duration: 0.7,
          stagger: 0.05,
        },
        0,
      )
      .fromTo(
        smallItems,
        { autoAlpha: 0, yPercent: 100 },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "power3.out",
        },
        0.3,
      )
      .to(
        menuBorder,
        {
          scaleX: 1,
          duration: 0.5,
        },
        "<",
      );

    enterEndTime = tl.duration();

    tl.addPause();

    tl.to(
      [largeItems, smallItems],
      {
        autoAlpha: 0,
        duration: 0.3,
      },
      "<",
    )
      .to(
        [mainEl, overlayEl],
        {
          x: 0,
          duration: 0.6,
        },
        "<",
      )
      .to(
        darkEl,
        {
          autoAlpha: 0,
          duration: 0.35,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(
        corners,
        {
          scale: 0,
          duration: 0.5,
        },
        "<",
      )
      .to(
        overlayBorders[0],
        {
          yPercent: -100,
          duration: 0.5,
        },
        "<",
      )
      .to(
        overlayBorders[1],
        {
          yPercent: 100,
          duration: 0.5,
        },
        "<",
      )
      .to(
        toggleLabels,
        {
          yPercent: 0,
          duration: 0.25,
          ease: "power3.in",
        },
        "<",
      )
      .to(
        toggleBars,
        {
          y: 0,
          rotation: 0,
          duration: 0.25,
          ease: "power3.in",
        },
        "<",
      )
      .set(overlayEl, {
        visibility: "hidden",
        pointerEvents: "none",
      });

    function toggle() {
      menuOpen = !menuOpen;
      setIsOpen(menuOpen);
      toggleBtn?.setAttribute("aria-expanded", String(menuOpen));
      toggleBtn?.setAttribute(
        "aria-label",
        menuOpen ? "close menu" : "open menu",
      );
      document.body.setAttribute("data-menu-status", menuOpen ? "open" : "");

      if (menuOpen) {
        tl.invalidate();
        if (tl.time() >= enterEndTime) tl.timeScale(1).restart();
        else tl.timeScale(1).play();
      } else if (tl.time() < enterEndTime) {
        tl.timeScale(1).reverse();
      } else {
        tl.timeScale(1).play();
      }
    }

    const onOverlayClick = () => {
      if (menuOpen) toggle();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        toggle();
        toggleBtn.focus();
      }
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (menuOpen) {
          gsap.set([mainEl, overlayEl], {
            x: getMenuOffset(),
          });
        } else {
          tl.invalidate();
        }
      }, 150);
    };

    toggleBtn.addEventListener("click", toggle);
    overlayEl.addEventListener("click", onOverlayClick);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimer);
      toggleBtn.removeEventListener("click", toggle);
      overlayEl.removeEventListener("click", onOverlayClick);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.removeAttribute("data-menu-status");
      setIsOpen(false);
      tl.kill();
      gsap.set([mainEl, overlayEl], { clearProps: "transform" });
    };
  }, []);

  return (
    <>
      <div
        ref={rootRef}
        className="[--menu-width:30em] max-md:[--menu-width:80vw] [&_a]:text-inherit [&_a]:no-underline"
      >
        <header
          className={
            "fixed inset-x-0 top-0 z-[100] text-white transition-opacity duration-300 " +
            (overFooter ? "pointer-events-none opacity-0" : "")
          }
        >
          <div className="mx-auto w-full">
            <div className="flex items-center justify-between p-[1.25em] md:p-[2.5em]">
              <a
                href="/"
                className="font-sans text-[1em] capitalize tracking-[-0.02em] text-[#f4f4f4] md:text-[1.25em]"
                aria-label="TooGood.agency"
              >
                TooGood.agency
              </a>
              <button
                ref={toggleRef}
                type="button"
                aria-expanded={isOpen}
                aria-label={isOpen ? "close menu" : "open menu"}
                className={`m-[-1em] flex cursor-pointer items-center justify-center gap-[0.75em] border border-transparent bg-transparent p-[1em] font-inherit ${isOpen ? "bg-white p-2 rounded-xl text-black" : "text-white"}`}
              >
                <span className="flex h-[1.25em] shrink-0 flex-col items-end justify-start overflow-hidden md:h-[1.5em] ">
                  <span
                    data-toggle-label=""
                    className="font-sans text-[1em] md:text-[1.25em]"
                  >
                    Menu
                  </span>
                  <span
                    data-toggle-label=""
                    className="font-sans text-[1em] md:text-[1.25em]"
                  >
                    Close
                  </span>
                </span>
                <span className="mb-[-0.3em] flex w-[1.5em] shrink-0 flex-col items-center justify-center gap-[0.375em]">
                  <span
                    data-toggle-bar=""
                    className="h-[0.125em] w-full shrink-0 bg-current p-0"
                  ></span>
                  <span
                    data-toggle-bar=""
                    className="h-[0.125em] w-full shrink-0 bg-current p-0"
                  ></span>
                </span>
              </button>
            </div>
          </div>
        </header>

        <nav
          ref={menuRef}
          className="fixed top-0 right-0 bottom-0 z-[2] w-[var(--menu-width)] bg-[#fff] text-black"
        >
          <div className="flex h-full w-full flex-col items-stretch justify-between gap-8 overflow-auto px-5 pt-20 pb-5 md:px-8 md:pt-[7.5em] md:pb-8">
            <ul className="m-0 flex w-full list-none flex-col p-0">
              {PRIMARY_LINKS.map((link) => (
                <li key={link.label} data-reveal-l="">
                  <a
                    href={link.href}
                    aria-current={link.current ? "page" : undefined}
                    className={
                      "group block w-full rounded-[0.25em] px-4 py-3 font-heading text-[2em] leading-[0.9] tracking-[-0.04em] md:text-[3.25em] " +
                      (link.current
                        ? "bg-primary !text-[#fff]"
                        : "bg-transparent text-black")
                    }
                  >
                    <NavStaggerLabel text={link.label} />
                  </a>
                </li>
              ))}
            </ul>
            <div className="relative flex w-full flex-col items-start justify-start gap-8 px-4 pt-6 md:flex-row md:gap-0 md:px-0">
              <div className="flex flex-1 flex-col items-start justify-start gap-4">
                <div data-reveal-s="">
                  <span className="font-sans text-base leading-[1.1] opacity-50">
                    Socials
                  </span>
                </div>
                <ul className="m-0 flex w-full list-none flex-col gap-3 p-0">
                  {["Instagram", "LinkedIn", "X/Twitter"].map((item) => (
                    <li key={item} data-reveal-s="">
                      <a
                        href="#"
                        className="group inline-block font-sans text-base leading-[1.1]"
                      >
                        <NavStaggerLabel text={item} className="font-sans" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-1 flex-col items-start justify-start gap-4">
                <div data-reveal-s="">
                  <span className="font-sans text-base leading-[1.1] opacity-50">
                    Quick Links
                  </span>
                </div>
                <ul className="m-0 flex w-full list-none flex-col gap-3 p-0">
                  <li data-reveal-s="">
                    <a
                      href="#"
                      className="group inline-block font-sans text-base leading-[1.1]"
                    >
                      <NavStaggerLabel
                        text="Privacy Policy ↗"
                        className="font-sans"
                      />
                    </a>
                  </li>
                  <li data-reveal-s="">
                    <a
                      href="#"
                      className="group inline-block font-sans text-base leading-[1.1]"
                    >
                      <NavStaggerLabel
                        text="Terms & Conditions ↗"
                        className="font-sans"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <div
                data-menu-border=""
                className="absolute inset-x-0 top-0 h-px w-full origin-left bg-current opacity-15"
              ></div>
            </div>
          </div>
        </nav>

        <div
          ref={overlayRef}
          className="invisible pointer-events-none fixed inset-y-0 -right-px left-0 z-[100] cursor-pointer overflow-clip"
        >
          <div
            data-nav-dark=""
            className="absolute inset-0 bg-black/30 opacity-0"
          ></div>
          <div className="absolute inset-0 flex flex-col items-stretch justify-between">
            <div
              data-border-row=""
              className="flex flex-col items-end justify-start"
            >
              <div className="h-4 w-full bg-white"></div>
              <div
                data-nav-corner=""
                className="h-8 w-8 origin-[100%_0] bg-[radial-gradient(circle_farthest-side_at_0_100%,#fff0_99%,#fff)]"
              ></div>
            </div>
            <div
              data-border-row=""
              className="flex flex-col items-end justify-start"
            >
              <div
                data-nav-corner=""
                className="h-8 w-8 origin-[100%_100%] bg-[radial-gradient(circle_farthest-side_at_0_0,#fff0_99%,#fff)]"
              ></div>
              <div className="h-4 w-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={mainRef}
        className={
          "relative z-10 bg-zinc-50 font-sans dark:bg-black " +
          (className || "")
        }
      >
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-5 pt-24 pb-12 text-[#f4f4f4] md:px-[2.5em] md:pt-32 md:pb-[4.5rem]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://cdn.prod.website-files.com/69fc30ca4b4a6fb5bdd0833d/69fc30ca4b4a6fb5bdd08363_Textured%20Surface%20Close-Up.avif')",
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 w-full max-w-[22rem] text-center md:max-w-[42rem]">
            <p className="mb-5 font-sans text-[0.8rem] tracking-[0.12em] text-[#fff] uppercase">
              TooGood.agency
            </p>
            <h1 className="font-heading mb-6 text-[clamp(3rem,7vw,5.75rem)] leading-[0.95] font-medium tracking-[-0.03em] text-[#f4f4f4]">
              Work that holds its own.
            </h1>
            <p className="mx-auto mb-8 max-w-[22rem] font-sans text-[1.05rem] leading-normal text-[#f4f4f4]/70">
              A UK online studio for web, mobile, dashboards, and UI/UX —
              design and development that holds its own.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <CtaButton>Start a project</CtaButton>
              <CtaStaggerButton>See the work</CtaStaggerButton>
            </div>
          </div>
        </section>
        {children}
      </div>
    </>
  );
}
