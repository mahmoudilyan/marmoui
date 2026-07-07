'use client';

import * as React from 'react';
import { DotsThreeOutline, DownloadSimple } from '@phosphor-icons/react';
import { Button } from '../button';
import { ButtonGroup } from '../button-group';
import { IconButton } from '../icon-button';
import { ActionBarContent, ActionBarCloseTrigger, ActionBarSeparator } from '../action-bar';

interface DataTableActionBarProps<T = any> {
	selectedCount: number;
	dataType?: string;
	onClearSelection: () => void;
	selectedRowsData?: T[];
	className?: string;
	children?: React.ReactNode;
	actions?: React.ReactNode;
	showDefaultActions?: boolean;
}

export function DataTableActionBar<T>({
	selectedCount,
	dataType = 'item',
	onClearSelection,
	selectedRowsData,
	className,
	children,
	actions,
	showDefaultActions = true,
}: DataTableActionBarProps<T>) {
	if (selectedCount === 0) {
		return null;
	}

	// Use actions prop if provided, otherwise use children, otherwise use default actions
	const actionContent = actions || children;

	return (
		<ActionBarContent onEscape={onClearSelection} className={className}>
			<ActionBarCloseTrigger onClick={onClearSelection} />

			<span className="text-sm font-medium whitespace-nowrap">
				{selectedCount} {dataType}
				{selectedCount === 1 ? '' : 's'} selected
			</span>

			<ActionBarSeparator />

			{actionContent ? (
				actionContent
			) : showDefaultActions ? (
				<ButtonGroup attached={false}>
				<Button variant="secondary" size="sm" leftIcon={<DownloadSimple />}>
					Export
				</Button>
				<IconButton variant="secondary" size="sm" icon={<DotsThreeOutline weight="fill" />} />
				</ButtonGroup>
			) : null}
		</ActionBarContent>
	);
}
