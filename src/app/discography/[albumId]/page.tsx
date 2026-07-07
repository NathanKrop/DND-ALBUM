import { albums } from "@/data/music";
import { notFound } from "next/navigation";
import Image from "next/image";
import TrackRow from "@/components/TrackRow";
import ShareButtons from "@/components/ShareButtons";
import { RiDownloadLine, RiMusicLine } from "react-icons/ri";
import PlayAlbumButton from "@/components/PlayAlbumButton";
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
    openGraph: { title: `${album.title} — breezydallas`, description: album.description, images: [{ url: album.coverArt }] },
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
    <div>
      {/* Spotify-style hero with blurred cover */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={album.coverArt} alt="" fill className="object-cover scale-110 blur-2xl opacity-40" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/60 to-bg" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          <div className="flex flex-col sm:flex-row gap-8 items-end">
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl shadow-black/60">
              <Image src={album.coverArt} alt={album.title} fill priority className="object-cover" sizes="240px" />
            </div>

            <div className="flex flex-col justify-end pb-2">
              <p className="text-xs font-heading font-semibold uppercase tracking-widest text-cream/60 mb-2">Album</p>
              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-cream leading-tight mb-3">
                {album.title}
              </h1>
              <p className="text-cream/70 text-sm mb-1">
                <span className="font-semibold text-cream">{album.artist}</span>
                {" · "}{album.year}{" · "}{album.genre}
              </p>
              <p className="text-muted text-sm">
                <RiMusicLine className="inline mr-1" />
                {album.tracks.length} songs · {totalMin} min
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap gap-3 items-center">
        <PlayAlbumButton album={album} />
        <a href={`/api/album/${album.id}`} download className="btn-outline flex items-center gap-2">
          <RiDownloadLine /> Download ({album.downloadZipSizeMb} MB)
        </a>
        <ShareButtons title={album.title} />
      </div>

      {/* Tracklist */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* Header */}
        <div className="grid grid-cols-[2rem_2.5rem_1fr_4rem_5rem] gap-3 px-4 py-2 border-b border-white/8 text-xs font-heading font-semibold text-muted uppercase tracking-wider mb-1">
          <span>#</span>
          <span className="hidden sm:block" />
          <span>Title</span>
          <span className="hidden sm:block text-right">Time</span>
          <span />
        </div>
        <div className="divide-y divide-white/5">
          {album.tracks.map((track) => (
            <TrackRow key={track.id} track={track} album={album} showLyrics />
          ))}
        </div>

        {/* Album description */}
        <div className="mt-10 pt-6 border-t border-white/8">
          <p className="text-muted text-sm leading-relaxed max-w-2xl">{album.description}</p>
          <p className="text-muted/50 text-xs mt-3">© {album.year} breezydallas</p>
        </div>
      </div>
    </div>
  );
}
