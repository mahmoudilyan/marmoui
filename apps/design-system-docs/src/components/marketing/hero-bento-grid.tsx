'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
	InputCommentPreview,
	MessageCardPreview,
	ProfileCardPreview,
	ProfileDropdownMenuStaticPreview,
	ProjectCardPreview,
	ScheduledMaintenanceAlertPreview,
	CalendarPreview,
} from '@/components/previews/marketing-cards-previews';

/** Shared elevation for hero floating cards — matches Figma bento spacing. */
const heroFloatShadow = 'shadow-[0_10px_30px_rgba(15,23,42,0.08)]';

const floatSurface = cn('rounded-md border border-black/6 bg-white p-3', heroFloatShadow);

const nestedCardReset = 'border-0 shadow-none';

/**
 * Floating component collage for the marketing hero. lg+ only.
 *
 * The collage is pinned to the viewport's right edge (matching the Figma /
 * Framer hero), never the content container:
 *  - lg (1024–1279): one narrow column (calendar, comment, alert, menu).
 *  - xl (1280+): a second, wider card column (project/message/profile) slots
 *    in to the left of it.
 */
export function HeroBentoGrid() {
	return (
		<div className="absolute inset-0 hidden overflow-hidden lg:block" aria-hidden>
			{/* Glare — Figma: 1000×1000 at x:1654 y:0 (1920 canvas), 40% opacity */}
			<div
				className="pointer-events-none absolute -right-[266px] top-0 size-[1000px] opacity-40"
				style={{
					background:
						'radial-gradient(closest-side, rgba(133,105,206,0.5) 0%, rgba(255,158,196,0.25) 45%, transparent 72%)',
				}}
			/>

			{/* ── Right collage, pinned to the viewport edge ── */}
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
