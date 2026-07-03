"use client";

import { RiWhatsappLine, RiTwitterXLine, RiShareLine } from "react-icons/ri";

interface Props {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: Props) {
  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
  const text = encodeURIComponent(`🎵 Listen to "${title}" by breezydallas — Delays Are Not Denials`);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <div className="flex items-center gap-3">
      <span className="text-muted text-xs font-heading">Share:</span>
      <a
        href={`https://wa.me/?text=${text}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-muted hover:text-gold transition-colors"
        aria-label="Share on WhatsApp"
      >
        <RiWhatsappLine className="text-base" /> WhatsApp
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-muted hover:text-gold transition-colors"
        aria-label="Share on X"
      >
        <RiTwitterXLine className="text-base" /> X
      </a>
    </div>
  );
}
