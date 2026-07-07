const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'music.ts');
const publicDir = path.join(__dirname, '..', 'public', 'audio', 'full');

const src = fs.readFileSync(dataPath, 'utf8');
const re = /"(\/audio\/full\/[^"]+)"/g;
const paths = new Set();
let m;
while ((m = re.exec(src)) !== null) paths.add(m[1]);

const missing = [];
for (const p of paths) {
  const rel = p.replace(/^\//, '');
  if (!fs.existsSync(path.join(__dirname, '..', 'public', rel))) missing.push(p);
}

if (missing.length === 0) {
  console.log('All audio file paths from src/data/music.ts exist under public/audio/full');
  process.exit(0);
}

console.log('Missing files:');
missing.forEach((p) => console.log(p));
process.exit(1);
