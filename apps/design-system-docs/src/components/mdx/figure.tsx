import * as React from 'react';
import { MdCheck, MdClose, MdInfoOutline, MdWarningAmber } from 'react-icons/md';
import { cn } from '@/lib/utils';

const RATIO_CLASS: Record<string, string> = {
	'21:9': 'aspect-[21/9]',
	'16:9': 'aspect-video',
	'3:2': 'aspect-[3/2]',
	'4:3': 'aspect-[4/3]',
	'1:1': 'aspect-square',
	'2:1': 'aspect-[2/1]',
	'2:3': 'aspect-[2/3]',
	'9:16': 'aspect-[9/16]',
};

type FigureProps = {
	src?: string;
	alt: string;
	caption?: React.ReactNode;
	ratio?: keyof typeof RATIO_CLASS;
	tone?: 'neutral' | 'success' | 'warning' | 'danger';
	label?: string;
	className?: string;
};

const TONE_BORDER: Record<NonNullable<FigureProps['tone']>, string> = {
	neutral: 'border-border-secondary',
	success: 'border-border-success',
	warning: 'border-border-warning',
	danger: 'border-destructive',
};

const TONE_BADGE: Record<NonNullable<FigureProps['tone']>, string> = {
	neutral: 'bg-secondary text-ink',
	success: 'bg-success text-white shadow-sm shadow-success/30 dark:bg-success-600',
	warning: 'bg-warning text-white shadow-sm shadow-warning/30 dark:bg-warning-600',
	danger: 'bg-destructive text-white shadow-sm shadow-destructive/30 dark:bg-destructive-600',
};

const TONE_ICON: Record<NonNullable<FigureProps['tone']>, React.ReactNode> = {
	neutral: <MdInfoOutline aria-hidden className="h-3 w-3" />,
	success: <MdCheck aria-hidden className="h-3 w-3" />,
	warning: <MdWarningAmber aria-hidden className="h-3 w-3" />,
	danger: <MdClose aria-hidden className="h-3 w-3" />,
};

const TONE_ICON_BG: Record<NonNullable<FigureProps['tone']>, string> = {
	neutral: 'bg-white text-ink-light',
	success: 'bg-success text-white',
	warning: 'bg-warning text-white',
	danger: 'bg-destructive text-white',
};

export function Figure({
	src,
	alt,
	caption,
	ratio = '16:9',
	tone = 'neutral',
	label,
	className,
}: FigureProps) {
	const aspect = RATIO_CLASS[ratio] ?? 'aspect-video';
	const isPlaceholder = !src;

	return (
		<figure
			className={cn(
				'not-prose my-6 overflow-hidden rounded-lg border-2 bg-secondary/40',
				TONE_BORDER[tone],
				className
			)}
		>
			<div
				className={cn(
					'relative w-full',
					aspect,
					isPlaceholder &&
						'flex items-center justify-center bg-[linear-gradient(135deg,transparent_46%,var(--color-border)_46%_54%,transparent_54%)] bg-[length:14px_14px]'
				)}
			>
				{src ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={src} alt={alt} className="h-full w-full object-cover" />
				) : (
					<div className="flex max-w-prose flex-col items-center gap-2 rounded-md bg-background/95 px-5 py-4 text-center shadow-sm">
						<span className="text-sm font-medium text-ink-dark">{alt}</span>
					</div>
				)}
			</div>
			{(caption || label) && (
				<figcaption className="flex items-center gap-2 border-t border-border bg-background px-4 py-2.5 text-xs leading-relaxed text-ink">
					{label && (
						<span
							className={cn(
								'inline-flex flex-shrink-0 items-center gap-1.5 rounded-full pl-1 pr-1 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
								TONE_BADGE[tone]
							)}
						>
							<span
								className={cn(
									'inline-flex h-4 w-4 items-center justify-center rounded-full',
									TONE_ICON_BG[tone]
								)}
							>
								{TONE_ICON[tone]}
							</span>
						</span>
					)}
					{caption && <span className="min-w-0 flex-1">{caption}</span>}
				</figcaption>
			)}
		</figure>
	);
}

type PreviewCardProps = {
	children: React.ReactNode;
	caption?: React.ReactNode;
	tone?: NonNullable<FigureProps['tone']>;
	label?: string;
	className?: string;
	bodyClassName?: string;
};

export function PreviewCard({
	children,
	caption,
	tone = 'neutral',
	label,
	className,
	bodyClassName,
}: PreviewCardProps) {
	return (
		<figure
			className={cn(
				'not-prose my-6 overflow-hidden rounded-lg border-2 bg-background',
				TONE_BORDER[tone],
				className
			)}
		>
			<div className={cn('p-4', bodyClassName)}>{children}</div>
			{(caption || label) && (
				<figcaption className="flex items-center gap-2 border-t border-border bg-background px-4 py-2.5 text-xs leading-relaxed text-ink">
					{label && (
						<span
							className={cn(
								'inline-flex flex-shrink-0 items-center gap-1.5 rounded-full pl-1 pr-1 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
								TONE_BADGE[tone]
							)}
						>
							<span
								className={cn(
									'inline-flex h-4 w-4 items-center justify-center rounded-full',
									TONE_ICON_BG[tone]
								)}
							>
								{TONE_ICON[tone]}
							</span>
						</span>
					)}
					{caption && <span className="min-w-0 flex-1">{caption}</span>}
				</figcaption>
			)}
		</figure>
	);
}

export function FigureGrid({
	children,
	columns = 2,
	className,
}: {
	children: React.ReactNode;
	columns?: 2 | 3 | 4;
	className?: string;
}) {
	const colClass = {
		2: 'sm:grid-cols-2',
		3: 'sm:grid-cols-2 lg:grid-cols-3',
		4: 'sm:grid-cols-2 lg:grid-cols-4',
	}[columns];

	return (
		<div className={cn('not-prose my-6 grid grid-cols-1 gap-4', colClass, className)}>
			{children}
		</div>
	);
}
