'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import { Smiley, Code, MagnifyingGlass, ArrowLeft } from '@phosphor-icons/react';
import { Input } from './input';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ScrollArea } from './scroll-area';

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

interface ParsedShortcode {
	fullMatch: string;
	code: string;
	fallback: string | null;
	startIndex: number;
	endIndex: number;
}

interface RichTextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	value: string;
	onChange: (value: string) => void;
	shortcodes?: ShortcodeGroup[];
	emojiPickerTheme?: 'light' | 'dark' | 'auto';
}

// Simple emoji data - in a real implementation you'd want to use a proper emoji picker library
const EMOJI_CATEGORIES = {
	Smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇'],
	Hearts: ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓', '💟', '💜'],
	Hands: ['👍', '👎', '👏', '🙌', '👌', '✌️', '🤞', '🤟', '🤘', '👋'],
	Objects: ['📱', '💻', '⌨️', '🖥️', '🖨️', '📷', '📹', '🎥', '📞', '☎️'],
};

export const RichTextInput = React.forwardRef<HTMLInputElement, RichTextInputProps>(
	function RichTextInput(props, ref) {
		const {
			value,
			onChange,
			shortcodes = [],
			emojiPickerTheme = 'auto',
			className,
			...rest
		} = props;

		const [selectedList, setSelectedList] = React.useState<string | null>(null);
		const [listSearch, setListSearch] = React.useState('');
		const [parsedShortcodes, setParsedShortcodes] = React.useState<ParsedShortcode[]>([]);
		const [selectedShortcode, setSelectedShortcode] = React.useState<ParsedShortcode | null>(null);
		const [fallbackValue, setFallbackValue] = React.useState('');
		const [isEditOpen, setIsEditOpen] = React.useState(false);
		const [showingShortcodes, setShowingShortcodes] = React.useState(false);
		const [selectedGroupName, setSelectedGroupName] = React.useState('');
		const [cursorPosition, setCursorPosition] = React.useState<number | null>(null);
		const [isShortcodePopoverOpen, setIsShortcodePopoverOpen] = React.useState(false);
		const [isEmojiPopoverOpen, setIsEmojiPopoverOpen] = React.useState(false);
		const [selectedEmojiCategory, setSelectedEmojiCategory] = React.useState('Smileys');

		const inputRef = React.useRef<HTMLInputElement | null>(null);

		// Merge refs (the forwarded ref and our local ref)
		const mergeRefs = (node: HTMLInputElement | null) => {
			inputRef.current = node;
			if (typeof ref === 'function') {
				ref(node);
			} else if (ref) {
				ref.current = node;
			}
		};

		// Parse shortcodes from input value
		React.useEffect(() => {
			const parsedCodes: ParsedShortcode[] = [];
			const regex = /(\[(.*?)(?:\|(.*?))?\])/g;
			let match;

			while ((match = regex.exec(value)) !== null) {
				parsedCodes.push({
					fullMatch: match[1],
					code: match[2],
					fallback: match[3] || null,
					startIndex: match.index,
					endIndex: match.index + match[0].length,
				});
			}

			setParsedShortcodes(parsedCodes);
		}, [value]);

		const handleCursorPositionChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
			if (e.currentTarget) {
				const pos = e.currentTarget.selectionStart;
				if (pos !== cursorPosition) {
					setCursorPosition(pos);
				}
			}
		};

		const handleEmojiClick = (emoji: string) => {
			let currentValue = value;
			if (inputRef.current && inputRef.current.value !== currentValue) {
				currentValue = inputRef.current.value;
			}

			if (inputRef.current) {
				inputRef.current.focus();
			}

			if (!currentValue) {
				onChange(emoji);
				setCursorPosition(emoji.length);
				setTimeout(() => {
					if (inputRef.current) {
						inputRef.current.focus();
						inputRef.current.setSelectionRange(emoji.length, emoji.length);
					}
				}, 0);
				return;
			}

			if (cursorPosition === null) {
				const newValue = currentValue + emoji;
				onChange(newValue);
				const newPosition = newValue.length;
				setCursorPosition(newPosition);
				setTimeout(() => {
					if (inputRef.current) {
						inputRef.current.focus();
						inputRef.current.setSelectionRange(newPosition, newPosition);
					}
				}, 0);
				return;
			}

			const newValue =
				currentValue.slice(0, cursorPosition) + emoji + currentValue.slice(cursorPosition);
			onChange(newValue);

			const newPosition = cursorPosition + emoji.length;
			setCursorPosition(newPosition);

			setTimeout(() => {
				if (inputRef.current) {
					inputRef.current.focus();
					inputRef.current.setSelectionRange(newPosition, newPosition);
				}
			}, 0);

			setIsEmojiPopoverOpen(false);
		};

		const handleShortcodeClick = (shortcodeValue: string) => {
			if (!value.trim()) {
				onChange(shortcodeValue);
				setCursorPosition(shortcodeValue.length);
				setTimeout(() => {
					if (inputRef.current) {
						inputRef.current.focus();
						inputRef.current.setSelectionRange(shortcodeValue.length, shortcodeValue.length);
					}
				}, 0);

				setShowingShortcodes(false);
				setSelectedList(null);
				setIsShortcodePopoverOpen(false);
				return;
			}

			if (cursorPosition === null) {
				onChange(value + shortcodeValue);
			} else {
				const newValue =
					value.slice(0, cursorPosition) + shortcodeValue + value.slice(cursorPosition);
				onChange(newValue);

				const newPosition = cursorPosition + shortcodeValue.length;
				setCursorPosition(newPosition);

				setTimeout(() => {
					if (inputRef.current) {
						inputRef.current.focus();
						inputRef.current.setSelectionRange(newPosition, newPosition);
					}
				}, 0);
			}

			setShowingShortcodes(false);
			setSelectedList(null);
			setIsShortcodePopoverOpen(false);
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

		const filteredLists = React.useMemo(() => {
			if (!listSearch) return shortcodes;
			return shortcodes.filter(group =>
				group.text.toLowerCase().includes(listSearch.toLowerCase())
			);
		}, [shortcodes, listSearch]);

		const filteredShortcodes = React.useMemo(() => {
			if (!selectedList) return [];
			const selectedGroup = shortcodes.find(group => group.id === selectedList);
			if (!selectedGroup) return [];
			if (selectedGroup.menu.length === 0) return [];
			return [selectedGroup];
		}, [shortcodes, selectedList]);

		const renderEmojiPicker = () => (
			<div className="w-80 h-64">
				<div className="flex border-b">
					{Object.keys(EMOJI_CATEGORIES).map(category => (
						<button
							key={category}
							onClick={() => setSelectedEmojiCategory(category)}
							className={cn(
								'px-3 py-2 text-xs font-medium transition-colors',
								selectedEmojiCategory === category
									? 'bg-primary text-primary-foreground'
									: 'hover:bg-accent'
							)}
						>
							{category}
						</button>
					))}
				</div>
				<ScrollArea className="h-48 p-3">
					<div className="grid grid-cols-8 gap-2">
						{EMOJI_CATEGORIES[selectedEmojiCategory as keyof typeof EMOJI_CATEGORIES]?.map(
							(emoji, index) => (
								<button
									key={index}
									onClick={() => handleEmojiClick(emoji)}
									className="p-2 text-lg hover:bg-accent rounded transition-colors"
								>
									{emoji}
								</button>
							)
						)}
					</div>
				</ScrollArea>
			</div>
		);

		const renderListSelection = () => (
			<div className="w-64">
				<div className="p-2 border-b bg-muted/50">
					<div className="relative">
						<MagnifyingGlass className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search lists..."
							value={listSearch}
							onChange={e => setListSearch(e.target.value)}
							className="pl-8 h-8"
						/>
					</div>
				</div>
				<ScrollArea className="max-h-48">
					<div className="p-1">
						{filteredLists.map(group => (
							<Button
								key={group.id}
								variant="ghost"
								size="sm"
								className="w-full justify-start"
								onClick={() => handleSelectList(group.id, group.text)}
							>
								{group.text}
							</Button>
						))}
					</div>
				</ScrollArea>
				{filteredLists.length === 0 && (
					<div className="p-4 text-center text-sm text-muted-foreground">No lists found</div>
				)}
			</div>
		);

		const renderShortcodeSelection = () => (
			<div className="w-64">
				<div className="flex items-center p-2 border-b">
					<Button variant="ghost" size="sm" onClick={handleBackToLists} className="p-1">
						<ArrowLeft className="h-4 w-4" />
					</Button>
					<span className="ml-2 font-medium text-sm">{selectedGroupName}</span>
				</div>
				<ScrollArea className="max-h-48">
					<div className="p-1">
						{filteredShortcodes.map(group => (
							<div key={group.id}>
								{group.menu.map((item, index) => (
									<Button
										key={`${group.id}-${index}`}
										variant="ghost"
										size="sm"
										className="w-full justify-start"
										onClick={() => handleShortcodeClick(item.value)}
									>
										{item.text}
									</Button>
								))}
							</div>
						))}
					</div>
				</ScrollArea>
				{filteredShortcodes.length === 0 && (
					<div className="p-4 text-center text-sm text-muted-foreground">No shortcodes found</div>
				)}
			</div>
		);

		return (
			<div className="relative w-full">
				<Input
					ref={mergeRefs}
					value={value}
					onChange={e => {
						const newVal = e.target.value;
						onChange(newVal);
						if (!newVal) {
							setCursorPosition(0);
							setParsedShortcodes([]);
						}
					}}
					onSelect={handleCursorPositionChange}
					onClick={handleCursorPositionChange}
					onKeyUp={handleCursorPositionChange}
					className={cn('pr-20', className)}
					{...rest}
				/>

				<div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
					<Popover open={isEmojiPopoverOpen} onOpenChange={setIsEmojiPopoverOpen}>
						<PopoverTrigger asChild>
							<Button variant="ghost" size="sm" className="h-8 w-8 p-0" type="button">
								<Smiley className="h-4 w-4" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="p-0" align="end">
							{renderEmojiPicker()}
						</PopoverContent>
					</Popover>

					{shortcodes.length > 0 && (
						<Popover open={isShortcodePopoverOpen} onOpenChange={setIsShortcodePopoverOpen}>
							<PopoverTrigger asChild>
								<Button variant="ghost" size="sm" className="h-8 w-8 p-0" type="button">
									<Code className="h-4 w-4" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="p-0" align="end">
								{!showingShortcodes ? renderListSelection() : renderShortcodeSelection()}
							</PopoverContent>
						</Popover>
					)}
				</div>
			</div>
		);
	}
);

export default RichTextInput;
