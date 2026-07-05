'use client';

import * as React from 'react';
import { RadioCard, RadioCardItem } from '@marmoui/ui';
import {
	MdRocketLaunch,
	MdSpeed,
	MdStar,
	MdViewModule,
	MdViewList,
	MdGridView,
	MdCreditCard,
	MdAccountBalance,
	MdPayment,
} from 'react-icons/md';

export function RadioCardBasicPreview() {
	return (
		<RadioCard defaultValue="pro" className="max-w-md">
			<RadioCardItem
				value="starter"
				label="Starter"
				description="For individuals getting started"
			/>
			<RadioCardItem
				value="pro"
				label="Pro"
				description="For growing businesses"
			/>
			<RadioCardItem
				value="enterprise"
				label="Enterprise"
				description="For large organizations"
			/>
		</RadioCard>
	);
}

export function RadioCardWithIndicatorPreview() {
	return (
		<div className="flex flex-col gap-6 w-full">
			<div>
				<p className="text-sm text-ink-muted mb-2">Indicator at end (default)</p>
				<RadioCard defaultValue="monthly" className="max-w-md">
					<RadioCardItem value="monthly" label="Monthly" description="Billed every month" />
					<RadioCardItem value="annual" label="Annual" description="Billed once a year — save 20%" />
				</RadioCard>
			</div>
			<div>
				<p className="text-sm text-ink-muted mb-2">Indicator at start</p>
				<RadioCard defaultValue="monthly" className="max-w-md">
					<RadioCardItem indicatorPlacement="start" value="monthly" label="Monthly" description="Billed every month" />
					<RadioCardItem indicatorPlacement="start" value="annual" label="Annual" description="Billed once a year — save 20%" />
				</RadioCard>
			</div>
			<div>
				<p className="text-sm text-ink-muted mb-2">No indicator</p>
				<RadioCard defaultValue="monthly" className="max-w-md">
					<RadioCardItem indicator={null} value="monthly" label="Monthly" description="Billed every month" />
					<RadioCardItem indicator={null} value="annual" label="Annual" description="Billed once a year — save 20%" />
				</RadioCard>
			</div>
		</div>
	);
}

export function RadioCardWithIconsPreview() {
	return (
		<RadioCard defaultValue="pro" className="max-w-md">
			<RadioCardItem
				value="starter"
				icon={<MdRocketLaunch className="size-5 text-icon" />}
				label="Starter"
				description="Up to 1,000 contacts"
			/>
			<RadioCardItem
				value="pro"
				icon={<MdSpeed className="size-5 text-icon" />}
				label="Pro"
				description="Up to 10,000 contacts"
			/>
			<RadioCardItem
				value="enterprise"
				icon={<MdStar className="size-5 text-icon" />}
				label="Enterprise"
				description="Unlimited contacts"
			/>
		</RadioCard>
	);
}

export function RadioCardGridPreview() {
	return (
		<RadioCard defaultValue="grid" className="grid-cols-3 max-w-2xl">
			<RadioCardItem
				value="module"
				icon={<MdViewModule className="size-5 text-icon" />}
				label="Module"
				description="Card-based layout"
			/>
			<RadioCardItem
				value="list"
				icon={<MdViewList className="size-5 text-icon" />}
				label="List"
				description="Detailed list view"
			/>
			<RadioCardItem
				value="grid"
				icon={<MdGridView className="size-5 text-icon" />}
				label="Grid"
				description="Compact grid view"
			/>
		</RadioCard>
	);
}

export function RadioCardWithAddonPreview() {
	return (
		<RadioCard defaultValue="card" className="max-w-md">
			<RadioCardItem
				value="card"
				icon={<MdCreditCard className="size-5 text-icon" />}
				label="Credit Card"
				description="Visa, Mastercard, Amex"
				addon={<span className="text-xs text-ink-muted">Processing fee: 2.9%</span>}
			/>
			<RadioCardItem
				value="bank"
				icon={<MdAccountBalance className="size-5 text-icon" />}
				label="Bank Transfer"
				description="Direct ACH payment"
				addon={<span className="text-xs text-ink-muted">No fee</span>}
			/>
			<RadioCardItem
				value="paypal"
				icon={<MdPayment className="size-5 text-icon" />}
				label="PayPal"
				description="Pay with PayPal balance"
				addon={<span className="text-xs text-ink-muted">Processing fee: 3.4%</span>}
			/>
		</RadioCard>
	);
}

export function RadioCardDisabledPreview() {
	return (
		<RadioCard defaultValue="active" className="max-w-md">
			<RadioCardItem
				value="active"
				label="Active Option"
				description="This option can be selected"
			/>
			<RadioCardItem
				value="disabled"
				label="Disabled Option"
				description="This option is not available"
				disabled
			/>
		</RadioCard>
	);
}
