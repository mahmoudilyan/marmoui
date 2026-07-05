'use client';

import { toast, Toaster as SonnerToaster, type ExternalToast } from 'sonner';
import { cn } from '../lib/utils';

export interface MarmoToastAction {
	label: string;
	/** Omit for static display (e.g. marketing previews). */
	onClick?: () => void;
}

export interface MarmoToastOptions {
	description?: string;
	action?: MarmoToastAction;
	duration?: number;
}

export type ToastBarVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastBarProps {
	title: string;
	variant?: ToastBarVariant;
	description?: string;
	action?: MarmoToastAction;
	onDismiss?: () => void;
	showCloseButton?: boolean;
	className?: string;
}

function toSonnerOptions(options?: MarmoToastOptions | string): ExternalToast {
	if (typeof options === 'string') {
		return { description: options };
	}

	if (!options) return {};

	return {
		description: options.description,
		duration: options.duration,
		action: options.action?.onClick
			? {
					label: options.action.label,
					onClick: options.action.onClick,
				}
			: undefined,
	};
}

export const toaster = {
	success: (title: string, options?: MarmoToastOptions | string) =>
		toast.success(title, toSonnerOptions(options)),
	error: (title: string, options?: MarmoToastOptions | string) =>
		toast.error(title, toSonnerOptions(options)),
	info: (title: string, options?: MarmoToastOptions | string) =>
		toast.info(title, toSonnerOptions(options)),
	warning: (title: string, options?: MarmoToastOptions | string) =>
		toast.warning(title, toSonnerOptions(options)),
	loading: (title: string, options?: MarmoToastOptions | string) =>
		toast.loading(title, toSonnerOptions(options)),
	dismiss: (id?: string | number) => toast.dismiss(id),
};

function ToastCloseIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	);
}

/**
 * Static toast bar — uses `data-marmo-toast-bar` (not `data-sonner-toast`) so Sonner's
 * global CSS (opacity:0, position:absolute) does not hide marketing previews.
 */
export function ToastBar({
	title,
	variant = 'info',
	description,
	action,
	onDismiss,
	showCloseButton = true,
	className,
}: ToastBarProps) {
	return (
		<div
			role="status"
			data-marmo-toast-bar=""
			data-type={variant}
			className={cn('w-full', className)}
		>
			<div data-content="">
				<div data-title="">{title}</div>
				{description ? <div data-description="">{description}</div> : null}
			</div>
			{action ? (
				action.onClick ? (
					<button type="button" data-button="" onClick={action.onClick}>
						{action.label}
					</button>
				) : (
					<span data-button="">{action.label}</span>
				)
			) : null}
			{showCloseButton ? (
				<button
					type="button"
					data-close-button=""
					aria-label="Dismiss"
					onClick={onDismiss}
				>
					<ToastCloseIcon />
				</button>
			) : null}
		</div>
	);
}

export const Toaster = () => {
	return (
		<SonnerToaster position="bottom-right" expand gap={12} closeButton visibleToasts={5} />
	);
};
