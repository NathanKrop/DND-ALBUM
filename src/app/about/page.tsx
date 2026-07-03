import Image from "next/image";
import { RiInstagramLine, RiYoutubeLine } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";

export const metadata = {
  title: "About — breezydallas",
  description: "The story behind breezydallas and the debut album Delayed Not Denied.",
};

const socials = [
  { href: "https://www.instagram.com/breezydallas_?igsh=YXoxaGIzenN0endk", icon: RiInstagramLine, label: "Instagram" },
  { href: "https://www.tiktok.com/@princenate4k",                          icon: SiTiktok,        label: "TikTok"    },
  { href: "https://youtube.com/@tbagdallas?si=UXDK1x1TAz2Ga9hn",          icon: RiYoutubeLine,   label: "YouTube"   },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Photo */}
        <div className="relative w-full md:w-80 h-96 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
          <Image
            src="/images/Artist.jpeg"
            alt="breezydallas"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 320px"
            priority
          />
        </div>

        {/* Bio */}
        <div>
          <p className="text-gold text-xs font-heading font-semibold uppercase tracking-widest mb-2">Artist</p>
          <h1 className="font-heading font-extrabold text-5xl text-cream mb-4">breezydallas</h1>
          <p className="text-muted text-sm mb-6">Nairobi, Kenya 🇰🇪 · Gospel Hip-Hop / R&B</p>

          <div className="space-y-4 text-cream/80 text-sm leading-relaxed">
            <p>
              breezydallas is an independent gospel hip-hop artist from Nairobi, Kenya, blending the reflective
              lyricism of J. Cole and Kendrick Lamar with the faith-driven spirit of Lecrae, Kirk Franklin, and
              Maverick City Music.
            </p>
            <p>
              His music is cinematic and honest — rooted in real experiences of waiting, trusting, and ultimately
              seeing God come through. Every track is a testimony.
            </p>
            <p>
              His debut album, <span className="text-gold font-semibold">Delayed Not Denied</span>, is a 12-track
              journey through faith, doubt, perseverance, and praise. Recorded in Nairobi, it carries the heartbeat
              of East Africa while speaking to a global audience.
            </p>
          </div>

          {/* The Story */}
          <div className="mt-8 bg-navy rounded-2xl p-6">
            <h2 className="font-heading font-bold text-gold text-lg mb-3">The Story Behind "Delayed Not Denied"</h2>
            <p className="text-cream/70 text-sm leading-relaxed">
              The album was born out of a season of waiting — years of preparation, setbacks, and quiet faith.
              The title track captures the moment of breakthrough: the realization that every delay was purposeful,
              every closed door was redirection, and every "not yet" was building something greater. This album is
              for everyone who has been told to wait — it's proof that the promise still stands.
            </p>
          </div>

          {/* Socials */}
          <div className="mt-8 flex items-center gap-5">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center gap-2 text-muted hover:text-gold transition-colors text-sm"
              >
                <Icon className="text-xl" /> {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
