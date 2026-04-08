# Design System Strategy: The Digital Atelier

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Luminous Alchemist."** 

We are not building a standard e-commerce interface; we are crafting a digital atelier that mirrors the tactile, slow-made nature of Ayurvedic luxury. To move beyond the "template" look, this system rejects the rigid, boxy constraints of traditional web design in favor of **Spatial Rhythm** and **Tonal Depth**. 

We achieve a high-end editorial feel through intentional asymmetry—where images might bleed off-canvas or overlap softly with typography—and a high-contrast typography scale that demands attention. The atmosphere is warm, breathable, and deeply organic, treating every screen as a curated editorial spread rather than a functional grid.

---

## 2. Colors & Surface Philosophy
The palette is a sophisticated blend of honey-inspired ambers, botanical greens, and earthen creams.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Structural boundaries must be defined solely through background color shifts or negative space. For example, a `surface-container-low` section should sit directly against a `background` (#fcf9f4) to create a soft, sophisticated transition. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers, like stacked sheets of handmade vellum.
*   **Base Layer:** `background` (#fcf9f4) – The wide-open canvas.
*   **Mid Layer:** `surface-container` (#f0ede8) – Used for grouping related content blocks.
*   **Top Layer:** `surface-container-lowest` (#ffffff) – Reserved for high-priority interactive cards or "floating" elements to provide a crisp, clean lift.

### The "Glass & Gradient" Rule
Flat color is the enemy of premium design. To provide visual "soul":
*   **Signature Glow:** Use linear gradients for primary CTAs and hero backgrounds, transitioning from `primary` (#7b5800) to `primary-container` (#d59f2b) at a 135-degree angle. This mimics the translucent quality of honey.
*   **Botanical Glass:** For floating navigation or over-image overlays, use `surface` colors at 80% opacity with a `20px` backdrop-blur. This ensures the organic textures of the background bleed through softly.

---

## 3. Typography: The Editorial Voice
Our typography is a dialogue between the artisanal past and the modern present.

*   **Display & Headlines (Noto Serif):** These are your "Brand Marks." Use `display-lg` (3.5rem) with tighter letter-spacing (-0.02em) to create an authoritative, high-fashion editorial presence. The serif evokes the heritage of Ayurvedic wisdom.
*   **Body & Labels (Manrope):** The "Modern Guide." Manrope provides clean, mathematical precision to balance the decorative nature of the serif. 
*   **Hierarchy Note:** Always maintain a significant scale jump between `headline-lg` and `body-lg`. If a screen feels "busy," increase the white space around the serif headings rather than shrinking the font size.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to create "pop"; we use them to create "atmosphere."

*   **The Layering Principle:** Avoid the "Z-axis" obsession of standard Material Design. Instead, stack tiers. Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f6f3ee) background. The subtle shift in hex value creates a natural, soft lift.
*   **Ambient Shadows:** If an element must float (like a main CTA or a modal), use a "Sunlight Shadow." The shadow color must be a tinted version of `on-surface` (e.g., #1c1c19 at 5% opacity) with a blur value of at least `40px` and a `12px` Y-offset. Never use pure grey or black shadows.
*   **The "Ghost Border" Fallback:** In rare cases where accessibility requires a border (like input fields), use the `outline-variant` (#d3c5ae) at 20% opacity. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Rounded `xl` (1.5rem), using the Honey Glow gradient. Text is `on-primary` (#ffffff), set in `label-md` (Manrope) with all-caps and 0.05em tracking for a "boutique" feel.
*   **Secondary:** Ghost style. No background, no border. Use `primary` (#7b5800) text with a subtle underline that expands on hover.

### Cards & Lists
*   **The Zero-Divider Rule:** Forbid the use of horizontal divider lines. Separate list items using `16px` or `24px` of vertical white space. 
*   **Artisan Cards:** Use `xl` (1.5rem) corner radius. Cards should use `surface-container-lowest` (#ffffff) and never have a visible border.

### Input Fields
*   **Style:** Minimalist. Only a bottom stroke using `outline-variant` (#d3c5ae) at 40% opacity. Upon focus, the stroke transitions to `primary` (#7b5800) and grows to 2px.
*   **Label:** Always `label-md` in `on-surface-variant` (#4f4634).

### Signature Accents
*   **Honey-Drop Icons:** Icons should be ultra-fine (1px stroke weight) using `secondary` (#5c614d). 
*   **Organic Shapes:** Use the `full` (9999px) roundedness for small badges or "Limited Edition" tags to create a pebble-like, organic feel.

---

## 6. Do's and Don'ts

### Do
*   **Embrace Asymmetry:** Align text to the left but place supporting imagery slightly off-center to the right to break the "grid" feel.
*   **Use Generous Leading:** In `body-lg`, use a line-height of 1.6 to 1.8 to ensure the text feels "expensive" and readable.
*   **Tone-on-Tone:** Use `secondary-container` (#e0e5cc) backgrounds for sections dealing with botanical ingredients to provide a subtle visual cue of the "natural" theme.

### Don't
*   **Don't use #000000:** Use `on-background` (#1c1c19) for all "black" text to maintain the warmth of the palette.
*   **Don't crowd the edges:** Maintain a minimum global margin of `32px` on mobile and `80px` on desktop. Luxury is defined by the space you *don't* use.
*   **Don't use standard "Alert" colors:** For errors, use the `error` (#ba1a1a) and `error_container` (#ffdad6) sparingly. Soften them by surrounding them with `surface` colors so they don't break the calm atmosphere.