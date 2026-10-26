# ServeEase — On-Demand Home Services Booking Platform

A responsive single-page web application for discovering and booking doorstep home repair, cleaning, and maintenance services. Built with **React 19**, **Tailwind CSS v4**, and **Vite**.

Authentication, bookings, and checkout are simulated client-side through an interactive mock data store with `localStorage` persistence, allowing full end-to-end exploration without a remote backend server.

---

## 🔗 Live Demo & Deployment

- **Live URL**: `[Deploy link here — e.g. https://serveease.vercel.app]`
- **Single Page Application (SPA) Routing**: Configured with route rewrites via `vercel.json` and `public/_redirects` so refreshing client routes (e.g., `/bookings`, `/dashboard`) works seamlessly.

---

## 🔐 Demo Credentials

You can test the customer experience using the seeded demo credentials or by clicking **"Fill with Demo Customer"** on the login screen:

- **Email**: `rahul.sharma@example.com` (or `alex.rivera@example.com`)
- **Password**: `demopassword` (or `demo1234`)
- **Simulated Card**: Pre-filled test card (`•••• •••• •••• 4242`) or Pay-after-service option.

---

## 🌟 Key Features

1. **Service Discovery & Search (`/`, `/services`, `/services/:id`)**:
   - Real-time search by keyword, service name, or symptom.
   - Category filtering (AC, Plumbing, Electrical, Cleaning, Appliances, Carpentry) and multi-field sorting.
   - Interactive 2BHK flat architectural cutaway to explore services room by room.

2. **Customer Authentication & Route Protection (`/login`, `/signup`)**:
   - Form validation powered by **Zod** and **React Hook Form**.
   - Client session management with protected routes that preserve the intended destination URL on redirect.

3. **Multi-Step Booking Wizard (`/booking/:serviceId`)**:
   - **Step 1 (Schedule)**: 14-day date picker with 2-hour arrival windows.
   - **Step 2 (Address & Notes)**: Saved address selection, manual entry, or browser geolocation.
   - **Step 3 (Review)**: Itemized cost calculation (base fare, 5% GST, and platform fee).

4. **Simulated Checkout & Booking Confirmation (`/checkout/:bookingId`, `/booking-success/:bookingId`)**:
   - Interactive payment simulation (demo card or cash/pay after service).
   - Generates a booking confirmation reference with scheduled technician details.

5. **Customer Portal (`/dashboard`, `/bookings`, `/profile`, `/payments`)**:
   - Overview of active bookings, completed jobs, and total spend.
   - Reschedule or cancel appointments.
   - Saved address book management.

---

## 🏗️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | React 19 + Vite 8 + JavaScript |
| **Styling** | Tailwind CSS v4 + Plus Jakarta Sans Typography |
| **Routing** | React Router v7 with route code-splitting (`React.lazy`) |
| **Form & Validation** | React Hook Form + Zod |
| **Animation & Scroll** | Framer Motion + Lenis Smooth Scroll |
| **State Management** | Context API (`AuthContext`, `CartContext`) + LocalStorage Store |
| **Icons & Notifications** | Lucide React + React Hot Toast |
| **Testing** | Vitest + React Testing Library + jsdom |

---

## ⚡ Performance Optimization

- **Bundle Optimization**: Initial production bundle was reduced from **520 kB** down to **120 kB** (~77% reduction in main chunk size) by configuring manual chunk splitting for `framer-motion`, `lenis`, and core libraries in `vite.config.js`.
- **Dynamic Imports**: Route-level code splitting ensures secondary views (Dashboard, Checkout, Details) load on demand.

---

## 🧪 Testing

The repository includes automated tests covering validation, route guards, price calculations, and booking workflows:

```bash
# Run unit and component tests with Vitest
npm test

# Run tests in watch mode
npm run test:watch
```

**Test Coverage Highlights**:
- **Zod Schemas**: Input sanitization, password constraints, email validation, and matching confirmations.
- **Route Guards**: `ProtectedRoute` redirection and URL query destination preservation.
- **Calculations**: Itemized totals, 5% GST tax calculation, platform fees, and currency formatters.
- **Booking Workflows**: Step definitions, payload structures, and time slot validation.

---

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Run the test suite**:
   ```bash
   npm test
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```
