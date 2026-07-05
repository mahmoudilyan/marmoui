'use client';

import * as React from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<button
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
			className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9"
		>
			<MdLightMode className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<MdDarkMode className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</button>
	);
}
