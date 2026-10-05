"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { contact, links } from "@/lib/content";

/** Copies the email address. Falls back silently if the clipboard is blocked. */
export function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* The address is shown next to the button, so it can be copied by hand. */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`label group inline-flex min-h-11 items-center gap-2 ${className}`}
    >
      {copied ? <Check aria-hidden size={14} /> : <Copy aria-hidden size={14} />}
      <span className="u-sweep">{copied ? contact.form.copied : contact.form.copy}</span>
      <span aria-live="polite" className="sr-only">
        {copied ? contact.form.copied : ""}
      </span>
    </button>
  );
}
