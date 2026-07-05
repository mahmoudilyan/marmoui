import React from 'react';

/**
 * Icon Component
 * Renders SVG content with Tailwind styling support
 *
 * @param {string} svg - SVG content as a string
 * @param {string} className - Tailwind classes for sizing and styling
 * @param {object} props - Additional HTML attributes
 */
export function SvgIcon({
	svg,
	className = '',
	...props
}: {
	svg: React.ReactNode;
	className?: string;
	[key: string]: any;
}) {
	if (!svg) {
		return null;
	}

	return (
		<span
			className={`inline-flex items-center justify-center ${className}`}
			dangerouslySetInnerHTML={{ __html: svg }}
			{...props}
		/>
	);
}

export default SvgIcon;
