'use client';

import { useMemo } from 'react';
import { cn } from '../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Link } from '@phosphor-icons/react';
import {
	FaFacebook,
	FaLinkedin,
	FaTwitter,
	FaInstagram,
	FaTiktok,
	FaYoutube,
	FaPinterest,
	FaGoogle,
	FaStripe,
} from 'react-icons/fa';
import { SiTwilio, SiZoom, SiSalesforce, SiHubspot, SiZoho, SiOpenai } from 'react-icons/si';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

// --- Types ---
interface Category {
	id: string;
	title: string;
	channelTypes: string[];
}

const categories: Category[] = [
	{
		id: 'social',
		title: 'Social Media',
		channelTypes: [
			'facebook',
			'linkedin',
			'twitter',
			'x',
			'instagram',
			'tiktok',
			'youtube',
			'pinterest',
			'googlebusiness',
		],
	},
	{ id: 'webinars', title: 'Webinars', channelTypes: ['gotowebinar', 'zoom'] },
	{
		id: 'crms',
		title: 'CRMs',
		channelTypes: ['salesforce', 'hubspot', 'zoho', 'insightly', 'ftpsync'],
	},
	{
		id: 'communications',
		title: 'Communications',
		channelTypes: ['googlecalendar', 'outlookcalendar', 'twilio', 'whatsappbusiness'],
	},
	{ id: 'reporting', title: 'Reporting', channelTypes: ['googleanalytics'] },
	{ id: 'payments', title: 'Payments', channelTypes: ['stripe'] },
	{ id: 'ai', title: 'AI', channelTypes: ['openai'] },
	{ id: 'data_enrichment', title: 'Data Enrichments', channelTypes: ['muraena'] },
];

const getLogoIcon = (type: string): React.ElementType => {
	switch (type?.toLowerCase()) {
		// Social
		case 'facebook':
			return FaFacebook;
		case 'linkedin':
			return FaLinkedin;
		case 'twitter':
		case 'x':
			return FaTwitter;
		case 'instagram':
			return FaInstagram;
		case 'tiktok':
			return FaTiktok;
		case 'youtube':
			return FaYoutube;
		case 'pinterest':
			return FaPinterest;
		case 'googlebusiness':
			return FaGoogle;
		// Webinars
		case 'zoom':
			return SiZoom;
		// CRMs
		case 'salesforce':
			return SiSalesforce;
		case 'hubspot':
			return SiHubspot;
		case 'zoho':
			return SiZoho;
		// Communications
		case 'googlecalendar':
			return FaGoogle;
		case 'twilio':
			return SiTwilio;
		// Reporting
		case 'googleanalytics':
			return FaGoogle;
		// Payments
		case 'stripe':
			return FaStripe;
		// AI
		case 'openai':
			return SiOpenai;
		// Data Enrichment & Others (Placeholders)
		case 'muraena':
		case 'gotowebinar':
		case 'ftpsync':
		case 'whatsappbusiness':
		case 'insightly':
		case 'outlookcalendar':
		default:
			return Link; // Default link icon
	}
};

interface SocialChannel {
	type: string;
	socid: string;
	channel: string;
	profile: {
		id: string;
		uid?: string;
		name: string;
		picture: string;
		note?: string;
		type?: string;
	};
	revoked: 0 | 1;
}

interface NavigationAccordionProps<T extends { type: string; channel: string; profile: any }> {
	categories: Category[];
	items: T[] | undefined | null;
	isLoading: boolean;
	selectedItemId: string | null | undefined;
	onSelectItem: (item: T) => void;
	getLogoIcon: (type: string) => React.ElementType;
}

// Helper function to get a unique, stable key for list items
const getItemKey = (item: SocialChannel): string => {
	return item.channel || item.socid;
};

export function NavigationAccordion<T extends SocialChannel>({
	categories,
	items,
	isLoading,
	selectedItemId,
	onSelectItem,
	getLogoIcon,
}: NavigationAccordionProps<T>) {
	const categorizedItems = useMemo(() => {
		const allItems = items || [];
		return categories.map(category => ({
			...category,
			data: allItems.filter(item => category.channelTypes.includes(item.type.toLowerCase())),
		}));
	}, [items, categories]);

	if (isLoading) {
		return (
			<div className="flex flex-col gap-4 px-2 py-4">
				<div className="flex flex-col gap-4">
					<div className="flex flex-row gap-1">
						<div className="h-8 w-8 rounded-full bg-muted animate-pulse mr-2" />
						<div className="flex-grow flex flex-col gap-2">
							<div className="h-4 w-[30%] bg-muted animate-pulse" />
							<div className="h-4 w-[80%] bg-muted animate-pulse" />
						</div>
					</div>
					<div className="flex flex-row gap-1">
						<div className="h-8 w-8 rounded-full bg-muted animate-pulse mr-2" />
						<div className="flex-grow flex flex-col gap-2">
							<div className="h-4 w-[30%] bg-muted animate-pulse" />
							<div className="h-4 w-[80%] bg-muted animate-pulse" />
						</div>
					</div>
					<div className="flex flex-row gap-1">
						<div className="h-8 w-8 rounded-full bg-muted animate-pulse mr-2" />
						<div className="flex-grow flex flex-col gap-2">
							<div className="h-4 w-[30%] bg-muted animate-pulse" />
							<div className="h-4 w-[80%] bg-muted animate-pulse" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<Accordion type="multiple">
			{categorizedItems.map(category => (
				<AccordionItem key={category.id} value={category.id} className="border-b-0">
					<AccordionTrigger className="px-1 py-1 hover:bg-muted/50 cursor-pointer">
						<div className="flex flex-1 text-left gap-2">
							<span className="text-xs font-semibold text-muted-foreground -ml-2">
								{category.title.toUpperCase()}
							</span>
						</div>
						{category.data.length > 0 && (
							<span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full border mr-2">
								{category.data.length}
							</span>
						)}
					</AccordionTrigger>
					<AccordionContent>
						{category.data.length > 0 ? (
							<div className="flex flex-col gap-0">
								{category.data.map(item => {
									const itemKey = getItemKey(item);
									const IconComponent = getLogoIcon(item.type);
									return (
										<div
											key={itemKey}
											className={cn(
												'flex items-center p-2 rounded-md cursor-pointer gap-2',
												selectedItemId === itemKey ? 'bg-accent' : 'transparent',
												'hover:bg-accent'
											)}
											onClick={() => onSelectItem(item)}
										>
											<Avatar className="h-6 w-6">
												<AvatarImage src={item.profile.picture} alt={item.profile.name} />
												<AvatarFallback>
													<IconComponent className="h-4 w-4 text-muted-foreground" />
												</AvatarFallback>
											</Avatar>
											<span
												className={cn(
													'text-sm flex-1 truncate',
													selectedItemId === itemKey ? 'font-semibold' : 'font-normal'
												)}
											>
												{item.profile.name}
											</span>
										</div>
									);
								})}
							</div>
						) : (
							<p className="text-xs text-muted-foreground px-2 py-1">
								No connections for {category.title}.
							</p>
						)}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}

export { categories, getLogoIcon, type Category, type SocialChannel };
