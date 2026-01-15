# F1SinGuion Copilot Instructions

## Project Overview

**F1SinGuion** is an Astro-based web application for Formula 1 racing events. It's a static site generator project with Tailwind CSS for styling, featuring F1-themed branding and event information pages.

**Tech Stack:**
- Astro 5.16+ (SSG framework)
- Tailwind CSS 4.1+ with CSS custom properties
- TypeScript (strict mode) for type safety
- No framework dependencies (vanilla JS for interactivity)

## Architecture & Key Patterns

### File Structure
- `src/pages/` - Astro pages (auto-routed to URLs)
- `src/layouts/` - Reusable page layouts (Layout.astro wraps all pages)
- `src/components/` - Astro components (currently empty, add here for reusable UI)
- `src/styles/global.css` - Tailwind theme definitions with F1 color palette
- `src/assets/` - Static images/SVGs

### Critical Design Decisions

1. **Tailwind CSS Theme Over Config File**: This project uses `@theme` in [global.css](src/styles/global.css) instead of `tailwind.config.js`. All brand colors (F1 teams + custom brand colors) are defined as CSS variables there. When modifying colors, edit `@theme` block and `:root` variables together.

2. **Astro Components (`.astro`)**: Use `.astro` files for components, not JSX. Astro files are server-rendered at build time, reducing JavaScript payload. Only use client-side JS when necessary (e.g., button interactions).

3. **Layout Pattern**: All pages inherit from [Layout.astro](src/layouts/Layout.astro), which includes:
   - Global CSS imports
   - Dark mode script (prevents FOUC - flash of unstyled content)
   - HTML structure with Tailwind base styles

4. **Color System**: Reference colors via CSS custom properties:
   - Brand colors: `var(--color-brand-red)`, `var(--color-brand-white)`, etc.
   - Team colors: `var(--color-ferrari)`, `var(--color-mercedes)`, etc. (predefined for all 10 F1 teams)
   - Use Tailwind classes like `text-brand-red bg-brand-black` (converted from CSS vars)

## Development Workflow

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server at `localhost:4321` with hot reload |
| `npm run build` | Build static site to `./dist/` for deployment |
| `npm run preview` | Preview production build locally |
| `npm run astro add` | Add integrations (e.g., React, Vue) if needed |

**Note:** Dev server rebuilds on file changes in `src/`. Changes to `astro.config.mjs` require restart.

## Component & Page Creation

When creating new pages or components:

1. **Pages** go in `src/pages/*.astro` (auto-routed):
   ```astro
   ---
   import Layout from "../layouts/Layout.astro";
   ---
   <Layout>
     <main class="flex items-center justify-center min-h-screen">
       <!-- Your content -->
     </main>
   </Layout>
   ```

2. **Components** go in `src/components/*.astro` (explicitly imported):
   ```astro
   ---
   // Component props go in frontmatter
   interface Props {
     title: string;
     color?: string;
   }
   const { title, color = "brand-red" } = Astro.props;
   ---
   <div class={`text-${color} font-bold`}>
     {title}
   </div>
   ```

3. **Interactive Elements**: Use inline `<script>` tags in `.astro` files or separate `.ts` files in `src/`:
   ```astro
   <button id="start-btn">Start</button>
   <script>
     document.getElementById("start-btn")?.addEventListener("click", () => {
       console.log("Clicked!");
     });
   </script>
   ```

## Tailwind Usage

- All colors are defined in [global.css](src/styles/global.css) as CSS variables under `@theme` and `:root`
- Use class-based approach: `class="text-brand-red bg-brand-black"`
- Responsive prefixes: `md:text-7xl` (mobile-first)
- Custom F1 animations: Check [index.astro](src/pages/index.astro) for examples (`animate-in`, `hover:scale-110`)
- Dark mode: Controlled by localStorage in Layout.astro; use `dark:` classes for dark mode styles

## Common Tasks

**Add a New Page:**
1. Create `src/pages/eventname.astro`
2. Import Layout and wrap content
3. Astro automatically creates `/eventname/` route

**Add a Team Color:**
1. Add to `@theme` block in [global.css](src/styles/global.css)
2. Add matching CSS variable in `:root`
3. Use in classes: `text-[team-color]`

**Modify Brand Colors:**
Update both `@theme` and `:root` in [global.css](src/styles/global.css) to keep them in sync.

**Interactive Behavior:**
Add client-side scripts directly in `.astro` files or use Astro's `client:*` directives for framework components if added later.

## TypeScript Configuration

Project uses `astro/tsconfigs/strict` which enforces strict type checking. All files should be TypeScript-compatible. When adding components, use TypeScript interfaces for props.

## Deployment Notes

- Output: `./dist/` folder (created by `npm run build`)
- No server-side processing (fully static)
- All routes are pre-generated at build time
- CSS/JS are bundled and minified by Astro's built-in optimizer

---

**Last Updated:** January 2026 | Ask clarifying questions about project-specific patterns or architecture decisions.
