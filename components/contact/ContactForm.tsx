"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { contact, links } from "@/lib/content";
import { easeOutExpo } from "@/components/Motion";
import { Magnetic } from "@/components/Magnetic";
import { CopyEmail } from "@/components/contact/CopyEmail";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const copy = contact.form;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const fieldClass =
  "peer block w-full border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-lead outline-none transition-colors duration-300 placeholder:text-muted/70 focus:border-ink aria-[invalid=true]:border-red-700";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="label text-muted">
        {label}
      </label>
      {children}
      {/* The accent underline grows across the field while it has focus. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo peer-focus:scale-x-100"
      />
      {error && (
        <p id={`${id}-error`} className="label mt-2 text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * The message form. It posts to /api/contact. If the site has no mail service
 * configured (the default), it opens the visitor's email app with the message
 * ready to send, so it works without any setup.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const openedAt = useRef(0);

  /* Pre-fill the email when the visitor came from the footer prompt. */
  useEffect(() => {
    openedAt.current = Date.now();
    const email = new URLSearchParams(window.location.search).get("email");
    if (email && emailRef.current) emailRef.current.value = email.slice(0, 200);
  }, []);

  /* Move focus to the result so keyboard and screen reader users hear it. */
  useEffect(() => {
    if (status === "sent" || status === "fallback" || status === "error") {
      resultRef.current?.focus();
    }
  }, [status]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      topic: String(data.get("topic") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      company: String(data.get("company") ?? ""),
      elapsed: Date.now() - openedAt.current,
    };

    const next: Errors = {};
    if (!payload.name) next.name = "Please tell me your name.";
    if (!emailPattern.test(payload.email)) next.email = "Please enter a valid email address.";
    if (payload.message.length < 10) next.message = "A few more words, please (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = (["name", "email", "message"] as const).find((key) => next[key]);
      if (first) document.getElementById(`cf-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = response.ok ? ((await response.json().catch(() => null)) as { delivered?: boolean } | null) : null;

      if (result?.delivered) {
        form.reset();
        setStatus("sent");
      } else if (result) {
        // The server has no mail service set up: hand the message to the visitor's email app.
        const subject = `Portfolio message from ${payload.name}`;
        const body = `${payload.message}\n\n${payload.name}\n${payload.email}`;
        window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus("fallback");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" || status === "fallback" || status === "error") {
    const title = status === "sent" ? copy.sentTitle : status === "fallback" ? copy.fallbackTitle : copy.errorTitle;
    const body = status === "sent" ? copy.sentBody : status === "fallback" ? copy.fallbackBody : copy.errorBody;
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
        className="border-t border-ink pt-8"
      >
        <h2 ref={resultRef} tabIndex={-1} className="text-h3 max-w-[22ch] font-semibold outline-none">
          {title}
        </h2>
        <p className="text-body mt-4 max-w-[44ch] text-muted">{body}</p>
        {status !== "sent" && (
          <p className="mt-6 flex flex-wrap items-center gap-x-6">
            <a href={`mailto:${links.email}`} className="text-lead font-medium underline underline-offset-4">
              {links.email}
            </a>
            <CopyEmail />
          </p>
        )}
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="label group mt-8 inline-flex min-h-11 items-center gap-2"
        >
          <span className="u-sweep">{copy.again}</span>
          <ArrowRight aria-hidden size={14} />
        </button>
      </m.div>
    );
  }

  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-9">
      <div className="grid gap-9 md:grid-cols-2">
        <Field id="cf-name" label={copy.name} error={errors.name}>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            className={fieldClass}
          />
        </Field>
        <Field id="cf-email" label={copy.email} error={errors.email}>
          <input
            ref={emailRef}
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            className={fieldClass}
          />
        </Field>
      </div>

      <fieldset>
        <legend className="label text-muted">{copy.topic}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {copy.topics.map((topic) => (
            <label key={topic} className="cursor-pointer">
              <input type="radio" name="topic" value={topic} className="peer sr-only" />
              <span className="inline-flex min-h-11 items-center rounded-full border border-ink/25 px-4 text-small transition-[background-color,color,border-color] duration-300 hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent">
                {topic}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="cf-message" label={copy.message} error={errors.message}>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={4000}
          placeholder={copy.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className={`${fieldClass} resize-y`}
        />
      </Field>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Magnetic>
          <button
            type="submit"
            disabled={sending}
            className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-ink px-8 text-small font-medium text-paper transition-colors duration-300 hover:bg-accent disabled:opacity-60"
          >
            {sending ? copy.sending : copy.submit}
            <ArrowRight
              aria-hidden
              size={16}
              className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
            />
          </button>
        </Magnetic>
        <p role="status" aria-live="polite" className="label text-muted">
          {sending ? copy.sending : ""}
        </p>
      </div>
    </form>
  );
}
