import * as React from 'react';
import { Check, X } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { StepIcon } from './icons';
import StepFilledIcon from './icons/step-filled-icon';

type StepsVariant = 'default' | 'ghost' | 'wizard';

type StepsStatus = 'complete' | 'active' | 'upcoming' | 'error';

const STEPS_VARIANTS: Record<StepsVariant, string> = {
	default: 'rounded-2xl border border-border bg-panel shadow-sm',
	ghost: 'rounded-2xl',
	wizard: 'rounded-none',
};

interface StepsRootContextValue {
	activeStep: number;
	totalSteps: number;
	onStepChange?: (nextStep: number) => void;
	variant: StepsVariant;
	showSequence: boolean;
}

const StepsRootContext = React.createContext<StepsRootContextValue | null>(null);

function useStepsRootContext(component: string): StepsRootContextValue {
	const context = React.useContext(StepsRootContext);

	if (!context) {
		throw new Error(`${component} must be used within <StepsRoot />`);
	}

	return context;
}

type StepsRootProps = React.PropsWithChildren<{
	className?: string;
	activeStep?: number;
	totalSteps?: number;
	onStepChange?: (step: number) => void;
	variant?: StepsVariant;
	showSequence?: boolean;
}>;

function StepsRoot({
	children,
	className,
	activeStep = 0,
	totalSteps = 0,
	onStepChange,
	variant = 'default',
	showSequence = true,
}: StepsRootProps) {
	const value = React.useMemo(
		() => ({ activeStep, totalSteps, onStepChange, variant, showSequence }),
		[activeStep, totalSteps, onStepChange, variant, showSequence]
	);

	return (
		<StepsRootContext.Provider value={value}>
			<div className={cn('flex h-full flex-col gap-6', className)}>{children}</div>
		</StepsRootContext.Provider>
	);
}

interface StepsNavProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
	title?: string | React.ReactElement;
	subtitle?: React.ReactNode;
	trailing?: React.ReactNode;
}

function StepsNav({ title, subtitle, trailing, className, ...props }: StepsNavProps) {
	const { activeStep, totalSteps, variant, showSequence } = useStepsRootContext('StepsNav');
	const hasSequence = showSequence && totalSteps > 0;

	return (
		<header
			className={cn(
				'flex flex-col gap-4 border-b border-border/60 px-6 py-6 md:flex-row md:items-center md:justify-between md:gap-6',
				variant === 'ghost' && 'border-transparent py-0',
				className
			)}
			{...props}
		>
			<div className="flex flex-col gap-1">
				{hasSequence ? (
					<span className="text-sm font-medium text-muted-foreground">
						Step {Math.min(activeStep + 1, totalSteps)} of {totalSteps}
					</span>
				) : null}
				{typeof title === 'string' ? (
					<h1 className="heading-md font-semibold text-foreground">{title}</h1>
				) : (
					title
				)}
				{subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
			</div>
			{trailing ? <div className="flex items-center gap-2">{trailing}</div> : null}
		</header>
	);
}

interface StepsProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

function StepsProgress({ className, ...props }: StepsProgressProps) {
	const { activeStep, totalSteps } = useStepsRootContext('StepsProgress');
	const rawProgress = totalSteps <= 1 ? 0 : (activeStep / (totalSteps - 1)) * 100;
	const progress = Number.isFinite(rawProgress) ? Math.min(Math.max(rawProgress, 0), 100) : 0;

	return (
		<div className={cn('flex w-full items-center gap-3 px-6', className)} {...props}>
			<div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
				<div
					className="h-full rounded-full bg-primary transition-all"
					style={{ width: `${progress}%` }}
				/>
			</div>
			<span className="text-xs font-medium text-muted-foreground">{Math.round(progress)}%</span>
		</div>
	);
}

interface StepsListProps extends React.HTMLAttributes<HTMLDivElement> {}

function StepsList({ className, children, ...props }: StepsListProps) {
	const { activeStep, variant } = useStepsRootContext('StepsList');

	const items = React.Children.toArray(children).filter(
		(child): child is React.ReactElement<StepsItemProps> => React.isValidElement(child)
	);

	return (
		<div
			className={cn(
				'grid gap-2',
				variant === 'wizard' && 'flex flex-row items-center gap-6',
				className
			)}
			{...props}
		>
			{items.map((child, index) =>
				React.cloneElement(child, {
					status: index < activeStep ? 'complete' : index === activeStep ? 'active' : 'upcoming',
					stepIndex: index,
				})
			)}
		</div>
	);
}

export interface StepsItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: React.ReactNode;
	description?: React.ReactNode;
	status?: StepsStatus;
	stepIndex?: number;
}

function StepsItem({
	label,
	description,
	status = 'upcoming',
	stepIndex = 0,
	className,
	onClick,
	disabled,
	...props
}: StepsItemProps) {
	const { activeStep, onStepChange, variant, showSequence } = useStepsRootContext('StepsItem');
	const isClickable = typeof onStepChange === 'function' && stepIndex <= activeStep && !disabled;

	// Wizard specific layout
	if (variant === 'wizard') {
		return (
			<button
				type="button"
				className={cn(
					'flex items-center gap-2 transition-opacity',
					isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default opacity-100',
					className
				)}
				onClick={event => {
					onClick?.(event);
					if (isClickable) {
						onStepChange?.(stepIndex);
					}
				}}
				aria-pressed={status === 'active'}
				aria-current={status === 'active' ? 'step' : undefined}
				disabled={!isClickable}
				data-status={status}
				{...props}
			>
				{status === 'complete' ? (
					<StepFilledIcon className="size-5 text-ink-success" />
				) : status === 'active' ? (
					<StepIcon className="size-5 text-ink-dark" />
				) : (
					<StepIcon className="size-5 text-ink-muted" />
				)}
				<span
					className={cn(
						'text-base font-medium whitespace-nowrap',
						status === 'upcoming' ? 'text-ink-light' : 'text-ink'
					)}
				>
					{label}
				</span>
			</button>
		);
	}

	const indicatorClasses: Record<StepsStatus, string> = {
		complete: 'border-primary bg-primary text-primary-foreground',
		active: 'border-primary bg-primary/10 text-primary',
		upcoming: 'border-border bg-panel text-muted-foreground',
		error: 'border-destructive bg-destructive/10 text-destructive',
	};

	const indicatorContent = (() => {
		if (status === 'complete') return <Check weight="fill" className="size-4" />;
		if (status === 'error') return <X className="size-4" />;
		if (!showSequence) return null;
		return <span className="text-xs font-semibold">{(stepIndex ?? 0) + 1}</span>;
	})();

	return (
		<button
			type="button"
			className={cn(
				'relative flex w-full items-start gap-3 rounded-lg px-4 py-3 text-left transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40',
				variant === 'ghost' && 'px-0 py-2',
				isClickable ? 'hover:bg-muted' : 'cursor-default opacity-80',
				className
			)}
			onClick={event => {
				onClick?.(event);
				if (isClickable) {
					onStepChange?.(stepIndex);
				}
			}}
			aria-pressed={status === 'active'}
			aria-current={status === 'active' ? 'step' : undefined}
			disabled={!isClickable}
			data-status={status}
			{...props}
		>
			<div
				className={cn(
					'flex size-9 items-center justify-center rounded-full border transition-colors',
					indicatorClasses[status]
				)}
			>
				{indicatorContent}
			</div>
			<div className="flex flex-col gap-1 text-left">
				<span className="text-sm font-semibold text-foreground">{label}</span>
				{description ? <span className="text-xs text-muted-foreground">{description}</span> : null}
			</div>
		</button>
	);
}

interface StepsPanelsProps extends React.HTMLAttributes<HTMLDivElement> {}

function StepsPanels({ className, children, ...props }: StepsPanelsProps) {
	const { activeStep } = useStepsRootContext('StepsPanels');

	const panels = React.Children.toArray(children).filter(
		(child): child is React.ReactElement<StepsPanelProps> => React.isValidElement(child)
	);

	return (
		<div className={cn('flex-1', className)} {...props}>
			{panels.map((child, index) =>
				React.cloneElement(child, {
					hidden: index !== activeStep,
				})
			)}
		</div>
	);
}

const StepsContent = StepsPanels;

interface StepsPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

function StepsPanel({ className, hidden, ...props }: StepsPanelProps) {
	return (
		<section
			aria-hidden={hidden}
			hidden={hidden}
			className={cn('flex flex-col gap-6', className)}
			{...props}
		/>
	);
}

interface StepsFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	showDivider?: boolean;
	actions?: React.ReactNode;
	secondaryAction?: React.ReactNode;
}

function StepsFooter({
	className,
	showDivider = true,
	actions,
	secondaryAction,
	...props
}: StepsFooterProps) {
	const { variant } = useStepsRootContext('StepsFooter');

	return (
		<footer
			className={cn(
				'flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between',
				showDivider ? 'border-t border-border/60' : 'border-t border-transparent',
				variant === 'ghost' && 'border-transparent px-0 py-0',
				className
			)}
			{...props}
		>
			<div className="flex flex-1 flex-wrap items-center gap-2 text-xs text-muted-foreground">
				{secondaryAction ?? <span className="sr-only">No secondary action</span>}
			</div>
			<div className="flex flex-wrap items-center gap-2">{actions}</div>
		</footer>
	);
}

interface StepsCompletedProps extends React.HTMLAttributes<HTMLDivElement> {
	icon?: React.ReactNode;
}

function StepsCompletedContent({
	className,
	icon = <Check weight="fill" className="size-10" />,
	children,
	...props
}: StepsCompletedProps) {
	return (
		<div
			className={cn('flex flex-col items-center justify-center gap-4 px-6 py-12', className)}
			{...props}
		>
			<div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
				{icon}
			</div>
			{children ? (
				children
			) : (
				<div className="flex flex-col gap-2 text-center">
					<h2 className="heading-md font-semibold text-foreground">All steps completed</h2>
					<p className="text-sm text-muted-foreground">
						You can review your configuration or return to your dashboard.
					</p>
				</div>
			)}
		</div>
	);
}

const StepsCompleted = StepsCompletedContent;

function StepsContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const { variant } = useStepsRootContext('StepsContainer');

	return <div className={cn(STEPS_VARIANTS[variant], className)} {...props} />;
}

export {
	StepsRoot,
	StepsNav,
	StepsProgress,
	StepsList,
	StepsItem,
	StepsContent,
	StepsPanels,
	StepsPanel,
	StepsFooter,
	StepsCompletedContent,
	StepsCompleted,
	StepsContainer,
};
