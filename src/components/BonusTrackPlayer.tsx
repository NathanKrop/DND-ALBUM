"use client";

import Image from "next/image";
import { RiDownloadLine, RiExternalLinkLine } from "react-icons/ri";
import type { BonusTrack } from "@/data/music";

export default function BonusTrackPlayer({ track }: { track: BonusTrack }) {
  return (
    <div className="bg-navy rounded-2xl overflow-hidden">
      <div className="flex items-center gap-4 p-4 border-b border-white/5">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
          <Image src={track.coverArt} alt={track.title} fill className="object-cover" sizes="56px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-heading font-semibold text-gold uppercase tracking-wider mb-0.5">Bonus Track</p>
          <p className="font-heading font-bold text-cream truncate">{track.title}</p>
          <p className="text-muted text-xs">{track.artist}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={track.audiomackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted hover:text-gold transition-colors"
            aria-label="Open on Audiomack"
          >
            <RiExternalLinkLine /> Audiomack
          </a>
          <a
            href={track.audiomackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
            aria-label="Download from Audiomack"
          >
            <RiDownloadLine className="text-base" />
          </a>
        </div>
      </div>

      {/* Audiomack embed player */}
      <div className="w-full">
        <iframe
          src={`https://audiomack.com/embed/song/${track.audiomackUrl.split("/song/")[1]}`}
          width="100%"
          height="252"
          frameBorder="0"
          scrolling="no"
          allow="autoplay"
          title={`${track.title} by ${track.artist}`}
          className="w-full"
        />
      </div>
    </div>
  );
}
