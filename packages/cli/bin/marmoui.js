#!/usr/bin/env node
/**
 * marmoui — set up Marmo UI for your AI agent.
 *
 *   npx marmoui init            configure every detected client in this project
 *   npx marmoui init --token X  include a Pro bearer token
 *   npx marmoui init --global   also write user-level configs (~/.cursor, …)
 *
 * Zero dependencies. Writes/merges the marmo-ui MCP server entry into each
 * client's config file and never touches anything else in those files.
 */

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const MCP_URL = process.env.MARMO_MCP_URL || 'https://mcp.marmoui.com/mcp';

const args = process.argv.slice(2);
const command = args.find(a => !a.startsWith('-')) || 'help';
const flags = new Set(args.filter(a => a.startsWith('--')));
const tokenIdx = args.indexOf('--token');
const token = tokenIdx !== -1 ? args[tokenIdx + 1] : process.env.MARMO_MCP_TOKEN;

const ESC = '\u001b';
const bold = s => `${ESC}[1m${s}${ESC}[0m`;
const dim = s => `${ESC}[2m${s}${ESC}[0m`;
const green = s => `${ESC}[32m${s}${ESC}[0m`;
const violet = s => `${ESC}[35m${s}${ESC}[0m`;

function serverEntry() {
	const entry = { url: MCP_URL };
	if (token) entry.headers = { Authorization: `Bearer ${token}` };
	return entry;
}

/** stdio bridge for clients that don't speak streamable HTTP */
function stdioEntry() {
	const cliArgs = ['-y', 'mcp-remote', MCP_URL];
	if (token) cliArgs.push('--header', `Authorization: Bearer ${token}`);
	return { command: 'npx', args: cliArgs };
}

function mergeJsonFile(file, build) {
	let data = {};
	if (fs.existsSync(file)) {
		try {
			data = JSON.parse(fs.readFileSync(file, 'utf8'));
		} catch {
			console.error(`  skip ${file} — existing file is not valid JSON`);
			return false;
		}
	}
	build(data);
	fs.mkdirSync(path.dirname(file), { recursive: true });
	fs.writeFileSync(file, `${JSON.stringify(data, null, '\t')}\n`);
	return true;
}

const cwd = process.cwd();
const home = os.homedir();

/** Each target: name, config path, and how to place the server entry. */
const targets = [
	{
		name: 'Claude Code',
		file: path.join(cwd, '.mcp.json'),
		write: data => {
			data.mcpServers = data.mcpServers || {};
			data.mcpServers['marmo-ui'] = { type: 'http', ...serverEntry() };
		},
	},
	{
		name: 'Cursor',
		file: path.join(cwd, '.cursor', 'mcp.json'),
		write: data => {
			data.mcpServers = data.mcpServers || {};
			data.mcpServers['marmo-ui'] = serverEntry();
		},
	},
	{
		name: 'VS Code (Copilot)',
		file: path.join(cwd, '.vscode', 'mcp.json'),
		write: data => {
			data.servers = data.servers || {};
			data.servers['marmo-ui'] = { type: 'http', ...serverEntry() };
		},
	},
	{
		name: 'Windsurf',
		file: path.join(home, '.codeium', 'windsurf', 'mcp_config.json'),
		global: true,
		write: data => {
			data.mcpServers = data.mcpServers || {};
			data.mcpServers['marmo-ui'] = stdioEntry();
		},
	},
	{
		name: 'Gemini CLI',
		file: path.join(cwd, '.gemini', 'settings.json'),
		write: data => {
			data.mcpServers = data.mcpServers || {};
			data.mcpServers['marmo-ui'] = { httpUrl: MCP_URL, ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}) };
		},
	},
];

function init() {
	console.log(`\n${violet('◆')} ${bold('Marmo UI')} — connecting your agents\n`);
	const written = [];
	for (const t of targets) {
		if (t.global && !flags.has('--global')) continue;
		if (mergeJsonFile(t.file, t.write)) {
			written.push(t);
			console.log(`  ${green('✓')} ${t.name.padEnd(18)} ${dim(path.relative(cwd, t.file) || t.file)}`);
		}
	}
	console.log(`\n  ${dim('Codex:')}  codex mcp add marmo-ui --url ${MCP_URL}`);
	console.log(`\n  ${bold('Claude Code users')} ${dim('— the plugin adds skills + /marmo-ui:* commands on top:')}`);
	console.log(dim('    /plugin marketplace add mahmoudilyan/marmo-ui'));
	console.log(dim('    /plugin install marmo-ui@marmoui-plugins'));
	if (!flags.has('--global')) console.log(`  ${dim('Windsurf (user-level): rerun with --global')}`);
	console.log(`\n${bold('Next')}: restart your agent, then try`);
	console.log(dim('  "Build a billing dashboard with Marmo UI."'));
	if (!token) console.log(`\n${dim('Pro token? npx marmoui init --token <token>  ·  get one at marmoui.com/connect')}`);
	console.log('');
}

function help() {
	console.log(`
${violet('◆')} ${bold('marmoui')} — set up Marmo UI for your AI agent

Usage:
  npx marmoui init              configure detected clients in this project
  npx marmoui init --token X    include your Pro token (on-brand generation)
  npx marmoui init --global     also write user-level configs (Windsurf)

Docs: https://marmoui.com/docs/introduction/install-agent
`);
}

if (command === 'init' || command === 'add') init();
else help();
