# ServeEase — Modern Home Services Booking Platform

ServeEase is a portfolio-grade, responsive on-demand home services booking web application. It showcases clean component architecture, accessible UI, route-level protection, form validation schemas, resilient client state management, normalized API client integration, and seamless user experiences.

---

## 🌟 Key Features

1. **Service Discovery & Search (`/`, `/services`, `/services/:id`)**:
   - Live query searching, category pills, and multi-field sorting (Price Low/High, Rating, Duration).
   - Rich service details with transparent base pricing, duration estimates, verified ratings, inclusion checklists, and satisfaction guarantees.

2. **Customer Authentication & Route Protection (`/login`, `/signup`)**:
   - Comprehensive form input validation powered by **Zod** and **React Hook Form**.
   - Password strength checking and visibility toggling.
   - Protected routes with destination preservation via `?redirect=...`.
   - Safe user session management with persistent local state.

3. **Multi-Step Booking Wizard (`/booking/:serviceId`)**:
   - **Step 1 (Schedule)**: 14-day date picker with 2-hour arrival windows.
   - **Step 2 (Address & Notes)**: Saved address book selection, manual entry, and permission-based browser geolocation.
   - **Step 3 (Review)**: Comprehensive itemized summary snapshot before checkout initiation.

4. **Transparent Checkout & Sandbox Payments (`/checkout/:bookingId`, `/booking-success/:bookingId`)**:
   - Transparent breakdown for taxes, platform fees, and order totals.
   - Pre-loaded PCI-safe developer test card (`•••• •••• •••• 4242`) and Pay-after-service options.
   - Verified status screen with appointment ID, reference tracking, and pro dispatch details.

5. **Customer Portal (`/dashboard`, `/bookings`, `/profile`, `/payments`)**:
   - **Dashboard**: Live overview of upcoming appointments, total jobs completed, total spent, and quick action cards.
   - **Bookings History**: Filter by status (`Confirmed`, `Pending`, `Completed`, `Cancelled`), appointment rescheduling, and cancellation management.
   - **Address Book**: Add, edit, remove, or set default service locations.
   - **Payments & Receipts**: Transaction IDs, gateway provider records, and status badges.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19 + Vite 8 + JavaScript |
| **Styling** | Tailwind CSS v4 + Plus Jakarta Sans Typography |
| **Routing** | React Router v7 with dynamic code-splitting (`React.lazy`) |
| **Form & Validation** | React Hook Form + Zod Schema Validation |
| **State Management** | Context API (`AuthContext`, `CartContext`) + Interactive Client Store |
| **Icons & Feedback** | Lucide React + React Hot Toast |
| **Animations & Smooth Scroll** | Framer Motion + Lenis |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0 or higher) and **npm**

---

### Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables (optional)**:
   ```bash
   cp .env.example .env
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application is available at `http://localhost:5173/`.

4. **Build production bundle**:
   ```bash
   npm run build
   ```

---

## 🔐 Demo Credentials

When evaluating or demonstrating the platform, you can use the pre-seeded customer account:

- **Email**: `alex.rivera@example.com`
- **Password**: `demo1234` (or click **"Fill with Demo Customer"** on the `/login` screen)
- **Test Card**: Pre-loaded sandbox test card (`•••• •••• •••• 4242`, Exp: `12/28`)

---

## 📡 Client Data Service Contract Reference (`/api/v1`)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register new customer account |
| `POST` | `/auth/login` | Authenticate customer and issue session token |
| `POST` | `/auth/logout` | Terminate active session |
| `GET` | `/auth/me` | Fetch authenticated user profile |
| `GET` | `/services` | List active services (supports `q`, `category`, `sort`) |
| `GET` | `/services/{id}` | Retrieve single service detail |
| `GET` | `/addresses` | List current user's saved addresses |
| `POST` | `/addresses` | Save new address |
| `PATCH` | `/addresses/{id}` | Update address (e.g. set as default) |
| `DELETE`| `/addresses/{id}` | Delete saved address |
| `POST` | `/bookings` | Create pending booking with verified price calculation |
| `GET` | `/bookings` | List user's bookings (supports `status` filter) |
| `GET` | `/bookings/{id}` | Retrieve booking detail (user ownership verified) |
| `PATCH` | `/bookings/{id}` | Reschedule or cancel booking |
| `POST` | `/payments/checkout-session` | Initialize provider payment order |
| `POST` | `/payments/confirm` | Complete provider test transaction callback |
| `GET` | `/payments` | List user's payment records |
| `GET` | `/payments/{id}` | View single payment invoice detail |

---

## ♿ Accessibility & UX Highlights
- **Keyboard Operable**: Full keyboard accessibility on all modals (Escape key listener), dropdowns, and form controls.
- **Visual Focus Rings**: Distinct `focus-visible` outlines matching design tokens.
- **Responsive Breakpoints**: Seamless scaling across mobile (360px, 390px), tablet (768px), and desktop (1024px, 1440px) without horizontal scrolling.
- **Truthful States**: Explicitly demarcates simulated sandbox test transactions from live financial charges.
