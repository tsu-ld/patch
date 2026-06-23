import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const target = resolve(__dirname, '..', 'node_modules', 'eslint', 'lib', 'languages', 'js', 'index.js');

let content = readFileSync(target, 'utf8');
const marker = 'ignoreEval: true,';
const patch = 'ignoreEval: true,\n\t\tjsx: ecmaFeatures.jsx,';

if (content.includes(patch)) {
  process.exit(0);
}
content = content.replace(marker, patch);
writeFileSync(target, content, 'utf8');
