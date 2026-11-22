// bring-the-humans-03: the entry is the TikTok video itself. This program
// hands the gate the video's address: it reads VIDEO.json from the repo
// root, checks it names a TikTok video, and writes it to /output.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const raw = readFileSync(join(botDir, 'VIDEO.json'), 'utf8');
const data = JSON.parse(raw) as { url?: unknown };
if (typeof data.url !== 'string') {
  throw new Error('VIDEO.json must name a TikTok video URL');
}
// TikTok share links sometimes carry a query string (?_t=..., ?_r=1) or a
// trailing slash; strip those before checking the address, so a shared
// link still counts as the same video.
const url = data.url.split(/[?#]/, 1)[0].replace(/\/+$/, '');
if (!/^https:\/\/(www\.|m\.)?tiktok\.com\/@[^/]+\/video\/\d+$/.test(url)) {
  throw new Error(`VIDEO.json must name a TikTok video URL, got: ${data.url}`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'VIDEO.json'), JSON.stringify({ url }) + '\n');
