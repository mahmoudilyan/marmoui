import { type EmailOtpType } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

/**
 * GET /auth/confirm?token_hash=…&type=email&next=/welcome
 *
 * Magic-link landing: verifies the OTP token hash and establishes the Supabase
 * session cookies, then redirects to `next`. The Supabase email template must
 * link here:
 *
 *   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/welcome
 */
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const tokenHash = searchParams.get('token_hash');
	const type = searchParams.get('type') as EmailOtpType | null;
	const nextPath = searchParams.get('next') ?? '/welcome';

	// Only allow same-origin relative redirects.
	const safeNext = nextPath.startsWith('/') && !nextPath.startsWith('//') ? nextPath : '/welcome';

	const redirectTo = (path: string) => NextResponse.redirect(new URL(path, request.url));

	if (!tokenHash || !type) {
		return redirectTo('/welcome?error=missing-token');
	}

	const supabase = await getSupabaseServerClient();
	if (!supabase) {
		return redirectTo('/welcome?error=auth-not-configured');
	}

	const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
	if (error) {
		console.warn('[auth] verifyOtp failed:', error.message);
		return redirectTo('/welcome?error=invalid-or-expired');
	}

	return redirectTo(safeNext);
}
