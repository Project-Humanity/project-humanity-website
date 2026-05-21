# Project Humanity. Website Build Brief.

You are building the landing page for **Project Humanity**, an open source community whose mission is to help build things that make people's lives better, in the open, without paywalls.

The site has one job: **convert visitors into community members.** The primary CTAs are Discord, WhatsApp broadcast, and social follows.

Before you start, read `AGENTS.md` and `CLAUDE.md` in the repo root. They contain Next.js's official guidance for AI coding agents. Follow them.

---

## Stack

Use what's already scaffolded by `create-next-app`:

- Next.js 16.2 (App Router, Turbopack as default bundler, no flag needed)
- React 19.2
- TypeScript
- Tailwind CSS
- ESLint

Add:

- `motion` (the renamed Framer Motion). Import from `motion/react`.
- `lenis` for smooth scroll.
- `geist` (font package).

```bash
pnpm add motion lenis geist
```

Optionally enable React Compiler 1.0 in `next.config.ts` for auto-memoization. It is stable in Next 16.

---

## Voice and tone

The brand voice is **direct, earnest, slightly defiant, and human.** Not corporate. Not a startup pitch. The audience is broad: students, teachers, developers, designers, researchers, hobbyists. Anyone curious.

Reference the manifesto copy at the bottom of this brief. That is the source of truth for tone.

---

## Aesthetic direction

**Warm editorial, light theme.** Think: a printed manifesto crossed with a modern product page. Considered. Slightly literary. Confident but warm. Closer to a New Yorker essay layout than a SaaS landing page.

Why this direction: dark mode is the default for indie/community sites. A warm light theme reads as more intentional and feels more human, which matches the brand voice.

### Color tokens (set as CSS variables and Tailwind theme extensions)

```
--paper:      #F4EDDF   /* background */
--paper-2:    #EBE2CC   /* alternating section bg */
--ink:        #1A1716   /* primary text */
--ink-soft:   #4A4339   /* muted text */
--ember:      #C84B31   /* primary accent, used sparingly */
--rule:       #D6C9A8   /* hairlines, borders */
```

### Typography

- **Display:** Fraunces (variable, via `next/font/google`). Use opsz 144 for hero, lower for subheads. Lean on its character (slight wonk axis).
- **Body:** Geist Sans (via `geist/font/sans`). 
- Do **not** use Inter, DM Sans, or Space Grotesk. They are overused in AI-generated sites.

Sizing:
- Hero headline: 96 to 128px desktop, 56 to 72px mobile. Line height 0.95 to 1.0. Tracking slightly tight.
- Section H2: 56 to 72px desktop.
- Body: 18px base. 1.65 line height. Max width 62ch for readability.

### Texture

- Subtle SVG grain overlay across the page. 3 to 5% opacity, `mix-blend-mode: multiply`.
- Hairline rules (1px, `--rule`) between sections. No heavy dividers.

### Motion principles

- Use `motion/react` for all animations.
- Hero: staggered word-by-word reveal on page load. Blur(8px → 0) + Y(20px → 0) + opacity. ~70ms between words.
- Scroll-triggered reveals: short fade + 8 to 12px Y translation. Use `whileInView` with `once: true`.
- One slow marquee strip between sections. Pause on hover.
- Hover states: subtle scale (1.02) + color shift on accent. No big movement.
- **Respect `useReducedMotion`.** Cut transitions to <100ms for those users.
- Animate sparingly. Most elements should sit still. Animation is the exception.

---

## Sections (in order)

### 1. Top nav (fixed)

- Logo left: "Project **Humanity**" in Fraunces, with "Humanity" in italic.
- Right: one button labelled "Join us" that scrolls to the final CTA section.
- Background: transparent on load, blurred `--paper` after 80px scroll.
- Mobile: hide the CTA button, keep the logo.

### 2. Hero (full viewport height)

Layout: text-only, left-aligned, generous whitespace. No imagery, no illustration.

**Eyebrow** (small caps, `--ember`, letter-spacing 0.15em):
```
PROJECT HUMANITY
```

**Headline** (Fraunces, huge, 3 lines on desktop):
```
Building things that
make life better.
In the open.
```

**Subline** (body, ink-soft, max-width 50ch):
```
An open source community for people who want to build something worth being part of.
```

**Tagline** (small, italic, ember):
```
Out here for everyone.
```

Bottom of viewport: a thin hairline scroll cue. No bouncing arrows.

**Page-load animation:** Each line of the headline reveals word-by-word with blur+Y+opacity stagger, 70ms apart per word. Eyebrow appears first, then headline, then subline, then tagline. Total reveal under 1.5s.

### 3. Marquee strip

Slow horizontal scrolling band. Background `--paper-2` with hairline rules above and below. Items in Fraunces italic, separated by small `--ember` dots:

```
Built openly  •  No paywalls  •  No gatekeeping  •  No résumés  •  Built for keeps  •  By us, for us
```

Loop speed: roughly 60 seconds per full cycle. Pause on hover.

### 4. What this is

Two-column layout on desktop (H2 left, prose right), stacked on mobile.

H2: `What this is`

Body (use the manifesto's opening two paragraphs):

> Project Humanity is an **open source community** with one mission. We want to push the horizons of humanity forward, and to help people live their best lives *in this lifetime* instead of dreaming about existing in another one.
>
> The idea is pretty simple. The future arrives faster when humans build things together, out in the open. A lot of the tools that could genuinely change someone's life are sitting **behind a paywall**. A lot of the people who could build them don't think they're allowed to. We want to close that gap.

### 5. What we'll be building

This is the visual showcase moment. Domains should feel like landmarks.

H2: `What we'll be building`

Intro line:
> This isn't only a tech community. The projects we run will eventually live in all kinds of spaces.

**Domain showcase** (vertically stacked, one per line, 72 to 96px Fraunces, ink color):

```
Medical
Space
Finance
Education
Climate
And a lot more
```

Each domain slides in from left with stagger as it enters viewport. To the right of each, a 1px `--ember` accent line grows from 0 to ~60px width on scroll-in.

Closing line:
> We'll have multiple projects going on at the same time, in different fields, with different teams behind each. *Slowly and surely*, this gets us to a place where the work actually starts paying off in people's lives.

### 6. Who we want here

Lighter visual treatment. Two-column like section 4.

H2: `Who we want here`

Body (bold the role names inline):

> All of you. **Students**, **teachers**, **developers**, **designers**, **researchers**, and people who just like tinkering with stuff. Whatever your field is, whatever your experience level is, whatever your goals are, you are welcome.
>
> You don't need a resume. You don't need an interview. You don't need permission. *Just show up, find something that interests you, and get started.*

### 7. What we won't do

Strong visual moment. Use larger body type (24px). Background switches to `--paper-2`.

H2: `What we won't do`

Body:

> We are not going to put our work behind a paywall while people are struggling to make ends meet. **That's basically the whole point.**
>
> If a company later wants to build something on top of what we've made, that's a good thing and we are happy about it. But we don't plan on stopping any time soon, and we are not interested in selling out. *The mission isn't a stepping stone to something else.*

### 8. How this will work

H2: `How this will work`

Intro:
> There is going to be a structure, and everything about it will be open to the public.

Below it, four rule rows separated by hairline rules. Each row has a numeric label on the left (mono or small-caps, `--ember`) and the rule body on the right.

```
01 /   Anyone can propose a project.
       If enough people back the idea, it gets moving.

02 /   Decisions are discussed and voted on, openly.
       No closed rooms.

03 /   Roles are flexible.
       Lead a team, write code, design, document, mentor, organize meetups,
       or do something else entirely.

04 /   Don't see what you want to do?
       Tell us. We'll figure it out together.
```

Closing line below the rows:
> We are early on, so the incentives and perks we can offer right now are limited. What we can offer is meaningful work, alongside people who actually care.

### 9. You're building for you too

Quieter section. Centered. Background back to `--paper`.

H2 (smaller, almost a label): `And one more thing`

Body (28px, italic Fraunces, ink):

> You're building for you too. You are part of whatever we make, in whatever capacity you contributed. You get to be involved in something you can hopefully feel proud of. When the work starts paying off, you *reap the benefits, as you should.*

### 10. Join CTA section (the conversion moment)

This is the most important section. Build it to feel like an invitation.

H2 (Fraunces, large):
```
If this sounds like 
the right thing.
```

Subhead:
```
Come find us. Pick the door that fits.
```

Then a 3-card grid (1 column on mobile):

**Card 1. Talk to us (Discord)**
- Label: "Talk to us"
- Body: "Real-time chat. Where projects happen."
- CTA: "Open Discord →"
- Link: `DISCORD_URL` placeholder

**Card 2. Get updates (WhatsApp)**
- Label: "Get updates"
- Body: "Quiet broadcast list. Announcements only, no chatter."
- CTA: "Join broadcast →"
- Link: `WHATSAPP_URL` placeholder

**Card 3. Follow along (Socials)**
- Label: "Follow along"
- Body: "YouTube, X, and wherever else you live online."
- CTAs: small icon buttons for YouTube, X, GitHub
- Links: `YOUTUBE_URL`, `TWITTER_URL`, `GITHUB_URL` placeholders

Card styling: `--paper-2` background, 1px `--rule` border, `--ember` accent on hover, subtle lift (translateY(-2px)) on hover. No drop shadows.

Below the cards, in italic small text:
> Or just lurk for a while. That's fine too.

### 11. Footer

Minimal. One hairline rule above.

- Left: "Project Humanity" wordmark.
- Right: "Open source, always." (italic, `--ink-soft`).

---

## File structure

```
app/
  layout.tsx              // load fonts, Lenis wrapper, grain overlay
  page.tsx                // assembles sections
  globals.css             // CSS vars, grain SVG data URL
components/
  Nav.tsx
  Hero.tsx
  Marquee.tsx
  Section.tsx             // reusable scroll-reveal wrapper with optional two-column
  DomainShowcase.tsx
  WontDo.tsx
  HowItWorks.tsx          // the 01/02/03/04 rows
  Quiet.tsx               // "And one more thing"
  JoinCards.tsx
  Footer.tsx
lib/
  motion.ts               // shared variants and transition presets
  links.ts                // placeholder URLs for socials
content/
  manifesto.md            // full manifesto for reference
```

---

## Don't list

To avoid generic AI output:

1. **No em dashes.** Anywhere. Use periods, commas, or restructure.
2. **No Inter, DM Sans, or Space Grotesk.** Those are the AI default fonts.
3. **No purple gradients.** No blue-to-purple anything.
4. **No fake credibility blocks.** No "trusted by", no logo strips, no fake testimonials, no fake user counts.
5. **No marketing tropes.** Never use the words "revolutionizing", "unlocking", "empowering", "next-generation", "elevate", "transform".
6. **No triadic flourishes in copy.** No "Where X meets Y". No "X. Y. Z." cadences.
7. **No animated-everything.** Most elements sit still. Animation is the exception.
8. **No drop shadows on cards.** Use hairline borders and subtle lift on hover.
9. **No icon font libraries.** Use Lucide React or inline SVG.
10. **No skeleton loaders or fake loading states.** The site is static.

---

## Accessibility and performance targets

- Lighthouse: 95+ on Performance, Accessibility, Best Practices, SEO.
- All animations respect `useReducedMotion`.
- Keyboard accessible: every CTA, every nav item.
- Focus rings visible (1.5px `--ember`).
- Color contrast WCAG AA minimum, AAA on body copy.
- `next/font` for both font families.
- No blocking third-party scripts.

---

## Mobile rules

- Single column under 768px.
- Hero headline drops to 56 to 72px.
- Marquee stays full-width.
- Domain showcase: type scales to 48 to 56px, accent line shortens.
- Join cards stack with full-width tap targets.
- Nav CTA hides. Logo stays.
- 48px minimum tap target on all buttons.

---

## Build order

1. Tailwind config: extend theme with color tokens and font families.
2. `app/layout.tsx`: load Fraunces and Geist via `next/font`, add Lenis wrapper, add grain overlay.
3. `Hero.tsx` with page-load reveal (this is the moment that sells the whole aesthetic, polish it first).
4. `Marquee.tsx`.
5. `Section.tsx` wrapper with `whileInView` reveal logic. Use it for sections 4, 6, 7, 9.
6. `DomainShowcase.tsx` and `HowItWorks.tsx` (the two distinctive sections).
7. `JoinCards.tsx`.
8. `Footer.tsx`, `Nav.tsx`.
9. Pass over the whole page for spacing, type sizes, motion timing.

---

## Manifesto (source of truth for all copy)

Save this to `content/manifesto.md`:

```markdown
# Project Humanity

## What this is

Project Humanity is an open source community with one mission. We want to push the horizons of humanity forward, and to help people live their best lives in this lifetime instead of dreaming about existing in another one.

The idea is pretty simple. The future arrives faster when humans build things together, out in the open. A lot of the tools that could genuinely change someone's life are sitting behind a paywall. A lot of the people who could build them don't think they're allowed to. We want to close that gap.

## Who we want here

All of you. Students, teachers, developers, designers, researchers, and people who just like tinkering with stuff. Whatever your field is, whatever your experience level is, whatever your goals are, you are welcome.

You don't need a resume. You don't need an interview. You don't need permission. Just show up, find something that interests you, and get started.

## What we'll be building

This isn't only a tech community. The projects we run will eventually live in all kinds of spaces. Medical. Space. Finance. Education. Climate. And a lot more. Anywhere there are problems worth solving for people, there is room for a project.

We'll have multiple projects going on at the same time, in different fields, with different teams behind each. Slowly and surely, this gets us to a place where the work actually starts paying off in people's lives.

## What we won't do

We are not going to put our work behind a paywall while people are struggling to make ends meet. That's basically the whole point.

If a company later wants to build something on top of what we've made, that's a good thing and we are happy about it. But we don't plan on stopping any time soon, and we are not interested in selling out. The mission isn't a stepping stone to something else.

## How this will work

There is going to be a structure, and everything about it will be open to the public.

- Anyone can propose a project. If enough people back the idea, it gets moving.
- Decisions are discussed and voted on, openly. No closed rooms.
- Roles are flexible. You can lead a team, write code, design, document things, mentor, organize meetups, or do something else entirely.
- If you want to contribute in a way we haven't built a place for yet, just tell us. We'll figure it out together.

We are early on, so the incentives and perks we can offer right now are limited. What we can offer is meaningful work, alongside people who actually care.

## If you're reading this and wondering

If you're looking for something worth putting your time toward, even just a few hours a week, try this one. Pick a project. Work on the part of it that excites you. See if it gives you back what you put in.

A lot of the things people now take for granted started somewhere like this. On the side. No guarantees, no big launch, just people who decided to start.

One more thing worth saying. You're building for you too. You are part of whatever we make, in whatever capacity you contributed in. You get to be involved in something you can hopefully feel proud of. When the work starts paying off, you reap the benefits, as you should.

We are out here for humanity, above anything else. If that sounds right to you, come find us.
```

---

## Final note

When in doubt about a design choice, ask: **would this feel out of place printed in a literary magazine?** If yes, simplify. If no, ship it.
