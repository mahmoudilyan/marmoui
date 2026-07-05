/**
 * Maps a Tenant's DESIGN.md tokens (the Stitch-compatible frontmatter schema —
 * see /docs/tools/design-md) onto @marmoui/ui CSS custom properties.
 *
 * Conservative on purpose: only tokens that restyle safely are mapped.
 * The primary scale is derived from the single brand color with color-mix()
 * so every `--color-primary-*` step stays coherent.
 */

export interface TenantTokens {
	name?: string;
	colors?: Record<string, string>;
	typography?: Record<string, { fontFamily?: string } | undefined>;
	rounded?: Record<string, string>;
}

const HEX = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?([0-9a-fA-F]{2})?$/;

/** Percentage of white (positive) / black (negative) mixed per primary step. */
const PRIMARY_SCALE: Record<string, number> = {
	'50': 92,
	'100': 84,
	'200': 68,
	'300': 48,
	'400': 24,
	'500': 8,
	'600': 0,
	'700': -12,
	'800': -24,
	'900': -34,
};

function mix(base: string, pct: number): string {
	if (pct === 0) return base;
	const partner = pct > 0 ? 'white' : 'black';
	return `color-mix(in oklch, ${base}, ${partner} ${Math.abs(pct)}%)`;
}

/** Build the CSS custom-property overrides for a tenant. Unknown/unsafe values are skipped. */
export function tenantCssVars(tokens: TenantTokens): Record<string, string> {
	const vars: Record<string, string> = {};

	const primary = tokens.colors?.primary;
	if (primary && HEX.test(primary)) {
		for (const [step, pct] of Object.entries(PRIMARY_SCALE)) {
			vars[`--color-primary-${step}`] = mix(primary, pct);
		}
	}

	const secondary = tokens.colors?.secondary;
	if (secondary && HEX.test(secondary)) {
		vars['--color-ink-light'] = secondary;
	}

	const headingFont =
		tokens.typography?.h1?.fontFamily ?? tokens.typography?.display?.fontFamily;
	if (headingFont && /^[\w '",-]+$/.test(headingFont)) {
		vars['--font-heading'] = `'${headingFont.replace(/['"]/g, '')}', sans-serif`;
	}
	const bodyFont = tokens.typography?.body?.fontFamily;
	if (bodyFont && /^[\w '",-]+$/.test(bodyFont)) {
		vars['--font-body'] = `'${bodyFont.replace(/['"]/g, '')}', sans-serif`;
	}

	const DIM = /^\d+(\.\d+)?(px|rem|em)$/;
	const rounded = tokens.rounded ?? {};
	if (rounded.sm && DIM.test(rounded.sm)) vars['--radius-sm'] = rounded.sm;
	if (rounded.md && DIM.test(rounded.md)) vars['--radius-md'] = rounded.md;
	if (rounded.lg && DIM.test(rounded.lg)) vars['--radius-lg'] = rounded.lg;

	return vars;
}

/** Swatch list for the tenant page's token display. */
export function tenantPalette(tokens: TenantTokens): Array<{ name: string; value: string }> {
	return Object.entries(tokens.colors ?? {})
		.filter(([, v]) => typeof v === 'string' && HEX.test(v))
		.map(([name, value]) => ({ name, value }));
}
