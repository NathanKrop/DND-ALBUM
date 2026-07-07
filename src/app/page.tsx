import Image from "next/image";
import Link from "next/link";
import { albums, bonusTracks } from "@/data/music";
import AlbumCard from "@/components/AlbumCard";
import EmailCapture from "@/components/EmailCapture";
import BonusTrackPlayer from "@/components/BonusTrackPlayer";
import FeaturedTracks from "@/components/FeaturedTracks";
import PlayAlbumButton from "@/components/PlayAlbumButton";
import { RiDownloadLine, RiSpotifyLine, RiYoutubeLine } from "react-icons/ri";

export default function HomePage() {
  const featuredAlbum = albums[0];

  return (
    <>
      {/* Hero — Spotify-style full bleed */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={featuredAlbum.coverArt}
            alt="Hero background"
            fill
            priority
            className="object-cover scale-110"
            sizes="100vw"
          />
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-20 pt-32 w-full">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold text-xs font-heading font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
              Debut Album · 2024
            </span>
            <h1 className="font-heading font-extrabold text-5xl sm:text-7xl text-cream leading-[1.05] mb-3">
              Delayed<br />Not Denied
            </h1>
            <p className="text-gold/80 font-heading italic text-lg mb-2">breezydallas</p>
            <p className="text-cream/60 text-sm max-w-md mb-8 leading-relaxed">
              {featuredAlbum.tracks.length} tracks of faith-driven gospel hip-hop from Nairobi, Kenya.
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <PlayAlbumButton album={featuredAlbum} />
              <Link href="/discography" className="btn-outline">
                Discography
              </Link>
              <a
                href={featuredAlbum.downloadZipUrl}
                download
                className="flex items-center gap-2 text-sm font-heading font-semibold text-muted hover:text-gold transition-colors py-3"
              >
                <RiDownloadLine /> {featuredAlbum.downloadZipSizeMb} MB
              </a>
            </div>

            {/* Platform links */}
            <div className="flex items-center gap-4 mt-6">
              <span className="text-muted text-xs font-heading uppercase tracking-wider">Also on</span>
              <a href="https://youtube.com/@tbagdallas" target="_blank" rel="noopener noreferrer"
                className="text-muted hover:text-gold transition-colors text-xl" aria-label="YouTube">
                <RiYoutubeLine />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tracks */}
      <FeaturedTracks album={featuredAlbum} />

      {/* Bonus Track */}
      {bonusTracks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="section-title">Also Available</h2>
          <div className="max-w-2xl">
            {bonusTracks.map((bt) => (
              <BonusTrackPlayer key={bt.id} track={bt} />
            ))}
          </div>
        </section>
      )}

      {/* Discography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title mb-0">Discography</h2>
          <Link href="/discography" className="text-muted text-sm font-heading font-semibold hover:text-cream transition-colors">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Quote banner */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5" />
        <p className="relative font-heading font-extrabold text-3xl sm:text-5xl text-gold italic">
          "Delays Are Not Denials"
        </p>
        <p className="relative text-muted mt-3 text-sm">— breezydallas · Nairobi, Kenya 🇰🇪</p>
      </section>

      {/* Email capture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <EmailCapture />
      </section>
    </>
  );
}
