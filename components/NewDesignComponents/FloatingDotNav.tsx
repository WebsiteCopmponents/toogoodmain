"use client";

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

type FloatingDotNavProps = {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

export default function FloatingDotNav({
  onPrev,
  onNext,
  canPrev,
  canNext,
}: FloatingDotNavProps) {
  return (
    <nav
      aria-label="Services"
      className="relative z-20 mx-auto mt-6 flex justify-center md:absolute md:top-1/2 md:right-5 md:mt-0 md:-translate-y-1/2 lg:right-8"
    >
      <div className="flex flex-row items-center gap-1 rounded-full bg-white/90 px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 backdrop-blur-md md:flex-col md:px-1.5 md:py-2">
        <button
          type="button"
          aria-label="Previous services"
          disabled={!canPrev}
          onClick={onPrev}
          className="flex size-8 items-center justify-center rounded-full disabled:pointer-events-none"
        >
          <ArrowLeft
            aria-hidden="true"
            strokeWidth={2.5}
            className={
              (canPrev ? "text-black" : "text-black/20") + " size-4 md:hidden"
            }
          />
          <ArrowUp
            aria-hidden="true"
            strokeWidth={2.5}
            className={
              (canPrev ? "text-black" : "text-black/20") +
              " hidden size-4 md:block"
            }
          />
        </button>
        <button
          type="button"
          aria-label="Next services"
          disabled={!canNext}
          onClick={onNext}
          className="flex size-8 items-center justify-center rounded-full disabled:pointer-events-none"
        >
          <ArrowRight
            aria-hidden="true"
            strokeWidth={2.5}
            className={
              (canNext ? "text-black" : "text-black/20") + " size-4 md:hidden"
            }
          />
          <ArrowDown
            aria-hidden="true"
            strokeWidth={2.5}
            className={
              (canNext ? "text-black" : "text-black/20") +
              " hidden size-4 md:block"
            }
          />
        </button>
      </div>
    </nav>
  );
}
