import { NextResponse } from 'next/server';
import { getAllCounts, getVoterState } from '@/lib/votes';
import { getVoterId } from '@/lib/voter-cookie';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
	try {
		const voterId = await getVoterId();
		const counts = getAllCounts();
		const voted = getVoterState(voterId);
		return NextResponse.json({ counts, voted });
	} catch (error) {
		console.error('[roadmap/votes] failed:', error);
		return NextResponse.json({ counts: {}, voted: {} }, { status: 200 });
	}
}
