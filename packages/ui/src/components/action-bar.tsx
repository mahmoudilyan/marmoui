import { Button } from './button';
import * as React from 'react';
import { cn } from '../lib/utils';
import { X } from '@phosphor-icons/react';
import { Tooltip } from './tooltip';
import { Kbd } from './kbd';
import { Text } from './text';

interface ActionBarContentProps extends React.HTMLAttributes<HTMLDivElement> {
	portalled?: boolean;
	portalRef?: React.RefObject<HTMLElement>;
	onEscape?: () => void;
}

export const ActionBarContent = React.forwardRef<HTMLDivElement, ActionBarContentProps>(
	function ActionBarContent(props, ref) {
		const { children, portalled = true, portalRef, className, onEscape, ...rest } = props;

		React.useEffect(() => {
			const handleKeyDown = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					onEscape?.();
				}
			};

			document.addEventListener('keydown', handleKeyDown);
			return () => {
				document.removeEventListener('keydown', handleKeyDown);
			};
		}, [onEscape]);

		// Simplified implementation without portal for now
		return (
			<div
				ref={ref}
				className={cn(
					'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50',
					'bg-panel border border-border-secondary rounded-lg shadow-md p-4',
					'flex items-center gap-2',
					className
				)}
				{...rest}
			>
				{children}
			</div>
		);
	}
);

interface ActionBarCloseTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ActionBarCloseTrigger = React.forwardRef<
	HTMLButtonElement,
	ActionBarCloseTriggerProps
>(function ActionBarCloseTrigger(props, ref) {
	const { className, ...rest } = props;
	return (
		<Tooltip
			content={
				<>
					<Text variant="body-xs" as="p">
						Close action bar <Kbd className="ml-2">Esc</Kbd>
					</Text>
				</>
			}
		>
			<Button ref={ref} variant="ghost" size="sm" className={cn(className)} {...rest}>
				<X />
			</Button>
		</Tooltip>
	);
});

// Simple implementations for the other action bar components
export const ActionBarRoot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	function ActionBarRoot(props, ref) {
		return <div ref={ref} {...props} />;
	}
);

export const ActionBarSelectionTrigger = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(function ActionBarSelectionTrigger(props, ref) {
	return <div ref={ref} {...props} />;
});

export const ActionBarSeparator = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(function ActionBarSeparator(props, ref) {
	const { className, ...rest } = props;
	return <div ref={ref} className={cn('w-px h-6 bg-border mx-2', className)} {...rest} />;
});
