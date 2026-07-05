# 🚀 Start Here - Marmo UI Docs

Quick guide to get the design system documentation running.

## ⚡ Quick Start

```bash
# 1. Navigate to the directory
cd apps/design-system-docs

# 2. Kill any existing process on port 3002
lsof -ti:3002 | xargs kill -9

# 3. Clean and start fresh
rm -rf .next
pnpm install
pnpm dev:docs
```

Visit: **http://localhost:3002**

## 🎯 What's Included

### Documentation Site (Port 3002)

- **Introduction** - Getting started guides
- **Foundation** - Design tokens, colors, typography, spacing
- **Components** - Component documentation with auto-generated props
- **Patterns** - UI patterns and best practices

### Storybook (Port 6006)

- Interactive component explorer
- Live component examples
- Props controls

## 📝 Common Commands

```bash
# Run both docs + Storybook
pnpm dev

# Run docs only
pnpm dev:docs

# Run Storybook only
pnpm dev:storybook

# Generate component props
pnpm generate:props

# Build for production
pnpm build

# Clean everything
pnpm clean
```

## 🔧 Troubleshooting

### Styles Not Loading

```bash
# Clean and rebuild
rm -rf .next
pnpm install
pnpm dev:docs
```

### Module Not Found

```bash
# Build the UI package first
cd ../../packages/ui
pnpm build
cd ../../apps/design-system-docs
pnpm dev:docs
```

## 📚 Key Files

| File                            | Purpose                   |
| ------------------------------- | ------------------------- |
| `src/app/`                      | Documentation pages (MDX) |
| `src/components/`               | React components for docs |
| `stories/`                      | Storybook stories         |
| `scripts/generate-props.ts`     | Extracts component props  |
| `src/data/component-props.json` | Generated props data      |

## ✍️ Adding Documentation

### 1. Create a Component Page

```mdx
<!-- src/app/components/my-component/page.mdx -->

export const metadata = {
	title: 'MyComponent - Marmo UI',
	description: 'Description of MyComponent',
};

# MyComponent

Component description...

## Usage

\`\`\`tsx
import { MyComponent } from '@marmoui/ui';
\`\`\`

## Props

<Props componentName="MyComponent" />
```

### 2. Generate Props

```bash
pnpm generate:props
```

### 3. View Your Page

Visit: `http://localhost:3002/components/my-component`

## 🎨 Styling

The site uses:

- **Tailwind CSS 4** - Utility classes
- **CSS Variables** - Design tokens in `globals.css`
- **Dark Mode** - Toggle in header

### Custom Colors

Edit `src/app/globals.css`:

```css
:root {
	--primary: 222.2 47.4% 11.2%;
	--background: 0 0% 100%;
	/* ... more colors */
}
```

## 🆘 Need Help?

1. Check [README.md](./README.md) for complete documentation
2. Check [PROPS-DOCUMENTATION.md](./PROPS-DOCUMENTATION.md) for props system
3. Check [CHANGESETS.md](../../CHANGESETS.md) for version management

## ✅ Checklist

- [ ] Port 3002 is available
- [ ] Dependencies installed (`pnpm install`)
- [ ] UI package is built (`pnpm --filter @marmoui/ui build`)
- [ ] `.next` cache cleared if needed
- [ ] Server running (`pnpm dev:docs`)

---

**Ready to go? Run `pnpm dev:docs` and visit http://localhost:3002** 🎉
