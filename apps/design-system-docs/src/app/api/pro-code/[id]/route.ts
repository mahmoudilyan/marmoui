import { NextResponse, type NextRequest } from 'next/server';
import { getEntitlement } from '@/lib/entitlement';

export const dynamic = 'force-dynamic';

/**
 * In-file placeholder map of Pro snippet sources keyed by id.
 *
 * TODO(platform): load Pro snippet source from server storage (e.g. a Supabase
 * table / bucket, or the filesystem at build time) instead of this inline map.
 * The point of this route is the delivery model: the source never reaches the
 * client unless `getEntitlement()` reports a paid plan.
 */
const PRO_SNIPPETS: Record<string, { lang: string; code: string }> = {
	'example-dashboard': {
		lang: 'tsx',
		code: `import { Card, CardContent, CardHeader, CardTitle } from '@marmoui/ui';

export function ExampleDashboard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Revenue</CardTitle>
			</CardHeader>
			<CardContent>$128,400</CardContent>
		</Card>
	);
}
`,
	},
};

/**
 * GET /api/pro-code/[id]
 *
 * Returns the source code for a Pro snippet — but only to a paying, signed-in
 * user. Free/unauthenticated visitors get 403 and never receive the bytes.
 */
export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { plan } = await getEntitlement();

	if (plan !== 'pro') {
		return NextResponse.json(
			{ error: 'Pro plan required to access this snippet.' },
			{ status: 403 }
		);
	}

	const { id } = await params;
	const snippet = PRO_SNIPPETS[id];

	if (!snippet) {
		return NextResponse.json({ error: 'Snippet not found.' }, { status: 404 });
	}

	return NextResponse.json({ id, lang: snippet.lang, code: snippet.code });
}
