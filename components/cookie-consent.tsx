"use client";

import { useEffect, useState } from "react";
import { useSiteModal } from "@/components/ContactModal";

const STORAGE_KEY = "toogood-cookie-consent";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (typeof parsed.analytics !== "boolean") return null;
    return {
      necessary: true,
      analytics: parsed.analytics,
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

function writeConsent(consent: Consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  document.documentElement.dataset.cookieConsent = consent.analytics
    ? "accepted"
    : "rejected";
}

const pill =
  "w-full rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors md:w-auto md:min-w-[7.5rem]";

export default function CookieConsent() {
  const { open, isOpen } = useSiteModal();
  const [visible, setVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      writeConsent(existing);
      return;
    }
    setVisible(true);
  }, []);

  const save = (consent: Consent) => {
    writeConsent(consent);
    setVisible(false);
  };

  if (!visible || isOpen) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[180] flex justify-center p-4 pb-[6.5rem] md:justify-start md:px-8 md:pt-8">
      <aside
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-copy"
        className="pointer-events-auto w-full max-w-[440px] rounded-[28px] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] ring-1 ring-black/5 sm:p-6"
      >
        <h2 id="cookie-consent-title" className="sr-only">
          Cookie consent
        </h2>
        <p
          id="cookie-consent-copy"
          className="text-[15px] leading-relaxed text-black"
        >
          By clicking &quot;Accept&quot;, you agree to the storing of cookies
          on your device to enhance site navigation, analyze site usage, and
          assist in our marketing efforts. View our{" "}
          <button
            type="button"
            onClick={() => open("privacy")}
            className="font-medium text-black underline underline-offset-2"
          >
            Privacy Policy
          </button>{" "}
          for more information.
        </p>

        {prefsOpen ? (
          <div className="mt-5 space-y-3">
            <label className="flex items-center justify-between gap-4 rounded-2xl bg-[#e4ddd1] px-4 py-3 text-sm font-medium text-black">
              Necessary
              <span className="text-[12px] font-normal text-black/60">
                Always on
              </span>
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-[#e4ddd1] px-4 py-3 text-sm font-medium text-black">
              Analytics
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                className="size-4 accent-black"
              />
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-[#e4ddd1] px-4 py-3 text-sm font-medium text-black">
              Marketing
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
                className="size-4 accent-black"
              />
            </label>
            <button
              type="button"
              onClick={() =>
                save({
                  necessary: true,
                  analytics,
                  marketing,
                })
              }
              className={
                pill + " bg-black text-white hover:bg-[#00BF63] hover:text-white"
              }
            >
              Save preferences
            </button>
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:flex-wrap">
          <button
            type="button"
            onClick={() => setPrefsOpen((openPrefs) => !openPrefs)}
            className={pill + " bg-[#e4ddd1] text-black hover:bg-black hover:text-white"}
          >
            Preferences
          </button>
          <button
            type="button"
            onClick={() =>
              save({ necessary: true, analytics: false, marketing: false })
            }
            className={pill + " bg-[#00BF63] text-white hover:bg-black hover:text-white"}
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() =>
              save({ necessary: true, analytics: true, marketing: true })
            }
            className={pill + " bg-[#00BF63] text-white hover:bg-black hover:text-white"}
          >
            Accept
          </button>
        </div>
      </aside>
    </div>
  );
}
