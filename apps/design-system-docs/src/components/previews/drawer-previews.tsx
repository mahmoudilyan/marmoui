'use client';

import React from 'react';
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
	DrawerClose,
	Button,
	Input,
} from '@marmoui/ui';

/** Right drawer (default) */
export function DrawerRightPreview() {
	return (
		<Drawer direction="right">
			<DrawerTrigger asChild>
				<Button variant="secondary">Open Drawer</Button>
			</DrawerTrigger>
			<DrawerContent className="fixed inset-y-0 right-0 w-[400px] rounded-l-lg rounded-t-none">
				<DrawerHeader>
					<DrawerTitle>Filter Results</DrawerTitle>
					<DrawerDescription>Adjust your search filters below.</DrawerDescription>
				</DrawerHeader>
				<div className="p-4 flex-1 overflow-auto">
					<p>Drawer body content goes here.</p>
				</div>
				<DrawerFooter>
					<Button>Apply Filters</Button>
					<DrawerClose asChild>
						<Button variant="secondary">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

/** Left drawer */
export function DrawerLeftPreview() {
	return (
		<Drawer direction="left">
			<DrawerTrigger asChild>
				<Button variant="secondary">Open Left Drawer</Button>
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
	);
}

/** Drawer with form */
export function DrawerFormPreview() {
	return (
		<Drawer direction="right">
			<DrawerTrigger asChild>
				<Button variant="primary">Edit Profile</Button>
			</DrawerTrigger>
			<DrawerContent className="fixed inset-y-0 right-0 w-[400px] rounded-l-lg rounded-t-none">
				<DrawerHeader>
					<DrawerTitle>Edit Profile</DrawerTitle>
					<DrawerDescription>Make changes to your profile here.</DrawerDescription>
				</DrawerHeader>
				<div className="p-4 flex-1 overflow-auto space-y-4">
					<div className="space-y-2">
						<label htmlFor="drawer-name" className="text-sm font-medium">Name</label>
						<Input id="drawer-name" placeholder="Enter your name" />
					</div>
					<div className="space-y-2">
						<label htmlFor="drawer-email" className="text-sm font-medium">Email</label>
						<Input id="drawer-email" type="email" placeholder="Enter your email" />
					</div>
				</div>
				<DrawerFooter>
					<Button>Save Changes</Button>
					<DrawerClose asChild>
						<Button variant="secondary">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
