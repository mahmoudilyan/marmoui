'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
	return (
		<section className="relative py-12 lg:py-32 overflow-hidden">
			<div className="relative container max-w-7xl mx-auto px-4">
				<div className="flex flex-col items-center text-center gap-5">
					<div>
						{/* Main heading */}
						<h1 className="font-semibold text-6xl text-ink-dark">Marmo UI</h1>

						{/* Subheading */}
						<p className="text-xl text-ink leading-[32px] max-w-4xl">Marmo's Design System</p>
					</div>

					{/* Card content area */}
					<div className="mt-12 w-full max-w-[986px] text-left">
						{/* Border wrapper */}
						<div className="bg-panel border border-[#C0EDEA] rounded-[28px] p-3">
							{/* Inner card */}
							<div className="bg-white border border-[#DCF8F6] rounded-[16px] overflow-hidden">
								{/* Content */}
								<div className="p-6">
									<div className="mb-2.5">
										<h2 className="font-medium text-base text-[#2a3648] leading-6 mb-2.5">
											Get Started with Marmo UI
										</h2>
										<p className="text-base text-[#364152] leading-6">
											A modern design system built with React 19, and Tailwind
										</p>
									</div>

									{/* CTA button */}
									<Link
										href="/docs/introduction/get-started"
										className="inline-flex items-center justify-center bg-[#006b70] text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[#005055]"
									>
										Get Started
									</Link>
								</div>
								{/* Card preview image container */}
								<div className="relative mt-14 aspect-[962/326] overflow-hidden">
									{/* Main card image */}
									<Image
										alt="Marmo UI card preview"
										className="absolute inset-0 w-full h-full object-cover"
										src="/main-card-picture.png"
										fill
										objectFit="contain"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
