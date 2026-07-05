import { NextResponse } from 'next/server';
import { buildSearchIndex } from '@/lib/content';

export const dynamic = 'force-static';

export async function GET() {
	try {
		const searchIndex = await buildSearchIndex();
		
		return NextResponse.json(searchIndex, {
			headers: {
				'Cache-Control': 'public, max-age=3600, s-maxage=3600',
			},
		});
	} catch (error) {
		console.error('Error building search index:', error);
		return NextResponse.json(
			{ error: 'Failed to build search index' },
			{ status: 500 }
		);
	}
}

