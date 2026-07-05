import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	Button,
	Badge,
	Avatar,
	AvatarFallback,
	AvatarImage,
	IconButton,
} from '@marmoui/ui';
import { MdMoreVert, MdFavorite, MdShare, MdArrowForward } from 'react-icons/md';

const meta = {
	title: 'Components/Card',
	component: Card,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Card

A flexible container component for grouping related content and actions. Built with semantic HTML and consistent spacing.

## Features

- **Semantic structure**: Header, content, and footer sections
- **Flexible composition**: Mix and match card parts as needed
- **Consistent spacing**: Pre-defined padding and margins
- **Shadow elevation**: Subtle shadow for depth
- **Rounded corners**: Modern, friendly appearance
- **Responsive**: Works well on all screen sizes

## Usage

\`\`\`tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@marmoui/ui';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
\`\`\`

## Composition

Cards are built using composition - you can use any combination of card parts:
- **CardHeader**: Title and description area
- **CardContent**: Main content area
- **CardFooter**: Action buttons or metadata
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;
