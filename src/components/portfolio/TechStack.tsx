import {
  SiSpring,
  SiReact,
  SiNodedotjs,
  SiMysql,
  SiMongodb,
  SiFigma,
  
} from "react-icons/si";
import { FaJava, FaAws, FaCloud, FaPalette, FaVideo } from "react-icons/fa";
import LogoLoop from "@/components/reactbits/LogoLoop";
import { SectionHeading } from "./SectionHeading";

const iconClass = "text-white/80 hover:text-ember transition-colors";

const techLogos = [
  { node: <FaJava className={iconClass} />, title: "Java", href: "https://www.java.com" },
  { node: <SiSpring className={iconClass} />, title: "Spring Boot", href: "https://spring.io/projects/spring-boot" },
  { node: <SiReact className={iconClass} />, title: "React.js", href: "https://react.dev" },
  { node: <SiNodedotjs className={iconClass} />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiMysql className={iconClass} />, title: "MySQL", href: "https://www.mysql.com" },
  { node: <SiMongodb className={iconClass} />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <FaAws className={iconClass} />, title: "AWS", href: "https://aws.amazon.com" },
  { node: <FaCloud className={iconClass} />, title: "IBM Cloud", href: "https://www.ibm.com/cloud" },
  { node: <SiFigma className={iconClass} />, title: "Figma", href: "https://www.figma.com" },
  { node: <FaPalette className={iconClass} />, title: "Canva", href: "https://www.canva.com" },
  { node: <FaVideo className={iconClass} />, title: "Adobe Premiere Pro", href: "https://www.adobe.com/products/premiere.html" },
  { node: <FaVideo className={iconClass} />, title: "CapCut", href: "https://www.capcut.com" },
];

export function TechStack() {
  return (
    <section id="tech" className="relative border-t border-white/5 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading number="02.5" eyebrow="Toolbox" title="Tech I ship with." />
        <p className="mt-6 max-w-md text-lg text-muted-foreground">
          A stack chosen for speed, reliability, and taste — from backend to pixels.
        </p>
      </div>
      <div className="mt-14" style={{ height: 120 }}>
        <LogoLoop
          logos={techLogos}
          speed={90}
          direction="left"
          logoHeight={52}
          gap={72}
          fadeOut
          fadeOutColor="hsl(var(--background))"
          scaleOnHover
          pauseOnHover
          ariaLabel="Technologies I use"
        />
      </div>
      <div className="mt-6" style={{ height: 120 }}>
        <LogoLoop
          logos={[...techLogos].reverse()}
          speed={70}
          direction="right"
          logoHeight={52}
          gap={72}
          fadeOut
          fadeOutColor="hsl(var(--background))"
          scaleOnHover
          pauseOnHover
          ariaLabel="Technologies I use (reverse)"
        />
      </div>
    </section>
  );
}

export default TechStack;
