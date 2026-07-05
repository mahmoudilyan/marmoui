import 'server-only';
import { getServiceClient } from '@/lib/platform/supabase';

/**
 * Roadmap voting, backed by the Supabase `roadmap_votes` table (see
 * marmo-platform migration 0004_roadmap_votes.sql). Serverless-safe — no
 * local filesystem. When Supabase env is absent (local dev without secrets),
 * reads return empty and toggles no-op with `voted: false`.
 */

export type VoteCounts = Record<string, number>;
export type VoterState = Record<string, boolean>;
export type ToggleResult = { voted: boolean; count: number };

export async function getAllCounts(): Promise<VoteCounts> {
	const client = getServiceClient();
	if (!client) return {};

	const { data, error } = await client.from('roadmap_votes').select('card_id');
	if (error || !data) return {};

	const counts: VoteCounts = {};
	for (const row of data as Array<{ card_id: string }>) {
		counts[row.card_id] = (counts[row.card_id] ?? 0) + 1;
	}
	return counts;
}

export async function getVoterState(voterId: string): Promise<VoterState> {
	const client = getServiceClient();
	if (!client) return {};

	const { data, error } = await client
		.from('roadmap_votes')
		.select('card_id')
		.eq('voter_id', voterId);
	if (error || !data) return {};

	const state: VoterState = {};
	for (const row of data as Array<{ card_id: string }>) state[row.card_id] = true;
	return state;
}

export async function getCardCount(cardId: string): Promise<number> {
	const client = getServiceClient();
	if (!client) return 0;

	const { count, error } = await client
		.from('roadmap_votes')
		.select('*', { count: 'exact', head: true })
		.eq('card_id', cardId);
	return error ? 0 : (count ?? 0);
}

export async function toggleVote(cardId: string, voterId: string): Promise<ToggleResult> {
	const client = getServiceClient();
	if (!client) return { voted: false, count: 0 };

	const { data: existing } = await client
		.from('roadmap_votes')
		.select('card_id')
		.eq('card_id', cardId)
		.eq('voter_id', voterId)
		.maybeSingle();

	if (existing) {
		await client.from('roadmap_votes').delete().eq('card_id', cardId).eq('voter_id', voterId);
	} else {
		// Unique (card_id, voter_id) makes double-submits idempotent.
		await client
			.from('roadmap_votes')
			.upsert({ card_id: cardId, voter_id: voterId }, { onConflict: 'card_id,voter_id' });
	}

	return { voted: !existing, count: await getCardCount(cardId) };
}
