"use client";

import { usePlayer } from "@/context/PlayerContext";
import type { Track, Album } from "@/data/music";
import { RiPlayFill, RiPauseFill, RiDownloadLine, RiYoutubeLine } from "react-icons/ri";
import clsx from "clsx";

interface Props {
  track: Track;
  album: Album;
  showLyrics?: boolean;
}

export default function TrackRow({ track, album, showLyrics }: Props) {
  const { toggle, track: currentTrack, isPlaying } = usePlayer();
  const isActive = currentTrack?.id === track.id;

  return (
    <div
      className={clsx(
        "group flex items-center gap-4 px-4 py-3 rounded-lg transition-colors",
        isActive ? "bg-gold/10" : "hover:bg-white/5"
      )}
    >
      {/* Number / Play button */}
      <div className="w-8 flex-shrink-0 flex items-center justify-center">
        <span className={clsx("text-sm font-heading group-hover:hidden", isActive ? "text-gold" : "text-muted")}>
          {track.number}
        </span>
        <button
          onClick={() => toggle(track, album)}
          className="hidden group-hover:flex items-center justify-center text-cream hover:text-gold transition-colors"
          aria-label={isActive && isPlaying ? "Pause" : "Play preview"}
        >
          {isActive && isPlaying ? <RiPauseFill className="text-lg" /> : <RiPlayFill className="text-lg" />}
        </button>
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <p className={clsx("font-heading font-semibold text-sm truncate", isActive ? "text-gold" : "text-cream")}>
          {track.title}
          {track.feat && <span className="text-muted font-normal ml-1 text-xs">{track.feat}</span>}
        </p>
        {showLyrics && track.lyrics && (
          <p className="text-xs text-muted mt-0.5 truncate">{track.lyrics.slice(0, 60)}…</p>
        )}
      </div>

      {/* Duration */}
      <span className="text-muted text-sm flex-shrink-0 hidden sm:block">{track.duration}</span>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {track.youtubeId && (
          <a
            href={`https://youtube.com/watch?v=${track.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-gold transition-colors"
            aria-label="Watch music video"
          >
            <RiYoutubeLine className="text-lg" />
          </a>
        )}
        <a
          href={track.downloadUrl}
          download
          className="text-muted hover:text-gold transition-colors"
          aria-label={`Download ${track.title} (${track.downloadSizeMb} MB)`}
          title={`Download MP3 · ${track.downloadSizeMb} MB`}
        >
          <RiDownloadLine className="text-lg" />
        </a>
      </div>
    </div>
  );
}
