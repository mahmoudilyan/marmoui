import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookIcon } from 'lucide-react';

export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: 'Marmo UI',
		},
		links: [
			{
				text: 'Storybook',
				url: 'http://localhost:6006',
				icon: <BookIcon />,
				secondary: true,
			},
		],
	};
}
