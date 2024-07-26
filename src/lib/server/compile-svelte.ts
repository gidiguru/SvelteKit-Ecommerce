import { compile } from 'svelte/compiler';
import fs from 'fs';
import path from 'path';

export function compileSvelteComponent(componentPath: string): string {
  const source = fs.readFileSync(componentPath, 'utf8');
  const result = compile(source, {
    filename: path.basename(componentPath),
    generate: 'ssr',
    format: 'esm',
  });

  return result.js.code;
}