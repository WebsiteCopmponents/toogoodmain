// Built using Hyperiux Vault: https://vault.hyperiux.com

import { StickyContentComp } from "./StickyContentComp";

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
    image:
      "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/v-01.jpg",
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
    link: { href: "#contact", text: "View real estate work" },
    image:
      "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/v-02.jpg",
  },
  {
    heading: "Restaurants",
    paragraph:
      "Menus, bookings, and brand sites that feel as considered as the room — plus the SEO and ads that fill the tables mid-week.",
    list: [
      "• Menus and bookings that match the brand",
      "• Sites that feel as considered as the room",
      "• SEO and ads that fill mid-week tables",
    ],
    link: { href: "#contact", text: "Book a restaurant site" },
    image:
      "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/v-03.jpg",
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
    link: { href: "#contact", text: "Talk finance products" },
    image:
      "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/v-04.jpg",
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
