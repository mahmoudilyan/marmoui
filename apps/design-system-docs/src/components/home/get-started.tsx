'use client';

import Link from 'next/link';
import siteConfig from 'site.config';

const people = [
	{
		name: 'For Designers',
		role: 'Design beautiful interfaces',
		description: 'Use our Figma components and design tokens to create consistent experiences.',
		action: 'Open in Figma',
		href: siteConfig.figmaUrl,
		bgStyle: { backgroundImage: 'linear-gradient(158deg, rgb(255, 247, 237) 43%, rgb(255, 238, 171) 69%)' },
		darkBgGradient: 'dark:from-orange-950/20 dark:to-amber-950/20',
		shapeColor: 'bg-orange-500/10',
	},
	{
		name: 'For Developers',
		role: 'Build faster',
		description: 'Copy-paste components with clean code. No design system knowledge required.',
		action: 'View Components',
		href: siteConfig.storybookMainUrl,
		bgStyle: { backgroundImage: 'linear-gradient(158deg, rgb(243, 232, 255) 43%, rgb(221, 214, 254) 69%)' },
		darkBgGradient: 'dark:from-purple-950/20 dark:to-violet-950/20',
		shapeColor: 'bg-purple-500/10',
	},

];

export function GetStarted() {
	return (
		<section className="py-16 md:py-24 border-b border-gray-200 dark:border-gray-800">
			<div className="container max-w-6xl mx-auto px-4">
				{/* Section header */}
				<div className="text-center mb-12">
					<h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-100 mb-3">
						Get started
					</h2>
				</div>

				{/* People cards */}
				<div className="grid md:grid-cols-2 gap-6">
					{people.map((person, index) => (
						<Link
							key={person.name}
							href={person.href}
							style={person.bgStyle}
						className={`group relative overflow-hidden rounded-2xl p-8 border border-[#ececec] dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 shadow-lg dark:bg-gradient-to-br ${person.darkBgGradient}`}
						>
							{/* Decorative shape */}
							<div
								className={`absolute top-4 right-4 w-20 h-20 rounded-2xl ${person.shapeColor} transform rotate-45 opacity-50`}
							/>

							{/* Content */}
							<div className="relative">
								<h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
									{person.name}
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-3">
									{person.role}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
									{person.description}
								</p>

								{/* Action button */}
								<span className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:gap-3 transition-all">
									{person.action}
									<span>→</span>
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
