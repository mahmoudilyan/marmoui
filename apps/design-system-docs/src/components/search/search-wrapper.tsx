'use client';

import { useEffect, useState } from 'react';
import { SearchProvider } from './search-provider';
import type { SearchIndexItem } from '@/lib/content';

export function SearchWrapper({ children }: { children: React.ReactNode }) {
	const [searchIndex, setSearchIndex] = useState<SearchIndexItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('/api/search-index')
			.then((res) => res.json())
			.then((data) => {
				setSearchIndex(data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error loading search index:', error);
				setIsLoading(false);
			});
	}, []);

	// Always provide the context, even while loading
	return <SearchProvider searchIndex={searchIndex}>{children}</SearchProvider>;
}

