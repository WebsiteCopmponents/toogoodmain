import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const OFFSET_INCREMENT = 0.01;
const EASE = "cubic-bezier(0.625, 0.05, 0, 1)";

const rootClass =
  "group relative inline-flex max-w-[12em] grow cursor-pointer appearance-none items-center justify-center rounded-[0.25em] border-0 bg-transparent p-[1em] text-[1em] leading-none text-[#131313] no-underline normal-case";

const bgClass =
  "pointer-events-none absolute inset-0 rounded-[0.25em] bg-[#efeeec] transition-[inset] duration-[600ms] group-hover:inset-[0.125em]";

const textClass =
  "relative inline-block overflow-hidden whitespace-nowrap leading-[1.3]";

const charClass =
  "relative inline-block translate-y-0 rotate-[0.001deg] [text-shadow:0_1.3em_currentColor] transition-transform duration-[600ms] group-hover:-translate-y-[1.3em] group-hover:rotate-[0.001deg]";

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

function toCapitalized(text: string) {
  return text
    .toLocaleLowerCase()
    .replace(/(^|[\s/-])(\S)/g, (_, lead: string, letter: string) => {
      return `${lead}${letter.toLocaleUpperCase()}`;
    });
}

function StaggerText({ text }: { text: string }) {
  const label = toCapitalized(text);
  return (
    <span data-button-animate-chars="" className={textClass}>
      {[...label].map((char, index) => (
        <span
          key={`${index}-${char}`}
          className={charClass}
          style={{
            transitionTimingFunction: EASE,
            transitionDelay: `${index * OFFSET_INCREMENT}s`,
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function RightArrow() {
  return (
    <svg
      className="relative ml-2 h-3.5 w-3.5 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 8h11M9.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type SharedProps = {
  children: string;
  className?: string;
  bgClassName?: string;
  arrow?: boolean;
};

type StaggerButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

type StaggerButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

export type StaggerButtonProps = StaggerButtonAsLink | StaggerButtonAsButton;

export default function StaggerButton(props: StaggerButtonProps) {
  const { children, className, bgClassName, arrow, ...rest } = props;
  const label = <StaggerText text={children} />;
  const classes = cx(rootClass, className);
  const background = (
    <span
      className={cx(bgClass, bgClassName)}
      style={{ transitionTimingFunction: EASE }}
    />
  );
  const content = (
    <>
      {background}
      {label}
      {arrow ? <RightArrow /> : null}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  const buttonRest = rest as StaggerButtonAsButton;
  return (
    <button type={buttonRest.type ?? "button"} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
