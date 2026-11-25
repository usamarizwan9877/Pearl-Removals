"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { about } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import { PearlMark } from "@/components/ui/Logo";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const ring = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} id="about" aria-labelledby="about-title" className="relative scroll-mt-20 overflow-hidden bg-ivory-50 py-24 sm:py-32">
      <div className="container grid max-w-[1400px] items-center gap-16 lg:grid-cols-12">
        <div className="relative order-2 lg:order-1 lg:col-span-6">
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-[16px] border border-gold/50" />
          <div className="relative aspect-[3/2] overflow-hidden rounded-[16px] shadow-soft">
            <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
              <Image src={about.img.src} alt={about.img.alt} fill placeholder="blur" sizes="(min-width:1024px) 48vw, 92vw" className="object-cover" />
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }}
            className="group absolute -left-3 -top-6 flex items-center gap-3 rounded-[10px] bg-ivory-50/95 px-4 py-3 shadow-soft backdrop-blur sm:-left-8">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-sea-light text-ink"><AnimatedIcon name="shield" className="h-6 w-6" accentColor="#5E9C88" /></span>
            <span><span className="block text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink/50">{about.badge.title}</span><span className="block text-sm font-medium">{about.badge.text}</span></span>
          </motion.div>

          {/* rotating seal */}
          <motion.svg style={{ rotate: ring }} viewBox="0 0 200 200" aria-hidden className="absolute -bottom-12 -right-4 h-36 w-36 sm:h-44 sm:w-44">
            <defs><path id="pearl-seal" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" /></defs>
            <circle cx="100" cy="100" r="96" fill="#0F2340" />
            <circle cx="100" cy="100" r="90" fill="none" stroke="#C4A574" strokeOpacity=".6" />
            <text fill="#E2CFA8" fontSize="12.5" fontFamily="var(--font-logo)"><textPath href="#pearl-seal" textLength="452" lengthAdjust="spacing">PEARL REMOVALS · MOVE WELL · ARRIVE HAPPY ·</textPath></text>
          </motion.svg>
          <span aria-hidden className="pointer-events-none absolute -bottom-12 -right-4 grid h-36 w-36 place-items-center sm:h-44 sm:w-44">
            <PearlMark className="h-12 w-14 sm:h-14 sm:w-16" />
          </span>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6 lg:pl-6">
          <Reveal><p className="eyebrow">{about.eyebrow}</p></Reveal>
          <Reveal delay={0.05}><SectionTitle id="about-title" title={about.title} className="mt-5 text-ink" /></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-[1.08rem] leading-[1.85] text-ink/70 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-gold-deep">
              {about.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}><Link href={about.cta.href} className="btn-ink mt-10">{about.cta.label} <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
      </div>
    </section>
  );
}
