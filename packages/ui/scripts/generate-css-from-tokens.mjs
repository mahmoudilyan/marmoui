#!/usr/bin/env node
/**
 * Generates CSS custom properties from Figma Design Tokens JSON (Light + Dark).
 * Source: packages/ui/src/tokens/{light,dark}.tokens.json
 * Output: packages/ui/src/styles/figma-tokens.generated.css
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const lightPath = path.join(root, 'src/tokens/light.tokens.json');
const darkPath = path.join(root, 'src/tokens/dark.tokens.json');
const outPath = path.join(root, 'src/styles/figma-tokens.generated.css');

const SCALES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
const PALETTE_NAMES = [
  'red',
  'gray',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'primary',
  'pink',
];

function hexFromToken(token) {
  if (!token?.$value) return null;
  const v = token.$value;
  if (typeof v === 'string' && v.startsWith('{')) return null; // alias — resolved separately
  if (v.hex) return v.hex.toLowerCase();
  return null;
}

function buildPaletteMap(json) {
  const map = {};
  const palette = json.Palette ?? {};
  for (const name of PALETTE_NAMES) {
    const key = name.toLowerCase();
    const src = palette[name] ?? palette[name.charAt(0).toUpperCase() + name.slice(1)];
    if (!src) continue;
    map[key] = {};
    for (const step of SCALES) {
      const hex = hexFromToken(src[step]);
      if (hex) map[key][step] = hex;
    }
  }
  return map;
}

function getTokenValue(token, json, paletteMap) {
  if (!token?.$value) return null;
  const v = token.$value;
  if (typeof v === 'string' && v.startsWith('{')) {
    return resolveAlias(v, json, paletteMap);
  }
  return hexFromToken(token);
}

function resolveAlias(ref, json, paletteMap) {
  if (typeof ref !== 'string') return null;
  // e.g. "{Palette.Gray.50}" or "{Palette.Primary.600}"
  const m = ref.match(/^\{Palette\.(\w+)\.(\d+)\}$/);
  if (m) {
    const [, name, step] = m;
    const key = name.toLowerCase();
    return paletteMap[key]?.[step] ?? null;
  }
  const sem = ref.match(/^\{Palette\.(\w+)\.(\w+)\}$/);
  if (sem) {
    const [, group, tokenName] = sem;
    const src = json.Palette?.[group]?.[tokenName];
    if (src?.$value && typeof src.$value === 'string' && src.$value.startsWith('{')) {
      return resolveAlias(src.$value, json, paletteMap);
    }
    return hexFromToken(src);
  }
  return null;
}

function semanticVars(json, paletteMap) {
  const lines = [];
  const palette = json.Palette ?? {};

  const bgBase = getTokenValue(palette.Background?.Base, json, paletteMap)
    ?? paletteMap.gray?.['50'];
  const bgPanel = getTokenValue(palette.Background?.['Subtle-Highlight'], json, paletteMap) ?? '#ffffff';
  const inkDark = getTokenValue(palette.Text?.Dark, json, paletteMap);
  const inkBase = getTokenValue(palette.Text?.Base, json, paletteMap);
  const inkLight = getTokenValue(palette.Text?.Light, json, paletteMap);
  const inkMuted = getTokenValue(palette.Text?.Muted, json, paletteMap);

  const semPrimary = getTokenValue(palette.Semantic?.Primary, json, paletteMap)
    ?? paletteMap.primary?.['600'];
  const semDanger = getTokenValue(palette.Semantic?.['Critical Base'], json, paletteMap)
    ?? paletteMap.red?.['600'];
  const semSuccess = getTokenValue(palette.Semantic?.Success, json, paletteMap)
    ?? paletteMap.green?.['600'];
  const semWarning = getTokenValue(palette.Semantic?.['Warning Base'], json, paletteMap)
    ?? paletteMap.yellow?.['400'];
  const semInfo = getTokenValue(palette.Semantic?.Info, json, paletteMap)
    ?? paletteMap.teal?.['400'];

  if (bgBase) lines.push(`  --color-bg: ${bgBase};`);
  if (bgPanel) lines.push(`  --color-panel: ${bgPanel};`);
  if (inkDark) lines.push(`  --color-ink-dark: ${inkDark};`);
  if (inkBase) lines.push(`  --color-ink: ${inkBase};`);
  if (inkLight) lines.push(`  --color-ink-light: ${inkLight};`);
  if (inkMuted) lines.push(`  --color-ink-muted: ${inkMuted};`);
  if (semPrimary) {
    lines.push(`  --color-primary-solid: ${semPrimary};`);
    lines.push(`  --color-ink-primary: ${semPrimary};`);
    lines.push(`  --color-border-primary: ${semPrimary};`);
  }
  if (semDanger) lines.push(`  --color-destructive-solid: ${semDanger};`);
  if (semSuccess) lines.push(`  --color-success-solid: ${semSuccess};`);
  if (semWarning) lines.push(`  --color-warning-solid: ${semWarning};`);
  if (semInfo) lines.push(`  --color-info-solid: ${semInfo};`);

  return lines;
}

function spacingVars(json) {
  const spaces = json['Spacing & Grid']?.Spaces ?? {};
  const map = {
    SpaceXXS: '--spacing-xxs',
    SpaceXS: '--spacing-xs',
    SpaceS: '--spacing-sm',
    SpaceBase: '--spacing-md',
    SpaceL: '--spacing-lg',
    SpaceXL: '--spacing-xl',
    SpaceXXL: '--spacing-2xl',
    'Supra-1': '--spacing-supra-1',
    'Supra-2': '--spacing-supra-2',
    'Supra-3': '--spacing-supra-3',
    'Ultra-1': '--spacing-ultra-1',
    'Ultra-2': '--spacing-ultra-2',
    'Ultra-3': '--spacing-ultra-3',
  };
  const lines = [];
  for (const [key, varName] of Object.entries(map)) {
    const val = spaces[key]?.$value;
    if (typeof val === 'number') lines.push(`  ${varName}: ${val}px;`);
  }
  return lines;
}

function radiusVars(json) {
  const radius = json.Radius ?? {};
  const map = {
    RadiusXS: '--radius-2xs',
    RadiusS: '--radius-xs',
    RadiusBase: '--radius-sm',
    RadiusLG: '--radius-md',
    RadiusXL: '--radius-lg',
  };
  const lines = [];
  for (const [key, varName] of Object.entries(map)) {
    const val = radius[key]?.$value;
    if (typeof val === 'number') lines.push(`  ${varName}: ${val}px;`);
  }
  return lines;
}

function paletteCss(paletteMap, indent = '  ') {
  const lines = [];
  for (const [name, steps] of Object.entries(paletteMap)) {
    for (const [step, hex] of Object.entries(steps)) {
      lines.push(`${indent}--color-${name}-${step}: ${hex};`);
    }
  }
  return lines;
}

function paletteCssTheme(paletteMap, indent = '\t') {
  const lines = [];
  const labels = {
    red: 'Red',
    gray: 'Gray',
    orange: 'Orange',
    yellow: 'Yellow',
    green: 'Green',
    teal: 'Teal',
    blue: 'Blue',
    indigo: 'Indigo',
    pink: 'Pink',
    purple: 'Purple',
    primary: 'Primary',
  };
  for (const name of PALETTE_NAMES) {
    const steps = paletteMap[name];
    if (!steps) continue;
    lines.push(`${indent}/* Color Palettes - ${labels[name] ?? name} */`);
    for (const step of SCALES) {
      const hex = steps[step];
      if (hex) lines.push(`${indent}--color-${name}-${step}: ${hex};`);
    }
    if (name === 'primary' && steps['950']) {
      lines.push(`${indent}--color-primary-950: ${steps['950']};`);
    }
    lines.push('');
  }
  return lines.join('\n').trimEnd();
}

function patchGlobalsCss(lightPalette, darkPalette, lightJson, darkJson) {
  const globalsPath = path.join(root, 'src/styles/globals.css');
  let css = fs.readFileSync(globalsPath, 'utf8');
  const lightPaletteCss = paletteCssTheme(lightPalette);
  const darkPaletteCss = paletteCssTheme(darkPalette, '\t');

  const lightStart = '/* @generated-palettes-light-start */';
  const lightEnd = '/* @generated-palettes-light-end */';
  const darkStart = '/* @generated-palettes-dark-start */';
  const darkEnd = '/* @generated-palettes-dark-end */';

  if (!css.includes(lightStart)) {
    console.warn('⚠️  globals.css missing generation markers — skipping patch');
    return;
  }

  css = css.replace(
    new RegExp(`${escapeRegex(lightStart)}[\\s\\S]*?${escapeRegex(lightEnd)}`),
    `${lightStart}\n\t${lightPaletteCss.split('\n').join('\n\t')}\n\t${lightEnd}`,
  );

  css = css.replace(
    new RegExp(`${escapeRegex(darkStart)}[\\s\\S]*?${escapeRegex(darkEnd)}`),
    `${darkStart}\n${darkPaletteCss.split('\n').join('\n')}\n\t${darkEnd}`,
  );

  fs.writeFileSync(globalsPath, css);
  console.log(`✅ Patched ${globalsPath} palette sections`);
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function generate() {
  const light = JSON.parse(fs.readFileSync(lightPath, 'utf8'));
  const dark = JSON.parse(fs.readFileSync(darkPath, 'utf8'));
  const lightPalette = buildPaletteMap(light);
  const darkPalette = buildPaletteMap(dark);

  const css = `/* AUTO-GENERATED from src/tokens/*.tokens.json — do not edit by hand */
/* Run: pnpm --filter @marmoui/ui generate:tokens */

/* Light mode palette + semantic overrides */
:root {
${paletteCss(lightPalette).join('\n')}
${semanticVars(light, lightPalette).join('\n')}
${spacingVars(light).join('\n')}
${radiusVars(light).join('\n')}
}

/* Dark mode palette + semantic overrides */
.dark {
${paletteCss(darkPalette).join('\n')}
${semanticVars(dark, darkPalette).join('\n')}
}
`;

  fs.writeFileSync(outPath, css);
  console.log(`✅ Wrote ${outPath}`);
  console.log(`   Palettes: ${Object.keys(lightPalette).length} (light), ${Object.keys(darkPalette).length} (dark)`);

  patchGlobalsCss(lightPalette, darkPalette, light, dark);
}

generate();
