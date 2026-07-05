'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SearchDialog } from './search-dialog';
import type { SearchIndexItem } from '@/lib/content';

interface SearchContextValue {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearch() {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error('useSearch must be used within SearchProvider');
	}
	return context;
}

interface SearchProviderProps {
	children: React.ReactNode;
	searchIndex: SearchIndexItem[];
}

export function SearchProvider({ children, searchIndex }: SearchProviderProps) {
	const [isOpen, setIsOpen] = useState(false);

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);
	const toggle = () => setIsOpen((prev) => !prev);

	// Handle keyboard shortcut (Cmd/Ctrl + K)
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				toggle();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<SearchContext.Provider value={{ isOpen, open, close, toggle }}>
			{children}
			<SearchDialog isOpen={isOpen} onClose={close} searchIndex={searchIndex} />
		</SearchContext.Provider>
	);
}

