import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import ProcessSection from "@/components/sections/ProcessSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import IncludedSection from "@/components/sections/IncludedSection";
import FleetSection from "@/components/sections/FleetSection";
import AreasSection from "@/components/sections/AreasSection";
import QuoteSection from "@/components/sections/QuoteSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <ProcessSection />
        <WhyChooseUsSection />
        <AboutSection />
        <IncludedSection />
        <FleetSection />
        <AreasSection />
        <QuoteSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
