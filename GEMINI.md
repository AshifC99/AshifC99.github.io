# GEMINI Memory

## Interaction: Fix LetterGlitch TypeScript Error
- **Date**: 2026-01-11
- **Problem**: TypeScript error "Could not find a declaration file for module" when importing `LetterGlitch.jsx` in `index.tsx`.
- **Context**: Project is migrating to React/Vite/TanStack Router.
- **Solution**: Converted `src/components/LetterGlitch.jsx` to `src/components/LetterGlitch.tsx` by adding proper TypeScript interfaces (`LetterGlitchProps`, `Letter`, `Grid`, `RGB`) and typing generic refs and event handlers.

## Interaction: Fix Password Generator Link
- **Date**: 2026-01-11
- **Problem**: Link to `/password_generator.html` was 404ing because the file was in the root directory.
- **Context**: User reported broken link in `src/routes/index.tsx`.
- **Solution**: Moved `password_generator.html` from the root directory to `public/password_generator.html` so it is correctly served by Vite as a static asset.

## Interaction: Redesign Password Generator
- **Date**: 2026-01-11
- **Problem**: User wanted a more colorful, surprise mobile-friendly design for the password generator page.
- **Solution**: Completely redesigned `public/password_generator.html` with:
    -   Animated gradient background.
    -   Glassmorphism container.
    -   Google Fonts (Outfit).
    -   Mobile-responsive layout.
    -   Improved UX (copy button inside input, toast notification).
    -   Italian localization.

## Interaction: Fix Floating Cards Overlap
- **Date**: 2026-01-11
- **Problem**: Visual overlap between floating cards in the "Chi Sono" section (specifically the 4th card overlapping the 1st).
- **Context**: The CSS lacked positioning rules for elements beyond the 3rd child.
- **Solution**: Added CSS rules for `:nth-child(4)` and `:nth-child(5)` in `src/styles/landing.css` to position them correctly. Added a 5th card with a Brain icon (🧠) to represent AI/Tech creativity.

## Interaction: Style About Section Links
- **Date**: 2026-01-11
- **Problem**: Links in the "Chi Sono" section text were not visually distinct (missing underline).
- **Solution**: Added CSS rules to `.about-text a` in `src/styles/landing.css` to add a visible underline, set primary color, and add a hover effect with accent color.

## Interaction: Replace Social Icons
- **Date**: 2026-01-11
- **Problem**: User wanted to replace emojis for LinkedIn, GitHub, X, and Email with professional open-source icons.
- **Solution**:
    -   Replaced emojis with `Linkedin`, `Github`, and `Mail` icons from `lucide-react`.
    -   Used a custom inline SVG for the X (Twitter) logo.
    -   Ensured all icons use the primary color and have consistent sizing.

## Interaction: Align Contact Description
- **Date**: 2026-01-11
- **Problem**: The description text in the "Contattami" section was centered, while the user wanted it left-aligned to match the heading.
- **Solution**: Added a specific CSS rule `.contact .section-description` in `src/styles/landing.css` to force `text-align: left` and remove the auto margin that was centering it.

## Interaction: Disable Projects Section
- **Date**: 2026-01-11
- **Request**: User asked to comment out the entire "Projects Section" (lines 261-381) in `index.tsx`.
- **Solution**: Wrapped the section in `{false && (<> ... </>)}`. This effectively disables the rendering of the section while keeping the code structure valid and avoiding issues with standard block comments (nested `*/`).

## Interaction: Update Manifest Icons
- **Date**: 2026-01-11
- **Request**: Update `manifest.json` to use the correct logo files from the `public/Logo` folder.
- **Solution**: Analyzed the directory and updated `manifest.json` to use the "Circle" variants (`-1 Circle`) in three sizes (16x16, 185x185, 500x500) and updated the app name to "Ashif C. Portfolio".

## Interaction: Sync Navbar Logo & Page Title
- **Date**: 2026-01-11
- **Request**: Update the logo in `index.tsx` and the browser tab title to match `manifest.json`.
- **Solution**:
    -   **Navbar**: Imported `manifest.json` in `src/routes/index.tsx` and used `{manifest.short_name}` for the logo text.
    -   **Page Title**: Updated `src/routes/__root.tsx` to import `manifest.json` and set the `title` meta tag to `{manifest.short_name}`.
