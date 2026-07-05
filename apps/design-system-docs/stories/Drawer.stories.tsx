import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Drawer as DrawerBase,
	DrawerContent as DrawerContentBase,
	DrawerDescription as DrawerDescriptionBase,
	DrawerFooter as DrawerFooterBase,
	DrawerHeader as DrawerHeaderBase,
	DrawerTitle as DrawerTitleBase,
	DrawerTrigger as DrawerTriggerBase,
	Button as ButtonBase,
	Input as InputBase,
	Label as LabelBase,
} from '@marmoui/ui';

const Drawer = DrawerBase as any;
const DrawerContent = DrawerContentBase as any;
const DrawerDescription = DrawerDescriptionBase as any;
const DrawerFooter = DrawerFooterBase as any;
const DrawerHeader = DrawerHeaderBase as any;
const DrawerTitle = DrawerTitleBase as any;
const DrawerTrigger = DrawerTriggerBase as any;
const Button = ButtonBase as any;
const Input = InputBase as any;
const Label = LabelBase as any;

const meta = {
	title: 'Components/Drawer',
	component: Drawer,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Drawer

A sliding panel that opens from the edge of the screen, built on Vaul.

## Features
- **Direction**: Opens from right (default), left, top, or bottom
- **Accessible**: Focus trapping and keyboard navigation
- **Smooth animations**: Spring-based transitions
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DrawerBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Drawer direction="right">
			<DrawerTrigger asChild>
				<Button variant="outline">Open Drawer</Button>
			</DrawerTrigger>
			<DrawerContent className="fixed inset-y-0 right-0 w-[400px] rounded-l-lg rounded-t-none">
				<DrawerHeader>
					<DrawerTitle>Edit Profile</DrawerTitle>
					<DrawerDescription>Make changes to your profile here.</DrawerDescription>
				</DrawerHeader>
				<div className="p-4 space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input id="name" placeholder="Enter your name" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" placeholder="Enter your email" />
					</div>
				</div>
				<DrawerFooter>
					<Button>Save changes</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	),
};

export const LeftSide: Story = {
	render: () => (
		<Drawer direction="left">
			<DrawerTrigger asChild>
				<Button variant="outline">Open Left Drawer</Button>
			</DrawerTrigger>
			<DrawerContent className="fixed inset-y-0 left-0 w-[400px] rounded-r-lg rounded-t-none">
				<DrawerHeader>
					<DrawerTitle>Navigation</DrawerTitle>
					<DrawerDescription>Browse sections</DrawerDescription>
				</DrawerHeader>
				<div className="p-4">
					<nav className="space-y-2">
						<a className="block p-2 rounded hover:bg-muted" href="#">Dashboard</a>
						<a className="block p-2 rounded hover:bg-muted" href="#">Contacts</a>
						<a className="block p-2 rounded hover:bg-muted" href="#">Campaigns</a>
						<a className="block p-2 rounded hover:bg-muted" href="#">Settings</a>
					</nav>
				</div>
			</DrawerContent>
		</Drawer>
	),
};
