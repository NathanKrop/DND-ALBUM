"use client";

import { usePlayer } from "@/context/PlayerContext";
import { useEffect, useRef, useState } from "react";
import {
  RiPlayFill, RiPauseFill, RiDownloadLine,
  RiSkipBackFill, RiSkipForwardFill, RiShuffleLine,
  RiVolumeUpLine, RiVolumeMuteLine, RiHeartLine, RiHeartFill,
  RiArrowUpSLine,
} from "react-icons/ri";
import Image from "next/image";
import clsx from "clsx";
import NowPlayingView from "@/components/NowPlayingView";

export default function MiniPlayer() {
  const { track, album, isPlaying, pause, play, audioRef, next, prev, toggleShuffle, isShuffle } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const [titleOverflow, setTitleOverflow] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onDur = () => setDuration(audio.duration || 0);
    const onWaiting = () => setBuffering(true);
    const onCanPlay = () => setBuffering(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onDur);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onDur);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, [audioRef]);

  useEffect(() => {
    if (titleRef.current) {
      setTitleOverflow(titleRef.current.scrollWidth > titleRef.current.clientWidth);
    }
  }, [track]);

  // Close expanded view with Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = val;
    setProgress(val);
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
    setMuted(val === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const n = !muted;
    setMuted(n);
    audioRef.current.volume = n ? 0 : volume;
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
  };

  const pct = duration ? (progress / duration) * 100 : 0;

  if (!track || !album) return null;

  const sharedProps = {
    progress, duration, volume, muted, buffering, liked,
    onSeek: seek, onVolumeChange: changeVolume, onToggleMute: toggleMute,
    onToggleLike: () => setLiked((l) => !l), fmt,
  };

  return (
    <>
      {/* Full-screen Now Playing */}
      <NowPlayingView open={expanded} onClose={() => setExpanded(false)} {...sharedProps} />

      {/* Mini bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0f14]/95 backdrop-blur-xl border-t border-white/8">
        {/* Thin progress line */}
        <div className="h-0.5 bg-white/5 relative">
          <div className="h-full bg-gold transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Left — clickable album art + track info */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setExpanded(true)}
              className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 shadow-lg group"
              aria-label="Open Now Playing"
            >
              <Image src={album.coverArt} alt={album.title} fill className="object-cover" sizes="48px" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <RiArrowUpSLine className="text-cream text-xl" />
              </div>
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-1.5 gap-0.5 group-hover:opacity-0 transition-opacity">
                  <span className="w-0.5 bg-gold rounded-full eq-bar-1" />
                  <span className="w-0.5 bg-gold rounded-full eq-bar-2" />
                  <span className="w-0.5 bg-gold rounded-full eq-bar-3" />
                </div>
              )}
            </button>

            <button onClick={() => setExpanded(true)} className="min-w-0 overflow-hidden text-left">
              <div className="overflow-hidden">
                <p
                  ref={titleRef}
                  className={clsx(
                    "font-heading font-semibold text-sm text-cream",
                    titleOverflow ? "marquee-text inline-block" : "truncate block"
                  )}
                >
                  {titleOverflow ? `${track.title}\u00A0\u00A0\u00A0\u00A0${track.title}` : track.title}
                </p>
              </div>
              <p className="text-xs text-muted truncate">{album.artist}</p>
            </button>

            <button
              onClick={() => setLiked((l) => !l)}
              className={clsx("ml-1 flex-shrink-0 transition-colors", liked ? "text-gold" : "text-muted hover:text-cream")}
              aria-label="Like"
            >
              {liked ? <RiHeartFill className="text-base" /> : <RiHeartLine className="text-base" />}
            </button>
          </div>

          {/* Center — controls + seek */}
          <div className="flex flex-col items-center gap-1.5 w-full max-w-md">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleShuffle}
                className={clsx("transition-colors text-sm", isShuffle ? "text-gold" : "text-muted hover:text-cream")}
                aria-label="Shuffle"
              >
                <RiShuffleLine />
              </button>
              <button onClick={prev} className="text-muted hover:text-cream transition-colors text-xl" aria-label="Previous">
                <RiSkipBackFill />
              </button>
              <button
                onClick={() => (isPlaying ? pause() : play(track, album))}
                className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-bg hover:scale-105 active:scale-95 transition-transform"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {buffering ? (
                  <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                ) : isPlaying ? (
                  <RiPauseFill className="text-lg" />
                ) : (
                  <RiPlayFill className="text-lg ml-0.5" />
                )}
              </button>
              <button onClick={next} className="text-muted hover:text-cream transition-colors text-xl" aria-label="Next">
                <RiSkipForwardFill />
              </button>
              <a href={track.downloadUrl} download className="text-muted hover:text-cream transition-colors text-sm" aria-label="Download">
                <RiDownloadLine />
              </a>
            </div>

            <div className="flex items-center gap-2 w-full">
              <span className="text-xs text-muted w-8 text-right tabular-nums">{fmt(progress)}</span>
              <input
                type="range" min={0} max={duration || 30} step={0.1} value={progress} onChange={seek}
                className="progress-bar flex-1"
                style={{ background: `linear-gradient(to right, #E8C88C ${pct}%, #ffffff20 ${pct}%)` }}
              />
              <span className="text-xs text-muted w-8 tabular-nums">{fmt(duration)}</span>
            </div>
          </div>

          {/* Right — volume */}
          <div className="hidden sm:flex items-center justify-end gap-2">
            <button onClick={toggleMute} className="text-muted hover:text-cream transition-colors">
              {muted || volume === 0 ? <RiVolumeMuteLine /> : <RiVolumeUpLine />}
            </button>
            <input
              type="range" min={0} max={1} step={0.01} value={muted ? 0 : volume} onChange={changeVolume}
              className="progress-bar w-24"
              style={{ background: `linear-gradient(to right, #E8C88C ${(muted ? 0 : volume) * 100}%, #ffffff20 ${(muted ? 0 : volume) * 100}%)` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
