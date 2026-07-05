'use client';

import React, { useRef, useCallback } from 'react';
import { Button } from '../../button';
import { Badge } from '../../badge';
import { cn } from '../../../lib/utils';

// Platform character limits
const PLATFORM_LIMITS = {
	twitter: 280,
	x: 280,
	instagram: 2200,
	youtube: 5000,
	facebook: 63206,
	googlebusiness: 1500,
	linkedin: 3000,
} as const;

const formatChannelName = (channel: string): string => {
	const formatted: Record<string, string> = {
		twitter: 'X',
		x: 'X',
		instagram: 'Instagram',
		youtube: 'YouTube',
		facebook: 'Facebook',
		googlebusiness: 'Google Business',
		linkedin: 'LinkedIn',
	};
	return formatted[channel.toLowerCase()] || channel;
};

interface MessageComposerProps {
	message: string;
	onMessageChange: (message: string) => void;
	characterLimit?: number;
	placeholder?: string;
	selectedChannels?: string[];
	onOpenMediaPicker?: () => void;
	className?: string;
}

export default function MessageComposer({
	message,
	onMessageChange,
	characterLimit,
	placeholder = 'Write your message here...',
	selectedChannels = [],
	onOpenMediaPicker,
	className,
}: MessageComposerProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Calculate the minimum character limit based on selected channels
	const getMinCharacterLimit = useCallback(() => {
		if (characterLimit !== undefined) return characterLimit;
		if (selectedChannels.length === 0) return 280;

		const limits = selectedChannels
			.map(channel => PLATFORM_LIMITS[channel.toLowerCase() as keyof typeof PLATFORM_LIMITS])
			.filter(limit => limit !== undefined);

		return limits.length > 0 ? Math.min(...limits) : 280;
	}, [selectedChannels, characterLimit]);

	const minCharacterLimit = getMinCharacterLimit();
	const characterCount = message.length;
	const isOverLimit = characterCount > minCharacterLimit;

	// Get platform-specific character counts
	const getPlatformCounts = useCallback(() => {
		if (selectedChannels.length === 0) return [];

		const uniqueChannels = [...new Set(selectedChannels)];

		return uniqueChannels
			.map(channel => {
				const limit = PLATFORM_LIMITS[channel.toLowerCase() as keyof typeof PLATFORM_LIMITS];
				if (!limit) return null;

				return {
					channel,
					limit,
					count: characterCount,
					isOver: characterCount > limit,
				};
			})
			.filter(Boolean);
	}, [selectedChannels, characterCount]);

	return (
		<div className={cn('flex flex-col gap-4', className)}>
			<div className="relative">
				<div
					className={cn(
						'border rounded-md overflow-hidden bg-white',
						isOverLimit
							? 'border-red-300 focus-within:border-red-500'
							: 'border-gray-300 focus-within:border-blue-500'
					)}
				>
					<div className="relative">
						<textarea
							ref={textareaRef}
							placeholder={placeholder}
							value={message}
							onChange={e => {
								onMessageChange(e.target.value);
								// Auto-expand textarea
								if (textareaRef.current) {
									textareaRef.current.style.height = 'auto';
									textareaRef.current.style.height = `${Math.max(150, textareaRef.current.scrollHeight)}px`;
								}
							}}
							className="w-full min-h-[150px] resize-none text-sm border-none outline-none p-3 pb-12"
							onKeyDown={e => {
								if (e.key === 'Enter' && !e.shiftKey) {
									setTimeout(() => {
										if (textareaRef.current) {
											textareaRef.current.style.height = 'auto';
											textareaRef.current.style.height = `${Math.max(150, textareaRef.current.scrollHeight)}px`;
										}
									}, 0);
								}
							}}
						/>

						{/* Media upload area */}
						<div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
							<svg
								className="w-5 h-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
					</div>

					{/* Bottom toolbar */}
					<div className="absolute bottom-0 left-0 right-0 px-1 py-1 border-t border-gray-200 flex justify-between items-center h-10">
						<div className="flex items-center gap-1">
							<Button variant="ghost" size="sm" onClick={onOpenMediaPicker}>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
									/>
								</svg>
							</Button>
						</div>

						<div className="flex gap-1">
							{getPlatformCounts().map((platform, index) => (
								<Badge
									key={index}
									variant={platform?.isOver ? 'destructive' : 'normal'}
									className="text-xs"
								>
									{formatChannelName(platform?.channel || '')}: 3
								</Badge>
							))}
						</div>
					</div>
				</div>
			</div>

			{isOverLimit && (
				<div className="bg-red-50 p-3 rounded-md border border-red-200">
					<p className="text-sm text-red-600">
						{selectedChannels.length > 0 ? (
							<>
								Your message exceeds the character limit for:{' '}
								{getPlatformCounts()
									.filter(p => p?.isOver)
									.map(p => `${formatChannelName(p?.channel || '')} (${p?.limit})`)
									.join(', ')}
								. Please shorten it to continue.
							</>
						) : (
							'Your message exceeds the character limit. Please shorten it to continue.'
						)}
					</p>
				</div>
			)}
		</div>
	);
}
