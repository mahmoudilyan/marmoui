'use client';

import * as React from 'react';
import { MdContentCopy, MdCheck } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { Tooltip } from '@marmoui/ui';

interface ColorSwatchProps {
	name: string;
	variable: string;
	shade?: number;
	textColor?: 'light' | 'dark';
	isFirst?: boolean;
	isLast?: boolean;
	value?: string;
}

function ColorSwatch({
	name,
	variable,
	shade,
	textColor,
	isFirst,
	isLast,
	value,
}: ColorSwatchProps) {
	const [copied, setCopied] = React.useState(false);
	const textColorClass = textColor === 'dark' ? 'text-gray-900' : 'text-white';

	const handleCopy = () => {
		navigator.clipboard.writeText(value || variable);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const tooltipContent = value ? (
		<div className="font-mono text-xs">
			<div>{variable}</div>
			<div className="opacity-80">{value}</div>
		</div>
	) : (
		variable
	);

	return (
		<Tooltip content={tooltipContent}>
			<div
				className={cn(
					'relative group cursor-pointer border border-border-secondary overflow-hidden transition-all',
					'flex flex-col items-center justify-center min-h-[80px] p-4',
					isFirst && 'rounded-l-lg border-r-0 border-r-border-secondary',
					isLast && 'rounded-r-lg border-l-0 border-l-border-secondary',
					!isFirst && !isLast && 'border-l-0 rounded-none border-r-0'
				)}
				style={{ background: `var(${variable})` }}
				onClick={handleCopy}
			>
				<div className={cn('text-center font-medium text-sm', textColorClass)}>{name}</div>

				<div
					className={cn(
						'absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity',
						'bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded p-1.5'
					)}
				>
					{copied ? (
						<MdCheck className={cn('h-3.5 w-3.5', textColorClass)} />
					) : (
						<MdContentCopy className={cn('h-3.5 w-3.5', textColorClass)} />
					)}
				</div>
			</div>
		</Tooltip>
	);
}

interface ColorPaletteProps {
	name: string;
	description?: string;
	colors: Array<{
		name: string;
		variable: string;
		shade?: number;
		textColor?: 'light' | 'dark';
		value?: string;
	}>;
	columns?: number;
	className?: string;
}

export function ColorPalette({
	name,
	description,
	colors,
	columns = 11,
	className,
}: ColorPaletteProps) {
	return (
		<div className={cn('space-y-4', className)}>
			<div>
				<h3 className="text-lg font-semibold mb-1 text-ink-dark">{name}</h3>
				{description && <p className="text-sm text-ink">{description}</p>}
			</div>
			<div
				className="grid gap-0 mb-6"
				style={{
					gridTemplateColumns: `repeat(${Math.min(columns, colors.length)}, 1fr)`,
				}}
			>
				{colors.map((color, index) => (
					<ColorSwatch
						key={color.variable}
						name={color.name}
						variable={color.variable}
						shade={color.shade}
						textColor={color.textColor}
						isFirst={index === 0}
						isLast={index === colors.length - 1}
						value={color.value}
					/>
				))}
			</div>
			{/* <div className="relative">
				<pre className="bg-panel rounded-lg p-4 overflow-x-auto">
					<code className="text-sm font-mono">
						{colors.map(color => `${color.variable}: var(${color.variable});`).join('\n')}
					</code>
				</pre>
			</div> */}
		</div>
	);
}
