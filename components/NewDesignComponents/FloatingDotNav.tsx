"use client";

import { ArrowDown, ArrowUp } from "lucide-react";

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
      className="absolute top-1/2 right-3 z-20 -translate-y-1/2 md:right-5 lg:right-8"
    >
      <div className="flex flex-col items-center gap-1 rounded-full bg-white/90 px-1.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 backdrop-blur-md">
        <button
          type="button"
          aria-label="Previous services"
          disabled={!canPrev}
          onClick={onPrev}
          className="flex size-8 items-center justify-center rounded-full disabled:pointer-events-none"
        >
          <ArrowUp
            aria-hidden="true"
            strokeWidth={2.5}
            className={canPrev ? "size-4 text-black" : "size-4 text-black/20"}
          />
        </button>
        <button
          type="button"
          aria-label="Next services"
          disabled={!canNext}
          onClick={onNext}
          className="flex size-8 items-center justify-center rounded-full disabled:pointer-events-none"
        >
          <ArrowDown
            aria-hidden="true"
            strokeWidth={2.5}
            className={canNext ? "size-4 text-black" : "size-4 text-black/20"}
          />
        </button>
      </div>
    </nav>
  );
}
