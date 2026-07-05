'use client';

import * as React from 'react';
import { MdCheck, MdContentCopy } from 'react-icons/md';
import { Button } from '@/components/ui/button';

interface DocsCopyPageProps {
	page: string;
	url: string;
}

export function DocsCopyPage({ page }: DocsCopyPageProps) {
	const [hasCopied, setHasCopied] = React.useState(false);

	React.useEffect(() => {
		if (hasCopied) {
			const timeout = setTimeout(() => {
				setHasCopied(false);
			}, 2000);
			return () => clearTimeout(timeout);
		}
	}, [hasCopied]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(page);
			setHasCopied(true);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	return (
		<Button
			variant="ghost"
			size="sm"
			className="h-8 gap-2 px-2"
			onClick={handleCopy}
		>
			{hasCopied ? (
				<>
					<MdCheck className="h-4 w-4" />
					<span className="sr-only">Copied</span>
				</>
			) : (
				<>
					<MdContentCopy className="h-4 w-4" />
					<span className="sr-only">Copy page</span>
				</>
			)}
		</Button>
	);
}















