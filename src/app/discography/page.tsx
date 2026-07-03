"use client";

import { useState } from "react";
import { albums } from "@/data/music";
import AlbumCard from "@/components/AlbumCard";
import SearchBar from "@/components/SearchBar";

export default function DiscographyPage() {
  const [query, setQuery] = useState("");

  const filtered = albums.filter((album) => {
    const q = query.toLowerCase();
    return (
      album.title.toLowerCase().includes(q) ||
      album.genre.toLowerCase().includes(q) ||
      album.tracks.some((t) => t.title.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-heading font-extrabold text-4xl text-cream mb-2">Discography</h1>
      <p className="text-muted mb-8">All releases by breezydallas</p>

      <div className="max-w-sm mb-8">
        <SearchBar value={query} onChange={setQuery} placeholder="Search albums or tracks…" />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted text-center py-16">No results for "{query}"</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </div>
  );
}
