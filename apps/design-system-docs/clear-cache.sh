#!/bin/bash

# Clear Storybook cache for better performance
echo "🧹 Clearing Storybook cache..."

# Remove node_modules cache
rm -rf node_modules/.cache
rm -rf .storybook/.cache
rm -rf .next

# Clear Vite cache
rm -rf node_modules/.vite

# Clear pnpm cache (optional, uncomment if needed)
# pnpm store prune

# Rebuild styles
echo "🎨 Rebuilding styles..."
pnpm run copy-styles

echo "✅ Cache cleared! Run 'pnpm run dev' for optimal performance."
