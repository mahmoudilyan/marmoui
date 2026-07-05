/**
 * Avatar Component
 *
 * A flexible avatar component that supports multiple variants, sizes, status indicators, and badge notifications.
 * Based on the Figma design system with support for placeholder icons, initials, and photos.
 *
 * @example
 * // Basic avatar with initials
 * <Avatar size="md">
 *   <AvatarFallback>JL</AvatarFallback>
 * </Avatar>
 *
 * @example
 * // Avatar with photo and status indicator
 * <Avatar size="lg" showStatus statusColor="success">
 *   <AvatarImage src="/path/to/image.jpg" alt="MdPerson" />
 *   <AvatarFallback>JL</AvatarFallback>
 * </Avatar>
 *
 * @example
 * // Avatar with placeholder icon and badge
 * <Avatar size="md" badgeCount={5}>
 *   <AvatarFallback showIcon />
 * </Avatar>
 *
 * @example
 * // All sizes demonstration
 * {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
 *   <Avatar key={size} size={size} showStatus badgeCount={2}>
 *     <AvatarFallback>JL</AvatarFallback>
 *   </Avatar>
 * ))}
 */

import * as React from 'react';
import { Avatar as AvatarPrimitive } from 'radix-ui';
import { User } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarVariant =
	| 'normal'
	| 'blue'
	| 'red'
	| 'yellow'
	| 'orange'
	| 'purple'
	| 'pink'
	| 'green'
	| 'indigo'
	| 'teal';

const AvatarContext = React.createContext<{ size: AvatarSize; variant?: AvatarVariant }>({
	size: 'md',
	variant: 'normal',
});

const avatarSizeVariants = {
	xs: 'size-4 rounded-xs',
	sm: 'size-6 rounded-sm',
	md: 'size-8 rounded-md',
	lg: 'size-12 rounded-md',
	xl: 'size-16 rounded-md',
};

const avatarFallbackVariants = cva('bg-secondary', {
	variants: {
		variant: {
			normal: 'bg-secondary',
			green: 'bg-green-100',
			yellow: 'bg-yellow-100',
			blue: 'bg-blue-100',
			red: 'bg-red-100',
			orange: 'bg-orange-100',
			pink: 'bg-pink-100',
			purple: 'bg-purple-100',
			indigo: 'bg-indigo-100',
			teal: 'bg-teal-100',
		},
	},
	defaultVariants: {
		variant: 'normal',
	},
});

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
	/**
	 * Size of the avatar
	 * @default 'md'
	 */
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	/**
	 * Show status indicator on the avatar
	 */
	showStatus?: boolean;
	/**
	 * Color of the status indicator
	 * @default 'success'
	 */
	statusColor?: 'success' | 'warning' | 'error';
	/**
	 * Badge count to display on the avatar
	 */
	badgeCount?: number;
	/**
	 * Color variant for the avatar fallback background
	 * @default 'normal'
	 */
	variant?:
		| 'normal'
		| 'blue'
		| 'red'
		| 'yellow'
		| 'orange'
		| 'purple'
		| 'pink'
		| 'green'
		| 'indigo'
		| 'teal';
}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
	(
		{
			className,
			size = 'md',
			variant = 'normal',
			showStatus,
			statusColor = 'success',
			badgeCount,
			...props
		},
		ref
	) => {
		return (
			<AvatarContext.Provider value={{ size, variant }}>
				<div className="relative inline-flex">
					<AvatarPrimitive.Root
						ref={ref}
						className={cn(
							'relative flex shrink-0 overflow-hidden',
							avatarSizeVariants[size],
							className
						)}
						{...props}
					/>
					{showStatus && (
						<div
							className={cn(
								'absolute border-2 border-panel rounded-full',
								{
									'bg-green-600': statusColor === 'success',
									'bg-yellow-400': statusColor === 'warning',
									'bg-red-600': statusColor === 'error',
								},
								{
									'h-[4px] w-[4px] -bottom-[1px] -right-[1px]': size === 'xs',
									'h-[6px] w-[6px] -bottom-[1px] -right-[1px]': size === 'sm',
									'h-[8px] w-[8px] -bottom-[1px] -right-[1px]': size === 'md',
									'h-[10px] w-[10px] -bottom-[2px] -right-[2px]': size === 'lg',
									'h-[12px] w-[12px] -bottom-[2px] -right-[2px]': size === 'xl',
								}
							)}
						/>
					)}
					{badgeCount && badgeCount > 0 && (
						<div
							className={cn(
								'absolute bg-red-600 border border-panel rounded-full flex items-center justify-center font-normal uppercase tracking-[0.4px] !text-ink-white',
								{
									'h-[10px] min-w-[10px] px-[2px] -top-[2px] -right-[2px] caps-sm': size === 'xs',
									'h-[12px] min-w-[12px] px-[2px] -top-[4px] -right-[4px] caps-sm':
										size === 'sm' || size === 'md',
									'h-[14px] min-w-[14px] px-[3px] -top-[4px] -right-[4px] caps-sm': size === 'lg',
									'h-[16px] min-w-[16px] px-[4px] -top-[6px] -right-[6px] caps-md': size === 'xl',
								}
							)}
						>
							{badgeCount > 99 ? '99+' : badgeCount}
						</div>
					)}
				</div>
			</AvatarContext.Provider>
		);
	}
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Image>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => {
	return (
		<AvatarPrimitive.Image
			ref={ref}
			className={cn('aspect-square size-full object-cover bg-secondary', className)}
			{...props}
		/>
	);
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

interface AvatarFallbackProps
	extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
	/**
	 * Show icon instead of text/initials
	 */
	showIcon?: boolean;
	/**
	 * Color variant for the avatar fallback
	 */
	variant?:
		| 'normal'
		| 'blue'
		| 'red'
		| 'yellow'
		| 'orange'
		| 'purple'
		| 'pink'
		| 'green'
		| 'indigo'
		| 'teal';
}

const AvatarFallback = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Fallback>,
	AvatarFallbackProps
>(({ className, showIcon = false, children, variant: variantProp, ...props }, ref) => {
	const { size, variant: contextVariant } = React.useContext(AvatarContext);
	const variant = variantProp ?? contextVariant ?? 'normal';

	return (
		<AvatarPrimitive.Fallback
			ref={ref}
			className={cn(
				'flex size-full items-center justify-center font-medium',
				avatarFallbackVariants({ variant }),
				className
			)}
			{...props}
		>
			{showIcon ? (
				<User
					weight="fill"
					className={cn('text-ink', {
						'h-2 w-2': size === 'xs',
						'h-3 w-3': size === 'sm',
						'h-4 w-4': size === 'md',
						'h-6 w-6': size === 'lg',
						'h-8 w-8': size === 'xl',
					})}
				/>
			) : (
				<span
					className={cn('font-medium text-ink-dark', {
						'caps-sm': size === 'xs',
						'caps-md': size === 'sm',
						'body-md': size === 'md',
						'heading-lg': size === 'lg',
						'heading-xl': size === 'xl',
					})}
				>
					{children}
				</span>
			)}
		</AvatarPrimitive.Fallback>
	);
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

/**
 * Size-based overlap margins for avatar stacking
 */
const stackOverlapVariants = {
	xs: '-ml-1',
	sm: '-ml-2',
	md: '-ml-3',
	lg: '-ml-4',
	xl: '-ml-5',
};

interface AvatarStackProps {
	/**
	 * Avatar elements to stack
	 */
	children: React.ReactNode;
	/**
	 * Maximum number of avatars to display before showing overflow
	 * @default 4
	 */
	max?: number;
	/**
	 * Size of all avatars in the stack
	 * @default 'md'
	 */
	size?: AvatarSize;
	/**
	 * Additional className for the container
	 */
	className?: string;
	/**
	 * Border color for the ring around each avatar
	 * - 'panel': Uses panel/card background color (adapts to light/dark mode)
	 * - 'bg': Uses page background color (adapts to light/dark mode)
	 * - 'transparent': No visible ring
	 * @default 'panel'
	 */
	borderColor?: 'panel' | 'bg' | 'transparent';
}

/**
 * AvatarStack Component
 *
 * A component for displaying multiple avatars in an overlapping stack layout.
 * Automatically handles overflow with a "+N" indicator.
 *
 * @example
 * // Basic stack with max 3 visible
 * <AvatarStack max={3} size="md">
 *   <Avatar><AvatarFallback>JL</AvatarFallback></Avatar>
 *   <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
 *   <Avatar><AvatarFallback>CD</AvatarFallback></Avatar>
 *   <Avatar><AvatarFallback>EF</AvatarFallback></Avatar>
 * </AvatarStack>
 *
 * @example
 * // Stack with images
 * <AvatarStack max={4} size="lg">
 *   {users.map(user => (
 *     <Avatar key={user.id}>
 *       <AvatarImage src={user.avatar} alt={user.name} />
 *       <AvatarFallback>{user.initials}</AvatarFallback>
 *     </Avatar>
 *   ))}
 * </AvatarStack>
 */
const AvatarStack = ({
	children,
	max = 4,
	size = 'md',
	className,
	borderColor = 'panel',
}: AvatarStackProps) => {
	const childArray = React.Children.toArray(children);
	const totalCount = childArray.length;
	const visibleChildren = childArray.slice(0, max);
	const overflowCount = totalCount - max;

	const borderColorClass = {
		panel: 'ring-panel',
		bg: 'ring-bg',
		transparent: 'ring-transparent',
	}[borderColor];

	return (
		<div className={cn('flex items-center', className)}>
			{visibleChildren.map((child, index) => {
				// Clone each avatar to inject size and stacking styles directly
				if (React.isValidElement<AvatarProps>(child)) {
					return React.cloneElement(child, {
						key: index,
						size,
						className: cn(
							'ring-2',
							borderColorClass,
							index > 0 && stackOverlapVariants[size],
							child.props.className
						),
						style: {
							...child.props.style,
						},
					});
				}
				return child;
			})}
			{overflowCount > 0 && (
				<div
					className={cn(
						'relative ring-2 flex items-center justify-center bg-secondary',
						borderColorClass,
						avatarSizeVariants[size],
						stackOverlapVariants[size]
					)}
				>
					<span
						className={cn('font-normal text-ink', {
							'text-[12px] leading-[18px]': size === 'xs' || size === 'sm' || size === 'md',
							'text-[16px] leading-[24px]': size === 'lg',
							'text-[20px] leading-[32px]': size === 'xl',
						})}
					>
						+{overflowCount > 99 ? '99+' : overflowCount}
					</span>
				</div>
			)}
		</div>
	);
};
AvatarStack.displayName = 'AvatarStack';

export { Avatar, AvatarImage, AvatarFallback, AvatarStack };
