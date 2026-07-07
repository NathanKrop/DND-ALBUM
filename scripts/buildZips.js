const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const publicDir = path.join(__dirname, '..', 'public');
const downloadsDir = path.join(publicDir, 'downloads');

if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

const dataPath = path.join(__dirname, '..', 'src', 'data', 'music.ts');
const src = fs.readFileSync(dataPath, 'utf8');

// crude split of albums block
const albumsBlockMatch = src.match(/export const albums:[^=]+=\s*\[([\s\S]*?)\];/m);
if (!albumsBlockMatch) {
  console.error('Could not find albums block in music.ts');
  process.exit(1);
}

const albumsSrc = albumsBlockMatch[1];

// split top-level album objects by pattern of closing brace followed by comma-ish
const albumChunks = albumsSrc.split(/\},\s*\{(?=\s*id:\s*")/g).map((s) => s.trim());

async function buildAlbumZipFromChunk(chunk) {
  // find album id
  const idMatch = chunk.match(/id:\s*"([^"]+)"/);
  const albumId = idMatch ? idMatch[1] : `album-${Math.random().toString(36).slice(2,8)}`;
  const zipPath = path.join(downloadsDir, `${albumId}.zip`);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => resolve(zipPath));
    archive.on('error', (err) => reject(err));
    archive.pipe(output);

    const re = /"(\/audio\/full\/[^"]+)"/g;
    let m;
    const seen = new Set();
    while ((m = re.exec(chunk)) !== null) {
      const rel = m[1].replace(/^\//, '');
      if (seen.has(rel)) continue;
      seen.add(rel);
      const filePath = path.join(__dirname, '..', 'public', rel);
      if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: path.basename(filePath) });
      } else {
        console.warn('Missing file, skipping:', filePath);
      }
    }

    archive.finalize();
  });
}

(async () => {
  for (const chunk of albumChunks) {
    try {
      const z = await buildAlbumZipFromChunk(chunk);
      console.log('Built zip:', z);
    } catch (e) {
      console.error('Failed building zip for chunk', e);
    }
  }
})();
