'use client';

import * as React from 'react';
import { MdArrowUpward } from 'react-icons/md';
import { cn } from '@/lib/utils';

type VotesPayload = {
	counts: Record<string, number>;
	voted: Record<string, boolean>;
};

type VotingContextValue = {
	getCount: (cardId: string) => number;
	hasVoted: (cardId: string) => boolean;
	toggle: (cardId: string) => Promise<void>;
	pending: Record<string, boolean>;
	loaded: boolean;
};

const VotingContext = React.createContext<VotingContextValue | null>(null);

export function RoadmapVotingProvider({ children }: { children: React.ReactNode }) {
	const [counts, setCounts] = React.useState<Record<string, number>>({});
	const [voted, setVoted] = React.useState<Record<string, boolean>>({});
	const [pending, setPending] = React.useState<Record<string, boolean>>({});
	const [loaded, setLoaded] = React.useState(false);

	React.useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const res = await fetch('/api/roadmap/votes', { cache: 'no-store' });
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const data = (await res.json()) as VotesPayload;
				if (cancelled) return;
				setCounts(data.counts ?? {});
				setVoted(data.voted ?? {});
			} catch (err) {
				console.error('Failed to load roadmap votes', err);
			} finally {
				if (!cancelled) setLoaded(true);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	const toggle = React.useCallback(async (cardId: string) => {
		setPending(prev => ({ ...prev, [cardId]: true }));

		let previousVoted = false;
		setVoted(prev => {
			previousVoted = Boolean(prev[cardId]);
			const nextVoted = !previousVoted;
			setCounts(c => ({
				...c,
				[cardId]: Math.max(0, (c[cardId] ?? 0) + (nextVoted ? 1 : -1)),
			}));
			return { ...prev, [cardId]: nextVoted };
		});

		try {
			const res = await fetch('/api/roadmap/vote', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ cardId }),
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = (await res.json()) as { voted: boolean; count: number };
			setVoted(prev => ({ ...prev, [cardId]: data.voted }));
			setCounts(prev => ({ ...prev, [cardId]: data.count }));
		} catch (err) {
			console.error('Vote failed; reverting', err);
			setVoted(prev => ({ ...prev, [cardId]: previousVoted }));
			setCounts(prev => ({
				...prev,
				[cardId]: Math.max(0, (prev[cardId] ?? 0) + (previousVoted ? 1 : -1)),
			}));
		} finally {
			setPending(prev => {
				const next = { ...prev };
				delete next[cardId];
				return next;
			});
		}
	}, []);

	const value = React.useMemo<VotingContextValue>(
		() => ({
			getCount: (id) => counts[id] ?? 0,
			hasVoted: (id) => Boolean(voted[id]),
			toggle,
			pending,
			loaded,
		}),
		[counts, voted, toggle, pending, loaded]
	);

	return <VotingContext.Provider value={value}>{children}</VotingContext.Provider>;
}

function useVoting(): VotingContextValue {
	const ctx = React.useContext(VotingContext);
	if (!ctx) {
		return {
			getCount: () => 0,
			hasVoted: () => false,
			toggle: async () => {},
			pending: {},
			loaded: false,
		};
	}
	return ctx;
}

export function VoteButton({ cardId, label }: { cardId: string; label?: string }) {
	const { getCount, hasVoted, toggle, pending, loaded } = useVoting();
	const count = getCount(cardId);
	const voted = hasVoted(cardId);
	const isPending = Boolean(pending[cardId]);
	const accessibleLabel = label ?? (voted ? `Remove vote (${count})` : `Vote (${count})`);

	return (
		<button
			type="button"
			onClick={() => {
				if (!isPending) void toggle(cardId);
			}}
			aria-pressed={voted}
			aria-label={accessibleLabel}
			disabled={isPending}
			className={cn(
				'inline-flex min-h-7 min-w-13 items-center justify-center gap-0.5 rounded-full border px-2 py-0.5 text-xs font-medium tabular-nums transition-colors',
				'border-border-secondary bg-secondary/60 text-ink-light hover:bg-secondary',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				voted &&
					'border-ink-primary/30 bg-ink-primary/10 text-ink-primary',
				isPending && 'opacity-60'
			)}
		>
			<MdArrowUpward aria-hidden className="size-3.5" />
			<span aria-hidden="true">{loaded ? count : '·'}</span>
		</button>
	);
}
