'use client';

import * as React from 'react';
import { Button, ButtonProps } from './button';

export interface LinkButtonProps extends Omit<ButtonProps, 'asChild'> {
	href: string;
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(function LinkButton(
	{ href, ...props },
	ref
) {
	return (
		<Button asChild {...props}>
			<a ref={ref} href={href} />
		</Button>
	);
});
