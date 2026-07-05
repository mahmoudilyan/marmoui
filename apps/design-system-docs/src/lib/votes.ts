import 'server-only';
import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_DB_PATH = path.join(process.cwd(), 'data', 'votes.db');
const DB_PATH = process.env.VOTES_DB_PATH ?? DEFAULT_DB_PATH;

let dbInstance: Database.Database | null = null;

function getDb(): Database.Database {
	if (dbInstance) return dbInstance;

	const dir = path.dirname(DB_PATH);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	const db = new Database(DB_PATH);
	db.pragma('journal_mode = WAL');
	db.pragma('synchronous = NORMAL');
	db.exec(`
		CREATE TABLE IF NOT EXISTS roadmap_votes (
			card_id TEXT NOT NULL,
			voter_id TEXT NOT NULL,
			created_at INTEGER NOT NULL,
			PRIMARY KEY (card_id, voter_id)
		);
		CREATE INDEX IF NOT EXISTS idx_roadmap_votes_card ON roadmap_votes(card_id);
	`);

	dbInstance = db;
	return db;
}

export type VoteCounts = Record<string, number>;
export type VoterState = Record<string, boolean>;

export function getAllCounts(): VoteCounts {
	const rows = getDb()
		.prepare(`SELECT card_id, COUNT(*) AS count FROM roadmap_votes GROUP BY card_id`)
		.all() as Array<{ card_id: string; count: number }>;

	const counts: VoteCounts = {};
	for (const row of rows) counts[row.card_id] = row.count;
	return counts;
}

export function getVoterState(voterId: string): VoterState {
	const rows = getDb()
		.prepare(`SELECT card_id FROM roadmap_votes WHERE voter_id = ?`)
		.all(voterId) as Array<{ card_id: string }>;

	const state: VoterState = {};
	for (const row of rows) state[row.card_id] = true;
	return state;
}

export function getCardCount(cardId: string): number {
	const row = getDb()
		.prepare(`SELECT COUNT(*) AS count FROM roadmap_votes WHERE card_id = ?`)
		.get(cardId) as { count: number };
	return row.count;
}

export type ToggleResult = { voted: boolean; count: number };

export function toggleVote(cardId: string, voterId: string): ToggleResult {
	const db = getDb();
	const tx = db.transaction(() => {
		const existing = db
			.prepare(`SELECT 1 FROM roadmap_votes WHERE card_id = ? AND voter_id = ?`)
			.get(cardId, voterId);

		if (existing) {
			db.prepare(`DELETE FROM roadmap_votes WHERE card_id = ? AND voter_id = ?`).run(
				cardId,
				voterId
			);
			return false;
		}

		db.prepare(
			`INSERT INTO roadmap_votes (card_id, voter_id, created_at) VALUES (?, ?, ?)`
		).run(cardId, voterId, Date.now());
		return true;
	});

	const voted = tx();
	const count = getCardCount(cardId);
	return { voted, count };
}
