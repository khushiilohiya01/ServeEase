# ServeEase — Frontend-First Home Services Booking Platform

ServeEase is a portfolio-grade, responsive on-demand home services booking web application built according to the **ServeEase Implementation Guide**. It showcases clean component architecture, accessible UI, route-level protection, client & server validation schemas, resilient state management, normalized API client integration, and seamless user experiences.

---

## 🌟 Key Features

1. **Service Discovery & Search (`/`, `/services`, `/services/:id`)**:
   - Live query searching, category pills, and multi-field sorting (Price Low/High, Rating, Duration).
   - Rich service details with transparent base pricing, duration estimates, verified ratings, inclusion checklists, and satisfaction guarantees.

2. **Customer Authentication & Route Protection (`/login`, `/signup`)**:
   - Client and server input validation powered by **Zod** and **React Hook Form**.
   - Password strength checking and visibility toggling.
   - Protected routes with destination preservation via `?redirect=...`.
   - Safe user DTOs (never exposing password hashes or credentials).

3. **Multi-Step Booking Wizard (`/booking/:serviceId`)**:
   - **Step 1 (Schedule)**: 14-day date picker with 2-hour arrival windows.
   - **Step 2 (Address & Notes)**: Saved address book selection, manual entry, and explicit permission-based browser geolocation.
   - **Step 3 (Review)**: Comprehensive itemized summary snapshot before checkout initiation.

4. **Transparent Checkout & Sandbox Payments (`/checkout/:bookingId`, `/booking-success/:bookingId`)**:
   - Server-calculated taxes, platform fees, and order totals (client amounts are display-only).
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
| **State Management** | Context API (`AuthContext`) + Component-Level State |
| **Icons & Feedback** | Lucide React + React Hot Toast |
| **Backend API** | Java 17+ / Spring Boot 3.2 REST API (`/api/v1`) |
| **Database & Schema** | MySQL 8.0+ with Flyway/SQL migrations (`db/migration/`) |
| **Security** | BCrypt password hashing + Stateless JWT HMAC-SHA256 |

---

## 🚀 Getting Started (Windows & Cross-Platform)

### Prerequisites
- **Node.js** (v18.0 or higher) and **npm**
- **Java JDK** (17 or higher)
- **MySQL Server** (8.0 or higher) — optional if running in standalone sandbox mode

---

### 1. Frontend Setup & Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   *(By default, `VITE_ENABLE_MOCK_FALLBACK=true` allows the application to run smoothly in offline developer sandbox mode while the backend is starting).*

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

### 2. Database Setup (MySQL)

1. Connect to MySQL command line or MySQL Workbench:
   ```bash
   mysql -u root -p
   ```

2. Execute the migrations located in `db/migration/`:
   ```sql
   source db/migration/V1__initial_schema.sql;
   source db/migration/V2__seed_services.sql;
   ```

---

### 3. Spring Boot Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Configure application properties**:
   Edit `src/main/resources/application.properties` or set environment variables:
   ```properties
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=serveease
   DB_USERNAME=root
   DB_PASSWORD=your_mysql_password
   AUTH_SECRET=serveease_jwt_secret_key_needs_to_be_32_bytes_or_longer_2026!
   ```

3. **Build and run the API**:
   ```bash
   mvn clean spring-boot:run
   ```
   The REST API will listen on `http://localhost:8080/api/v1`.

---

## 🔐 Demo Credentials

When evaluating or demonstrating the platform, you can use the pre-seeded customer account:

- **Email**: `alex.rivera@example.com`
- **Password**: `demo1234` (or click **"Fill with Demo Customer"** on the `/login` screen)
- **Test Card**: Pre-loaded sandbox test card (`•••• •••• •••• 4242`, Exp: `12/28`)

---

## 📡 API Contract Reference (`/api/v1`)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register new customer with BCrypt hashed password |
| `POST` | `/auth/login` | Authenticate customer and issue JWT session token |
| `POST` | `/auth/logout` | Terminate active session |
| `GET` | `/auth/me` | Fetch authenticated user profile |
| `GET` | `/services` | List active services (supports `q`, `category`, `sort`) |
| `GET` | `/services/{id}` | Retrieve single service detail |
| `GET` | `/addresses` | List current user's saved addresses |
| `POST` | `/addresses` | Save new address |
| `PATCH` | `/addresses/{id}` | Update address (e.g. set as default) |
| `DELETE`| `/addresses/{id}` | Delete saved address |
| `POST` | `/bookings` | Create pending booking with server-side price validation |
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
