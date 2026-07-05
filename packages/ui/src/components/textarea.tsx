import * as React from 'react';

import { cn } from '../lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					'flex min-h-[80px] w-full rounded-md border border-border-input bg-panel px-3 py-2 text-sm text-ink transition-[border-color,box-shadow]',
					'placeholder:text-ink-muted hover:border-border-hover focus-visible:outline-none focus-visible:border-primary-solid focus-visible:ring-[2px] focus-visible:ring-primary-bright disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Textarea.displayName = 'Textarea';

export { Textarea };
