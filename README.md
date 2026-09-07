# SAFRA Play — Lunar New Year 2027

Year of the Goat seasonal skin, developed from the existing SAFRA Play prototype.

## Preview

Run `npm ci`, then `npm run dev -- --host 127.0.0.1`. Open the local address printed by Vite. `npm run build` creates the standalone site in `dist/`; `npm run preview` serves that build. The root HTML pages can also be served directly by a static web server.

## Design

Rice-paper cream, vermilion actions, antique gold details and jade accents. Existing paper-cut goat, mountain, blossom and lantern artwork is retained. The 2027 home hero uses accessible HTML text and real links. Shared styling is in `assets/theme.css`; `design-system.html` documents the base palette, typography and components. All fifteen existing screens are included.

## Integration boundary

This repository is a visual and interaction prototype, not the production SAFRA application. Sign-in and OTP are simulated; campaign participation is local browser state; scores, dates, prize details and profile data are illustrative. Confirm campaign rules and connect the existing production authentication, APIs, consent and legal links before release. This push does not deploy to play.safra.sg.

Apply the palette and components to the production templates, preserving its routes, validation and API behavior. The preview strip should be removed only when approved production content and services replace the sample data.

## Verification

With the static site running at port 7102, open a Playwright CLI session and run `playwright-cli run-code --filename=tests/verify.js`. It checks all fifteen pages at desktop and phone widths, images, JavaScript errors and the home CTA, FAQ and memory cards.

## Screenshots

![Desktop theme preview](docs/desktop-preview.png)

[Phone preview](docs/mobile-preview.png)

Validation completed on both the source site and production build: 30 page/viewport checks each, no horizontal page overflow, no broken images, no JavaScript exceptions, plus CTA, accordion and memory-card interaction checks. The inherited Vite 5 development toolchain reports two npm audit advisories; serve development previews on loopback only and update tooling before shared development hosting.
