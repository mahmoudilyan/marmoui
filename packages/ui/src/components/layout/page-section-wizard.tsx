'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { BookOpen, Pencil } from '@phosphor-icons/react';
import { IconButton } from '../icon-button';
import { Tooltip } from '../tooltip';
import { useSidebar } from '../sidebar/sidebar-provider';
import { Button } from '../button';
import { useStepper } from '../stepper';
import { StepsRoot, StepsList, StepsItem } from '../steps';

export interface WizardStepItem {
	id: string;
	label: string;
	description?: string;
}

export interface PageSectionWizardProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * The wizard title (editable if onTitleChange is provided)
	 */
	title: string;
	/**
	 * Called when the title is changed. If provided, title becomes editable.
	 */
	onTitleChange?: (newTitle: string) => void;
	/**
	 * Called when editing ends (blur or Enter key)
	 */
	onTitleChangeEnd?: (newTitle: string) => void;
	/**
	 * Placeholder text when title is empty
	 */
	titlePlaceholder?: string;
	/**
	 * Current step index (0-based). If not provided, reads from Stepper context.
	 */
	currentStep?: number;
	/**
	 * Total number of steps. If not provided, reads from Stepper context.
	 */
	totalSteps?: number;
	/**
	 * Array of step definitions for the step indicators.
	 * If not provided and within Stepper context, uses context steps.
	 */
	steps?: WizardStepItem[];
	/**
	 * Called when a step is clicked (for navigation).
	 * If not provided and within Stepper context, uses context navigation.
	 */
	onStepClick?: (stepIndex: number) => void;
	/**
	 * Whether to show the secondary sidebar toggle button
	 */
	showSidebarToggle?: boolean;
	/**
	 * Custom content to render in the steps area (overrides default step indicators)
	 */
	stepsContent?: React.ReactNode;
}

export function PageSectionWizard({
	title,
	onTitleChange,
	onTitleChangeEnd,
	titlePlaceholder = 'Untitled',
	currentStep: currentStepProp,
	totalSteps: totalStepsProp,
	steps: stepsProp,
	onStepClick: onStepClickProp,
	// Toggle moved into SidebarPanel (ChatGPT-style rail).
	showSidebarToggle = false,
	stepsContent,
	className,
	...props
}: PageSectionWizardProps) {
	const [isEditing, setIsEditing] = React.useState(false);
	const [localTitle, setLocalTitle] = React.useState(title);
	const inputRef = React.useRef<HTMLInputElement>(null);

	// Try to get stepper context (optional - component works without it)
	const stepperContext = (() => {
		try {
			return useStepper();
		} catch {
			return null;
		}
	})();

	// Derive values from props or stepper context
	const currentStep =
		currentStepProp ??
		(stepperContext ? stepperContext.steps.findIndex(s => s.value === stepperContext.value) : 0);

	const totalSteps = totalStepsProp ?? stepperContext?.steps.length ?? 0;

	const steps =
		stepsProp ??
		stepperContext?.steps.map((s, i) => ({
			id: s.value,
			label: s.value,
		}));

	const handleStepClick = (index: number) => {
		if (onStepClickProp) {
			onStepClickProp(index);
		} else if (stepperContext && steps) {
			stepperContext.selectStep(steps[index].id, index < currentStep ? 'prev' : 'next');
		}
	};

	// Sync local title with prop
	React.useEffect(() => {
		if (!isEditing) {
			setLocalTitle(title);
		}
	}, [title, isEditing]);

	const { secondaryIsOpen, toggleSecondary } = (() => {
		try {
			return useSidebar();
		} catch {
			return { secondaryIsOpen: false, toggleSecondary: () => {} };
		}
	})();

	const isEditable = typeof onTitleChange === 'function';

	const handleStartEditing = () => {
		if (!isEditable) return;
		setIsEditing(true);
		// Focus input after render
		setTimeout(() => inputRef.current?.focus(), 0);
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setLocalTitle(newValue);
		onTitleChange?.(newValue);
	};

	const handleFinishEditing = () => {
		setIsEditing(false);
		onTitleChangeEnd?.(localTitle);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleFinishEditing();
		} else if (e.key === 'Escape') {
			setLocalTitle(title); // Reset to original
			setIsEditing(false);
		}
	};

	return (
		<div
			className={cn(
				'flex items-center justify-between px-space-2xl py-space-xl bg-panel z-10 sticky top-0 overflow-hidden transition-all duration-300 ease-in-out',
				className
			)}
			{...props}
		>
			{/* Left section: Sidebar toggle + Title */}
			<div className="flex items-center gap-space-sm">
				{showSidebarToggle && !secondaryIsOpen && (
					<div className="-mx-1.5">
						<Tooltip content="Open sidebar" side="bottom">
							<IconButton
								variant="ghost"
								size="xs"
								aria-label="Open sidebar"
								icon={<BookOpen />}
								onClick={toggleSecondary}
							/>
						</Tooltip>
					</div>
				)}

				<div className="flex items-center gap-space-xs">
					{isEditing ? (
						<input
							ref={inputRef}
							type="text"
							value={localTitle}
							onChange={handleTitleChange}
							onBlur={handleFinishEditing}
							onKeyDown={handleKeyDown}
							placeholder={titlePlaceholder}
							className={cn(
								'outline-2 outline-border-primary rounded-md',
								'text-xl font-medium text-foreground bg-transparent',
								'min-w-[200px] py-0 w-fit',
								'placeholder:text-ink-muted'
							)}
						/>
					) : (
						<h1
							className={cn(
								'text-xl font-medium text-foreground',
								isEditable && 'cursor-text hover:text-primary transition-colors'
							)}
							onClick={handleStartEditing}
						>
							{title || titlePlaceholder}
						</h1>
					)}

					{isEditable && !isEditing && (
						<Tooltip content="Edit title" side="right">
							<IconButton
								variant="ghost"
								size="xs"
								aria-label="Edit title"
								icon={<Pencil className="size-4" />}
								onClick={handleStartEditing}
							/>
						</Tooltip>
					)}
				</div>
			</div>

			{/* Right section: Steps and Actions */}
			<div className="flex h-9 items-center gap-space-xl">
				{/* Step indicators */}
				{stepsContent ? (
					stepsContent
				) : steps && steps.length > 0 ? (
					<StepsRoot
						activeStep={currentStep}
						totalSteps={totalSteps}
						onStepChange={handleStepClick}
						variant="wizard"
						className="h-auto"
					>
						<StepsList className="gap-space-lg">
							{steps.map(step => (
								<StepsItem key={step.id} label={step.label} />
							))}
						</StepsList>
					</StepsRoot>
				) : totalSteps > 0 ? (
					<span className="text-sm text-muted-foreground">
						Step {currentStep + 1} of {totalSteps}
					</span>
				) : null}
			</div>
		</div>
	);
}

export default PageSectionWizard;
