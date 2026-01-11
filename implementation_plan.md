# Migration Plan: detailed review and refactoring

The project currently suffers from a "split personality": it has a modern React/Vite/TanStack Start infrastructure, but serves a legacy vanilla HTML/JS site from the root. The legacy code contains broken React references that will not work in the browser.

I propose migrating the content to the React application to fix the errors and leverage the modern stack.

## User Review Required

> [!WARNING]
> This migration will move the root `index.html`, `script.js`, and `styles.css` into a `legacy/` backup folder. The site will then be driven by the React app in `src/`.
> This is a significant structural change but necessary to fix the broken "mixed" state of the project.

## Proposed Changes

### 1. Cleanup & Backup
- Create a `legacy` directory.
- Move `index.html`, `script.js`, `styles.css` (root versions) into `legacy`.

### 2. React Migration
- **Styles**: Move `styles.css` to `src/styles/global.css` (or similar) and import it in the root application component.
- **Content**: Port the HTML structure from `index.html` into `src/routes/index.tsx` (the main landing page).
- **Logic**: Port the `script.js` functionality (scroll effects, animations, form handling, typing effect) into React `useEffect` hooks or custom hooks inside the component.
  - The `LetterGlitch` component usage commented out in HTML will be properly implemented.

### 3. File Structure Updates
#### [MODIFY] [src/routes/index.tsx]
- Replace existing content with the Landing Page JSX (ported from `index.html`).

#### [NEW] [src/nav.tsx] (or similar component)
- Componentize the Navbar.

#### [NEW] [src/styles/landing.css]
- The original CSS file.

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure the project builds without errors.
- Run `npm run dev` to start the server.

### Manual Verification
- Open the local server.
- Verify:
    - Navigation allows scrolling to sections.
    - Animations (Hero fade-in, scroll indicators) work.
    - Contact form (mailto) works.
    - Responsive design (mobile menu) works.
