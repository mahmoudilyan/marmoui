'use client';

import { ReactNode } from 'react';

/**
 * Client-only wrapper for interactive previews
 * Renders children on the client side to avoid serialization issues with onClick handlers
 */
interface ClientOnlyPreviewProps {
	children: ReactNode;
}

export function ClientOnlyPreview({ children }: ClientOnlyPreviewProps) {
	return <>{children}</>;
}
