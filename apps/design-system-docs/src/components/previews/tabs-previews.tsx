'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@marmoui/ui';

function PreviewPanel({ children }: { children: ReactNode }) {
	return <div className="">{children}</div>;
}

export function TabsLinePreview() {
	return (
		<Tabs defaultValue="overview">
			<TabsList variant="line">
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics">Analytics</TabsTrigger>
				<TabsTrigger value="settings">Settings</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<PreviewPanel>Overview content here.</PreviewPanel>
			</TabsContent>
			<TabsContent value="analytics">
				<PreviewPanel>Analytics content here.</PreviewPanel>
			</TabsContent>
			<TabsContent value="settings">
				<PreviewPanel>Settings content here.</PreviewPanel>
			</TabsContent>
		</Tabs>
	);
}

export function TabsPillPreview() {
	return (
		<Tabs defaultValue="30d" variant="pill">
			<TabsList>
				<TabsTrigger value="7d">7 days</TabsTrigger>
				<TabsTrigger value="30d">30 days</TabsTrigger>
				<TabsTrigger value="90d">90 days</TabsTrigger>
			</TabsList>
			<TabsContent value="7d">Last 7 days</TabsContent>
			<TabsContent value="30d">Last 30 days</TabsContent>
			<TabsContent value="90d">Last 90 days</TabsContent>
		</Tabs>
	);
}

export function TabsVerticalLinePreview() {
	return (
		<Tabs defaultValue="profile" orientation="vertical">
			<TabsList variant="line">
				<TabsTrigger value="profile">Profile</TabsTrigger>
				<TabsTrigger value="billing">Billing</TabsTrigger>
				<TabsTrigger value="notifications">Notifications</TabsTrigger>
			</TabsList>
			<TabsContent value="profile">
				<PreviewPanel>Profile settings</PreviewPanel>
			</TabsContent>
			<TabsContent value="billing">
				<PreviewPanel>Billing settings</PreviewPanel>
			</TabsContent>
			<TabsContent value="notifications">
				<PreviewPanel>Notification settings</PreviewPanel>
			</TabsContent>
		</Tabs>
	);
}

export function TabsVerticalPillPreview() {
	return (
		<Tabs defaultValue="active" variant="pill" orientation="vertical">
			<TabsList>
				<TabsTrigger value="active">Active</TabsTrigger>
				<TabsTrigger value="paused">Paused</TabsTrigger>
				<TabsTrigger value="archived">Archived</TabsTrigger>
			</TabsList>
			<TabsContent value="active">
				<PreviewPanel>Active items</PreviewPanel>
			</TabsContent>
			<TabsContent value="paused">
				<PreviewPanel>Paused items</PreviewPanel>
			</TabsContent>
			<TabsContent value="archived">
				<PreviewPanel>Archived items</PreviewPanel>
			</TabsContent>
		</Tabs>
	);
}

export function TabsControlledPreview() {
	const [tab, setTab] = useState('overview');

	return (
		<Tabs value={tab} onValueChange={setTab}>
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics">Analytics</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<PreviewPanel>Overview content</PreviewPanel>
			</TabsContent>
			<TabsContent value="analytics">
				<PreviewPanel>Analytics content</PreviewPanel>
			</TabsContent>
		</Tabs>
	);
}
