import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Pagination as PaginationBase,
	PaginationContent as PaginationContentBase,
	PaginationItem as PaginationItemBase,
	PaginationLink as PaginationLinkBase,
	PaginationPrevious as PaginationPreviousBase,
	PaginationNext as PaginationNextBase,
	PaginationEllipsis as PaginationEllipsisBase,
} from '@marmoui/ui';

const Pagination = PaginationBase as any;
const PaginationContent = PaginationContentBase as any;
const PaginationItem = PaginationItemBase as any;
const PaginationLink = PaginationLinkBase as any;
const PaginationPrevious = PaginationPreviousBase as any;
const PaginationNext = PaginationNextBase as any;
const PaginationEllipsis = PaginationEllipsisBase as any;

const meta = {
	title: 'Components/Pagination',
	component: Pagination,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Pagination

A navigation component for paginated content.

## Features
- **Previous/Next**: Navigation buttons
- **Page numbers**: Clickable page links
- **Ellipsis**: Condensed page ranges
- **Active state**: Current page highlight
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof PaginationBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink>1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink isActive>2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink>3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink>10</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
};

export const FirstPage: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink isActive>1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink>2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink>3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink>20</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
};
