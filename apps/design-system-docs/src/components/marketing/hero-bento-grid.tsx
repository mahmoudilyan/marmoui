'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
	BoardTabsPreview,
	ColoredWidgetPreview,
	InputsPreview,
	InputCommentPreview,
	MessageCardPreview,
	ProfileCardPreview,
	ProfileDropdownMenuStaticPreview,
	ProjectCardPreview,
	ScheduledMaintenanceAlertPreview,
	SecondaryNavPreview,
	StatusBadgesPreview,
	TaskCardPreview,
	ToastsPreview,
	CalendarPreview,
	CardCommentPreview,
} from '@/components/previews/marketing-cards-previews';

/** Shared elevation for hero floating cards — matches Figma bento spacing. */
const heroFloatShadow = 'shadow-[0_10px_30px_rgba(15,23,42,0.08)]';

const floatSurface = cn('rounded-md border border-black/6 bg-white p-3', heroFloatShadow);

/** Wraps previews that already render a Card/Alert so we don't double-pad. */
const floatShell = cn('overflow-hidden rounded-md border border-black/6 bg-white', heroFloatShadow);

const nestedCardReset = 'border-0 shadow-none';

/**
 * Floating component collage for the marketing hero. lg+ only.
 *
 * Two anchored regions with uniform 20px gutters between every float:
 *  - Top-right column: narrow overlay/feedback blocks (toasts, badges, tabs,
 *    inputs, comment, alert, profile menu). Anchored from the top.
 *  - Bottom band: larger surfaces (project/message/profile cards) plus the
 *    secondary nav and colored widget. Anchored from the bottom, offset left
 *    of the right column so it never sits under it.
 */
export function HeroBentoGrid() {
	return (
		<div className="absolute inset-0 hidden overflow-visible md:block w-full" aria-hidden>
			<div className="w-6xl relative mx-auto">
				<div className="flex w-[370px] flex-col gap-5 absolute top-[102px] right-[24px]">
					<ProjectCardPreview className={heroFloatShadow} />
					<MessageCardPreview className={heroFloatShadow} />
					<ProfileCardPreview className={heroFloatShadow} />
					<ColoredWidgetPreview />
				</div>
			</div>
			<div className="max-w-3xl relative mx-auto">
				<div className="absolute top-[673px] -left-[361px] w-full">
					<div className="flex justify-between gap-8">
						<div className="flex w-[640px] flex-col gap-5">
							<TaskCardPreview className={heroFloatShadow} />
							<ToastsPreview commentClassName={heroFloatShadow} />
							<div className="flex justify-between gap-5 mt-4">
								<div className="flex-1 flex flex-col gap-5">
									<StatusBadgesPreview />
									<BoardTabsPreview />
								</div>
								<div className="flex-1">
									<CardCommentPreview />
								</div>
							</div>
						</div>
						<div className="w-[230px]">
							<SecondaryNavPreview />
						</div>
					</div>
				</div>
			</div>
			{/* ── Top-right column: narrow stacked components ── */}
			<div className="absolute right-[24px] top-[44px] flex w-[329px] flex-col gap-5">
				<div className={floatSurface}>
					<CalendarPreview />
				</div>
				<InputCommentPreview />
				<ScheduledMaintenanceAlertPreview className={cn(nestedCardReset, 'rounded-none')} />
				<ProfileDropdownMenuStaticPreview className={heroFloatShadow} />
			</div>

			{/* ── Bottom band: larger cards + nav + widget, below the headline ── */}
			<div className="absolute inset-x-0 bottom-0 right-[349px] flex items-end justify-end gap-5">
				<div className="flex w-[231px] flex-col gap-5">
					<div className={floatShell}></div>
				</div>
			</div>
			<div className="absolute -left-[80px] -top-[40px] flex flex-col gap-[40px] items-end">
				<Image src="/Icons-hero-bento.png" alt="Icons hero bento" width={275} height={464} />
				<div className="flex gap-[2px] opacity-10">
					<div className="bg-pink-900 w-[120px] h-[100px]" />
					<div className="bg-purple-600 w-[120px] h-[100px]" />
					<div className="bg-yellow-600 w-[120px] h-[100px]" />
				</div>
			</div>
		</div>
	);
}
