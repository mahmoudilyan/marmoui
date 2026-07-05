import 'server-only';
import { cookies } from 'next/headers';
import { randomUUID } from 'node:crypto';

export const VOTER_COOKIE = 'dsd-voter';
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function getVoterId(): Promise<string> {
	const store = await cookies();
	const existing = store.get(VOTER_COOKIE)?.value;
	if (existing) return existing;

	const id = randomUUID();
	store.set(VOTER_COOKIE, id, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: ONE_YEAR,
	});
	return id;
}
