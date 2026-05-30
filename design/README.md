# Marlo Design System

> A multi-category marketplace. Phones, gadgets, home, fashion, food — Marlo sells everything, and treats every category like it deserves better design than marketplaces usually give.

Marlo is a fictional brand created for this design system. The product is a horizontal e-commerce marketplace (third-party sellers, broad catalog) with a strong electronics/cellphones backbone. The visual language is bolder and warmer than typical marketplace patterns (MercadoLibre, Jumia, Noon) — it borrows their density and utility but applies a real type system, warm cream surfaces, and a single confident accent color instead of rainbow-badge chaos.

## Sources

This design system was built without external references — no codebase, no Figma file, no brand guidelines were provided. Inputs:

- **Brief:** "Design home page of ec website"
- **Category:** Multi-category marketplace
- **Reference:** "cellphones" (interpreted as: electronics-heavy catalog)
- **Brand name:** invented (`Marlo`)
- **Surfaces:** home, PLP, PDP, cart, account, mobile
- **Variations:** 2 of key screens

Everything below — the name, palette, type stack, copy voice — is a designer's reading of the brief. Treat it as a starting point to iterate on, not as documentation of an existing brand.

## Index

- `README.md` — this file (foundations, content, visual rules, iconography)
- `colors_and_type.css` — CSS variables for color and type, plus semantic classes
- `fonts/` — webfont references (currently Google Fonts via @import; flagged below)
- `assets/` — logo, category icons, product placeholders
- `preview/` — design-system tab cards (one per concept)
- `ui_kits/web/` — desktop marketplace kit (home, PLP, PDP, cart, account)
- `ui_kits/mobile/` — mobile app kit (home, PDP, cart, account)
- `SKILL.md` — agent skill manifest

## Content Fundamentals

**Voice:** Direct, warm, slightly cheeky. Marlo is the friend who knows where to find the deal but isn't pushy about it. Confident in the catalog, never in the customer's face.

**Person:** Second person (`you`) for the shopper, first-person plural (`we`) sparingly for Marlo itself. Avoid corporate `our team` or `the platform`.

**Casing:** Sentence case for everything — buttons, headings, nav, badges. Never ALL CAPS except for one-word eyebrow labels (`NEW`, `SALE`) and the wordmark. Title Case only for product names and proper nouns.

**Length:** Short. A hero headline is 3–7 words. A CTA is 1–3 words. Product card subtitles are one line, no ellipsis allowed — write to fit.

**Punctuation:** Periods on full sentences. No periods on buttons, badges, labels, single-line card copy. Em-dashes over semicolons. Oxford commas. Numerals from 1 (not "one apple").

**Numbers & prices:** Always show currency symbol. Discount shown as percentage in a chip (`-23%`), original price struck through next to current. No "From $X" hedging on PDP — show the actual price for the configured variant.

**Tone examples** (Marlo would write these):
- ✅ "New phone day. Trade in yours, save up to $400."
- ✅ "Free returns. Like, actually free."
- ✅ "Sold by Bayside Audio · ships in 2 days"
- ❌ "Unlock incredible savings on our curated selection of premium devices!"
- ❌ "Don't miss out — limited time only!!!" (no fake urgency, no exclamation pile-ups)

**Emoji:** Not used in product UI. Allowed sparingly in marketing email subject lines if it earns its place. Never in nav, never in buttons, never as a replacement for an icon.

**Error & empty states:** Plain, helpful, no apology theater. `Nothing in your cart yet.` not `Oops! Your cart is feeling lonely 😢`.

## Visual Foundations

**Palette philosophy:** Two surfaces (pure white, warm cream), one ink, one confident accent (persimmon `#FF5B2E`). Functional colors (sale red, success green, info blue) exist but are rarely co-located — the eye should only ever track one or two colors per screen.

**Cream is the brand color.** Most of the canvas is `#F6F1E8` (warm off-white) — not pure white. Pure white is reserved for cards, modals, and surfaces that need to read as "elevated content" on the cream.

**Type:**
- **Display: Bricolage Grotesque** (variable; weights 400–800). Wide, modern, with just enough character. Used for h1/h2 and big numeric callouts.
- **UI/Body: Hanken Grotesk** (variable; weights 400–700). Workhorse sans — clean without being neutral-flat.
- **Mono: JetBrains Mono** — used only for prices in tabular contexts (PDP, cart line items) so the digits align.

**Spacing:** 4px base grid. Tokens at `4, 8, 12, 16, 20, 24, 32, 40, 56, 72, 96`. Most layouts use `16` for inner padding, `24` for card gaps, `56–72` for section rhythm. Generous whitespace at top of page; denser as you go down (product grids).

**Backgrounds:**
- The hero is full-bleed photography (`Mix of all` — editorial, product-on-cream, atmospheric) on the warm cream.
- Section backgrounds alternate `cream → white → cream` for rhythm.
- No gradients. No textures. No patterns. Imagery does the work.

**Imagery vibe:** Warm-leaning, naturally lit, slight film grain in editorial shots. Product-only shots on solid cream backgrounds (not white) so they melt into the page. People shots are candid, never stock-photo posed. No bluish corporate stock photography.

**Animation:** Subtle. 150ms cubic-bezier(0.2, 0.8, 0.2, 1) for hovers and toggles. 220ms for modals. No bounces. No springs. Carousels translate, they don't fade. Skeletons pulse at 1.4s. Page transitions are instant (it's a marketplace — speed > polish).

**Hover states:**
- Buttons: 4% darken on the fill (`#FF5B2E → #E84A1E`).
- Product cards: slight `translateY(-2px)` and shadow elevation `sm → md`. No scale.
- Links: underline appears (no color shift).
- Icon buttons: background pill (`bg-cream`) fades in.

**Press states:** 95% scale on the pressed element for 80ms, color holds. Provides physical feedback without a color change.

**Borders:** Hairline `1px solid #E6DFD4` (warm border) on cards, dividers, inputs. Never use `#000` borders. Border radius scale: `4, 8, 12, 16, 24, 999`. Cards = `12`. Buttons = `8`. Inputs = `8`. Pills/chips = `999`. Image containers in cards = `8` (matches button rhythm).

**Shadows:** Three levels, all warm-tinted (slightly orange-shifted):
- `sm`: `0 1px 2px rgba(20, 18, 16, 0.04), 0 1px 3px rgba(20, 18, 16, 0.06)`
- `md`: `0 4px 8px rgba(20, 18, 16, 0.06), 0 8px 24px rgba(20, 18, 16, 0.08)`
- `lg`: `0 8px 16px rgba(20, 18, 16, 0.08), 0 24px 48px rgba(20, 18, 16, 0.12)`
- No inner shadows. No glow effects.

**Cards:** White background (`#FFFFFF`) on cream canvas, `1px` warm border, `radius: 12`, `shadow: none` at rest, `shadow: sm` on hover. Image area inset by `8px` from card edge, radius `8` so it nests visibly.

**Transparency / blur:** Used in two places only:
1. The sticky header gets `backdrop-filter: blur(12px)` and `background: rgba(246, 241, 232, 0.85)` on scroll.
2. PDP image overlay (when zoomed) has a `rgba(20, 18, 16, 0.6)` scrim.
Nowhere else. No frosted glass cards. No translucent surfaces.

**Layout rules:**
- Fixed header (64px tall on desktop, 56px on mobile).
- Max content width: `1280px` for product pages, `1440px` for marketing.
- Side gutters: `24px` mobile, `48px` tablet, `64px` desktop.
- Product grid: 5 columns desktop (≥1280), 4 columns laptop (≥1024), 3 columns tablet, 2 columns mobile.

**Use of color in imagery:** Product photography is warm-leaning, never cool. Black-and-white reserved for editorial moments (collection landings). Never desaturated stock photos.

## Iconography

See `assets/icons/` for the icon set. Marlo uses **Lucide** (linked from CDN) — 24px outlined, 1.5px stroke, rounded line caps and joins. This is the closest match to a clean, friendly, marketplace-appropriate set. Stroke weight stays constant across sizes (we scale via `width`/`height`, not by changing stroke).

**When to use what:**
- Primary navigation, buttons, inline UI → Lucide icons at `20px` or `24px`.
- Category nav (top of homepage) → custom illustrative icons in `assets/icons/categories/` — these are flat color-block illustrations (not line icons) so they feel different from utility icons.
- Brand mark / logo → `assets/marlo-logo.svg`.

**Emoji:** Never in product UI.

**Unicode chars as icons:** Avoid. Use Lucide. The only exception is `→` in inline copy ("Shop new arrivals →") which reads as a typographic cue, not an icon.

**Fonts as icons:** Not used.

**Substitution flagged:** Lucide is a stand-in for what would be a custom Marlo icon set in production. Flag for the user.

## Caveats & substitutions

- **Fonts:** Bricolage Grotesque and Hanken Grotesk are loaded from Google Fonts (no `.ttf` files included). If Marlo had a custom typeface, replace the `@import` in `colors_and_type.css` and drop the files in `fonts/`.
- **Icons:** Lucide via CDN, flagged above.
- **Imagery:** Real product photography is replaced with solid-color placeholder tiles in `assets/placeholders/`. Swap these with real shots before any real use.
- **Logo:** Wordmark only — a real Marlo would need a proper mark too.
