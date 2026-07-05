# Storybook Preview Setup for Figma Make Integration

## Goal
Make generated components previewable in Figma Make and other tools by deploying a public Storybook with your UI components.

## Solution Architecture

```
MCP Server generates code
    ↓
References @repo/ui components
    ↓
Also generates Storybook link
    ↓
Figma Make opens iframe to deployed Storybook
    ↓
Shows live component preview
```

## Step 1: Set Up Storybook (if not already done)

Your design-system-docs app can serve as the Storybook:

```bash
cd apps/design-system-docs
pnpm add -D @storybook/react @storybook/addon-essentials
```

## Step 2: Deploy Storybook Publicly

### Option A: Vercel (Easiest)

```bash
cd apps/design-system-docs
vercel --prod
```

This gives you: `https://design-system-docs.vercel.app`

### Option B: Chromatic (Built for Storybook)

```bash
npm install -g chromatic
cd apps/design-system-docs
chromatic --project-token=your-token
```

This gives you: `https://abc123.chromatic.com`

## Step 3: Make Storybook Accessible

### If keeping UI private but Storybook public:

The Storybook **bundles** your components, so the code is compiled and minified. Your source code stays private on GitHub, but the **built output** is viewable.

**What's exposed:**
- ✅ Component visuals
- ✅ Component behavior
- ✅ Props interface (documented)

**What's NOT exposed:**
- ❌ Source code implementation
- ❌ GitHub repository
- ❌ Raw TypeScript files

This is similar to having a public docs site while keeping code private.

### If you want authentication:

Add password protection to Storybook:

```bash
# Install addon
pnpm add @storybook/addon-a11y storybook-addon-auth

# Configure in .storybook/main.ts
addons: ['storybook-addon-auth']
```

Or use Vercel's password protection (paid plan).

## Step 4: Update MCP Server to Include Preview Links

Update the generate functions to include Storybook preview URLs.

## Complete Flow

1. **User asks**: "Generate a user card with avatar and button"

2. **MCP Server returns**:
```json
{
  "code": "import { Button, Avatar } from '@repo/ui'...",
  "previewUrl": "https://design-system-docs.vercel.app/?path=/story/generated-usercard",
  "storybookIframe": "<iframe src='...' />"
}
```

3. **Figma Make embeds iframe** → Shows live component

4. **User sees actual component** rendered with your design system

## Alternative: Generate Standalone Code

For maximum compatibility, generate self-contained code:

Instead of:
```typescript
import { Button } from '@repo/ui';
<Button>Click</Button>
```

Generate:
```typescript
// Inline the Button component code
const Button = ({ children, ...props }) => (
  <button 
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    {...props}
  >
    {children}
  </button>
);

<Button>Click</Button>
```

This works everywhere but loses the connection to your design system.

## Recommended Approach

**Best of both worlds:**

1. **For development**: Generate code with `@repo/ui` imports
2. **For preview**: Include iframe link to deployed Storybook
3. **For Figma Make**: Generate standalone code OR use Storybook iframe

The MCP server can return BOTH formats:

```json
{
  "codeForDevelopment": "import { Button } from '@repo/ui'...",
  "codeForPreview": "const Button = () => ...",
  "previewUrl": "https://storybook.vercel.app/...",
  "iframeEmbed": "<iframe>..."
}
```

## Implementation

I can help you:
1. Set up Storybook deployment
2. Generate standalone component code option
3. Add preview URL generation to MCP server
4. Create iframe embeds for Figma Make

Which approach do you prefer?

















