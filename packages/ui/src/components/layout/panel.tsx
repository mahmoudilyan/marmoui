import { cn } from '../../lib/utils';

export default function Panel({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn('bg-panel w-full max-w-full overflow-x-hidden', className)} {...props}>
			{children}
		</div>
	);
}
