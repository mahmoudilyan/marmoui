'use client';

import React, { useState } from 'react';
import { ButtonGroup, Button, IconButton } from '@marmoui/ui';
import {
	MdFormatBold,
	MdFormatItalic,
	MdFormatUnderlined,
	MdFormatAlignLeft,
	MdFormatAlignCenter,
	MdFormatAlignRight,
	MdViewList,
	MdViewModule,
	MdViewStream,
} from 'react-icons/md';

export function TwoButtonTogglePreview() {
	const [active, setActive] = useState<'previous' | 'next'>('previous');

	return (
		<ButtonGroup attached>
			<Button
				variant="secondary"
				data-active={active === 'previous'}
				onClick={() => setActive('previous')}
			>
				Previous
			</Button>
			<Button
				variant="secondary"
				data-active={active === 'next'}
				onClick={() => setActive('next')}
			>
				Next
			</Button>
		</ButtonGroup>
	);
}

export function ToggleSingleSelectPreview() {
	const [activeAlign, setActiveAlign] = useState('left');

	return (
		<div className="space-y-6">
			<div>
				<p className="text-sm font-medium mb-3">Text Alignment (Single Select)</p>
				<ButtonGroup attached>
					<IconButton
						variant="secondary"
						data-active={activeAlign === 'left'}
						icon={<MdFormatAlignLeft />}
						onClick={() => setActiveAlign('left')}
						aria-label="Align left"
					/>
					<IconButton
						variant="secondary"
						data-active={activeAlign === 'center'}
						icon={<MdFormatAlignCenter />}
						onClick={() => setActiveAlign('center')}
						aria-label="Align center"
					/>
					<IconButton
						variant="secondary"
						data-active={activeAlign === 'right'}
						icon={<MdFormatAlignRight />}
						onClick={() => setActiveAlign('right')}
						aria-label="Align right"
					/>
				</ButtonGroup>
			</div>
		</div>
	);
}

export function ToggleMultiSelectPreview() {
	const [formatting, setFormatting] = useState({
		bold: false,
		italic: false,
		underline: false,
	});

	return (
		<div className="space-y-6">
			<div>
				<p className="text-sm font-medium mb-3">Text Formatting (Multi Select)</p>
				<ButtonGroup attached>
					<IconButton
						variant="secondary"
						data-active={formatting.bold}
						icon={<MdFormatBold />}
						onClick={() => setFormatting((prev) => ({ ...prev, bold: !prev.bold }))}
						aria-label="Bold"
					/>
					<IconButton
						variant="secondary"
						data-active={formatting.italic}
						icon={<MdFormatItalic />}
						onClick={() => setFormatting((prev) => ({ ...prev, italic: !prev.italic }))}
						aria-label="Italic"
					/>
					<IconButton
						variant="secondary"
						data-active={formatting.underline}
						icon={<MdFormatUnderlined />}
						onClick={() => setFormatting((prev) => ({ ...prev, underline: !prev.underline }))}
						aria-label="Underline"
					/>
				</ButtonGroup>
			</div>
		</div>
	);
}

export function ToggleCombinedPreview() {
	const [activeAlign, setActiveAlign] = useState('left');
	const [formatting, setFormatting] = useState({
		bold: false,
		italic: false,
		underline: false,
	});

	return (
		<div className="space-y-6">
			<div>
				<p className="text-sm font-medium mb-3">Text Alignment (Single Select)</p>
				<ButtonGroup attached>
					<IconButton
						variant="secondary"
						data-active={activeAlign === 'left'}
						icon={<MdFormatAlignLeft />}
						onClick={() => setActiveAlign('left')}
						aria-label="Align left"
					/>
					<IconButton
						variant="secondary"
						data-active={activeAlign === 'center'}
						icon={<MdFormatAlignCenter />}
						onClick={() => setActiveAlign('center')}
						aria-label="Align center"
					/>
					<IconButton
						variant="secondary"
						data-active={activeAlign === 'right'}
						icon={<MdFormatAlignRight />}
						onClick={() => setActiveAlign('right')}
						aria-label="Align right"
					/>
				</ButtonGroup>
			</div>

			<div>
				<p className="text-sm font-medium mb-3">Text Formatting (Multi Select)</p>
				<ButtonGroup attached>
					<IconButton
						variant="secondary"
						data-active={formatting.bold}
						icon={<MdFormatBold />}
						onClick={() => setFormatting((prev) => ({ ...prev, bold: !prev.bold }))}
						aria-label="Bold"
					/>
					<IconButton
						variant="secondary"
						data-active={formatting.italic}
						icon={<MdFormatItalic />}
						onClick={() => setFormatting((prev) => ({ ...prev, italic: !prev.italic }))}
						aria-label="Italic"
					/>
					<IconButton
						variant="secondary"
						data-active={formatting.underline}
						icon={<MdFormatUnderlined />}
						onClick={() => setFormatting((prev) => ({ ...prev, underline: !prev.underline }))}
						aria-label="Underline"
					/>
				</ButtonGroup>
			</div>
		</div>
	);
}

export function ViewSwitcherPreview() {
	const [activeView, setActiveView] = useState('list');

	return (
		<ButtonGroup attached>
			<IconButton
				variant="secondary"
				data-active={activeView === 'list'}
				icon={<MdViewList />}
				onClick={() => setActiveView('list')}
				aria-label="List view"
			/>
			<IconButton
				variant="secondary"
				data-active={activeView === 'grid'}
				icon={<MdViewModule />}
				onClick={() => setActiveView('grid')}
				aria-label="Grid view"
			/>
			<IconButton
				variant="secondary"
				data-active={activeView === 'stream'}
				icon={<MdViewStream />}
				onClick={() => setActiveView('stream')}
				aria-label="Stream view"
			/>
		</ButtonGroup>
	);
}
