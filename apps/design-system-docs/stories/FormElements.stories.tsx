import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Field as FieldBase,
	Label as LabelBase,
	DatePicker as DatePickerBase,
	Input as InputBase,
	Select as SelectBase,
	SelectContent as SelectContentBase,
	SelectItem as SelectItemBase,
	SelectTrigger as SelectTriggerBase,
	SelectValue as SelectValueBase,
	Checkbox as CheckboxBase,
	Button as ButtonBase,
	NumberInput as NumberInputBase,
} from '@marmoui/ui';
import { MdCalendarToday, MdEmail, MdPerson } from 'react-icons/md';

// Type assertions for React 19 compatibility
const Field = FieldBase as any;
const Label = LabelBase as any;
const DatePicker = DatePickerBase as any;
const Input = InputBase as any;
const Select = SelectBase as any;
const SelectContent = SelectContentBase as any;
const SelectItem = SelectItemBase as any;
const SelectTrigger = SelectTriggerBase as any;
const SelectValue = SelectValueBase as any;
const Checkbox = CheckboxBase as any;
const Button = ButtonBase as any;
const NumberInput = NumberInputBase as any;

const meta = {
	title: 'Components/Forms/Form Elements',
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Form Elements

Core form infrastructure components including Field wrappers, Labels, and DatePicker.

## Components Included

- **Field**: Form field wrapper with label, helper text, and error states
- **Label**: Accessible label component for form inputs
- **DatePicker**: Date and date range picker with presets

## Usage

\`\`\`tsx
import { Field, Label, DatePicker, Input } from '@marmoui/ui';

// Field with validation
<Field 
  label="Email" 
  required 
  errorText={errors.email}
  helperText="We'll never share your email"
>
  <Input type="email" />
</Field>

// DatePicker
<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select date"
/>

// Date Range
<DatePicker
  isRange
  value={[startDate, endDate]}
  onChange={setDateRange}
  hasPresets
/>
\`\`\`
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// LABEL STORIES
// ============================================

export const LabelDefault: Story = {
	name: 'Label - Default',
	render: () => (
		<div className="flex flex-col gap-2">
			<Label htmlFor="input">Username</Label>
			<Input id="input" placeholder="Enter username" className="w-60" />
		</div>
	),
};

export const LabelRequired: Story = {
	name: 'Label - Required Indicator',
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<Label htmlFor="required">
					Email <span className="text-destructive">*</span>
				</Label>
				<Input id="required" type="email" placeholder="you@example.com" className="w-60" />
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="optional">
					Phone <span className="text-ink-light text-xs">(optional)</span>
				</Label>
				<Input id="optional" type="tel" placeholder="+1 (555) 123-4567" className="w-60" />
			</div>
		</div>
	),
};

export const LabelWithCheckbox: Story = {
	name: 'Label - With Checkbox',
	render: () => (
		<div className="flex items-center gap-2">
			<Checkbox id="remember" />
			<Label htmlFor="remember">Remember me for 30 days</Label>
		</div>
	),
};

// ============================================
// FIELD STORIES
// ============================================

export const FieldDefault: Story = {
	name: 'Field - Default',
	render: () => (
		<Field label="Full Name" className="w-72">
			<Input placeholder="John Doe" />
		</Field>
	),
};

export const FieldRequired: Story = {
	name: 'Field - Required',
	render: () => (
		<Field label="Email Address" required className="w-72">
			<Input type="email" placeholder="you@example.com" />
		</Field>
	),
};

export const FieldWithHelperText: Story = {
	name: 'Field - With Helper Text',
	render: () => (
		<Field
			label="Password"
			helperText="Must be at least 8 characters with one uppercase letter and one number"
			className="w-72"
		>
			<Input type="password" placeholder="••••••••" />
		</Field>
	),
};

export const FieldWithError: Story = {
	name: 'Field - With Error',
	render: () => (
		<Field label="Email" required errorText="Please enter a valid email address" className="w-72">
			<Input type="email" variant="destructive" defaultValue="invalid-email" />
		</Field>
	),
};

export const FieldOptional: Story = {
	name: 'Field - Optional',
	render: () => (
		<Field label="Bio" optionalText="optional" className="w-72">
			<Input placeholder="Tell us about yourself..." />
		</Field>
	),
};

export const FieldWithSelect: Story = {
	name: 'Field - With Select',
	render: () => (
		<Field label="Country" required className="w-72">
			<Select>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Select country..." />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="us">United States</SelectItem>
					<SelectItem value="uk">United Kingdom</SelectItem>
					<SelectItem value="ca">Canada</SelectItem>
					<SelectItem value="au">Australia</SelectItem>
				</SelectContent>
			</Select>
		</Field>
	),
};

export const FieldStates: Story = {
	name: 'Field - All States',
	render: () => (
		<div className="flex flex-col gap-6 w-72">
			<Field label="Normal Field" helperText="This is a normal field">
				<Input placeholder="Normal input" />
			</Field>
			<Field label="Required Field" required>
				<Input placeholder="Required input" />
			</Field>
			<Field label="Optional Field" optionalText="optional">
				<Input placeholder="Optional input" />
			</Field>
			<Field label="Error Field" errorText="This field has an error">
				<Input variant="destructive" placeholder="Error input" />
			</Field>
			<Field label="Success Field" helperText="Looks good!">
				<Input variant="success" defaultValue="Valid input" />
			</Field>
		</div>
	),
};

// ============================================
// DATE PICKER STORIES
// ============================================

export const DatePickerDefault: Story = {
	name: 'DatePicker - Default',
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>();

		return (
			<div className="w-72">
				<Label className="mb-1 block">Select Date</Label>
				<DatePicker
					value={date}
					onChange={(d: Date | [Date, Date] | undefined) => setDate(d as Date | undefined)}
					placeholder="Pick a date"
				/>
			</div>
		);
	},
};

export const DatePickerWithTriggerTypes: Story = {
	name: 'DatePicker - Trigger Types',
	render: () => {
		const [date1, setDate1] = React.useState<Date | undefined>();
		const [date2, setDate2] = React.useState<Date | undefined>();

		return (
			<div className="flex flex-col gap-6">
				<div className="w-72">
					<Label className="mb-1 block">Button Trigger (Default)</Label>
					<DatePicker
						value={date1}
						onChange={(d: Date | [Date, Date] | undefined) => setDate1(d as Date | undefined)}
						placeholder="Pick a date"
						triggerType="button"
					/>
				</div>
				<div className="w-72">
					<Label className="mb-1 block">Input Trigger</Label>
					<DatePicker
						value={date2}
						onChange={(d: Date | [Date, Date] | undefined) => setDate2(d as Date | undefined)}
						placeholder="Pick a date"
						triggerType="input"
					/>
				</div>
			</div>
		);
	},
};

export const DatePickerWithPresets: Story = {
	name: 'DatePicker - With Presets',
	render: () => {
		const [date, setDate] = React.useState<Date | [Date, Date] | undefined>();

		return (
			<div className="w-72">
				<Label className="mb-1 block">Event Date</Label>
				<DatePicker value={date} onChange={setDate} placeholder="Select date" hasPresets />
			</div>
		);
	},
};

export const DatePickerRange: Story = {
	name: 'DatePicker - Date Range',
	render: () => {
		const [dateRange, setDateRange] = React.useState<[Date, Date] | undefined>();

		return (
			<div className="w-80">
				<Label className="mb-1 block">Date Range</Label>
				<DatePicker
					value={dateRange}
					onChange={(d: Date | [Date, Date] | undefined) =>
						setDateRange(d as [Date, Date] | undefined)
					}
					placeholder="Select date range"
					isRange
				/>
			</div>
		);
	},
};

export const DatePickerRangeWithPresets: Story = {
	name: 'DatePicker - Range with Presets',
	render: () => {
		const [dateRange, setDateRange] = React.useState<[Date, Date] | undefined>();

		return (
			<div className="w-96">
				<Label className="mb-1 block">Report Period</Label>
				<DatePicker
					value={dateRange}
					onChange={(d: Date | [Date, Date] | undefined) =>
						setDateRange(d as [Date, Date] | undefined)
					}
					placeholder="Select period"
					isRange
					hasPresets
				/>
			</div>
		);
	},
};

export const DatePickerDisabled: Story = {
	name: 'DatePicker - Disabled',
	render: () => (
		<div className="w-72">
			<Label className="mb-1 block">Locked Date</Label>
			<DatePicker value={new Date()} disabled placeholder="Cannot change" />
		</div>
	),
};

export const DatePickerWithConstraints: Story = {
	name: 'DatePicker - With Constraints',
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>();
		const today = new Date();
		const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

		return (
			<div className="w-72">
				<Label className="mb-1 block">Appointment Date</Label>
				<DatePicker
					value={date}
					onChange={(d: Date | [Date, Date] | undefined) => setDate(d as Date | undefined)}
					placeholder="Select appointment"
					disabledDays={(date: Date) => date < today}
					endMonth={nextMonth}
				/>
				<p className="text-xs text-ink-light mt-1">
					Only future dates within the next month are available
				</p>
			</div>
		);
	},
};

// ============================================
// COMPLETE FORM EXAMPLES
// ============================================

export const RegistrationForm: Story = {
	name: 'Example - Registration Form',
	render: () => {
		const [formData, setFormData] = React.useState({
			name: '',
			email: '',
			password: '',
			birthdate: undefined as Date | undefined,
			agreeTerms: false,
		});
		const [errors, setErrors] = React.useState<Record<string, string>>({});

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();
			const newErrors: Record<string, string> = {};

			if (!formData.name) newErrors.name = 'Name is required';
			if (!formData.email) newErrors.email = 'Email is required';
			else if (!formData.email.includes('@')) newErrors.email = 'Invalid email format';
			if (!formData.password) newErrors.password = 'Password is required';
			else if (formData.password.length < 8)
				newErrors.password = 'Password must be at least 8 characters';
			if (!formData.birthdate) newErrors.birthdate = 'Birth date is required';
			if (!formData.agreeTerms) newErrors.terms = 'You must agree to the terms';

			setErrors(newErrors);

			if (Object.keys(newErrors).length === 0) {
				alert('Form submitted successfully!');
			}
		};

		return (
			<form onSubmit={handleSubmit} className="w-80 p-6 border border-border rounded-lg bg-panel">
				<h3 className="text-lg font-semibold mb-4">Create Account</h3>
				<div className="flex flex-col gap-4">
					<Field label="Full Name" required errorText={errors.name}>
						<Input
							value={formData.name}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setFormData(prev => ({ ...prev, name: e.target.value }))
							}
							placeholder="John Doe"
							variant={errors.name ? 'destructive' : 'normal'}
							startAdornment={<MdPerson size={18} />}
						/>
					</Field>

					<Field label="Email" required errorText={errors.email}>
						<Input
							type="email"
							value={formData.email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setFormData(prev => ({ ...prev, email: e.target.value }))
							}
							placeholder="you@example.com"
							variant={errors.email ? 'destructive' : 'normal'}
							startAdornment={<MdEmail size={18} />}
						/>
					</Field>

					<Field
						label="Password"
						required
						errorText={errors.password}
						helperText={!errors.password ? 'At least 8 characters' : undefined}
					>
						<Input
							type="password"
							value={formData.password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setFormData(prev => ({ ...prev, password: e.target.value }))
							}
							placeholder="••••••••"
							variant={errors.password ? 'destructive' : 'normal'}
						/>
					</Field>

					<Field label="Date of Birth" required errorText={errors.birthdate}>
						<DatePicker
							value={formData.birthdate}
							onChange={(d: Date | [Date, Date] | undefined) =>
								setFormData(prev => ({ ...prev, birthdate: d as Date | undefined }))
							}
							placeholder="Select your birthday"
							triggerType="input"
							disabledDays={(date: Date) => date > new Date()}
						/>
					</Field>

					<div className="flex flex-col gap-1">
						<div className="flex items-start gap-2">
							<Checkbox
								id="terms"
								checked={formData.agreeTerms}
								onCheckedChange={(checked: boolean | 'indeterminate') =>
									setFormData(prev => ({ ...prev, agreeTerms: checked === true }))
								}
								className="mt-0.5"
							/>
							<Label htmlFor="terms" className="text-sm">
								I agree to the Terms of Service and Privacy Policy
							</Label>
						</div>
						{errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}
					</div>

					<Button type="submit" className="w-full mt-2">
						Create Account
					</Button>
				</div>
			</form>
		);
	},
};

export const EventSchedulingForm: Story = {
	name: 'Example - Event Scheduling',
	render: () => {
		const [eventData, setEventData] = React.useState({
			title: '',
			dateRange: undefined as [Date, Date] | undefined,
			attendees: undefined as number | undefined,
		});

		return (
			<div className="w-96 p-6 border border-border rounded-lg bg-panel">
				<h3 className="text-lg font-semibold mb-4">Schedule Event</h3>
				<div className="flex flex-col gap-4">
					<Field label="Event Title" required>
						<Input
							value={eventData.title}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setEventData(prev => ({ ...prev, title: e.target.value }))
							}
							placeholder="Team Offsite Meeting"
						/>
					</Field>

					<Field label="Event Dates" required helperText="Select start and end dates">
						<DatePicker
							value={eventData.dateRange}
							onChange={(d: Date | [Date, Date] | undefined) =>
								setEventData(prev => ({ ...prev, dateRange: d as [Date, Date] | undefined }))
							}
							placeholder="Select date range"
							isRange
							hasPresets
						/>
					</Field>

					<Field label="Expected Attendees" optionalText="optional">
						<NumberInput
							value={eventData.attendees}
							onValueChange={(value: number | undefined) =>
								setEventData(prev => ({ ...prev, attendees: value }))
							}
							min={1}
							max={1000}
							placeholder="Number of attendees"
						/>
					</Field>

					<Button className="w-full mt-2">Schedule Event</Button>
				</div>
			</div>
		);
	},
};

export const FilterForm: Story = {
	name: 'Example - Filter Form',
	render: () => {
		const [filters, setFilters] = React.useState({
			dateRange: undefined as [Date, Date] | undefined,
			status: '',
			minAmount: undefined as number | undefined,
			maxAmount: undefined as number | undefined,
		});

		return (
			<div className="w-96 p-6 border border-border rounded-lg bg-panel">
				<h3 className="text-lg font-semibold mb-4">Filter Transactions</h3>
				<div className="flex flex-col gap-4">
					<Field label="Date Range">
						<DatePicker
							value={filters.dateRange}
							onChange={(d: Date | [Date, Date] | undefined) =>
								setFilters(prev => ({ ...prev, dateRange: d as [Date, Date] | undefined }))
							}
							placeholder="Select period"
							isRange
							hasPresets
						/>
					</Field>

					<Field label="Status">
						<Select
							value={filters.status}
							onValueChange={(value: string) => setFilters(prev => ({ ...prev, status: value }))}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="All statuses" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="pending">Pending</SelectItem>
								<SelectItem value="completed">Completed</SelectItem>
								<SelectItem value="failed">Failed</SelectItem>
								<SelectItem value="refunded">Refunded</SelectItem>
							</SelectContent>
						</Select>
					</Field>

					<div className="grid grid-cols-2 gap-3">
						<Field label="Min Amount">
							<NumberInput
								value={filters.minAmount}
								onValueChange={(value: number | undefined) =>
									setFilters(prev => ({ ...prev, minAmount: value }))
								}
								min={0}
								step={10}
								placeholder="0"
							/>
						</Field>
						<Field label="Max Amount">
							<NumberInput
								value={filters.maxAmount}
								onValueChange={(value: number | undefined) =>
									setFilters(prev => ({ ...prev, maxAmount: value }))
								}
								min={0}
								step={10}
								placeholder="1000"
							/>
						</Field>
					</div>

					<div className="flex gap-2 mt-2">
						<Button variant="secondary" className="flex-1">
							Reset
						</Button>
						<Button className="flex-1">Apply Filters</Button>
					</div>
				</div>
			</div>
		);
	},
};
