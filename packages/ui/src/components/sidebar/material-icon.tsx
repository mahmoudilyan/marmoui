'use client';

import { useState } from 'react';

interface MaterialIconSVGProps {
	iconOutlined: React.ReactNode;
	iconFilled: React.ReactNode;
	alt: string;
	className?: string;
}

export default function MaterialIconSVG({
	iconOutlined,
	iconFilled,
	alt,
	className = 'relative shrink-0 size-[16px]',
}: MaterialIconSVGProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={className}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			role="img"
			aria-label={alt}
		>
			<div className={`transition-opacity duration-150 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
				{iconOutlined}
			</div>
			<div
				className={`absolute inset-0 transition-opacity duration-150 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
			>
				{iconFilled}
			</div>
		</div>
	);
}
