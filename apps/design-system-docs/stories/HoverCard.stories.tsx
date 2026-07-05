import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	HoverCard as HoverCardBase,
	HoverCardContent as HoverCardContentBase,
	HoverCardTrigger as HoverCardTriggerBase,
	Avatar as AvatarBase,
	AvatarFallback as AvatarFallbackBase,
	AvatarImage as AvatarImageBase,
} from '@marmoui/ui';
import { MdCalendarToday } from 'react-icons/md';

const HoverCard = HoverCardBase as any;
const HoverCardContent = HoverCardContentBase as any;
const HoverCardTrigger = HoverCardTriggerBase as any;
const Avatar = AvatarBase as any;
const AvatarFallback = AvatarFallbackBase as any;
const AvatarImage = AvatarImageBase as any;

const meta = {
	title: 'Components/HoverCard',
	component: HoverCard,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# HoverCard

A card that appears on hover to preview content, like user profiles or link details.

## Features
- **Hover triggered**: Shows on mouse enter
- **Rich content**: Supports any content layout
- **Accessible**: Available via focus for keyboard users
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof HoverCardBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<button className="text-sm font-medium text-primary underline cursor-pointer">@johndoe</button>
			</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<div className="flex justify-between space-x-4">
					<Avatar>
						<AvatarFallback>JD</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<h4 className="text-sm font-semibold">John Doe</h4>
						<p className="text-sm text-ink-light">Product Designer at Acme Inc.</p>
						<div className="flex items-center pt-2">
							<MdCalendarToday className="mr-2 h-4 w-4 text-ink-light" />
							<span className="text-xs text-ink-light">Joined December 2021</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	),
};
