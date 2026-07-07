"use client";

import { usePlayer } from "@/context/PlayerContext";
import type { Album } from "@/data/music";
import { RiPlayFill } from "react-icons/ri";

export default function PlayAlbumButton({ album }: { album: Album }) {
  const { play, enqueueAlbum } = usePlayer();

  const start = () => {
    if (album.tracks && album.tracks.length > 0) {
      enqueueAlbum(album);
      play(album.tracks[0], album);
    }
  };

  return (
    <button onClick={start} className="btn-primary flex items-center gap-2">
      <RiPlayFill /> Play Album
    </button>
  );
}
