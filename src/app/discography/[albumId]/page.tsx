import { albums } from "@/data/music";
import { notFound } from "next/navigation";
import Image from "next/image";
import TrackRow from "@/components/TrackRow";
import ShareButtons from "@/components/ShareButtons";
import { RiDownloadLine, RiMusicLine } from "react-icons/ri";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ albumId: string }>;
}

export async function generateStaticParams() {
  return albums.map((a) => ({ albumId: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { albumId } = await params;
  const album = albums.find((a) => a.id === albumId);
  if (!album) return {};
  return {
    title: `${album.title} — breezydallas`,
    description: album.description,
    openGraph: {
      title: `${album.title} — breezydallas`,
      description: album.description,
      images: [{ url: album.coverArt }],
    },
  };
}

export default async function AlbumDetailPage({ params }: Props) {
  const { albumId } = await params;
  const album = albums.find((a) => a.id === albumId);
  if (!album) notFound();

  const totalDuration = album.tracks.reduce((acc, t) => {
    const [m, s] = t.duration.split(":").map(Number);
    return acc + m * 60 + s;
  }, 0);
  const totalMin = Math.floor(totalDuration / 60);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Album header */}
      <div className="flex flex-col sm:flex-row gap-8 mb-12">
        <div className="relative w-full sm:w-64 h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
          <Image
            src={album.coverArt}
            alt={album.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 256px"
          />
        </div>

        <div className="flex flex-col justify-end">
          <p className="text-gold text-xs font-heading font-semibold uppercase tracking-widest mb-2">Album</p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-cream leading-tight mb-2">
            {album.title}
          </h1>
          <p className="text-muted text-sm mb-1">
            {album.artist} · {album.year} · {album.genre}
          </p>
          <p className="text-muted text-sm mb-4">
            <RiMusicLine className="inline mr-1" />
            {album.tracks.length} tracks · {totalMin} min
          </p>
          <p className="text-cream/70 text-sm max-w-lg mb-6">{album.description}</p>

          <div className="flex flex-wrap gap-3 items-center">
            <a href={album.downloadZipUrl} download className="btn-gold flex items-center gap-2">
              <RiDownloadLine /> Download Album ({album.downloadZipSizeMb} MB)
            </a>
            <ShareButtons title={album.title} />
          </div>
        </div>
      </div>

      {/* Tracklist */}
      <div className="bg-navy rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5 grid grid-cols-[2rem_1fr_auto_auto] gap-4 text-xs font-heading font-semibold text-muted uppercase tracking-wider">
          <span>#</span>
          <span>Title</span>
          <span className="hidden sm:block">Duration</span>
          <span>Actions</span>
        </div>
        <div className="divide-y divide-white/5">
          {album.tracks.map((track) => (
            <TrackRow key={track.id} track={track} album={album} showLyrics />
          ))}
        </div>
      </div>
    </div>
  );
}
