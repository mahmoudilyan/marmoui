import * as React from 'react';
import { CaretUp, CaretDown } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { inputVariants } from './input';
import { IconButton } from './icon-button';
import type { VariantProps } from 'class-variance-authority';

export interface NumberInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
		VariantProps<typeof inputVariants> {
	onValueChange?: (value: number | undefined) => void;
	defaultValue?: number;
	value?: number;
	min?: number;
	max?: number;
	step?: number;
	precision?: number;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
	(
		{
			className,
			onValueChange,
			defaultValue,
			value,
			min,
			max,
			step = 1,
			precision,
			variant = 'normal',
			size = 'md',
			...props
		},
		ref
	) => {
		const [internalValue, setInternalValue] = React.useState<string>(
			value?.toString() || defaultValue?.toString() || ''
		);

		React.useEffect(() => {
			if (value !== undefined) {
				setInternalValue(value.toString());
			}
		}, [value]);

		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = e.target.value;
			setInternalValue(inputValue);

			if (inputValue === '' || inputValue === '-') {
				onValueChange?.(undefined);
				return;
			}

			const numValue = Number.parseFloat(inputValue);
			if (!isNaN(numValue)) {
				onValueChange?.(numValue);
			}
		};

		const handleIncrement = () => {
			const currentValue = parseFloat(internalValue) || 0;
			const newValue = currentValue + step;
			const clampedValue = max !== undefined ? Math.min(newValue, max) : newValue;
			const finalValue =
				precision !== undefined ? parseFloat(clampedValue.toFixed(precision)) : clampedValue;

			setInternalValue(finalValue.toString());
			onValueChange?.(finalValue);
		};

		const handleDecrement = () => {
			const currentValue = parseFloat(internalValue) || 0;
			const newValue = currentValue - step;
			const clampedValue = min !== undefined ? Math.max(newValue, min) : newValue;
			const finalValue =
				precision !== undefined ? parseFloat(clampedValue.toFixed(precision)) : clampedValue;

			setInternalValue(finalValue.toString());
			onValueChange?.(finalValue);
		};

		return (
			<div className="relative">
				<input
					type="number"
					className={cn(
						inputVariants({ variant, size }),
						'pr-9',
						// Hide default number input spinners
						'[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
						className
					)}
					ref={ref}
					value={internalValue}
					onChange={handleInputChange}
					min={min}
					max={max}
					step={step}
					{...props}
				/>
				<div className="absolute right-0.5 top-1/2 -translate-y-1/2 flex flex-col gap-px">
					<IconButton
						type="button"
						onClick={handleIncrement}
						variant="ghost"
						size="xs"
						icon={<CaretUp size={14} />}
						className="h-[18px] w-7 rounded-sm border border-border hover:border-border-hover"
						tabIndex={-1}
					/>
					<IconButton
						type="button"
						onClick={handleDecrement}
						variant="ghost"
						size="xs"
						icon={<CaretDown size={14} />}
						className="h-[18px] w-7 rounded-sm border border-border hover:border-border-hover"
						tabIndex={-1}
					/>
				</div>
			</div>
		);
	}
);
NumberInput.displayName = 'NumberInput';

export { NumberInput };
