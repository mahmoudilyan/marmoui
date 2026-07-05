import type { SVGProps } from 'react';

/** Marmo mark — indigo circle with white M (matches Figma brand icon). */
const Marmo = (props: SVGProps<SVGSVGElement>) => (
	<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<rect width="36" height="36" rx="18" fill="#4B56D2" />
		<path
			d="M11 25V11h3.2l4.8 7.5L23.8 11H27v14h-2.8V15.5L20.5 22h-2.1l-3.7-6.5V25H11z"
			fill="white"
		/>
	</svg>
);

export { Marmo };
