'use client';

import * as React from 'react';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@marmoui/ui';

/**
 * Registry of type definitions.
 * Add new types here as they are documented.
 */
const TYPE_REGISTRY: Record<string, { description?: string; definition: string }> = {
	WizardStepItem: {
		description: 'Defines a single step in a wizard flow.',
		definition: `interface WizardStepItem {
  id: string;
  label: string;
  description?: string;
}`,
	},
	'WizardStepItem[]': {
		description: 'Array of step definitions for wizard indicators.',
		definition: `interface WizardStepItem {
  id: string;
  label: string;
  description?: string;
}`,
	},
	PageSectionBreadcrumbItem: {
		description: 'Defines a breadcrumb item with optional actions.',
		definition: `interface PageSectionBreadcrumbItem {
  label: string;
  href?: string;
  preserveQuery?: boolean;
  onClick?: () => void;
  actions?: BreadcrumbActionItem[];
}`,
	},
	'PageSectionBreadcrumbItem[]': {
		description: 'Array of breadcrumb items for page navigation.',
		definition: `interface PageSectionBreadcrumbItem {
  label: string;
  href?: string;
  preserveQuery?: boolean;
  onClick?: () => void;
  actions?: BreadcrumbActionItem[];
}`,
	},
	BreadcrumbActionItem: {
		description: 'An action shown in a breadcrumb dropdown menu.',
		definition: `interface BreadcrumbActionItem {
  label: string;
  onClick?: () => void;
  isDelete?: boolean;
  icon?: ReactElement;
}`,
	},
	PageSectionActionItem: {
		description: 'Configuration for a primary or overflow action button.',
		definition: `interface PageSectionActionItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  isDelete?: boolean;
}`,
	},
	PageSectionSecondaryActionItem: {
		description: 'Configuration for a secondary action button.',
		definition: `interface PageSectionSecondaryActionItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
}`,
	},
	'PageSectionActionItem[]': {
		description: 'Array of action items for overflow menus.',
		definition: `interface PageSectionActionItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  isDelete?: boolean;
}`,
	},
	'PageSectionSecondaryActionItem[]': {
		description: 'Array of secondary action button configs.',
		definition: `interface PageSectionSecondaryActionItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
}`,
	},
	ReactNode: {
		description: 'Any valid React renderable content.',
		definition: `type ReactNode =
  | ReactElement
  | string
  | number
  | boolean
  | null
  | undefined;`,
	},
};

interface TypeInfoProps {
	/** The type name to look up in the registry */
	children: string;
}

/**
 * Inline type annotation with hover card showing the full definition.
 *
 * Usage in MDX:
 *   <TypeInfo>WizardStepItem[]</TypeInfo>
 *   <TypeInfo>PageSectionBreadcrumbItem</TypeInfo>
 */
export function TypeInfo({ children }: TypeInfoProps) {
	const typeName = children.trim();
	const entry = TYPE_REGISTRY[typeName];

	if (!entry) {
		return <code className="text-xs font-mono text-primary-solid bg-primary-muted px-1.5 py-0.5 rounded">{typeName}</code>;
	}

	return (
		<HoverCard openDelay={200} closeDelay={100}>
			<HoverCardTrigger asChild>
				<code className="text-xs font-mono text-primary-solid bg-primary-muted px-1.5 py-0.5 rounded cursor-help border-b border-dashed border-primary-solid/40">
					{typeName}
				</code>
			</HoverCardTrigger>
			<HoverCardContent
				side="top"
				align="start"
				className="w-80 p-0 overflow-hidden"
			>
				{entry.description && (
					<div className="px-3 py-2 border-b border-border-secondary">
						<p className="text-xs text-ink-light">{entry.description}</p>
					</div>
				)}
				<pre className="px-3 py-2 text-xs font-mono overflow-x-auto bg-bg text-ink">
					<code>{entry.definition}</code>
				</pre>
			</HoverCardContent>
		</HoverCard>
	);
}
