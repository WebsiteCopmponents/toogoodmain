// Built using Hyperiux Vault: https://vault.hyperiux.com

import { StickyContentComp } from "./StickyContentComp";
//File: components/effects/sticky-content-wrapper/index.tsx
const stickyItems = [
  {
    heading: "Healthcare",
    paragraph:
      "Clinic sites, patient portals, and internal dashboards that keep bookings, records, and staff workflows in one place — without looking like a template.",
    list: [
      "• Bookings and patient journeys in one flow",
      "• Portals and staff dashboards that stay usable",
      "• Sites that don’t feel like a template",
    ],
    link: { href: "#contact", text: "Start a healthcare project" },
    image: "/healthcare-industry.png",
    alt: "Healthcare",
  },
  {
    heading: "Real estate",
    paragraph:
      "Listing sites, agent tools, and enquiry flows that make a property easy to find, easy to trust, and easy to enquire on — on desktop and on the phone.",
    list: [
      "• Listings that load fast and read clearly",
      "• Enquiry flows built for mobile",
      "• Agent tools that match the public site",
    ],
    link: { href: "#contact", text: "Start a real estate project" },
    image:
      "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/v-02.jpg",
    alt: "Real estate",
  },
  {
    heading: "Ecommerce",
    paragraph:
      "Storefronts that load fast, merchandising that reads clearly, and checkout that doesn’t leak the sale — built for the catalogue you actually run.",
    list: [
      "• Collection and product pages that convert",
      "• Checkout and account flows that stay simple",
      "• Ops dashboards that match the storefront",
    ],
    link: { href: "#contact", text: "Start an ecommerce project" },
    image: "/ecommerce-industry-image.png",
    alt: "Ecommerce",
  },
  {
    heading: "SaaS",
    paragraph:
      "Product sites, onboarding, and app UI that explain the offer without a demo call — then the dashboard people actually live in.",
    list: [
      "• Marketing site and product UI in one system",
      "• Onboarding that gets a team to value",
      "• Dashboards built around real workflows",
    ],
    link: { href: "#contact", text: "Start a SaaS project" },
    image: "/saas-industry.png",
    alt: "SaaS",
  },
  {
    heading: "Finance",
    paragraph:
      "Clear product sites and client dashboards where the numbers have to be right — designed so people can act without a support call.",
    list: [
      "• Product sites that explain the offer",
      "• Dashboards where the numbers are right",
      "• Journeys that don’t need a support call",
    ],
    link: { href: "#contact", text: "Start a finance project" },
    image:
      "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/v-04.jpg",
    alt: "Finance",
  },
  {
    heading: "Agencies",
    paragraph:
      "A studio site that shows the work, books the right briefs, and doesn’t look like every other agency template on the street.",
    list: [
      "• Case studies that sell the process",
      "• Enquiry that qualifies before the call",
      "• A site the studio can actually keep",
    ],
    link: { href: "#contact", text: "Start an agency project" },
    image: "/agenciesindustry.png",
    alt: "Agencies",
  },
];

export default function StickyContentWrapper({
  bgColor = "#F9F4EA",
  contentEnterYPercent = 2,
  contentTransitionDuration = 0.9,
  initialImageScale = 1.5,
  activeImageScale = 1.2,
  exitImageScale = 1,
}: {
  bgColor?: string;
  contentEnterYPercent?: number;
  contentTransitionDuration?: number;
  initialImageScale?: number;
  activeImageScale?: number;
  exitImageScale?: number;
}) {
  return (
    <section id="industries" aria-label="Industries">
      <StickyContentComp
        items={stickyItems}
        leftClassName="text-black"
        bgColor={bgColor}
        contentEnterYPercent={contentEnterYPercent}
        contentExitYPercent={-2}
        contentTransitionDuration={contentTransitionDuration}
        contentDelay={0.35}
        initialImageScale={initialImageScale}
        activeImageScale={activeImageScale}
        exitImageScale={exitImageScale}
      />
    </section>
  );
}
