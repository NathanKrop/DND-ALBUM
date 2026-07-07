"use client";

import { usePlayer } from "@/context/PlayerContext";
import type { Track, Album } from "@/data/music";
import { RiPlayFill, RiPauseFill, RiDownloadLine, RiYoutubeLine } from "react-icons/ri";
import Image from "next/image";
import clsx from "clsx";

interface Props {
  track: Track;
  album: Album;
  showLyrics?: boolean;
}

export default function TrackRow({ track, album, showLyrics }: Props) {
  const { toggle, track: currentTrack, isPlaying } = usePlayer();
  const isActive = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isActive && isPlaying;

  return (
    <div
      className={clsx(
        "group flex items-center gap-4 px-4 py-3.5 rounded-lg transition-colors cursor-pointer",
        isActive ? "bg-white/8" : "hover:bg-white/5"
      )}
      onClick={() => toggle(track, album)}
    >
      {/* Number / Play / Equalizer */}
      <div className="w-8 flex-shrink-0 flex items-center justify-center h-8">
        {isCurrentlyPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-4 group-hover:hidden">
              <span className="w-0.5 bg-gold rounded-full eq-bar-1" />
              <span className="w-0.5 bg-gold rounded-full eq-bar-2" />
              <span className="w-0.5 bg-gold rounded-full eq-bar-3" />
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); toggle(track, album); }}
              className="hidden group-hover:flex items-center justify-center text-cream"
              aria-label="Pause"
            >
              <RiPauseFill className="text-lg" />
            </button>
          </>
        ) : (
          <>
            <span className={clsx("text-sm font-heading group-hover:hidden", isActive ? "text-gold" : "text-muted")}>
              {track.number}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); toggle(track, album); }}
              className="hidden group-hover:flex items-center justify-center text-cream hover:text-gold transition-colors"
              aria-label="Play preview"
            >
              <RiPlayFill className="text-lg" />
            </button>
          </>
        )}
      </div>

      {/* Album art thumbnail */}
      <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 hidden sm:block">
        <Image src={album.coverArt} alt={track.title} fill className="object-cover" sizes="40px" />
      </div>

      {/* Title + feat */}
      <div className="flex-1 min-w-0">
        <p className={clsx("font-heading font-semibold text-base truncate", isActive ? "text-gold" : "text-cream")}>
          {track.title}
          {track.feat && <span className="text-muted font-normal ml-1.5 text-xs">{track.feat}</span>}
        </p>
        {showLyrics && track.lyrics && (
          <p className="text-xs text-muted mt-0.5 truncate">{track.lyrics.slice(0, 60)}…</p>
        )}
        <p className="text-xs text-muted sm:hidden">{track.duration}</p>
      </div>

      {/* Duration */}
      <span className="text-muted text-base flex-shrink-0 hidden sm:block tabular-nums">{track.duration}</span>

      {/* Actions — visible on hover */}
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {track.youtubeId && (
          <a
            href={`https://youtube.com/watch?v=${track.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-gold hover:bg-white/5 transition-colors"
            aria-label="Watch on YouTube"
          >
            <RiYoutubeLine className="text-base" />
          </a>
        )}
        <a
          href={track.downloadUrl}
          download
          onClick={(e) => e.stopPropagation()}
          className="w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-gold hover:bg-white/5 transition-colors"
          aria-label={`Download ${track.title}`}
          title={`Download · ${track.downloadSizeMb} MB`}
        >
          <RiDownloadLine className="text-base" />
        </a>
      </div>
    </div>
  );
}
