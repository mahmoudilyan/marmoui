'use client';

import Link from 'next/link';
import {
	MdCheckCircle,
	MdPerson,
	MdLabel,
	MdSmartButton,
	MdDashboard,
	MdGridView,
} from 'react-icons/md';

const components = [
	{
		name: 'Button',
		icon: MdSmartButton,
		description: 'Primary and secondary action elements',
	},
	{
		name: 'Card',
		icon: MdDashboard,
		description: 'Container for content and actions',
	},
	{
		name: 'Avatar',
		icon: MdPerson,
		description: 'User profile representations',
	},
	{
		name: 'Badge',
		icon: MdLabel,
		description: 'Status indicators and labels',
	},
	{
		name: 'Dialog',
		icon: MdCheckCircle,
		description: 'Modal windows and overlays',
	},
	{
		name: 'Data Table',
		icon: MdGridView,
		description: 'Sortable, filterable data grids',
	},
];

export function ComponentsGallery() {
	return (
		<section className="py-16 md:py-24 border-b border-gray-200 dark:border-gray-800">
			<div className="container max-w-6xl mx-auto px-4">
				{/* Section header */}
				<div className="text-center mb-12">
					<h2 className="font-bold text-3xl sm:text-4xl text-gray-900 dark:text-gray-100 mb-3">
						Components
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						Reusable UI components for building applications
					</p>
				</div>

				{/* Components grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{components.map(component => (
						<Link
							key={component.name}
							href="/components"
							className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:shadow-sm p-6"
						>
							{/* Icon */}
							<div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
								<component.icon className="text-2xl text-gray-700 dark:text-gray-300" />
							</div>

							{/* Content */}
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
								{component.name}
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
								{component.description}
							</p>
						</Link>
					))}
				</div>

				{/* CTA */}
				<div className="text-center mt-10">
					<Link
						href="/components"
						className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 h-10 px-6"
					>
						<span>View all components</span>
					</Link>
				</div>
			</div>
		</section>
	);
}
