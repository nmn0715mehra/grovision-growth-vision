import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { industryOptions, helpOptions } from "@/lib/site";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full border border-input bg-ivory px-4 py-3 text-sm text-navy transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none";
const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-navy";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  // No message delivery is connected yet. When contact details or an inbox
  // integration are configured, submit to a server function here.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 10) next.message = "A sentence or two about your business helps.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      form.reset();
    }, 450);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="flex h-full flex-col justify-center border border-border bg-card p-8 shadow-card sm:p-10"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center border border-gold text-gold">
          <Check aria-hidden="true" className="h-5 w-5" />
        </span>
        <h3 className="mt-6 text-xl font-bold text-navy sm:text-2xl">Thank you — noted.</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Your details have been recorded on this device. Message delivery and direct contact
          channels are still being set up, so nothing has been emailed yet — they will be published
          here as soon as they are live.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-7 w-fit cursor-pointer border border-navy px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-gold"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-border bg-card p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(fieldClass, errors.name && "border-destructive")}
            placeholder="Your full name"
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="business">
            Business / Brand
          </label>
          <input
            id="business"
            name="business"
            className={fieldClass}
            placeholder="Company or brand name"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(fieldClass, errors.email && "border-destructive")}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-xs text-destructive">
              {errors.email}
            </p>
          )}
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
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(fieldClass, errors.message && "border-destructive")}
            placeholder="Tell us about your business, your goals and where you want to go."
          />
          {errors.message && (
            <p id="message-error" className="mt-2 text-xs text-destructive">
              {errors.message}
            </p>
          )}
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
