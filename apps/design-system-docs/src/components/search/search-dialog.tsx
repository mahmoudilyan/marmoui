'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MdSearch, MdClose, MdArrowForward, MdDescription } from 'react-icons/md';
import { createSearchIndex, searchContent, groupResultsByCategory } from '@/lib/search';
import type { SearchIndexItem } from '@/lib/content';

interface SearchDialogProps {
	isOpen: boolean;
	onClose: () => void;
	searchIndex: SearchIndexItem[];
}

export function SearchDialog({ isOpen, onClose, searchIndex }: SearchDialogProps) {
	const [query, setQuery] = useState('');
	const [selectedIndex, setSelectedIndex] = useState(0);
	const router = useRouter();

	// Create Fuse instance
	const fuseIndex = useMemo(() => createSearchIndex(searchIndex), [searchIndex]);

	// Search results
	const results = useMemo(() => {
		if (!query.trim()) return [];
		return searchContent(fuseIndex, query);
	}, [fuseIndex, query]);

	// Group results by category
	const groupedResults = useMemo(() => {
		return groupResultsByCategory(results);
	}, [results]);

	// Reset selection when results change
	useEffect(() => {
		setSelectedIndex(0);
	}, [results]);

	// Handle keyboard navigation
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			} else if (e.key === 'ArrowDown') {
				e.preventDefault();
				setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				setSelectedIndex((prev) => Math.max(prev - 1, 0));
			} else if (e.key === 'Enter' && results[selectedIndex]) {
				e.preventDefault();
				handleSelectResult(results[selectedIndex].item);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, results, selectedIndex, onClose]);

	const handleSelectResult = useCallback((item: SearchIndexItem) => {
		// Convert path to URL with /docs prefix
		const url = `/docs/${item.path.replace(/\.mdx?$/, '')}`;
		router.push(url);
		onClose();
		setQuery('');
	}, [router, onClose]);

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in"
				onClick={onClose}
			/>

			{/* Dialog */}
			<div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl animate-in zoom-in-95 fade-in duration-200 border border-gray-200 dark:border-gray-800">
					{/* Search Input */}
					<div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800">
						<MdSearch className="w-5 h-5 text-gray-400" />
						<input
							type="text"
							placeholder="Search documentation..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 outline-none text-lg"
							autoFocus
						/>
						<button
							onClick={onClose}
							className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
						>
							<MdClose className="w-5 h-5 text-gray-500" />
						</button>
					</div>

					{/* Results */}
					<div className="max-h-[60vh] overflow-y-auto">
						{query.trim() === '' ? (
							<div className="p-8 text-center text-gray-500">
								<MdSearch className="w-12 h-12 mx-auto mb-3 opacity-50" />
								<p className="text-sm">Start typing to search...</p>
								<p className="text-xs mt-2 text-gray-400">
									Try searching for "button", "color", or "typography"
								</p>
							</div>
						) : results.length === 0 ? (
							<div className="p-8 text-center text-gray-500">
								<MdDescription className="w-12 h-12 mx-auto mb-3 opacity-50" />
								<p className="text-sm">No results found for "{query}"</p>
								<p className="text-xs mt-2 text-gray-400">
									Try a different search term
								</p>
							</div>
						) : (
							<div className="py-2">
								{Object.entries(groupedResults).map(([category, categoryResults]) => (
									<div key={category}>
										<div className="px-4 py-2">
											<h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
												{category}
											</h3>
										</div>
										{categoryResults.map((result, index) => {
											const globalIndex = results.findIndex((r) => r === result);
											const isSelected = globalIndex === selectedIndex;

											return (
												<button
													key={`${result.item.slug}-${index}`}
													onClick={() => handleSelectResult(result.item)}
													className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
														isSelected
															? 'bg-cyan-50 dark:bg-cyan-950/30'
															: 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
													}`}
												>
													<MdDescription
														className={`w-5 h-5 flex-shrink-0 ${
															isSelected
																? 'text-cyan-600 dark:text-cyan-400'
																: 'text-gray-400'
														}`}
													/>
													<div className="flex-1 min-w-0">
														<div
															className={`font-medium text-sm ${
																isSelected
																	? 'text-cyan-700 dark:text-cyan-300'
																	: 'text-gray-900 dark:text-gray-100'
															}`}
														>
															{result.item.title}
														</div>
														<div className="text-xs text-gray-600 dark:text-gray-400 truncate">
															{result.item.description}
														</div>
													</div>
													{isSelected && (
														<MdArrowForward className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
													)}
												</button>
											);
										})}
									</div>
								))}
							</div>
						)}
					</div>

					{/* Footer */}
					<div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between text-xs text-gray-500">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-1">
								<kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">
									↑↓
								</kbd>
								<span>Navigate</span>
							</div>
							<div className="flex items-center gap-1">
								<kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">
									↵
								</kbd>
								<span>Select</span>
							</div>
							<div className="flex items-center gap-1">
								<kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">
									Esc
								</kbd>
								<span>Close</span>
							</div>
						</div>
						{results.length > 0 && (
							<span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

