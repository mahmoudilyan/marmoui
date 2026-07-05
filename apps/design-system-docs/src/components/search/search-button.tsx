'use client';

import { MdSearch } from 'react-icons/md';
import { useSearch } from './search-provider';

export function SearchButton() {
	const { open } = useSearch();

	return (
		<button
			onClick={open}
			className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg text-sm border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
		>
			<MdSearch className="h-4 w-4" />
			<span className="hidden lg:inline">Search...</span>
			<kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded">
				⌘K
			</kbd>
		</button>
	);
}

