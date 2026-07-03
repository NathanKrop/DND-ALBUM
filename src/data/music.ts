export interface Track {
  id: string;
  number: number;
  title: string;
  duration: string;
  previewUrl: string;
  downloadUrl: string;
  downloadSizeMb: number;
  youtubeId?: string;
  lyrics?: string;
  feat?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  coverArt: string;
  description: string;
  downloadZipUrl: string;
  downloadZipSizeMb: number;
  tracks: Track[];
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  type: "official" | "live" | "lyric";
  date: string;
}

export interface BonusTrack {
  id: string;
  title: string;
  artist: string;
  audiomackUrl: string;
  downloadUrl: string;
  coverArt: string;
}

export const albums: Album[] = [
  {
    id: "delayed-not-denied",
    title: "Delayed Not Denied",
    artist: "breezydallas",
    year: 2024,
    genre: "Gospel Hip-Hop / R&B",
    coverArt: "/images/AlbumCover.jpeg",
    description:
      "16 tracks of faith-driven gospel hip-hop from Nairobi, Kenya. A testament that delays are not denials.",
    downloadZipUrl: "/downloads/delayed-not-denied.zip",
    downloadZipSizeMb: 142,
    tracks: [
      { id: "dnd-01", number: 1,  title: "Delayed Not Denied",  duration: "3:52", previewUrl: "/audio/full/Delayed Not Denied.mpeg",  downloadUrl: "/audio/full/Delayed Not Denied.mpeg",  downloadSizeMb: 8.9 },
      { id: "dnd-02", number: 2,  title: "Burgundy Earned",     duration: "3:40", previewUrl: "/audio/full/Burgundy Earned.mpeg",     downloadUrl: "/audio/full/Burgundy Earned.mpeg",     downloadSizeMb: 8.4 },
      { id: "dnd-03", number: 3,  title: "3.A.M In Nairobi",    duration: "4:05", previewUrl: "/audio/full/3.A.M In Nairobi.mpeg",    downloadUrl: "/audio/full/3.A.M In Nairobi.mpeg",    downloadSizeMb: 9.4 },
      { id: "dnd-04", number: 4,  title: "Chayenne",            duration: "3:30", previewUrl: "/audio/full/Chayenne.mpeg",            downloadUrl: "/audio/full/Chayenne.mpeg",            downloadSizeMb: 8.1 },
      { id: "dnd-05", number: 5,  title: "Dream-Ear",           duration: "3:44", previewUrl: "/audio/full/Dream-Ear.mpeg",           downloadUrl: "/audio/full/Dream-Ear.mpeg",           downloadSizeMb: 8.6 },
      { id: "dnd-06", number: 6,  title: "Yeshua Lives",        duration: "3:58", previewUrl: "/audio/full/Yeshua Lives.mpeg",        downloadUrl: "/audio/full/Yeshua Lives.mpeg",        downloadSizeMb: 9.1 },
      { id: "dnd-07", number: 7,  title: "Call It A Year",      duration: "3:22", previewUrl: "/audio/full/Call It A Year.mpeg",      downloadUrl: "/audio/full/Call It A Year.mpeg",      downloadSizeMb: 7.7 },
      { id: "dnd-08", number: 8,  title: "All On Us",           duration: "4:12", previewUrl: "/audio/full/All On Us.mp4",            downloadUrl: "/audio/full/All On Us.mp4",            downloadSizeMb: 9.7 },
      { id: "dnd-09", number: 9,  title: "Ordinary Unusual",    duration: "3:33", previewUrl: "/audio/full/Ordinary Unusual.mpeg",    downloadUrl: "/audio/full/Ordinary Unusual.mpeg",    downloadSizeMb: 8.1 },
      { id: "dnd-10", number: 10, title: "Run It",              duration: "3:47", previewUrl: "/audio/full/Run It.mpeg",              downloadUrl: "/audio/full/Run It.mpeg",              downloadSizeMb: 8.7 },
      { id: "dnd-11", number: 11, title: "Plagiarized Swag",    duration: "4:01", previewUrl: "/audio/full/Plagiarized Swag.mpeg",    downloadUrl: "/audio/full/Plagiarized Swag.mpeg",    downloadSizeMb: 9.2 },
      { id: "dnd-12", number: 12, title: "Jiu Jitsu",           duration: "2:55", previewUrl: "/audio/full/JiuJitsu.mpeg",            downloadUrl: "/audio/full/JiuJitsu.mpeg",            downloadSizeMb: 6.7 },
      { id: "dnd-13", number: 13, title: "Dont Mind Me",        duration: "3:28", previewUrl: "/audio/full/Dont Mind Me.mpeg",        downloadUrl: "/audio/full/Dont Mind Me.mpeg",        downloadSizeMb: 8.2 },
      { id: "dnd-14", number: 14, title: "Financially Horney",  duration: "3:15", previewUrl: "/audio/full/Financially Horney.mpeg",  downloadUrl: "/audio/full/Financially Horney.mpeg",  downloadSizeMb: 7.9 },
      { id: "dnd-15", number: 15, title: "Ruff Tuff",           duration: "3:56", previewUrl: "/audio/full/Ruff Tuff.mpeg",           downloadUrl: "/audio/full/Ruff Tuff.mpeg",           downloadSizeMb: 9.3 },
      { id: "dnd-16", number: 16, title: "Song Cry",            duration: "4:23", previewUrl: "/audio/full/Song Cry.mpeg",            downloadUrl: "/audio/full/Song Cry.mpeg",            downloadSizeMb: 10.1 },
    ],
  },
];

export const bonusTracks: BonusTrack[] = [
  {
    id: "bonus-01",
    title: "On Deck",
    artist: "breezydallas",
    audiomackUrl: "https://audiomack.com/breezy-dallas/song/breezy-dallas-on-deck-mp3",
    downloadUrl: "https://audiomack.com/breezy-dallas/song/breezy-dallas-on-deck-mp3",
    coverArt: "/images/AlbumCover.jpeg",
  },
];

export const videos: Video[] = [
  { id: "v-01", youtubeId: "", title: "Delayed Not Denied — Official Music Video", description: "The official music video for the title track.", type: "official", date: "2024-01-01" },
  { id: "v-02", youtubeId: "", title: "Yeshua Lives — Official Music Video",        description: "Official visual for Yeshua Lives.",           type: "official", date: "2024-03-01" },
  { id: "v-03", youtubeId: "", title: "Live at Nairobi — Full Performance",         description: "Full live set from Nairobi.",                 type: "live",     date: "2024-05-01" },
];
