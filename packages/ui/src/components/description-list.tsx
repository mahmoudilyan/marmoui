import { cn } from '../lib/utils';

interface DescriptionListItemProps {
	label: string;
	description?: React.ReactNode;
	className?: string;
}

interface DescriptionListProps {
	items: DescriptionListItemProps[];
	className?: string;
}

export function DescriptionListItem({ label, description, className }: DescriptionListItemProps) {
	return (
		<div
			className={cn(
				'flex justify-start items-center border-b border-border-secondary py-4 pb-5 last:border-b-0',
				className
			)}
		>
			<div className="font-semibold text-foreground tracking-tight flex-1 basis-1/4 min-w-0">
				{label}
			</div>
			<div className="text-muted-foreground flex-1 basis-1/2 min-w-0">{description}</div>
		</div>
	);
}

export function DescriptionList({ items, className }: DescriptionListProps) {
	return (
		<div className={cn('space-y-0', className)}>
			{items.map((item, index) => (
				<DescriptionListItem
					key={`${item.label}-${index}`}
					label={item.label}
					description={item.description}
				/>
			))}
		</div>
	);
}
