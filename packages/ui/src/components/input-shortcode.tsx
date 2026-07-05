'use client';

import * as React from 'react';
import { Code, MagnifyingGlass, ArrowLeft, Smiley } from '@phosphor-icons/react';
import EmojiPicker, { type Theme, type EmojiClickData } from 'emoji-picker-react';
import { cn } from '../lib/utils';
import { Input, type InputProps } from './input';
import { Button } from './button';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group';
import { IconButton } from './icon-button';
import { ButtonGroup } from './button-group';
import { Spinner } from './spinner';

// Types
interface ShortcodeItem {
	text: string;
	icon?: string;
	value: string;
}

interface ShortcodeGroup {
	id: string;
	section: string;
	text: string;
	listid?: string;
	class?: string;
	style?: string;
	menu: ShortcodeItem[];
}

export interface InputShortcodeProps extends Omit<InputProps, 'value' | 'onChange'> {
	value: string;
	onChange: (value: string) => void;
	shortcodes?: ShortcodeGroup[];
	shortcodesApi?: any; // API endpoint for dynamic shortcodes
	shortcodesParams?: any; // Params for the API call
	onLoadShortcodes?: () => Promise<ShortcodeGroup[]>;
	// Emoji picker props
	enableEmoji?: boolean;
	emojiPickerTheme?: Theme;
	onEmojiClick?: (emoji: string) => void;
}

export const InputShortcode = React.forwardRef<HTMLInputElement, InputShortcodeProps>(
	(
		{
			value,
			onChange,
			shortcodes = [],
			shortcodesApi,
			shortcodesParams,
			onLoadShortcodes,
			enableEmoji = false,
			emojiPickerTheme,
			onEmojiClick,
			className,
			...inputProps
		},
		ref
	) => {
		// State
		const [selectedList, setSelectedList] = React.useState<string | null>(null);
		const [listSearch, setListSearch] = React.useState('');
		const [showingShortcodes, setShowingShortcodes] = React.useState(false);
		const [selectedGroupName, setSelectedGroupName] = React.useState('');
		const [isShortcodePopoverOpen, setIsShortcodePopoverOpen] = React.useState(false);
		const [isEmojiPickerOpen, setIsEmojiPickerOpen] = React.useState(false);
		const [loadedShortcodes, setLoadedShortcodes] = React.useState<ShortcodeGroup[]>(shortcodes);
		const [isLoadingShortcodes, setIsLoadingShortcodes] = React.useState(false);
		const [cursorPosition, setCursorPosition] = React.useState<number | null>(null);

		const inputRef = React.useRef<HTMLInputElement>(null);

		// Merge refs
		const mergeRefs = React.useCallback(
			(node: HTMLInputElement | null) => {
				inputRef.current = node;
				if (typeof ref === 'function') {
					ref(node);
				} else if (ref) {
					ref.current = node;
				}
			},
			[ref]
		);

		// Track cursor position
		const handleCursorPositionChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
			if (e.currentTarget) {
				const pos = e.currentTarget.selectionStart;
				if (pos !== cursorPosition) {
					setCursorPosition(pos);
				}
			}
		};

		// Load shortcodes when popover opens
		React.useEffect(() => {
			if (
				isShortcodePopoverOpen &&
				onLoadShortcodes &&
				loadedShortcodes.length === 0 &&
				!isLoadingShortcodes
			) {
				setIsLoadingShortcodes(true);
				onLoadShortcodes()
					.then(data => {
						setLoadedShortcodes(data);
					})
					.catch(console.error)
					.finally(() => {
						setIsLoadingShortcodes(false);
					});
			}
		}, [isShortcodePopoverOpen, onLoadShortcodes, loadedShortcodes.length, isLoadingShortcodes]);

		// Update loaded shortcodes when prop changes
		React.useEffect(() => {
			if (shortcodes.length > 0) {
				setLoadedShortcodes(shortcodes);
			}
		}, [shortcodes]);

		// Insert text at cursor position
		const insertAtCursor = (textToInsert: string) => {
			const input = inputRef.current;
			if (!input) {
				onChange(value + textToInsert);
				return;
			}

			const start = input.selectionStart ?? value.length;
			const end = input.selectionEnd ?? value.length;
			const newValue = value.slice(0, start) + textToInsert + value.slice(end);
			onChange(newValue);

			// Set cursor position after inserted text
			const newPosition = start + textToInsert.length;
			setCursorPosition(newPosition);

			setTimeout(() => {
				input.focus();
				input.setSelectionRange(newPosition, newPosition);
			}, 0);
		};

		// Handlers
		const handleShortcodeClick = (shortcodeValue: string) => {
			insertAtCursor(shortcodeValue);
			setIsShortcodePopoverOpen(false);
			setShowingShortcodes(false);
			setSelectedList(null);
		};

		const handleEmojiClick = (emojiData: EmojiClickData) => {
			const emoji = emojiData.emoji;

			if (onEmojiClick) {
				onEmojiClick(emoji);
			} else {
				insertAtCursor(emoji);
			}

			setIsEmojiPickerOpen(false);
		};

		const handleSelectList = (listId: string, listName: string) => {
			setSelectedList(listId);
			setSelectedGroupName(listName);
			setShowingShortcodes(true);
		};

		const handleBackToLists = () => {
			setShowingShortcodes(false);
			setSelectedList(null);
		};

		// Filtered data
		const filteredLists = React.useMemo(() => {
			if (!listSearch) return loadedShortcodes;
			return loadedShortcodes.filter(group =>
				group.text.toLowerCase().includes(listSearch.toLowerCase())
			);
		}, [loadedShortcodes, listSearch]);

		const filteredShortcodes = React.useMemo(() => {
			if (!selectedList) return [];
			const selectedGroup = loadedShortcodes.find(group => group.id === selectedList);
			if (!selectedGroup || selectedGroup.menu.length === 0) return [];
			return [selectedGroup];
		}, [loadedShortcodes, selectedList]);

		// Render list selection
		const renderListSelection = () => (
			<div className="w-80">
				<div className="py-1 bg-panel border-b border-border sticky top-0 z-10">
					<InputGroup className="border-0 focus-visible:ring-0 focus-visible:border-0 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:box-shadow-none">
						<InputGroupAddon>
							<MagnifyingGlass size={16} />
						</InputGroupAddon>
						<InputGroupInput
							size="sm"
							placeholder="Search lists..."
							value={listSearch}
							onChange={e => setListSearch(e.target.value)}
							onClick={e => e.stopPropagation()}
							onKeyDown={e => e.stopPropagation()}
						/>
					</InputGroup>
				</div>

				<div className="flex flex-col px-2 py-1">
					{filteredLists.map(group => (
						<Button
							key={group.id}
							size="sm"
							variant="ghost"
							className="justify-start py-2 h-auto"
							onClick={() => handleSelectList(group.id, group.text)}
						>
							{group.text}
						</Button>
					))}
				</div>

				{filteredLists.length === 0 && (
					<p className="text-sm text-ink-light text-center py-4">No lists found</p>
				)}
			</div>
		);

		// Render shortcode selection
		const renderShortcodeSelection = () => (
			<div className="w-80">
				<div className="flex items-center gap-2 p-2 border-b border-border sticky top-0 z-10 bg-panel">
					<Button size="xs" variant="ghost" onClick={handleBackToLists}>
						<ArrowLeft />
					</Button>
					<span className="font-semibold text-sm">{selectedGroupName}</span>
				</div>

				<div className="max-h-96 px-2 py-1">
					{filteredShortcodes.map(group => (
						<div key={group.id} className="flex flex-col">
							{group.menu.map((item, index) => (
								<Button
									key={`${group.id}-${index}`}
									size="sm"
									variant="ghost"
									className="justify-start py-2 h-auto"
									onClick={() => handleShortcodeClick(item.value)}
								>
									{item.text}
								</Button>
							))}
						</div>
					))}
				</div>

				{filteredShortcodes.length === 0 && (
					<p className="text-sm text-muted-foreground text-center py-4">No shortcodes found</p>
				)}
			</div>
		);

		const hasShortcodes = loadedShortcodes.length > 0 || shortcodesApi || onLoadShortcodes;
		const hasActions = hasShortcodes || enableEmoji;

		// Filter out null from size prop to match InputGroupInput's type requirements
		const { size, ...restInputProps } = inputProps;
		const inputGroupSize = size === null ? undefined : size;

		return (
			<InputGroup className={cn('relative w-full', className)}>
				<InputGroupInput
					ref={mergeRefs}
					value={value}
					onChange={e => onChange(e.target.value)}
					onSelect={handleCursorPositionChange}
					onClick={handleCursorPositionChange}
					onKeyUp={handleCursorPositionChange}
					size={inputGroupSize}
					{...restInputProps}
				/>
				<InputGroupAddon align="inline-end">
					{hasActions && (
						<ButtonGroup attached={false} size="xs">
							{enableEmoji && (
								<Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
									<PopoverTrigger asChild>
										<IconButton
											type="button"
											variant="ghost"
											size="xs"
											//className="h-7 w-7 p-0"
											disabled={inputProps.disabled || inputProps.readOnly}
											icon={<Smiley />}
										/>
									</PopoverTrigger>
									<PopoverContent
										className="p-0 w-auto border-0"
										align="end"
										onOpenAutoFocus={e => e.preventDefault()}
									>
										<EmojiPicker
											onEmojiClick={handleEmojiClick}
											{...(emojiPickerTheme ? { theme: emojiPickerTheme } : {})}
											searchPlaceHolder="Search emoji..."
											lazyLoadEmojis
										/>
									</PopoverContent>
								</Popover>
							)}

							{hasShortcodes && (
								<Popover open={isShortcodePopoverOpen} onOpenChange={setIsShortcodePopoverOpen}>
									<PopoverTrigger asChild>
										<IconButton
											type="button"
											variant="ghost"
											size="xs"
											//className="h-7 w-7 p-0"
											disabled={inputProps.disabled || inputProps.readOnly}
											icon={<Code />}
										/>
									</PopoverTrigger>
									<PopoverContent
										align="end"
										className="max-h-96 overflow-y-auto w-auto p-0"
										onOpenAutoFocus={e => e.preventDefault()}
									>
										{isLoadingShortcodes ? (
											<div className="flex items-center justify-center p-8">
												<Spinner size="md" label="Loading shortcodes..." />
											</div>
										) : (
											<>{!showingShortcodes ? renderListSelection() : renderShortcodeSelection()}</>
										)}
									</PopoverContent>
								</Popover>
							)}
						</ButtonGroup>
					)}
				</InputGroupAddon>
			</InputGroup>
		);
	}
);

InputShortcode.displayName = 'InputShortcode';
