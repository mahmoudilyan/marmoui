'use client';

import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
	useRef,
	Children,
	cloneElement,
	type Dispatch,
	type SetStateAction,
	type HTMLAttributes,
	type ButtonHTMLAttributes,
	type ReactElement,
	type MouseEvent,
	type MouseEventHandler,
} from 'react';
import { Portal } from 'radix-ui';
import { cn } from '../lib/utils';

// ─── Context ────────────────────────────────────────────────────────────

type DialogStackContextType = {
	activeIndex: number;
	setActiveIndex: Dispatch<SetStateAction<number>>;
	totalDialogs: number;
	setTotalDialogs: Dispatch<SetStateAction<number>>;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	clickable: boolean;
};

const DialogStackContext = createContext<DialogStackContextType>({
	activeIndex: 0,
	setActiveIndex: () => {},
	totalDialogs: 0,
	setTotalDialogs: () => {},
	isOpen: false,
	setIsOpen: () => {},
	clickable: false,
});

export const useDialogStack = () => {
	const context = useContext(DialogStackContext);
	if (!context) {
		throw new Error('useDialogStack must be used within a DialogStack');
	}
	return context;
};

// ─── DialogStack (root) ─────────────────────────────────────────────────

type DialogStackChildProps = {
	index?: number;
};

export type DialogStackProps = HTMLAttributes<HTMLDivElement> & {
	open?: boolean;
	clickable?: boolean;
	onOpenChange?: (open: boolean) => void;
	defaultOpen?: boolean;
};

export const DialogStack = ({
	children,
	className,
	open,
	defaultOpen = false,
	onOpenChange,
	clickable = false,
	...props
}: DialogStackProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const isControlled = open !== undefined;
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const isOpen = isControlled ? open : internalOpen;

	const handleSetIsOpen = useCallback(
		(value: SetStateAction<boolean>) => {
			const newValue = typeof value === 'function' ? value(isOpen) : value;
			if (!isControlled) {
				setInternalOpen(newValue);
			}
			onOpenChange?.(newValue);
		},
		[isControlled, isOpen, onOpenChange]
	);

	return (
		<DialogStackContext.Provider
			value={{
				activeIndex,
				setActiveIndex,
				totalDialogs: 0,
				setTotalDialogs: () => {},
				isOpen,
				setIsOpen: handleSetIsOpen,
				clickable,
			}}
		>
			<div className={className} {...props}>
				{children}
			</div>
		</DialogStackContext.Provider>
	);
};

// ─── DialogStackTrigger ─────────────────────────────────────────────────

export type DialogStackTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	asChild?: boolean;
};

export const DialogStackTrigger = ({
	children,
	className,
	onClick,
	asChild,
	...props
}: DialogStackTriggerProps) => {
	const context = useContext(DialogStackContext);

	const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		context.setIsOpen(true);
		onClick?.(e);
	};

	if (asChild && children) {
		const child = children as ReactElement<{
			onClick: MouseEventHandler<HTMLButtonElement>;
			className?: string;
		}>;
		return cloneElement(child, {
			onClick: (e: MouseEvent<HTMLButtonElement>) => {
				handleClick(e);
				child.props.onClick?.(e);
			},
			className: cn(className, child.props.className),
			...props,
		});
	}

	return (
		<button
			className={cn(
				'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium text-sm',
				'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2',
				'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
				'bg-primary text-primary-foreground hover:bg-primary/90',
				'h-10 px-4 py-2',
				className
			)}
			onClick={handleClick}
			{...props}
		>
			{children}
		</button>
	);
};

// ─── DialogStackOverlay ─────────────────────────────────────────────────

export type DialogStackOverlayProps = HTMLAttributes<HTMLDivElement>;

export const DialogStackOverlay = ({ className, ...props }: DialogStackOverlayProps) => {
	const context = useContext(DialogStackContext);

	const handleClick = useCallback(() => {
		context.setIsOpen(false);
	}, [context.setIsOpen]);

	if (!context.isOpen) return null;

	return (
		<div
			className={cn(
				'fixed inset-0 z-50 bg-black/50',
				'data-[state=closed]:animate-out data-[state=open]:animate-in',
				'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
				className
			)}
			onClick={handleClick}
			{...props}
		/>
	);
};

// ─── DialogStackBody ────────────────────────────────────────────────────

export type DialogStackBodyProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactElement<DialogStackChildProps>[] | ReactElement<DialogStackChildProps>;
};

export const DialogStackBody = ({ children, className, ...props }: DialogStackBodyProps) => {
	const context = useContext(DialogStackContext);
	const [totalDialogs, setTotalDialogs] = useState(Children.count(children));

	if (!context.isOpen) return null;

	return (
		<DialogStackContext.Provider
			value={{
				...context,
				totalDialogs,
				setTotalDialogs,
			}}
		>
			<Portal.Root>
				<div
					className={cn(
						'pointer-events-none fixed inset-0 z-50 mx-auto flex w-full max-w-lg flex-col items-center justify-center',
						className
					)}
					{...props}
				>
					<div className="pointer-events-auto relative flex w-full flex-col items-center justify-center">
						{Children.map(children, (child, index) => {
							const childElement = child as ReactElement<{
								index: number;
								onClick: MouseEventHandler<HTMLButtonElement>;
								className?: string;
							}>;

							return cloneElement(childElement, {
								...childElement.props,
								index,
							});
						})}
					</div>
				</div>
			</Portal.Root>
		</DialogStackContext.Provider>
	);
};

// ─── DialogStackContent ─────────────────────────────────────────────────

export type DialogStackContentProps = HTMLAttributes<HTMLDivElement> & {
	index?: number;
	offset?: number;
};

export const DialogStackContent = ({
	children,
	className,
	index = 0,
	offset = 10,
	...props
}: DialogStackContentProps) => {
	const context = useContext(DialogStackContext);

	if (!context.isOpen) return null;

	const handleClick = () => {
		if (context.clickable && context.activeIndex > index) {
			context.setActiveIndex(index);
		}
	};

	const distanceFromActive = index - context.activeIndex;
	const translateY =
		distanceFromActive < 0
			? `-${Math.abs(distanceFromActive) * offset}px`
			: `${Math.abs(distanceFromActive) * offset}px`;

	return (
		<div
			className={cn(
				'h-auto w-full rounded-lg border bg-panel p-6 shadow-lg transition-all duration-300',
				className
			)}
			onClick={handleClick}
			style={{
				top: 0,
				transform: `translateY(${translateY})`,
				width: `calc(100% - ${Math.abs(distanceFromActive) * 10}px)`,
				zIndex: 50 - Math.abs(context.activeIndex - index),
				position: distanceFromActive ? 'absolute' : 'relative',
				opacity: distanceFromActive > 0 ? 0 : 1,
				cursor: context.clickable && context.activeIndex > index ? 'pointer' : 'default',
			}}
			{...props}
		>
			<div
				className={cn(
					'h-full w-full transition-all duration-300',
					context.activeIndex !== index && 'pointer-events-none select-none opacity-0'
				)}
			>
				{children}
			</div>
		</div>
	);
};

// ─── DialogStackHeader ──────────────────────────────────────────────────

export type DialogStackHeaderProps = HTMLAttributes<HTMLDivElement>;

export const DialogStackHeader = ({ className, ...props }: DialogStackHeaderProps) => (
	<div className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...props} />
);

// ─── DialogStackTitle ───────────────────────────────────────────────────

export type DialogStackTitleProps = HTMLAttributes<HTMLHeadingElement>;

export const DialogStackTitle = ({ children, className, ...props }: DialogStackTitleProps) => (
	<h2 className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props}>
		{children}
	</h2>
);

// ─── DialogStackDescription ─────────────────────────────────────────────

export type DialogStackDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const DialogStackDescription = ({
	children,
	className,
	...props
}: DialogStackDescriptionProps) => (
	<p className={cn('text-ink-light text-sm', className)} {...props}>
		{children}
	</p>
);

// ─── DialogStackFooter ──────────────────────────────────────────────────

export type DialogStackFooterProps = HTMLAttributes<HTMLDivElement>;

export const DialogStackFooter = ({ children, className, ...props }: DialogStackFooterProps) => (
	<div className={cn('flex items-center justify-end gap-2 pt-4', className)} {...props}>
		{children}
	</div>
);

// ─── DialogStackNext ────────────────────────────────────────────────────

export type DialogStackNextProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	asChild?: boolean;
};

export const DialogStackNext = ({
	children,
	className,
	asChild,
	...props
}: DialogStackNextProps) => {
	const context = useContext(DialogStackContext);

	const handleNext = () => {
		if (context.activeIndex < context.totalDialogs - 1) {
			context.setActiveIndex(context.activeIndex + 1);
		}
	};

	if (asChild && children) {
		const child = children as ReactElement<{
			onClick: MouseEventHandler<HTMLButtonElement>;
			className?: string;
		}>;

		return cloneElement(child, {
			onClick: (e: MouseEvent<HTMLButtonElement>) => {
				handleNext();
				child.props.onClick?.(e);
			},
			className: cn(className, child.props.className),
			...props,
		});
	}

	return (
		<button
			className={cn(
				'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium text-sm',
				'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2',
				'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
				className
			)}
			disabled={context.activeIndex >= context.totalDialogs - 1}
			onClick={handleNext}
			type="button"
			{...props}
		>
			{children || 'Next'}
		</button>
	);
};

// ─── DialogStackPrevious ────────────────────────────────────────────────

export type DialogStackPreviousProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	asChild?: boolean;
};

export const DialogStackPrevious = ({
	children,
	className,
	asChild,
	...props
}: DialogStackPreviousProps) => {
	const context = useContext(DialogStackContext);

	const handlePrevious = () => {
		if (context.activeIndex > 0) {
			context.setActiveIndex(context.activeIndex - 1);
		}
	};

	if (asChild && children) {
		const child = children as ReactElement<{
			onClick: MouseEventHandler<HTMLButtonElement>;
			className?: string;
		}>;

		return cloneElement(child, {
			onClick: (e: MouseEvent<HTMLButtonElement>) => {
				handlePrevious();
				child.props.onClick?.(e);
			},
			className: cn(className, child.props.className),
			...props,
		});
	}

	return (
		<button
			className={cn(
				'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium text-sm',
				'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2',
				'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
				className
			)}
			disabled={context.activeIndex <= 0}
			onClick={handlePrevious}
			type="button"
			{...props}
		>
			{children || 'Previous'}
		</button>
	);
};
