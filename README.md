# breezydallas — Music Platform

Official music portfolio and release platform for **breezydallas**.

## Tech Stack
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — brand color palette (gold/amber, near-black, cream)
- **HTML5 Audio** — custom player context + persistent mini-player
- **Vercel** — deployment target

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Swapping in Real Content

### 1. Album Cover Art
Replace `/public/images/dnd-cover.webp` with the real cover art (WebP recommended, 800×800px minimum).

### 2. Artist Photo
Replace `/public/images/artist-photo.webp` with a high-res artist photo.

### 3. Audio Previews (20–30s clips)
Drop MP3 preview clips into `/public/audio/previews/` matching the filenames in `src/data/music.ts`:
```
dnd-01-preview.mp3
dnd-02-preview.mp3
... (13 files)
```

### 4. Full Track Downloads
Drop full MP3s into `/public/audio/full/`:
```
dnd-01.mp3
dnd-02.mp3
... (13 files)
```
> For production, host these on **Cloudflare R2** or **Supabase Storage** and update the URLs in `src/data/music.ts`.

### 5. Album ZIP Download
Place the full album ZIP at `/public/downloads/delayed-not-denied.zip` or update `downloadZipUrl` in `src/data/music.ts` to a cloud storage URL.

### 6. YouTube Video IDs
In `src/data/music.ts`, replace `PLACEHOLDER_YT_ID`, `PLACEHOLDER_YT_ID_2`, `PLACEHOLDER_YT_LIVE` with real YouTube video IDs from the `@tbagdallas` channel.

### 7. Social Links
Update the social URLs in:
- `src/components/Footer.tsx`
- `src/app/about/page.tsx`

### 8. WhatsApp Number
Update the WhatsApp number in `src/components/Footer.tsx`:
```ts
href: "https://wa.me/254XXXXXXXXX"
```

### 9. Contact Form Backend
In `src/app/contact/page.tsx`, wire the `handleSubmit` function to your preferred backend:
- [Formspree](https://formspree.io) — easiest, no backend needed
- Supabase table insert
- Any REST API

### 10. Email Capture
In `src/components/EmailCapture.tsx`, wire `handleSubmit` to:
- Mailchimp API
- ConvertKit
- Supabase `subscribers` table

---

## Adding New Albums / Tracks
Edit `src/data/music.ts` — add a new object to the `albums` array. The site will automatically render it in the discography grid and create a detail page.

---

## Deployment (Vercel)

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo to [vercel.com](https://vercel.com) for automatic deploys on push.

---

## Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `bg` | `#0B0C10` | Page background |
| `navy` | `#121722` | Cards, panels |
| `gold` | `#E8C88C` | Primary accent |
| `gold-dark` | `#C9A96E` | Hover states |
| `cream` | `#F0E9DA` | Primary text |
| `muted` | `#8A8FA8` | Secondary text |
