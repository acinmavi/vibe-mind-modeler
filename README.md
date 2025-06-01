# MindModeler

MindModeler is a web app that helps you apply proven mental models to real-world situations and manage your personal thinking toolkit.

## Features

- 🔐 User Registration & Login
- 📚 Library of 10 Mental Model Templates
- 🧠 Step-by-step Model Application
- 👤 User Dashboard & Model Management
- 📊 Statistics & Insights

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- [Supabase](https://supabase.com/) (future backend integration)

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/your-username/mind-modeler.git
cd mind-modeler
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your [Supabase](https://supabase.com/) project credentials:

```sh
cp .env.example .env
```

Edit `.env`:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> **Note:** The app works in local-only mode by default. Supabase is prepared for future backend integration.

### 4. Run the development server

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Project Structure

- `src/` — Main source code (components, pages, contexts, types, etc.)
- `src/data/templates.ts` — Built-in mental model templates
- `src/contexts/` — React context for authentication and models
- `supabase/` — Database migrations (optional, for backend)
- `.env.example` — Example environment variables

## Scripts

- `npm run dev` — Start local dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code with ESLint

## License

MIT

---

Made with ❤️ for better thinking.