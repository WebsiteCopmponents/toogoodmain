"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import ArrowFillButton from "@/components/NewDesignComponents/ArrowFillButton";
import { useSiteModal } from "@/components/ContactModal";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const BLOB_SPRING = {
  type: "spring" as const,
  stiffness: 240,
  damping: 13,
  mass: 0.55,
};

type PillBox = { x: number; y: number; w: number; h: number };

function HeaderCtas({ onNavigate }: { onNavigate?: () => void }) {
  const { open } = useSiteModal();

  return (
    <>
      <a
        href="#pricing"
        className="new-site-header-cta pr-4"
        onClick={onNavigate}
      >
        Pricing
      </a>
      <ArrowFillButton
        href="#contact"
        btnText="Get in touch"
        className="new-site-header-fill-btn px-6 py-5"
        bgColor="var(--new-site-button-primary-bg-color)"
        textColor="var(--new-site-button-primary-text-color)"
        fillBgColor="var(--new-site-button-secondary-bg-color)"
        fillTextColor="#000000"
        hoverFillBgColor="var(--new-site-button-secondary-bg-color)"
        hoverFillTextColor="#000000"
        arrowColor="#000000"
        hoverArrowColor="#000000"
        onClick={(event) => {
          event.preventDefault();
          onNavigate?.();
          open("project");
        }}
      />
    </>
  );
}

export default function NewHeader() {
  const { open } = useSiteModal();
  const navRef = useRef<HTMLElement | null>(null);
  const pillRef = useRef<PillBox | null>(null);
  const [pill, setPill] = useState<PillBox | null>(null);
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scaleX = useSpring(1, { stiffness: 220, damping: 11, mass: 0.4 });
  const scaleY = useSpring(1, { stiffness: 220, damping: 11, mass: 0.4 });
  const nudgeX = useSpring(0, { stiffness: 160, damping: 9, mass: 0.45 });
  const nudgeY = useSpring(0, { stiffness: 160, damping: 9, mass: 0.45 });

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 48;
      setScrolled((current) => (current === next ? current : next));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.innerWidth >= 768 &&
      !scrolled
    ) {
      setMenuOpen(false);
    }
  }, [scrolled]);

  useEffect(() => {
    document.body.dataset.menuStatus = menuOpen ? "open" : "closed";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      delete document.body.dataset.menuStatus;
    };
  }, [menuOpen]);

  const movePillTo = (el: HTMLElement) => {
    const nav = navRef.current;
    if (!nav) return;

    const navBox = nav.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    const next = {
      x: box.left - navBox.left,
      y: box.top - navBox.top,
      w: box.width,
      h: box.height,
    };

    const prev = pillRef.current;
    if (prev) {
      const travel = Math.abs(next.x - prev.x) + Math.abs(next.w - prev.w);
      if (travel > 10) {
        scaleX.set(1.22);
        scaleY.set(0.82);
        window.requestAnimationFrame(() => {
          scaleX.set(1);
          scaleY.set(1);
        });
      }
    }

    pillRef.current = next;
    setPill(next);
    setHovered(true);
  };

  const disturb = (event: MouseEvent<HTMLAnchorElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const nx = ((event.clientX - box.left) / box.width - 0.5) * 12;
    const ny = ((event.clientY - box.top) / box.height - 0.5) * 9;
    nudgeX.set(nx);
    nudgeY.set(ny);
  };

  const resetDisturb = () => {
    nudgeX.set(0);
    nudgeY.set(0);
    scaleX.set(1);
    scaleY.set(1);
  };

  return (
    <header
      className={
        "new-site-header sticky top-0 z-50 w-full md:px-0 px-4" +
        (scrolled ? "is-compact" : "is-expanded")
      }
    >
      <div className="new-site-header-inner">
        <div className="new-site-header-left">
          <a href="/" aria-label="TooGood.agency" className="new-site-logo">
            <Image
              src="/toogood-logo.png"
              alt="TooGood.agency"
              width={463}
              height={144}
              priority
            />
          </a>

          <nav
            ref={navRef}
            aria-label="Primary"
            className="new-site-nav"
            onMouseLeave={() => {
              setHovered(false);
              resetDisturb();
            }}
          >
            <motion.div
              aria-hidden="true"
              className="new-site-nav-wobble"
              initial={false}
              animate={{
                left: pill?.x ?? 0,
                top: pill?.y ?? 0,
                width: pill?.w ?? 0,
                height: pill?.h ?? 0,
                opacity: hovered ? 1 : 0,
              }}
              transition={{
                left: BLOB_SPRING,
                top: BLOB_SPRING,
                width: BLOB_SPRING,
                height: BLOB_SPRING,
                opacity: { duration: 0.16 },
              }}
              style={{ x: nudgeX, y: nudgeY, scaleX, scaleY }}
            />
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="new-site-nav-link"
                onClick={(event) => {
                  if (link.href === "#contact") {
                    event.preventDefault();
                    open("project");
                  }
                }}
                onMouseEnter={(event) => movePillTo(event.currentTarget)}
                onMouseMove={disturb}
                onFocus={(event) => movePillTo(event.currentTarget)}
                onBlur={() => {
                  setHovered(false);
                  resetDisturb();
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="new-site-header-ctas">
          <div className="new-site-header-ctas-inline">
            <HeaderCtas />
          </div>
          <button
            type="button"
            className="new-site-header-hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={
                "new-site-header-hamburger-line " +
                (menuOpen ? "translate-y-[5px] rotate-45" : "")
              }
            />
            <span
              className={
                "new-site-header-hamburger-line " +
                (menuOpen ? "-translate-y-[5px] -rotate-45" : "")
              }
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              role="dialog"
              aria-label="Menu"
              className="new-site-island-menu origin-top-right"
              initial={{ opacity: 0, scale: 0.72, y: -28, x: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.86, y: -16, x: 16 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 22,
                mass: 0.7,
              }}
            >
              <motion.nav
                className="flex flex-col gap-1"
                aria-label="Menu links"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
                  },
                }}
              >
                {NAV_LINKS.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="rounded-full px-4 py-3 text-[15px] font-medium text-black transition-colors hover:bg-[#e4ddd1]"
                    onClick={(event) => {
                      if (link.href === "#contact") {
                        event.preventDefault();
                        open("project");
                      }
                      closeMenu();
                    }}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.nav>
              <motion.div
                className="mt-4 flex flex-col items-stretch gap-3 border-t border-black/10 pt-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.28 }}
              >
                <HeaderCtas onNavigate={closeMenu} />
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
