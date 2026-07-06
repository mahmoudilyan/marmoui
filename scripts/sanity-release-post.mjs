#!/usr/bin/env node
/**
 * Creates a Sanity `post` (the /updates feed) for a package release.
 * Runs in CI after `changeset publish` (see ui-deploy.yml); zero deps.
 *
 * Env:
 *   SANITY_PROJECT_ID   — same as NEXT_PUBLIC_SANITY_PROJECT_ID
 *   SANITY_DATASET      — default 'production'
 *   SANITY_WRITE_TOKEN  — Editor token (sanity.io/manage → API → Tokens)
 *   PUBLISHED_PACKAGES  — JSON from changesets/action outputs.publishedPackages
 *                         e.g. [{"name":"@marmoui/ui","version":"1.1.0"}]
 */

import { readFileSync } from 'node:fs';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;
const publishedRaw = process.env.PUBLISHED_PACKAGES || '[]';

if (!projectId || !token) {
	console.log('sanity-release-post: SANITY_PROJECT_ID / SANITY_WRITE_TOKEN unset — skipping.');
	process.exit(0);
}

let published;
try {
	published = JSON.parse(publishedRaw);
} catch {
	console.error('sanity-release-post: PUBLISHED_PACKAGES is not valid JSON');
	process.exit(1);
}
if (!Array.isArray(published) || published.length === 0) {
	console.log('sanity-release-post: nothing published — skipping.');
	process.exit(0);
}

const CHANGELOGS = {
	'@marmoui/ui': 'packages/ui/CHANGELOG.md',
	marmoui: 'packages/cli/CHANGELOG.md',
};

/** Extract the changelog section for an exact version. */
function changelogSection(file, version) {
	let md;
	try {
		md = readFileSync(file, 'utf8');
	} catch {
		return null;
	}
	const lines = md.split('\n');
	const start = lines.findIndex(l => l.trim() === `## ${version}`);
	if (start === -1) return null;
	const rest = lines.slice(start + 1);
	const end = rest.findIndex(l => /^## /.test(l));
	return rest.slice(0, end === -1 ? rest.length : end).join('\n').trim();
}

const block = (text, style = 'normal') => ({
	_type: 'block',
	style,
	markDefs: [],
	children: [{ _type: 'span', marks: [], text }],
});

/** Minimal markdown → portable text (headings, bullets, paragraphs). */
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
		blocks.push(block(line.replace(/^[-*]\s+/, '')));
	}
	return blocks;
}

const today = new Date().toISOString();
const names = published.map(p => `${p.name}@${p.version}`).join(' · ');
const title =
	published.length === 1
		? `${published[0].name} v${published[0].version}`
		: `Release: ${names}`;
const slug = title
	.toLowerCase()
	.replace(/[^a-z0-9]+/g, '-')
	.replace(/^-+|-+$/g, '')
	.slice(0, 96);

const body = [];
for (const pkg of published) {
	const section = changelogSection(CHANGELOGS[pkg.name], pkg.version);
	if (published.length > 1) body.push(block(`${pkg.name} v${pkg.version}`, 'h3'));
	body.push(...toPortableText(section || 'See the changelog on GitHub.'));
}

const doc = {
	_type: 'post',
	title,
	slug: { _type: 'slug', current: slug },
	excerpt: `Now on npm: ${names}.`,
	publishedAt: today,
	body,
};

const res = await fetch(
	`https://${projectId}.api.sanity.io/v2026-07-01/data/mutate/${dataset}`,
	{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		// createIfNotExists keyed by slug-derived id → reruns are idempotent.
		body: JSON.stringify({
			mutations: [{ createIfNotExists: { _id: `release-${slug}`, ...doc } }],
		}),
	}
);

if (!res.ok) {
	console.error(`sanity-release-post: mutate failed ${res.status}: ${await res.text()}`);
	process.exit(1);
}
console.log(`sanity-release-post: published "${title}" → /updates/${slug}`);
