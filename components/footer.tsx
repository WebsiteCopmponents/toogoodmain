"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import StaggerButton from "@/components/stagger-button";
import styles from "./footer.module.css";

const MAX_STRETCH = 0.32;
const RESTING_PULL = 0.22;
const SIGMA_FRAC = 0.06;
const SPRING_STIFF = 0.14;
const SPRING_DAMP_SMOOTH = 0.92;
const TARGET_FILL_W = 0.96;
const TARGET_FILL_H = 0.62;
const DEFAULT_WORD = "toogood.agency";
const OVERCLOCK_BASES = [1.15, 0.82, 1.05, 0.95, 1.22, 0.78, 1.1, 0.9, 1.18];
const WHATSAPP_CHAT_URL =
  "https://wa.me/?text=" + encodeURIComponent("Hi TooGood.agency");

type LetterState = {
  el: HTMLSpanElement;
  base: number;
  restScale: number;
  curr: number;
  vel: number;
  target: number;
};

function generateBases(word: string): number[] {
  if (word === "OVERCLOCK") return [...OVERCLOCK_BASES];

  let seed = 0;
  for (let i = 0; i < word.length; i++) {
    seed = Math.imul(seed + word.charCodeAt(i), 31);
  }

  const values: number[] = [];
  for (let i = 0; i < word.length; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const value = 0.75 + ((seed & 0xffff) / 0xffff) * 0.5;
    values.push(Math.round(value * 100) / 100);
  }

  for (let i = 1; i < values.length; i++) {
    if (Math.abs(values[i] - values[i - 1]) < 0.05) {
      const nudged = values[i] + (i % 2 === 0 ? 0.12 : -0.12);
      values[i] =
        Math.round(Math.min(1.25, Math.max(0.75, nudged)) * 100) / 100;
    }
  }

  return values;
}

function applyRest(letter: LetterState) {
  letter.el.style.transform = `scaleY(${letter.restScale})`;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

export default function Footer() {
  const word = DEFAULT_WORD;
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [sized, setSized] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const [resting, setResting] = useState(false);

  const wordElRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<LetterState[]>([]);
  const activeRef = useRef(false);
  const leaveTimerRef = useRef<number>(0);

  const syncLetters = useCallback((nextWord: string) => {
    const wordEl = wordElRef.current;
    if (!wordEl) return;

    const bases = generateBases(nextWord);
    const spans = wordEl.querySelectorAll<HTMLSpanElement>(`.${styles.letter}`);

    lettersRef.current = Array.from(spans).map((el, i) => {
      const base = bases[i] ?? 1;
      const restScale = base + RESTING_PULL * base;
      const letter: LetterState = {
        el,
        base,
        restScale,
        curr: 0,
        vel: 0,
        target: 0,
      };
      applyRest(letter);
      return letter;
    });
  }, []);

  const autofit = useCallback(() => {
    const wordEl = wordElRef.current;
    if (!wordEl || window.innerWidth < 50) return;

    wordEl.style.fontSize = "100px";
    const rect = wordEl.getBoundingClientRect();
    const naturalWidth = rect.width || 1;
    const naturalHeight = rect.height || 1;
    const mobile = window.innerWidth < 768;
    const fillW = mobile ? 0.82 : TARGET_FILL_W;
    const fillH = mobile ? 0.16 : TARGET_FILL_H;
    const sizeByW = 100 * ((window.innerWidth * fillW) / naturalWidth);
    const sizeByH = 100 * ((window.innerHeight * fillH) / naturalHeight);
    const nextSize = Math.min(sizeByW, sizeByH);
    wordEl.style.fontSize = `${mobile ? Math.min(nextSize, 40) : nextSize}px`;
    setSized(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let pollId = 0;
    let polls = 0;

    const run = () => {
      if (cancelled) return;
      syncLetters(word);
      autofit();
    };

    const start = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      run();
      pollId = window.setInterval(() => {
        run();
        polls += 1;
        if (polls >= 20) window.clearInterval(pollId);
      }, 100);
    };

    void start();

    const onResize = () => autofit();
    window.addEventListener("resize", onResize);
    const observer = new ResizeObserver(onResize);
    observer.observe(document.documentElement);

    return () => {
      cancelled = true;
      window.clearInterval(pollId);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [word, autofit, syncLetters]);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      if (activeRef.current) {
        const damp = SPRING_DAMP_SMOOTH;
        for (const letter of lettersRef.current) {
          letter.vel =
            (letter.vel + (letter.target - letter.curr) * SPRING_STIFF) * damp;
          letter.curr += letter.vel;
          const hoverDroop = letter.curr * MAX_STRETCH * letter.base;
          const scaleY = letter.restScale + hoverDroop;
          const scaleX = 1 - letter.curr * 0.06;
          letter.el.style.transform = `scaleY(${scaleY}) scaleX(${scaleX})`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const moveCursor = (x: number, y: number) => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  };

  const pullLetters = (mouseX: number) => {
    const wordEl = wordElRef.current;
    if (!wordEl) return;
    const wordWidth = wordEl.getBoundingClientRect().width;
    const sigma = Math.max(80, wordWidth * SIGMA_FRAC);

    for (const letter of lettersRef.current) {
      const rect = letter.el.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - mouseX;
      letter.target = Math.exp(-(dx * dx) / (2 * sigma * sigma));
    }
  };

  const onWordEnter = (clientX: number) => {
    window.clearTimeout(leaveTimerRef.current);
    activeRef.current = true;
    setResting(false);
    setCursorActive(true);
    pullLetters(clientX);
  };

  const onWordLeave = () => {
    activeRef.current = false;
    setCursorActive(false);
    setResting(true);
    for (const letter of lettersRef.current) {
      letter.target = 0;
      applyRest(letter);
    }
    window.clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = window.setTimeout(() => {
      for (const letter of lettersRef.current) {
        letter.curr = 0;
        letter.vel = 0;
        applyRest(letter);
      }
    }, 1150);
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(leaveTimerRef.current);
    };
  }, []);

  return (
    <>
      <div
        className={styles.revealSpacer}
        data-footer-reveal=""
        aria-hidden="true"
      />
      <footer
        className={styles.stage}
        onMouseMove={(event) => moveCursor(event.clientX, event.clientY)}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          if (touch) moveCursor(touch.clientX, touch.clientY);
        }}
        onTouchMove={(event) => {
          const touch = event.touches[0];
          if (touch) moveCursor(touch.clientX, touch.clientY);
        }}
      >
        <div
          className={`${styles.cursor} ${cursorActive ? styles.cursorActive : ""}`}
          ref={cursorRef}
          aria-hidden="true"
        />

        <div
          className={`${styles.word} ${sized ? styles.sized : ""} ${resting ? styles.resting : ""}`}
          ref={wordElRef}
          onMouseMove={(event) => {
            moveCursor(event.clientX, event.clientY);
            onWordEnter(event.clientX);
          }}
          onMouseLeave={onWordLeave}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            if (!touch) return;
            moveCursor(touch.clientX, touch.clientY);
            onWordEnter(touch.clientX);
          }}
          onTouchMove={(event) => {
            const touch = event.touches[0];
            if (!touch) return;
            event.preventDefault();
            moveCursor(touch.clientX, touch.clientY);
            pullLetters(touch.clientX);
          }}
          onTouchEnd={onWordLeave}
        >
          {word.split("").map((char, index) => (
            <span className={styles.letter} key={`${char}-${index}`}>
              {char}
            </span>
          ))}
        </div>

        <p className={`${styles.hint} capitalize`}>
          ✷ Mark the word will see you again ↓
        </p>
      </footer>
    </>
  );
}
