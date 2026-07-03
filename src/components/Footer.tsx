import Link from "next/link";
import { RiInstagramLine, RiYoutubeLine, RiWhatsappLine } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";

const socials = [
  { href: "https://www.instagram.com/breezydallas_?igsh=YXoxaGIzenN0endk", icon: RiInstagramLine, label: "Instagram" },
  { href: "https://www.tiktok.com/@princenate4k",                          icon: SiTiktok,        label: "TikTok"    },
  { href: "https://youtube.com/@tbagdallas?si=UXDK1x1TAz2Ga9hn",          icon: RiYoutubeLine,   label: "YouTube"   },
  { href: "https://wa.me/254702605566",                                    icon: RiWhatsappLine,  label: "WhatsApp"  },
];

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/5 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-heading font-bold text-gold text-lg">breezydallas</p>
          <p className="text-muted text-sm mt-1 italic">"Delays Are Not Denials"</p>
        </div>

        <div className="flex items-center gap-5">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted hover:text-gold transition-colors text-xl"
            >
              <Icon />
            </a>
          ))}
        </div>

        <p className="text-muted text-xs text-center md:text-right">
          © {new Date().getFullYear()} breezydallas. All rights reserved.
          <br />
          Nairobi, Kenya 🇰🇪
        </p>
      </div>
    </footer>
  );
}
