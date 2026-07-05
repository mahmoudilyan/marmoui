'use client';

import { CheckboxCardGroup, CheckboxCardItem } from '@marmoui/ui';

export function CheckboxCardBasicPreview() {
	return (
		<CheckboxCardGroup className="w-full max-w-md">
			<CheckboxCardItem
				id="card-feature-1"
				label="Email Marketing"
				description="Send targeted email campaigns to your subscribers"
			/>
			<CheckboxCardItem
				id="card-feature-2"
				label="SMS Marketing"
				description="Reach customers via text message"
			/>
		</CheckboxCardGroup>
	);
}

export function CheckboxCardIconsPreview() {
	return (
		<CheckboxCardGroup className="w-full max-w-md">
			<CheckboxCardItem
				id="icon-email"
				label="Email"
				description="Receive updates via email"
				defaultChecked
			/>
			<CheckboxCardItem
				id="icon-sms"
				label="SMS"
				description="Get text message alerts"
			/>
		</CheckboxCardGroup>
	);
}

export function CheckboxCardAddonPreview() {
	return (
		<CheckboxCardGroup className="w-full max-w-md">
			<CheckboxCardItem
				id="addon-basic-ex"
				label="Basic Features"
				description="Essential tools for getting started"
				defaultChecked
			/>
			<CheckboxCardItem
				id="addon-advanced-ex"
				label="Advanced Analytics"
				description="Deep insights and custom reports"
			/>
		</CheckboxCardGroup>
	);
}
