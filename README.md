# 🌟 GTT Foundation NGO Web Application & Management System

A full-stack, responsive web application and administrative portal for **GTT Foundation**, designed to showcase initiatives, manage programs and events, coordinate volunteers, accept donation inquiries, and publish community stories.

---

## 🚀 Key Features

- **Public Web Portal**:
  - Hero section with live statistics and mission highlights.
  - Interactive **Programs & Initiatives** directory with category filters.
  - **Upcoming Events** calendar & registration dialog.
  - **Stories & Impact** blog feed with tag filtering.
  - **Volunteer Application** multi-step workflow.
  - **Contact & Inquiry** form with real-time feedback.
- **Admin Management Dashboard**:
  - Secure authentication via Supabase Auth.
  - Quick action widgets for creating programs, posting events, and drafting articles.
  - Overview statistics tracking active volunteers, registered events, and programs.
  - Modern glassmorphic dark/light UI with zero emojis (100% SVG Lucide icons).
- **Backend API & Serverless Architecture**:
  - Express.js 5 REST API handling authentication, programs, events, blogs, volunteers, and donations.
  - Fully compatible with both standalone Node.js environments and **Vercel Serverless Functions** (`/api/index.js`).

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React (Icons), React Router v7
- **Backend**: Node.js, Express.js 5, CORS, Dotenv
- **Database & Auth**: Supabase (PostgreSQL, Supabase Auth)
- **Deployment**: Vercel (Frontend SPA + Serverless Express API), Docker & Render/Railway ready

---

## 📁 Repository Structure

```
├── api/
│   └── index.js             # Vercel serverless function entry point
├── backend/
│   ├── src/
│   │   ├── config/          # Supabase & DB client configuration
│   │   ├── middleware/      # Auth & error handling middleware
│   │   ├── routes/          # REST endpoints (auth, programs, events, blogs, etc.)
│   │   └── index.js         # Express app definition & route mapping
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components (Navbar, Footer, Modals, etc.)
│   │   ├── context/         # AuthContext & state management
│   │   ├── pages/           # Home, Programs, Events, Dashboard, etc.
│   │   └── services/        # API client & Supabase service
│   ├── package.json
│   └── .env.example
├── supabase-schema.sql      # Supabase database initialization schema
├── vercel.json              # Vercel unified build & rewrite configuration
├── package.json             # Root monorepo script coordinator
└── README.md
```

---

## ⚡ Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ and npm installed.
- A free [Supabase](https://supabase.com) project.

### 2. Environment Setup

Copy example environment files:
```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```

Fill in your Supabase project credentials in both `.env` files.

### 3. Database Setup
Run the SQL queries from `supabase-schema.sql` in your Supabase project's SQL Editor to set up the necessary tables (`programs`, `events`, `volunteers`, `blogs`, etc.) and Row Level Security (RLS) policies.

### 4. Install Dependencies & Run

Install dependencies:
```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

Start both frontend and backend concurrently:
```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/health

---

## 🌐 Deployment to Vercel

This repository is pre-configured for seamless unified deployment on Vercel:

1. Import the repository on [Vercel](https://vercel.com/new).
2. Set the root directory to `./`.
3. In **Project Settings > Environment Variables**, add:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous public key
   - `SUPABASE_SERVICE_KEY`: Your Supabase service role key (optional for backend serverless)
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous public key
4. Click **Deploy**. Vercel will automatically build the React SPA and deploy `/api` as Serverless Functions.

---

## 📄 License
MIT License. Developed for GTT Foundation.
