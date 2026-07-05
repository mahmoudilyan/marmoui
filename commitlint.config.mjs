/**
 * Conventional Commits, enforced by the .husky/commit-msg hook.
 * type(scope): subject — e.g. `feat(ui): add DataTable row selection`
 */
export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// Monorepo scopes; keep in sync with CONTRIBUTING.md.
		'scope-enum': [
			1,
			'always',
			['ui', 'cli', 'docs', 'mcp', 'plugin', 'platform', 'deps', 'release', 'repo'],
		],
		'subject-case': [0],
		'body-max-line-length': [0],
	},
};
