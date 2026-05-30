# Marlo — Web UI Kit

Marketplace web kit. 5 connected pages plus shared chrome.

## Run

Open `index.html`. Navigate using the header, category tiles, or the **Tweaks** panel (bottom-right).

## Pages

| Page | File | Notes |
|---|---|---|
| Home | `Homepage.jsx` | Hero (2 variants via tweaks), category strip, deal rows, editorial pair, trust strip |
| Listing | `ListingPage.jsx` | Filter sidebar, sort, active chips, 4-col product grid |
| Detail | `DetailPage.jsx` | Gallery, variant swatches, qty stepper, tabbed content, reviews summary, related |
| Cart | `CartPage.jsx` | Line items grouped by seller, summary panel, recommendations |
| Account | `AccountPage.jsx` | Sidebar nav, orders, addresses, payment, saved items, settings |

## Shared components (`Marlo.jsx`)

`Logo`, `Icon`, `Button`, `Badge`, `Price`, `Stars`, `IconButton`, `Header`, `Footer`.

## Data (`ProductData.jsx`)

10 mock products, 8 categories. `ProductCard` component lives here.

## Tweaks

- **Hero variant** — Editorial (full-bleed dark, big quote) vs Products (cream split, product-forward)
- **Jump to page** — quick navigation between the 5 routes
