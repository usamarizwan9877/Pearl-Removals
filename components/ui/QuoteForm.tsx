"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, Check, ChevronDown, Info, Loader2, Lock, MapPin } from "lucide-react";
import { quote } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error" | "unconnected";

/*
 * Get-a-Quote form. Sends through Web3Forms when NEXT_PUBLIC_WEB3FORMS_KEY is set
 * (Pearl Removals' own key — https://web3forms.com). Until then it is clearly a
 * preview: submitting shows that the form isn't connected yet, and nothing is sent.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function QuoteForm({ idPrefix = "q" }: { idPrefix?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    if (!ACCESS_KEY) { setStatus("unconnected"); return; }
    data.append("access_key", ACCESS_KEY);
    data.append("subject", "New quote request — Pearl Removals website");
    data.append("from_name", "Pearl Removals Website");
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { Accept: "application/json" }, body: data });
      const json = (await res.json()) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("Submit failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const f = quote.fields;
  const field = "w-full rounded-[8px] border border-ink/10 bg-white px-4 py-3.5 text-[0.95rem] text-ink outline-none transition-all placeholder:text-ink/45 focus:border-sea-deep focus:ring-4 focus:ring-sea/30";
  const label = "mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink/55";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" aria-describedby={`${idPrefix}-privacy`}>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-name`} className={label}>{f.name}</label>
        <input id={`${idPrefix}-name`} name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-phone`} className={label}>{f.phone}</label>
        <input id={`${idPrefix}-phone`} name="phone" type="tel" required autoComplete="tel" className={field} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-email`} className={label}>{f.email}</label>
        <input id={`${idPrefix}-email`} name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div className="relative">
        <label htmlFor={`${idPrefix}-from`} className={label}>{f.from}</label>
        <input id={`${idPrefix}-from`} name="moving_from" required autoComplete="postal-code" placeholder="e.g. SW1A 1AA" className={`${field} pr-10 uppercase placeholder:normal-case`} />
        <MapPin aria-hidden className="pointer-events-none absolute bottom-4 right-3.5 h-4 w-4 text-sea-deep" />
      </div>
      <div className="relative">
        <label htmlFor={`${idPrefix}-to`} className={label}>{f.to}</label>
        <input id={`${idPrefix}-to`} name="moving_to" required placeholder="e.g. N1 9GU" className={`${field} pr-10 uppercase placeholder:normal-case`} />
        <MapPin aria-hidden className="pointer-events-none absolute bottom-4 right-3.5 h-4 w-4 text-sea-deep" />
      </div>
      <div className="relative">
        <label htmlFor={`${idPrefix}-date`} className={label}>{f.date}</label>
        <input id={`${idPrefix}-date`} name="move_date" type="date" className={`${field} pr-10`} />
        <CalendarDays aria-hidden className="pointer-events-none absolute bottom-4 right-3.5 h-4 w-4 text-sea-deep" />
      </div>
      <div className="relative">
        <label htmlFor={`${idPrefix}-type`} className={label}>{f.type}</label>
        <select id={`${idPrefix}-type`} name="move_type" defaultValue={quote.types[0]} className={`${field} appearance-none pr-10`}>
          {quote.types.map((t) => <option key={t}>{t}</option>)}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute bottom-4 right-3.5 h-4 w-4 text-ink/50" />
      </div>

      <button type="submit" disabled={status === "sending"} className="btn-ink btn-shine group mt-2 w-full sm:col-span-2 disabled:opacity-70">
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        <span>{quote.submit}</span>
        {status !== "sending" && <ArrowRight className="h-4 w-4" />}
      </button>

      <div className="sm:col-span-2" aria-live="polite">
        <AnimatePresence mode="wait">
          {status === "sent" && (
            <motion.p key="ok" role="status" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 rounded-[8px] bg-sea/30 px-4 py-3 text-sm text-ink">
              <Check className="h-4 w-4 text-sea-deep" /> {quote.success}
            </motion.p>
          )}
          {status === "unconnected" && (
            <motion.p key="pre" role="status" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-start gap-2 rounded-[8px] bg-gold/15 px-4 py-3 text-sm text-ink">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" /> Preview only — this form isn&apos;t connected to an inbox yet, so nothing was sent.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p key="err" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-red-600">
              Something went wrong — please try again.
            </motion.p>
          )}
        </AnimatePresence>
        <p id={`${idPrefix}-privacy`} className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink/50">
          <Lock className="h-3 w-3" /> {quote.privacy}
        </p>
      </div>
    </form>
  );
}
