"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { brand, fleet, quote } from "@/content/site";
import QuoteForm from "@/components/ui/QuoteForm";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import Reveal, { ease } from "@/components/ui/Reveal";
import { PearlMark } from "@/components/ui/Logo";

/** The "Get a Quote" journey: a live step tracker and promises on navy, the 3-step form on a seafoam card. */
export default function QuoteSection() {
  const [step, setStep] = useState(0); // 0–2 form steps, 3 = sent

  return (
    <section id="quote" aria-labelledby="quote-title" className="relative scroll-mt-20 overflow-hidden bg-ink py-24 text-ivory-50 sm:py-32">
      {/* brand waves + soft glows */}
      <svg aria-hidden viewBox="0 0 1440 400" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] w-full opacity-[0.12]">
        <path d="M0 160 C 320 80, 640 240, 960 150 S 1300 90, 1440 130 V400 H0Z" fill="#A8D5C5" />
        <path d="M0 200 C 330 120, 650 280, 970 190 S 1310 130, 1440 170" fill="none" stroke="#C4A574" strokeWidth="3" />
      </svg>
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-sea/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl" />

      <div className="container relative grid max-w-[1400px] items-start gap-14 lg:grid-cols-12 lg:gap-16">
        {/* left: story, live tracker, promises */}
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <Reveal><p className="eyebrow eyebrow-light">{quote.eyebrow}</p></Reveal>
          <Reveal delay={0.05}><SectionTitle id="quote-title" title={quote.title} className="mt-5 text-ivory-50 [&_.gold-word]:text-gold-light" /></Reveal>
          <Reveal delay={0.1}><p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ivory-50/70">{quote.intro}</p></Reveal>

          {/* live step tracker — follows the form */}
          <ol className="relative mt-10 space-y-0">
            {quote.wizard.map((w, i) => {
              const done = step > i, current = step === i;
              return (
                <li key={w.label} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < quote.wizard.length - 1 && (
                    <span aria-hidden className="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-px overflow-hidden bg-ivory-50/15">
                      <motion.span className="absolute inset-x-0 top-0 bg-gold" initial={false} animate={{ height: done ? "100%" : "0%" }} transition={{ duration: 0.6 }} />
                    </span>
                  )}
                  <motion.span animate={{ scale: current ? 1.08 : 1 }} transition={{ type: "spring", stiffness: 380, damping: 18 }}
                    className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full font-display transition-colors duration-500 ${done ? "bg-gold text-ink" : current ? "bg-sea text-ink" : "bg-ivory-50/10 text-ivory-50/60"}`}>
                    {current && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-sea/40 [animation-duration:2.2s] motion-reduce:hidden" />}
                    <span className="relative">{done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}</span>
                  </motion.span>
                  <span className="pt-1.5">
                    <span className={`block font-display text-lg transition-colors ${current || done ? "text-ivory-50" : "text-ivory-50/50"}`}>{w.label}</span>
                    <span className="block text-sm text-ivory-50/50">{w.hint}</span>
                  </span>
                </li>
              );
            })}
          </ol>

          {/* promises */}
          <ul className="mt-10 grid gap-3">
            {quote.promises.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.1 + i * 0.08}
                className="group flex items-center gap-4 rounded-[12px] border border-ivory-50/10 bg-ivory-50/[0.04] px-4 py-3.5 transition-colors hover:border-sea/50 hover:bg-ivory-50/[0.07]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sea/15 text-ivory-50 ring-1 ring-sea/40">
                  <AnimatedIcon name={p.icon} className="h-5 w-5" accentColor="#A8D5C5" delay={i * 0.1} />
                </span>
                <span>
                  <span className="block font-medium">{p.title}</span>
                  <span className="block text-sm text-ivory-50/55">{p.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* right: the form card */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1, ease }}
          className="relative lg:col-span-7">
          {/* van peeking out from behind the card */}
          <div aria-hidden className="absolute -right-6 -top-16 hidden h-40 w-40 overflow-hidden rounded-full border-4 border-ink shadow-soft xl:block">
            <Image src={fleet.strip[0].src} alt="" fill placeholder="blur" sizes="160px" className="object-cover" />
          </div>
          <div className="relative overflow-hidden rounded-[18px] bg-sea-light p-6 text-ink shadow-soft ring-1 ring-ivory-50/20 sm:p-10">
            <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 opacity-[0.12]"><PearlMark className="h-48 w-56" /></span>
            {/* wave accent along the top of the card */}
            <svg aria-hidden viewBox="0 0 600 24" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-3 w-full">
              <path d="M0 0H600V10C470 22 330 2 200 12S40 18 0 8Z" fill="#0F2340" fillOpacity=".08" />
              <path d="M0 8C40 18 70 22 200 12S470 22 600 10" fill="none" stroke="#C4A574" strokeWidth="1.5" />
            </svg>
            <div className="relative">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sea-deep">{brand.tagline}</p>
              <h3 className="mt-2 font-display text-[2rem] leading-tight sm:text-[2.4rem]">Plan your move</h3>
              <p className="mb-8 mt-2 max-w-md text-ink/60">Takes about two minutes — no obligation.</p>
              <QuoteForm idPrefix="quote" onStepChange={setStep} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
