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

import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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

// Restore the sidebar nav entry for the dev session (root content/meta.json
// intentionally omits "patterns" in the public repo — ADR-0004 — so it never
// leaks the nav item on marmoui.com; this backs it out on the way in and the
// way out so `git status` never shows it dirty).
const rootMetaPath = join(appDir, 'content/meta.json');
const rootMeta = JSON.parse(readFileSync(rootMetaPath, 'utf8'));
if (!rootMeta.pages.includes('patterns')) {
	rootMeta.pages.splice(2, 0, 'patterns'); // after "foundation", before "components"
	writeFileSync(rootMetaPath, JSON.stringify(rootMeta, null, 2) + '\n');
}

console.log(`[dev-sync-patterns] synced ${src} → content/patterns (dev only).`);
console.log('[dev-sync-patterns] added "patterns" to the sidebar nav for this dev session.');
