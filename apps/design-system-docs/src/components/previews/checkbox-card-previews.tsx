'use client';

import * as React from 'react';
import { CheckboxCardGroup, CheckboxCardItem } from '@marmoui/ui';
import {
	MdEmail,
	MdSms,
	MdNotifications,
	MdCreditCard,
	MdAccountBalance,
	MdPayment,
	MdInsights,
	MdPeople,
	MdShoppingCart,
	MdAutoGraph,
	MdIntegrationInstructions,
	MdCloud,
	MdStorage,
	MdWebhook,
} from 'react-icons/md';

export function CheckboxCardBasicPreview() {
	return (
		<CheckboxCardGroup className="max-w-md">
			<CheckboxCardItem
				label="Email Notifications"
				description="Receive email updates about your campaigns"
			/>
			<CheckboxCardItem
				label="SMS Notifications"
				description="Get text messages for urgent alerts"
			/>
			<CheckboxCardItem
				label="Push Notifications"
				description="Browser push notifications for real-time updates"
			/>
		</CheckboxCardGroup>
	);
}

export function CheckboxCardWithIndicatorPreview() {
	return (
		<div className="flex flex-col gap-6 w-full">
			<div>
				<p className="text-sm text-ink-muted mb-2">Indicator at end (default)</p>
				<CheckboxCardGroup className="max-w-md">
					<CheckboxCardItem
						label="Analytics reports"
						description="Weekly performance summaries"
						defaultChecked
					/>
					<CheckboxCardItem
						label="Marketing emails"
						description="Campaign updates and tips"
					/>
				</CheckboxCardGroup>
			</div>
			<div>
				<p className="text-sm text-ink-muted mb-2">Indicator at start</p>
				<CheckboxCardGroup className="max-w-md">
					<CheckboxCardItem
						indicatorPlacement="start"
						label="Analytics reports"
						description="Weekly performance summaries"
						defaultChecked
					/>
					<CheckboxCardItem
						indicatorPlacement="start"
						label="Marketing emails"
						description="Campaign updates and tips"
					/>
				</CheckboxCardGroup>
			</div>
			<div>
				<p className="text-sm text-ink-muted mb-2">No indicator</p>
				<CheckboxCardGroup className="max-w-md">
					<CheckboxCardItem
						indicator={null}
						label="Analytics reports"
						description="Weekly performance summaries"
						defaultChecked
					/>
					<CheckboxCardItem
						indicator={null}
						label="Marketing emails"
						description="Campaign updates and tips"
					/>
				</CheckboxCardGroup>
			</div>
		</div>
	);
}

export function CheckboxCardNotificationPreview() {
	return (
		<CheckboxCardGroup className="max-w-md">
			<CheckboxCardItem
				icon={<MdEmail className="size-5 text-icon" />}
				label="Email Digest"
				description="Daily summary of sales, refunds, and new subscribers sent to your inbox"
				defaultChecked
			/>
			<CheckboxCardItem
				icon={<MdSms className="size-5 text-icon" />}
				label="SMS Alerts"
				description="Instant text for high-value orders, failed payments, and chargebacks"
			/>
			<CheckboxCardItem
				icon={<MdNotifications className="size-5 text-icon" />}
				label="Browser Push"
				description="Real-time notifications for new orders and customer messages"
			/>
		</CheckboxCardGroup>
	);
}

export function CheckboxCardPaymentMethodsPreview() {
	return (
		<CheckboxCardGroup className="grid-cols-3 max-w-2xl">
			<CheckboxCardItem
				icon={<MdCreditCard className="size-5 text-icon" />}
				label="Credit Card"
				description="Visa, Mastercard, Amex"
				defaultChecked
			/>
			<CheckboxCardItem
				icon={<MdAccountBalance className="size-5 text-icon" />}
				label="Bank Transfer"
				description="Direct ACH payments"
				defaultChecked
			/>
			<CheckboxCardItem
				icon={<MdPayment className="size-5 text-icon" />}
				label="PayPal"
				description="Pay with PayPal balance"
			/>
		</CheckboxCardGroup>
	);
}

export function CheckboxCardFeaturesPreview() {
	return (
		<CheckboxCardGroup className="max-w-lg">
			<CheckboxCardItem
				icon={<MdInsights className="size-5 text-icon" />}
				label="Advanced Analytics"
				description="Conversion funnels, cohort analysis, and revenue attribution"
				addon={<span className="text-xs font-medium text-primary-solid">+ $19/mo</span>}
				defaultChecked
			/>
			<CheckboxCardItem
				icon={<MdPeople className="size-5 text-icon" />}
				label="Team Collaboration"
				description="Invite up to 10 team members with role-based permissions"
				addon={<span className="text-xs font-medium text-primary-solid">+ $29/mo</span>}
			/>
			<CheckboxCardItem
				icon={<MdShoppingCart className="size-5 text-icon" />}
				label="Order Bump & Upsells"
				description="Post-purchase upsells and one-click order bumps on checkout"
				addon={<span className="text-xs font-medium text-primary-solid">+ $9/mo</span>}
				defaultChecked
			/>
			<CheckboxCardItem
				icon={<MdAutoGraph className="size-5 text-icon" />}
				label="A/B Testing"
				description="Split test checkout pages, pricing, and button copy"
				addon={<span className="text-xs font-medium text-primary-solid">+ $15/mo</span>}
			/>
		</CheckboxCardGroup>
	);
}

export function CheckboxCardIntegrationsPreview() {
	return (
		<CheckboxCardGroup className="grid-cols-2 max-w-xl">
			<CheckboxCardItem
				indicatorPlacement="start"
				icon={<MdIntegrationInstructions className="size-5 text-icon" />}
				label="Zapier"
				description="Connect to 5,000+ apps"
				defaultChecked
			/>
			<CheckboxCardItem
				indicatorPlacement="start"
				icon={<MdWebhook className="size-5 text-icon" />}
				label="Webhooks"
				description="Custom HTTP event callbacks"
				defaultChecked
			/>
			<CheckboxCardItem
				indicatorPlacement="start"
				icon={<MdCloud className="size-5 text-icon" />}
				label="Google Sheets"
				description="Sync orders to spreadsheets"
			/>
			<CheckboxCardItem
				indicatorPlacement="start"
				icon={<MdStorage className="size-5 text-icon" />}
				label="Airtable"
				description="Push data to Airtable bases"
			/>
		</CheckboxCardGroup>
	);
}

export function CheckboxCardDisabledPreview() {
	return (
		<CheckboxCardGroup className="max-w-md">
			<CheckboxCardItem
				label="Available Option"
				description="This option can be selected"
			/>
			<CheckboxCardItem
				label="Disabled Option"
				description="This option is not available"
				disabled
			/>
			<CheckboxCardItem
				label="Checked & Disabled"
				description="This option is locked in"
				disabled
				defaultChecked
			/>
		</CheckboxCardGroup>
	);
}
