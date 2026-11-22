// bring-the-humans-03: the entry is the TikTok video itself. This program
// hands the gate the video's address: it reads VIDEO.json from the repo
// root, checks it names a TikTok video, and writes it to /output.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const raw = readFileSync(join(botDir, 'VIDEO.json'), 'utf8');
const data = JSON.parse(raw) as { url?: unknown };
if (
  typeof data.url !== 'string' ||
  !/^https:\/\/(www\.|m\.)?tiktok\.com\/@[^/]+\/video\/\d+$/.test(data.url)
) {
  throw new Error('VIDEO.json must name a TikTok video URL');
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'VIDEO.json'), JSON.stringify({ url: data.url }) + '\n');
