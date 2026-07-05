import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { upsertAccountEntitlement, isPlatformConfigured } from '@/lib/platform/entitlements';
import type { Plan } from '@/lib/entitlement';

export const dynamic = 'force-dynamic';
// The webhook must read the *raw* body for signature verification, so disable
// any body parsing assumptions by running on the Node.js runtime.
export const runtime = 'nodejs';

/**
 * POST /api/webhooks/lemonsqueezy
 *
 * Receives Lemon Squeezy store webhooks and translates paid orders /
 * subscriptions into Marmo entitlements:
 *   - active paid order / subscription → entitlement.plan = 'pro'
 *   - cancellation / expiry            → entitlement.plan = 'free'
 *
 * Security: verifies the `X-Signature` HMAC-SHA256 of the raw body against
 * `LEMONSQUEEZY_WEBHOOK_SECRET` with a constant-time compare. Mismatch → 401.
 *
 * TODO(platform): production hardening —
 *   - Idempotency: persist the event id and skip already-processed events so
 *     provider retries can't flip entitlement state.
 *   - Retries/observability: return 5xx (so Lemon Squeezy retries) on transient
 *     Supabase failures, and emit structured logs / metrics per event.
 */

/** Lemon Squeezy subscription statuses that should grant Pro access. */
const ACTIVE_SUBSCRIPTION_STATUSES = new Set(['active', 'on_trial', 'past_due']);

interface LemonSqueezyAttributes {
	user_email?: string;
	status?: string;
	order_id?: number | string;
}

interface LemonSqueezyPayload {
	meta?: { event_name?: string };
	data?: {
		id?: string;
		attributes?: LemonSqueezyAttributes;
	};
	// Some payloads inline the object fields at the top level.
	id?: string;
	attributes?: LemonSqueezyAttributes;
}

function verifySignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
	if (!signatureHeader) return false;

	const digest = Buffer.from(
		createHmac('sha256', secret).update(rawBody).digest('hex'),
		'utf8'
	);
	const signature = Buffer.from(signatureHeader, 'utf8');

	// timingSafeEqual throws if the buffers differ in length; guard first.
	if (digest.length !== signature.length) return false;
	return timingSafeEqual(digest, signature);
}

export async function POST(request: NextRequest) {
	const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
	if (!secret) {
		// No secret configured: refuse to process (we can't trust the payload).
		console.warn('[lemonsqueezy] webhook hit but LEMONSQUEEZY_WEBHOOK_SECRET is unset');
		return NextResponse.json({ error: 'Webhook not configured.' }, { status: 503 });
	}

	const rawBody = await request.text();
	if (!verifySignature(rawBody, request.headers.get('x-signature'), secret)) {
		return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
	}

	let payload: LemonSqueezyPayload;
	try {
		payload = JSON.parse(rawBody) as LemonSqueezyPayload;
	} catch {
		return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
	}

	const eventName = payload.meta?.event_name ?? request.headers.get('x-event-name') ?? '';
	const attributes = payload.data?.attributes ?? payload.attributes ?? {};
	const objectId = payload.data?.id ?? payload.id;
	const email = attributes.user_email;

	if (!email) {
		return NextResponse.json({ error: 'Missing user_email in payload.' }, { status: 400 });
	}

	// Determine the resulting plan + Lemon Squeezy linkage for this event.
	let plan: Plan = 'free';
	let lemonsqueezyOrderId: string | null = null;
	let lemonsqueezySubscriptionId: string | null = null;

	switch (eventName) {
		case 'order_created': {
			// A one-time / initial paid order. 'paid' (or 'refunded' inverse) status.
			plan = attributes.status === 'refunded' ? 'free' : 'pro';
			lemonsqueezyOrderId = objectId ?? null;
			break;
		}
		case 'subscription_created':
		case 'subscription_updated':
		case 'subscription_resumed': {
			plan = ACTIVE_SUBSCRIPTION_STATUSES.has(attributes.status ?? '') ? 'pro' : 'free';
			lemonsqueezySubscriptionId = objectId ?? null;
			lemonsqueezyOrderId = attributes.order_id != null ? String(attributes.order_id) : null;
			break;
		}
		case 'subscription_cancelled':
		case 'subscription_expired':
		case 'subscription_paused':
		case 'order_refunded': {
			plan = 'free';
			if (eventName === 'order_refunded') {
				lemonsqueezyOrderId = objectId ?? null;
			} else {
				lemonsqueezySubscriptionId = objectId ?? null;
			}
			break;
		}
		default: {
			// Unhandled event: acknowledge so Lemon Squeezy doesn't retry forever.
			return NextResponse.json({ ok: true, ignored: eventName }, { status: 200 });
		}
	}

	if (!isPlatformConfigured()) {
		// Signature verified but no Supabase to persist to (e.g. preview env).
		// Acknowledge so the provider doesn't retry; log for visibility.
		console.warn(
			`[lemonsqueezy] verified ${eventName} for ${email} → ${plan}, but Supabase env is unset; skipping persist`
		);
		return NextResponse.json({ ok: true, persisted: false, plan }, { status: 200 });
	}

	const account = await upsertAccountEntitlement({
		email,
		plan,
		source: 'lemonsqueezy',
		lemonsqueezyOrderId,
		lemonsqueezySubscriptionId,
		status: attributes.status ?? null,
	});

	if (!account) {
		// Persist failed — return 500 so Lemon Squeezy retries the delivery.
		return NextResponse.json({ error: 'Failed to persist entitlement.' }, { status: 500 });
	}

	return NextResponse.json({ ok: true, persisted: true, plan }, { status: 200 });
}
