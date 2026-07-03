import Link from "next/link";
import Image from "next/image";
import type { Album } from "@/data/music";

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <Link href={`/discography/${album.id}`} className="card block group">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={album.coverArt}
          alt={album.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <div className="p-4">
        <p className="font-heading font-bold text-cream text-sm truncate">{album.title}</p>
        <p className="text-muted text-xs mt-0.5">{album.year} · {album.genre}</p>
        <p className="text-muted text-xs mt-0.5">{album.tracks.length} tracks</p>
      </div>
    </Link>
  );
}
