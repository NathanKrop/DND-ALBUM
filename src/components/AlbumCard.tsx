import Link from "next/link";
import Image from "next/image";
import type { Album } from "@/data/music";
import { RiPlayFill } from "react-icons/ri";

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <Link href={`/discography/${album.id}`} className="card block group p-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-3">
        <Image
          src={album.coverArt}
          alt={album.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-end p-3">
          <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
            <RiPlayFill className="text-bg text-xl ml-0.5" />
          </div>
        </div>
      </div>
      <p className="font-heading font-bold text-cream text-sm truncate">{album.title}</p>
      <p className="text-muted text-xs mt-0.5">{album.year} · {album.genre}</p>
    </Link>
  );
}
