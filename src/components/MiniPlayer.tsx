"use client";

import { usePlayer } from "@/context/PlayerContext";
import { useEffect, useRef, useState } from "react";
import { RiPlayFill, RiPauseFill, RiDownloadLine } from "react-icons/ri";
import Image from "next/image";
import clsx from "clsx";

export default function MiniPlayer() {
  const { track, album, isPlaying, pause, play, audioRef } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
    };
  }, [audioRef]);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = val;
    setProgress(val);
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  if (!track || !album) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Cover */}
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <Image src={album.coverArt} alt={album.title} fill className="object-cover" sizes="48px" />
        </div>

        {/* Track info */}
        <div className="flex-1 min-w-0">
          <p className="font-heading font-semibold text-sm text-cream truncate">{track.title}</p>
          <p className="text-xs text-muted truncate">{album.artist} · Preview</p>

          {/* Progress */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted w-8">{fmt(progress)}</span>
            <input
              type="range"
              min={0}
              max={duration || 30}
              step={0.1}
              value={progress}
              onChange={seek}
              className="progress-bar flex-1"
            />
            <span className="text-xs text-muted w-8 text-right">{fmt(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => (isPlaying ? pause() : play(track, album))}
            className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-bg hover:bg-gold-dark transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <RiPauseFill className="text-lg" /> : <RiPlayFill className="text-lg ml-0.5" />}
          </button>

          <a
            href={track.downloadUrl}
            download
            className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
            aria-label="Download track"
          >
            <RiDownloadLine className="text-base" />
          </a>
        </div>
      </div>
    </div>
  );
}
