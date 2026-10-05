import { Mail } from "lucide-react";
import { isFilled, links, navItems, site, work } from "@/lib/content";
import { BackToTop } from "@/components/BackToTop";
import { FooterWordmark } from "@/components/FooterWordmark";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { LocalTime } from "@/components/LocalTime";
import { Magnetic } from "@/components/Magnetic";
import Link from "next/link";

const linkClass =
  "group inline-flex min-h-9 items-center gap-1 text-small text-paper/90 transition-colors duration-300 hover:text-accent-soft";

export function Footer() {
  const socials = [
    { label: "GitHub", href: links.github, icon: <GitHubIcon className="size-[1.05rem]" />, external: true },
    { label: "LinkedIn", href: links.linkedin, icon: <LinkedInIcon className="size-[1.05rem]" />, external: true },
    { label: "X", href: links.x, icon: <XIcon className="size-[1.05rem]" />, external: true },
    {
      label: "Email",
      href: isFilled(links.email) ? `mailto:${links.email}` : "",
      icon: <Mail aria-hidden className="size-[1.05rem]" strokeWidth={2} />,
      external: false,
    },
  ].filter((item) => isFilled(item.href));

  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-paper">
      <div className="container-x pt-20 md:pt-28">
        <div className="grid-12 gap-y-16">
          {/* Prompt: hands the address to the contact page, which has the form. */}
          <div className="col-span-full lg:col-span-5">
            <h2 className="text-h2 max-w-[14ch]">Have something in mind? Let’s talk.</h2>
            <form action="/contact" method="get" className="mt-7 max-w-md">
              <div className="flex items-center gap-1.5 rounded-xl bg-paper p-1.5 ring-2 ring-paper/25 transition-shadow duration-300 focus-within:ring-accent-soft">
                <label htmlFor="footer-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Your email…"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-small text-ink outline-none placeholder:text-muted"
                />
                <Magnetic>
                  <button
                    type="submit"
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-ink px-5 text-small font-medium text-paper transition-colors duration-300 hover:bg-accent"
                  >
                    Say hello
                  </button>
                </Magnetic>
              </div>
              <p className="label mt-3 text-paper/55">Opens the contact page with your email filled in.</p>
            </form>
          </div>

          <nav
            aria-label="Footer"
            className="col-span-full grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7"
          >
            <div>
              <h2 className="label text-paper/55">Pages</h2>
              <ul className="mt-4 space-y-0.5">
                <li>
                  <Link href="/" className={linkClass}>
                    Home
                  </Link>
                </li>
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} className={linkClass}>
                      {item.label === "Work" ? "Projects" : item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="label text-paper/55">Projects</h2>
              <ul className="mt-4 space-y-0.5">
                {work.projects.slice(0, 6).map((project) => (
                  <li key={project.id}>
                    <Link href={`/projects#project-${project.id}`} className={linkClass}>
                      {project.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/projects" className={`${linkClass} text-accent-soft`}>
                    All {work.projects.length} projects
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-full sm:col-span-1">
              <h2 className="label text-paper/55">Socials</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {socials.map((item) => (
                  <li key={item.label}>
                    <Magnetic>
                      <a
                        href={item.href}
                        aria-label={item.external ? `${item.label} (opens in a new tab)` : item.label}
                        title={item.label}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex size-11 items-center justify-center rounded-lg bg-paper text-ink transition-[background-color,color] duration-300 hover:bg-accent hover:text-paper"
                      >
                        {item.icon}
                      </a>
                    </Magnetic>
                  </li>
                ))}
              </ul>
              <p className="label mt-6 text-paper/55">{site.location}</p>
              <p className="label mt-1 text-paper/55">
                <LocalTime />
              </p>
            </div>
          </nav>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-paper/15 pt-5 md:mt-28">
          <p className="label text-paper/55">
            © {site.year} {site.name}. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </div>

      <div className="container-x">
        <FooterWordmark text={site.name} />
      </div>
    </footer>
  );
}
