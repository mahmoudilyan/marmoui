#!/usr/bin/env node
/**
 * Fetch Figma node specs via the REST API (no MCP rate limits).
 *
 * Usage:
 *   pnpm figma:node <fileKey> <nodeId> [nodeId...]
 *   pnpm figma:node tm7eI7RbSgnIFAbRjewvDD 2554:111614 7469:54748
 *
 * Requires FIGMA_TOKEN in the environment or in repo-root .env.local.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function loadEnvLocal() {
	const envPath = resolve(root, '.env.local');
	if (!existsSync(envPath)) return;
	for (const line of readFileSync(envPath, 'utf8').split('\n')) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const eq = trimmed.indexOf('=');
		if (eq === -1) continue;
		const key = trimmed.slice(0, eq).trim();
		const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
		if (!process.env[key]) process.env[key] = value;
	}
}

loadEnvLocal();

const [, , fileKey, ...rawNodeIds] = process.argv;

if (!fileKey || rawNodeIds.length === 0) {
	console.error('Usage: pnpm figma:node <fileKey> <nodeId> [nodeId...]');
	console.error('Example: pnpm figma:node tm7eI7RbSgnIFAbRjewvDD 2554:111614');
	process.exit(1);
}

const token = process.env.FIGMA_TOKEN;
if (!token) {
	console.error('Missing FIGMA_TOKEN. Add it to .env.local at the repo root.');
	process.exit(1);
}

const nodeIds = rawNodeIds.map(id => id.replace('-', ':')).join(',');
const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeIds)}`;

const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
const data = await res.json();

if (!res.ok) {
	console.error(JSON.stringify(data, null, 2));
	process.exit(1);
}

for (const [id, entry] of Object.entries(data.nodes ?? {})) {
	const doc = entry.document;
	const bb = doc?.absoluteBoundingBox;
	console.log(`\n=== ${id} · ${doc?.name} ===`);
	if (bb) console.log(`Size: ${bb.width}×${bb.height}`);

	walk(doc, 0);
}

function walk(node, depth) {
	if (!node || depth > 5) return;
	const bb = node.absoluteBoundingBox;
	const style = node.style ?? {};
	const pad = [node.paddingLeft, node.paddingRight, node.paddingTop, node.paddingBottom];
	const fills = (node.fills ?? [])
		.filter(f => f.visible !== false && f.type === 'SOLID' && f.color)
		.map(f => rgb(f.color));

	const parts = [
		'  '.repeat(depth) + `${node.type} "${node.name}"`,
		bb ? `${Math.round(bb.width)}×${Math.round(bb.height)}` : null,
		node.layoutMode ? `${node.layoutMode} gap=${node.itemSpacing ?? 0}` : null,
		pad.some(p => p != null) ? `pad=${pad.map(p => p ?? 0).join('/')}` : null,
		fills.length ? `fill=${fills.join(',')}` : null,
		style.fontSize ? `font=${style.fontSize}/${style.fontWeight}` : null,
		node.characters ? `text="${node.characters.slice(0, 60)}"` : null,
	].filter(Boolean);

	console.log(parts.join(' · '));

	for (const child of node.children ?? []) {
		walk(child, depth + 1);
	}
}

function rgb({ r, g, b }) {
	return `#${[r, g, b].map(c => Math.round(c * 255).toString(16).padStart(2, '0')).join('')}`;
}
