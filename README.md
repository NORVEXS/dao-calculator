<div align="center">

# DAo Calculator

### Overcast Daylight Autonomy from the Daylight Factor

A premium, scientific web tool that converts the static **Daylight Factor (DF)**
into the dynamic **Overcast Daylight Autonomy (DAo)** and **Continuous Overcast
Daylight Autonomy (DAo.con)** metrics — for single points, vertical sections and
full floor‑plan matrices, with heatmaps and response curves.

Built on the University of Seville method by **I. Acosta & M. A. Campano**, and
validated to **0.000 % error** against the reference workbook.

</div>

---

## Objective

Daylight performance is usually measured with the **Daylight Factor (DF)** — a
single static number. It is easy to compute but hard to interpret: "is a DF of
2.5 % good?". Dynamic metrics like **Daylight Autonomy** answer that question
("what fraction of occupied time do I have enough daylight?") but normally
require a full annual climate simulation.

This project bridges the two. It reproduces the peer‑reviewed method that links
DF to a dynamic metric under the worst‑case **CIE overcast sky**, and wraps it in
an interface that makes the result instant, visual and understandable even for
non‑technical users.

- **DAo** — the percentage of occupied time a point stays at or above the target
  illuminance (typically 300 lx) under overcast skies.
- **DAo.con** — the same idea, but partial daylight is credited proportionally
  (a point at 150 lx against a 300 lx target counts as 0.5 instead of 0).

## The method

For every 15‑minute step of the occupied year the tool builds a chain:

| Step | Quantity | Expression |
| ---- | -------- | ---------- |
| 1 | Solar declination | `δ = asin(0.4 · sin((day − ref) · 360 / 365.2422))` |
| 2 | Equation of time + DST | solar‑time correction of clock time |
| 3 | Hour angle | `H = (solarTime − 0.5) · 360°` |
| 4 | Solar elevation | `γ = asin(sinδ·sinφ + cosδ·cosφ·cosH)` |
| 5 | Exterior illuminance | `E_ext = (7/9)·π·(100 + 7580·sin γ^1.36)` lux (0 if γ<0) |
| 6 | Interior illuminance | `E_int = E_ext · DF/100` |
| 7 | DAo | occupied steps with `E_int ≥ threshold` ÷ total occupied steps |
| 8 | DAo.con | mean of `min(E_int / threshold, 1)` over occupied steps |

The occupied set is every step in `[check‑in, check‑out)` across the 260 model
weekdays, excluding the optional lunch break. Because `E_ext` depends only on
location and schedule (never on DF), it is sampled once per parameter set and
reused for every DF — making curves and large matrices effectively instant.

The implementation lives in [`src/lib/scientific`](src/lib/scientific) and is
covered by a parity test against the 20 reference points of the original
workbook ([`dao.test.ts`](src/lib/scientific/dao.test.ts)).

## Features

- **Three calculation modes**
  - **Single point** — one DF → DAo and DAo.con, with a live response curve.
  - **Vertical section** — an editable list of points (DF vs. depth) plotted as a
    profile and a depth‑colored strip.
  - **Plan matrix** — an Excel‑like editable DF grid whose cells are tinted by
    their DAo as you type, plus a heatmap and area‑coverage statistics.
- **Scientific visualizations** — radial metric gauges, DF→DAo response curves,
  section profiles and a perceptual daylight heatmap with a color legend.
- **Adjustable model** — latitude, longitude, time zone, daylight saving,
  occupancy schedule, lunch break, weekend exclusion and illuminance threshold,
  all with inline explanations.
- **Export** — CSV for every mode and JSON for the matrix.
- **Polish** — elegant dark/light themes, smooth micro‑animations, responsive
  layout, tabular figures and technical SEO.

## Tech stack

| Area | Choice |
| ---- | ------ |
| Framework | **Next.js (App Router)** + React 19 |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS v4** |
| UI primitives | **shadcn/ui** (Base UI) |
| Animation | **Framer Motion** |
| Charts | **Recharts** + custom SVG/CSS widgets |
| State | **Zustand** |
| Tests | **Vitest** |

## Project structure

```
src/
├── app/                     # Routes, layout, metadata, sitemap, robots
│   ├── page.tsx             # Landing page
│   └── calculator/          # Dashboard route
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   ├── landing/             # Hero and marketing sections
│   ├── layout/              # Header, footer
│   ├── scientific/          # Metric gauge, animated number
│   └── calculator/          # Dashboard, parameters panel, the 3 modes
├── charts/                  # Response curve, section profile, heatmap
├── lib/
│   ├── scientific/          # ★ Validated DF→DAo model (solar, dao, constants)
│   ├── colormap.ts          # Daylight color scale + classification
│   ├── export.ts            # CSV / JSON / image download helpers
│   └── format.ts            # Number / time formatting
├── hooks/                   # use-dao (memoized engine wrappers)
└── store/                   # Zustand calculator store
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (type‑checked) |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with ESLint |
| `npm run test` | Run the test suite (watch) |
| `npm run test:run` | Run the test suite once |

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deployment

The app is a standard Next.js project and deploys to **Vercel** with zero
configuration: import the repository on Vercel and it builds automatically. No
environment variables are required — all computation runs in the browser.

## References

The calculation method is based on:

1. Acosta, I.; Campano, M. A.; Domínguez‑Amarillo, S.; Fernández‑Agüera, J.
   (2019). *Overcast Daylight Autonomy: A new concept to link daylight dynamic
   metrics with daylight factors.* LEUKOS 15 (4), 254–269.
2. Campano, M. A.; Acosta, I.; Domínguez, S.; López‑Lovillo, R. (2022).
   *Dynamic analysis of office lighting smart controls management based on user
   requirements.* Automation in Construction 133, 104021.
3. Acosta, I.; Campano, M. A.; Domínguez‑Amarillo, S.; Navarro, J. (2023).
   *Continuous Overcast Daylight Autonomy (DAo.con): A New Dynamic Metric for
   Sensor‑Less Lighting Smart Controls.* LEUKOS 19 (3), 343–367.

## Credits

Calculation method © I. Acosta & M. A. Campano, University of Seville.
This is an independent web reimplementation of their public spreadsheet tool.
