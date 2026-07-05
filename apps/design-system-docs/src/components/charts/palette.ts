export const CHART_TOKENS = {
	accent: 'var(--color-ink-primary)',
	accentMuted: 'var(--color-ink-primary)',
	accentSoft: 'var(--color-ink-primary)',
	neutral: 'var(--color-ink-muted)',
	neutralSoft: 'var(--color-ink-muted)',
	success: 'var(--color-ink-success)',
	warning: 'var(--color-ink-warning)',
	danger: 'var(--color-ink-destructive)',
	gridline: 'var(--color-border)',
	axisLabel: 'var(--color-ink-light)',
} as const;

export const CHART_OPACITY = {
	leader: 1,
	neutral: 0.55,
	accentMuted: 0.6,
	accentSoft: 0.3,
	gridline: 0.6,
} as const;

export const CATEGORICAL_PALETTE: string[] = [
	'var(--color-ink-primary)',
	'var(--color-ink-success)',
	'var(--color-ink-info)',
	'var(--color-ink-warning)',
	'var(--color-ink-destructive)',
	'var(--color-ink-muted)',
];

export function sequentialOpacities(steps: number): number[] {
	const out: number[] = [];
	const min = 0.35;
	const max = 1;
	for (let i = 0; i < steps; i++) {
		const t = steps === 1 ? 1 : i / (steps - 1);
		out.push(Number((min + (max - min) * t).toFixed(2)));
	}
	return out;
}

export function sequentialPalette(steps: number): string[] {
	return Array.from({ length: steps }, () => 'var(--color-ink-primary)');
}

export function divergingPalette(steps: number): Array<{ color: string; opacity: number }> {
	if (steps <= 0) return [];
	const half = Math.floor(steps / 2);
	const left = Array.from({ length: half }, (_, i) => {
		const t = i / Math.max(half - 1, 1);
		const opacity = Number((1 - t * 0.55).toFixed(2));
		return { color: 'var(--color-ink-destructive)', opacity };
	});
	const right = Array.from({ length: steps - half }, (_, i) => {
		const t = i / Math.max(steps - half - 1, 1);
		const opacity = Number((0.45 + t * 0.55).toFixed(2));
		return { color: 'var(--color-ink-success)', opacity };
	});
	return [...left, ...right];
}

export function formatCompact(value: number, locale = 'en-US'): string {
	return new Intl.NumberFormat(locale, {
		notation: 'compact',
		maximumFractionDigits: 1,
	}).format(value);
}

export function formatFull(value: number, locale = 'en-US'): string {
	return new Intl.NumberFormat(locale).format(value);
}

export function formatPercent(value: number, fractionDigits = 1, locale = 'en-US'): string {
	return new Intl.NumberFormat(locale, {
		style: 'percent',
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits,
	}).format(value);
}
