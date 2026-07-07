"use client";

import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import type { Track, Album } from "@/data/music";

interface PlayerState {
  track: Track | null;
  album: Album | null;
  isPlaying: boolean;
}

interface PlayerContextValue extends PlayerState {
  play: (track: Track, album: Album) => void;
  pause: () => void;
  toggle: (track: Track, album: Album) => void;
  next: () => void;
  prev: () => void;
  toggleShuffle: () => void;
  enqueueAlbum: (album: Album) => void;
  audioRef: React.RefObject<HTMLMediaElement>;
  isShuffle: boolean;
  queue: Track[];
  clearQueue: () => void;
  removeFromQueue: (trackId: string) => void;
  moveInQueue: (from: number, to: number) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PlayerState>({ track: null, album: null, isPlaying: false });
  const audioRef = useRef<HTMLMediaElement | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const videoElRef = useRef<HTMLVideoElement | null>(null);

  const [queue, setQueue] = useState<Track[]>([]);
  const [index, setIndex] = useState<number>(-1);
  const [isShuffle, setIsShuffle] = useState(false);

  useEffect(() => {
    // prefer audio element initially
    if (!audioRef.current && audioElRef.current) audioRef.current = audioElRef.current;
  }, []);

  const setActiveMediaFor = useCallback((url: string) => {
    const isMp4 = url.toLowerCase().endsWith('.mp4');
    const canUseAudio = audioElRef.current && audioElRef.current.canPlayType && audioElRef.current.canPlayType('audio/mpeg');
    if (isMp4 && videoElRef.current) {
      audioRef.current = videoElRef.current;
    } else if (audioElRef.current) {
      audioRef.current = audioElRef.current;
    }
  }, []);

  const play = useCallback((track: Track, album: Album) => {
    if (!track) return;
    setActiveMediaFor(track.previewUrl || track.downloadUrl);
    if (audioRef.current) {
      if (state.track?.id !== track.id) {
        audioRef.current.src = track.previewUrl;
        audioRef.current.load();
      }
      audioRef.current.play();
    }
    // update queue index
    setIndex((i) => {
      const idx = queue.findIndex((t) => t.id === track.id);
      return idx >= 0 ? idx : i;
    });
    setState({ track, album, isPlaying: true });
  }, [state.track, queue, setActiveMediaFor]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const toggle = useCallback((track: Track, album: Album) => {
    if (state.track?.id === track.id && state.isPlaying) {
      pause();
    } else {
      play(track, album);
    }
  }, [state, play, pause]);

  const next = useCallback(() => {
    if (queue.length === 0) return;
    let nextIndex = index + 1;
    if (nextIndex >= queue.length) nextIndex = 0;
    setIndex(nextIndex);
    const t = queue[nextIndex];
    if (t) play(t, state.album!);
  }, [queue, index, play, state.album]);

  const prev = useCallback(() => {
    if (queue.length === 0) return;
    let prevIndex = index - 1;
    if (prevIndex < 0) prevIndex = queue.length - 1;
    setIndex(prevIndex);
    const t = queue[prevIndex];
    if (t) play(t, state.album!);
  }, [queue, index, play, state.album]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((s) => !s);
    setQueue((q) => {
      if (isShuffle) return q; // turning shuffle off (note: isShuffle stale, but OK)
      const shuffled = [...q];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  }, [isShuffle]);

  const enqueueAlbum = useCallback((album: Album) => {
    setQueue(album.tracks);
    setIndex(0);
    setState((s) => ({ ...s, album }));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
    setIndex(-1);
  }, []);

  const removeFromQueue = useCallback((trackId: string) => {
    setQueue((q) => q.filter((t) => t.id !== trackId));
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const moveInQueue = useCallback((from: number, to: number) => {
    setQueue((q) => {
      const arr = [...q];
      if (from < 0 || from >= arr.length || to < 0 || to >= arr.length) return arr;
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
    setIndex((i) => {
      if (i === from) return to;
      if (from < i && to >= i) return i - 1;
      if (from > i && to <= i) return i + 1;
      return i;
    });
  }, []);

  useEffect(() => {
    // Media Session integration
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      try {
        (navigator as any).mediaSession.metadata = new (window as any).MediaMetadata({
          title: state.track?.title || '',
          artist: state.album?.artist || '',
          album: state.album?.title || '',
          artwork: state.album ? [{ src: state.album.coverArt, sizes: '512x512', type: 'image/jpeg' }] : [],
        });

        (navigator as any).mediaSession.setActionHandler('play', () => play(state.track!, state.album!));
        (navigator as any).mediaSession.setActionHandler('pause', () => pause());
        (navigator as any).mediaSession.setActionHandler('previoustrack', () => prev());
        (navigator as any).mediaSession.setActionHandler('nexttrack', () => next());
      } catch (e) {
        // ignore if media session not available
      }
    }
  }, [state.track, state.album, play, pause, prev, next]);

  useEffect(() => {
    // keyboard shortcuts
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (state.isPlaying) pause(); else if (state.track && state.album) play(state.track, state.album);
      }
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state, play, pause, next, prev]);

  const onEnded = () => {
    // auto-play next if queue exists
    if (queue.length > 0) {
      next();
    } else {
      setState((s) => ({ ...s, isPlaying: false }));
    }
  };

  return (
    <PlayerContext.Provider
      value={{ ...state, play, pause, toggle, audioRef, next, prev, toggleShuffle, enqueueAlbum, isShuffle, queue, clearQueue, removeFromQueue, moveInQueue }}
    >
      {children}
      <audio ref={audioElRef} onEnded={onEnded} />
      <video ref={videoElRef} onEnded={onEnded} style={{ display: 'none' }} />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
