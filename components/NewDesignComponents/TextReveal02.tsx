"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { textReveal02 } from "@/components/NewDesignComponents/text-reveal-02";

type TextReveal02Props = {
  children: ReactNode;
  className?: string;
  /** Extra delay (seconds) for auto-playing reveals on first init. */
  delay?: number;
  ignoreManual?: boolean;
};

/**
 * Scopes Text Reveal 02 to its children and initializes after fonts are ready.
 */
export default function TextReveal02({
  children,
  className,
  delay = 0,
  ignoreManual = false,
}: TextReveal02Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      textReveal02(root, delay, { ignoreManual });
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
    };
  }, [delay, ignoreManual]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}

export { textReveal02 };
