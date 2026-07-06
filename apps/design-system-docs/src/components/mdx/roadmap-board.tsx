'use client';

import * as React from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { Badge, Button, Card, CardContent, CardTitle, Text } from '@marmoui/ui';
import { VoteButton } from '@/components/mdx/roadmap-voting';

const REPO = 'https://github.com/mahmoudilyan/marmoui';

export function RoadmapAddIssueCallout() {
	const body = encodeURIComponent(`## Roadmap idea

**What should we add or fix?**


**Why does it matter?**


**Suggested column:** _(Backlog / Discovery / Target release)_

---
_Suggested from the design system docs roadmap._`);

	const href = `${REPO}/issues/new?title=${encodeURIComponent('[Roadmap] ')}&body=${body}`;

	return (
		<div className="not-prose mb-6 flex flex-col gap-3 rounded-lg border border-border-secondary bg-panel p-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<Text variant="body-sm" className="font-medium text-ink">
					Add an issue for the team
				</Text>
				<Text variant="body-xs" className="mt-1 text-ink-light">
					Open a GitHub issue to propose work or discuss priority. Maintainers can mirror it on this
					board.
				</Text>
			</div>
			<Button variant="secondary" asChild>
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex shrink-0 items-center gap-1.5"
				>
					Open GitHub issue
					<MdOpenInNew className="size-4" aria-hidden />
				</a>
			</Button>
		</div>
	);
}

export function RoadmapColumn({
	icon,
	title,
	subtitle,
	children,
}: {
	icon: React.ReactNode;
	title: string;
	subtitle: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-0 flex-col gap-3">
			<div className="flex gap-3">
				<div
					className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border-secondary bg-secondary/50 text-blue-600 dark:text-blue-400"
					aria-hidden
				>
					{icon}
				</div>
				<div className="min-w-0">
					<Text variant="heading-sm" className="text-ink mr-1">
						{title}
					</Text>
					<Text variant="body-xs" className="text-ink-light">
						{subtitle}
					</Text>
				</div>
			</div>
			<div className="flex flex-col gap-3">{children}</div>
		</div>
	);
}

type BadgeVariant = NonNullable<React.ComponentProps<typeof Badge>['variant']>;

export function RoadmapKanbanCard({
	cardId,
	title,
	status,
	statusVariant = 'normal',
	children,
}: {
	cardId: string;
	title: React.ReactNode;
	status: string;
	statusVariant?: BadgeVariant;
	children: React.ReactNode;
}) {
	return (
		<Card className="border border-border-secondary bg-background shadow-none">
			<div className="p-3 pb-2">
				<CardTitle className="text-base font-semibold leading-snug text-ink">{title}</CardTitle>
				<div className="mt-2 flex flex-wrap items-center gap-2">
					<Badge variant={statusVariant} size="sm">
						{status}
					</Badge>
					<VoteButton cardId={cardId} />
				</div>
			</div>
			<CardContent className="p-3 pt-0 [&_code]:rounded [&_code]:bg-secondary [&_code]:px-1">
				<div className="text-sm leading-relaxed text-ink-light [&_p]:mb-2 [&_p:last-child]:mb-0">
					{children}
				</div>
			</CardContent>
		</Card>
	);
}
