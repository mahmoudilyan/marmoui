import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Select as SelectBase,
	SelectContent as SelectContentBase,
	SelectGroup as SelectGroupBase,
	SelectItem as SelectItemBase,
	SelectLabel as SelectLabelBase,
	SelectTrigger as SelectTriggerBase,
	SelectValue as SelectValueBase,
	SelectSeparator as SelectSeparatorBase,
	SelectMultiCategory as SelectMultiCategoryBase,
	SelectCheckboxSearchable as SelectCheckboxSearchableBase,
	SelectionManager as SelectionManagerBase,
	Button as ButtonBase,
	Badge as BadgeBase,
} from '@marmoui/ui';
import { MdPerson, MdWork, MdLocationOn, MdStar, MdCheck } from 'react-icons/md';

// Type assertions for React 19 compatibility
const Select = SelectBase as any;
const SelectContent = SelectContentBase as any;
const SelectGroup = SelectGroupBase as any;
const SelectItem = SelectItemBase as any;
const SelectLabel = SelectLabelBase as any;
const SelectTrigger = SelectTriggerBase as any;
const SelectValue = SelectValueBase as any;
const SelectSeparator = SelectSeparatorBase as any;
const SelectMultiCategory = SelectMultiCategoryBase as any;
const SelectCheckboxSearchable = SelectCheckboxSearchableBase as any;
const SelectionManager = SelectionManagerBase as any;
const Button = ButtonBase as any;
const Badge = BadgeBase as any;

const meta = {
	title: 'Components/Forms/Select',
	component: Select,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Select Components

A comprehensive collection of select and dropdown components for forms, including basic selects, multi-select with categories, searchable checkbox selects, and selection managers.

## Components Included

- **Select**: Basic dropdown select built on Radix UI
- **SelectMultiCategory**: Multi-select with categorized items
- **SelectCheckboxSearchable**: Searchable multi-select with checkboxes
- **SelectionManager**: Complex selection management with categories

## Usage

\`\`\`tsx
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectMultiCategory,
  SelectCheckboxSearchable 
} from '@marmoui/ui';

// Basic Select
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
\`\`\`
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// BASIC SELECT STORIES
// ============================================

export const Default: Story = {
	render: () => (
		<Select>
			<SelectTrigger className="w-60">
				<SelectValue placeholder="Select a fruit..." />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="apple">Apple</SelectItem>
				<SelectItem value="banana">Banana</SelectItem>
				<SelectItem value="cherry">Cherry</SelectItem>
				<SelectItem value="grape">Grape</SelectItem>
				<SelectItem value="orange">Orange</SelectItem>
			</SelectContent>
		</Select>
	),
};

export const WithGroups: Story = {
	name: 'Select - With Groups',
	render: () => (
		<Select>
			<SelectTrigger className="w-60">
				<SelectValue placeholder="Select a role..." />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Management</SelectLabel>
					<SelectItem value="ceo">CEO</SelectItem>
					<SelectItem value="cto">CTO</SelectItem>
					<SelectItem value="cfo">CFO</SelectItem>
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Engineering</SelectLabel>
					<SelectItem value="frontend">Frontend Developer</SelectItem>
					<SelectItem value="backend">Backend Developer</SelectItem>
					<SelectItem value="fullstack">Full Stack Developer</SelectItem>
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Design</SelectLabel>
					<SelectItem value="ui">UI Designer</SelectItem>
					<SelectItem value="ux">UX Designer</SelectItem>
					<SelectItem value="product">Product Designer</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};

export const SelectSizes: Story = {
	name: 'Select - Sizes',
	render: () => (
		<div className="flex flex-col gap-4">
			<div>
				<label className="text-sm font-medium mb-1 block">Small</label>
				<Select>
					<SelectTrigger className="w-60" size="sm">
						<SelectValue placeholder="Small select..." />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1">Option 1</SelectItem>
						<SelectItem value="2">Option 2</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div>
				<label className="text-sm font-medium mb-1 block">Default</label>
				<Select>
					<SelectTrigger className="w-60" size="default">
						<SelectValue placeholder="Default select..." />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1">Option 1</SelectItem>
						<SelectItem value="2">Option 2</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	),
};

export const DisabledSelect: Story = {
	name: 'Select - Disabled',
	render: () => (
		<Select disabled>
			<SelectTrigger className="w-60">
				<SelectValue placeholder="Disabled select..." />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="1">Option 1</SelectItem>
			</SelectContent>
		</Select>
	),
};

export const WithIcons: Story = {
	name: 'Select - With Icons',
	render: () => (
		<Select>
			<SelectTrigger className="w-60">
				<SelectValue placeholder="Select department..." />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="hr">
					<MdPerson className="inline mr-1" />
					Human Resources
				</SelectItem>
				<SelectItem value="engineering">
					<MdWork className="inline mr-1" />
					Engineering
				</SelectItem>
				<SelectItem value="sales">
					<MdLocationOn className="inline mr-1" />
					Sales
				</SelectItem>
				<SelectItem value="marketing">
					<MdStar className="inline mr-1" />
					Marketing
				</SelectItem>
			</SelectContent>
		</Select>
	),
};

export const ControlledSelect: Story = {
	name: 'Select - Controlled',
	render: () => {
		const [value, setValue] = React.useState('');

		return (
			<div className="flex flex-col gap-4">
				<Select value={value} onValueChange={setValue}>
					<SelectTrigger className="w-60">
						<SelectValue placeholder="Select priority..." />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="low">Low Priority</SelectItem>
						<SelectItem value="medium">Medium Priority</SelectItem>
						<SelectItem value="high">High Priority</SelectItem>
						<SelectItem value="urgent">Urgent</SelectItem>
					</SelectContent>
				</Select>
				<div className="text-sm text-ink-light">
					Selected value: <strong>{value || 'None'}</strong>
				</div>
			</div>
		);
	},
};

// ============================================
// SELECT MULTI CATEGORY STORIES
// ============================================

const categoryData = [
	{
		name: 'Lists',
		items: [
			{ value: 'newsletter', label: 'Newsletter Subscribers', description: '5,234 contacts' },
			{ value: 'customers', label: 'Customers', description: '12,891 contacts' },
			{ value: 'leads', label: 'New Leads', description: '2,456 contacts' },
		],
	},
	{
		name: 'Audiences',
		items: [
			{ value: 'engaged', label: 'Highly Engaged', description: '3,456 contacts' },
			{ value: 'inactive', label: 'Inactive Users', description: '1,234 contacts' },
			{ value: 'premium', label: 'Premium Members', description: '890 contacts' },
		],
	},
	{
		name: 'Segments',
		items: [
			{ value: 'new', label: 'New This Month', description: '567 contacts' },
			{ value: 'returning', label: 'Returning Users', description: '2,345 contacts' },
			{ value: 'vip', label: 'VIP Customers', description: '123 contacts' },
		],
	},
];

export const SelectMultiCategoryBasic: Story = {
	name: 'SelectMultiCategory - Basic',
	render: () => {
		const [selected, setSelected] = React.useState<string[]>([]);

		return (
			<div className="w-80">
				<label className="text-sm font-medium mb-1 block">Select Recipients</label>
				<SelectMultiCategory
					categories={categoryData}
					value={selected}
					onChange={setSelected}
					placeholder="Select lists, audiences, or segments..."
				/>
				{selected.length > 0 && (
					<div className="mt-2 flex flex-wrap gap-1">
						{selected.map(item => (
							<Badge key={item} variant="normal" size="sm">
								{item.split(':')[1]}
							</Badge>
						))}
					</div>
				)}
			</div>
		);
	},
};

export const SelectMultiCategoryWithPreselected: Story = {
	name: 'SelectMultiCategory - Preselected',
	render: () => {
		const [selected, setSelected] = React.useState<string[]>([
			'Lists:newsletter',
			'Audiences:engaged',
		]);

		return (
			<div className="w-80">
				<label className="text-sm font-medium mb-1 block">Campaign Recipients</label>
				<SelectMultiCategory
					categories={categoryData}
					value={selected}
					onChange={setSelected}
					placeholder="Select recipients..."
					searchPlaceholder="Search categories..."
				/>
			</div>
		);
	},
};

// ============================================
// SELECT CHECKBOX SEARCHABLE STORIES
// ============================================

const checkboxItems = [
	{ value: 'react', label: 'React', description: 'A JavaScript library for building UIs' },
	{ value: 'vue', label: 'Vue.js', description: 'The Progressive JavaScript Framework' },
	{
		value: 'angular',
		label: 'Angular',
		description: 'Platform for building mobile and desktop apps',
	},
	{ value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
	{ value: 'nextjs', label: 'Next.js', description: 'The React Framework for Production' },
	{ value: 'nuxt', label: 'Nuxt', description: 'The Intuitive Vue Framework' },
	{ value: 'remix', label: 'Remix', description: 'Full stack web framework' },
	{ value: 'astro', label: 'Astro', description: 'The web framework for content-driven websites' },
];

export const SelectCheckboxSearchableBasic: Story = {
	name: 'SelectCheckboxSearchable - Basic',
	render: () => {
		const [selected, setSelected] = React.useState<string[]>([]);

		return (
			<div className="w-80">
				<label className="text-sm font-medium mb-1 block">Technologies</label>
				<SelectCheckboxSearchable
					items={checkboxItems}
					value={selected}
					onChange={setSelected}
					placeholder="Select technologies..."
					searchPlaceholder="Search technologies..."
				/>
			</div>
		);
	},
};

export const SelectCheckboxSearchableWithSelection: Story = {
	name: 'SelectCheckboxSearchable - With Selection',
	render: () => {
		const [selected, setSelected] = React.useState<string[]>(['react', 'nextjs']);

		return (
			<div className="w-80">
				<label className="text-sm font-medium mb-1 block">Framework Expertise</label>
				<SelectCheckboxSearchable
					items={checkboxItems}
					value={selected}
					onChange={setSelected}
					placeholder="Select your expertise..."
				/>
				<p className="text-xs text-ink-light mt-2">
					{selected.length} framework{selected.length !== 1 ? 's' : ''} selected
				</p>
			</div>
		);
	},
};

// ============================================
// SELECTION MANAGER STORIES
// ============================================

const managerCategories = [
	{
		name: 'Lists',
		items: [
			{ value: 'newsletter', label: 'Newsletter', description: '5,000 contacts' },
			{ value: 'blog', label: 'Blog Subscribers', description: '3,200 contacts' },
		],
	},
	{
		name: 'Segments',
		items: [
			{ value: 'active', label: 'Active Users', description: '8,500 contacts' },
			{ value: 'premium', label: 'Premium Users', description: '1,200 contacts' },
		],
	},
];

const excludeItems = [
	{ value: 'unsubscribed', label: 'Unsubscribed', description: '450 contacts' },
	{ value: 'bounced', label: 'Bounced Emails', description: '120 contacts' },
	{ value: 'complained', label: 'Complained', description: '35 contacts' },
];

export const SelectionManagerBasic: Story = {
	name: 'SelectionManager - Basic',
	render: () => {
		const [selections, setSelections] = React.useState({
			categories: [] as string[],
			checkboxItems: [] as string[],
		});

		return (
			<div className="w-[600px]">
				<SelectionManager
					categories={managerCategories}
					checkboxItems={excludeItems}
					categoryPlaceholder="Select Lists or Segments..."
					checkboxPlaceholder="Select recipients to exclude..."
					categoryLabel="Include Recipients"
					checkboxLabel="Exclude Recipients"
					title="Campaign Recipients"
					onChange={setSelections}
					defaultCategorySelections={['Lists:newsletter']}
				/>
			</div>
		);
	},
};

// ============================================
// REAL-WORLD EXAMPLES
// ============================================

export const FormWithSelects: Story = {
	name: 'Example - Form with Selects',
	render: () => {
		const [country, setCountry] = React.useState('');
		const [timezone, setTimezone] = React.useState('');
		const [languages, setLanguages] = React.useState<string[]>([]);

		const languageItems = [
			{ value: 'en', label: 'English' },
			{ value: 'es', label: 'Spanish' },
			{ value: 'fr', label: 'French' },
			{ value: 'de', label: 'German' },
			{ value: 'it', label: 'Italian' },
			{ value: 'pt', label: 'Portuguese' },
			{ value: 'ja', label: 'Japanese' },
			{ value: 'zh', label: 'Chinese' },
		];

		return (
			<div className="w-96 p-6 border border-border rounded-lg bg-panel">
				<h3 className="text-lg font-semibold mb-4">User Preferences</h3>
				<div className="flex flex-col gap-4">
					<div>
						<label className="text-sm font-medium mb-1 block">Country</label>
						<Select value={country} onValueChange={setCountry}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select country..." />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>North America</SelectLabel>
									<SelectItem value="us">United States</SelectItem>
									<SelectItem value="ca">Canada</SelectItem>
									<SelectItem value="mx">Mexico</SelectItem>
								</SelectGroup>
								<SelectSeparator />
								<SelectGroup>
									<SelectLabel>Europe</SelectLabel>
									<SelectItem value="uk">United Kingdom</SelectItem>
									<SelectItem value="de">Germany</SelectItem>
									<SelectItem value="fr">France</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div>
						<label className="text-sm font-medium mb-1 block">Timezone</label>
						<Select value={timezone} onValueChange={setTimezone}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select timezone..." />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
								<SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
								<SelectItem value="cst">Central Standard Time (CST)</SelectItem>
								<SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
								<SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
								<SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<label className="text-sm font-medium mb-1 block">Languages</label>
						<SelectCheckboxSearchable
							items={languageItems}
							value={languages}
							onChange={setLanguages}
							placeholder="Select languages..."
							className="w-full"
						/>
					</div>

					<Button className="w-full mt-2">Save Preferences</Button>
				</div>
			</div>
		);
	},
};

export const EmailCampaignRecipients: Story = {
	name: 'Example - Email Campaign Recipients',
	render: () => {
		const [recipients, setRecipients] = React.useState<string[]>([]);

		return (
			<div className="w-[500px] p-6 border border-border rounded-lg bg-panel">
				<h3 className="text-lg font-semibold mb-2">Campaign Recipients</h3>
				<p className="text-sm text-ink-light mb-4">
					Select which lists, audiences, or segments should receive this campaign.
				</p>
				<SelectMultiCategory
					categories={categoryData}
					value={recipients}
					onChange={setRecipients}
					placeholder="Select recipients..."
					searchPlaceholder="Search..."
				/>
				{recipients.length > 0 && (
					<div className="mt-4 p-3 bg-bg rounded-lg">
						<p className="text-sm font-medium mb-2">Selected Recipients:</p>
						<div className="flex flex-wrap gap-1">
							{recipients.map(item => {
								const [category, value] = item.split(':');
								const categoryObj = categoryData.find(c => c.name === category);
								const itemObj = categoryObj?.items.find(i => i.value === value);
								return (
									<Badge key={item} variant="normal" size="sm">
										{itemObj?.label || value}
									</Badge>
								);
							})}
						</div>
					</div>
				)}
			</div>
		);
	},
};
