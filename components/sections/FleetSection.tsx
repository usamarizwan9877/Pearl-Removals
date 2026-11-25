"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { brand, fleet, headerCta } from "@/content/site";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import Reveal, { ease } from "@/components/ui/Reveal";
import { PearlMark } from "@/components/ui/Logo";

const ROTATE_MS = 6500;

/**
 * "On the road" showcase: pick Luton vans / compact vans / our kit and the big
 * image cross-fades with its details. Rotates on its own while in view (pauses
 * on hover/focus), then a slow scrolling strip of brand moments underneath.
 */
export default function FleetSection() {
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(stage, { margin: "-20% 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts the progress bar
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const tab = fleet.tabs[active];

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const t = setTimeout(() => { setActive((a) => (a + 1) % fleet.tabs.length); setCycle((c) => c + 1); }, ROTATE_MS);
    return () => clearTimeout(t);
  }, [active, inView, paused, reduce, cycle]);

  const pick = (i: number) => { setActive(i); setCycle((c) => c + 1); };

  return (
    <section ref={ref} aria-labelledby="fleet-title" className="relative overflow-hidden bg-ivory-50 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-sea/15 blur-3xl" />
      <div className="container relative max-w-[1400px]">
        <SectionHeader id="fleet-title" eyebrow={fleet.eyebrow} title={fleet.title} intro={fleet.intro} align="center" />

        <div ref={stage} className="mt-16 grid items-stretch gap-6 lg:grid-cols-12"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>

          {/* selector */}
          <div className="contents lg:flex lg:flex-col lg:gap-3 lg:col-span-4">
            <div className="order-1 flex flex-col gap-3 lg:order-none" role="tablist" aria-label="Our fleet and kit">
            {fleet.tabs.map((t, i) => {
              const on = i === active;
              return (
                <button key={t.key} type="button" role="tab" id={`fleet-tab-${t.key}`} aria-selected={on} aria-controls="fleet-panel" onClick={() => pick(i)}
                  className={`group relative overflow-hidden rounded-[14px] border p-5 text-left transition-all duration-500 ${on ? "border-ink bg-ink text-ivory-50 shadow-soft" : "border-ink/10 bg-white hover:-translate-y-0.5 hover:border-sea-deep hover:shadow-card"}`}>
                  <span className="flex items-center gap-4">
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition-colors duration-500 ${on ? "bg-sea/20 ring-1 ring-sea/50" : "bg-sea-light"}`}>
                      <AnimatedIcon name={t.icon} className="h-6 w-6" accentColor={on ? "#A8D5C5" : "#5E9C88"} delay={i * 0.1} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-[1.35rem] leading-tight">{t.label}</span>
                      <span className={`block text-sm ${on ? "text-ivory-50/60" : "text-ink/55"}`}>{t.short}</span>
                    </span>
                    <ArrowRight className={`h-4 w-4 shrink-0 transition-all duration-500 ${on ? "translate-x-0 text-sea opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"}`} />
                  </span>
                  {/* auto-rotate progress */}
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-ivory-50/10">
                    {on && !reduce && (
                      <motion.span key={`${cycle}-${paused}`} className="absolute inset-y-0 left-0 bg-gradient-to-r from-sea to-gold"
                        initial={{ width: "0%" }} animate={{ width: paused || !inView ? "0%" : "100%" }} transition={{ duration: paused || !inView ? 0 : ROTATE_MS / 1000, ease: "linear" }} />
                    )}
                  </span>
                </button>
              );
            })}

            </div>

            {/* details of the active tab */}
            <div className="relative order-3 mt-1 flex-1 lg:order-none rounded-[14px] border border-ink/10 bg-ivory-200/40 p-6">
              <AnimatePresence mode="wait">
                <motion.div key={tab.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease }}>
                  <p className="text-[0.98rem] leading-relaxed text-ink/70">{tab.text}</p>
                  <ul className="mt-5 space-y-2.5">
                    {tab.points.map((p, k) => (
                      <motion.li key={p} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + k * 0.08 }}
                        className="flex items-center gap-3 text-[0.95rem] text-ink">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-sea text-ink"><Check className="h-3 w-3" strokeWidth={3} /></span>
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
              <Link href={headerCta.href} className="btn-sea btn-shine mt-6 w-full">{headerCta.label} <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>

          {/* stage */}
          <div id="fleet-panel" role="tabpanel" aria-labelledby={`fleet-tab-${tab.key}`} className="relative order-2 min-h-[340px] overflow-hidden rounded-[18px] bg-ink shadow-soft sm:min-h-[460px] lg:order-none lg:col-span-8">
            <AnimatePresence initial={false}>
              <motion.div key={tab.key} className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease }}>
                <motion.div style={{ y: imgY }} className="absolute -inset-y-[6%] inset-x-0">
                  <Image src={tab.img.src} alt={tab.img.alt} fill placeholder="blur" sizes="(min-width:1024px) 62vw, 100vw" className="object-cover" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
            <div aria-hidden className="hero-sheen absolute inset-0" />

            {/* floating detail chips */}
            <AnimatePresence mode="wait">
              <motion.ul key={tab.key} className="absolute right-4 top-4 hidden flex-col items-end gap-2 sm:flex">
                {tab.points.map((p, k) => (
                  <motion.li key={p} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ delay: 0.5 + k * 0.12, duration: 0.5, ease }}
                    className="flex items-center gap-2 rounded-full bg-ivory-50/90 px-4 py-2 text-[0.82rem] font-medium text-ink shadow-card backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-sea-deep" />{p}
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>

            {/* caption */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div key={tab.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease }}>
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-sea">{String(active + 1).padStart(2, "0")} / {String(fleet.tabs.length).padStart(2, "0")}</p>
                  <p className="mt-1 font-display text-[1.9rem] leading-tight text-ivory-50 sm:text-[2.4rem]">{tab.label}</p>
                </motion.div>
              </AnimatePresence>
              <span className="hidden items-center gap-3 rounded-[10px] bg-ivory-50/85 px-4 py-2.5 text-ink backdrop-blur sm:flex">
                <PearlMark className="h-7 w-9" /><span className="font-display text-sm italic">{brand.tagline}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* slow scrolling brand strip */}
      <Reveal delay={0.1} className="relative mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
          {[...fleet.strip, ...fleet.strip].map((img, i) => (
            <li key={i} aria-hidden={i >= fleet.strip.length} className="group relative h-56 w-[320px] shrink-0 overflow-hidden rounded-[14px] shadow-card sm:h-64 sm:w-[380px]">
              <Image src={img.src} alt={i >= fleet.strip.length ? "" : img.alt} fill placeholder="blur" sizes="380px" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-5 pb-4 pt-12 font-display text-lg italic text-ivory-50">{img.caption}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
