---
name: marlo-design
description: Use this skill to generate well-branded interfaces and assets for Marlo, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files. The system is organized as:

- `README.md` — brand context, content rules, visual foundations, iconography
- `colors_and_type.css` — CSS variables for the full token system and semantic element styles
- `assets/` — logo (light + dark + mark), category illustrations, product placeholders, hero imagery
- `preview/` — small standalone HTML cards demonstrating each part of the system (good reference for what "looks right")
- `ui_kits/web/` — desktop marketplace kit: home, listing, detail, cart, account (interactive prototype)
- `ui_kits/mobile/` — mobile iOS kit: home, detail, cart, account (4 screens in device frames)

Marlo is a fictional multi-category marketplace with an electronics-forward catalog. The visual language: warm cream canvas (`#F6F1E8`), single persimmon brand color (`#FF5B2E`), Bricolage Grotesque for display, Hanken Grotesk for UI, JetBrains Mono for prices. Bold but designed — not the cluttered rainbow-badge look of typical marketplaces.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. The React components in `ui_kits/` are good reference — copy them directly when building new marketplace surfaces. Load `colors_and_type.css` first; never invent new colors or fonts.

If working on production code, use `colors_and_type.css` as the token source. Map the CSS vars into your design-token system (Tailwind theme, Style Dictionary, etc.) rather than copying hex values around.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (audience, surface, variation count), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
