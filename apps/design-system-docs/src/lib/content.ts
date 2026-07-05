import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import strip from 'strip-markdown';

export interface ContentMetadata {
	title: string;
	description: string;
	category?: string;
	status?: 'stable' | 'beta' | 'alpha' | 'deprecated';
	keywords?: string[];
	lastUpdated?: string;
	storybookUrl?: string;
	githubUrl?: string;
	slug: string;
	path: string;
}

export interface ContentItem extends ContentMetadata {
	content: string;
	excerpt?: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Get all content files from a directory
 */
export function getContentFiles(dir: string): string[] {
	const fullPath = path.join(CONTENT_DIR, dir);

	if (!fs.existsSync(fullPath)) {
		return [];
	}

	const files = fs.readdirSync(fullPath);
	return files
		.filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
		.map(file => path.join(dir, file));
}

/**
 * Parse content file and extract metadata
 */
export async function parseContentFile(filePath: string): Promise<ContentItem | null> {
	try {
		const fullPath = path.join(CONTENT_DIR, filePath);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data, content } = matter(fileContents);

		// Extract slug from filename
		const slug = path.basename(filePath, path.extname(filePath));

		// Strip markdown for plain text excerpt
		const excerpt = await stripMarkdown(content.slice(0, 500));

		return {
			title: data.title || slug,
			description: data.description || '',
			category: data.category,
			status: data.status || 'stable',
			keywords: data.keywords || [],
			lastUpdated: data.lastUpdated,
			slug,
			path: filePath,
			content,
			excerpt,
		};
	} catch (error) {
		console.error(`Error parsing content file ${filePath}:`, error);
		return null;
	}
}

/**
 * Get all content items from a directory
 */
export async function getAllContent(dir: string): Promise<ContentItem[]> {
	const files = getContentFiles(dir);
	const content = await Promise.all(files.map(file => parseContentFile(file)));
	return content.filter((item): item is ContentItem => item !== null);
}

/**
 * Get content by slug
 */
export async function getContentBySlug(dir: string, slug: string): Promise<ContentItem | null> {
	const filePath = path.join(dir, `${slug}.mdx`);
	return parseContentFile(filePath);
}

/**
 * Strip markdown to plain text
 */
async function stripMarkdown(markdown: string): Promise<string> {
	const result = await remark().use(strip).process(markdown);
	return result.toString().trim();
}

/**
 * Build search index from content
 */
export async function buildSearchIndex(): Promise<SearchIndexItem[]> {
	const components = await getAllContent('components');
	const foundation = await getAllContent('foundation');
	const patterns = await getAllContent('patterns');
	const introduction = await getAllContent('introduction');

	const allContent = [...components, ...foundation, ...patterns, ...introduction];

	return allContent.map(item => ({
		title: item.title,
		description: item.description,
		category: item.category || 'Other',
		keywords: item.keywords || [],
		slug: item.slug,
		path: item.path,
		content: item.excerpt || '',
	}));
}

export interface SearchIndexItem {
	title: string;
	description: string;
	category: string;
	keywords: string[];
	slug: string;
	path: string;
	content: string;
}

/**
 * Group content by category
 */
export function groupByCategory(items: ContentItem[]): Record<string, ContentItem[]> {
	return items.reduce(
		(acc, item) => {
			const category = item.category || 'Other';
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(item);
			return acc;
		},
		{} as Record<string, ContentItem[]>
	);
}

/**
 * Get content metadata only (for navigation, etc.)
 */
export async function getContentMetadata(dir: string): Promise<ContentMetadata[]> {
	const files = getContentFiles(dir);
	const metadata = await Promise.all(
		files.map(async file => {
			const content = await parseContentFile(file);
			if (!content) return null;

			const { content: _, excerpt: __, ...meta } = content;
			return meta;
		})
	);
	return metadata.filter((item): item is ContentMetadata => item !== null);
}
