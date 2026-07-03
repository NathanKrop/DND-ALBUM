import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MiniPlayer from "@/components/MiniPlayer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://breezydallas.com"),
  title: "breezydallas — Delayed Not Denied",
  description: "Official music platform for breezydallas. Gospel hip-hop from Nairobi, Kenya. Stream and download 'Delayed Not Denied'.",
  openGraph: {
    title: "breezydallas — Delayed Not Denied",
    description: "Faith-driven gospel hip-hop from Nairobi. Download the debut album.",
    url: "https://breezydallas.com",
    siteName: "breezydallas",
    images: [{ url: "/images/AlbumCover.jpeg", width: 1200, height: 630, alt: "Delayed Not Denied Album Cover" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "breezydallas — Delayed Not Denied",
    description: "Faith-driven gospel hip-hop from Nairobi.",
    images: ["/images/AlbumCover.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} ${inter.variable} bg-bg text-cream antialiased`} style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <PlayerProvider>
          <Header />
          <main className="min-h-screen pb-28">{children}</main>
          <MiniPlayer />
          <Footer />
        </PlayerProvider>
      </body>
    </html>
  );
}
