/**
 * Knowledge base coverage audit for the docs-driven MCP knowledge.
 * and with the MCP indexer merge rule (props description, else MDX frontmatter).
 *
 * Run from repo root: pnpm --filter @marmoui/design-system-docs audit:knowledge
 * Or: cd apps/design-system-docs && pnpm audit:knowledge
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKIP_MDX = new Set(['index.mdx', 'components.mdx']);

interface ComponentEntry {
	description?: string;
	props?: unknown[];
}

function pct(part: number, whole: number): number {
	if (whole === 0) return 0;
	return Math.round((part / whole) * 1000) / 10;
}

function statusEmoji(score: number, target: number): string {
	if (score >= target) return '✅';
	if (score >= target * 0.5) return '⚠️';
	return '❌';
}

/** Same as MCP mdx-parser: component key from frontmatter title */
function componentKeyFromTitle(title: string): string {
	return title.replace(/\s+/g, '');
}

function main(): void {
	const propsPath = path.resolve(__dirname, '../src/data/component-props.json');
	const mdxDir = path.resolve(__dirname, '../content/components');

	const raw = fs.readFileSync(propsPath, 'utf8');
	const propsData = JSON.parse(raw) as Record<string, ComponentEntry>;

	const componentNames = Object.keys(propsData);
	const totalComponents = componentNames.length;

	const withPropsDesc = componentNames.filter(name => {
		const d = propsData[name]?.description;
		return typeof d === 'string' && d.trim().length > 0;
	}).length;

	const mdxFiles = fs.readdirSync(mdxDir).filter(
		f => f.endsWith('.mdx') && !SKIP_MDX.has(f)
	);

	/** MDX frontmatter description present (per docs page) */
	let mdxFilesWithFrontmatterDesc = 0;
	/** Same merge rule as indexer: props description OR MDX metadata.description for that component key */
	let mergeVisibleFromPropsIndex = 0;

	/** From MDX: component key -> frontmatter has non-empty description */
	const mdxDescByKey = new Map<string, boolean>();

	let hasExamples = 0;
	let hasPatterns = 0;
	let hasMistakes = 0;
	let hasA11y = 0;

	for (const file of mdxFiles) {
		const filePath = path.join(mdxDir, file);
		const fileContent = fs.readFileSync(filePath, 'utf8');
		const { data } = matter(fileContent);

		const title = typeof data.title === 'string' ? data.title : '';
		const fmDesc =
			typeof data.description === 'string' && data.description.trim().length > 0;
		if (fmDesc) mdxFilesWithFrontmatterDesc++;

		if (title) {
			const key = componentKeyFromTitle(title);
			mdxDescByKey.set(key, fmDesc);
			// Match loader alias: "Icon Button" also registers under spaced title
			if (key !== title) {
				mdxDescByKey.set(title, fmDesc);
			}
		}

		if (fileContent.includes('<CodeExample')) hasExamples++;
		if (fileContent.includes('## Patterns')) hasPatterns++;
		if (fileContent.includes('## Common Mistakes')) hasMistakes++;
		if (fileContent.includes('## Accessibility')) hasA11y++;
	}

	for (const name of componentNames) {
		const fromProps =
			typeof propsData[name]?.description === 'string' &&
			propsData[name].description!.trim().length > 0;
		const fromMdx = mdxDescByKey.get(name) === true;
		if (fromProps || fromMdx) mergeVisibleFromPropsIndex++;
	}

	const n = mdxFiles.length;

	const rows: {
		metric: string;
		score: number;
		count: string;
		target: number;
	}[] = [
		{
			metric: 'Props JSON component descriptions only',
			score: pct(withPropsDesc, totalComponents),
			count: `${withPropsDesc}/${totalComponents}`,
			target: 100,
		},
		{
			metric: 'MDX frontmatter `description`',
			score: pct(mdxFilesWithFrontmatterDesc, n),
			count: `${mdxFilesWithFrontmatterDesc}/${n}`,
			target: 100,
		},
		{
			metric: 'MCP-visible summary (props ∪ MDX)*',
			score: pct(mergeVisibleFromPropsIndex, totalComponents),
			count: `${mergeVisibleFromPropsIndex}/${totalComponents}`,
			target: 100,
		},
		{
			metric: 'MDX code examples',
			score: pct(hasExamples, n),
			count: `${hasExamples}/${n}`,
			target: 100,
		},
		{
			metric: 'MDX ## Patterns sections',
			score: pct(hasPatterns, n),
			count: `${hasPatterns}/${n}`,
			target: 80,
		},
		{
			metric: 'MDX ## Common Mistakes sections',
			score: pct(hasMistakes, n),
			count: `${hasMistakes}/${n}`,
			target: 80,
		},
		{
			metric: 'MDX Accessibility sections',
			score: pct(hasA11y, n),
			count: `${hasA11y}/${n}`,
			target: 97,
		},
	];

	console.log('Knowledge base audit (@marmoui/design-system-docs)\n');
	console.log(
		[
			'| Metric | Score | Count | Target |',
			'|--------|-------|-------|--------|',
			...rows.map(
				r =>
					`| ${r.metric} | ${r.score}% ${statusEmoji(r.score, r.target)} | ${r.count} | ${r.target}% |`
			),
		].join('\n')
	);
	console.log(
		'\n*Per `component-props.json` entry: non-empty top-level `description` **or** MDX page whose `title` maps to that key with frontmatter `description` (same merge as MCP indexer).'
	);
	console.log(
		`  Many entries are subcomponents without a dedicated MDX page — low merge % is expected until JSON descriptions exist.\n`
	);
	console.log(
		`MDX files scanned: ${n} (excluding ${[...SKIP_MDX].join(', ')})`
	);
	console.log(`Props entries: ${totalComponents} (${propsPath})`);
}

main();
