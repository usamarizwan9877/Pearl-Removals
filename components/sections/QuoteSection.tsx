"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { brand, fleet, quote } from "@/content/site";
import QuoteForm from "@/components/ui/QuoteForm";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal, { ease } from "@/components/ui/Reveal";
import { PearlMark } from "@/components/ui/Logo";

/** The prominent "Get a Quote" journey: three steps on navy, the form on a seafoam card. */
export default function QuoteSection() {
  return (
    <section id="quote" aria-labelledby="quote-title" className="relative scroll-mt-20 overflow-hidden bg-ink py-24 text-ivory-50 sm:py-32">
      {/* soft brand waves in the background */}
      <svg aria-hidden viewBox="0 0 1440 400" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] w-full opacity-[0.12]">
        <path d="M0 160 C 320 80, 640 240, 960 150 S 1300 90, 1440 130 V400 H0Z" fill="#A8D5C5" />
        <path d="M0 200 C 330 120, 650 280, 970 190 S 1310 130, 1440 170" fill="none" stroke="#C4A574" strokeWidth="3" />
      </svg>

      <div className="container relative grid max-w-[1400px] items-start gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:pt-4">
          <Reveal><p className="eyebrow eyebrow-light">{quote.eyebrow}</p></Reveal>
          <Reveal delay={0.05}><SectionTitle id="quote-title" title={quote.title} className="mt-5 text-ivory-50 [&_.gold-word]:text-gold-light" /></Reveal>
          <Reveal delay={0.1}><p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ivory-50/70">{quote.intro}</p></Reveal>

          {/* 1 · 2 · 3 journey */}
          <ol className="relative mt-12 grid grid-cols-3">
            <span aria-hidden className="absolute left-[16.6%] right-[16.6%] top-5 h-px bg-ivory-50/15" />
            <motion.span aria-hidden className="absolute left-[16.6%] right-[16.6%] top-5 h-px origin-left bg-gold"
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }} />
            {quote.steps.map((s, i) => (
              <li key={s} className="relative flex flex-col items-center text-center">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.5, type: "spring", stiffness: 380, damping: 16 }}
                  className="relative grid h-10 w-10 place-items-center rounded-full bg-sea font-display text-ink ring-4 ring-ink">
                  {i + 1}
                </motion.span>
                <span className="mt-3 text-sm text-ivory-50/80">{s}</span>
              </li>
            ))}
          </ol>

          <Reveal delay={0.2} className="mt-12 hidden overflow-hidden rounded-[12px] shadow-soft lg:block">
            <div className="relative aspect-square max-w-[340px]">
              <Image src={fleet.images[1].src} alt={fleet.images[1].alt} fill placeholder="blur" sizes="340px" className="object-cover" />
            </div>
          </Reveal>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1, ease }}
          className="relative lg:col-span-7">
          <div className="relative overflow-hidden rounded-[16px] bg-sea-light p-7 text-ink shadow-soft sm:p-10">
            <span aria-hidden className="absolute -right-10 -top-10 opacity-20"><PearlMark className="h-40 w-48" /></span>
            <h3 className="relative font-display text-[2rem] leading-tight sm:text-[2.4rem]">{quote.eyebrow}</h3>
            <p className="relative mb-8 mt-2 max-w-md text-ink/65">{quote.intro}</p>
            <div className="relative"><QuoteForm idPrefix="quote" /></div>
          </div>
          <p className="mt-5 text-center font-display text-lg italic text-gold-light">{brand.tagline}</p>
        </motion.div>
      </div>
    </section>
  );
}
