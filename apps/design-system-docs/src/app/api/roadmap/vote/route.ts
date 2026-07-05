import { NextRequest, NextResponse } from 'next/server';
import { toggleVote } from '@/lib/votes';
import { getVoterId } from '@/lib/voter-cookie';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const CARD_ID_PATTERN = /^[a-z0-9-]{1,64}$/;

export async function POST(request: NextRequest) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
	}

	const cardId = (body as { cardId?: unknown })?.cardId;
	if (typeof cardId !== 'string' || !CARD_ID_PATTERN.test(cardId)) {
		return NextResponse.json({ error: 'Invalid cardId' }, { status: 400 });
	}

	try {
		const voterId = await getVoterId();
		const result = toggleVote(cardId, voterId);
		return NextResponse.json(result);
	} catch (error) {
		console.error('[roadmap/vote] failed:', error);
		return NextResponse.json({ error: 'Vote failed' }, { status: 500 });
	}
}
