#!/usr/bin/env node
/**
 * DEV ONLY — mirrors the private patterns docs into content/patterns so they
 * render through the normal fumadocs pipeline at /docs/patterns.
 *
 * Source: ../marmo-platform/docs/patterns (the private repo, if checked out
 * next to this one, or MARMO_PLATFORM_DIR). content/patterns is gitignored —
 * these files must never be committed to the public repo (ADR-0004).
 *
 * Access locally: set MARMO_DEV_PRO=true (middleware gates /docs/patterns).
 * Runs automatically before `pnpm dev`; silently no-ops when the private
 * repo isn't present (contributors without access just don't see patterns).
 */

import { cpSync, existsSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const appDir = resolve(new URL('..', import.meta.url).pathname);
const platformDir = process.env.MARMO_PLATFORM_DIR
	? resolve(process.env.MARMO_PLATFORM_DIR)
	: resolve(appDir, '../../../marmo-platform');
const src = join(platformDir, 'docs/patterns');
const dest = join(appDir, 'content/patterns');

if (!existsSync(src)) {
	console.log('[dev-sync-patterns] private repo not found — skipping (public-only dev).');
	process.exit(0);
}

rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true });
writeFileSync(
	join(dest, '.gitignore'),
	'# Synced from marmo-platform for local dev — never commit (ADR-0004).\n*\n'
);
console.log(`[dev-sync-patterns] synced ${src} → content/patterns (dev only).`);
