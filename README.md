# Flipdish Calculators

A hosted hub of Business Value Assessment (BVA) calculators for Flipdish commercial teams. Replaces the legacy collection of Google Sheets with single-purpose, mobile-friendly web calculators that reps can use solo, share with prospects, or run live in a sales conversation.

**Live site:** https://flipdish-calculators.vercel.app/

## Structure

```
/                    → Landing page (hub of all calculators)
/kiosk/              → Kiosk ROI calculator
/online-ordering/    → Online Ordering — Flipdish vs Marketplaces
```

More calculators are being added — see the landing page for the current list and status (Live / Coming soon).

## External vs internal

- **External calculators** are listed on the landing page and are safe to share with prospects.
- **Internal calculators** (Country Manager pricing tools etc.) will live under `/internal/` and will be password-protected once the project moves to the Flipdish enterprise Vercel account.

## How to update a calculator

Each calculator is a single self-contained `index.html` file (HTML + CSS + JavaScript inline, no build step). To make a change:

1. Edit the relevant `index.html` directly in GitHub or locally
2. Commit the change
3. Vercel automatically redeploys within ~30 seconds

## Design system

All calculators share a consistent look and feel:

- **Fonts:** Domine (headers), Roboto (body)
- **Colours:** Science Blue `#0074D9`, Venice Blue `#064885`
- **Layout:** mobile-first, tile-based result cards, transparent assumptions
- **Pattern:** inputs on the left, hero result + detail tiles on the right

## Owner

Will Foulkes — Head of Commercial Enablement, Flipdish.
