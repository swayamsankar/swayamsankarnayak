import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import FallingText from "@/components/reactbits/FallingText";

const socials = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/swayam-sankar-nayak-86b048292/",
    label: "LinkedIn",
  },
  { icon: Github, href: "https://github.com/swayamsankar", label: "GitHub" },
  {
    icon: Instagram,
    href: "https://www.instagram.com/swayam_sankar",
    label: "Instagram",
  },
  { icon: Twitter, href: "https://x.com/SwayamSankar3", label: "X" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 pt-20 pb-6">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold">
              SWAYAM<span className="text-ember">®</span>
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Visual storytelling is my language. Digital design is my craft.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Navigate
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#services" className="story-link">Services</a></li>
              <li><a href="#work" className="story-link">Work</a></li>
              <li><a href="#gallery" className="story-link">Gallery</a></li>
              <li><a href="#contact" className="story-link">Contact</a></li>
              <li>
                <a
                  href="https://swayamportfoliosite.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="story-link text-ember"
                >
                  Tech Portfolio ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Social
            </p>
            <ul className="mt-4 flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.02] transition-colors hover:border-ember hover:bg-ember hover:text-ember-foreground"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 h-[280px] sm:h-[360px]">
          <FallingText
            text="Visual storytelling is my language Digital design is my craft"
            highlightWords={["storytelling", "language", "design", "craft"]}
            trigger="scroll"
            gravity={0.6}
            fontSize="clamp(1.25rem, 3vw, 2.25rem)"
            mouseConstraintStiffness={0.9}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Swayam Studio. All rights reserved.</p>
          <p className="font-mono tracking-widest">FUTURE / CREATIVE / DIGITAL</p>
        </div>
      </div>
    </footer>
  );
}
