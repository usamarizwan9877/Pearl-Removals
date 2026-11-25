"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { headerCta } from "@/content/site";
import Logo from "@/components/ui/Logo";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    setHidden(y > 600 && y > prev && !mobileOpen);
  });
  useEffect(() => setSolid(window.scrollY > 24), []);

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${solid ? "border-ink/10 bg-ivory-50/90 shadow-card backdrop-blur-xl" : "border-ink/5 bg-ivory-50"}`}
    >
      <div className={`container flex max-w-[1400px] items-center justify-between gap-6 transition-all duration-500 ${solid ? "h-[72px]" : "h-[84px]"}`}>
        <Link href="/" aria-label="Pearl Removals — Home" className="group flex shrink-0 items-center transition-transform duration-500 hover:scale-[1.02]">
          <Logo compact={solid} />
        </Link>
        <span aria-hidden className="hidden h-10 w-px bg-ink/10 xl:block" />
        <DesktopNavigation />
        <div className="flex items-center gap-2">
          <Link href={headerCta.href} className="btn-sage btn-shine group hidden !min-h-[48px] !px-6 sm:inline-flex">
            <span className="relative z-10">{headerCta.label}</span>
            <ArrowRight className="relative z-10 h-4 w-4" />
          </Link>
          <MobileNavigation open={mobileOpen} setOpen={setMobileOpen} />
        </div>
      </div>
      {/* reading progress */}
      <motion.span aria-hidden style={{ scaleX: progress, opacity: solid ? 1 : 0 }}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-sea via-gold to-gold-deep transition-opacity" />
    </motion.header>
  );
}
