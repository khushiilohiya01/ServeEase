# ServeEase

A booking site for home services in India: AC repair, cleaning, plumbing, electrical work, pest control and so on. Built with React, Vite and Tailwind.

**Live:** https://your-site.vercel.app

**Demo login:** `rahul.sharma@example.com` / `demopassword`

![ServeEase home page](docs/screenshot.png)

There's no backend yet. All the data (services, users, bookings, addresses, payments) lives in a small mock store in `src/lib/apiClient.js` that saves to `localStorage`, so the whole flow works in the browser. Every page goes through `apiRequest()`, so a real API can be plugged in later through `VITE_API_BASE_URL`, as long as it follows the same endpoints as the mock store.

## Features

- Search services by name or by the problem you have ("ac not cooling", "tap leaking"), filter by category or room, sort by price, rating or duration
- A 2BHK flat cutaway on the home page where you click a room to see the services for it
- Cart, with per-BHK pricing for things like cleaning and painting
- 3-step booking: pick a date and a 2-hour slot, choose an address (saved, new, or from GPS), then review
- Checkout with a fake card payment, or pay after the service
- Dashboard, bookings list, reschedule and cancel, saved addresses, payment history
- Protected pages that send you back to where you were after you log in

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

There's a second demo account too: `alex.rivera@example.com` / `demo1234`. You can also sign up with any email; the account is only saved in your browser. In dev mode the login page has a button that fills in the demo login for you.

To reset everything, clear the site's localStorage.

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build into dist/
npm run preview    # serve the build locally
npm test           # run the tests (vitest)
npm run lint       # eslint
```

## Environment

Copy `.env.example` to `.env`. Both values are optional:

- `VITE_API_BASE_URL`: base URL of a real API. Leave it empty to use the mock store.
- `VITE_ENABLE_MOCK_FALLBACK`: if `true`, requests fall back to the mock store when the API can't be reached. It's off by default, so a broken API shows an error instead of quietly using fake data.

## Project layout

```
src/
  app/          router and providers
  features/     one folder per page/flow (auth, booking, checkout, bookings, ...)
  components/   shared UI, layout, home page sections, illustrations
  context/      AuthContext (session, location, auth modal) and CartContext
  data/         service catalogue, cities/localities, seasonal banners
  lib/          api client + mock store, pricing, date helpers, formatters
  test/         tests
```

Prices are the service price plus 5% GST and a ₹49 platform fee (see `src/lib/pricing.js`). Booking times are saved as ISO timestamps built from the date and slot you pick, in your local time (see `src/lib/dates.js`).

## Stack

React 19, React Router 7 (pages are lazy loaded), Tailwind CSS 4, Framer Motion, Lenis, lucide-react and react-hot-toast. Tests use Vitest and Testing Library.

## Deploying

It's a static single-page app. `vercel.json` and `public/_redirects` send every path to `index.html`, so refreshing on a page like `/bookings` works on Vercel or Netlify.

## Limitations / next steps

- No real backend or payments yet; everything is mock data in localStorage
- The mock store keeps passwords in plain text. Fine for a demo, not for real users
- Next up: a Node/Express API, Razorpay in test mode, and an app for technicians
