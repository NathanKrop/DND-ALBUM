"use client";

import Link from "next/link";
import TrackRow from "@/components/TrackRow";
import type { Album } from "@/data/music";
import { RiTimeLine } from "react-icons/ri";

export default function FeaturedTracks({ album }: { album: Album }) {
  const tracks = album.tracks.slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0">Featured Tracks</h2>
        <Link
          href={`/discography/${album.id}`}
          className="text-muted text-sm font-heading font-semibold hover:text-cream transition-colors"
        >
          See all →
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[2rem_2.5rem_1fr_auto_auto] sm:grid-cols-[2rem_2.5rem_1fr_4rem_5rem] gap-3 px-4 py-2 border-b border-white/8 text-xs font-heading font-semibold text-muted uppercase tracking-wider">
          <span>#</span>
          <span className="hidden sm:block" />
          <span>Title</span>
          <span className="hidden sm:flex justify-end"><RiTimeLine className="text-sm" /></span>
          <span />
        </div>

        <div className="divide-y divide-white/5">
          {tracks.map((track) => (
            <TrackRow key={track.id} track={track} album={album} />
          ))}
        </div>
      </div>
    </section>
  );
}
