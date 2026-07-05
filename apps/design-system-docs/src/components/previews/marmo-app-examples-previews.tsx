'use client';

import { useState } from 'react';
import {
	Avatar,
	AvatarFallback,
	Badge,
	Box,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	IconButton,
	PageSection,
	Panel,
	SidebarItem,
	SidebarPanel,
	SidebarPanelContent,
	SidebarPanelFooter,
	SidebarPanelHeader,
	SidebarPanelTitle,
	SidebarProvider,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Textarea,
} from '@marmoui/ui';
import {
	MdAdd,
	MdChat,
	MdGridView,
	MdOutlineChat,
	MdOutlineFolder,
	MdOutlineForum,
	MdOutlineGridView,
	MdOutlinePeople,
	MdOutlineSearch,
	MdOutlineSettings,
	MdPeople,
	MdSearch,
	MdSend,
	MdSettings,
} from 'react-icons/md';

const projects = [
	{ id: '1', name: 'Marketing site refresh', status: 'Active', updated: '2 hours ago', members: 4 },
	{ id: '2', name: 'Mobile onboarding', status: 'In review', updated: 'Yesterday', members: 3 },
	{ id: '3', name: 'Analytics dashboard', status: 'Active', updated: '3 days ago', members: 6 },
	{ id: '4', name: 'Billing migration', status: 'Paused', updated: '1 week ago', members: 2 },
	{ id: '5', name: 'Design system v2', status: 'Active', updated: '4 days ago', members: 5 },
	{ id: '6', name: 'Partner portal', status: 'Draft', updated: '2 weeks ago', members: 2 },
];

const channels = [
	{ id: 'general', name: 'general', unread: 0, preview: 'Shipped the new token palette.' },
	{ id: 'design', name: 'design', unread: 2, preview: 'Updated Projects screen in Figma.' },
	{ id: 'engineering', name: 'engineering', unread: 0, preview: 'PR ready for review.' },
	{ id: 'random', name: 'random', unread: 0, preview: 'Coffee run at 3?' },
];

const messages = [
	{ id: '1', author: 'Alex Kim', time: '10:24 AM', body: 'The new indigo primary looks great in the app shell.' },
	{ id: '2', author: 'Sam Rivera', time: '10:26 AM', body: 'Agreed — Projects and Chat examples are up in docs now.' },
	{ id: '3', author: 'Alex Kim', time: '10:28 AM', body: 'Let’s sync on dark mode tokens after standup.' },
];

function ProjectsSidebar() {
	return (
		<SidebarPanel>
			<SidebarPanelHeader>
				<SidebarPanelTitle>Marmo</SidebarPanelTitle>
			</SidebarPanelHeader>
			<SidebarPanelContent>
				<SidebarItem label="Projects" iconOutlined={MdOutlineGridView} iconFilled={MdGridView} isActive />
				<SidebarItem label="Team" iconOutlined={MdOutlinePeople} iconFilled={MdPeople} />
				<SidebarItem label="Settings" iconOutlined={MdOutlineSettings} iconFilled={MdSettings} />
			</SidebarPanelContent>
			<SidebarPanelFooter className="flex flex-row">
				<IconButton variant="ghost-body" aria-label="Search" icon={<MdOutlineSearch />} />
			</SidebarPanelFooter>
		</SidebarPanel>
	);
}

export function PatternProjectsDashboardPreview() {
	const [tab, setTab] = useState('all');

	return (
		<div className="h-[620px] w-full overflow-hidden rounded-xl border border-border-secondary bg-panel shadow-sm">
			<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: true }}>
				<Box className="relative flex h-full overflow-hidden">
					<ProjectsSidebar />
					<Panel className="flex flex-1 flex-col overflow-hidden bg-bg">
						<PageSection
							breadcrumbs={[{ label: 'Projects' }]}
							primaryAction={{ label: 'New project', onClick: () => {} }}
						/>
						<div className="flex flex-1 flex-col gap-space-md overflow-y-auto px-space-2xl pb-space-2xl pt-space-md">
							<Tabs value={tab} onValueChange={setTab}>
								<TabsList>
									<TabsTrigger value="all">All</TabsTrigger>
									<TabsTrigger value="recent">Recent</TabsTrigger>
									<TabsTrigger value="archived">Archived</TabsTrigger>
								</TabsList>
								<TabsContent value={tab} className="mt-space-md">
									<div className="grid gap-space-md sm:grid-cols-2 xl:grid-cols-3">
										{projects.map(project => (
											<Card key={project.id} className="cursor-pointer transition-shadow hover:shadow-card">
												<CardHeader className="pb-space-xs">
													<div className="flex items-start justify-between gap-space-sm">
														<CardTitle className="text-heading-sm">{project.name}</CardTitle>
														<Badge variant="normal">{project.status}</Badge>
													</div>
													<CardDescription>Updated {project.updated}</CardDescription>
												</CardHeader>
												<CardContent className="flex items-center justify-between pt-0">
													<span className="text-body-sm text-ink-muted">{project.members} members</span>
													<IconButton
														variant="ghost-body"
														size="sm"
														aria-label={`Open ${project.name}`}
														icon={<MdOutlineFolder />}
													/>
												</CardContent>
											</Card>
										))}
									</div>
								</TabsContent>
							</Tabs>
						</div>
					</Panel>
				</Box>
			</SidebarProvider>
		</div>
	);
}

export function PatternChatMessengerPreview() {
	const [activeChannel, setActiveChannel] = useState('design');

	return (
		<div className="h-[620px] w-full overflow-hidden rounded-xl border border-border-secondary bg-panel shadow-sm">
			<Box className="flex h-full overflow-hidden">
				{/* Collapsed primary nav — 64px icon rail */}
				<aside className="flex w-16 shrink-0 flex-col items-center gap-space-xs border-r border-border-secondary bg-panel py-space-md">
					<IconButton variant="ghost-body" aria-label="Projects" icon={<MdOutlineGridView />} />
					<IconButton variant="primary" aria-label="Chat" icon={<MdChat />} />
					<IconButton variant="ghost-body" aria-label="Files" icon={<MdOutlineFolder />} />
					<div className="mt-auto flex flex-col gap-space-xs">
						<IconButton variant="ghost-body" aria-label="Settings" icon={<MdOutlineSettings />} />
					</div>
				</aside>

				{/* Channel list */}
				<aside className="flex w-64 shrink-0 flex-col border-r border-border-secondary bg-panel">
					<div className="flex items-center justify-between border-b border-border-secondary px-space-md py-space-sm">
						<h2 className="text-heading-sm font-semibold text-ink-dark">Channels</h2>
						<IconButton variant="ghost-body" size="sm" aria-label="New channel" icon={<MdAdd />} />
					</div>
					<div className="flex-1 overflow-y-auto p-space-xs">
						{channels.map(channel => (
							<button
								key={channel.id}
								type="button"
								onClick={() => setActiveChannel(channel.id)}
								className={`mb-space-2xs w-full rounded-radius-sm px-space-sm py-space-sm text-left transition-colors ${
									activeChannel === channel.id
										? 'bg-primary-muted text-ink-dark'
										: 'text-ink hover:bg-secondary'
								}`}
							>
								<div className="flex items-center justify-between gap-space-xs">
									<span className="text-body-sm font-medium">#{channel.name}</span>
									{channel.unread > 0 ? (
										<Badge variant="info" className="min-w-5 justify-center px-1">
											{channel.unread}
										</Badge>
									) : null}
								</div>
								<p className="mt-space-2xs truncate text-body-xs text-ink-muted">{channel.preview}</p>
							</button>
						))}
					</div>
				</aside>

				{/* Thread */}
				<Panel className="flex flex-1 flex-col overflow-hidden bg-bg">
					<div className="flex items-center gap-space-sm border-b border-border-secondary px-space-lg py-space-md">
						<MdOutlineForum className="size-5 text-icon" />
						<div>
							<p className="text-heading-sm font-semibold text-ink-dark">#{activeChannel}</p>
							<p className="text-body-xs text-ink-muted">12 members · Active now</p>
						</div>
						<div className="ml-auto flex items-center gap-space-xs">
							<IconButton variant="ghost-body" aria-label="Search messages" icon={<MdSearch />} />
						</div>
					</div>

					<div className="flex flex-1 flex-col gap-space-md overflow-y-auto px-space-lg py-space-lg">
						{messages.map(message => (
							<div key={message.id} className="flex gap-space-sm">
								<Avatar size="sm">
									<AvatarFallback>{message.author.slice(0, 2).toUpperCase()}</AvatarFallback>
								</Avatar>
								<div>
									<div className="flex items-baseline gap-space-xs">
										<span className="text-body-sm font-semibold text-ink-dark">{message.author}</span>
										<span className="text-body-xs text-ink-muted">{message.time}</span>
									</div>
									<p className="mt-space-2xs text-body-sm text-ink">{message.body}</p>
								</div>
							</div>
						))}
					</div>

					<div className="border-t border-border-secondary bg-panel p-space-md">
						<div className="flex items-end gap-space-sm">
							<Textarea placeholder={`Message #${activeChannel}`} className="min-h-10 flex-1 resize-none" rows={2} />
							<IconButton variant="primary" aria-label="Send message" icon={<MdSend />} />
						</div>
					</div>
				</Panel>
			</Box>
		</div>
	);
}
