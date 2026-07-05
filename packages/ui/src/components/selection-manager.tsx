'use client';

import * as React from 'react';
import { Button } from './button';
import { CloseButton } from './close-button';
import { Trash } from '@phosphor-icons/react';
import { cn } from '../lib/utils';

// Types
type CategoryItem = {
	category: string;
	value: string;
	label: string;
	description?: string;
};

type SimpleItem = {
	value: string;
	label: string;
	description?: string;
};

// Simplified Category type for now
type Category = {
	name: string;
	items: SimpleItem[];
};

interface SelectionManagerProps {
	categories: Category[];
	checkboxItems: SimpleItem[];
	categoryPlaceholder?: string;
	checkboxPlaceholder?: string;
	onChange?: (selections: { categories: string[]; checkboxItems: string[] }) => void;
	defaultCategorySelections?: string[];
	defaultCheckboxSelections?: string[];
	title?: string;
	categoryLabel?: string;
	checkboxLabel?: string;
	width?: string | number;
	className?: string;
}

export function SelectionManager({
	categories,
	checkboxItems,
	categoryPlaceholder = 'Select Lists, Audiences, or Folders...',
	checkboxPlaceholder = 'Exclude Recipients...',
	onChange,
	defaultCategorySelections = [],
	defaultCheckboxSelections = [],
	title = 'Selection Manager',
	categoryLabel = 'Categories',
	checkboxLabel = 'Exclude Recipients',
	width = '100%',
	className,
}: SelectionManagerProps) {
	// State for selections
	const [categorySelections, setCategorySelections] =
		React.useState<string[]>(defaultCategorySelections);
	const [checkboxSelections, setCheckboxSelections] =
		React.useState<string[]>(defaultCheckboxSelections);

	// Get details for category selections
	const getCategoryItemDetails = (fullValue: string): CategoryItem | null => {
		const [categoryName, itemValue] = fullValue.split(':');

		for (const category of categories) {
			if (category.name === categoryName) {
				const item = category.items.find(i => i.value === itemValue);
				if (item) {
					return {
						category: categoryName,
						value: fullValue,
						label: item.label,
						description: item.description,
					};
				}
			}
		}

		return null;
	};

	// Get all selected items as a unified format
	const getAllSelectedItems = React.useMemo(() => {
		const categoryItems = categorySelections
			.map(getCategoryItemDetails)
			.filter(Boolean) as CategoryItem[];

		const simpleItems = checkboxSelections
			.map(value => {
				const item = checkboxItems.find(i => i.value === value);
				return item
					? {
							category: checkboxLabel,
							value,
							label: item.label,
							description: item.description,
						}
					: null;
			})
			.filter(Boolean) as CategoryItem[];

		return [...categoryItems, ...simpleItems];
	}, [categorySelections, checkboxSelections, categories, checkboxItems, checkboxLabel]);

	// Handle deletion from the table
	const handleDeleteItem = (item: CategoryItem) => {
		if (item.category === checkboxLabel) {
			const newSelections = checkboxSelections.filter(v => v !== item.value);
			setCheckboxSelections(newSelections);
		} else {
			const newSelections = categorySelections.filter(v => v !== item.value);
			setCategorySelections(newSelections);
		}
	};

	// Update parent component when selections change
	React.useEffect(() => {
		onChange?.({
			categories: categorySelections,
			checkboxItems: checkboxSelections,
		});
	}, [categorySelections, checkboxSelections, onChange]);

	return (
		<div className={cn('w-full', className)} style={{ width }}>
			<h2 className="text-xl font-bold mb-4">{title}</h2>

			{/* Selectors - Simplified for now */}
			<div className="flex gap-6 mb-6 flex-col">
				<div className="w-full">
					<label className="block text-sm font-medium mb-2">{categoryLabel}</label>
					<div className="p-3 border border-border rounded-md bg-muted/50 text-sm text-muted-foreground">
						{categoryPlaceholder}
					</div>
				</div>

				<div className="w-full">
					<label className="block text-sm font-medium mb-2">{checkboxLabel}</label>
					<div className="p-3 border border-border rounded-md bg-muted/50 text-sm text-muted-foreground">
						{checkboxPlaceholder}
					</div>
				</div>
			</div>

			{/* Selected Recipients Section */}
			{getAllSelectedItems.length > 0 && (
				<div className="mt-6 p-4 border border-border rounded-md bg-muted/30">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-md font-bold">Selected Recipients</h3>
						<Button
							size="sm"
							variant="ghost"
							onClick={() => {
								setCategorySelections([]);
								setCheckboxSelections([]);
							}}
							className="text-destructive hover:text-destructive"
						>
							<Trash className="mr-1 w-4 h-4" />
							Clear All
						</Button>
					</div>

					{/* Recipients table */}
					<div className="border border-border rounded-md overflow-hidden bg-background">
						{/* Table header */}
						<div className="bg-muted/50 py-2 px-3 font-medium border-b border-border flex">
							<div className="w-1/4">Type</div>
							<div className="w-1/3">Name</div>
							<div className="w-1/3">Contacts</div>
							<div className="w-12"></div>
						</div>

						{/* Table body */}
						<div className="max-h-80 overflow-y-auto">
							{getAllSelectedItems.map(item => {
								const contactsMatch = item.description?.match(/(\d+)/);
								const contactsNumber = contactsMatch ? parseInt(contactsMatch[1], 10) : 0;
								const isExcluded = item.category === checkboxLabel;

								return (
									<div
										key={item.value}
										className={cn(
											'py-2 px-3 border-b border-border last:border-b-0 hover:bg-muted/30 flex items-center',
											isExcluded && 'bg-destructive/10'
										)}
									>
										<div
											className={cn(
												'w-1/4 font-medium',
												isExcluded ? 'text-destructive' : 'text-muted-foreground'
											)}
										>
											{isExcluded ? 'Excluded' : item.category}
										</div>
										<div className="w-1/3">{item.label}</div>
										<div
											className={cn(
												'w-1/3 text-sm',
												isExcluded ? 'text-destructive' : 'text-primary'
											)}
										>
											{contactsNumber.toLocaleString()} contacts
										</div>
										<div className="w-12 text-right">
											<CloseButton
												size="sm"
												onClick={() => handleDeleteItem(item)}
												aria-label={`Remove ${item.label}`}
											/>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
