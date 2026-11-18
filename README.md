# Haus & Haus — Floating Property Consultant Demo

A compact, embeddable-style floating chat widget concept. This preview page exists only to demonstrate the widget; it is not a replacement property website.

## Included
- Fixed bottom-right launcher and compact chat panel
- Panel remains fixed while the host page scrolls
- Close/minimise behaviour; launcher remains visible
- Guided buy / rent / invest qualification
- Budget-aware sample sale cards in a horizontally swipeable rail
- Links to public Haus & Haus listing pages
- Separate honest handling for rental and investment enquiries (no false sale-property matches)

## Property data and image limitation
Listing titles, prices, locations, bedroom counts and listing URLs in this prototype are hard-coded examples based on public Haus & Haus listing pages checked during development. They are not a live feed; prices and availability can change.

The photos shown on sale cards are clearly labelled **illustrative photos**. They are not the actual listing photographs. For a client-ready version, obtain permission and a feed/API or approved image URLs from Haus & Haus.

## AI and lead delivery limitations
- The assistant uses scripted demo logic; no AI model is connected.
- No live property search, CRM, WhatsApp, booking calendar, or lead delivery is connected.
- Rental and investment journeys collect a brief in the demo but do not return live inventory or financial projections.
- Do not enter sensitive personal information.

## Run
Open `index.html` in a modern browser. No build step or package installation is required.

A GitHub Pages workflow is included at `.github/workflows/preview.yml`. It attempts to publish the static demo when changes reach `main`. The preview URL becomes usable only after the first successful Actions deployment.

## Embed on the real Haus & Haus website
The widget must be hosted and then added to the Haus & Haus website using an approved script/embed integration. This repository alone cannot insert code into their live website; their website team must authorize and install it.
