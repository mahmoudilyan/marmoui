/**
 * Minimal brand marks for the agents/editors Marmo works in. Hand-drawn
 * simplifications (not official assets) — recognizable silhouette + brand hue.
 */

function ClaudeMark() {
	// Anthropic-style starburst
	return (
		<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
			{Array.from({ length: 8 }).map((_, i) => (
				<rect
					key={i}
					x="11"
					y="2.5"
					width="2"
					height="8"
					rx="1"
					fill="#D97757"
					transform={`rotate(${i * 45} 12 12)`}
				/>
			))}
		</svg>
	);
}

function CodexMark() {
	// OpenAI-style interlaced ring, simplified to 6 rotated lobes
	return (
		<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
			{Array.from({ length: 6 }).map((_, i) => (
				<path
					key={i}
					d="M12 3.2c2.6 0 4.7 1.6 4.7 4.2v4.2l-3.6-2.1"
					stroke="#0D0D0D"
					strokeWidth="1.7"
					strokeLinecap="round"
					strokeLinejoin="round"
					transform={`rotate(${i * 60} 12 12)`}
				/>
			))}
		</svg>
	);
}

function CursorMark() {
	// Cursor's 3D-cube mark, simplified
	return (
		<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
			<path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" fill="#111" />
			<path d="M12 2v10l9 5V7l-9-5z" fill="#555" />
			<path d="M12 12L3 7v10l9-5z" fill="#888" />
		</svg>
	);
}

function GeminiMark() {
	// Gemini four-point sparkle
	return (
		<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
			<path
				d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10z"
				fill="url(#gem-grad)"
			/>
			<defs>
				<linearGradient id="gem-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
					<stop stopColor="#4285F4" />
					<stop offset="1" stopColor="#9B72CB" />
				</linearGradient>
			</defs>
		</svg>
	);
}

function WindsurfMark() {
	return (
		<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
			<path d="M4 8c6-3 10-3 16-1-5 0-9 1.5-12 4L4 8z" fill="#0B100F" />
			<path d="M6 13c5-2.5 8.5-2.5 13-1-4 .2-7.5 1.5-10 3.6L6 13z" fill="#0B100F" opacity="0.75" />
			<path d="M8 18c4-2 6.5-2 10-1-3 .3-5.8 1.3-8 3l-2-2z" fill="#0B100F" opacity="0.5" />
		</svg>
	);
}

function VSCodeMark() {
	return (
		<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
			<path
				d="M17 3l4 2v14l-4 2-8.5-7.5L4 16l-2-1.5v-5L4 8l4.5 2.5L17 3z"
				fill="#0078D4"
			/>
			<path d="M17 7.5v9L11 12l6-4.5z" fill="#fff" opacity="0.35" />
		</svg>
	);
}

function ZedMark() {
	return (
		<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
			<path
				d="M5 4h13l-9.5 13H18v3H5.5L15 7H5V4z"
				fill="#084CCF"
			/>
		</svg>
	);
}

function ClineMark() {
	return (
		<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
			<rect x="4" y="7" width="16" height="12" rx="4" fill="#0D0D0D" />
			<circle cx="9.5" cy="13" r="1.6" fill="#fff" />
			<circle cx="14.5" cy="13" r="1.6" fill="#fff" />
			<path d="M12 3v4M9 3.5L12 7l3-3.5" stroke="#0D0D0D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
		</svg>
	);
}

export const agentTools = [
	{ name: 'Claude Code', mark: <ClaudeMark /> },
	{ name: 'Codex', mark: <CodexMark /> },
	{ name: 'Cursor', mark: <CursorMark /> },
	{ name: 'Gemini CLI', mark: <GeminiMark /> },
	{ name: 'Windsurf', mark: <WindsurfMark /> },
	{ name: 'VS Code', mark: <VSCodeMark /> },
	{ name: 'Zed', mark: <ZedMark /> },
	{ name: 'Cline', mark: <ClineMark /> },
];
