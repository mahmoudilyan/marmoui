/**
 * This file exists solely to ensure Tailwind includes all dynamically generated button classes.
 * Tailwind's static analysis needs to see these class strings directly as literals.
 *
 * DO NOT DELETE THIS FILE - it ensures all button classes are compiled into the CSS.
 *
 * Values match button-variants.ts:
 * - textPaddingSizes: xs=2px, sm=4px, md=6px, lg=8px
 * - buttonPaddingSizes: xs=6px, sm=8px, md=12px, lg=12px
 */

// Explicit class strings that Tailwind can statically analyze
// XS: buttonPadding (6px) + textPadding (2px) = 8px total
const xsClasses =
	'px-[8px] [&[data-left-icon]]:pl-[6px] [&[data-right-icon]]:pr-[6px] [&[data-left-icon]_.icon-left]:mr-[2px] [&[data-right-icon]_.icon-right]:ml-[2px]';

// SM: buttonPadding (8px) + textPadding (4px) = 12px total
const smClasses =
	'px-[12px] [&[data-left-icon]]:pl-[8px] [&[data-right-icon]]:pr-[8px] [&[data-left-icon]_.icon-left]:mr-[4px] [&[data-right-icon]_.icon-right]:ml-[4px]';

// MD: buttonPadding (12px) + textPadding (6px) = 18px total
const mdClasses =
	'px-[18px] [&[data-left-icon]]:pl-[12px] [&[data-right-icon]]:pr-[12px] [&[data-left-icon]_.icon-left]:mr-[6px] [&[data-right-icon]_.icon-right]:ml-[6px]';

// LG: buttonPadding (12px) + textPadding (8px) = 20px total
const lgClasses =
	'px-[20px] [&[data-left-icon]]:pl-[12px] [&[data-right-icon]]:pr-[12px] [&[data-left-icon]_.icon-left]:mr-[8px] [&[data-right-icon]_.icon-right]:ml-[8px]';

// Export as a combined string so Tailwind sees all classes
// This string is never actually used, but ensures Tailwind includes the classes
export const __tailwindSafelist__ = `${xsClasses} ${smClasses} ${mdClasses} ${lgClasses}`;
