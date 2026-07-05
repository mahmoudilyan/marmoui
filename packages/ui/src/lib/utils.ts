import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function getRelativeLuminance(r: number, g: number, b: number): number {
	// Convert RGB to 0-1 range
	const [rs, gs, bs] = [r, g, b].map(c => {
		c = c / 255;
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	});

	// Calculate relative luminance
	return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function shouldUseLightText(r: number, g: number, b: number): boolean {
	const luminance = getRelativeLuminance(r, g, b);
	// Use light text if background is dark (luminance < 0.5)
	return luminance < 0.5;
}
