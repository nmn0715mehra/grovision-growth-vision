import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { industryOptions, helpOptions } from "@/lib/site";

const fieldClass =
  "w-full border border-input bg-ivory px-4 py-3 text-sm text-navy transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none";
const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-navy";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  // No backend is connected yet. Wire this to a server function or inbox
  // integration when contact details and delivery are configured.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const form = event.currentTarget;
    window.setTimeout(() => {
      setSubmitting(false);
      form.reset();
      toast.success("Thank you — your details are noted.", {
        description: "Message delivery is being set up, so please check back for direct contact details soon.",
      });
    }, 400);
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} placeholder="Your full name" />
        </div>
        <div>
          <label className={labelClass} htmlFor="business">
            Business / Brand
          </label>
          <input id="business" name="business" className={fieldClass} placeholder="Company or brand name" />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="Include country code"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="industry">
            Industry
          </label>
          <select id="industry" name="industry" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select your industry
            </option>
            {industryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="need">
            What do you need help with?
          </label>
          <select id="need" name="need" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select an area
            </option>
            {helpOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={fieldClass}
            placeholder="Tell us about your business, your goals and where you want to go."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 w-full cursor-pointer border border-navy bg-navy px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-soft hover:shadow-card disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending…" : "Start a Conversation"}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        A free first consultation is available. Direct contact details are being set up and will be
        published here shortly.
      </p>
    </form>
  );
}
