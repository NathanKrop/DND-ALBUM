import { videos } from "@/data/music";
import VideoEmbed from "@/components/VideoEmbed";

export const metadata = {
  title: "Videos — breezydallas",
  description: "Official music videos and live performances by breezydallas.",
};

export default function VideosPage() {
  const official = videos.filter((v) => v.type === "official");
  const live = videos.filter((v) => v.type === "live" || v.type === "lyric");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-heading font-extrabold text-4xl text-cream mb-2">Videos</h1>
      <p className="text-muted mb-10">
        Official music videos and live performances ·{" "}
        <a
          href="https://youtube.com/@tbagdallas"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:underline"
        >
          @tbagdallas on YouTube
        </a>
      </p>

      {official.length > 0 && (
        <section className="mb-12">
          <h2 className="section-title">Official Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {official.map((v) => (
              <VideoEmbed key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}

      {live.length > 0 && (
        <section>
          <h2 className="section-title">Live & More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {live.map((v) => (
              <VideoEmbed key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
