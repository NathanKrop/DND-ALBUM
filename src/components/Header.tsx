"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiMenuLine, RiCloseLine, RiMusicLine } from "react-icons/ri";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/discography", label: "Discography" },
  { href: "/videos", label: "Videos" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-heading font-bold text-gold text-lg tracking-tight">
          <RiMusicLine className="text-xl" />
          breezydallas
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm font-heading font-semibold tracking-wide transition-colors duration-150",
                pathname === link.href ? "text-gold" : "text-muted hover:text-cream"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-cream text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <RiCloseLine /> : <RiMenuLine />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-navy border-t border-white/5 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "text-sm font-heading font-semibold tracking-wide py-2",
                pathname === link.href ? "text-gold" : "text-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
