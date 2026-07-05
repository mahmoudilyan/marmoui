import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
	try {
		const { slug } = await params;
		const slugPath = slug.join('/');
		const filePath = path.join(process.cwd(), 'content', `${slugPath}.mdx`);

		// Security: Ensure path is within content directory
		const resolvedPath = path.resolve(filePath);
		const contentDir = path.resolve(process.cwd(), 'content');
		if (!resolvedPath.startsWith(contentDir)) {
			return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
		}

		const content = await fs.readFile(filePath, 'utf-8');
		return new NextResponse(content, {
			headers: {
				'Content-Type': 'text/markdown',
				'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
			},
		});
	} catch (error) {
		console.error('Failed to read markdown file:', error);
		return NextResponse.json({ error: 'File not found' }, { status: 404 });
	}
}
