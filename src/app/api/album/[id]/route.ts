import fs from 'fs';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const archiver = require('archiver') as (format: string, opts?: object) => import('stream').Transform & { pipe: (s: NodeJS.WritableStream) => void; file: (f: string, o: object) => void; finalize: () => void };

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const downloadsPath = path.join(process.cwd(), 'public', 'downloads', `${id}.zip`);

  if (fs.existsSync(downloadsPath)) {
    const stat = fs.statSync(downloadsPath);
    const fileBuffer = fs.readFileSync(downloadsPath);
    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Length': String(stat.size),
        'Content-Disposition': `attachment; filename="${id}.zip"`,
      },
    });
  }

  return new Response('Album not found', { status: 404 });
}
