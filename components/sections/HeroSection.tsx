"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { brand, hero } from "@/content/site";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import { PearlMark } from "@/components/ui/Logo";
import { ease } from "@/components/ui/Reveal";

const fade = { hidden: { opacity: 0, y: 16 }, show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.7 + i * 0.12, ease } }) };

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <>
      <section ref={ref} id="home" aria-labelledby="hero-title" className="relative overflow-hidden bg-ink pt-[84px] text-ivory-50">
        <div className="relative lg:min-h-[640px] xl:min-h-[700px]">
          {/* photo — right side on desktop, below the copy on mobile */}
          <div className="relative h-[340px] sm:h-[420px] lg:absolute lg:inset-y-0 lg:left-[40%] lg:right-0 lg:h-auto">
            <motion.div initial={{ scale: 1.12, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2.2, ease }}
              style={{ y: imgY }} className="absolute inset-0">
              <Image src={hero.image.src} alt={hero.image.alt} fill priority placeholder="blur" sizes="(min-width:1024px) 60vw, 100vw" className="object-cover object-[60%_50%]" />
            </motion.div>
            {/* navy blend into the photo, like the brand mockup */}
            <div className="absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/55 to-transparent lg:block lg:w-[45%]" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent lg:hidden" />
            <div aria-hidden className="hero-sheen absolute inset-0" />

            {/* floating tagline card */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.9, ease }}
              className="absolute bottom-6 right-6 hidden sm:block lg:bottom-10 lg:right-10">
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-3 rounded-[10px] border border-ivory-50/40 bg-ivory-50/85 px-5 py-3.5 text-ink shadow-soft backdrop-blur-md">
                <PearlMark className="h-8 w-10" />
                <span className="font-display text-[1.05rem] italic">{brand.tagline}</span>
              </motion.div>
            </motion.div>
          </div>

          {/* copy */}
          <div className="container relative max-w-[1400px] lg:absolute lg:inset-0">
            <div className="relative z-10 py-14 sm:py-16 lg:flex lg:h-full lg:max-w-[46%] lg:flex-col lg:justify-center lg:py-20">
              <motion.p initial="hidden" animate="show" custom={0} variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.2, duration: 0.8 } } }}
                className="eyebrow eyebrow-light">{hero.eyebrow}</motion.p>
              <h1 id="hero-title" className="mt-6 font-display text-[clamp(2.7rem,6.2vw,5.2rem)] font-normal leading-[1.06] tracking-[-0.01em]">
                {hero.lines.map((l, i) => (
                  <span key={l} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                    <motion.span className="block" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, delay: 0.25 + i * 0.13, ease }}>{l}</motion.span>
                  </span>
                ))}
              </h1>
              <motion.span aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.9, ease }}
                className="mt-8 block h-[2px] w-28 origin-left bg-gold" />
              <motion.p initial="hidden" animate="show" custom={0} variants={fade} className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-ivory-50/75">
                {hero.body}
              </motion.p>
              <motion.div initial="hidden" animate="show" custom={1} variants={fade} className="mt-10 flex flex-wrap gap-3">
                <Link href={hero.cta.href} className="btn-sea btn-shine group">
                  {hero.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={hero.secondary.href} className="btn-ghost-light">{hero.secondary.label}</Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* brand wave along the bottom edge (seafoam band + gold line) */}
        <svg aria-hidden viewBox="0 0 1440 70" preserveAspectRatio="none" className="relative -mb-px block h-[46px] w-full sm:h-[60px]">
          <path d="M0 40 C 320 10, 640 70, 960 38 S 1300 14, 1440 30 V70 H0Z" fill="#D4EBE2" />
          <path d="M0 52 C 330 24, 650 78, 970 50 S 1310 28, 1440 42 V70 H0Z" fill="#FAF8F4" />
          <motion.path d="M0 47 C 330 19, 650 73, 970 45 S 1310 23, 1440 37" fill="none" stroke="#C4A574" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 1.6, ease: "easeInOut" }} />
        </svg>
      </section>

      {/* service strip (Home · Business · Packing) */}
      <section aria-label="Our core services" className="relative bg-ivory-50 pb-6 pt-8 sm:pt-10">
        <ul className="container grid max-w-[1400px] gap-4 md:grid-cols-3">
          {hero.strip.map((s, i) => (
            <motion.li key={s.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8, ease }}>
              <Link href={s.href} className="group flex items-center gap-5 rounded-[10px] border border-ink/5 bg-ivory-200/50 px-6 py-6 transition-all duration-500 hover:-translate-y-1 hover:border-sea hover:bg-white hover:shadow-card">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-sea-light text-ink transition-colors duration-500 group-hover:bg-sea">
                  <AnimatedIcon name={s.icon} className="h-7 w-7" delay={0.2 + i * 0.1} accentColor="#5E9C88" />
                </span>
                <span aria-hidden className="h-10 w-px bg-ink/15" />
                <span className="flex-1 font-display text-[1.45rem] text-ink">{s.title}</span>
                <ArrowRight className="h-5 w-5 text-ink/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-sea-deep" />
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>
    </>
  );
}
