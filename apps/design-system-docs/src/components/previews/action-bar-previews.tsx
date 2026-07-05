'use client';

import React, { useState } from 'react';
import {
	ActionBarRoot,
	ActionBarContent,
	ActionBarCloseTrigger,
	ActionBarSelectionTrigger,
	ActionBarSeparator,
	Button,
} from '@marmoui/ui';
import { MdDelete, MdEdit, MdArchive } from 'react-icons/md';

export function ActionBarPreview() {
	const [open, setOpen] = useState(false);

	return (
		<div className="relative h-24">
			<Button variant="primary" size="sm" onClick={() => setOpen(true)}>
				Show Action Bar
			</Button>
			{open && (
				<ActionBarRoot>
					<ActionBarContent onEscape={() => setOpen(false)}>
						<ActionBarCloseTrigger onClick={() => setOpen(false)} />
						<ActionBarSelectionTrigger>3 selected</ActionBarSelectionTrigger>
						<ActionBarSeparator />
						<Button variant="ghost" size="sm" leftIcon={<MdEdit />}>
							Edit
						</Button>
						<Button variant="ghost" size="sm" leftIcon={<MdArchive />}>
							Archive
						</Button>
						<Button variant="ghost-destructive" size="sm" leftIcon={<MdDelete />}>
							Delete
						</Button>
					</ActionBarContent>
				</ActionBarRoot>
			)}
		</div>
	);
}
