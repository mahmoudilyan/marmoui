'use client';

import Link from 'next/link';
import {
	MdAccessibility,
	MdPalette,
	MdFormatColorText,
	MdSpaceBar,
	MdStyle,
	MdAutoStories,
} from 'react-icons/md';

const foundations = [
	{
		icon: MdStyle,
		title: 'Tokens',
		description: 'Single sources of truth to name and store design decisions.',
		href: '/tokens',
	},
	{
		icon: MdAccessibility,
		title: 'Accessibility',
		description: 'Enable everyone to interact with, understand, and navigate our apps.',
		href: '/introduction',
	},
	{
		icon: MdAutoStories,
		title: 'Content',
		description: 'Clear, concise, and conversational language to guide users effectively.',
		href: '/introduction',
	},
	{
		icon: MdPalette,
		title: 'Color',
		description: 'Distinguish our brand and reinforce consistent experiences across apps.',
		href: '/foundation/colors',
	},
	{
		icon: MdFormatColorText,
		title: 'Typography',
		description: 'Enhance communication, reinforce brand, and guide users emotions.',
		href: '/foundation/typography',
	},
	{
		icon: MdSpaceBar,
		title: 'Spacing',
		description: 'Simplify the creation of page layouts and UI with consistent rhythm.',
		href: '/introduction',
	},
];

export function FoundationsShowcase() {
	return (
		<section className="py-16 md:py-24 border-b border-gray-200 dark:border-gray-800">
			<div className="container max-w-6xl mx-auto px-4">
				{/* Section header */}
				<div className="text-center mb-12">
					<h2 className="font-bold text-3xl sm:text-4xl text-gray-900 dark:text-gray-100 mb-3">
						Foundational guidelines
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						Core principles that form the bedrock of every component
					</p>
				</div>

				{/* Foundations grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{foundations.map(foundation => (
						<Link
							key={foundation.title}
							href={foundation.href}
							className="group relative overflow-hidden rounded-lg p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:shadow-sm"
						>
							{/* Icon */}
							<div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
								<foundation.icon className="text-2xl text-gray-700 dark:text-gray-300" />
							</div>

							{/* Content */}
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
								{foundation.title}
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
								{foundation.description}
							</p>
						</Link>
					))}
				</div>

				{/* CTA */}
				<div className="text-center mt-10">
					<Link
						href="/foundation"
						className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
					>
						<span>Explore all foundations</span>
						<span>→</span>
					</Link>
				</div>
			</div>
		</section>
	);
}
