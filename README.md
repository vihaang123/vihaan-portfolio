# Vihaan Gandhi — Portfolio

Personal portfolio for Vihaan Gandhi: Data Science student, founder of Tekkloom and co-founder of Supercore, based in Mumbai.
A home page plus dedicated Projects, About, Experience and Contact pages, ten projects with a full-screen case study each, a filterable project index, a working contact form, and a considered motion system.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) and React 19
- TypeScript
- Tailwind CSS 4 (design tokens live in `app/globals.css`)
- Framer Motion (loaded lazily, `m` components only)
- Lucide React (icons)
- Type: Bricolage Grotesque (variable: weight and width axes) for headlines, Geist for text and Geist Mono for small labels. All three are self-hosted in `app/fonts/` under the SIL Open Font License (the Bricolage licence file sits next to the font), so there are no font CDN requests

No database and no environment variables required. There is one API route, `/api/contact`, behind the contact form (see **Contact form** below).

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run lint
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Click **Deploy**. Vercel detects Next.js automatically; no settings need changing.

Optional: once you have a custom domain, set `NEXT_PUBLIC_SITE_URL` (for example `https://yourname.com`) in the Vercel project settings so Open Graph images and the sitemap use it. Without it the site uses the Vercel production URL automatically.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero (kinetic headline and a drawn career path), a short selection of work, About, Experience, Capabilities, Currently, contact call to action |
| `/projects` | All 10 projects with filter chips (Research, Products, Data & ML), each opening its case study. `/projects#project-<id>` scrolls to a project |
| `/about` | About, a longer story, what building has taught me, what I do, interests, outside work (hobbies), Capabilities, Currently, and (once filled in) people you look up to and quotes |
| `/experience` | Experience grouped as Startups, Internships and Research, plus education |
| `/contact` | Message form, email, LinkedIn, GitHub |

## Contact form

The form on `/contact` posts to `/api/contact`.

- **Works with no setup.** Without any configuration the form opens the visitor's email app with the message already written, addressed to `links.email`.
- **Optional: real sending.** To have the message delivered straight to your inbox, create a free [Resend](https://resend.com) account and add these in Vercel (**Settings → Environment Variables**):

  | Variable | Value |
  | --- | --- |
  | `RESEND_API_KEY` | your Resend API key |
  | `CONTACT_TO_EMAIL` | where messages should arrive (defaults to `links.email`) |
  | `CONTACT_FROM_EMAIL` | a sender on a domain you have verified in Resend, e.g. `Portfolio <hello@yourdomain.com>` |

  Redeploy after adding them. Nothing is stored on the server.
- **Spam protection.** A hidden honeypot field, a minimum fill time, and a simple per-visitor rate limit.

The footer's "Say hello" box opens `/contact` with the visitor's email already filled in.

## Where to edit things

Everything on the page lives in **`lib/content.ts`**. Anything you leave empty is simply not shown, so the public page never has unfinished UI.

| What | Where in `lib/content.ts` |
| --- | --- |
| Email | `links.email` (plain address; also the form's fallback and default recipient) |
| LinkedIn | `links.linkedin` (full `https://` URL) |
| X | `links.x` (full `https://` URL; the icon is hidden whenever it is empty) |
| GitHub | `links.github` (full `https://` URL) |
| University | `experience.education.institution` |
| Education dates | `experience.education.period` (currently `2022 – 2028`) |
| Project links | `work.projects[n].href` (adds a link inside the case study; the Nifty 50 paper points to the PDF in `public/papers/`) |
| Roles and companies (Supercore, Tekkloom, internships, research) | `experience.items` (`kind` picks the group; period, role, `type`, `location`, `highlights`, `tags`, optional `href`) |
| Projects | `work.projects` (`group` sets the filter chip, `status` the badge, plus `focus`, `overview`, `worked`, `technology`, `details`) |
| Project filter chips | `work.filters` |
| Research paper PDFs | `public/papers/` |
| Hero career path (dates, positions) | `hero.trajectory` |
| Project images | see below |
| Hero, About, Currently, Contact copy | `hero`, `about`, `currently`, `contact` (form labels live in `contact.form`) |
| Nav items | `navItems` (each links to a page) |
| Scrolling words under the hero | `marquee` |
| About page story, "what I do" and interests | `aboutMore` |
| Outside work (hobbies) | `beyond` (intro and `items`; shown on the About page only) |
| "What building has taught me" | `aboutMore.values` |
| People you look up to | `inspirations.items` (`name`, `why`; hidden while empty) |
| Quotes | `quotes.items` (`text`, `author`; hidden while empty) |

The contact call to action, footer and mobile menu show a link only when its value is filled in.

### Adding real project screenshots

1. Put the image in `public/projects/` (PNG, JPG or WebP; around 10:7 for the research project and 4:3 for the others).
2. In `lib/content.ts`, add to the project:

   ```ts
   image: { src: "/projects/stockiq.png", alt: "StockIQ dashboard" },
   ```

The screenshot replaces the code-drawn concept visual on the card and in the case study.

## Project structure

```
app/            layout, home page, /projects /about /experience /contact pages, /api/contact,
                page transition (template.tsx), global styles and tokens, fonts, icon, OG image, robots, sitemap
components/     page sections (Hero, Work, About, Experience, ...) and small building blocks
components/contact/      the contact form and copy-email button
components/case-study/   the case-study dialog, its provider and focus/scroll behaviour
components/visuals/      code-drawn concept visuals for each project (ProjectVisuals, PosterVisuals)
lib/            content.ts (all copy and links) and social.ts
public/         static assets (project screenshots in public/projects, paper PDFs in public/papers)
```

## Accessibility and performance

- Semantic landmarks and heading order, visible focus states, a skip link
- The case study is a real modal dialog: labelled, focus-trapped, closes on Escape and with the browser Back button, and locks the page behind it
- `prefers-reduced-motion` is respected everywhere: the scrolling words stop, the headline stays still, the drawn path and the ambient glow switch off, and page transitions become instant
- Opening any page from the menu, footer or header starts at the top (`data-scroll-behavior` on the `<html>` element, as Next 16 requires when the page uses smooth scrolling)
- The floating header hides on scroll down and returns on scroll up, near the top of the screen or on keyboard focus; its full-screen menu is a focus-trapped dialog that closes on Escape
- Custom cursor appears only on devices with a mouse and never replaces the cursor elsewhere
- Visuals are inline SVG, so there are no large image downloads

## Notes on the content

Project and experience details come from what Vihaan has shared (LinkedIn, project notes). Client work is described generically and left off by name. A project is marked "Published research" only where a paper exists; the Nifty 50 paper is shown as a research paper without a publication claim.
