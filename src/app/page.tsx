import Image from "next/image";
import Link from "next/link";
import { albums, bonusTracks } from "@/data/music";
import AlbumCard from "@/components/AlbumCard";
import EmailCapture from "@/components/EmailCapture";
import BonusTrackPlayer from "@/components/BonusTrackPlayer";
import FeaturedTracks from "@/components/FeaturedTracks";
import { RiPlayFill, RiDownloadLine } from "react-icons/ri";

export default function HomePage() {
  const featuredAlbum = albums[0];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-navy">
          <Image
            src={featuredAlbum.coverArt}
            alt="Hero background"
            fill
            priority
            className="object-cover opacity-30 blur-sm scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-hero-gradient" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-32 w-full">
          <p className="text-gold font-heading font-semibold text-sm uppercase tracking-widest mb-3">
            Debut Album · 2024
          </p>
          <h1 className="font-heading font-extrabold text-5xl sm:text-7xl text-cream leading-none mb-2">
            Delayed Not Denied
          </h1>
          <p className="text-muted text-lg mb-2 font-heading italic">breezydallas</p>
          <p className="text-cream/70 text-base max-w-xl mb-8">
            16 tracks of faith-driven gospel hip-hop from Nairobi, Kenya. A testament that delays are not denials.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={`/discography/${featuredAlbum.id}`} className="btn-gold flex items-center gap-2">
              <RiPlayFill /> Play Album
            </Link>
            <Link href="/discography" className="btn-outline flex items-center gap-2">
              Explore Discography
            </Link>
            <a
              href={featuredAlbum.downloadZipUrl}
              download
              className="flex items-center gap-2 text-sm font-heading font-semibold text-muted hover:text-gold transition-colors py-3"
            >
              <RiDownloadLine /> Download Album ({featuredAlbum.downloadZipSizeMb} MB)
            </a>
          </div>
        </div>
      </section>

      {/* Featured Tracks — client component handles audio context */}
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

      {/* Discography preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="section-title">Discography</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Motto banner */}
      <section className="bg-navy py-16 px-4 text-center">
        <p className="font-heading font-extrabold text-3xl sm:text-5xl text-gold italic">
          "Delays Are Not Denials"
        </p>
        <p className="text-muted mt-3 text-sm">— breezydallas · Nairobi, Kenya 🇰🇪</p>
      </section>

      {/* Email capture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <EmailCapture />
      </section>
    </>
  );
}
