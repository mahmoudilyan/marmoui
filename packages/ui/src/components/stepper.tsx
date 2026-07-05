'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Check } from '@phosphor-icons/react';

import { composeRefs } from '../lib/use-composed-refs';
import { cn } from '../lib/utils';
import { Box } from './box';

type Direction = 'ltr' | 'rtl';
type Orientation = 'horizontal' | 'vertical';
type ActivationMode = 'automatic' | 'manual';
type NavigationDirection = 'next' | 'prev';
type DataState = 'inactive' | 'active' | 'completed';

interface InternalStep {
	value: string;
	completed: boolean;
	disabled: boolean;
}

interface StepperContextValue {
	value?: string;
	orientation: Orientation;
	dir: Direction;
	loop: boolean;
	disabled: boolean;
	activationMode: ActivationMode;
	steps: InternalStep[];
	registerStep: (step: InternalStep) => void;
	unregisterStep: (value: string) => void;
	updateStep: (value: string, patch: Partial<Pick<InternalStep, 'completed' | 'disabled'>>) => void;
	selectStep: (value: string, direction: NavigationDirection) => void;
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

function useStepperContext(component: string): StepperContextValue {
	const context = React.useContext(StepperContext);
	if (!context) {
		throw new Error(`${component} must be used within <Stepper />`);
	}
	return context;
}

interface StepperListContextValue {
	registerTrigger: (value: string, node: HTMLButtonElement | null) => void;
	focusTrigger: (value: string) => void;
}

const StepperListContext = React.createContext<StepperListContextValue | null>(null);

function useStepperListContext(component: string): StepperListContextValue | null {
	return React.useContext(StepperListContext);
}

function getDirectionAwareKey(key: string, dir: Direction) {
	if (dir !== 'rtl') return key;
	if (key === 'ArrowLeft') return 'ArrowRight';
	if (key === 'ArrowRight') return 'ArrowLeft';
	return key;
}

function getDataState(
	value: string | undefined,
	itemValue: string,
	step: InternalStep | undefined,
	steps: InternalStep[]
): DataState {
	if (step?.completed) return 'completed';
	if (value === itemValue) return 'active';
	if (!value) return 'inactive';
	const stepIndex = steps.findIndex(entry => entry.value === itemValue);
	const activeIndex = steps.findIndex(entry => entry.value === value);
	if (activeIndex > -1 && stepIndex > -1 && activeIndex > stepIndex) {
		return 'completed';
	}
	return 'inactive';
}

function findNextAvailableIndex(
	steps: InternalStep[],
	startIndex: number,
	direction: NavigationDirection,
	loop: boolean
) {
	const stepCount = steps.length;
	const delta = direction === 'next' ? 1 : -1;
	let index = startIndex + delta;

	while (index >= 0 && index < stepCount) {
		if (!steps[index].disabled) {
			return index;
		}
		index += delta;
	}

	if (!loop) return -1;

	index = direction === 'next' ? 0 : stepCount - 1;

	while (index !== startIndex) {
		if (!steps[index].disabled) {
			return index;
		}
		index += delta;
		if (index < 0) index = stepCount - 1;
		if (index >= stepCount) index = 0;
	}

	return -1;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	onValueComplete?: (value: string, completed: boolean) => void;
	onValueAdd?: (value: string) => void;
	onValueRemove?: (value: string) => void;
	dir?: Direction;
	orientation?: Orientation;
	loop?: boolean;
	disabled?: boolean;
	activationMode?: ActivationMode;
}

export function Stepper({
	value,
	defaultValue,
	onValueChange,
	onValueComplete,
	onValueAdd,
	onValueRemove,
	dir = 'ltr',
	orientation = 'horizontal',
	loop = false,
	disabled = false,
	activationMode = 'automatic',
	className,
	children,
	...props
}: StepperProps) {
	const isControlled = value !== undefined;
	const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
	const [steps, setStepsState] = React.useState<InternalStep[]>([]);
	const stepsRef = React.useRef(steps);

	React.useEffect(() => {
		stepsRef.current = steps;
	}, [steps]);

	React.useEffect(() => {
		if (!isControlled && internalValue === undefined && steps.length > 0) {
			setInternalValue(steps[0].value);
		}
	}, [isControlled, internalValue, steps]);

	const setSteps = React.useCallback((updater: (prev: InternalStep[]) => InternalStep[]) => {
		setStepsState(prev => {
			const next = updater(prev);
			stepsRef.current = next;
			return next;
		});
	}, []);

	const registerStep = React.useCallback(
		(step: InternalStep) => {
			setSteps(prev => {
				const index = prev.findIndex(entry => entry.value === step.value);
				if (index > -1) {
					const next = [...prev];
					next[index] = { ...next[index], completed: step.completed, disabled: step.disabled };
					return next;
				}
				onValueAdd?.(step.value);
				return [...prev, step];
			});
		},
		[onValueAdd, setSteps]
	);

	const unregisterStep = React.useCallback(
		(stepValue: string) => {
			setSteps(prev => {
				const next = prev.filter(entry => entry.value !== stepValue);
				if (next.length !== prev.length) {
					onValueRemove?.(stepValue);
				}
				return next;
			});
		},
		[onValueRemove, setSteps]
	);

	const updateStep = React.useCallback(
		(stepValue: string, patch: Partial<Pick<InternalStep, 'completed' | 'disabled'>>) => {
			setSteps(prev => {
				const index = prev.findIndex(entry => entry.value === stepValue);
				if (index === -1) return prev;
				const next = [...prev];
				const previousStep = next[index];
				next[index] = { ...next[index], ...patch };
				if (patch.completed !== undefined && patch.completed !== previousStep.completed) {
					onValueComplete?.(stepValue, patch.completed);
				}
				return next;
			});
		},
		[onValueComplete, setSteps]
	);

	const selectStep = React.useCallback(
		(nextValue: string, _direction: NavigationDirection) => {
			if (disabled) return;
			const target = stepsRef.current.find(entry => entry.value === nextValue);
			if (!target || target.disabled) return;
			if (!isControlled) {
				setInternalValue(nextValue);
			}
			onValueChange?.(nextValue);
		},
		[disabled, isControlled, onValueChange]
	);

	const currentValue = isControlled ? value : internalValue;

	const contextValue = React.useMemo<StepperContextValue>(
		() => ({
			value: currentValue,
			orientation,
			dir,
			loop,
			disabled,
			activationMode,
			steps,
			registerStep,
			unregisterStep,
			updateStep,
			selectStep,
		}),
		[
			currentValue,
			orientation,
			dir,
			loop,
			disabled,
			activationMode,
			steps,
			registerStep,
			unregisterStep,
			updateStep,
			selectStep,
		]
	);

	return <StepperContext.Provider value={contextValue}>{children}</StepperContext.Provider>;
}

interface StepperListProps extends React.HTMLAttributes<HTMLDivElement> {
	asChild?: boolean;
}

export const StepperList = React.forwardRef<HTMLDivElement, StepperListProps>(function StepperList(
	{ className, children, asChild = false, onFocus, ...props },
	forwardedRef
) {
	const context = useStepperContext('StepperList');
	const triggerRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

	const registerTrigger = React.useCallback((value: string, node: HTMLButtonElement | null) => {
		if (!node) {
			triggerRefs.current.delete(value);
			return;
		}
		triggerRefs.current.set(value, node);
	}, []);

	const focusTrigger = React.useCallback((value: string) => {
		const node = triggerRefs.current.get(value);
		node?.focus();
	}, []);

	const listContext = React.useMemo<StepperListContextValue>(
		() => ({ registerTrigger, focusTrigger }),
		[registerTrigger, focusTrigger]
	);

	const Comp = asChild ? Slot : 'div';

	const setRef = React.useMemo(
		() => composeRefs<HTMLDivElement>(forwardedRef, () => undefined),
		[forwardedRef]
	);

	const handleFocus = React.useCallback(
		(event: React.FocusEvent<HTMLDivElement>) => {
			onFocus?.(event);
			if (event.defaultPrevented) return;
			if (event.target !== event.currentTarget) return;
			const fallback = context.value ?? context.steps.find(step => !step.disabled)?.value;
			if (fallback) {
				focusTrigger(fallback);
			}
		},
		[context.value, context.steps, focusTrigger, onFocus]
	);

	return (
		<StepperListContext.Provider value={listContext}>
			<Comp
				role="tablist"
				aria-orientation={context.orientation}
				data-orientation={context.orientation}
				data-slot="stepper-list"
				dir={context.dir}
				{...props}
				ref={setRef}
				className={cn(
					'flex gap-4 overflow-x-auto py-2',
					context.orientation === 'horizontal' ? 'flex-row' : 'flex-col',
					className
				)}
				onFocus={handleFocus}
			>
				{children}
			</Comp>
		</StepperListContext.Provider>
	);
});

interface StepperItemContextValue {
	value: string;
	step?: InternalStep;
}

const StepperItemContext = React.createContext<StepperItemContextValue | null>(null);

function useStepperItemContext(component: string) {
	const context = React.useContext(StepperItemContext);
	if (!context) {
		throw new Error(`${component} must be used within <StepperItem />`);
	}
	return context;
}

export interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string;
	completed?: boolean;
	disabled?: boolean;
	asChild?: boolean;
}

export const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(function StepperItem(
	{ value, completed = false, disabled = false, children, className, asChild = false, ...props },
	forwardedRef
) {
	const context = useStepperContext('StepperItem');

	React.useEffect(() => {
		context.registerStep({ value, completed, disabled });
		return () => context.unregisterStep(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	React.useEffect(() => {
		context.updateStep(value, { completed, disabled });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, completed, disabled]);

	const stepState = context.steps.find(step => step.value === value);
	const dataState = getDataState(context.value, value, stepState, context.steps);
	const Comp = asChild ? Slot : 'div';

	return (
		<StepperItemContext.Provider value={{ value, step: stepState }}>
			<Comp
				data-state={dataState}
				data-slot="stepper-item"
				dir={context.dir}
				{...props}
				ref={forwardedRef}
				className={cn(
					'relative flex items-center gap-3',
					context.orientation === 'horizontal' ? 'flex-row' : 'flex-col',
					className
				)}
			>
				{children}
			</Comp>
		</StepperItemContext.Provider>
	);
});

interface StepperTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
}

export const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
	function StepperTrigger(
		{ className, asChild = false, onClick, onFocus, onKeyDown, ...props },
		forwardedRef
	) {
		const context = useStepperContext('StepperTrigger');
		const item = useStepperItemContext('StepperTrigger');
		const listContext = useStepperListContext('StepperTrigger');
		const stepState = item.step;
		const dataState = getDataState(context.value, item.value, stepState, context.steps);
		const isDisabled = context.disabled || stepState?.disabled || props.disabled;
		const isActive = dataState === 'active';
		const Comp = asChild ? Slot : 'button';

		const refCallback = React.useMemo(
			() =>
				composeRefs<HTMLButtonElement>(forwardedRef, node =>
					listContext?.registerTrigger(item.value, node)
				),
			[forwardedRef, listContext, item.value]
		);

		const currentIndex = context.steps.findIndex(step => step.value === item.value);
		const activeIndex = context.value
			? context.steps.findIndex(step => step.value === context.value)
			: -1;

		const selectSelf = React.useCallback(() => {
			if (isDisabled) return;
			const direction: NavigationDirection =
				activeIndex >= 0 && currentIndex < activeIndex ? 'prev' : 'next';
			context.selectStep(item.value, direction);
		}, [context, item.value, currentIndex, activeIndex, isDisabled]);

		const handleClick = React.useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				onClick?.(event);
				if (event.defaultPrevented) return;
				selectSelf();
			},
			[onClick, selectSelf]
		);

		const handleFocus = React.useCallback(
			(event: React.FocusEvent<HTMLButtonElement>) => {
				onFocus?.(event);
				if (event.defaultPrevented) return;
				if (context.activationMode === 'automatic') {
					selectSelf();
				}
			},
			[onFocus, context.activationMode, selectSelf]
		);

		const handleKeyDown = React.useCallback(
			(event: React.KeyboardEvent<HTMLButtonElement>) => {
				onKeyDown?.(event);
				if (event.defaultPrevented) return;

				const key = getDirectionAwareKey(event.key, context.dir);
				const isHorizontal = context.orientation === 'horizontal';
				const isVertical = context.orientation === 'vertical';

				if (key === 'Home') {
					event.preventDefault();
					const first = context.steps.find(step => !step.disabled);
					if (first) {
						if (context.activationMode === 'manual') {
							listContext?.focusTrigger(first.value);
						} else {
							context.selectStep(first.value, 'prev');
						}
					}
					return;
				}

				if (key === 'End') {
					event.preventDefault();
					const last = [...context.steps].reverse().find(step => !step.disabled);
					if (last) {
						if (context.activationMode === 'manual') {
							listContext?.focusTrigger(last.value);
						} else {
							context.selectStep(last.value, 'next');
						}
					}
					return;
				}

				if (key === 'Enter' || key === ' ') {
					event.preventDefault();
					selectSelf();
					return;
				}

				const isPrevKey = key === 'ArrowLeft' || key === 'ArrowUp';
				const isNextKey = key === 'ArrowRight' || key === 'ArrowDown';

				if (
					(isHorizontal && (key === 'ArrowUp' || key === 'ArrowDown')) ||
					(isVertical && (key === 'ArrowLeft' || key === 'ArrowRight'))
				) {
					return;
				}

				if (!isPrevKey && !isNextKey) {
					return;
				}

				event.preventDefault();
				const direction: NavigationDirection = isNextKey ? 'next' : 'prev';
				const targetIndex = findNextAvailableIndex(
					context.steps,
					currentIndex,
					direction,
					context.loop
				);
				if (targetIndex === -1) return;
				const targetStep = context.steps[targetIndex];
				if (!targetStep) return;
				if (context.activationMode === 'manual') {
					listContext?.focusTrigger(targetStep.value);
				} else {
					context.selectStep(targetStep.value, direction);
				}
			},
			[onKeyDown, context, currentIndex, listContext, selectSelf]
		);

		const describedBy = [
			item.step ? `${context.dir}-title-${item.value}` : null,
			item.step ? `${context.dir}-description-${item.value}` : null,
		]
			.filter(Boolean)
			.join(' ');

		return (
			<Comp
				role="tab"
				id={`${context.dir}-trigger-${item.value}`}
				aria-selected={isActive}
				aria-controls={`${context.dir}-content-${item.value}`}
				aria-describedby={describedBy || undefined}
				data-state={dataState}
				data-disabled={isDisabled ? '' : undefined}
				data-slot="stepper-trigger"
				type="button"
				disabled={isDisabled}
				tabIndex={isActive ? 0 : -1}
				{...props}
				ref={refCallback}
				onClick={handleClick}
				onFocus={handleFocus}
				onKeyDown={handleKeyDown}
				className={cn(
					'inline-flex w-full items-center transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50',
					dataState === 'active' && 'border-primary bg-primary/10 text-primary',
					dataState === 'completed' && 'border-primary bg-primary text-primary-foreground',
					className
				)}
			/>
		);
	}
);

interface StepperIndicatorProps extends React.ComponentPropsWithoutRef<'div'> {
	render?: (state: DataState) => React.ReactNode;
	asChild?: boolean;
}

export const StepperIndicator = React.forwardRef<HTMLDivElement, StepperIndicatorProps>(
	function StepperIndicator(
		{ className, children, render, asChild = false, ...props },
		forwardedRef
	) {
		const context = useStepperContext('StepperIndicator');
		const item = useStepperItemContext('StepperIndicator');
		const stepState = item.step;
		const dataState = getDataState(context.value, item.value, stepState, context.steps);
		const Comp = asChild ? Slot : 'div';
		const indicatorContent = render ? render(dataState) : children;

		return (
			<Comp
				data-state={dataState}
				data-slot="stepper-indicator"
				dir={context.dir}
				{...props}
				ref={forwardedRef}
				className={cn(
					'flex size-5 shrink-0 items-center justify-center rounded-full border border-gray-400 bg-panel text-sm font-semibold text-ink-muted transition',
					'mr-xs',
					dataState === 'active' && 'text-ink-dark border-gray-700',
					dataState === 'completed' && 'bg-success-solid border-0 text-white',
					className
				)}
			>
				{indicatorContent ??
					(dataState === 'completed' ? (
						<Check weight="fill" className="size-3 text-white" />
					) : (
						<Box
							className={cn(
								'size-1.5 bg-gray-400 rounded-full',
								dataState === 'active' && 'bg-gray-700'
							)}
						/>
					))}
			</Comp>
		);
	}
);

interface StepperSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
	forceMount?: boolean;
	asChild?: boolean;
}

export const StepperSeparator = React.forwardRef<HTMLDivElement, StepperSeparatorProps>(
	function StepperSeparator(
		{ className, forceMount = false, asChild = false, ...props },
		forwardedRef
	) {
		const context = useStepperContext('StepperSeparator');
		const item = useStepperItemContext('StepperSeparator');
		const index = context.steps.findIndex(step => step.value === item.value);
		const isLast = index === context.steps.length - 1;
		if (isLast && !forceMount) return null;
		const stepState = item.step;
		const dataState = getDataState(context.value, item.value, stepState, context.steps);
		const Comp = asChild ? Slot : 'div';

		return (
			<Comp
				role="separator"
				aria-hidden="true"
				data-state={dataState}
				data-slot="stepper-separator"
				dir={context.dir}
				{...props}
				ref={forwardedRef}
				// CAN BE A SEPERATOR COMPONENT IN THE FUTURE
				className={cn(
					'transition-colors',
					context.orientation === 'horizontal' ? 'h-px flex-1' : 'h-8 w-px',
					(dataState === 'active' || dataState === 'completed') && 'bg-transparent',
					className
				)}
			/>
		);
	}
);

interface StepperTitleProps extends React.HTMLAttributes<HTMLSpanElement> {
	asChild?: boolean;
}

export const StepperTitle = React.forwardRef<HTMLSpanElement, StepperTitleProps>(
	function StepperTitle({ className, asChild = false, ...props }, forwardedRef) {
		const context = useStepperContext('StepperTitle');
		const item = useStepperItemContext('StepperTitle');
		const Comp = asChild ? Slot : 'span';
		const dataState = getDataState(context.value, item.value, item.step, context.steps);

		return (
			<Comp
				id={`${context.dir}-title-${item.value}`}
				data-slot="stepper-title"
				dir={context.dir}
				{...props}
				ref={forwardedRef}
				className={cn(
					'text-sm font-semibold text-ink-light',
					(dataState === 'active' || dataState === 'completed') && 'text-ink-dark',
					className
				)}
			/>
		);
	}
);

interface StepperDescriptionProps extends React.HTMLAttributes<HTMLSpanElement> {
	asChild?: boolean;
}

export const StepperDescription = React.forwardRef<HTMLSpanElement, StepperDescriptionProps>(
	function StepperDescription({ className, asChild = false, ...props }, forwardedRef) {
		const context = useStepperContext('StepperDescription');
		const item = useStepperItemContext('StepperDescription');
		const Comp = asChild ? Slot : 'span';

		return (
			<Comp
				id={`${context.dir}-description-${item.value}`}
				data-slot="stepper-description"
				dir={context.dir}
				{...props}
				ref={forwardedRef}
				className={cn('text-xs text-muted-foreground', className)}
			/>
		);
	}
);

interface StepperContentProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string;
	forceMount?: boolean;
	asChild?: boolean;
}

export const StepperContent = React.forwardRef<HTMLDivElement, StepperContentProps>(
	function StepperContent(
		{ value, forceMount = false, asChild = false, className, children, ...props },
		forwardedRef
	) {
		const context = useStepperContext('StepperContent');
		const isActive = context.value === value;
		if (!isActive && !forceMount) {
			return null;
		}
		const Comp = asChild ? Slot : 'div';

		return (
			<Comp
				id={`${context.dir}-content-${value}`}
				role="tabpanel"
				aria-labelledby={`${context.dir}-trigger-${value}`}
				hidden={!isActive}
				data-slot="stepper-content"
				dir={context.dir}
				{...props}
				ref={forwardedRef}
				className={cn('flex flex-col gap-6', className)}
			>
				{children}
			</Comp>
		);
	}
);

interface StepperTriggerControlProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
}

export const StepperPrevTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerControlProps>(
	function StepperPrevTrigger({ asChild = false, className, onClick, ...props }, forwardedRef) {
		const context = useStepperContext('StepperPrevTrigger');
		const Comp = asChild ? Slot : 'button';
		const activeIndex = context.value
			? context.steps.findIndex(step => step.value === context.value)
			: -1;
		const prevIndex =
			activeIndex > -1
				? findNextAvailableIndex(context.steps, activeIndex, 'prev', context.loop)
				: -1;
		const prevStep = prevIndex > -1 ? context.steps[prevIndex] : undefined;

		const handleClick = React.useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				onClick?.(event);
				if (event.defaultPrevented) return;
				if (prevStep) {
					context.selectStep(prevStep.value, 'prev');
				}
			},
			[onClick, context, prevStep]
		);

		return (
			<Comp
				type="button"
				data-slot="stepper-prev-trigger"
				disabled={!prevStep}
				{...props}
				ref={forwardedRef}
				onClick={handleClick}
				className={className}
			/>
		);
	}
);

export const StepperNextTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerControlProps>(
	function StepperNextTrigger({ asChild = false, className, onClick, ...props }, forwardedRef) {
		const context = useStepperContext('StepperNextTrigger');
		const Comp = asChild ? Slot : 'button';
		const activeIndex = context.value
			? context.steps.findIndex(step => step.value === context.value)
			: -1;
		const nextIndex =
			activeIndex > -1
				? findNextAvailableIndex(context.steps, activeIndex, 'next', context.loop)
				: context.steps.findIndex(step => !step.disabled);
		const nextStep = nextIndex > -1 ? context.steps[nextIndex] : undefined;

		const handleClick = React.useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				onClick?.(event);
				if (event.defaultPrevented) return;
				if (nextStep) {
					context.selectStep(nextStep.value, 'next');
				}
			},
			[onClick, context, nextStep]
		);

		return (
			<Comp
				type="button"
				data-slot="stepper-next-trigger"
				disabled={!nextStep}
				{...props}
				ref={forwardedRef}
				onClick={handleClick}
				className={className}
			/>
		);
	}
);

export function useStepper(): StepperContextValue;
export function useStepper<T>(selector: (value: StepperContextValue) => T): T;
export function useStepper<T>(selector?: (value: StepperContextValue) => T) {
	const context = React.useContext(StepperContext);
	if (!context) {
		throw new Error('useStepper must be used within <Stepper />');
	}
	return selector ? selector(context) : (context as unknown as T);
}

export type StepperItemState = DataState;

export const StepperItemIndicator = StepperIndicator;
