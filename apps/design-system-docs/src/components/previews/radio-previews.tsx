'use client';

import { RadioGroup, Radio, RadioCard, RadioCardItem, Label } from '@marmoui/ui';

export function RadioBasicPreview() {
	return (
		<RadioGroup defaultValue="option-1" className="space-y-2">
			<div className="flex items-center space-x-2">
				<Radio value="option-1" id="option-1" />
				<Label htmlFor="option-1" className="font-normal">Option One</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Radio value="option-2" id="option-2" />
				<Label htmlFor="option-2" className="font-normal">Option Two</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Radio value="option-3" id="option-3" />
				<Label htmlFor="option-3" className="font-normal">Option Three</Label>
			</div>
		</RadioGroup>
	);
}

export function RadioWithDescriptionsPreview() {
	return (
		<RadioGroup defaultValue="free" className="space-y-4">
			<div className="flex items-start space-x-3">
				<Radio value="free" id="free" className="mt-0.5" />
				<div>
					<Label htmlFor="free" className="font-medium">Free Plan</Label>
					<p className="text-sm text-ink-light">Basic features for individuals getting started</p>
				</div>
			</div>
			<div className="flex items-start space-x-3">
				<Radio value="pro" id="pro" className="mt-0.5" />
				<div>
					<Label htmlFor="pro" className="font-medium">Pro Plan</Label>
					<p className="text-sm text-ink-light">Advanced features for professionals and small teams</p>
				</div>
			</div>
		</RadioGroup>
	);
}

export function RadioHorizontalPreview() {
	return (
		<RadioGroup defaultValue="left" className="flex gap-4">
			<div className="flex items-center space-x-2">
				<Radio value="left" id="left" />
				<Label htmlFor="left" className="font-normal">Left</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Radio value="center" id="center" />
				<Label htmlFor="center" className="font-normal">Center</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Radio value="right" id="right" />
				<Label htmlFor="right" className="font-normal">Right</Label>
			</div>
		</RadioGroup>
	);
}

export function RadioDisabledPreview() {
	return (
		<RadioGroup defaultValue="option-1" className="space-y-2">
			<div className="flex items-center space-x-2">
				<Radio value="option-1" id="option-1" />
				<Label htmlFor="option-1" className="font-normal">Enabled option</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Radio value="option-2" id="option-2" disabled />
				<Label htmlFor="option-2" className="font-normal">Disabled option</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Radio value="option-3" id="option-3" />
				<Label htmlFor="option-3" className="font-normal">Another enabled option</Label>
			</div>
		</RadioGroup>
	);
}

export function RadioAlternativePreview() {
	return (
		<RadioGroup defaultValue="option-a" className="space-y-2">
			<div className="flex items-center space-x-2">
				<Radio value="option-a" id="option-a" />
				<Label htmlFor="option-a" className="font-normal">Option A</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Radio value="option-b" id="option-b" />
				<Label htmlFor="option-b" className="font-normal">Option B</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Radio value="option-c" id="option-c" />
				<Label htmlFor="option-c" className="font-normal">Option C</Label>
			</div>
		</RadioGroup>
	);
}

export function RadioCardBasicPreview() {
	return (
		<RadioCard defaultValue="starter" className="w-full max-w-md">
			<RadioCardItem
				value="starter"
				label="Starter Plan"
				description="Perfect for individuals and small projects"
			/>
			<RadioCardItem
				value="pro"
				label="Pro Plan"
				description="For growing teams with advanced needs"
			/>
		</RadioCard>
	);
}

export function RadioCardIconsPreview() {
	return (
		<RadioCard defaultValue="email" className="w-full max-w-md">
			<RadioCardItem value="email" label="Email" description="Send via email campaign" />
			<RadioCardItem value="sms" label="SMS" description="Send via text message" />
		</RadioCard>
	);
}

export function RadioCardAddonPreview() {
	return (
		<RadioCard defaultValue="monthly" className="w-full max-w-md">
			<RadioCardItem
				value="monthly"
				label="Monthly Billing"
				description="Pay month-to-month, cancel anytime"
				addon={<span className="text-lg font-bold">$29/mo</span>}
			/>
			<RadioCardItem
				value="yearly"
				label="Yearly Billing"
				description="Save 20% with annual payment"
				addon={<span className="text-lg font-bold">$279/yr</span>}
			/>
		</RadioCard>
	);
}
