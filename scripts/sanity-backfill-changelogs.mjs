#!/usr/bin/env node
/**
 * Backfills EVERY version section of the package CHANGELOGs into Sanity as
 * `post` documents for /updates. Idempotent (slug-keyed createIfNotExists) —
 * safe to rerun; existing posts are never overwritten.
 *
 * Usage (reads env from apps/design-system-docs/.env when run via dotenv, or
 * export the vars):
 *   SANITY_PROJECT_ID=… SANITY_WRITE_TOKEN=… node scripts/sanity-backfill-changelogs.mjs
 */

import { readFileSync } from 'node:fs';

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
	console.error('Set SANITY_PROJECT_ID (or NEXT_PUBLIC_…) and SANITY_WRITE_TOKEN.');
	process.exit(1);
}

const CHANGELOGS = [
	{ pkg: '@marmoui/ui', file: 'packages/ui/CHANGELOG.md' },
	{ pkg: 'marmoui', file: 'packages/cli/CHANGELOG.md' },
];

const block = (text, style = 'normal') => ({
	_type: 'block',
	style,
	markDefs: [],
	children: [{ _type: 'span', marks: [], text }],
});

function toPortableText(md) {
	const blocks = [];
	for (const rawLine of md.split('\n')) {
		const line = rawLine.trim();
		if (!line) continue;
		const heading = line.match(/^(#{3,4})\s+(.*)/);
		if (heading) {
			blocks.push(block(heading[2], 'h3'));
			continue;
		}
		if (/^[-*]\s+/.test(line)) {
			blocks.push({ ...block(line.replace(/^[-*]\s+/, '')), listItem: 'bullet', level: 1 });
			continue;
		}
		blocks.push(block(line));
	}
	return blocks;
}

/** Split a changesets CHANGELOG into [{version, body}] sections. */
function parseChangelog(file) {
	let md;
	try {
		md = readFileSync(file, 'utf8');
	} catch {
		return [];
	}
	const sections = [];
	const lines = md.split('\n');
	let current = null;
	for (const line of lines) {
		const version = line.match(/^## (\d+\.\d+\.\d+.*)/);
		if (version) {
			if (current) sections.push(current);
			current = { version: version[1].trim(), lines: [] };
		} else if (current) {
			current.lines.push(line);
		}
	}
	if (current) sections.push(current);
	return sections.map(s => ({ version: s.version, body: s.lines.join('\n').trim() }));
}

/** First meaningful line as the excerpt, ≤160 chars. */
function excerptFrom(body, fallback) {
	const line = body
		.split('\n')
		.map(l => l.replace(/^[-*#\s]+/, '').trim())
		.find(l => l && !/^(Minor|Major|Patch) Changes$/i.test(l));
	return (line || fallback).slice(0, 160);
}

const mutations = [];
// Backfilled posts get staggered past dates so ordering reads naturally
// (oldest version = oldest date). Git history would be more precise; for a
// young changelog, day-offsets are indistinguishable in the UI.
const now = Date.now();

for (const { pkg, file } of CHANGELOGS) {
	const sections = parseChangelog(file);
	sections.forEach((section, idx) => {
		const title = `${pkg} v${section.version}`;
		const slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
			.slice(0, 96);
		mutations.push({
			createIfNotExists: {
				_id: `release-${slug}`,
				_type: 'post',
				title,
				slug: { _type: 'slug', current: slug },
				excerpt: excerptFrom(section.body, `${pkg} ${section.version} released.`),
				publishedAt: new Date(now - idx * 86_400_000).toISOString(),
				body: toPortableText(section.body || 'See the changelog on GitHub.'),
			},
		});
	});
}

if (mutations.length === 0) {
	console.log('No changelog sections found.');
	process.exit(0);
}

const res = await fetch(`https://${projectId}.api.sanity.io/v2026-07-01/data/mutate/${dataset}`, {
	method: 'POST',
	headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
	body: JSON.stringify({ mutations }),
});

if (!res.ok) {
	console.error(`mutate failed ${res.status}: ${await res.text()}`);
	process.exit(1);
}
const result = await res.json();
console.log(`Backfilled ${mutations.length} release post(s):`);
for (const m of mutations) console.log(`  · ${m.createIfNotExists.title} → /updates/${m.createIfNotExists.slug.current}`);
console.log(`Transaction: ${result.transactionId}`);
