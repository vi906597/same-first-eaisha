import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SipCalculator from "@/components/SipCalculator";
import TopFundsSection from "@/components/TopFundsSection";
import HowItWorks from "@/components/HowItWorks";
import FooterSection from "@/components/FooterSection";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Zypeus — Smart SIP & Mutual Fund Investment Platform" },
      { name: "description", content: "Start your mutual fund SIP with Zypeus. Smart investing, top performing funds, and real-time portfolio tracking — all in one place." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <SipCalculator />
      <TopFundsSection />
      <HowItWorks />
      <FooterSection />
    </div>
  );
}
