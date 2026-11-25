import Link from "next/link";
import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import { brand, contact, footer } from "@/content/site";
import { FacebookIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import Logo, { PearlMark } from "@/components/ui/Logo";
import Reveal from "@/components/ui/Reveal";

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-[0.98rem] text-ivory-50/65 transition-colors hover:text-sea">
      <span className="h-px w-0 bg-sea transition-all duration-300 group-hover:w-3" />
      {label}
    </Link>
  );
}

export default function Footer() {
  const social = [
    { href: contact.facebook, label: "Facebook", I: FacebookIcon },
    { href: contact.instagram, label: "Instagram", I: InstagramIcon },
  ];
  const details = [
    { I: Phone, text: contact.phoneDisplay },
    { I: Mail, text: contact.email },
    { I: MapPin, text: contact.address },
    { I: Clock, text: contact.hours },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0B1B33] text-ivory-50">
      {/* brand wave across the top: seafoam band + gold line, like the van livery */}
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-[50px] w-full sm:h-[70px]">
        <rect width="1440" height="80" fill="#0F2340" />
        <path d="M0 30 C 320 0, 640 70, 960 32 S 1300 6, 1440 22 V80 H0Z" fill="#A8D5C5" fillOpacity=".9" />
        <path d="M0 42 C 330 12, 650 82, 970 44 S 1310 18, 1440 34 V80 H0Z" fill="#0B1B33" />
        <path d="M0 38 C 330 8, 650 78, 970 40 S 1310 14, 1440 30" fill="none" stroke="#C4A574" strokeWidth="2" />
      </svg>

      <div className="container relative max-w-[1400px] pt-14">
        <div className="grid gap-14 pb-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Pearl Removals — Home"><Logo tone="light" /></Link>
            <p className="mt-6 max-w-sm leading-relaxed text-ivory-50/60">{footer.tagline}</p>
            <ul className="mt-8 flex gap-3">
              {social.map(({ href, label, I }) => (
                <li key={label}>
                  <a href={href} aria-label={label} className="grid h-11 w-11 place-items-center rounded-full border border-ivory-50/15 transition-all duration-300 hover:-translate-y-1 hover:border-sea hover:bg-sea hover:text-ink">
                    <I className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Services" className="lg:col-span-2">
            <h2 className="eyebrow eyebrow-light">Services</h2>
            <ul className="mt-6 space-y-3">{footer.services.map((l) => <li key={l.label}><FooterLink {...l} /></li>)}</ul>
          </nav>
          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="eyebrow eyebrow-light">Company</h2>
            <ul className="mt-6 space-y-3">{footer.company.map((l) => <li key={l.label}><FooterLink {...l} /></li>)}</ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="eyebrow eyebrow-light">Contact</h2>
            <div className="mt-6 rounded-[14px] border border-ivory-50/10 bg-gradient-to-br from-ivory-50/[0.06] to-transparent p-6">
              <ul className="space-y-4 text-[0.95rem] text-ivory-50/70">
                {details.map(({ I, text }) => <li key={text} className="flex items-start gap-3"><I className="mt-1 h-4 w-4 shrink-0 text-sea" />{text}</li>)}
              </ul>
              <Link href={footer.quote.href} className="btn-sea mt-6 w-full">{footer.quote.label}</Link>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5" aria-hidden>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-ivory-50/15" />
          <PearlMark className="h-6 w-8" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-ivory-50/15" />
        </div>

        <div className="flex flex-col gap-4 py-8 text-xs text-ivory-50/45 lg:flex-row lg:items-center lg:justify-between">
          <p>{footer.copyright}</p>
          <div className="flex items-center gap-6">
            <ul className="flex gap-6">{footer.legal.map((l) => <li key={l.label}><Link href={l.href} className="hover:text-ivory-50">{l.label}</Link></li>)}</ul>
            <a href="#main" aria-label="Back to top" className="grid h-10 w-10 place-items-center rounded-full border border-ivory-50/15 text-ivory-50/70 transition-all duration-300 hover:-translate-y-1 hover:border-sea hover:text-sea">
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* signature wordmark */}
      <Reveal y={40} className="relative select-none overflow-hidden border-t border-ivory-50/10 pb-8 pt-12 sm:pt-14">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sea/10 blur-3xl" />
        <div className="relative flex flex-col items-center">
          <PearlMark className="footer-crown h-12 w-16 sm:h-16 sm:w-20" />
          <p aria-label={brand.name} className="footer-wordmark mt-4 whitespace-nowrap text-center font-logo leading-none tracking-[0.08em] text-[clamp(2.1rem,7.4vw,7.2rem)]">
            PEARL REMOVALS
          </p>
          <span className="mt-5 flex items-center gap-4 font-display text-sm italic text-gold-light/80 sm:text-base">
            <span className="h-px w-10 bg-gold/50 sm:w-20" />{brand.tagline}<span className="h-px w-10 bg-gold/50 sm:w-20" />
          </span>
        </div>
      </Reveal>
    </footer>
  );
}
