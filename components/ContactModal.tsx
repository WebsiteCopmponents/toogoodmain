"use client";
//fILE : ContactModal.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Mail,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  Send,
  User,
  X,
} from "lucide-react";

export type ModalKind = "project" | "privacy" | "terms";

export type CustomModal = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  size?: "md" | "lg";
};

type ModalState =
  | { mode: ModalKind }
  | ({ mode: "custom" } & CustomModal)
  | null;

type SiteModalContextValue = {
  isOpen: boolean;
  open: (view: ModalKind | CustomModal) => void;
  close: () => void;
};

const SiteModalContext = createContext<SiteModalContextValue | null>(null);

export function useSiteModal() {
  return (
    useContext(SiteModalContext) ?? {
      isOpen: false,
      open: () => {},
      close: () => {},
    }
  );
}

export function SiteModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState>(null);

  const open = useCallback((view: ModalKind | CustomModal) => {
    if (typeof view === "string") {
      setState({ mode: view });
      return;
    }
    setState({ mode: "custom", ...view });
  }, []);

  const close = useCallback(() => setState(null), []);

  return (
    <SiteModalContext.Provider
      value={{ isOpen: state !== null, open, close }}
    >
      {children}
      <SiteModal state={state} onClose={close} />
    </SiteModalContext.Provider>
  );
}

const VIEWS: Record<ModalKind, { title: string; size: "md" | "lg" }> = {
  project: {
    title: "Get in touch",
    size: "lg",
  },
  privacy: {
    title: "Privacy Policy",
    size: "lg",
  },
  terms: {
    title: "Terms & Conditions",
    size: "lg",
  },
};

export const CALL_HREF = "tel:+447000000000";
export const WHATSAPP_HREF =
  "https://wa.me/447000000000?text=" +
  encodeURIComponent("Hi TooGood.agency — I'd like to start a project.");
const CONTACT_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

function ContactCtas({ surface }: { surface: "panel" | "form" }) {
  const callClass =
    surface === "panel"
      ? "flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3.5 text-[14px] font-medium text-black transition-colors hover:bg-black hover:text-white"
      : "flex items-center justify-center gap-2 rounded-full border border-[#d4cdc0] bg-[#e4ddd1] px-4 py-3.5 text-[14px] font-medium text-black transition-colors hover:bg-black hover:text-white";

  return (
    <div className="grid grid-cols-2 gap-3">
      <a href={CALL_HREF} className={callClass}>
        <Phone size={16} />
        Call
      </a>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-full bg-[#ffaee7] px-4 py-3.5 text-[14px] font-medium text-black transition-colors hover:bg-black hover:text-white"
      >
        <WhatsAppGlyph className="size-4" />
        WhatsApp
      </a>
    </div>
  );
}

function SiteModal({
  state,
  onClose,
}: {
  state: ModalState;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!state) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [state, onClose]);

  if (!state) return null;

  const meta =
    state.mode === "custom"
      ? {
          title: state.title,
          size: state.size ?? "lg",
        }
      : VIEWS[state.mode];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/50 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-modal-title"
        className={
          "relative flex max-h-[min(92vh,900px)] w-full flex-col overflow-hidden rounded-[40px] bg-[var(--new-site-background-color)] shadow-[0_24px_80px_rgba(0,0,0,0.22)] " +
          (state.mode === "project"
            ? "max-w-[980px]"
            : meta.size === "lg"
              ? "max-w-[760px]"
              : "max-w-[640px]")
        }
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-white text-black shadow-sm transition-colors hover:bg-[#ffaee7] sm:top-5 sm:right-5"
        >
          <X size={18} />
        </button>

        {state.mode === "project" ? (
          <ProjectForm onClose={onClose} />
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-6 pb-5 sm:px-8 sm:pt-8 sm:pb-6">
            <h2
              id="site-modal-title"
              className="font-heading mb-5 pr-10 text-[26px] leading-[1.15] font-medium text-black sm:mb-6 sm:text-[32px]"
            >
              {meta.title}
            </h2>
            {state.mode === "custom" ? (
              state.children
            ) : state.mode === "privacy" ? (
              <PrivacyContent />
            ) : (
              <TermsContent />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  pages: number;
  ui: "custom" | "random";
  wantPlan: "yes" | "no";
  billing: "one-time" | "ongoing";
  plan: "website" | "website-app" | "custom" | "";
  service: string;
  date: string;
  time: string;
  message: string;
};

const SERVICES = [
  "Web Design",
  "Web Development",
  "Web Applications",
  "Mobile Applications",
  "AI Automation",
  "AI Chatbots",
  "UI/UX Design",
];

const PLANS = {
  "one-time": [
    { id: "website" as const, title: "Website", price: "£500" },
    { id: "website-app" as const, title: "Website + App", price: "£1,000" },
    { id: "custom" as const, title: "Custom", price: "Custom" },
  ],
  ongoing: [
    { id: "website" as const, title: "Website", price: "£500/month" },
    {
      id: "website-app" as const,
      title: "Website + App",
      price: "£1,000/month",
    },
    { id: "custom" as const, title: "Custom", price: "Custom" },
  ],
};

const inputClass =
  "w-full rounded-2xl border border-[#d4cdc0] bg-[#e4ddd1] py-3 pr-4 pl-11 text-sm text-black outline-none placeholder:text-[#8a8a8a] focus:border-black focus:bg-white";

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "13:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

function formatDisplayDate(value: string) {
  if (!value) return "";
  const date = new Date(value + "T00:00:00");
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDisplayTime(value: string) {
  if (!value) return "";
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return value;
  const date = new Date();
  date.setHours(h, m, 0, 0);
  return date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function useOutsideClose(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) onClose();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
  return ref;
}

function ServiceSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const ref = useOutsideClose(open, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={
          "flex w-full items-center gap-3 rounded-2xl border bg-[#e4ddd1] px-4 py-3.5 text-left text-sm transition-colors " +
          (open
            ? "border-black bg-white"
            : "border-[#d4cdc0] hover:border-black/40")
        }
      >
        <Briefcase size={16} className="shrink-0 text-[#8a8a8a]" />
        <span
          className={
            "min-w-0 flex-1 truncate " +
            (value ? "text-black" : "text-[#8a8a8a]")
          }
        >
          {value || "What do you need?"}
        </span>
        <ChevronDown
          size={16}
          className={
            "shrink-0 text-[#8a8a8a] transition-transform " +
            (open ? "rotate-180" : "")
          }
        />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-[calc(100%+8px)] right-0 left-0 z-30 max-h-56 overflow-y-auto rounded-2xl border border-[#d4cdc0] bg-white p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
        >
          {SERVICES.map((service) => {
            const selected = value === service;
            return (
              <li key={service}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(service);
                    setOpen(false);
                  }}
                  className={
                    "flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors " +
                    (selected
                      ? "bg-black text-white"
                      : "text-black hover:bg-[#e4ddd1]")
                  }
                >
                  {service}
                  {selected ? <Check size={15} /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <input type="hidden" name="service" value={value} />
    </div>
  );
}

function DatePickerField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="relative">
      <div className="pointer-events-none flex w-full items-center gap-3 rounded-2xl border border-[#d4cdc0] bg-[#e4ddd1] px-4 py-3.5 text-left text-sm">
        <Calendar size={16} className="shrink-0 text-[#8a8a8a]" />
        <span
          className={
            "min-w-0 flex-1 truncate " +
            (value ? "text-black" : "text-[#8a8a8a]")
          }
        >
          {value ? formatDisplayDate(value) : "Pick a day"}
        </span>
      </div>
      <input
        ref={inputRef}
        type="date"
        min={today}
        value={value}
        required
        onChange={(event) => onChange(event.target.value)}
        onClick={() => {
          const input = inputRef.current;
          if (input && typeof input.showPicker === "function") {
            try {
              input.showPicker();
            } catch {
              // fall back to native focus behaviour
            }
          }
        }}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label="Preferred date"
      />
    </div>
  );
}

function TimePickerField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const ref = useOutsideClose(open, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={
          "flex w-full items-center gap-3 rounded-2xl border bg-[#e4ddd1] px-4 py-3.5 text-left text-sm transition-colors " +
          (open
            ? "border-black bg-white"
            : "border-[#d4cdc0] hover:border-black/40")
        }
      >
        <Clock size={16} className="shrink-0 text-[#8a8a8a]" />
        <span
          className={
            "min-w-0 flex-1 truncate " +
            (value ? "text-black" : "text-[#8a8a8a]")
          }
        >
          {value ? formatDisplayTime(value) : "Pick a time"}
        </span>
        <ChevronDown
          size={16}
          className={
            "shrink-0 text-[#8a8a8a] transition-transform " +
            (open ? "rotate-180" : "")
          }
        />
      </button>

      {open ? (
        <div
          id={listId}
          role="listbox"
          className="absolute top-[calc(100%+8px)] right-0 left-0 z-30 rounded-2xl border border-[#d4cdc0] bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
        >
          <div className="grid max-h-48 grid-cols-3 gap-1.5 overflow-y-auto">
            {TIME_SLOTS.map((slot) => {
              const selected = value === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(slot);
                    setOpen(false);
                  }}
                  className={
                    "rounded-xl px-2 py-2.5 text-[13px] font-medium transition-colors " +
                    (selected
                      ? "bg-[#ffaee7] text-black"
                      : "bg-[#e4ddd1] text-black hover:bg-black hover:text-white")
                  }
                >
                  {formatDisplayTime(slot)}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <input type="hidden" name="time" value={value} />
    </div>
  );
}

function FieldIcon({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#8a8a8a]">
      {children}
    </span>
  );
}

function ChoiceCard({
  selected,
  title,
  description,
  onClick,
}: {
  selected: boolean;
  title: string;
  description?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-2xl border px-4 py-3.5 text-left transition-colors " +
        (selected
          ? "border-black bg-[#ffaee7]"
          : "border-[#d4cdc0] bg-[#e4ddd1] hover:border-black/40")
      }
    >
      <span className="block text-sm font-medium text-black">{title}</span>
      {description ? (
        <span className="mt-1 block text-[12px] leading-snug text-[#666]">
          {description}
        </span>
      ) : null}
    </button>
  );
}

function ProjectForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    pages: 1,
    ui: "custom",
    wantPlan: "no",
    billing: "one-time",
    plan: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "ok" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.service || !formData.date || !formData.time) {
      setSubmitError("Pick a service, date, and time.");
      setSubmitState("error");
      return;
    }

    const selectedPlan =
      formData.wantPlan === "yes"
        ? PLANS[formData.billing].find((plan) => plan.id === formData.plan)
        : undefined;

    setSubmitError("");
    setSubmitState("sending");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          pages: String(formData.pages),
          uiStyle: formData.ui === "custom" ? "Custom UI" : "Random UI",
          logo: "Will discuss on the call",
          service: formData.service,
          preferredDate: formData.date,
          preferredTime: formData.time,
          notes: formData.message.trim(),
          pickPlan: formData.wantPlan === "yes" ? "Yes" : "No",
          billing:
            formData.wantPlan === "yes"
              ? formData.billing === "ongoing"
                ? "Ongoing project"
                : "One-time project"
              : "",
          planName: selectedPlan?.title ?? "",
          planPrice: selectedPlan?.price ?? "",
        }),
      });

      const body = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(body.error || "Could not send the booking.");
      }

      setSubmitState("ok");
    } catch (error) {
      setSubmitState("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Could not send the booking.",
      );
    }
  };

  const plans = PLANS[formData.billing];

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden md:grid-cols-[0.88fr_1.12fr]">
      <aside className="hidden flex-col gap-4 bg-[#e4ddd1] p-5 sm:p-6 md:flex md:p-7">
        <div className="relative min-h-[200px] flex-1 overflow-hidden rounded-[24px] md:min-h-[320px]">
          <img
            src={CONTACT_IMAGE}
            alt=""
            className="absolute inset-0 size-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>

        <ContactCtas surface="panel" />
      </aside>

      <div className="min-h-0 overflow-y-auto px-5 py-6 sm:px-7 sm:py-7 md:px-8">
        <h2
          id="site-modal-title"
          className="font-heading mb-2 pr-10 text-[26px] leading-[1.15] font-medium text-black sm:text-[32px]"
        >
          Get in touch
        </h2>
        <p className="mb-5 text-sm leading-relaxed text-[#555]">
          Share a few details and we will confirm your slot.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block text-sm font-medium text-black">
              Name
              <span className="relative mt-1.5 block">
                <FieldIcon>
                  <User size={16} />
                </FieldIcon>
                <input
                  name="name"
                  required
                  placeholder="Ada Lovelace"
                  value={formData.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className={inputClass}
                />
              </span>
            </label>

            <label className="block text-sm font-medium text-black">
              Email
              <span className="relative mt-1.5 block">
                <FieldIcon>
                  <Mail size={16} />
                </FieldIcon>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@studio.com"
                  value={formData.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={inputClass}
                />
              </span>
            </label>

            <label className="block text-sm font-medium text-black sm:col-span-2">
              Phone
              <span className="relative mt-1.5 block">
                <FieldIcon>
                  <Phone size={16} />
                </FieldIcon>
                <input
                  name="phone"
                  required
                  placeholder="+44 7700 900000"
                  value={formData.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className={inputClass}
                />
              </span>
            </label>
          </div>

          <div>
            <p className="mb-1.5 text-sm font-medium text-black">
              How many pages
            </p>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-[#d4cdc0] bg-[#e4ddd1] p-1.5">
              <button
                type="button"
                aria-label="Decrease pages"
                onClick={() =>
                  setField("pages", Math.max(1, formData.pages - 1))
                }
                className="flex size-10 items-center justify-center rounded-xl bg-white text-black transition-colors hover:bg-black hover:text-white"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-8 text-center text-[16px] font-medium tabular-nums text-black">
                {formData.pages}
              </span>
              <button
                type="button"
                aria-label="Increase pages"
                onClick={() => setField("pages", formData.pages + 1)}
                className="flex size-10 items-center justify-center rounded-xl bg-white text-black transition-colors hover:bg-black hover:text-white"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-sm font-medium text-black">UI</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ChoiceCard
                selected={formData.ui === "custom"}
                title="Custom UI"
                description="Figma, review, then development"
                onClick={() => setField("ui", "custom")}
              />
              <ChoiceCard
                selected={formData.ui === "random"}
                title="Random UI"
                description="Any UI — we go straight to development"
                onClick={() => setField("ui", "random")}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#d4cdc0] bg-[#e4ddd1] px-4 py-3.5">
            <p className="text-sm font-medium text-black">Logo</p>
            <p className="mt-1 text-[13px] text-[#666]">
              Will discuss on the call
            </p>
          </div>

          <div>
            <p className="mb-1.5 text-sm font-medium text-black">
              Do you want to pick a plan?{" "}
              <span className="font-normal text-[#888]">(optional)</span>
            </p>
            <div className="grid grid-cols-2 gap-3">
              <ChoiceCard
                selected={formData.wantPlan === "yes"}
                title="Yes"
                onClick={() => setField("wantPlan", "yes")}
              />
              <ChoiceCard
                selected={formData.wantPlan === "no"}
                title="No"
                onClick={() => {
                  setField("wantPlan", "no");
                  setField("plan", "");
                }}
              />
            </div>
          </div>

          {formData.wantPlan === "yes" ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#e4ddd1] p-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setField("billing", "one-time");
                    setField("plan", "");
                  }}
                  className={
                    "rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors " +
                    (formData.billing === "one-time"
                      ? "bg-white text-black shadow-sm"
                      : "text-[#666] hover:text-black")
                  }
                >
                  One-time project
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setField("billing", "ongoing");
                    setField("plan", "");
                  }}
                  className={
                    "rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors " +
                    (formData.billing === "ongoing"
                      ? "bg-white text-black shadow-sm"
                      : "text-[#666] hover:text-black")
                  }
                >
                  Ongoing project
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setField("plan", plan.id)}
                    className={
                      "rounded-2xl border px-4 py-4 text-left transition-colors " +
                      (formData.plan === plan.id
                        ? "border-black bg-black text-white"
                        : "border-[#d4cdc0] bg-[#e4ddd1] text-black hover:border-black/40")
                    }
                  >
                    <span className="block text-sm font-medium">
                      {plan.title}
                    </span>
                    <span
                      className={
                        "mt-1 block text-[13px] " +
                        (formData.plan === plan.id
                          ? "text-white/80"
                          : "text-[#666]")
                      }
                    >
                      {plan.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <p className="mb-1.5 text-sm font-medium text-black">Service</p>
            <ServiceSelect
              value={formData.service}
              onChange={(service) => setField("service", service)}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 text-sm font-medium text-black">
                Preferred date
              </p>
              <DatePickerField
                value={formData.date}
                onChange={(date) => setField("date", date)}
              />
            </div>

            <div>
              <p className="mb-1.5 text-sm font-medium text-black">
                Preferred time
              </p>
              <TimePickerField
                value={formData.time}
                onChange={(time) => setField("time", time)}
              />
            </div>
          </div>

          <label className="block text-sm font-medium text-black">
            Message{" "}
            <span className="font-normal text-[#888]">(optional)</span>
            <span className="relative mt-1.5 block">
              <span className="pointer-events-none absolute top-3.5 left-3.5 text-[#8a8a8a]">
                <MessageSquare size={16} />
              </span>
              <textarea
                name="message"
                rows={3}
                placeholder="Anything we should know before the call"
                value={formData.message}
                onChange={(e) => setField("message", e.target.value)}
                className="w-full resize-none rounded-2xl border border-[#d4cdc0] bg-[#e4ddd1] py-3 pr-4 pl-11 text-sm text-black outline-none placeholder:text-[#8a8a8a] focus:border-black focus:bg-white"
              />
            </span>
          </label>

          {submitState === "ok" ? (
            <div className="space-y-3">
              <p className="rounded-2xl bg-[#e4ddd1] px-4 py-3 text-center text-sm font-medium text-black">
                Booked. We will confirm the slot by email.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-full bg-black py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#ffaee7] hover:text-black"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {submitState === "error" && submitError ? (
                <p className="text-center text-sm text-red-700">{submitError}</p>
              ) : null}

              <button
                type="submit"
                disabled={submitState === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#ffaee7] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitState === "sending" ? "Sending…" : "Book appointment"}
                <Send size={16} />
              </button>
            </>
          )}

          <div className="md:hidden">
            <ContactCtas surface="form" />
          </div>

          <p className="hidden text-center text-[13px] text-[#666] md:block">
            Prefer WhatsApp?{" "}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-black underline-offset-2 hover:underline"
            >
              Message us
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

function LegalBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h3 className="font-heading text-lg font-medium text-black">{title}</h3>
      <p className="text-sm leading-relaxed text-[#555]">{children}</p>
    </section>
  );
}

function PrivacyContent() {
  return (
    <div className="space-y-5 pb-2">
      <LegalBlock title="Who we are">
        TooGood.agency is an early-stage UK online studio. This note explains
        what we collect when you write to us, and what we do with it.
      </LegalBlock>
      <LegalBlock title="What we collect">
        If you send a project request, we keep the details you give us — name,
        email, WhatsApp number, and the brief — so we can reply. We do not sell
        that information.
      </LegalBlock>
      <LegalBlock title="How we use it">
        We use it to answer you, quote the work, and stay in touch about a
        live project. We do not run a marketing list from this form unless you
        ask us to.
      </LegalBlock>
      <LegalBlock title="How long we keep it">
        Briefs and emails stay as long as we need them to do the work, then we
        delete them when they are no longer useful.
      </LegalBlock>
      <LegalBlock title="Contact">
        Questions about this policy: write to us through the Start a project
        form and mark the message as privacy.
      </LegalBlock>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="space-y-5 pb-2">
      <LegalBlock title="The studio">
        TooGood.agency designs and builds websites, mobile apps, dashboards,
        and UI/UX, plus the connected work around a launch. We work online
        from the UK.
      </LegalBlock>
      <LegalBlock title="A brief is not a contract">
        Sending a project request does not book us. Work starts when both
        sides agree the scope, timeline, and fee in writing.
      </LegalBlock>
      <LegalBlock title="What we will and will not take on">
        We take on work we can ship well. We may decline a brief that does not
        fit the studio, and we will say so plainly.
      </LegalBlock>
      <LegalBlock title="Your materials">
        You keep the rights to your brand, copy, and data. We keep the rights
        to unused experiments unless the agreement says otherwise.
      </LegalBlock>
      <LegalBlock title="Site use">
        Do not misuse this site or the form. Content here is for information;
        it is not legal advice.
      </LegalBlock>
    </div>
  );
}

export default function ContactModal({
  isOpen,
  onClose,
  children,
  title = "Start a project",
  eyebrow = "TooGood.agency",
  size = "md",
}: {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
  eyebrow?: string;
  size?: "md" | "lg";
}) {
  if (!isOpen) return null;
  return (
    <SiteModal
      state={{
        mode: "custom",
        title,
        eyebrow,
        size,
        children: children ?? <ProjectForm onClose={onClose} />,
      }}
      onClose={onClose}
    />
  );
}
