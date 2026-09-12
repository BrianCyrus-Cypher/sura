---
name: Sura Visual System
colors:
  surface: '#121410'
  surface-dim: '#121410'
  surface-bright: '#383a35'
  surface-container-lowest: '#0d0f0b'
  surface-container-low: '#1a1c18'
  surface-container: '#1e201c'
  surface-container-high: '#292b26'
  surface-container-highest: '#343531'
  on-surface: '#e3e3dc'
  on-surface-variant: '#c5c9af'
  inverse-surface: '#e3e3dc'
  inverse-on-surface: '#2f312c'
  outline: '#8f937b'
  outline-variant: '#454935'
  surface-tint: '#afd520'
  primary: '#ffffff'
  on-primary: '#293500'
  primary-container: '#caf240'
  on-primary-container: '#576c00'
  inverse-primary: '#526600'
  secondary: '#cac6be'
  on-secondary: '#32302a'
  secondary-container: '#494740'
  on-secondary-container: '#b9b5ac'
  tertiary: '#ffffff'
  on-tertiary: '#2a3329'
  tertiary-container: '#dbe6d6'
  on-tertiary-container: '#5d675b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#caf240'
  primary-fixed-dim: '#afd520'
  on-primary-fixed: '#171e00'
  on-primary-fixed-variant: '#3d4d00'
  secondary-fixed: '#e7e2d9'
  secondary-fixed-dim: '#cac6be'
  on-secondary-fixed: '#1d1c16'
  on-secondary-fixed-variant: '#494740'
  tertiary-fixed: '#dbe6d6'
  tertiary-fixed-dim: '#bfc9bb'
  on-tertiary-fixed: '#151e15'
  on-tertiary-fixed-variant: '#40493e'
  background: '#121410'
  on-background: '#e3e3dc'
  surface-variant: '#343531'
typography:
  display-hero:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 68px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Sora
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  kicker:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  giant: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is built upon the concept of a "composed local signal." It is an image-led, tactile editorial platform that prioritizes local aesthetics over generic digital patterns. The UI acts as a refined frame for high-quality photography, utilizing a blend of **Minimalism** and **Tactile** design styles.

The emotional response should be one of discovery and groundedness. By using a "warm paper" and "moss-charcoal" foundation, the interface avoids the sterile coldness of typical tech platforms, instead feeling like a physical architectural journal or a premium local guide. Layouts are spacious and intentional, allowing content to breathe through high-contrast typography and thoughtful whitespace.

## Colors

The design system operates primarily in a high-atmosphere **Dark Mode** ("Outer Stage"). This mode utilizes a deep green-black foundation with an acidic lime accent to signify "the signal."

The **Light Mode** transition shifts the experience toward a "Warm Paper" aesthetic, mimicking physical editorial stock. 

- **Primary:** Used for the "Signal"—actions, highlights, and critical brand moments. 
- **Neutral/Surface:** Used for layering. In dark mode, these are moss-charcoal tones; in light mode, these are soft cream and clay.
- **Semantic:** Desaturated, natural tones (Leaf, Amber, Brick) to maintain the editorial integrity without appearing overly "digital."

## Typography

This design system uses a disciplined sans-serif hierarchy. **Sora** provides the "signal"—heavy, tight, and high-contrast for display roles. **Hanken Grotesk** handles the utilitarian and body roles with a clean, contemporary feel.

- **Display & Headlines:** Should be set with tight leading to create a "block" of text that feels structural.
- **Kickers:** Used for metadata (Location, Status). These must always be uppercase with generous tracking to act as an anchor for imagery.
- **Scale:** On mobile, display sizes must shrink aggressively to ensure no more than 2-3 words per line, maintaining the "heavy" aesthetic without breaking readability.

## Layout & Spacing

The layout philosophy follows a **Fluid Editorial Grid**. It relies on generous hero objects and intentional white space to elevate local content.

- **Grid:** A 12-column grid for desktop with wide 64px outer margins to create a "framed" magazine feel.
- **Rhythm:** All spacing must be multiples of the 4pt base. Vertical rhythm should be exaggerated between sections (using `giant` or `xxl` units) to emphasize the transition between different "stories" or "signals."
- **Reflow:** On mobile, margins reduce to 16px, and multi-column editorial layouts collapse into a single-column stack where the image always precedes the text kicker.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** rather than aggressive shadows. 

- **Surface Levels:** Depth is indicated by moving from the base neutral (`#11130F`) to the container color (`#273026`). 
- **Shadows:** When used, shadows must be extremely diffused and low-opacity, tinted with the moss/charcoal palette to avoid a "grey" digital look.
- **Tactile Accents:** Use subtle 1px inner borders on cards to give them a "pressed" or "cut-out" appearance against the background, reinforcing the tactile editorial world.

## Shapes

The shape language is **Soft** and restrained. While the layout is structural and geometric, the 0.25rem (4px) base radius prevents the UI from feeling sharp or aggressive.

- **Buttons & Inputs:** Use the standard `rounded` (4px).
- **Cards & Large Imagery:** Use `rounded-lg` (8px) to soften the large visual footprint of hero objects.
- **Interactive Tags:** Small chips can utilize `rounded-xl` (12px) to differentiate them from structural containers.

## Components

- **Buttons:** Primary buttons use the Acid Lime (`#D7FF4D`) in Dark Mode or Clay (`#A66231`) in Light Mode. They are compact, with bold Hanken Grotesk labels. No gradients.
- **Chips/Tags:** Used for "Local Signals" (e.g., Neighborhoods). These use the `kicker` type style—small, uppercase, tracked.
- **Cards:** Cards are the primary container for the "Tactile Editorial World." They should have minimal padding, allowing the image to span the full width of the container. Text is placed below with a clear `kicker` + `headline-sm` hierarchy.
- **Input Fields:** Bottom-border only or very subtle moss-charcoal backgrounds. Focus states use the primary signal color as a 2px underline.
- **Lists:** High-density lists use subtle separators (1px, low-opacity) and clear `label-md` weights for readability.
- **Hero Objects:** Elements that span 8-12 columns. These should feature a "floating" caption using the kicker style to mimic a museum or gallery label.