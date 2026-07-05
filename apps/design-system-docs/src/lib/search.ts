import Fuse, { type FuseResultMatch } from 'fuse.js';
import type { SearchIndexItem } from './content';

/**
 * Create a Fuse.js search instance
 */
export function createSearchIndex(items: SearchIndexItem[]) {
	return new Fuse(items, {
		keys: [
			{ name: 'title', weight: 3 },
			{ name: 'description', weight: 2 },
			{ name: 'keywords', weight: 2 },
			{ name: 'category', weight: 1 },
			{ name: 'content', weight: 1 },
		],
		threshold: 0.3,
		includeScore: true,
		includeMatches: true,
		minMatchCharLength: 2,
	});
}

/**
 * Search content items
 */
export function searchContent(searchIndex: Fuse<SearchIndexItem>, query: string): SearchResult[] {
	if (!query || query.trim().length < 2) {
		return [];
	}

	const results = searchIndex.search(query);

	return results.map(result => ({
		item: result.item,
		score: result.score || 0,
		matches: result.matches || [],
	}));
}

export interface SearchResult {
	item: SearchIndexItem;
	score: number;
	matches: readonly FuseResultMatch[];
}

/**
 * Highlight matching text in search results
 */
export function highlightMatches(text: string, matches: readonly FuseResultMatch[]): string {
	if (!matches || matches.length === 0) {
		return text;
	}

	// Sort matches by start position
	const sortedMatches = matches.flatMap(match => match.indices).sort((a, b) => a[0] - b[0]);

	let result = '';
	let lastIndex = 0;

	sortedMatches.forEach(([start, end]) => {
		// Add text before match
		result += text.slice(lastIndex, start);
		// Add highlighted match
		result += `<mark>${text.slice(start, end + 1)}</mark>`;
		lastIndex = end + 1;
	});

	// Add remaining text
	result += text.slice(lastIndex);

	return result;
}

/**
 * Get suggested results based on category or keywords
 */
export function getSuggestions(
	items: SearchIndexItem[],
	category?: string,
	limit: number = 5
): SearchIndexItem[] {
	let filtered = items;

	if (category) {
		filtered = items.filter(item => item.category === category);
	}

	// Sort by relevance (you can customize this)
	return filtered.slice(0, limit);
}

/**
 * Filter results by category
 */
export function filterByCategory(results: SearchResult[], category: string): SearchResult[] {
	return results.filter(result => result.item.category === category);
}

/**
 * Group search results by category
 */
export function groupResultsByCategory(results: SearchResult[]): Record<string, SearchResult[]> {
	return results.reduce(
		(acc, result) => {
			const category = result.item.category;
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(result);
			return acc;
		},
		{} as Record<string, SearchResult[]>
	);
}
