'use client';

import * as React from 'react';
import { MdCheck, MdContentCopy } from 'react-icons/md';
import { IconButton } from '@marmoui/ui';

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	value: string;
	src?: string;
}

export async function copyToClipboardWithMeta(value: string) {
	if (navigator.clipboard) {
		await navigator.clipboard.writeText(value);
	} else {
		// Fallback for older browsers
		const textArea = document.createElement('textarea');
		textArea.value = value;
		textArea.style.position = 'fixed';
		textArea.style.left = '-999999px';
		textArea.style.top = '-999999px';
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		document.execCommand('copy');
		textArea.remove();
	}
}

export function CopyButton({ value, className, src, ...props }: CopyButtonProps) {
	const [hasCopied, setHasCopied] = React.useState(false);

	React.useEffect(() => {
		if (hasCopied) {
			const timeout = setTimeout(() => {
				setHasCopied(false);
			}, 2000);
			return () => clearTimeout(timeout);
		}
	}, [hasCopied]);

	return (
		<IconButton
			variant="ghost"
			onClick={() => {
				copyToClipboardWithMeta(value);
				setHasCopied(true);
			}}
			icon={hasCopied ? <MdCheck className="h-4 w-4" /> : <MdContentCopy className="h-4 w-4" />}
			aria-label={hasCopied ? 'Copied' : 'Copy'}
			{...props}
		/>
	);
}
