import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Services } from "@/components/portfolio/Services";
import { Marquee } from "@/components/portfolio/Marquee";
import { WhyHireMe } from "@/components/portfolio/WhyHireMe";
import { TechStack } from "@/components/portfolio/TechStack";
import { WebsiteShowcase } from "@/components/portfolio/WebsiteShowcase";
import { VideoShowreel } from "@/components/portfolio/VideoShowreel";
import { TechnicalWork } from "@/components/portfolio/TechnicalWork";
import { Gallery } from "@/components/portfolio/Gallery";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Certificates } from "@/components/portfolio/Certificates";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Marquee />
        <WhyHireMe />
        <TechStack />
        <WebsiteShowcase />
        <VideoShowreel />
        <TechnicalWork />
        <Gallery />
        <Testimonials />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" richColors />
    </div>
  );
}
