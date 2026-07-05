import * as fs from 'fs';
import * as path from 'path';
import {
	Project,
	Node,
	SyntaxKind,
	FunctionDeclaration,
	VariableStatement,
	ArrowFunction,
	FunctionExpression,
	Symbol as TsSymbol,
	Type,
	ParameterDeclaration,
	ObjectBindingPattern,
} from 'ts-morph';

interface PropInfo {
	name: string;
	type: string;
	required: boolean;
	description?: string;
	defaultValue?: string;
}

interface ComponentProps {
	[componentName: string]: {
		props: PropInfo[];
		description?: string;
	};
}

import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

/**
 * Files whose exports are **not** part of the public `@marmoui/ui` API.
 * These are skipped because they either (a) duplicate an interface name
 * with a public component and would override it, or (b) define private
 * helpers that should never surface in docs / MCP responses.
 */
const SKIPPED_COMPONENT_FILES = new Set<string>(['main-content.tsx']);

/**
 * Props that the type checker surfaces on most React components (via
 * `HTMLAttributes` / `ref` / `key`) but which we do NOT want to flood the
 * component-level prop docs with. The MCP validator handles these pass-
 * through props separately; listing them all would drown the real,
 * author-declared props in noise.
 */
const NOISE_PROP_PATTERNS: RegExp[] = [
	/^aria-/,
	/^data-/,
	// React internals
	/^(key|ref|dangerouslySetInnerHTML|suppressContentEditableWarning|suppressHydrationWarning|defaultChecked|defaultValue)$/,
	// Low-level DOM attributes we don't need to document at component level
	/^(accessKey|autoCapitalize|autoCorrect|autoFocus|autoSave|color|contentEditable|contextMenu|dir|draggable|enterKeyHint|hidden|inert|inputMode|is|itemID|itemProp|itemRef|itemScope|itemType|lang|nonce|popover|radioGroup|rel|slot|spellCheck|tabIndex|title|translate|typeof|unselectable|vocab|about|datatype|inlist|prefix|property|resource|typeof|results|security|unselectable)$/,
	// Exhaustive on* event handlers — too many, too noisy
	/^on[A-Z].*/,
];

function isNoiseProp(name: string): boolean {
	return NOISE_PROP_PATTERNS.some(re => re.test(name));
}

function collectComponentFiles(dir: string): string[] {
	const results: string[] = [];

	for (const entry of fs.readdirSync(dir)) {
		const fullPath = path.join(dir, entry);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			results.push(...collectComponentFiles(fullPath));
		} else if (
			entry.endsWith('.tsx') &&
			!entry.includes('.stories') &&
			!entry.includes('-example') &&
			!entry.includes('safelist') &&
			!fullPath.includes('/icons/') &&
			!SKIPPED_COMPONENT_FILES.has(entry)
		) {
			results.push(fullPath);
		}
	}

	return results;
}

function cleanType(raw: string): string {
	// Strip absolute import() paths: import("/abs/path").TypeName → TypeName
	return raw.replace(/import\("[^"]+"\)\./g, '');
}

function truncateType(raw: string): string {
	return raw.length > 200 ? raw.slice(0, 200) + '...' : raw;
}

/**
 * Heuristic: does this symbol's declared type indicate it is an optional
 * property? ts-morph's `isOptional` flag is reliable for PropertySignatures
 * on interfaces/types, but when the Type is composed (e.g. via intersection
 * with HTMLAttributes) it can return false even when the underlying decl
 * has a `?` token. We explicitly inspect declaration nodes too.
 */
function isSymbolOptional(symbol: TsSymbol): boolean {
	if (symbol.isOptional()) return true;
	for (const decl of symbol.getDeclarations()) {
		if (
			Node.isPropertySignature(decl) ||
			Node.isPropertyDeclaration(decl) ||
			Node.isBindingElement(decl) ||
			Node.isParameterDeclaration(decl)
		) {
			if ((decl as any).hasQuestionToken?.()) return true;
		}
	}
	return false;
}

/**
 * Extract default values from a destructured parameter pattern, e.g.
 *   function DataTable<T>({ pageSize = 10, size = 'md' }: TableProps<T>)
 *
 * Returns a map from prop name → source-text of its default initializer.
 * These are useful doc hints even when the underlying Props interface
 * lives in a separate file.
 */
function extractDestructuredDefaults(
	param: ParameterDeclaration
): Map<string, string> {
	const defaults = new Map<string, string>();
	const nameNode = param.getNameNode();
	if (!Node.isObjectBindingPattern(nameNode)) return defaults;

	for (const element of (nameNode as ObjectBindingPattern).getElements()) {
		const initializer = element.getInitializer();
		if (!initializer) continue;
		const propNameNode = element.getPropertyNameNode();
		const propName = propNameNode ? propNameNode.getText() : element.getName();
		defaults.set(propName, initializer.getText().trim());
	}
	return defaults;
}

/**
 * Gather properties from a TypeScript Type object and project them onto
 * `PropInfo[]`. Used when the component's props are declared externally
 * (e.g. `TableProps<T>` imported from `./types`).
 */
function collectPropsFromType(
	type: Type,
	contextNode: Node,
	defaults: Map<string, string>
): PropInfo[] {
	if (!type.isObject() && !type.isIntersection()) return [];
	const props: PropInfo[] = [];
	const seen = new Set<string>();

	for (const symbol of type.getProperties()) {
		const name = symbol.getName();
		if (seen.has(name)) continue;
		seen.add(name);
		if (isNoiseProp(name)) continue;

		const rawType = cleanType(symbol.getTypeAtLocation(contextNode).getText());
		const propType = truncateType(rawType);

		const decl = symbol.getDeclarations()[0];
		let description: string | undefined;
		if (decl && 'getJsDocs' in decl && typeof (decl as any).getJsDocs === 'function') {
			const jsDoc = (decl as any).getJsDocs()[0];
			description = jsDoc?.getDescription().trim() || undefined;
		}

		props.push({
			name,
			type: propType,
			required: !isSymbolOptional(symbol),
			description,
			defaultValue: defaults.get(name),
		});
	}
	return props;
}

/**
 * Inspects a function-like node (declaration or expression) and, if it
 * looks like a React component (first parameter = a props object),
 * returns the extracted PropInfo[] for it.
 */
function extractComponentProps(
	fn: FunctionDeclaration | ArrowFunction | FunctionExpression
): PropInfo[] | null {
	const params = fn.getParameters();
	if (params.length === 0) return null;
	const first = params[0];

	const type = first.getType();
	if (!type.isObject() && !type.isIntersection()) return null;

	const defaults = extractDestructuredDefaults(first);
	const props = collectPropsFromType(type, first, defaults);
	return props.length > 0 ? props : null;
}

/**
 * Given a component name (PascalCase identifier) from this source file,
 * walk its declarations to find the underlying function body we can
 * analyse. Supports:
 *   export function Name(props) { … }
 *   export const Name = (props) => { … }
 *   export const Name = React.forwardRef((props, ref) => { … })
 *   export const Name = React.memo(Name)
 */
function resolveComponentFunction(
	sourceFile: ReturnType<Project['addSourceFileAtPath']>,
	componentName: string
): FunctionDeclaration | ArrowFunction | FunctionExpression | null {
	const fn = sourceFile.getFunction(componentName);
	if (fn) return fn;

	const variable = sourceFile.getVariableDeclaration(componentName);
	if (!variable) return null;

	const initializer = variable.getInitializer();
	if (!initializer) return null;

	if (Node.isArrowFunction(initializer) || Node.isFunctionExpression(initializer)) {
		return initializer;
	}

	// React.forwardRef(...) / React.memo(...) / forwardRef(...) etc.
	if (Node.isCallExpression(initializer)) {
		const args = initializer.getArguments();
		for (const arg of args) {
			if (Node.isArrowFunction(arg) || Node.isFunctionExpression(arg)) {
				return arg;
			}
		}
	}
	return null;
}

/**
 * Enumerates every top-level exported component-like name in a source file.
 * A component is any PascalCase export that is either a function or a
 * variable initialized to a function (directly or via a wrapper call).
 */
function enumerateComponentNames(
	sourceFile: ReturnType<Project['addSourceFileAtPath']>
): string[] {
	const names = new Set<string>();

	for (const fn of sourceFile.getFunctions()) {
		if (!fn.isExported()) continue;
		const name = fn.getName();
		if (name && /^[A-Z]/.test(name)) names.add(name);
	}

	// export default function Name(...) — also pick up default named exports
	const defaultExport = sourceFile
		.getFunctions()
		.find(f => f.isDefaultExport() && f.getName() && /^[A-Z]/.test(f.getName()!));
	if (defaultExport && defaultExport.getName()) names.add(defaultExport.getName()!);

	for (const stmt of sourceFile.getVariableStatements()) {
		if (!(stmt as VariableStatement).isExported()) continue;
		for (const decl of stmt.getDeclarations()) {
			const name = decl.getName();
			if (!/^[A-Z]/.test(name)) continue;
			names.add(name);
		}
	}

	return [...names];
}

export function generatePropsDocumentation() {
	const project = new Project({
		tsConfigFilePath: path.resolve(__dirname, '../../../packages/ui/tsconfig.json'),
	});

	const componentsDir = path.resolve(__dirname, '../../../packages/ui/src/components');
	const outputPath = path.resolve(__dirname, '../src/data/component-props.json');

	const componentProps: ComponentProps = {};
	const propsOrigin: Record<string, 'interface' | 'type-alias' | 'function-param'> = {};

	const componentFiles = collectComponentFiles(componentsDir);

	// ─── Pass 1: interfaces + type aliases ending in Props ───────────────────
	// Preserves existing behaviour: the canonical source for most components.
	componentFiles.forEach(filePath => {
		const sourceFile = project.addSourceFileAtPath(filePath);

		sourceFile.getInterfaces().forEach(interfaceDecl => {
			const interfaceName = interfaceDecl.getName();
			if (!interfaceName.endsWith('Props')) return;
			const componentName = interfaceName.replace(/Props$/, '');

			const type = interfaceDecl.getType();
			const props = collectPropsFromType(type, interfaceDecl, new Map());

			// Layer explicit JSDoc descriptions + defaults from the direct
			// property declarations — these are higher-fidelity than what we
			// can recover from an expanded Type.
			interfaceDecl.getProperties().forEach(prop => {
				const propName = prop.getName();
				const match = props.find(p => p.name === propName);
				if (!match) return;
				const jsDoc = prop.getJsDocs()[0];
				const description = jsDoc?.getDescription().trim() || match.description;
				const defaultTag = jsDoc?.getTags().find(tag => tag.getTagName() === 'default');
				const defaultValue = defaultTag?.getComment()?.toString() || match.defaultValue;
				match.description = description;
				match.defaultValue = defaultValue;
			});

			if (props.length > 0) {
				componentProps[componentName] = {
					props,
					description: interfaceDecl.getJsDocs()[0]?.getDescription().trim(),
				};
				propsOrigin[componentName] = 'interface';
			}
		});

		sourceFile.getTypeAliases().forEach(typeAlias => {
			const typeName = typeAlias.getName();
			if (!typeName.endsWith('Props')) return;
			const componentName = typeName.replace(/Props$/, '');
			if (componentProps[componentName]) return;

			const type = typeAlias.getType();
			const props = collectPropsFromType(type, typeAlias, new Map());
			if (props.length > 0) {
				componentProps[componentName] = {
					props,
					description: typeAlias.getJsDocs()[0]?.getDescription().trim(),
				};
				propsOrigin[componentName] = 'type-alias';
			}
		});
	});

	// ─── Pass 2: component functions without a matching Props interface ──────
	// Covers components whose props type lives in a separate file or is
	// declared inline on the parameter — most notably DataTable<T> which uses
	// TableProps<T> from './types'. By walking the function parameter's Type
	// we pick up the real props the TypeScript compiler sees, including
	// cross-file references and generics.
	componentFiles.forEach(filePath => {
		const sourceFile = project.getSourceFile(filePath);
		if (!sourceFile) return;

		for (const name of enumerateComponentNames(sourceFile)) {
			if (componentProps[name] && componentProps[name].props.length > 0) continue;

			const fn = resolveComponentFunction(sourceFile, name);
			if (!fn) continue;
			const props = extractComponentProps(fn);
			if (!props) continue;

			componentProps[name] = { props };
			propsOrigin[name] = 'function-param';
		}
	});

	// Ensure output directory exists
	const outputDir = path.dirname(outputPath);
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	fs.writeFileSync(outputPath, JSON.stringify(componentProps, null, 2));

	console.log(`✅ Generated props for ${Object.keys(componentProps).length} components`);
	const viaParam = Object.values(propsOrigin).filter(o => o === 'function-param').length;
	console.log(
		`   interface: ${Object.values(propsOrigin).filter(o => o === 'interface').length}` +
			`, type-alias: ${Object.values(propsOrigin).filter(o => o === 'type-alias').length}` +
			`, function-param: ${viaParam}`
	);
	console.log(`📝 Output: ${outputPath}`);

	return componentProps;
}

if (require.main === module) {
	generatePropsDocumentation();
}
