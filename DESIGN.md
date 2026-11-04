# UISS light interface

All public and administration pages use the UISS light theme, shared controls, typography, spacing, and interaction rules below.

## Theme and typography

- Keep the default appearance light: `#FAFAFA` page canvas, `#FFFFFF` elevated panels, `#F2F2F2` recessed controls, and `#171717` primary text.
- Use `#666666` for readable supporting copy. Paler grays belong to decorative or disabled elements.
- Interface color is grayscale. `#0072F5` identifies keyboard focus and selected interactive details; inputs use the darker `#005FCC` focus outline.
- Keep natural colors in student photographs, university crests, collaborator logos, and merchandise images. They are content, not interface accents.
- Load the bundled Geist Sans and Geist Mono files through `next/font/local`. Do not add a second interface font.
- Use weights 400, 500, and 600. Display headings use 600; ordinary controls and copy use 400 or 500.
- Use `uiss-page-title` for page headings and `uiss-section-title` for section headings. Their desktop sizes are 48px and 32px, with smaller phone sizes and tight tracking. Preserve semantic heading levels.

## Layout and controls

`app/tokens.css` and `app/globals.css` own the visual system. Reuse `uiss-container`, `Button`, `Input`, `Card`, and the other shared primitives.

Keep a 1200px content limit, 24px page gutters, and spacing in multiples of 4px. The header is a full-width, 64px white strip; it must remain stable while scrolling. The footer is a compact navigation area.

Use `uiss-container` for the outer content edge. Do not combine a fixed maximum width with another layer of page padding inside that edge. Public page introductions use `uiss-page-intro` (64px top space on phones, 96px from 640px). The following section supplies the gap below the introduction. Use `uiss-section` for ordinary sections (48px block padding on phones, 64px from 640px) and `uiss-page-content` for a complete single-section page. The home hero may stay centered; other page and section headings align to the content edge. Article text uses the centered reading rail, capped at 672px.

Within headings, leave 16px from the eyebrow to the title and from the title to supporting copy. Place grids 32px below their heading group on phones and 40px on larger screens. Form labels and their controls belong in one group with an 8px gap; use 24px between groups. Reuse `uiss-form-fields` for administration field stacks. Administration pages use 24px gutters and 32px vertical padding, increasing to 32px and 48px respectively when the desktop sidebar is present.

Group content with space first, using larger gaps between groups than within them. Do not add decorative section rules, article side rails, or grid lines around ordinary content. Keep subtle separators where they help dense tables and data lists. Preserve input boundaries, selected states, and focus indicators.

Panels use a thin shadow outline and layered elevation, without adding a physical border to their box dimensions. Buttons and form controls use `--uiss-radius-control: 6px`; the shared Button and native button rule enforce this even when older classes specify another radius. Panels use 12px corners. Keep circles for avatars, status dots, and noninteractive badges. Keep touch targets at least 44px where a compact desktop control would be too small.

Primary actions are black; secondary actions are white or neutral. Do not add decorative gradients, gold fills, oversized wordmarks, repeated promotional panels, or hover movement. Leadership portraits use a 200ms clip-path transition that changes the lower inset from 0px to 4px and the image corners from 12px to 16px on card hover, only on hover-capable pointers without a reduced-motion preference. Keep portrait colors intact.

## Interaction and accessibility

Every animation needs a purpose. Buttons and navigation use color feedback. Keyboard actions and FAQ disclosures respond immediately. Club previews may use a short 220ms ease-out transition for pointer input, with immediate behavior for keyboard input and reduced motion. Carousels jump immediately for keyboard input and reduced motion. Article section navigation and blog filters respond without blur, springs, or delayed labels. Preserve focus trapping, Escape dismissal, trigger focus restoration, and scroll cleanup.

Use a white gap plus a blue outer ring for keyboard focus. Do not remove the visible focus indicator. Keep the skip link and its focusable main-content target. Hidden FAQ content and closed navigation must leave the tab order.

Keep status messages on neutral panels; use a small semantic status dot and readable text. Invalid form fields may retain an error indicator. Preserve actual membership validation, authentication restrictions, explicit merchandise size selection, and generated order destinations.

## Validation

Run the existing lint, format, type, dependency regression, and build checks. Review phone, tablet, and desktop layouts through the existing Chrome connection. Do not launch a separate browser. Confirm keyboard behavior and avoid submitting membership applications or sending test orders.
