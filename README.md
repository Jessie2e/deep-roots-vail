# Deep Roots Vail — redesign concept

A fast static concept site built with semantic HTML, separated CSS, and vanilla JavaScript. No build step is required. The concept now includes both the homepage (`index.html`) and a dedicated therapist/about page (`about.html`).

## Run it

Open the folder in VS Code and use **Live Server** on `index.html`, or from Terminal:

```bash
cd deep-roots-vail-concept
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Why this stack

For this concept, plain HTML/CSS/JS is the lightest, easiest-to-edit option and loads extremely fast. There is no React/Vite dependency to maintain just for a marketing site. If the final site later needs a real member dashboard, account state, CMS integration, or a more complex app flow, the same visual design can be moved into a framework then.

## Booking + existing commerce links already wired

- Main booking: `https://booking.mangomint.com/182366`
- Existing packages: `https://clients.mangomint.com/deeprootsvail/packages`
- Gift cards: `https://clients.mangomint.com/gift-cards/182366`

## Membership/login

The **Member Login** and **Become a Member** overlays are interactive prototypes only. They intentionally do not send or store data. A production build should connect them to the final membership/payment/client-portal platform.

If Deep Roots keeps MangoMint for the client relationship, first confirm what customer portal / membership functionality is available in their plan. Otherwise, Stripe + a lightweight member account layer or a dedicated wellness membership platform can be connected later.

## Hero video later

The current hero uses `assets/dr4.webp`. In `index.html`, search for `Future hero video`. Replace the `<img>` with something like:

```html
<video autoplay muted loop playsinline poster="assets/dr4.webp">
  <source src="assets/deep-roots-hero.mp4" type="video/mp4">
</video>
```

Then give the video the same `width`, `height`, and `object-fit: cover` rules as `.hero-media img`.

## Social feed

The social section currently uses supplied Deep Roots photos as a design prototype and links to the real Instagram/Facebook profiles. For production, connect official embeds or an approved social-feed service rather than scraping social networks.

## SEO already started

`index.html` includes:
- focused title and meta description
- canonical URL
- Open Graph tags
- semantic headings
- local-business JSON-LD
- Vail address + phone
- descriptive alt text

Before launch, verify all business details, current hours, the Tripadvisor rating/review count, and final membership copy.


## New content in this revision

- `#d0c89c` is the shared sand color used for the navigation, footer, and selected supporting surfaces.
- The desktop hero is wider and shorter so the primary message, image, and booking actions fit much more comfortably in a laptop viewport.
- `about.html` contains the Deep Roots story plus therapist cards for Donna, Lydia, Brigitte, Bliss, and Bree. Portrait areas are placeholders so real team photography can drop in later without changing the layout.
- The homepage now includes practical visit information, year-round pool/hot-tub amenities, parking notes, robe/shoe availability, group in-home massage, and a concise FAQ.
- Known therapist-specific MangoMint links are wired for Donna, Lydia, and Brigitte; Bliss and Bree currently use the general availability page.

## Content still to confirm before launch

The old-site source supplied for this revision did not include answers for the cancellation policy or accepted payment types, so those were intentionally **not invented**. Add them to the FAQ once the current policies are confirmed. Also verify parking pricing/seasonal rules before publishing because municipal parking terms can change.
