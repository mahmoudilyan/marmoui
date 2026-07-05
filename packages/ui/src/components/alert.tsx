import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { X } from '@phosphor-icons/react';

const alertVariants = cva('relative flex w-full gap-space-xs items-start p-space-md rounded-md', {
	variants: {
		variant: {
			default: 'bg-secondary text-ink',
			info: 'bg-blue-100 text-ink',
			success: 'bg-green-100 text-ink',
			warning: 'bg-orange-100 text-ink',
			destructive: 'bg-red-100 text-ink',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export interface AlertProps
	extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
	closable?: boolean;
	onClose?: VoidFunction;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	({ className, variant = 'default', closable, onClose, children, ...props }, ref) => {
		return (
			<div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
				{children}
				{closable && (
					<button
						type="button"
						className="shrink-0 p-space-xs rounded-sm text-icon hover:bg-black/5 cursor-pointer"
						onClick={onClose}
						aria-label="Close"
					>
						<X className="size-space-md" />
					</button>
				)}
			</div>
		);
	}
);
Alert.displayName = 'Alert';

const AlertIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('shrink-0 [&>svg]:size-space-xl', className)} {...props} />
	)
);
AlertIcon.displayName = 'AlertIcon';

const AlertContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn('flex flex-1 flex-col gap-space-3xs min-w-0', className)}
			{...props}
		/>
	)
);
AlertContent.displayName = 'AlertContent';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => (
		<h5
			ref={ref}
			className={cn('text-[16px] font-medium leading-space-xl text-ink-dark', className)}
			{...props}
		/>
	)
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn('text-[16px] font-normal leading-space-xl text-ink', className)}
		{...props}
	/>
));
AlertDescription.displayName = 'AlertDescription';

const AlertAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn('mt-space-xs flex items-center gap-space-xs', className)}
			{...props}
		/>
	)
);
AlertAction.displayName = 'AlertAction';

export { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription, AlertAction, alertVariants };
