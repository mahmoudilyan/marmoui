'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

export interface SplitterProps {
	children: React.ReactNode[];
	defaultSizes?: number[];
	direction?: 'horizontal' | 'vertical';
	onSizesChange?: (sizes: number[]) => void;
	className?: string;
}

export interface ABCSplitterProps extends SplitterProps {
	// Special A/B/C splitter with a single resize handle between B & C sections
}

/**
 * A special A/B/C splitter with a single resize handle between B & C sections.
 * A and B have fixed proportional sizes, while C can be resized.
 */
export function ABCSplitter({
	children,
	defaultSizes = [25, 25, 50],
	direction = 'horizontal',
	onSizesChange,
	className,
}: ABCSplitterProps) {
	const [isDragging, setIsDragging] = React.useState(false);
	const [currentSizes, setCurrentSizes] = React.useState<number[]>(defaultSizes);
	const [abRatio] = React.useState<number>(defaultSizes[0] / (defaultSizes[0] + defaultSizes[1]));

	const childArray = React.Children.toArray(children).slice(0, 3);
	const childCount = childArray.length;

	const containerRef = React.useRef<HTMLDivElement>(null);
	const isDraggingRef = React.useRef(false);

	React.useEffect(() => {
		setCurrentSizes(defaultSizes);
	}, [defaultSizes]);

	if (childCount === 0) {
		return null;
	}

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsDragging(true);
		isDraggingRef.current = true;

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDraggingRef.current || !containerRef.current) return;

			const container = containerRef.current;
			const rect = container.getBoundingClientRect();

			let percentage: number;

			if (direction === 'horizontal') {
				const mouseX = e.clientX - rect.left;
				percentage = (mouseX / rect.width) * 100;
			} else {
				const mouseY = e.clientY - rect.top;
				percentage = (mouseY / rect.height) * 100;
			}

			// Clamp percentage between 20% and 80%
			const clampedPercentage = Math.max(20, Math.min(80, percentage));

			// Calculate new sizes
			const abSize = clampedPercentage;
			const cSize = 100 - clampedPercentage;

			// Distribute A and B according to their ratio
			const aSize = abSize * abRatio;
			const bSize = abSize * (1 - abRatio);

			const newSizes = [aSize, bSize, cSize];

			setCurrentSizes(newSizes);
			onSizesChange?.(newSizes);
		};

		const handleMouseUp = () => {
			setIsDragging(false);
			isDraggingRef.current = false;
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);

			// Turn off dragging indicator after 1 second
			setTimeout(() => {
				setIsDragging(false);
			}, 1000);
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	const labels = ['A', 'B', 'Rest'].slice(0, childCount);

	return (
		<div
			ref={containerRef}
			className={cn(
				'w-full h-full min-w-[300px] align-stretch',
				direction === 'horizontal' ? 'flex flex-row' : 'flex flex-col',
				className
			)}
		>
			{/* Combined A+B panel */}
			<div
				className={cn(
					'border border-border rounded-md overflow-hidden bg-card relative',
					direction === 'horizontal' ? 'flex flex-row' : 'flex flex-col'
				)}
				style={{
					[direction === 'horizontal' ? 'width' : 'height']:
						`${currentSizes[0] + currentSizes[1]}%`,
				}}
			>
				{/* Panel A */}
				<div
					className="bg-background relative px-4 flex flex-row justify-start items-start gap-2 pt-3 pb-4"
					style={{
						flex: `${abRatio} 0 0`,
					}}
				>
					{/* Panel label */}
					<div className="w-8 h-8 px-1 py-1 rounded-md flex justify-center items-center text-sm font-bold bg-blue-100 text-ink-blue">
						{labels[0]}
					</div>

					{/* Content container */}
					<div className="h-full flex-1">{childArray[0]}</div>
				</div>

				{/* Separator */}
				<div className="h-[80%] border-l border-dashed border-border self-center" />

				{/* Panel B */}
				<div
					className="bg-background relative px-4 flex flex-row justify-start items-start gap-2 pt-3 pb-4"
					style={{
						flex: `${1 - abRatio} 0 0`,
					}}
				>
					{/* Panel label */}
					<div className="w-8 h-8 px-1 py-1 rounded-md flex justify-center items-center text-sm font-bold bg-green-100 text-ink-green">
						{labels[1]}
					</div>

					{/* Content container */}
					<div className="h-full flex-1 p-0 pt-0">{childArray[1]}</div>
				</div>
			</div>

			{/* Single resize trigger between combined A+B and C */}
			<div
				className={cn(
					'self-center flex justify-center items-center cursor-col-resize relative z-10',
					direction === 'horizontal' ? 'w-2 h-full' : 'h-2 w-full cursor-row-resize'
				)}
				onMouseDown={handleMouseDown}
			>
				<div
					className={cn('bg-gray-400', direction === 'horizontal' ? 'w-0.5 h-8' : 'h-0.5 w-8')}
				/>
			</div>

			{/* Panel C */}
			<div
				className="bg-background relative border border-border rounded-md"
				style={{
					[direction === 'horizontal' ? 'width' : 'height']: `${currentSizes[2]}%`,
				}}
			>
				{/* Panel label */}
				<div className="absolute top-4 left-4 bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm font-bold w-auto">
					{labels[2]}
				</div>

				{/* Size percentage indicator (shows during drag) */}
				{isDragging && (
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-3 py-1 rounded-md font-bold z-10">
						{currentSizes[2]?.toFixed(1)}%
					</div>
				)}

				{/* Content container */}
				<div className="h-full ml-18 pt-3">{childArray[2]}</div>
			</div>
		</div>
	);
}

/**
 * Basic Splitter component for general use
 */
export function Splitter({
	children,
	defaultSizes,
	direction = 'horizontal',
	onSizesChange,
	className,
}: SplitterProps) {
	const childArray = React.Children.toArray(children);
	const sizes = defaultSizes || Array(childArray.length).fill(100 / childArray.length);

	return (
		<div
			className={cn(
				'w-full h-full',
				direction === 'horizontal' ? 'flex flex-row' : 'flex flex-col',
				className
			)}
		>
			{childArray.map((child, index) => (
				<React.Fragment key={index}>
					<div
						className="flex-1 border border-border rounded-md bg-card p-4"
						style={{
							[direction === 'horizontal' ? 'width' : 'height']: `${sizes[index]}%`,
						}}
					>
						{child}
					</div>

					{/* Add separator between panels except for the last one */}
					{index < childArray.length - 1 && (
						<div
							className={cn(
								'bg-border',
								direction === 'horizontal' ? 'w-px h-full mx-1' : 'h-px w-full my-1'
							)}
						/>
					)}
				</React.Fragment>
			))}
		</div>
	);
}
