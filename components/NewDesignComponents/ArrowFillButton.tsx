"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { ArrowRight } from "lucide-react";
import { useSiteModal } from "@/components/ContactModal";

const DEFAULT_HREF = "#";
const COMPACT_LAYOUT_BREAKPOINT = 1280;
const ANIMATION_DURATION_MS = 450;

const HOVER_INSET_SHADOW =
  "rgba(0, 0, 0, 0.14) 0.0375em -0.075em 0px 0px inset";

const PADDING_CLASS_RE = /^(p|px|py|pt|pr|pb|pl)-/;
const DEFAULT_TEXT_ARROW_GAP = "0.75em";

function isPaddingClass(cls: string) {
  return PADDING_CLASS_RE.test(cls);
}

function paddingValue(tokens: string[], kinds: string[]) {
  for (const kind of kinds) {
    const numbered = new RegExp(`^${kind}-(\\d+(?:\\.\\d+)?)$`);
    const arbitrary = new RegExp(`^${kind}-\\[(.+)\\]$`);

    for (const token of tokens) {
      const numberedMatch = token.match(numbered);
      if (numberedMatch) {
        return `${Number(numberedMatch[1]) * 0.25}rem`;
      }

      const arbitraryMatch = token.match(arbitrary);
      if (arbitraryMatch) {
        return arbitraryMatch[1];
      }
    }
  }

  return null;
}

function splitClassName(className: string) {
  const tokens = className.split(/\s+/).filter(Boolean);
  const paddingClasses = tokens.filter(isPaddingClass);
  const otherClasses = tokens.filter((cls) => !isPaddingClass(cls)).join(" ");

  return {
    otherClasses,
    paddingClassName: paddingClasses.join(" "),
    hasCustomPadding: paddingClasses.length > 0,
    hasVerticalPadding: paddingClasses.some((cls) =>
      /^(p|py|pt|pb)-/.test(cls),
    ),
    hasExplicitRight: paddingClasses.some((cls) => /^pr-/.test(cls)),
    textToArrowGap:
      paddingValue(tokens, ["px", "pl", "p"]) ?? DEFAULT_TEXT_ARROW_GAP,
    verticalPad: paddingValue(tokens, ["py", "pt", "p"]),
  };
}

export interface ArrowFillButtonOwnProps {
  btnText?: string;
  href?: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
  fillBgColor?: string;
  fillTextColor?: string;
  hoverFillBgColor?: string;
  hoverFillTextColor?: string;
  arrowColor?: string;
  hoverArrowColor?: string;
  animationDuration?: number;
  fillOnHover?: boolean;
}

export type ArrowFillButtonProps = ArrowFillButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ArrowFillButtonOwnProps>;

function ArrowFillButton({
  btnText = "Hover Me",
  href = DEFAULT_HREF,
  className = "",

  bgColor = "#000000",
  textColor = "#ffffff",

  fillBgColor = "#00BF63",
  fillTextColor = "#ffffff",

  hoverFillBgColor = "#00BF63",
  hoverFillTextColor = "#ffffff",

  arrowColor,
  hoverArrowColor,

  onClick,
  ...props
}: ArrowFillButtonProps) {
  const { open } = useSiteModal();
  const [isReady, setIsReady] = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const releaseTimeoutRef = useRef<number | null>(null);

  const usesUtilityBackground =
    className.includes("bg-") ||
    className.includes("from-") ||
    className.includes("via-") ||
    className.includes("to-");

  const {
    otherClasses,
    paddingClassName,
    hasCustomPadding,
    hasVerticalPadding,
    hasExplicitRight,
    textToArrowGap,
    verticalPad,
  } = splitClassName(className);

  const iconRightPad =
    "calc(var(--icon-circle) + var(--icon-right) + var(--btn-text-arrow-gap))";

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${COMPACT_LAYOUT_BREAKPOINT - 1}px)`,
    );

    const syncCompactLayout = (
      event: MediaQueryList | MediaQueryListEvent,
    ) => {
      const matches =
        "matches" in event
          ? event.matches
          : ((event as MediaQueryListEvent).currentTarget as MediaQueryList)
              .matches;
      setIsCompactLayout(matches);

      if (!matches) {
        setIsPressed(false);
      }
    };

    syncCompactLayout(mediaQuery);
    mediaQuery.addEventListener("change", syncCompactLayout);

    return () => {
      mediaQuery.removeEventListener("change", syncCompactLayout);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (releaseTimeoutRef.current) {
        window.clearTimeout(releaseTimeoutRef.current);
      }
    };
  }, []);

  const clearPressedState = () => {
    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
    }

    releaseTimeoutRef.current = window.setTimeout(() => {
      setIsPressed(false);
      releaseTimeoutRef.current = null;
    }, ANIMATION_DURATION_MS);
  };

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    props.onPointerDown?.(event);

    if (!isCompactLayout || event.pointerType === "mouse") {
      return;
    }

    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
      releaseTimeoutRef.current = null;
    }

    setIsPressed(true);
  };

  const handlePointerUp = (event: PointerEvent<HTMLAnchorElement>) => {
    props.onPointerUp?.(event);

    if (!isCompactLayout || event.pointerType === "mouse") {
      return;
    }

    clearPressedState();
  };

  const handlePointerCancel = (event: PointerEvent<HTMLAnchorElement>) => {
    props.onPointerCancel?.(event);

    if (!isCompactLayout || event.pointerType === "mouse") {
      return;
    }

    clearPressedState();
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (href === "#contact") {
      event.preventDefault();
      open("project");
    }
  };

  return (
    <a
      href={href}
      {...props}
      data-pressed={isPressed ? "true" : "false"}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={`group relative inline-flex ${
        hasVerticalPadding ? "" : "h-[2.75em]"
      } w-fit min-w-fit max-w-none cursor-pointer items-center justify-center overflow-hidden rounded-full [--btn-pad-t:0] [--btn-pad-b:0.125em] [--btn-pad-l:2.5em] [--btn-pad-r:calc(var(--icon-circle)+var(--icon-right)+var(--btn-text-arrow-gap))] ${
        hasCustomPadding
          ? paddingClassName
          : "pt-(--btn-pad-t) pr-(--btn-pad-r) pb-(--btn-pad-b) pl-(--btn-pad-l)"
      } text-[15px] leading-none font-medium whitespace-nowrap [text-rendering:geometricPrecision] [--icon-circle:1.85em] [--icon-right:0.35em] [--circle-inset-y:calc((100%-var(--icon-circle))/2)] ${
        usesUtilityBackground ? "" : "bg-(--btn-bg)"
      } text-(--btn-text) ${
        isReady
          ? "transition-[box-shadow] duration-450 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:[box-shadow:var(--btn-hover-shadow)] group-data-[pressed=true]:[box-shadow:var(--btn-hover-shadow)]"
          : ""
      } ${otherClasses}`}
      style={
        {
          "--btn-bg": bgColor,
          "--btn-text": textColor,
          "--btn-fill-bg": fillBgColor,
          "--btn-fill-text": fillTextColor,
          "--btn-fill-bg-hover": hoverFillBgColor,
          "--btn-fill-text-hover": hoverFillTextColor,
          "--btn-arrow": arrowColor || fillTextColor,
          "--btn-arrow-hover": hoverArrowColor || hoverFillTextColor,
          "--btn-hover-shadow": HOVER_INSET_SHADOW,
          "--btn-text-arrow-gap": textToArrowGap,
          ...(hasVerticalPadding && verticalPad
            ? {
                "--icon-circle": `calc(1em + (2 * ${verticalPad}) - 0.7em)`,
              }
            : {}),
          visibility: isReady ? "visible" : "hidden",
          ...(hasCustomPadding && !hasExplicitRight
            ? { paddingRight: iconRightPad }
            : {}),
        } as CSSProperties & Record<string, string | number>
      }
    >
      <span className="relative z-1 pb-px">{btnText}</span>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute z-2 rounded-full bg-(--btn-fill-bg) inset-[var(--circle-inset-y)_var(--icon-right)_var(--circle-inset-y)_calc(100%-var(--icon-right)-var(--icon-circle))] ${
          isReady
            ? "transition-all duration-450 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:inset-0 group-hover:bg-(--btn-fill-bg-hover) group-data-[pressed=true]:inset-0 group-data-[pressed=true]:bg-(--btn-fill-bg-hover)"
            : ""
        }`}
      />

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-2 flex items-center ${
          hasCustomPadding ? paddingClassName : "pr-(--btn-pad-r) pl-(--btn-pad-l)"
        } text-(--btn-fill-text) [clip-path:inset(var(--circle-inset-y)_var(--icon-right)_var(--circle-inset-y)_calc(100%-var(--icon-right)-var(--icon-circle)))] ${
          isReady
            ? "transition-all duration-450 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:text-(--btn-fill-text-hover) group-hover:[clip-path:inset(0_0_0_0)] group-data-[pressed=true]:text-(--btn-fill-text-hover) group-data-[pressed=true]:[clip-path:inset(0_0_0_0)]"
            : ""
        }`}
        style={
          hasCustomPadding && !hasExplicitRight
            ? { paddingRight: iconRightPad }
            : undefined
        }
      >
        <span className="relative z-1 pb-px whitespace-nowrap">{btnText}</span>
      </div>

      <span
        className={`pointer-events-none absolute top-1/2 right-[var(--icon-right)] z-3 inline-flex h-[var(--icon-circle)] w-[var(--icon-circle)] shrink-0 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-(--btn-fill-bg) text-(--btn-arrow) ${
          isReady
            ? "transition-colors duration-450 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:bg-(--btn-fill-bg-hover) group-hover:text-(--btn-arrow-hover) group-data-[pressed=true]:bg-(--btn-fill-bg-hover) group-data-[pressed=true]:text-(--btn-arrow-hover)"
            : ""
        }`}
        style={{
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          maskImage: "radial-gradient(white, black)",
        }}
        aria-hidden="true"
      >
        <ArrowRight
          className={`absolute top-1/2 left-1/2 size-[0.95em] origin-center translate-x-[-170%] -translate-y-1/2 scale-0 text-current ${
            isReady
              ? "transition-transform duration-450 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:scale-100 group-data-[pressed=true]:-translate-x-1/2 group-data-[pressed=true]:-translate-y-1/2 group-data-[pressed=true]:scale-100"
              : ""
          }`}
          strokeWidth={1.8}
        />

        <ArrowRight
          className={`absolute top-1/2 left-1/2 size-[0.95em] origin-center -translate-x-1/2 -translate-y-1/2 text-current ${
            isReady
              ? "transition-transform duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:translate-x-[70%] group-hover:-translate-y-1/2 group-hover:scale-0 group-data-[pressed=true]:translate-x-[70%] group-data-[pressed=true]:-translate-y-1/2 group-data-[pressed=true]:scale-0"
              : ""
          }`}
          strokeWidth={1.8}
        />
      </span>
    </a>
  );
}

export default ArrowFillButton;
