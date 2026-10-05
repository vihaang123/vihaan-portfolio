# Final checklist

Ticked items were verified on the production build (`npm run build` then `npm run start`) and on a clean extract of the final ZIP.
Unticked items need you.

## Build and quality

- [x] `npm install` works
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] `npm run start` works
- [x] No console errors (checked at every size below)
- [x] No placeholder text on the rendered page

## Behaviour

- [x] All navigation works (nav links to /projects /about /experience /contact, footer links, scroll cue, page transitions)
- [x] Every tab change starts at the top of the page (menu, header and footer links)
- [x] Floating header: no clock; hides on scroll down, returns on scroll up; mobile and desktop menu opens, Escape closes, focus trap, scroll lock, focus returns to the menu button
- [x] Project interactions work (hover, case study opens for the new projects, Escape / Back / Close all close it, focus returns to the card, next project works)
- [x] Project filter chips work (Research 2, Products 5, Data & ML 3, All 10) and `/projects#project-<id>` links land on the project
- [x] Contact links render and open correctly once filled in (checked with sample values, then removed)
- [x] Contact form: validation messages, focus on first error, fallback to email app, honeypot and rate limit (checked against the running server)
- [ ] Contact form real delivery through Resend (needs your API key; not testable here)
- [x] Reduced motion works
- [x] Keyboard navigation works (skip link, case study dialog, menu)

## Responsive (no horizontal overflow, headline fits, dialog works)

- [x] 320px
- [x] 375px
- [x] 390px
- [x] 430px
- [x] Tablet (768px)
- [x] Desktop (1024px, 1280px, 1440px, 1920px)

## Content you need to fill in (`lib/content.ts`)

Empty values are hidden on the public page, so the site is safe to deploy as is.

- [x] `links.email` (set to vihaan1261@gmail.com; change it if you want a different public address)
- [x] `links.linkedin` (set)
- [x] `links.github` (set to github.com/vihaang123, matched to your name)
- [x] `experience.education.period` (2022 – 2028)
- [x] Experience, skills and projects added from your LinkedIn screenshots and project notes
- [ ] Supercore: LinkedIn says "Founder", the site says "Co-founder" (your earlier answer). Change `experience.items` if you want them to match
- [x] Nifty 50 paper attached as a PDF (`public/papers/`) and linked from its case study; co-authors taken from the paper (Jash Visaria, Calvin Dsouza)
- [x] Crime forecasting team (Jash Vakharia) and Nifty paper co-author (Jash Visaria) are two different people, confirmed
- [x] `links.x` (set to x.com/vihaan1261)
- [ ] LinkedIn lists 4 languages; only English and French were visible, so no languages section is shown
- [ ] Optional: add `RESEND_API_KEY` (and `CONTACT_FROM_EMAIL`) in Vercel so contact messages arrive in your inbox; without them the form opens the visitor's email app
- [ ] Confirm `experience.education.institution` (taken from your project slides: NMIMS, MPSTME)
- [ ] `crime-forecasting` project `href`: link to the published paper (shows a "Read the paper" link)
- [x] About page: Outside work (hobbies) and "What building has taught me" added from your own words
- [ ] About page: people you look up to (`inspirations.items`) and quotes (`quotes.items`). Each section is hidden until it has entries, so nothing is invented
- [x] Skills: the ten skills on your LinkedIn skills page are in Capabilities (alongside the project-based ones already there)
- [ ] Other project links, roles and screenshots (optional, when you have them). Only Tekkloom Tools has a link so far

## Packaging and deployment

- [x] Fonts: Bricolage Grotesque is included with its OFL licence
- [x] No secrets or `.env` files
- [x] No `node_modules` in the ZIP
- [x] No `.next` in the ZIP
- [x] Vercel deployment ready (push to GitHub, import, deploy)
