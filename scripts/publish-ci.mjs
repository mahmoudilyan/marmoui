#!/usr/bin/env node
/**
 * CI publish: for each publishable package, `npm publish` directly when the
 * local version isn't on the registry yet. npm >= 11.5 handles OIDC Trusted
 * Publishing natively; going through pnpm/changesets wrappers drops the
 * credential exchange. Tags via `changeset tag` afterward so changesets/action
 * still creates GitHub Releases.
 */

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const PACKAGES = ['packages/ui', 'packages/cli'];

let publishedAny = false;
const published = [];

for (const dir of PACKAGES) {
	const pkg = JSON.parse(readFileSync(`${dir}/package.json`, 'utf8'));
	let registryVersions = [];
	try {
		const out = execSync(`npm view ${pkg.name} versions --json`, { encoding: 'utf8' });
		const parsed = JSON.parse(out);
		registryVersions = Array.isArray(parsed) ? parsed : [parsed];
	} catch {
		// 404 — package never published; publish below.
	}

	if (registryVersions.includes(pkg.version)) {
		console.log(`skip ${pkg.name}@${pkg.version} (already on registry)`);
		continue;
	}

	console.log(`publishing ${pkg.name}@${pkg.version}…`);
	execSync('npm publish --access public --provenance', { cwd: dir, stdio: 'inherit' });
	published.push({ name: pkg.name, version: pkg.version });
	publishedAny = true;
}

if (publishedAny) {
	execSync('pnpm exec changeset tag', { stdio: 'inherit' });
	execSync('git push origin --tags', { stdio: 'inherit' });
}

// Expose results for the Sanity step (same shape changesets/action outputs).
console.log(`PUBLISHED_PACKAGES_JSON=${JSON.stringify(published)}`);
if (process.env.GITHUB_OUTPUT) {
	execSync(
		`echo 'publishedPackages=${JSON.stringify(published)}' >> "$GITHUB_OUTPUT"; echo 'published=${publishedAny}' >> "$GITHUB_OUTPUT"`,
		{ shell: '/bin/bash' }
	);
}
