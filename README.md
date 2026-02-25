# UK Lotto Draw

A simple web app for generating random UK Lotto number lines. Draw six numbers from 1–59, save your favourite lines, and manage them before your next draw.

## Features

- **Random draw** — generates 6 unique numbers from 1–59, sorted in ascending order
- **Save lines** — keep multiple sets of numbers for a single session
- **Duplicate detection** — warns you if you try to save an identical line twice
- **Remove lines** — delete individual saved lines or clear them all at once

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- TypeScript

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/
  page.tsx        # Main lottery UI
  layout.tsx      # Root layout
public/           # Static assets (favicon, icons)
```

---

Made by [StuartSM](https://stuartsm.com)
