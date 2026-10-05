import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { contact, isFilled, links, site } from "@/lib/content";
import { getSocialItems } from "@/lib/social";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { DrawLine, Reveal, RevealText } from "@/components/Motion";
import { LocalTime } from "@/components/LocalTime";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Vihaan Gandhi. Send a message about a project, a collaboration or research.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const profiles = getSocialItems().filter((item) => item.href && item.label !== "Email");

  return (
    <section aria-labelledby="contact-heading" className="section section-first">
      <div className="container-x">
        <p className="label flex items-center gap-2.5 text-muted">
          <span aria-hidden className="size-1.5 rounded-[1px] bg-accent" />
          {contact.page.label}
        </p>
        <h1 id="contact-heading" className="text-feature mt-6">
          <RevealText>{contact.headline}</RevealText>
        </h1>

        <div className="grid-12 mt-12 gap-y-16 lg:mt-20">
          <Reveal className="col-span-full lg:col-span-4">
            <p className="text-lead max-w-[28ch]">{contact.page.intro}</p>

            <h2 className="label mt-14 text-muted">{contact.page.direct}</h2>
            <dl className="mt-4">
              {isFilled(links.email) && (
                <div className="relative py-5">
                  <DrawLine className="bg-ink" />
                  <dt className="label text-muted">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${links.email}`}
                      className="font-display text-h3 break-all font-bold underline-offset-4 hover:underline"
                    >
                      {links.email}
                    </a>
                    <div>
                      <CopyEmail className="-ml-0 text-muted" />
                    </div>
                  </dd>
                </div>
              )}
              {profiles.map((item, i) => (
                <div key={item.label} className="relative py-5">
                  <DrawLine className="bg-ink" delay={(i + 1) * 0.08} />
                  <dt className="label text-muted">{item.label}</dt>
                  <dd className="mt-1">
                    <a
                      href={item.href ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex min-h-11 items-center gap-2 break-all text-lead font-semibold"
                    >
                      <span className="u-sweep">{item.value.replace(/^https?:\/\/(www\.)?[^/]+\//, "").replace(/\/$/, "")}</span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-[0.8em] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              ))}
              <div className="relative border-b border-ink py-5">
                <DrawLine className="bg-ink" delay={0.3} />
                <dt className="label text-muted">Based in</dt>
                <dd className="mt-1 font-display text-h3 font-bold">{site.location}</dd>
                <dd className="label mt-1 text-muted">
                  <LocalTime />
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="col-span-full lg:col-span-7 lg:col-start-6">
            <h2 className="label mb-8 text-muted">{contact.page.message}</h2>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
