"use client";

import Link from "next/link";
import TrackRow from "@/components/TrackRow";
import type { Album } from "@/data/music";

export default function FeaturedTracks({ album }: { album: Album }) {
  const tracks = album.tracks.slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Featured Tracks</h2>
        <Link
          href={`/discography/${album.id}`}
          className="text-gold text-sm font-heading font-semibold hover:underline"
        >
          View all →
        </Link>
      </div>
      <div className="bg-navy rounded-2xl overflow-hidden divide-y divide-white/5">
        {tracks.map((track) => (
          <TrackRow key={track.id} track={track} album={album} />
        ))}
      </div>
    </section>
  );
}
