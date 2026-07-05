'use client';

import * as React from 'react';
import { MdContentCopy, MdCheck } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { Tooltip } from '@marmoui/ui';

interface SpacingItemProps {
	name: string;
	variable: string;
	value: number;
	unit?: string;
}

function SpacingItem({ name, variable, value, unit = 'px' }: SpacingItemProps) {
	const [copied, setCopied] = React.useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(variable);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// Calculate max width for visual representation (using 256px as the max)
	const maxValue = 256;
	const widthPercentage = (value / maxValue) * 100;

	return (
		<div className="flex items-center gap-3 py-2 border-b border-border last:border-b-0">
			<div className="w-32 text-sm text-ink font-mono">{name}</div>
			<div className="flex-1 relative max-w-xs">
				<div className="relative w-full flex items-center justify-start bg-panel rounded overflow-hidden">
					<div
						className="bg-primary-200 w-4 h-4 rounded-full"
						style={{
							backgroundColor: 'var(--color-primary-200)',
						}}
					></div>
					<div
						className="bg-primary-600 transition-all h-8"
						style={{ width: `${value}px`, backgroundColor: 'var(--color-primary-600)' }}
					/>
					<div
						className="bg-primary-200 w-4 h-4 rounded-full"
						style={{ backgroundColor: 'var(--color-primary-200)' }}
					></div>
				</div>
			</div>
			<div className="w-16 text-sm text-ink text-right font-mono">
				{value}
				{unit}
			</div>
			<Tooltip content={variable}>
				<button
					onClick={handleCopy}
					className={cn(
						'p-1.5 rounded transition-colors flex-shrink-0',
						'hover:bg-secondary active:bg-muted',
						'flex items-center justify-center'
					)}
					aria-label="Copy variable name"
				>
					{copied ? (
						<MdCheck className="h-4 w-4 text-success-solid" />
					) : (
						<MdContentCopy className="h-4 w-4 text-ink-light hover:text-ink transition-colors" />
					)}
				</button>
			</Tooltip>
		</div>
	);
}

interface SpacingPaletteProps {
	name?: string;
	description?: string;
	spacings: Array<{
		name: string;
		variable: string;
		value: number;
		unit?: string;
	}>;
	className?: string;
}

export function SpacingTokens({ name, description, spacings, className }: SpacingPaletteProps) {
	return (
		<div className={cn('space-y-4', className)}>
			{name && (
				<div>
					<h3 className="text-lg font-semibold mb-1">{name}</h3>
					{description && <p className="text-sm text-ink-light">{description}</p>}
				</div>
			)}
			<div className="bg-panel border border-border rounded-lg p-2">
				{spacings.map(spacing => (
					<SpacingItem
						key={spacing.variable}
						name={spacing.name}
						variable={spacing.variable}
						value={spacing.value}
						unit={spacing.unit}
					/>
				))}
			</div>
		</div>
	);
}
