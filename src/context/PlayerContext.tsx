"use client";

import React, { createContext, useContext, useState, useRef, useCallback } from "react";
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
  audioRef: React.RefObject<HTMLAudioElement>;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PlayerState>({ track: null, album: null, isPlaying: false });
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = useCallback((track: Track, album: Album) => {
    if (audioRef.current) {
      if (state.track?.id !== track.id) {
        audioRef.current.src = track.previewUrl;
        audioRef.current.load();
      }
      audioRef.current.play();
    }
    setState({ track, album, isPlaying: true });
  }, [state.track]);

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

  return (
    <PlayerContext.Provider value={{ ...state, play, pause, toggle, audioRef }}>
      {children}
      <audio ref={audioRef} onEnded={() => setState((s) => ({ ...s, isPlaying: false }))} />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
