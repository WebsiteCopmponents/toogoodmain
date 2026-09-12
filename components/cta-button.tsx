import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import StaggerButton from "@/components/stagger-button";

function ArrowUpRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden
    >
      <path
        d="M0.353516 10L9.85352 0.5M9.85352 0.5V8.5M9.85352 0.5H1.85352"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

const primaryClass =
  "inline-flex cursor-pointer items-center gap-[10px] rounded-[99px] bg-primary p-[4px_20px_4px_4px] font-sans text-[16px] leading-[24px] font-normal text-[#FDFCFD] no-underline backdrop-blur-[50px] transition-opacity hover:opacity-90";

type CtaShared = {
  children: string;
  className?: string;
};

type CtaAsLink = CtaShared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

type CtaAsButton = CtaShared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

export type CtaButtonProps = CtaAsLink | CtaAsButton;

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

export function CtaButton(props: CtaButtonProps) {
  const { children, className, ...rest } = props;
  const classes = cx(primaryClass, className);
  const inner = (
    <>
      <span className="flex aspect-square h-[44px] w-[44px] items-center justify-center rounded-full bg-[#E5F1C7] text-primary">
        <ArrowUpRightIcon />
      </span>
      <span>{children}</span>
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {inner}
      </a>
    );
  }

  const buttonRest = rest as CtaAsButton;
  return (
    <button type={buttonRest.type ?? "button"} className={classes} {...buttonRest}>
      {inner}
    </button>
  );
}

export function CtaStaggerButton(
  props: Omit<CtaButtonProps, "className"> & {
    className?: string;
    bgClassName?: string;
  },
) {
  const { className, bgClassName, children, ...rest } = props;
  const shared = {
    arrow: true as const,
    children,
    className: cx("max-w-none grow-0 rounded-[99px] px-8 py-4", className),
    bgClassName: cx("rounded-[99px] bg-[#EEEEED]", bgClassName),
  };

  if ("href" in rest && rest.href) {
    return <StaggerButton {...shared} href={rest.href} />;
  }

  return <StaggerButton {...shared} />;
}
