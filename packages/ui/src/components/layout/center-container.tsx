import { cn } from '../../lib/utils';

interface CenterContainerProps {
	children: React.ReactNode;
	fluid?: boolean;
	className?: string;
}

export default function CenterContainer({ children, fluid, className, ...props }: CenterContainerProps) {
	return (
		<div
			className={cn(
				"mt-10",
				fluid ? "w-full" : "container mx-auto px-4",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}