import { NextResponse, type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * RFC 8414 authorization-server metadata. MCP clients (Claude Code et al.)
 * discover the authorize/token/register endpoints here, pointed at by the
 * MCP server's /.well-known/oauth-protected-resource.
 */
export async function GET(request: NextRequest) {
	const origin = new URL(request.url).origin;
	return NextResponse.json(
		{
			issuer: origin,
			authorization_endpoint: `${origin}/oauth/authorize`,
			token_endpoint: `${origin}/api/oauth/token`,
			registration_endpoint: `${origin}/api/oauth/register`,
			response_types_supported: ['code'],
			grant_types_supported: ['authorization_code'],
			code_challenge_methods_supported: ['S256'],
			token_endpoint_auth_methods_supported: ['none'],
			scopes_supported: ['mcp'],
		},
		{ headers: { 'Cache-Control': 'public, max-age=3600' } }
	);
}
