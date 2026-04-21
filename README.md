<<<<<<< HEAD
# Group-Gift-Fund
=======
# GroupGift - Collaborative Gift Fund App

A modern React application for organizing and tracking group gift collections.  
Users can create a fund, share it with contributors, monitor progress in real time, and view analytics in a polished dashboard experience.

This project currently runs with in-memory/mock data and is structured to support backend API integration later.

## Demo Features

- Create gift funds with title, description, target amount, and deadline
- Browse and filter all funds from a dashboard
- Search funds by title/description
- View fund details with:
  - progress tracking
  - contributors list
  - activity timeline
  - shareable link + QR code
- Contribute to a fund with simulated payment flow
- See confetti celebrations on successful contribution and completed goals
- Analyze platform data with charts and fund-level performance table
- Toggle dark mode (persisted in browser localStorage)
- Toast notifications, skeleton loaders, and animated UI transitions

## Tech Stack

- `React 19`
- `Vite 8`
- `React Router DOM 7`
- `Tailwind CSS 4` (via `@tailwindcss/vite`)
- `Framer Motion` for animations
- `Recharts` for analytics visualizations
- `react-hot-toast` for notifications
- `react-icons` for iconography
- `qrcode.react` for QR generation
- `canvas-confetti` for celebratory effects
- `Axios` (configured for future backend calls)

## Project Structure

```text
AWS P1/
|- public/
|  |- favicon.svg
|  |- icons.svg
|- src/
|  |- assets/
|  |- components/
|  |  |- ContributorList.jsx
|  |  |- EmptyState.jsx
|  |  |- Footer.jsx
|  |  |- FundCard.jsx
|  |  |- Navbar.jsx
|  |  |- ProgressBar.jsx
|  |  |- Skeleton.jsx
|  |- context/
|  |  |- FundContext.jsx
|  |  |- ThemeContext.jsx
|  |- pages/
|  |  |- Analytics.jsx
|  |  |- Contribute.jsx
|  |  |- CreateFund.jsx
|  |  |- Dashboard.jsx
|  |  |- FundDetails.jsx
|  |  |- LandingPage.jsx
|  |- services/
|  |  |- api.js
|  |- utils/
|  |  |- helpers.js
|  |- App.jsx
|  |- index.css
|  |- main.jsx
|- index.html
|- package.json
|- vite.config.js
```

## Routing

Defined in `src/App.jsx`:

- `/` -> Landing page
- `/dashboard` -> Fund listing, filtering, search
- `/create` -> Create new fund form
- `/fund/:id` -> Fund details, contributors, timeline, sharing
- `/contribute/:id` -> Contribution form and payment simulation
- `/analytics` -> Charts and performance metrics

## State Management

The app uses React Context providers:

- `ThemeContext` (`src/context/ThemeContext.jsx`)
  - Handles dark mode toggle
  - Persists preference to `localStorage` (`darkMode`)
  - Adds/removes `dark` class on `document.documentElement`

- `FundContext` (`src/context/FundContext.jsx`)
  - Holds `funds`, `contributions`, and `activities`
  - Provides fund helpers:
    - `getFundById()`
    - `getContributionsForFund()`
    - `getActivitiesForFund()`
  - Provides mutation actions:
    - `createFund()`
    - `addContribution()`

## Data Layer

`src/services/api.js` includes:

- An Axios instance with base URL:
  - `VITE_API_URL` (if defined), otherwise `http://localhost:5000/api`
- Mock seed data for:
  - funds
  - contributions
  - activities
- API-shaped async functions (`fetchFunds`, `fetchFundById`, etc.) prepared for backend swap-in

### Environment Variable (Optional)

Create a `.env` file in project root if you want a custom backend URL:

```env
VITE_API_URL=http://localhost:5000/api
```

> Note: Current UI behavior is driven by in-memory context data and mock data, so backend endpoints are scaffolded but not fully wired into page flows yet.

## UI/UX Highlights

- Tailwind-based design tokens in `src/index.css` (`@theme`)
- Gradient utility classes and glassmorphism helpers
- Skeleton loading placeholders (`src/components/Skeleton.jsx`)
- Responsive layouts across pages
- Animated transitions and micro-interactions with Framer Motion
- QR-based sharing in fund details

## Prerequisites

- Node.js `18+` recommended
- npm (comes with Node.js)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the local URL shown in terminal (default Vite URL):

- [http://localhost:5173](http://localhost:5173)

## Available Scripts

From `package.json`:

- `npm run dev` - start Vite development server
- `npm run build` - build production bundle
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint across project

## Build for Production

```bash
npm run build
npm run preview
```

The build output is generated in the `dist/` directory.

## Notes on Current Limitations

- No authentication/authorization implemented
- No persistent database storage (state resets on refresh)
- Payment flow is simulated for UI demonstration
- No automated test suite configured yet

## Suggested Next Improvements

- Connect context actions to real backend API routes
- Add authentication and role-aware permissions
- Persist data in a database
- Add unit/integration tests (Vitest + React Testing Library)
- Add route guards and error boundaries
- Add CI checks for lint/test/build

## License

No license file is currently included.  
If this project is intended for public distribution, add a `LICENSE` file (for example, MIT).

# 🎁 Group Gift Fundraiser

A modern, production-level frontend web application for organizing group gift contributions — built with React and designed to eliminate the social awkwardness of collecting money from friends, family, and colleagues.

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React.js** | 19 | UI framework (functional components + hooks) |
| **Vite** | 8 | Lightning-fast build tool & dev server |
| **Tailwind CSS** | 4 | Utility-first CSS with custom theme |
| **Framer Motion** | 12 | Smooth animations & page transitions |
| **React Router** | 7 | Client-side routing |
| **Recharts** | 2 | Analytics charts (Pie, Bar) |
| **Axios** | 1.8 | HTTP client (API-ready) |
| **React Hot Toast** | 2 | Toast notifications |
| **canvas-confetti** | 1 | Confetti celebration effects |
| **qrcode.react** | 4 | QR code generation |
| **React Icons** | 5 | Icon library |

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Navbar.jsx         # Navigation bar with dark mode toggle
│   ├── Footer.jsx         # Site footer
│   ├── ProgressBar.jsx    # Animated progress bar
│   ├── FundCard.jsx       # Gift fund card
│   ├── Skeleton.jsx       # Loading skeletons
│   ├── EmptyState.jsx     # Empty state placeholder
│   └── ContributorList.jsx # Contributor list with avatars
├── pages/             # Route-level pages
│   ├── LandingPage.jsx    # Hero, features, testimonials
│   ├── Dashboard.jsx      # All funds with search & filter
│   ├── CreateFund.jsx     # Create new fund form
│   ├── FundDetails.jsx    # Fund details, QR code, timeline
│   ├── Contribute.jsx     # Contribution flow
│   └── Analytics.jsx      # Charts & statistics
├── context/           # React Context providers
│   ├── ThemeContext.jsx   # Dark/light mode
│   └── FundContext.jsx    # Global fund state management
├── services/          # API layer
│   └── api.js             # Axios instance + mock data
├── utils/             # Utility functions
│   └── helpers.js         # Formatting, clipboard, etc.
├── App.jsx            # Router & layout
├── index.css          # Tailwind config & custom styles
└── main.jsx           # Entry point
```

## 🚀 How to Run

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

```bash
# 1. Navigate to the project directory
cd Adarsh_P1_AWS

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| Landing | `/` | Hero section, features, how-it-works, testimonials |
| Dashboard | `/dashboard` | View all funds, search, filter by status |
| Create Fund | `/create` | Form to create a new gift fund |
| Fund Details | `/fund/:id` | Full fund details, contributors, activity timeline |
| Contribute | `/contribute/:id` | Make a contribution with mock payment |
| Analytics | `/analytics` | Pie charts, bar charts, fund performance table |

## ✨ Key Features

- **Dark Mode** — Toggle between light/dark themes (persisted)
- **Glassmorphism UI** — Modern frosted-glass design effects
- **Animated Progress Bars** — Real-time fund tracking
- **QR Code Sharing** — Generate QR codes for fund links
- **Confetti Celebrations** — Animated confetti when a fund goal is met
- **Toast Notifications** — Success/error feedback on all actions
- **Search & Filter** — Find funds by name or filter by status
- **Responsive Design** — Works on mobile, tablet, and desktop
- **API-Ready** — Swap mock data in `src/services/api.js` to connect a backend

## 👤 Author

Built by **Adarsh**
>>>>>>> a11bc0b (Initial commit - frontend project)
