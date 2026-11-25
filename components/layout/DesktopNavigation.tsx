"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { brand, navigation } from "@/content/site";
import AnimatedIcon from "@/components/ui/AnimatedIcon";


export default function DesktopNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const isActive = (href: string) => href === "/" && pathname === "/";

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-0.5 rounded-full p-1" onMouseLeave={() => setHover(null)}>
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.label} className="relative"
              onMouseEnter={() => { setHover(item.label); if (item.children) setOpen(item.label); }}
              onMouseLeave={() => setOpen(null)}>
              {/* sliding pill that follows the hovered item */}
              {hover === item.label && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ink/[0.06]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              )}
              <div className="relative flex items-center">
                <Link href={item.href} aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-[0.98rem] font-normal transition-colors ${active ? "text-ink" : "text-ink/70 hover:text-ink"} ${item.children ? "pr-1" : ""}`}>
                  {item.label}
                  {active && <motion.span layoutId="nav-active" className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-gold" />}
                </Link>
                {item.children && (
                  <button type="button" aria-label={`${item.label} submenu`} aria-expanded={open === item.label} aria-haspopup="true"
                    onClick={() => setOpen(open === item.label ? null : item.label)}
                    className="grid h-8 w-7 place-items-center text-ink/60">
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open === item.label ? "rotate-180 text-gold-deep" : ""}`} />
                  </button>
                )}
              </div>

              {/* centring lives on this static wrapper so the motion transform can't override it */}
              <div className="absolute left-1/2 top-full z-50 w-[440px] -translate-x-1/2">
              <AnimatePresence>
                {item.children && open === item.label && (
                  <motion.div initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} style={{ originY: 0 }}
                    className="relative w-full pt-4">
                    {/* caret */}
                    <span aria-hidden className="absolute left-1/2 top-[11px] h-3 w-3 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-ink/5 bg-ivory-50" />
                    <div className="overflow-hidden rounded-[28px] border border-ink/5 bg-ivory-50 shadow-soft">
                      <ul className="grid grid-cols-2 gap-1.5 p-2.5">
                        {item.children.map((c, i) => (
                          <motion.li key={c.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + 0.04 * i }}>
                            <Link href={c.href} onClick={() => setOpen(null)}
                              className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-white hover:shadow-card">
                              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-ivory transition-transform duration-500 group-hover:-rotate-6">
                                <AnimatedIcon name={c.icon} className="h-5 w-5" delay={0.05 * i} accentColor="#E2CFA8" />
                              </span>
                              <span className="flex-1 text-[0.95rem] font-semibold text-ink">{c.label}</span>
                              <ArrowUpRight className="h-4 w-4 -translate-x-1 text-gold-deep opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                      {/* footer strip */}
                      <div className="flex items-center justify-between gap-3 bg-ink px-5 py-3.5 text-ivory">
                        <span className="font-display text-sm italic text-gold-light">{brand.tagline}</span>
                        <span aria-hidden className="h-px w-16 bg-gradient-to-r from-sea to-gold" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
