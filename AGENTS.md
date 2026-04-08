<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Honey Bee Storefront — Agents

This repository has a dedicated AI agent for storefront development. See `.github/agents/` for agent definitions.

## Available Agents

### 🍯 Honey Bee Dev

**File**: `.github/agents/honey-bee-storefront-dev.agent.md`

**Role**: Dedicated Honey Bee Artisan Soap Storefront Developer

**Use for:**
- Building or editing any page in this storefront (homepage, shop, PDP, our story)
- Implementing Stitch "Luminous Alchemist" design system components
- Product cards, hero sections, navigation, footer
- Shop listing with filters
- Product detail pages with image gallery + ingredient breakdown
- Cart and checkout flows
- SEO metadata (`generateMetadata`, Schema.org Product)
- Responsive layouts (mobile + desktop)
- Performance optimization (SSG, next/image, Core Web Vitals)

**Expertise:**
- The exact Stitch design system — colors, fonts, utility classes
- Honey Bee brand identity (warm amber + botanical + editorial luxury)
- Next.js 14 App Router + Server Components
- Tailwind CSS with Honey Bee token extensions
- SEO: dynamic metadata, structured data, sitemaps

**Critical Knowledge:**
- `src/design-system/HONEY-BEE-DESIGN-SYSTEM.md` — reads before any UI work
- `src/design-system/design-reference/stitch/` — views screen.png prototypes
- `.github/skills/honey-bee-storefront-design/SKILL.md` — quick component reference

**Example Tasks:**
- *"Build the homepage hero section matching the Stitch design"*
- *"Create the artisan product card component"*
- *"Implement the shop listing page with sidebar filters"*
- *"Add the product detail page with ingredient breakdown"*
- *"Build the Our Story page with the founder's journey and Nurse's Promise section"*
- *"Create the sticky navigation with botanical-glass frosted effect"*
- *"Add SEO metadata and Schema.org markup to product pages"*
- *"Implement the mobile bottom navigation bar"*

---

## Design System Quick Reference

| File | Purpose |
|------|---------|
| `src/design-system/HONEY-BEE-DESIGN-SYSTEM.md` | Full design documentation |
| `src/design-system/design-reference/stitch/` | Stitch HTML prototypes + screenshots |
| `src/design-system/tokens/colors.ts` | Color token definitions |
| `src/design-system/tokens/typography.ts` | Typography tokens |
| `.github/skills/honey-bee-storefront-design/SKILL.md` | Agent skill (quick ref) |
| `../.github/skills/honey-bee-storefront-design/SKILL.md` | Platform-level skill |

## Platform Agents

For cross-cutting concerns, the platform agents in `../.github/agents/` are also available:

| Agent | Use for |
|-------|---------|
| **Storefront Frontend Dev** | Generic storefront patterns, design system creation |
| **Backend Developer** | API endpoints, models, migrations |
| **Tech Lead** | Architecture decisions, feature planning |
| **QA & Testing Expert** | Pre-commit validation, accessibility audits |
| **Brand Identity Designer** | Brand strategy, palette review, style guides |
