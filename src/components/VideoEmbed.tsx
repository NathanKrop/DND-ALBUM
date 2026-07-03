import type { Video } from "@/data/music";

const typeLabel: Record<Video["type"], string> = {
  official: "Official Video",
  live: "Live Performance",
  lyric: "Lyric Video",
};

export default function VideoEmbed({ video }: { video: Video }) {
  if (!video.youtubeId) {
    return (
      <div className="card bg-navy/50 border border-gold/20">
        <div className="relative w-full aspect-video bg-navy flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted text-sm">Coming Soon</p>
          </div>
        </div>
        <div className="p-4">
          <span className="text-xs font-heading font-semibold text-gold uppercase tracking-wider">
            {typeLabel[video.type]}
          </span>
          <p className="font-heading font-bold text-cream text-sm mt-1">{video.title}</p>
          <p className="text-muted text-xs mt-1">{video.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="relative w-full aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-heading font-semibold text-gold uppercase tracking-wider">
          {typeLabel[video.type]}
        </span>
        <p className="font-heading font-bold text-cream text-sm mt-1">{video.title}</p>
        <p className="text-muted text-xs mt-1">{video.description}</p>
      </div>
    </div>
  );
}
