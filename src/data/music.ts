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
      { id: "dnd-01", number: 1,  title: "Delayed Not Denied",  duration: "3:52", previewUrl: "/audio/full/Amen to Yeshua (1) (2).mp3",   downloadUrl: "/audio/full/Amen to Yeshua (1) (2).mp3",   downloadSizeMb: 6.3,  youtubeId: "usdid6RQOLA" },
      { id: "dnd-02", number: 2,  title: "Burgundy Earned",     duration: "3:40", previewUrl: "/audio/full/Burgundy Earned.mp3",          downloadUrl: "/audio/full/Burgundy Earned.mp3",          downloadSizeMb: 8.4,  youtubeId: "ictleMXwbFo" },
      { id: "dnd-03", number: 3,  title: "3.A.M In Nairobi",    duration: "4:05", previewUrl: "/audio/full/3.A.M In Nairobi.mp3",         downloadUrl: "/audio/full/3.A.M In Nairobi.mp3",         downloadSizeMb: 9.4,  youtubeId: "7P-vJH5C1jQ" },
      { id: "dnd-04", number: 4,  title: "Chayenne",            duration: "3:30", previewUrl: "/audio/full/Chayenne.mp3",                 downloadUrl: "/audio/full/Chayenne.mp3",                 downloadSizeMb: 8.1,  youtubeId: "2CKL5cOtkQ4" },
      { id: "dnd-05", number: 5,  title: "Dream-Ear",           duration: "3:44", previewUrl: "/audio/full/Dream-Ear.mp3",                downloadUrl: "/audio/full/Dream-Ear.mp3",                downloadSizeMb: 8.6,  youtubeId: "Ffkwc4hrMTE" },
      { id: "dnd-06", number: 6,  title: "Yeshua Lives",        duration: "3:58", previewUrl: "/audio/full/Amen to Yeshua (1) (2).mp3",   downloadUrl: "/audio/full/Amen to Yeshua (1) (2).mp3",   downloadSizeMb: 9.1,  youtubeId: "NCiS61jBvFQ" },
      { id: "dnd-07", number: 7,  title: "Call It A Year",      duration: "3:22", previewUrl: "/audio/full/Call It A Year.mp3",           downloadUrl: "/audio/full/Call It A Year.mp3",           downloadSizeMb: 7.7,  youtubeId: "idME17uqo50" },
      { id: "dnd-08", number: 8,  title: "All On Us",           duration: "4:12", previewUrl: "/audio/full/All On Us.mp4",                downloadUrl: "/audio/full/All On Us.mp4",                downloadSizeMb: 6.0,  youtubeId: "3daKPXNweJk" },
      { id: "dnd-09", number: 9,  title: "Ordinary Unusual",    duration: "3:33", previewUrl: "/audio/full/Ordinary Unusual.mp3",         downloadUrl: "/audio/full/Ordinary Unusual.mp3",         downloadSizeMb: 8.1,  youtubeId: "JyvNPYSumbY" },
      { id: "dnd-10", number: 10, title: "Run It",              duration: "3:47", previewUrl: "/audio/full/Run It.mp3",                   downloadUrl: "/audio/full/Run It.mp3",                   downloadSizeMb: 8.7,  youtubeId: "ColcrqvAnzE" },
      { id: "dnd-11", number: 11, title: "Plagiarized Swag",    duration: "4:01", previewUrl: "/audio/full/Plagiarized Swag.mp3",         downloadUrl: "/audio/full/Plagiarized Swag.mp3",         downloadSizeMb: 9.2,  youtubeId: "DxkEpDfh1dA" },
      { id: "dnd-12", number: 12, title: "Jiu Jitsu",           duration: "2:55", previewUrl: "/audio/full/JiuJitsu.mp3",                 downloadUrl: "/audio/full/JiuJitsu.mp3",                 downloadSizeMb: 6.7,  youtubeId: "-AqWuDQbRbA" },
      { id: "dnd-13", number: 13, title: "Dont Mind Me",        duration: "3:28", previewUrl: "/audio/full/Dont Mind Me.mp3",             downloadUrl: "/audio/full/Dont Mind Me.mp3",             downloadSizeMb: 8.2,  youtubeId: "0vzXO4VQJDg" },
      { id: "dnd-14", number: 14, title: "Financially Horney",  duration: "3:15", previewUrl: "/audio/full/Financially Horney.mp3",       downloadUrl: "/audio/full/Financially Horney.mp3",       downloadSizeMb: 7.9,  youtubeId: "HEjjFLw_WoE" },
      { id: "dnd-15", number: 15, title: "Ruff Tuff",           duration: "3:56", previewUrl: "/audio/full/Ruff Tuff.mp3",                downloadUrl: "/audio/full/Ruff Tuff.mp3",                downloadSizeMb: 9.3,  youtubeId: "CVeVjgGqU9A" },
      { id: "dnd-16", number: 16, title: "Song Cry",            duration: "4:23", previewUrl: "/audio/full/Song Cry.mp3",                 downloadUrl: "/audio/full/Song Cry.mp3",                 downloadSizeMb: 10.1, youtubeId: "PGOz6x--0N4" },
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
  { id: "v-01",  youtubeId: "usdid6RQOLA", title: "Delayed Not Denied",  description: "Official visual for Delayed Not Denied.",  type: "official", date: "2024-01-01" },
  { id: "v-02",  youtubeId: "ictleMXwbFo", title: "Burgundy Earned",     description: "Official visual for Burgundy Earned.",     type: "official", date: "2024-01-01" },
  { id: "v-03",  youtubeId: "7P-vJH5C1jQ", title: "3.A.M In Nairobi",    description: "Official visual for 3.A.M In Nairobi.",    type: "official", date: "2024-01-01" },
  { id: "v-04",  youtubeId: "2CKL5cOtkQ4", title: "Chayenne",            description: "Official visual for Chayenne.",            type: "official", date: "2024-01-01" },
  { id: "v-05",  youtubeId: "Ffkwc4hrMTE", title: "Dream-Ear",           description: "Official visual for Dream-Ear.",           type: "official", date: "2024-01-01" },
  { id: "v-06",  youtubeId: "NCiS61jBvFQ", title: "Yeshua Lives",        description: "Official visual for Yeshua Lives.",        type: "official", date: "2024-01-01" },
  { id: "v-07",  youtubeId: "idME17uqo50", title: "Call It A Year",      description: "Official visual for Call It A Year.",      type: "official", date: "2024-01-01" },
  { id: "v-08",  youtubeId: "3daKPXNweJk", title: "All On Us",           description: "Official visual for All On Us.",           type: "official", date: "2024-01-01" },
  { id: "v-09",  youtubeId: "JyvNPYSumbY", title: "Ordinary Unusual",    description: "Official visual for Ordinary Unusual.",    type: "official", date: "2024-01-01" },
  { id: "v-10",  youtubeId: "ColcrqvAnzE", title: "Run It",              description: "Official visual for Run It.",              type: "official", date: "2024-01-01" },
  { id: "v-11",  youtubeId: "DxkEpDfh1dA", title: "Plagiarized Swag",   description: "Official visual for Plagiarized Swag.",    type: "official", date: "2024-01-01" },
  { id: "v-12",  youtubeId: "-AqWuDQbRbA", title: "Jiu Jitsu",          description: "Official visual for Jiu Jitsu.",           type: "official", date: "2024-01-01" },
  { id: "v-13",  youtubeId: "0vzXO4VQJDg", title: "Dont Mind Me",       description: "Official visual for Dont Mind Me.",        type: "official", date: "2024-01-01" },
  { id: "v-14",  youtubeId: "HEjjFLw_WoE", title: "Financially Horney", description: "Official visual for Financially Horney.",  type: "official", date: "2024-01-01" },
  { id: "v-15",  youtubeId: "CVeVjgGqU9A", title: "Ruff Tuff",          description: "Official visual for Ruff Tuff.",           type: "official", date: "2024-01-01" },
  { id: "v-16",  youtubeId: "PGOz6x--0N4", title: "Song Cry",           description: "Official visual for Song Cry.",            type: "official", date: "2024-01-01" },
  { id: "v-17",  youtubeId: "wAnxiULF-yE", title: "Breezy Dallas Performance at CUEA — GABA Presents",              description: "Live performance at CUEA, GABA Presents.",          type: "live", date: "2022-01-01" },
  { id: "v-18",  youtubeId: "UnibEDRP0jM", title: "Breezy Dallas Performing at the UEAB Show — November 12th 2022", description: "Live set at the UEAB Show, November 12th 2022.", type: "live", date: "2022-11-12" },
];
