import { useId } from "react";

/**
 * Pearl Removals logo: a lustrous pearl resting on champagne-gold waves, a fine
 * gold divider, and the PEARL / REMOVALS wordmark in a Trajan-style serif.
 * `tone="light"` for dark backgrounds.
 */
export function PearlMark({ className = "h-10 w-12" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 52" className={className} aria-hidden>
      <defs>
        <radialGradient id={`pearl-${id}`} cx="38%" cy="32%" r="68%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset=".45" stopColor="#F4EFE6" />
          <stop offset=".8" stopColor="#D9D1C2" />
          <stop offset="1" stopColor="#BFB4A1" />
        </radialGradient>
        <linearGradient id={`wave-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#E2CFA8" />
          <stop offset=".5" stopColor="#C4A574" />
          <stop offset="1" stopColor="#97794A" />
        </linearGradient>
      </defs>
      <circle cx="34" cy="19" r="15" fill={`url(#pearl-${id})`} />
      <ellipse cx="29" cy="13" rx="5" ry="3.2" fill="#fff" opacity=".85" transform="rotate(-25 29 13)" />
      <path d="M2 34c10 6 24 6 36-1s20-6 24-3c-4 7-19 10-31 9S9 40 2 34Z" fill={`url(#wave-${id})`} />
      <path d="M6 41c9 4 21 4 31-1s17-4 21-2c-4 5-16 7-26 6S12 45 6 41Z" fill={`url(#wave-${id})`} opacity=".75" />
    </svg>
  );
}

export default function Logo({ tone = "dark", compact = false, className = "" }: { tone?: "dark" | "light"; compact?: boolean; className?: string }) {
  const ink = tone === "dark" ? "text-ink" : "text-ivory-50";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <PearlMark className={compact ? "h-9 w-11" : "h-11 w-[3.4rem]"} />
      <span aria-hidden className="h-9 w-px bg-gold/70" />
      <span className={`flex flex-col font-logo leading-none ${ink}`}>
        <span className={`${compact ? "text-[1.35rem]" : "text-[1.6rem]"} tracking-[0.12em]`}>PEARL</span>
        <span className={`${compact ? "mt-1 text-[0.62rem]" : "mt-1.5 text-[0.7rem]"} tracking-[0.42em]`}>REMOVALS</span>
      </span>
    </span>
  );
}
