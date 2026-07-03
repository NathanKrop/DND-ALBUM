import Link from "next/link";
import { albums, bonusTracks } from "@/data/music";
import FeaturedTracks from "@/components/FeaturedTracks";
import BonusTrackPlayer from "@/components/BonusTrackPlayer";

export default function NotFound() {
  const featuredAlbum = albums[0];

  return (
    <>
      {/* 404 Error Section */}
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <p className="font-heading font-extrabold text-8xl text-gold/20 mb-4">404</p>
        <h1 className="font-heading font-bold text-3xl text-cream mb-2">Page Not Found</h1>
        <p className="text-muted text-base mb-8 max-w-md">
          This page doesn't exist — but the music does. Enjoy some tracks while you're here.
        </p>
        <Link href="/" className="btn-gold">Back to Home</Link>
      </div>

      {/* Featured Tracks — Keep Music Playing */}
      <FeaturedTracks album={featuredAlbum} />

      {/* Bonus Track */}
      {bonusTracks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="section-title">Also Available</h2>
          <div className="max-w-2xl">
            {bonusTracks.map((bt) => (
              <BonusTrackPlayer key={bt.id} track={bt} />
            ))}
          </div>
        </section>
      )}

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="section-title mb-8">Where to Go</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-outline">
            Home
          </Link>
          <Link href="/discography" className="btn-outline">
            All Albums
          </Link>
          <Link href="/about" className="btn-outline">
            About
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
