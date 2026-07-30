---
name: Enchanted Canvas
colors:
  surface: '#131410'
  surface-dim: '#131410'
  surface-bright: '#3a3935'
  surface-container-lowest: '#0e0e0b'
  surface-container-low: '#1c1c18'
  surface-container: '#20201c'
  surface-container-high: '#2a2a26'
  surface-container-highest: '#353531'
  on-surface: '#e5e2dc'
  on-surface-variant: '#cbc4d0'
  inverse-surface: '#e5e2dc'
  inverse-on-surface: '#31312d'
  outline: '#948e99'
  outline-variant: '#49454e'
  surface-tint: '#d2bcfa'
  primary: '#d2bcfa'
  on-primary: '#38265a'
  primary-container: '#2d1b4e'
  on-primary-container: '#9783bd'
  inverse-primary: '#68558b'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#cec0e7'
  on-tertiary: '#352b4a'
  tertiary-container: '#2a203e'
  on-tertiary-container: '#9387ab'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ebddff'
  primary-fixed-dim: '#d2bcfa'
  on-primary-fixed: '#231043'
  on-primary-fixed-variant: '#4f3d72'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#cec0e7'
  on-tertiary-fixed: '#201634'
  on-tertiary-fixed-variant: '#4c4162'
  background: '#131410'
  on-background: '#e5e2dc'
  surface-variant: '#353531'
typography:
  display-lg:
    fontFamily: Literata
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Literata
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-md:
    fontFamily: Literata
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Literata
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The brand personality is "Professional Magic"—a blend of high-end reliability and whimsical wonder. It targets families, event planners, and art collectors who value quality and storytelling. The UI should evoke the feeling of opening a luxury leather-bound storybook that has come to life.

The design style is **Modern Glassmorphism** mixed with **Tactile** elements. We use deep, immersive backgrounds to create a sense of infinite space, layering content on semi-transparent "vellum" cards. Subtle animations should mimic floating dust motes or soft glows to enhance the magical atmosphere without compromising the professional structure.

## Colors

The palette centers on a deep **Midnight Purple** (#2D1B4E) which serves as the canvas for the entire experience. **Ethereal Gold** (#D4AF37) is used sparingly for primary actions, decorative accents, and high-level branding to signal luxury and prestige.

**Starlight Lavender** (#E6D7FF) provides soft contrast for secondary information and interactive states, while **Antiqued Cream** (#F9F6F0) ensures maximum readability for body text and content backgrounds. Use gradients sparingly, primarily transitioning from the deep purple to a slightly lighter violet to create depth.

## Typography

This design system utilizes a "Storybook Serif" approach for headings to establish a narrative tone. **Literata** provides a professional yet whimsical feel with its unique terminals and warm proportions. All body text uses **Plus Jakarta Sans**, chosen for its friendly, rounded terminals that maintain high legibility even at small sizes.

Headlines should use "Title Case" to feel like book titles. Ensure generous line heights to prevent the text from feeling cramped, maintaining the "airy" quality of a magical aesthetic.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a maximum container width to maintain focus on the art. We utilize an 8px base scaling system to ensure consistent rhythm.

- **Desktop:** 12-column grid with 24px gutters. Wide margins (40px) create a gallery-like focus.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** 4-column grid with 16px margins. Content should stack vertically, prioritizing character imagery.

Section vertical padding should be generous (80px–120px) to allow the "magic" to breathe and prevent the professional aesthetic from feeling cluttered.

## Elevation & Depth

We use **Glassmorphism** and **Tonal Layers** to create a sense of "Magic behind the glass."

1.  **Base Layer:** The solid Midnight Purple background.
2.  **Surface Layer:** 10% opacity Antiqued Cream with a 20px backdrop-blur. This creates the "Vellum" effect for cards and containers.
3.  **Floating Layer:** Elements like buttons or active cards use a subtle **Ambient Glow** (a soft shadow tinted with Lavender) rather than a traditional black shadow.
4.  **Accents:** 1px inner borders in low-opacity Gold create a "gilded edge" effect for high-priority cards.

## Shapes

The shape language is **Rounded**, avoiding sharp corners to maintain a family-friendly and approachable vibe. Standard components use a 0.5rem (8px) radius. Larger containers like Character Cards or Gallery Modals should use `rounded-xl` (1.5rem / 24px) to feel more like smooth, magical artifacts. Interactive elements should never be sharp, as roundedness suggests safety and playfulness.

## Components

### Character Cards
Feature a vertical aspect ratio. The image should have a subtle inner gold border. The name appears in Literata at the bottom on a frosted glass overlay. On hover, the card should scale slightly (1.02x) and increase the intensity of its lavender outer glow.

### Inquiry Forms
Input fields should be semi-transparent with a 1px Antiqued Cream border. Upon focus, the border transitions to Ethereal Gold with a soft glow. Use Plus Jakarta Sans for all form labels to ensure clarity for parents and clients.

### Art Gallery Grids
Use an asymmetrical masonry layout to feel more organic and less "corporate." Each item should have a soft "entrance" animation (fade and slight rise) as the user scrolls.

### Buttons
- **Primary:** Solid Ethereal Gold background with Midnight Purple text. Bold and authoritative.
- **Secondary:** Ghost style with a Lavender border and text.
- **Micro-interaction:** Buttons should have a subtle "shimmer" gradient effect that sweeps across the surface every few seconds to draw the eye.

### Chips & Badges
Small, pill-shaped tags used for character traits (e.g., "Princess," "Hero," "Ethereal"). Use a low-opacity Lavender fill with dark text.