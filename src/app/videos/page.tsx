import { videos } from "@/data/music";
import VideoEmbed from "@/components/VideoEmbed";
import { RiYoutubeLine } from "react-icons/ri";

export const metadata = {
  title: "Videos — breezydallas",
  description: "Official music videos and live performances by breezydallas.",
};

export default function VideosPage() {
  const official = videos.filter((v) => v.type === "official");
  const live = videos.filter((v) => v.type === "live" || v.type === "lyric");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="font-heading font-extrabold text-4xl text-cream mb-2">Videos</h1>
          <p className="text-muted text-sm">{videos.length} visuals from the Delayed Not Denied era</p>
        </div>
        <a
          href="https://youtube.com/@tbagdallas"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline flex items-center gap-2 self-start sm:self-auto"
        >
          <RiYoutubeLine className="text-lg" /> Subscribe
        </a>
      </div>

      {official.length > 0 && (
        <section className="mb-14">
          <h2 className="section-title">Official Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {official.map((v) => (
              <VideoEmbed key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}

      {live.length > 0 && (
        <section>
          <h2 className="section-title">Live & More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {live.map((v) => (
              <VideoEmbed key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
