import { defineConfig } from 'tsup';
import { exec } from 'child_process';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	dts: { resolve: true },
	sourcemap: true,
	external: [
		'react',
		'react-dom',
		'radix-ui',
		'lucide-react',
		'class-variance-authority',
		'clsx',
		'tailwind-merge',
		'sonner',
		'vaul',
		'react-icons',
		'next',
		'next/*',
	],
	banner: {
		js: "'use client';",
	},
	clean: false,
	onSuccess: async () => {
		// Rebuild CSS when JS changes
		return new Promise((resolve, reject) => {
			exec('pnpm tailwindcss -i src/styles/globals.css -o dist/style.css', error => {
				if (error) {
					console.error('❌ CSS build failed:', error);
					reject(error);
				} else {
					console.log('✅ CSS rebuilt');
					resolve(undefined);
				}
			});
		});
	},
});
