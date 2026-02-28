# 🚀 Crypto Tracker

A modern crypto analytics dashboard built with React (Vite).

---

## 📅 Development Log

---

### ✅ Day 1 – Project Initialization & Routing Architecture

#### 🛠 Setup Completed
- Created Vite + React project
- Installed Tailwind CSS v4
- Installed React Router
- Installed Redux Toolkit, React-Redux, Zustand
- Installed Lucide React for icons

---

#### 🏗 Routing Architecture Implemented

Implemented **Layout-Based Routing** using `createBrowserRouter`.

Structure:

"/"
└── AppLayout
    ├── Header
    └── Outlet
         └── MarketPage (index route)

---

#### 🧠 Architectural Decisions

- Using nested routing instead of multiple independent routes
- AppLayout acts as persistent layout wrapper
- `<Outlet />` used as dynamic rendering slot
- MarketPage configured as index route
- Clean feature-based folder structure created

---

#### 📂 Folder Structure Initialized

src/
├── app/
├── layout/
├── features/
└── shared/

---

#### 🎯 Why This Matters

- Header will remain persistent across all pages
- Only page content changes inside Outlet
- Scalable routing for future pages:
  - Coin Detail
  - Watchlist
  - Portfolio
- Enables future lazy loading

---

### 🚀 Next Step

- Refactor Header into separate component
- Begin building real UI layout skeleton