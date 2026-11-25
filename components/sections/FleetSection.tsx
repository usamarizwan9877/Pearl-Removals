"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fleet } from "@/content/site";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

/** "On the road" — the branded vans and stationery, so the site matches what customers see on the street. */
export default function FleetSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bigY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const up = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const [main, rear, cards] = fleet.images;

  return (
    <section ref={ref} aria-labelledby="fleet-title" className="relative overflow-hidden bg-ivory-50 py-24 sm:py-32">
      <div className="container max-w-[1400px]">
        <SectionHeader id="fleet-title" eyebrow={fleet.eyebrow} title={fleet.title} intro={fleet.intro} align="center" />

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          <Reveal className="group relative overflow-hidden rounded-[14px] shadow-soft lg:col-span-8">
            <div className="relative aspect-[16/11] overflow-hidden">
              <motion.div style={{ y: bigY }} className="absolute -inset-y-[7%] inset-x-0">
                <Image src={main.src} alt={main.alt} fill placeholder="blur" sizes="(min-width:1024px) 62vw, 100vw" className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105" />
              </motion.div>
            </div>
            <span className="absolute bottom-5 left-5 rounded-[8px] bg-ivory-50/90 px-4 py-2.5 font-display text-lg text-ink backdrop-blur">{main.caption}</span>
          </Reveal>
          <motion.div style={{ y: up }} className="grid gap-5 lg:col-span-4">
            {[rear, cards].map((img, i) => (
              <Reveal key={img.caption} delay={0.1 + i * 0.1} className="group relative overflow-hidden rounded-[14px] shadow-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill placeholder="blur" sizes="(min-width:1024px) 30vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                </div>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-5 pb-4 pt-12 font-display text-lg italic text-ivory-50">{img.caption}</span>
              </Reveal>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
