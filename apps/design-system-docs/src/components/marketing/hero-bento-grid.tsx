'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
	BoardTabsPreview,
	CardCommentPreview,
	InputCommentPreview,
	MessageCardPreview,
	ProfileCardPreview,
	ProfileDropdownMenuStaticPreview,
	ProjectCardPreview,
	ScheduledMaintenanceAlertPreview,
	StatusBadgesPreview,
	TaskCardPreview,
	ToastsPreview,
	CalendarPreview,
} from '@/components/previews/marketing-cards-previews';

/** Shared elevation for hero floating cards — matches Figma bento spacing. */
const heroFloatShadow = 'shadow-[0_10px_30px_rgba(15,23,42,0.08)]';

const floatSurface = cn('rounded-md border border-black/6 bg-white p-3', heroFloatShadow);

const nestedCardReset = 'border-0 shadow-none';

/**
 * Floating component collage for the marketing hero. lg+ only.
 *
 * Everything is positioned inside the same max-w-7xl container as the
 * headline, so the collage scales with the viewport instead of colliding
 * with it:
 *  - lg (1024–1279): one narrow right column (calendar, comment, alert, menu).
 *  - xl (1280+): a second, wider card column (project/message/profile) slots
 *    in to the left of it.
 *  - 2xl (1536+): the bottom band (task card, toasts, badges/tabs/comment)
 *    fills the space under the headline.
 */
export function HeroBentoGrid() {
	return (
		<div className="absolute inset-0 hidden overflow-hidden lg:block" aria-hidden>
			<div className="relative mx-auto h-full max-w-7xl px-4 md:px-6">
				{/* ── Right collage: up to two stacked columns ── */}
				<div className="absolute right-6 top-10 flex items-start gap-5">
					<div className="hidden w-[370px] flex-col gap-5 xl:flex">
						<ProjectCardPreview className={heroFloatShadow} />
						<MessageCardPreview className={heroFloatShadow} />
						<ProfileCardPreview className={heroFloatShadow} />
					</div>
					<div className="flex w-[329px] flex-col gap-5">
						<div className={floatSurface}>
							<CalendarPreview />
						</div>
						<InputCommentPreview />
						<ScheduledMaintenanceAlertPreview className={cn(nestedCardReset, 'rounded-none')} />
						<ProfileDropdownMenuStaticPreview className={heroFloatShadow} />
					</div>
				</div>

				{/* ── Bottom band under the headline — only where it has room ── */}
				<div className="absolute bottom-10 left-4 hidden w-[620px] flex-col gap-5 2xl:flex">
					<TaskCardPreview className={heroFloatShadow} />
					<ToastsPreview commentClassName={heroFloatShadow} />
					<div className="flex gap-5">
						<div className="flex flex-1 flex-col gap-5">
							<StatusBadgesPreview />
							<BoardTabsPreview />
						</div>
						<div className="flex-1">
							<CardCommentPreview />
						</div>
					</div>
				</div>
			</div>

			{/* ── Decorative icon strip, pinned to the viewport's left edge ── */}
			<div className="absolute -left-[80px] -top-[40px] flex flex-col items-end gap-[40px]">
				<Image src="/Icons-hero-bento.png" alt="" width={275} height={464} />
				<div className="flex gap-[2px] opacity-10">
					<div className="h-[100px] w-[120px] bg-pink-900" />
					<div className="h-[100px] w-[120px] bg-purple-600" />
					<div className="h-[100px] w-[120px] bg-yellow-600" />
				</div>
			</div>
		</div>
	);
}
