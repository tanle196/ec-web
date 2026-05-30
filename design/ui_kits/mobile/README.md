# Marlo — Mobile UI Kit

4 mobile screens, shown side-by-side in iOS device frames.

## Run

Open `index.html`. The screens are static for this kit — they demonstrate the visual language and information architecture, not full interactivity. The web kit (`../web/index.html`) handles the full click-through prototype.

## Screens

| Screen | Component | Notes |
|---|---|---|
| Home | `MobileHome` | Logo header, search, hero card, category grid, deals carousel, picked-for-you grid, tab bar |
| Detail | `MobileDetail` | Hero image carousel, sticky bottom add-to-cart bar, variant selectors |
| Cart | `MobileCart` | Items grouped by seller, summary card, sticky checkout button |
| Account | `MobileAccount` | Profile header, recent orders, settings list, tab bar |

## Shared

- `MobileHeader` — top bar with logo or back button, heart, cart
- `MobileTabBar` — 5-item bottom tab bar (Home, Browse, Saved, Cart, You)

Reuses `Icon`, `Button`, `Badge` from `../web/Marlo.jsx` and product data from `../web/ProductData.jsx`. The iOS frame is the `ios_frame.jsx` starter component.
