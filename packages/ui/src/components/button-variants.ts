import { cva } from 'class-variance-authority';

// Explicit class mappings for Tailwind purging
export const toggleGroupRoundingClasses = {
	xs: 'first:rounded-l-sm last:rounded-r-sm',
	sm: 'first:rounded-l-sm last:rounded-r-sm',
	md: 'first:rounded-l-md last:rounded-r-md',
	lg: 'first:rounded-l-md last:rounded-r-md',
};

// Spacing configuration from Figma design
// Icon-text spacing: space between icon and text
export const textPaddingSizes = {
	xs: 2,
	sm: 4,
	md: 6,
	lg: 8,
};

// Button base padding: padding when no icons are present
export const buttonPaddingSizes = {
	xs: 6,
	sm: 8,
	md: 12,
	lg: 12,
};

// Explicit class mappings using variables for maintainability
// These use template literals but values are calculated from variables
// Note: Tailwind v4 can detect these when used in the code below
const buttonSizeClasses = {
	xs: {
		height: 'h-6',
		rounded: 'rounded-sm',
		text: 'text-xs',
		leading: 'leading-4',
		totalPadding: `px-[8px]`, // buttonPaddingSizes.xs (6) + textPaddingSizes.xs (2)
		iconPaddingLeft: `[&[data-left-icon]]:pl-[6px]`, // buttonPaddingSizes.xs
		iconPaddingRight: `[&[data-right-icon]]:pr-[6px]`, // buttonPaddingSizes.xs
		iconSpacingLeft: `[&[data-left-icon]_.icon-left]:mr-[2px]`, // textPaddingSizes.xs
		iconSpacingRight: `[&[data-right-icon]_.icon-right]:ml-[2px]`, // textPaddingSizes.xs
		svgPadding: '[&_svg]:p-[1px]',
	},
	sm: {
		height: 'h-8',
		rounded: 'rounded-sm',
		text: 'text-sm',
		leading: 'leading-4',
		totalPadding: `px-[12px]`, // buttonPaddingSizes.sm (8) + textPaddingSizes.sm (4)
		iconPaddingLeft: `[&[data-left-icon]]:pl-[8px]`, // buttonPaddingSizes.sm
		iconPaddingRight: `[&[data-right-icon]]:pr-[8px]`, // buttonPaddingSizes.sm
		iconSpacingLeft: `[&[data-left-icon]_.icon-left]:mr-[4px]`, // textPaddingSizes.sm
		iconSpacingRight: `[&[data-right-icon]_.icon-right]:ml-[4px]`, // textPaddingSizes.sm
		svgPadding: '[&_svg]:p-[1px]',
	},

	md: {
		height: 'h-9',
		rounded: 'rounded-md',
		text: 'text-sm',
		leading: 'leading-5',
		totalPadding: `px-[18px]`, // buttonPaddingSizes.md (12) + textPaddingSizes.md (6)
		verticalPadding: 'py-2',
		iconPaddingLeft: `[&[data-left-icon]]:pl-[12px]`, // buttonPaddingSizes.md
		iconPaddingRight: `[&[data-right-icon]]:pr-[12px]`, // buttonPaddingSizes.md
		iconSpacingLeft: `[&[data-left-icon]_.icon-left]:mr-[6px]`, // textPaddingSizes.md
		iconSpacingRight: `[&[data-right-icon]_.icon-right]:ml-[6px]`, // textPaddingSizes.md
		svgPadding: '[&_svg]:p-[2px]',
	},
	lg: {
		height: 'h-12',
		rounded: 'rounded-md',
		text: 'text-lg',
		leading: 'leading-6',
		totalPadding: `px-[20px]`, // buttonPaddingSizes.lg (12) + textPaddingSizes.lg (8)
		iconPaddingLeft: `[&[data-left-icon]]:pl-[12px]`, // buttonPaddingSizes.lg
		iconPaddingRight: `[&[data-right-icon]]:pr-[12px]`, // buttonPaddingSizes.lg
		iconSpacingLeft: `[&[data-left-icon]_.icon-left]:mr-[8px]`, // textPaddingSizes.lg
		iconSpacingRight: `[&[data-right-icon]_.icon-right]:ml-[8px]`, // textPaddingSizes.lg
		svgPadding: '[&_svg]:p-[2px]',
	},
};

export const buttonVariants = cva(
	[
		'inline-flex items-center justify-center font-medium whitespace-nowrap rounded transition-all',
		'focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:ring-red-200 aria-invalid:border-destructive',
		'cursor-pointer no-underline',
		'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none outline-none',
	],
	{
		variants: {
			variant: {
				primary:
					'bg-primary-solid text-white hover:bg-primary-solid-hover focus-visible:ring-primary-bright cursor-pointer data-[state=open]:bg-primary-solid-hover data-[active=true]:bg-primary-solid-hover',
				destructive:
					'bg-destructive-solid text-white hover:bg-destructive-solid-hover focus-visible:ring-red-200 data-[state=open]:bg-destructive-solid-hover data-[active=true]:bg-destructive-solid-hover',
				secondary:
					'bg-panel text-ink border border-border-secondary focus-visible:ring-gray-200 ' +
					'hover:bg-bg data-[state=open]:bg-bg data-[state=open]:border-border data-[state=open]:bg-bg ' +
					'[&_svg]:fill-icon data-[active=true]:[&_svg]:fill-icon-primary data-[state=on]:[&_svg]:fill-icon-primary ' +
					'data-[state=on]:bg-primary-muted data-[state=on]:text-ink-primary hover:data-[state=on]:bg-primary-100 hover:data-[state=on]:border-border-secondary ' +
					'data-[active=true]:bg-primary-muted data-[active=true]:border-primary-200 data-[state=open]:data-[active=true]:bg-primary-100 data-[active=true]:text-ink-primary hover:data-[active=true]:bg-primary-100 hover:data-[active=true]:border-primary-300 data-[state=open]:data-[active=true]:border-primary-300',
				ghost:
					'text-ink hover:bg-bg hover:text-accent-foreground focus-visible:ring-gray-200 data-[state=on]:bg-secondary data-[state=on]:text-ink-dark data-[state=open]:bg-bg data-[state=open]:text-accent-foreground data-[active=true]:bg-secondary data-[active=true]:text-ink-dark ' +
					'[&_svg]:fill-icon ',
				'ghost-body':
					'bg-bg hover:bg-panel focus-visible:ring-gray-200 data-[state=on]:bg-panel data-[state=on]:text-ink-dark data-[state=open]:bg-panel data-[active=true]:bg-bg data-[active=true]:text-ink-dark ' +
					'[&_svg]:fill-icon ',
				'ghost-destructive':
					'hover:bg-red-50 text-ink-destructive focus-visible:ring-red-200 data-[state=on]:bg-red-50 data-[state=on]:text-destructive data-[state=open]:bg-red-50 data-[state=open]:text-destructive data-[active=true]:bg-red-50 data-[active=true]:text-destructive ' +
					'[&_svg]:fill-icon-destructive',
				link:
					'text-ink-primary no-underline underline-offset-4 hover:underline focus-visible:ring-gray-200 data-[state=open]:underline data-[active=true]:underline ' +
					'[&_svg]:fill-icon-primary',
			},
		},
		defaultVariants: {
			variant: 'primary',
		},
	}
);

// Button-specific size variants (includes padding and gap)
// All buttons include icon margin in base padding for consistency
// Icon-text spacing from Figma: xs=2px, sm=4px, md=6px, lg=8px
// When icons are present: padding decreases by icon margin amount, that space goes to icon margins
// Base padding from Figma: xs=6px, sm=8px, md=12px, lg=12px
export const buttonSizeVariants = cva('', {
	variants: {
		size: {
			xs: [
				buttonSizeClasses.xs.height,
				buttonSizeClasses.xs.rounded,
				buttonSizeClasses.xs.text,
				buttonSizeClasses.xs.leading,
				buttonSizeClasses.xs.totalPadding,
				buttonSizeClasses.xs.iconPaddingLeft,
				buttonSizeClasses.xs.iconPaddingRight,
				buttonSizeClasses.xs.iconSpacingLeft,
				buttonSizeClasses.xs.iconSpacingRight,
				buttonSizeClasses.xs.svgPadding,
			].join(' '),
			sm: [
				buttonSizeClasses.sm.height,
				buttonSizeClasses.sm.rounded,
				buttonSizeClasses.sm.text,
				buttonSizeClasses.sm.leading,
				buttonSizeClasses.sm.totalPadding,
				buttonSizeClasses.sm.iconPaddingLeft,
				buttonSizeClasses.sm.iconPaddingRight,
				buttonSizeClasses.sm.iconSpacingLeft,
				buttonSizeClasses.sm.iconSpacingRight,
				buttonSizeClasses.sm.svgPadding,
			].join(' '),
			md: [
				buttonSizeClasses.md.height,
				buttonSizeClasses.md.rounded,
				buttonSizeClasses.md.text,
				buttonSizeClasses.md.leading,
				buttonSizeClasses.md.totalPadding,
				buttonSizeClasses.md.verticalPadding,
				buttonSizeClasses.md.iconPaddingLeft,
				buttonSizeClasses.md.iconPaddingRight,
				buttonSizeClasses.md.iconSpacingLeft,
				buttonSizeClasses.md.iconSpacingRight,
				buttonSizeClasses.md.svgPadding,
			].join(' '),
			lg: [
				buttonSizeClasses.lg.height,
				buttonSizeClasses.lg.rounded,
				buttonSizeClasses.lg.text,
				buttonSizeClasses.lg.leading,
				buttonSizeClasses.lg.totalPadding,
				buttonSizeClasses.lg.iconPaddingLeft,
				buttonSizeClasses.lg.iconPaddingRight,
				buttonSizeClasses.lg.iconSpacingLeft,
				buttonSizeClasses.lg.iconSpacingRight,
				buttonSizeClasses.lg.svgPadding,
			].join(' '),
		},
	},
	defaultVariants: {
		size: 'md',
	},
});

// IconButton-specific size variants (square dimensions with matching border radius)
// Icon sizing is handled by the Icon component; svgPadding matches Button's icon treatment
export const iconButtonSizeVariants = cva('', {
	variants: {
		size: {
			xs: `size-6 rounded-sm ${buttonSizeClasses.xs.svgPadding}`,
			sm: `size-8 rounded-sm ${buttonSizeClasses.sm.svgPadding}`,
			md: `size-9 rounded-md ${buttonSizeClasses.md.svgPadding}`,
			lg: `size-12 rounded-md ${buttonSizeClasses.lg.svgPadding}`,
		},
	},
	defaultVariants: {
		size: 'md',
	},
});
