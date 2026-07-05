# Stage 1: Install dependencies and build
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# Copy workspace config, lockfile, and .npmrc
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json .npmrc ./
COPY apps/design-system-docs/package.json ./apps/design-system-docs/
COPY packages/ui/package.json ./packages/ui/

# Install dependencies (full install to preserve symlinks and hoisting)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/ui/ ./packages/ui/
COPY apps/design-system-docs/ ./apps/design-system-docs/

# Build UI package first
RUN pnpm --filter @marmoui/ui build || true

# Build the docs app
WORKDIR /app/apps/design-system-docs
ENV NEXT_TURBOPACK_ROOT=/app
RUN pnpm build:docs

# Stage 2: Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/apps/design-system-docs/.next/standalone ./
COPY --from=builder /app/apps/design-system-docs/.next/static ./apps/design-system-docs/.next/static
COPY --from=builder /app/apps/design-system-docs/public ./apps/design-system-docs/public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/design-system-docs/server.js"]
