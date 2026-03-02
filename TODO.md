# TODO — Bugs & Issues

## Bugs

### ~~1. ESLint script has no target path~~ ✅ DONE
**File:** `package.json` line 9
`"lint": "eslint"` — running `npm run lint` lints nothing because no path is specified.
**Fix:** Changed to `"lint": "eslint ."`.

### ~~2. React list keys use array index on a deletable list~~ ✅ DONE
**File:** `app/page.tsx` line 144
`savedRows.map((row, i) => <div key={i} ...>)` — using the index as a key for a list where items can be removed in the middle causes React to associate the wrong DOM nodes with the wrong data after deletion. This can lead to subtle rendering bugs.
**Fix:** Introduced a `SavedRow` type `{ id: number; numbers: number[] }`, assigned `id: Date.now()` on save, and keyed rows by `row.id`. Delete filter now uses `r.id !== row.id` instead of index comparison.

---

## Performance / Code Quality

### ~~4. `messages` array re-created on every render~~ ✅ DONE
**File:** `app/page.tsx` lines 24–31
The `messages` array is declared inside the component function body, so a new array is allocated on every render.
**Fix:** Moved to a module-level constant above the component.

### ~~5. Logo `<Image>` missing `priority` prop~~ ✅ DONE
**File:** `app/page.tsx` line 38–43
The logo is the first image in the viewport (likely the LCP element) but is lazy-loaded by default. Next.js will emit a warning about this.
**Fix:** Added `priority` prop to the `<Image>` component.

---

## Accessibility

### ~~6. Delete buttons have no accessible label~~ ✅ DONE
**File:** `app/page.tsx` line 162–169
The `×` buttons that remove individual saved rows contain only a typographic character with no `aria-label`. Screen readers will announce something like "times, button" with no context.
**Fix:** Added `aria-label={`Remove line ${i + 1}`}` to each delete button.

---

## UI / Dark Mode

### ~~7. Dark mode CSS variables defined but unused in the UI~~ ✅ DONE
**File:** `app/globals.css` lines 15–20
`globals.css` defines `--background` / `--foreground` overrides for dark mode, but the component uses hardcoded Tailwind utility classes (`bg-white`, `text-gray-800`, etc.) that ignore those variables. On a device with dark mode enabled the page body will turn dark but the card will remain white, creating an inconsistent look.
**Fix:** Removed the dark mode media query block from `globals.css`. App is light mode only.
