'use client';

import { LeadLifecycleFunnel, Widget } from '@marmoui/ui';

// Exact shape returned by the lifecycle API.
const apiResponse = {
	statuses: [
		{ label: 'Poor Data', color: '#f00000', leads: 9342 },
		{ label: 'Awareness', color: '#e6b58e', leads: 6465 },
		{ label: 'Consideration', color: '#17960c', leads: 158 },
		{ label: 'Decision', color: '#1bcaab', leads: 109 },
		{ label: 'Conversion', color: '#b762bb', leads: 109 },
		{ label: 'Retention', color: '#30367e', leads: 474 },
		{ label: 'Maintenance', color: '#c5973d', leads: 4 },
	],
};

export function LeadLifecycleApiShapePreview() {
	return (
		<div className="max-w-2xl">
			<Widget title="Leads Funnel">
				<LeadLifecycleFunnel
					ariaLabel="Lead lifecycle"
					statuses={apiResponse.statuses}
					onReviewFlag={() => {}}
				/>
			</Widget>
		</div>
	);
}

export function LeadLifecycleUserColorsPreview() {
	return (
		<div className="max-w-2xl">
			<Widget title="Leads Funnel">
				<LeadLifecycleFunnel
					ariaLabel="Lead lifecycle with data colors enabled"
					statuses={apiResponse.statuses}
					useDataColors
					onReviewFlag={() => {}}
				/>
			</Widget>
		</div>
	);
}

export function LeadLifecycleSequentialPreview() {
	return (
		<div className="max-w-2xl">
			<Widget title="Leads Funnel">
				<LeadLifecycleFunnel
					ariaLabel="Lead lifecycle with default chart palette"
					statuses={apiResponse.statuses}
					onReviewFlag={() => {}}
				/>
			</Widget>
		</div>
	);
}

export function LeadLifecycleNoFlagsPreview() {
	const cleanStatuses = apiResponse.statuses.filter((s) => s.label !== 'Poor Data');
	return (
		<div className="max-w-2xl">
			<Widget title="Leads Funnel">
				<LeadLifecycleFunnel
					ariaLabel="Clean lead lifecycle"
					statuses={cleanStatuses}
				/>
			</Widget>
		</div>
	);
}
