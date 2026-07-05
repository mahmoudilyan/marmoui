'use client';

import { useState } from 'react';
import { MdContentCopy, MdCheck } from 'react-icons/md';

const steps = [
	{
		title: 'Install',
		command: 'pnpm add @marmoui/ui',
		description: 'Add the package to your project',
	},
	{
		title: 'Import',
		command: `import { Button } from '@marmoui/ui'`,
		description: 'Use components anywhere',
	},
	{
		title: 'Use',
		command: `export default function App() {
  return <Button>Click me</Button>
}`,
		description: 'Start building right away',
	},
];

export function QuickStart() {
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

	const copyToClipboard = async (text: string, index: number) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedIndex(index);
			setTimeout(() => setCopiedIndex(null), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	return (
		<section className="py-16 md:py-24">
			<div className="container max-w-4xl mx-auto px-4">
				{/* Section header */}
				<div className="text-center mb-12">
					<h2 className="font-bold text-3xl sm:text-4xl text-gray-900 dark:text-gray-100 mb-3">
						Quick Start
					</h2>
					<p className="text-gray-600 dark:text-gray-400">Get up and running in minutes</p>
				</div>

				{/* Steps */}
				<div className="space-y-4">
					{steps.map((step, index) => (
						<div
							key={step.title}
							className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6"
						>
							<div className="flex flex-col md:flex-row md:items-center gap-4">
								{/* Title */}
								<div className="flex-shrink-0">
									<div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
										Step {index + 1}
									</div>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
										{step.title}
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
								</div>

								{/* Code block */}
								<div className="flex-1 relative">
									<div className="relative rounded-lg bg-gray-950 dark:bg-black border border-gray-800 overflow-hidden">
										<pre className="overflow-x-auto p-4 text-sm">
											<code className="text-gray-100 font-mono whitespace-pre-wrap">
												{step.command}
											</code>
										</pre>
										<button
											onClick={() => copyToClipboard(step.command, index)}
											className="absolute right-3 top-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
											aria-label="Copy code"
										>
											{copiedIndex === index ? (
												<MdCheck className="w-4 h-4 text-green-500" />
											) : (
												<MdContentCopy className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
											)}
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* CTA */}
				<div className="text-center mt-10">
					<div className="inline-flex items-center gap-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
						<div className="text-left">
							<div className="font-medium text-gray-900 dark:text-gray-100 mb-1">
								Need more help?
							</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">
								Explore our comprehensive documentation
							</div>
						</div>
						<a
							href="/introduction"
							className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm"
						>
							<span>View docs</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
