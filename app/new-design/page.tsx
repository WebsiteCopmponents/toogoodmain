import TextConvergence from "@/components/effects/text-convergence";
import StickyContentWrapper from "@/components/effects/sticky-content-wrapper";
import ZoomSlider from "@/components/effects/zoom-slider";
import BentoGrid from "@/components/NewDesignComponents/BentoGrid";
import NewHero from "@/components/NewDesignComponents/NewHero";
import TextReveal02 from "@/components/NewDesignComponents/TextReveal02";
import type { CarouselItem } from "@/components/NewDesignComponents/testimonials";
import HowItWorks04Kelo from "@/components/how-it-works";
import Pricing from "@/components/pricing";
import FAQ from "@/components/faq";
import GlobalCta from "@/components/global-cta";
import NormalFooter from "@/components/normal-footer";
import ArrowFillButton from "@/components/NewDesignComponents/ArrowFillButton";

import { CalendlyCarousel } from "@/components/NewDesignComponents/testimonials";
const STORIES_DATA: CarouselItem[] = [
  {
    id: "studio-prism",
    stat: "140+ design sprints completed",
    quote:
      "Automating client bookings unlocked uninterrupted deep work sessions and transformed our delivery cadence.",
    author: "Elena Rostova",
    role: "Head of Product Design at Studio Prism",
    defaultImage:
      "https://cdn.21st.dev/assets/mirror/c6/c6c51783628e317008b03004640a273251c41c6373a6fc63738dc2d56df83965.jpg",
    selectedImage:
      "https://cdn.21st.dev/assets/mirror/c6/c6c51783628e317008b03004640a273251c41c6373a6fc63738dc2d56df83965.jpg",
    alt: "Elena Rostova collaborating with her design team in a creative studio",
  },
  {
    id: "veloce-ai",
    stat: "99.4% client meeting attendance",
    quote:
      "Smart qualification workflows removed manual no-shows completely and gave our sales engineering team its focus back.",
    author: "Julian Chen",
    role: "VP of Engineering at Veloce AI",
    defaultImage:
      "https://cdn.21st.dev/assets/mirror/b7/b72b0f4f4e2184862eb73dfd44a2f950ce712284c82dc52099d0c0df634e8306.jpg",
    selectedImage:
      "https://cdn.21st.dev/assets/mirror/b7/b72b0f4f4e2184862eb73dfd44a2f950ce712284c82dc52099d0c0df634e8306.jpg",
    alt: "Julian Chen in high-tech corporate office",
  },
  {
    id: "hyperion-health",
    stat: "65 hours saved monthly",
    quote:
      "Patients schedule specialty consultations in seconds, giving our clinicians more high-value care time.",
    author: "Dr. Amara Okafor",
    role: "Chief Medical Officer at Hyperion Health",
    defaultImage:
      "https://cdn.21st.dev/assets/mirror/92/926db583face6f84ed326570a2d38c0e7b1338449f444de0e6d0b920b40e552f.jpg",
    selectedImage:
      "https://cdn.21st.dev/assets/mirror/92/926db583face6f84ed326570a2d38c0e7b1338449f444de0e6d0b920b40e552f.jpg",
    alt: "Dr. Amara Okafor examining care timelines in modern medical center",
  },
  {
    id: "aura-craft",
    stat: "$48,000 saved annually",
    quote:
      "Eliminating email tennis accelerated our bespoke customer intake and noticeably elevated our brand impression.",
    author: "Maya Lindqvist",
    role: "Creative Director & Founder at Aura Craft",
    defaultImage:
      "https://cdn.21st.dev/assets/mirror/56/56efabba2e6ba75d83c0d8a93e27e695630b6ef6df1f0f92542e6f7d88e585a5.jpg",
    selectedImage:
      "https://cdn.21st.dev/assets/mirror/56/56efabba2e6ba75d83c0d8a93e27e695630b6ef6df1f0f92542e6f7d88e585a5.jpg",
    alt: "Maya Lindqvist working with artisan craft prototypes",
  },
  {
    id: "echo-labs",
    stat: "82% reduction in coordination overhead",
    quote:
      "Distributed asynchronous scheduling let our remote founders operate seamlessly across twelve timezones.",
    author: "Siddharth Rao",
    role: "Co-Founder & COO at Echo Labs",
    defaultImage:
      "https://cdn.21st.dev/assets/mirror/bf/bf5e190044b602e47fe1fd6933360d80a1503e25b1f86bb28222d49e797224f3.jpg",
    selectedImage:
      "https://cdn.21st.dev/assets/mirror/bf/bf5e190044b602e47fe1fd6933360d80a1503e25b1f86bb28222d49e797224f3.jpg",
    alt: "Siddharth Rao on a walking consultation outside an open-air tech campus",
  },
];

export default function NewDesignPage() {
  return (
    <>
      <TextReveal02 className="min-h-[100dvh] bg-[var(--new-site-background-color)] text-[var(--new-site-entire-site-text-color)]">
        <NewHero />
      </TextReveal02>
      <TextConvergence
        triggerSelector="#new-site-hero"
        heading="The TooGood way"
        text="Build faster. Animate better. Ship smarter. Hyperiux Vault gives you the tools to create high-performance interfaces that look premium and feel effortless."
        paragraph="Design and development that holds its own — sharper sites, clearer journeys, and work UK brands actually keep."
        bgColor="bg-[#F9F4EA]"
        textColor="text-[#000000]"
      />
      <section
        id="work"
        aria-label="Previous projects"
        className="bg-[var(--new-site-background-color)]"
      >
        <ZoomSlider />
      </section>
      <BentoGrid />
      <StickyContentWrapper />
      <section
        id="testimonials"
        aria-label="Client stories"
        className="bg-[#4B69F0] text-white rounded-[60px] p-10 my-10"
      >
        <h2 className="mb-4 text-center text-6xl font-bold capitalize max-md:mb-6 max-md:text-4xl">
          Client stories
        </h2>
        <p className="mb-8 text-center text-lg font-medium capitalize max-md:mb-6 max-md:text-base">
          We've worked with some amazing companies
        </p>
        <div className="mt-2 mb-8 md:mt-10 mx-auto max-w-[200px]">
          <ArrowFillButton
            href="#contact"
            btnText="Book a demo"
            className="new-site-header-fill-btn px-6 py-5 text-center mx-auto"
            bgColor="white"
            textColor="#000000"
            fillBgColor="black"
            fillTextColor="white"
            hoverFillBgColor="black"
            hoverFillTextColor="white"
            arrowColor="white"
            hoverArrowColor="white"
          />
        </div>
        <CalendlyCarousel
          items={STORIES_DATA}
          autoPlayInterval={6000}
          pauseOnHover={false}
        />
      </section>
      <HowItWorks04Kelo />
      <section id="pricing" className="rounded-[60px]">
        <Pricing />
      </section>
      <FAQ />
      <section id="contact">
        <GlobalCta />
      </section>
      <NormalFooter />
    </>
  );
}
