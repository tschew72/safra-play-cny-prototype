# Reference screen verification — 7 September 2026

The thirteen supplied references are mapped to home, campaigns, campaign join,
campaign joined, leaderboard, profile, FAQ, sign-in, wave 1, quiz, game intro,
round briefing and memory match. Original images are preserved in assets/references.

## Fresh verification

- Production build: `npm run build` passed.
- Whitespace/conflict check: `git diff --check` passed.
- In-app browser: all 13 reference routes at 2048 × 1152 and 390 × 844,
  plus all 15 routes at 1440 × 900; no horizontal page overflow or failed images.
- Browser error/warning log returned no entries during the interaction checks.
- Campaign filter: Ended hides both active cards; All Campaigns restores them.
- FAQ: opening Price closes Prize and updates aria-expanded correctly.
- Join Campaign opens the joined screen; Start opens Wave 1.
- Three correct quiz answers reach Briefing Complete and unlock Memory Match.
- Story Next updates the page count and reaches Guided Recall after four slides.
- Play Now reaches a 16-card board; a card click flips it.
- Home Play Now reaches sign-in; email, consent checkboxes and six code fields
  can be used, and the simulated Verify action returns home.

## Scope and visual limits

These are functional reference-based layouts, not a claim of pixel identity.
Typography, paper texture and some decorative borders are browser-rendered
approximations. Mobile layouts reflow the desktop compositions. The initial
memory board starts face-down; the reference depicts cards during play.
Illustrated banners retain the reference's baked-in copy and sample dates.
Profile, standings, authentication and prizes remain prototype content;
no production SAFRA services are connected or deployed by this revision.

## Home-page follow-up — leaderboard and prizes

Extended the reference theme into the lower home page with the mountain podium,
a semantic standings table, red-and-gold voucher panel, and numbered redemption
steps. The campaign preview now keeps three compact columns at tablet widths.
Verified the built home page at 390, 986, 1440 and 2048 pixels: no page overflow,
failed images or browser warnings/errors; podium artwork matches its container
width. Full Leaderboard and Open Prize Wallet navigate to the expected pages.
Production build and whitespace checks passed.

### Home FAQ and festive invitation — 7 September 2026

- Matched the FAQ reference with its goat and blossom artwork, an illustrated introduction, red category labels, gold rules, and an initially expanded prize answer.
- Replaced the generic CTA clouds with reference blossom, cloud, firework, and jade mountain artwork while keeping the heading and sign-in action as HTML.
- Checked rendered layouts at 390, 986, and 1440 pixels wide. No horizontal overflow or failed images; no browser errors or warnings in the final review.
- Confirmed the Price question opens and closes the Prize answer, with matching aria-expanded values. View All FAQs opens faq.html; Sign In Free opens signin.html.
- Production build passed. Desktop evidence: home-faq-banner-preview.png.
