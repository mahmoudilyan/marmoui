'use client';

import React, { useState } from 'react';
import { MdSearch, MdClose } from 'react-icons/md';

interface PropInfo {
	name: string;
	type: string;
	required: boolean;
	description?: string;
	defaultValue?: string;
}

interface PropsTableProps {
	componentName: string;
	props: PropInfo[];
}

export function PropsTableEnhanced({ componentName, props }: PropsTableProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const [showOptional, setShowOptional] = useState(true);

	const filteredProps = props.filter((prop) => {
		const matchesSearch = prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			prop.description?.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesFilter = showOptional || prop.required;
		return matchesSearch && matchesFilter;
	});

	const requiredCount = props.filter((p) => p.required).length;
	const optionalCount = props.length - requiredCount;

	if (props.length === 0) {
		return (
			<div className="rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
				<p className="text-gray-600 dark:text-gray-400">
					No props documentation available for this component.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
						{componentName} Props
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
						{requiredCount} required · {optionalCount} optional
					</p>
				</div>
			</div>

			{/* Search and Filter */}
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="relative flex-1">
					<MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
					<input
						type="text"
						placeholder="Search props..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400"
					/>
					{searchTerm && (
						<button
							onClick={() => setSearchTerm('')}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
						>
							<MdClose className="w-5 h-5" />
						</button>
					)}
				</div>
				<label className="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap">
					<input
						type="checkbox"
						checked={showOptional}
						onChange={(e) => setShowOptional(e.target.checked)}
						className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
					/>
					<span className="text-sm text-gray-700 dark:text-gray-300">
						Show optional
					</span>
				</label>
			</div>

			{/* Props List */}
			{filteredProps.length === 0 ? (
				<div className="rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
					<p className="text-gray-600 dark:text-gray-400">
						No props match your search criteria.
					</p>
				</div>
			) : (
				<div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
									<th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
										Prop
									</th>
									<th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
										Type
									</th>
									<th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
										Default
									</th>
									<th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
										Description
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 dark:divide-gray-800">
								{filteredProps.map((prop) => (
									<tr
										key={prop.name}
										className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
									>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<code className="font-mono font-medium text-cyan-600 dark:text-cyan-400">
													{prop.name}
												</code>
												{prop.required && (
													<span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
														Required
													</span>
												)}
											</div>
										</td>
										<td className="px-6 py-4">
											<code className="text-xs font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
												{prop.type}
											</code>
										</td>
										<td className="px-6 py-4">
											{prop.defaultValue ? (
												<code className="text-xs font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
													{prop.defaultValue}
												</code>
											) : (
												<span className="text-gray-400 dark:text-gray-600">—</span>
											)}
										</td>
										<td className="px-6 py-4 text-gray-700 dark:text-gray-300 max-w-md">
											{prop.description || (
												<span className="text-gray-400 dark:text-gray-600">
													No description provided
												</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
}

