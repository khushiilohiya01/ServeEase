# ServeEase

A booking site for home services (AC repair, cleaning, plumbing, electrical, pest control and so on), built with React, Vite and Tailwind.

There's no backend yet. All the data (services, users, bookings, addresses, payments) lives in a small mock store in `src/lib/apiClient.js` that saves to `localStorage`, so the whole flow works in the browser. Every page goes through `apiRequest()`, so pointing it at a real API later should only need `VITE_API_BASE_URL`.

## What's in it

- Browse and search services by name or by problem ("ac not cooling", "tap leaking"), filter by category or room, sort by price/rating/duration
- Interactive 2BHK cutaway on the home page: click a room to see the services for it
- Cart with per-BHK pricing for cleaning/painting type services
- 3-step booking: date and 2-hour slot, address (saved, new, or from GPS), then review
- Checkout with a fake card payment or pay-after-service
- Dashboard, bookings list, reschedule/cancel, saved addresses, payment history
- Protected routes that send you back where you were after logging in

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

Demo login:

| Email | Password |
|---|---|
| rahul.sharma@example.com | demopassword |
| alex.rivera@example.com | demo1234 |

In dev mode the login page also has a button that fills these in. You can sign up with any email as well; the account is saved in your browser.

To reset everything, clear the site's localStorage.

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build into dist/
npm run preview    # serve the build locally
npm test           # vitest
npm run lint       # eslint
```

## Environment

Copy `.env.example` to `.env`. Both values are optional:

- `VITE_API_BASE_URL`: real API base URL. Leave empty to use the mock store.
- `VITE_ENABLE_MOCK_FALLBACK`: if `true`, requests fall back to the mock store when the API can't be reached. Off by default so a broken API shows an error instead of silently using fake data.

## Project layout

```
src/
  app/          router and providers
  features/     one folder per page/flow (auth, booking, checkout, bookings, ...)
  components/   shared UI, layout, home page sections, illustrations
  context/      AuthContext (session, location, auth modal) and CartContext
  data/         service catalogue, cities/localities, seasonal banners
  lib/          api client + mock store, pricing, date helpers, formatters
  test/         vitest tests
```

Pricing is 5% GST plus a ₹49 platform fee (`src/lib/pricing.js`). Booking times are stored as ISO timestamps built from the chosen local date and slot (`src/lib/dates.js`).

## Stack

React 19, React Router 7 (pages are lazy loaded), Tailwind CSS 4, Framer Motion, Lenis, lucide-react, react-hot-toast. Tests use Vitest and Testing Library.

## Deploying

It's a static SPA. `vercel.json` and `public/_redirects` rewrite every path to `index.html` so refreshing on `/bookings` etc. works on Vercel or Netlify.
