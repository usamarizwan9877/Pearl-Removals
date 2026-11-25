"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { finalCta } from "@/content/site";
import RouteJourney from "@/components/ui/RouteJourney";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import { PearlMark } from "@/components/ui/Logo";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} id="cta" aria-labelledby="cta-title" className="relative overflow-hidden bg-ink py-24 text-ivory-50 sm:py-32">
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <Image src={finalCta.img.src} alt="" fill sizes="100vw" className="object-cover opacity-35" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/50" />
      <div className="container relative max-w-[1400px] text-center">
        <Reveal className="flex justify-center"><PearlMark className="footer-crown h-16 w-20" /></Reveal>
        <Reveal delay={0.05}><SectionTitle id="cta-title" title={finalCta.title} className="mt-6 !text-[clamp(2.8rem,7vw,5.6rem)] text-ivory-50 [&_.gold-word]:text-gold-light" /></Reveal>
        <Reveal delay={0.1}><p className="mx-auto mt-7 max-w-xl text-[1.08rem] leading-relaxed text-ivory-50/70">{finalCta.body}</p></Reveal>
        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Link href={finalCta.cta.href} className="btn-sea btn-shine">{finalCta.cta.label} <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </div>
      <div className="container relative mt-20 max-w-[1400px]"><RouteJourney tone="ivory" className="h-auto w-full opacity-80" /></div>
    </section>
  );
}
