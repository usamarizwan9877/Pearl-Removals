"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Info, Loader2, Lock, MapPin } from "lucide-react";
import { quote } from "@/content/site";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import { PearlMark } from "@/components/ui/Logo";

/*
 * Three-step Get-a-Quote wizard: 1 Your move → 2 Your home → 3 Your details.
 * Answers live in state so nothing is lost when moving between steps.
 * Sends through Web3Forms when NEXT_PUBLIC_WEB3FORMS_KEY is set (Pearl Removals'
 * own key). Until then it is clearly a preview and nothing is sent.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Data = {
  from: string; to: string; date: string; flexible: boolean; type: string;
  size: string; extras: string[];
  name: string; phone: string; email: string; contact: string; notes: string;
};
const empty: Data = { from: "", to: "", date: "", flexible: false, type: quote.types[0].value, size: "", extras: [], name: "", phone: "", email: "", contact: quote.contactPrefs[2], notes: "" };
type Status = "idle" | "sending" | "sent" | "error" | "unconnected";

const field = "w-full rounded-[8px] border border-ink/10 bg-white px-4 py-3.5 text-[0.95rem] text-ink outline-none transition-all placeholder:text-ink/40 focus:border-sea-deep focus:ring-4 focus:ring-sea/30 aria-[invalid=true]:border-red-400";
const label = "mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink/55";
const chip = (on: boolean) =>
  `rounded-[8px] border px-4 py-3 text-left text-[0.92rem] transition-all duration-300 ${on ? "border-ink bg-ink text-ivory-50 shadow-card" : "border-ink/10 bg-white text-ink hover:-translate-y-0.5 hover:border-sea-deep"}`;

export default function QuoteForm({ idPrefix = "q", onStepChange }: { idPrefix?: string; onStepChange?: (step: number) => void }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [d, setD] = useState<Data>(empty);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const top = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => { setD((x) => ({ ...x, [k]: v })); setErrors((e) => ({ ...e, [k]: false })); };
  const toggleExtra = (x: string) => set("extras", d.extras.includes(x) ? d.extras.filter((e) => e !== x) : [...d.extras, x]);

  const required: (keyof Data)[][] = [["from", "to"], ["size"], ["name", "phone", "email"]];
  const validate = (s: number) => {
    const e: Record<string, boolean> = {};
    for (const k of required[s]) if (!String(d[k]).trim()) e[k] = true;
    if (s === 2 && d.email && !/^\S+@\S+\.\S+$/.test(d.email)) e.email = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
    onStepChange?.(to);
    top.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const next = () => { if (validate(step)) go(step + 1); };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 2) return next();
    if (!validate(2)) return;
    if (!ACCESS_KEY) { setStatus("unconnected"); onStepChange?.(3); return; }
    setStatus("sending");
    try {
      const body = {
        access_key: ACCESS_KEY, subject: "New quote request — Pearl Removals website", from_name: "Pearl Removals Website",
        ...d, flexible: d.flexible ? "Yes" : "No", extras: d.extras.join(", ") || "None",
      };
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body) });
      const json = (await res.json()) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("Submit failed");
      setStatus("sent");
      onStepChange?.(3);
    } catch {
      setStatus("error");
    }
  }

  const done = status === "sent" || status === "unconnected";
  const err = (k: string) => (errors[k] ? { "aria-invalid": true as const } : {});

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="py-6 text-center" role="status">
        <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 16 }} className="inline-block">
          <PearlMark className="footer-crown h-20 w-24" />
        </motion.span>
        <h4 className="mt-5 font-display text-[1.9rem] leading-tight">{status === "sent" ? quote.successTitle : "Preview only"}</h4>
        <p className="mx-auto mt-3 max-w-sm text-ink/65">
          {status === "sent" ? quote.success : "This form isn't connected to an inbox yet, so nothing was sent. Everything else works exactly as it will when live."}
        </p>
        <Summary d={d} />
        <button type="button" onClick={() => { setD(empty); setStatus("idle"); go(0); }} className="btn-ghost mt-7">Start again</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-describedby={`${idPrefix}-privacy`}>
      <div ref={top} className="scroll-mt-28" />
      {/* progress */}
      <ol className="mb-8 grid grid-cols-3 gap-2">
        {quote.wizard.map((w, i) => (
          <li key={w.label}>
            <button type="button" disabled={i > step} onClick={() => i < step && go(i)} className="w-full text-left disabled:cursor-default">
              <span className="relative block h-1.5 overflow-hidden rounded-full bg-ink/10">
                <motion.span className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sea-deep to-gold"
                  initial={false} animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }} transition={{ duration: 0.6, ease: "easeInOut" }} />
              </span>
              <span className={`mt-2.5 flex items-center gap-2 text-[0.8rem] font-medium ${i <= step ? "text-ink" : "text-ink/40"}`}>
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[0.65rem] ${i < step ? "bg-sea-deep text-white" : i === step ? "bg-ink text-white" : "bg-ink/10"}`}>
                  {i < step ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                </span>
                {w.label}
              </span>
              <span className="ml-7 hidden text-[0.72rem] text-ink/45 sm:block">{w.hint}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="relative">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div key={step} custom={dir}
            initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>

            {step === 0 && (
              <div className="grid gap-5">
                <fieldset>
                  <legend className={label}>{quote.fields.type}</legend>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {quote.types.map((t) => {
                      const on = d.type === t.value;
                      return (
                        <button key={t.value} type="button" aria-pressed={on} onClick={() => set("type", t.value)}
                          className={`group flex flex-col items-center gap-2 rounded-[10px] border px-3 py-4 text-center text-[0.85rem] transition-all duration-300 ${on ? "border-ink bg-ink text-ivory-50 shadow-card" : "border-ink/10 bg-white text-ink hover:-translate-y-0.5 hover:border-sea-deep"}`}>
                          <span className={`grid h-11 w-11 place-items-center rounded-full ${on ? "bg-ivory-50/10" : "bg-sea-light"}`}>
                            <AnimatedIcon name={t.icon} className="h-6 w-6" accentColor={on ? "#A8D5C5" : "#5E9C88"} />
                          </span>
                          {t.value}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <label htmlFor={`${idPrefix}-from`} className={label}>{quote.fields.from}</label>
                    <input id={`${idPrefix}-from`} value={d.from} onChange={(e) => set("from", e.target.value.toUpperCase())} autoComplete="postal-code" placeholder="e.g. B1 1AA" className={`${field} pr-10`} {...err("from")} />
                    <MapPin aria-hidden className="pointer-events-none absolute bottom-4 right-3.5 h-4 w-4 text-sea-deep" />
                  </div>
                  <div className="relative">
                    <label htmlFor={`${idPrefix}-to`} className={label}>{quote.fields.to}</label>
                    <input id={`${idPrefix}-to`} value={d.to} onChange={(e) => set("to", e.target.value.toUpperCase())} placeholder="e.g. CV1 1AA" className={`${field} pr-10`} {...err("to")} />
                    <MapPin aria-hidden className="pointer-events-none absolute bottom-4 right-3.5 h-4 w-4 text-sea-deep" />
                  </div>
                  <div className="relative">
                    <label htmlFor={`${idPrefix}-date`} className={label}>{quote.fields.date}</label>
                    <input id={`${idPrefix}-date`} type="date" value={d.date} onChange={(e) => set("date", e.target.value)} className={field} />
                  </div>
                  <label className="flex cursor-pointer items-center gap-3 self-end rounded-[8px] border border-ink/10 bg-white px-4 py-3.5 text-[0.92rem]">
                    <input type="checkbox" checked={d.flexible} onChange={(e) => set("flexible", e.target.checked)} className="h-4 w-4 accent-[#5E9C88]" />
                    {quote.fields.flexible}
                  </label>
                </div>
                {(errors.from || errors.to) && <p className="text-sm text-red-600" role="alert">Please add both postcodes so we can plan your route.</p>}
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-6">
                <fieldset>
                  <legend className={label}>{quote.fields.size}</legend>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {quote.sizes.map((s) => (
                      <button key={s} type="button" aria-pressed={d.size === s} onClick={() => set("size", s)} className={chip(d.size === s)}>{s}</button>
                    ))}
                  </div>
                  {errors.size && <p className="mt-2 text-sm text-red-600" role="alert">Please choose the size that fits best.</p>}
                </fieldset>
                <fieldset>
                  <legend className={label}>{quote.fields.extras}</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {quote.extras.map((x) => {
                      const on = d.extras.includes(x);
                      return (
                        <button key={x} type="button" aria-pressed={on} onClick={() => toggleExtra(x)} className={`flex items-center gap-3 ${chip(on)}`}>
                          <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border ${on ? "border-sea bg-sea text-ink" : "border-ink/25"}`}>
                            {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                          </span>
                          {x}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor={`${idPrefix}-name`} className={label}>{quote.fields.name}</label>
                  <input id={`${idPrefix}-name`} value={d.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className={field} {...err("name")} />
                </div>
                <div>
                  <label htmlFor={`${idPrefix}-phone`} className={label}>{quote.fields.phone}</label>
                  <input id={`${idPrefix}-phone`} type="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" className={field} {...err("phone")} />
                </div>
                <div>
                  <label htmlFor={`${idPrefix}-email`} className={label}>{quote.fields.email}</label>
                  <input id={`${idPrefix}-email`} type="email" value={d.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className={field} {...err("email")} />
                </div>
                <fieldset className="sm:col-span-2">
                  <legend className={label}>{quote.fields.contact}</legend>
                  <div className="grid grid-cols-3 gap-3">
                    {quote.contactPrefs.map((c) => (
                      <button key={c} type="button" aria-pressed={d.contact === c} onClick={() => set("contact", c)} className={`${chip(d.contact === c)} text-center`}>{c}</button>
                    ))}
                  </div>
                </fieldset>
                <div className="sm:col-span-2">
                  <label htmlFor={`${idPrefix}-notes`} className={label}>{quote.fields.notes}</label>
                  <textarea id={`${idPrefix}-notes`} rows={3} value={d.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Parking, stairs, a piano, a tight timeline…" className={`${field} resize-none`} />
                </div>
                {(errors.name || errors.phone || errors.email) && <p className="text-sm text-red-600 sm:col-span-2" role="alert">Please add your name, phone number and a valid email.</p>}
                <div className="sm:col-span-2"><Summary d={d} /></div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* actions */}
      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={() => go(step - 1)} className="btn-ghost !px-5">
            <ArrowLeft className="h-4 w-4" /> {quote.back}
          </button>
        )}
        <button type="submit" disabled={status === "sending"} className="btn-ink btn-shine flex-1 disabled:opacity-70">
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>{step < 2 ? <>{quote.next}<span className="hidden sm:inline"> · {step + 2} of 3</span></> : quote.submit}</span>
          {status !== "sending" && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
      {status === "error" && <p className="mt-3 text-sm text-red-600" role="alert">Something went wrong — please try again.</p>}
      <p id={`${idPrefix}-privacy`} className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink/50">
        <Lock className="h-3 w-3" /> {quote.privacy}
      </p>
      {!ACCESS_KEY && (
        <p className="mt-2 flex items-center justify-center gap-1.5 text-[0.7rem] text-ink/40"><Info className="h-3 w-3" /> Preview — form not yet connected</p>
      )}
    </form>
  );
}

/** Compact recap of the answers so far. */
function Summary({ d }: { d: Data }) {
  const rows = [
    ["Move", d.type],
    ["Route", d.from && d.to ? `${d.from} → ${d.to}` : ""],
    ["Date", d.date ? new Date(d.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + (d.flexible ? " (flexible)" : "") : d.flexible ? "Flexible" : ""],
    ["Size", d.size],
    ["Extras", d.extras.join(", ")],
  ].filter(([, v]) => v);
  if (!rows.length) return null;
  return (
    <div className="mt-6 rounded-[10px] border border-ink/10 bg-white/70 p-4 text-left">
      <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink/50">{quote.review}</p>
      <dl className="grid gap-1.5 text-sm sm:grid-cols-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-2"><dt className="w-14 shrink-0 text-ink/45">{k}</dt><dd className="text-ink">{v}</dd></div>
        ))}
      </dl>
    </div>
  );
}
