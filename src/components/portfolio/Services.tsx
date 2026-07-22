import { SectionHeading } from "./SectionHeading";
import FlowingMenu from "@/components/reactbits/FlowingMenu";

import uiux from "@/assets/svc-uiux.jpg";
import motion from "@/assets/svc-motion.jpg";


const items = [
  { link: "#contact", text: "Branding", image: "/assets/svc-branding-aurora.png" },
  { link: "#contact", text: "Web Design", image: "/assets/svc-web-studio.png" },
  { link: "#contact", text: "Development", image: "/assets/svc-development.png" },
  { link: "#contact", text: "UI / UX", image: uiux },
  { link: "#contact", text: "Motion", image: motion },
];

export function Services() {
  return (
    <section id="services" className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading number="01" eyebrow="What we do" title="Services" />
      </div>
      <div className="mt-16 h-[70vh] min-h-[520px] w-full border-y border-white/10">
        <FlowingMenu items={items} />
      </div>
    </section>
  );
}
