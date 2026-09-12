import Footer from "@/components/footer";
import Hero from "@/components/hero";
import FeaturesSection from "@/components/features-section";
import HowItWorks from "@/components/how-it-works";
import About from "@/components/about";
import OurHistory from "@/components/our-history";
import OurServices from "@/components/our-services";
import Industries from "@/components/industries";
import Services from "@/components/services";
import Testimonial from "@/components/testimonial";
import Pricing from "@/components/pricing";
import FAQ from "@/components/faq";
import GlobalCta from "@/components/global-cta";
import NormalFooter from "@/components/normal-footer";

export default function Home() {
  return (
    <>
      <Hero>
        <About />
        <OurServices />
        <Industries />
        <Services />
        <FeaturesSection />
        <HowItWorks />
        <Pricing />
        <OurHistory />
        <Testimonial />
        <FAQ />
        <GlobalCta />
        <NormalFooter />
      </Hero>
      <Footer />
    </>
  );
}
