try {
  const mdx = require('fumadocs-mdx');
  console.log('fumadocs-mdx exports:', Object.keys(mdx));
} catch (e) {
  console.log('fumadocs-mdx load error:', e.message);
}

try {
  const source = require('fumadocs-core/source');
  console.log('fumadocs-core/source exports:', Object.keys(source));
} catch (e) {
  console.log('fumadocs-core/source load error:', e.message);
}
