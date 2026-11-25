"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { brand, headerCta, navigation } from "@/content/site";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import Logo from "@/components/ui/Logo";


export default function MobileNavigation({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [sub, setSub] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, setOpen]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu"
        className="grid h-11 w-11 place-items-center rounded-[6px] bg-ink text-ivory">
        <span className="flex w-4 flex-col gap-[5px]"><span className="h-px w-full bg-current" /><span className="h-px w-2/3 self-end bg-current" /></span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }} animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink px-6 pb-8 pt-6 text-ivory">
            <div className="flex items-center justify-between">
              <Logo tone="light" compact />
              <button type="button" onClick={close} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20"><X className="h-5 w-5" /></button>
            </div>
            <nav aria-label="Mobile" className="mt-10 flex-1">
              <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
                {navigation.map((item, i) => (
                  <motion.li key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                    <div className="flex items-center justify-between">
                      <Link href={item.href} onClick={close} className="group flex items-baseline gap-4 py-4 font-display text-[2rem] font-light transition-colors hover:text-gold-light">
                        <span className="font-display text-sm italic text-gold">{String(i + 1).padStart(2, "0")}</span>{item.label}
                      </Link>
                      {item.children && (
                        <button type="button" aria-expanded={sub === item.label} aria-label={`${item.label} submenu`}
                          onClick={() => setSub(sub === item.label ? null : item.label)} className="grid h-12 w-12 place-items-center rounded-full border border-ivory/15">
                          <ChevronDown className={`h-5 w-5 transition-transform ${sub === item.label ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {item.children && sub === item.label && (
                        <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          {item.children.map((c) => (
                            <li key={c.label}><Link href={c.href} onClick={close} className="group flex items-center gap-3 rounded-2xl py-2 pl-1 text-lg text-ivory/75 hover:text-ivory">
                              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ivory/[0.06] ring-1 ring-gold/30"><AnimatedIcon name={c.icon} className="h-5 w-5" accentColor="#E2CFA8" /></span>{c.label}
                            </Link></li>
                          ))}
                          <li className="h-4" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-10 grid gap-4">
              <p className="font-display text-xl italic text-gold-light">{brand.tagline}</p>
              <Link href={headerCta.href} onClick={close} className="btn-sea w-full">{headerCta.label}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
