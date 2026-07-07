"use client";

import { usePlayer } from "@/context/PlayerContext";
import Image from "next/image";
import clsx from "clsx";
import {
  RiPlayFill, RiPauseFill, RiSkipBackFill, RiSkipForwardFill,
  RiShuffleLine, RiDownloadLine, RiHeartLine, RiHeartFill,
  RiArrowDownSLine, RiVolumeUpLine, RiVolumeMuteLine, RiYoutubeLine,
} from "react-icons/ri";

interface Props {
  open: boolean;
  onClose: () => void;
  progress: number;
  duration: number;
  volume: number;
  muted: boolean;
  buffering: boolean;
  liked: boolean;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMute: () => void;
  onToggleLike: () => void;
  fmt: (s: number) => string;
}

export default function NowPlayingView({
  open, onClose, progress, duration, volume, muted, buffering,
  liked, onSeek, onVolumeChange, onToggleMute, onToggleLike, fmt,
}: Props) {
  const { track, album, isPlaying, pause, play, next, prev, toggleShuffle, isShuffle } = usePlayer();

  if (!track || !album) return null;

  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[60] flex flex-col transition-transform duration-500 ease-in-out",
        open ? "translate-y-0" : "translate-y-full"
      )}
    >
      {/* Blurred background from album art */}
      <div className="absolute inset-0">
        <Image
          src={album.coverArt}
          alt=""
          fill
          className="object-cover scale-110 blur-3xl opacity-60"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-bg/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full max-w-lg mx-auto w-full px-6 pt-6 pb-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-cream"
            aria-label="Close"
          >
            <RiArrowDownSLine className="text-2xl" />
          </button>
          <div className="text-center">
            <p className="text-xs text-muted uppercase tracking-widest font-heading font-semibold">Now Playing</p>
            <p className="text-cream text-sm font-heading font-semibold truncate max-w-[200px]">{album.title}</p>
          </div>
          <a
            href={track.downloadUrl}
            download
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-cream"
            aria-label="Download"
          >
            <RiDownloadLine />
          </a>
        </div>

        {/* Album art — large */}
        <div className="flex-1 flex items-center justify-center py-4">
          <div
            className={clsx(
              "relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 transition-all duration-500",
              isPlaying ? "w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96" : "w-64 h-64 sm:w-72 sm:h-72"
            )}
          >
            <Image
              src={album.coverArt}
              alt={album.title}
              fill
              className="object-cover"
              sizes="400px"
              priority
            />
            {/* Equalizer overlay when playing */}
            {isPlaying && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1">
                <span className="w-1 bg-gold/80 rounded-full eq-bar-1" />
                <span className="w-1 bg-gold/80 rounded-full eq-bar-2" />
                <span className="w-1 bg-gold/80 rounded-full eq-bar-3" />
                <span className="w-1 bg-gold/80 rounded-full eq-bar-1" />
                <span className="w-1 bg-gold/80 rounded-full eq-bar-2" />
              </div>
            )}
          </div>
        </div>

        {/* Track info + like */}
        <div className="flex items-center justify-between mb-6">
          <div className="min-w-0">
            <p className="font-heading font-bold text-xl text-cream truncate">{track.title}</p>
            <p className="text-muted text-sm mt-0.5">{album.artist}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
            {track.youtubeId && (
              <a
                href={`https://youtube.com/watch?v=${track.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-gold transition-colors"
                aria-label="Watch on YouTube"
              >
                <RiYoutubeLine className="text-xl" />
              </a>
            )}
            <button
              onClick={onToggleLike}
              className={clsx("transition-colors", liked ? "text-gold" : "text-muted hover:text-cream")}
              aria-label="Like"
            >
              {liked ? <RiHeartFill className="text-xl" /> : <RiHeartLine className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <input
            type="range"
            min={0}
            max={duration || 30}
            step={0.1}
            value={progress}
            onChange={onSeek}
            className="progress-bar w-full"
            style={{ background: `linear-gradient(to right, #E8C88C ${pct}%, #ffffff25 ${pct}%)` }}
          />
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-muted tabular-nums">{fmt(progress)}</span>
            <span className="text-xs text-muted tabular-nums">{fmt(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={toggleShuffle}
            className={clsx("transition-colors", isShuffle ? "text-gold" : "text-muted hover:text-cream")}
            aria-label="Shuffle"
          >
            <RiShuffleLine className="text-xl" />
          </button>

          <button onClick={prev} className="text-cream hover:text-gold transition-colors" aria-label="Previous">
            <RiSkipBackFill className="text-3xl" />
          </button>

          <button
            onClick={() => (isPlaying ? pause() : play(track, album))}
            className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-bg hover:scale-105 active:scale-95 transition-transform shadow-xl"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {buffering ? (
              <span className="w-6 h-6 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
            ) : isPlaying ? (
              <RiPauseFill className="text-2xl" />
            ) : (
              <RiPlayFill className="text-2xl ml-1" />
            )}
          </button>

          <button onClick={next} className="text-cream hover:text-gold transition-colors" aria-label="Next">
            <RiSkipForwardFill className="text-3xl" />
          </button>

          <button onClick={onToggleMute} className="text-muted hover:text-cream transition-colors" aria-label="Mute">
            {muted || volume === 0 ? <RiVolumeMuteLine className="text-xl" /> : <RiVolumeUpLine className="text-xl" />}
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3">
          <RiVolumeMuteLine className="text-muted text-sm flex-shrink-0" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={onVolumeChange}
            className="progress-bar flex-1"
            style={{ background: `linear-gradient(to right, #E8C88C ${(muted ? 0 : volume) * 100}%, #ffffff25 ${(muted ? 0 : volume) * 100}%)` }}
          />
          <RiVolumeUpLine className="text-muted text-sm flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
