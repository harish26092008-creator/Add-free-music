/**
 * SPOTIFY WEB PLAYER - CORE APPLICATION ENGINE
 * Features:
 * - Complete 52+ Track Kollywood & Anirudh Hits Database
 * - Real-time Audio Playback with ImageKit & Local Fallback
 * - Dynamic Ambient Background Colors & Glassmorphic Headers
 * - Search with Real-time Filtering across Title, Artist, & Album
 * - Dynamic Playlist Detail Views & Liked Songs Shelf
 * - Interactive Scrubbing & Volume with Custom Spotify Sliders
 * - Right Sidebar (Now Playing & Queue Views)
 * - Fullscreen & Karaoke Lyrics Mode with Sound Wave Visualizer
 * - Keyboard Shortcuts & OS Media Session Integration
 */

(function () {
  'use strict';

  // Helper to generate crisp SVG Album Arts with vibrant gradients and typography
  function generateCoverSvg(title, artist, primaryColor, secondaryColor, iconSymbol) {
    const safeTitle = title.length > 18 ? title.substring(0, 16) + '..' : title;
    const safeArtist = artist.length > 20 ? artist.substring(0, 18) + '..' : artist;
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primaryColor}" />
          <stop offset="100%" stop-color="${secondaryColor}" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.25)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.5)" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#grad)" />
      <rect width="400" height="400" fill="url(#glow)" />
      <!-- Vinyl Ring Details -->
      <circle cx="200" cy="180" r="130" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
      <circle cx="200" cy="180" r="100" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
      <circle cx="200" cy="180" r="70" fill="rgba(0,0,0,0.25)" />
      
      <!-- Center Music Symbol -->
      <text x="200" y="200" font-family="'Plus Jakarta Sans', sans-serif" font-size="52" fill="#ffffff" text-anchor="middle" opacity="0.95">${iconSymbol || '🎵'}</text>
      
      <!-- Song Title and Artist Banner -->
      <rect x="24" y="304" width="352" height="72" rx="10" fill="rgba(0,0,0,0.45)" backdrop-filter="blur(10px)" />
      <text x="44" y="336" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="20" fill="#ffffff">${safeTitle}</text>
      <text x="44" y="360" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="14" fill="rgba(255,255,255,0.8)">${safeArtist}</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // COMPLETE SONG DATABASE FROM USER URLS
  const TRACKS = [
    {
      id: 1,
      title: "Boomi Enna Suthudhe",
      artist: "Anirudh Ravichander",
      album: "Ethir Neechal",
      duration: "4:16",
      durationSec: 256,
      category: "kuthu",
      themeColor: "#1d4ed8",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Boomi-Enna-Suthudhe.mp3",
      fallbackUrl: "songs/Boomi-Enna-Suthudhe.mp3",
      cover: generateCoverSvg("Boomi Enna Suthudhe", "Anirudh", "#1e3a8a", "#0f172a", "⚡"),
      lyrics: [
        "Boomi enna suthudhe...",
        "En thalaikeela aagudhe...",
        "Kaathu kooda kaathil vandhu paattu paadudhe!",
        "Ethir neechal adi, paattukku aatam poodu!"
      ]
    },
    {
      id: 2,
      title: "Ethir Neechal (Title Track)",
      artist: "Anirudh, Honey Singh, Hiphop Tamizha",
      album: "Ethir Neechal",
      duration: "4:28",
      durationSec: 268,
      category: "anirudh",
      themeColor: "#047857",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Ethir-Neechal.mp3",
      fallbackUrl: "songs/Ethir-Neechal.mp3",
      cover: generateCoverSvg("Ethir Neechal", "Anirudh ft. Honey", "#065f46", "#022c22", "🔥"),
      lyrics: [
        "Ethir neechal adi adiye...",
        "Nalla kaalam varudhu paaru...",
        "Yo Yo Honey Singh with Rockstar Anirudh!",
        "Vetri kodi yethu machi thottadhallam hit!"
      ]
    },
    {
      id: 3,
      title: "Aathi",
      artist: "Vishal Dadlani, Anirudh Ravichander",
      album: "Kaththi",
      duration: "5:04",
      durationSec: 304,
      category: "vijay",
      themeColor: "#b91c1c",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Aathi.mp3",
      fallbackUrl: "songs/Aathi.mp3",
      cover: generateCoverSvg("Aathi", "Kaththi • Vijay", "#991b1b", "#450a0a", "🗡️"),
      lyrics: [
        "Aathi enna nee paatha udane kaathil parandhen...",
        "Kaadhal vandhadhum kanavugalo kooda serndhadhe!",
        "Kaththi mass theme, theri hits!"
      ]
    },
    {
      id: 4,
      title: "Kutti Story",
      artist: "Thalapathy Vijay, Anirudh Ravichander",
      album: "Master",
      duration: "5:22",
      durationSec: 322,
      category: "vijay",
      themeColor: "#d97706",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Kutti-Story-MassTamilan.io.mp3",
      fallbackUrl: "songs/Kutti-Story-MassTamilan.io.mp3",
      cover: generateCoverSvg("Kutti Story", "Thalapathy Vijay", "#b45309", "#78350f", "🎙️"),
      lyrics: [
        "Let me sing a kutti story, pay attention, listen to me...",
        "Life is very short nanba, always be happy!",
        "Design your life, keep your head high!"
      ]
    },
    {
      id: 5,
      title: "Megham Karukatha",
      artist: "Dhanush, Anirudh Ravichander",
      album: "Thiruchitrambalam",
      duration: "4:07",
      durationSec: 247,
      category: "dhanush",
      themeColor: "#0284c7",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Megham-Karukatha-MassTamilan.dev.mp3",
      fallbackUrl: "songs/Megham-Karukatha-MassTamilan.dev.mp3",
      cover: generateCoverSvg("Megham Karukatha", "Dhanush • Anirudh", "#0369a1", "#082f49", "🌧️"),
      lyrics: [
        "Megham karukatha penne penne...",
        "Mazhai vara paarkudha kanne kanne...",
        "Un mugam paartha pothum nenje...",
        "Kaadhal megangal koodudhe!"
      ]
    },
    {
      id: 6,
      title: "Aaluma Doluma",
      artist: "Anirudh Ravichander, Badshah",
      album: "Vedalam",
      duration: "4:20",
      durationSec: 260,
      category: "kuthu",
      themeColor: "#dc2626",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Aaluma-Doluma.mp3",
      fallbackUrl: "songs/Aaluma-Doluma.mp3",
      cover: generateCoverSvg("Aaluma Doluma", "Anirudh • Vedalam", "#dc2626", "#450a0a", "🥁"),
      lyrics: [
        "Aaluma doluma aiyanaaru aaluma...",
        "Nakkalukku aala vandha dholakku dholuma!",
        "Theri baby, theri baby, aadu machan aadu!"
      ]
    },
    {
      id: 7,
      title: "Arabic Kuthu (Halamithi Habibo)",
      artist: "Anirudh Ravichander, Jonita Gandhi",
      album: "Beast",
      duration: "4:39",
      durationSec: 279,
      category: "vijay",
      themeColor: "#ea580c",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Arabic-Kuthu---Halamithi-Habibo-MassTamilan.so.mp3",
      fallbackUrl: "songs/Arabic-Kuthu---Halamithi-Habibo-MassTamilan.so.mp3",
      cover: generateCoverSvg("Arabic Kuthu", "Beast • Jonita", "#ea580c", "#7c2d12", "💃"),
      lyrics: [
        "Halamithi habibo habibo...",
        "Malama pitha pithadhe...",
        "Holigo holigo holi go!",
        "Arabic vibes with Chennai beats!"
      ]
    },
    {
      id: 8,
      title: "Magale",
      artist: "GV Prakash Kumar, Shweta Mohan",
      album: "Sir / Vaathi",
      duration: "3:48",
      durationSec: 228,
      category: "dhanush",
      themeColor: "#7c3aed",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Magale.mp3",
      fallbackUrl: "songs/Magale.mp3",
      cover: generateCoverSvg("Magale", "GV Prakash", "#6d28d9", "#3b0764", "🌸"),
      lyrics: [
        "Magale un siripinil vazhgiren...",
        "En uyir muzhuvadhilum un ninaive...",
        "Anbin alaiyil karaigiren!"
      ]
    },
    {
      id: 9,
      title: "Karuppa Kooda Va",
      artist: "Anirudh Ravichander",
      album: "Kolar Action Special",
      duration: "3:35",
      durationSec: 215,
      category: "action",
      themeColor: "#374151",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Karuppa%20Kooda%20Va.mp3",
      fallbackUrl: "songs/Karuppa Kooda Va.mp3",
      cover: generateCoverSvg("Karuppa Kooda Va", "Anirudh", "#374151", "#111827", "🦅"),
      lyrics: [
        "Karuppa kooda va, idhu veerarin bhoomi!",
        "Puyal vandhu modhinaalum nillu thaandi!",
        "Adhirattum aatam, idhu thalaivar kaalam!"
      ]
    },
    {
      id: 10,
      title: "Aravindh Theme",
      artist: "Anirudh Ravichander",
      album: "Original Motion Picture Score",
      duration: "3:12",
      durationSec: 192,
      category: "action",
      themeColor: "#0f766e",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Aravindh.mp3",
      fallbackUrl: "songs/Aravindh.mp3",
      cover: generateCoverSvg("Aravindh Theme", "Anirudh Score", "#0f766e", "#134e4a", "🎻"),
      lyrics: [
        "(Instrumental Symphony)",
        "Powerful strings and brass building the crescendo...",
        "The adrenaline rush of Rockstar Anirudh's signature score."
      ]
    },
    {
      id: 11,
      title: "God Mode",
      artist: "Anirudh Ravichander",
      album: "Leo",
      duration: "2:58",
      durationSec: 178,
      category: "action",
      themeColor: "#991b1b",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/God%20Mode.mp3",
      fallbackUrl: "songs/God Mode.mp3",
      cover: generateCoverSvg("God Mode", "Leo • Anirudh", "#991b1b", "#18181b", "🦁"),
      lyrics: [
        "Badass Mr Leo Das is on the track!",
        "Nobody can touch him when he is in God Mode!",
        "Bloody sweet, bloody sweet!"
      ]
    },
    {
      id: 12,
      title: "Ala Bolelo",
      artist: "Anirudh Ravichander",
      album: "Party Mix",
      duration: "3:40",
      durationSec: 220,
      category: "kuthu",
      themeColor: "#c026d3",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Ala%20Bolelo.mp3",
      fallbackUrl: "songs/Ala Bolelo.mp3",
      cover: generateCoverSvg("Ala Bolelo", "Anirudh Party", "#c026d3", "#701a75", "🎉"),
      lyrics: [
        "Ala bolelo, aatam poodu thala!",
        "Vibe-u yethu, floor-a kizhi machan!",
        "Bass drop incoming!"
      ]
    },
    {
      id: 13,
      title: "Chella Magale",
      artist: "Govind Vasantha, Pradeep Kumar",
      album: "Meiyazhagan",
      duration: "4:15",
      durationSec: 255,
      category: "anirudh",
      themeColor: "#059669",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Chella%20Magale.mp3",
      fallbackUrl: "songs/Chella Magale.mp3",
      cover: generateCoverSvg("Chella Magale", "Meiyazhagan", "#059669", "#064e3b", "🍃"),
      lyrics: [
        "Chella magale un sirippai paarthaal podhum...",
        "En kangal kooda kanneer sinthumo...",
        "Azhage anbin uruvame!"
      ]
    },
    {
      id: 14,
      title: "Monica",
      artist: "Anirudh Ravichander",
      album: "Coolie (Original Track)",
      duration: "3:25",
      durationSec: 205,
      category: "anirudh",
      themeColor: "#4f46e5",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Monica.mp3",
      fallbackUrl: "songs/Monica.mp3",
      cover: generateCoverSvg("Monica", "Coolie • Anirudh", "#4338ca", "#1e1b4b", "💎"),
      lyrics: [
        "Monica oh Monica...",
        "Un parvaiyil engudhe nenjam!",
        "Groovy synth waves and rocking rhythms."
      ]
    },
    {
      id: 15,
      title: "Mandaadi Mandaadi",
      artist: "Anirudh Ravichander",
      album: "Kollywood Folk",
      duration: "3:50",
      durationSec: 230,
      category: "kuthu",
      themeColor: "#b91c1c",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Mandaadi%20Mandaadi.mp3",
      fallbackUrl: "songs/Mandaadi Mandaadi.mp3",
      cover: generateCoverSvg("Mandaadi Mandaadi", "Folk Anthem", "#b91c1c", "#450a0a", "🪘"),
      lyrics: [
        "Mandaadi mandaadi oora koottu!",
        "Thappu thavilu katti paatu paadu!",
        "Sandhoshama aatam poodu!"
      ]
    },
    {
      id: 16,
      title: "Jolly O Gymkhana",
      artist: "Thalapathy Vijay, Anirudh Ravichander",
      album: "Beast",
      duration: "4:46",
      durationSec: 286,
      category: "vijay",
      themeColor: "#eab308",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Jolly-O-Gymkhana-MassTamilan.so.mp3",
      fallbackUrl: "songs/Jolly-O-Gymkhana-MassTamilan.so.mp3",
      cover: generateCoverSvg("Jolly O Gymkhana", "Vijay • Beast", "#ca8a04", "#713f12", "🌴"),
      lyrics: [
        "Jolly o gymkhana, chillax pannu nanba!",
        "Kavalaiya vittu thallu, jolly aatam poodu!",
        "Sun glasses poodu, beach-il kondaadu!"
      ]
    },
    {
      id: 17,
      title: "Dippam Dappam",
      artist: "Anthony Daasan, Anirudh Ravichander",
      album: "Kaathuvaakula Rendu Kaadhal",
      duration: "3:44",
      durationSec: 224,
      category: "anirudh",
      themeColor: "#ec4899",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Dippam-Dappam-MassTamilan.so.mp3",
      fallbackUrl: "songs/Dippam-Dappam-MassTamilan.so.mp3",
      cover: generateCoverSvg("Dippam Dappam", "KRK • Anthony", "#db2777", "#831843", "💖"),
      lyrics: [
        "Dippam dappam dippam dappam...",
        "Un pinnala vandhen paaru!",
        "Rendu kaadhal oru manadhil...",
        "Kanjaadai pesudhe!"
      ]
    },
    {
      id: 18,
      title: "Jalabulajangu",
      artist: "Anirudh Ravichander, Rokesh",
      album: "Don",
      duration: "3:25",
      durationSec: 205,
      category: "kuthu",
      themeColor: "#0284c7",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Jalabulajangu-MassTamilan.dev.mp3",
      fallbackUrl: "songs/Jalabulajangu-MassTamilan.dev.mp3",
      cover: generateCoverSvg("Jalabulajangu", "Don • Sivakarthikeyan", "#0284c7", "#082f49", "🎓"),
      lyrics: [
        "Jalabulajangu jalabulajangu...",
        "College kulla vantha massu!",
        "Don don don vazhkaye fun!"
      ]
    },
    {
      id: 19,
      title: "Hayyoda",
      artist: "Anirudh Ravichander, Priya Mali",
      album: "Jawan",
      duration: "3:22",
      durationSec: 202,
      category: "anirudh",
      themeColor: "#f43f5e",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Hayyoda-MassTamilan.dev.mp3",
      fallbackUrl: "songs/Hayyoda-MassTamilan.dev.mp3",
      cover: generateCoverSvg("Hayyoda", "Jawan • Anirudh", "#e11d48", "#881337", "🌹"),
      lyrics: [
        "Hayyoda hayyoda un kannala naan vizhunthen...",
        "Tholaidhooram pogamal un thol saaindhen!",
        "Kaadhal malarum oru pudhiya pozhudhil..."
      ]
    },
    {
      id: 20,
      title: "Naanga Naalu Peru",
      artist: "Anirudh Ravichander & Friends",
      album: "Squad Hits",
      duration: "3:30",
      durationSec: 210,
      category: "anirudh",
      themeColor: "#10b981",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Naanga%20Naalu%20Peru.mp3",
      fallbackUrl: "songs/Naanga Naalu Peru.mp3",
      cover: generateCoverSvg("Naanga Naalu Peru", "Friendship Mix", "#059669", "#064e3b", "🤝"),
      lyrics: [
        "Naanga naalu peru serndha thaana massu!",
        "Friendship-ukku illada end card-u!",
        "Together forever!"
      ]
    },
    {
      id: 21,
      title: "Bye Bye Bhaiya",
      artist: "Anirudh Ravichander",
      album: "Fun Club",
      duration: "3:10",
      durationSec: 190,
      category: "anirudh",
      themeColor: "#8b5cf6",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Bye%20Bye%20Bhaiya.mp3",
      fallbackUrl: "songs/Bye Bye Bhaiya.mp3",
      cover: generateCoverSvg("Bye Bye Bhaiya", "Anirudh Club", "#7c3aed", "#4c1d95", "👋"),
      lyrics: [
        "Bye bye bhaiya, ta ta sonnen!",
        "Pudhu vazhkai thedi oduren nanba!"
      ]
    },
    {
      id: 22,
      title: "Goindhamma",
      artist: "Anirudh Ravichander",
      album: "Maan Karate Gaana",
      duration: "3:42",
      durationSec: 222,
      category: "kuthu",
      themeColor: "#f97316",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Goindhamma.mp3",
      fallbackUrl: "songs/Goindhamma.mp3",
      cover: generateCoverSvg("Goindhamma", "Gaana Kuthu", "#ea580c", "#7c2d12", "🥁"),
      lyrics: [
        "Goindhamma goindhamma!",
        "Kuthu paatta kelunga machan!",
        "Local dance floor shake aagudhu!"
      ]
    },
    {
      id: 23,
      title: "Andha Kanna Paathaakaa",
      artist: "Yuvan Shankar Raja, Anirudh",
      album: "Master",
      duration: "3:52",
      durationSec: 232,
      category: "vijay",
      themeColor: "#6366f1",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Andha-Kanna-Paathaakaa-MassTamilan.io.mp3",
      fallbackUrl: "songs/Andha-Kanna-Paathaakaa-MassTamilan.io.mp3",
      cover: generateCoverSvg("Andha Kanna", "Master • Yuvan", "#4f46e5", "#312e81", "✨"),
      lyrics: [
        "Andha kanna paathaakaa love aagudhe...",
        "Manasula un ninaive odudhe...",
        "Yuvan soulful voice and Anirudh production!"
      ]
    },
    {
      id: 24,
      title: "Kaavaalaa",
      artist: "Anirudh Ravichander, Shilpa Rao",
      album: "Jailer",
      duration: "3:11",
      durationSec: 191,
      category: "kuthu",
      themeColor: "#e11d48",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Kaavaalaa-MassTamilan.dev.mp3",
      fallbackUrl: "songs/Kaavaalaa-MassTamilan.dev.mp3",
      cover: generateCoverSvg("Kaavaalaa", "Jailer • Shilpa", "#e11d48", "#881337", "💃"),
      lyrics: [
        "Kaavaalaa kaavaalaa...",
        "Hukum tiger ka hukum!",
        "Dance floor fire with Tamannaah and Rajinikanth!"
      ]
    },
    {
      id: 25,
      title: "I'm Scared",
      artist: "Anirudh Ravichander",
      album: "Leo",
      duration: "2:49",
      durationSec: 169,
      category: "action",
      themeColor: "#18181b",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/I'm-Scared-MassTamilan.dev.mp3",
      fallbackUrl: "songs/I'm-Scared-MassTamilan.dev.mp3",
      cover: generateCoverSvg("I'm Scared", "Leo Dark Score", "#27272a", "#09090b", "❄️"),
      lyrics: [
        "I'm scared of what I might do...",
        "Blood runs cold in the valley of snow...",
        "Bloody sweet!"
      ]
    },
    {
      id: 26,
      title: "Aura 10/10",
      artist: "Anirudh Ravichander",
      album: "Vibe Session",
      duration: "2:55",
      durationSec: 175,
      category: "anirudh",
      themeColor: "#06b6d4",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Aura%2010-10.mp3",
      fallbackUrl: "songs/Aura 10-10.mp3",
      cover: generateCoverSvg("Aura 10/10", "Anirudh Vibe", "#0891b2", "#164e63", "🌌"),
      lyrics: [
        "Aura on ten out of ten!",
        "Pure energy in the room...",
        "Electrifying bass and rhythms."
      ]
    },
    {
      id: 27,
      title: "Rathinamo",
      artist: "Anirudh Ravichander",
      album: "Leo / Jailer Edition",
      duration: "3:20",
      durationSec: 200,
      category: "anirudh",
      themeColor: "#ca8a04",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Rathinamo.mp3",
      fallbackUrl: "songs/Rathinamo.mp3",
      cover: generateCoverSvg("Rathinamo", "Anirudh Melody", "#ca8a04", "#713f12", "👑"),
      lyrics: [
        "Rathinamo thanga kaniye...",
        "Un pugazh paadum kaalam idhuvo!"
      ]
    },
    {
      id: 28,
      title: "Ullaallaa",
      artist: "Anirudh, Nakash Aziz, Inno Genga",
      album: "Petta",
      duration: "4:56",
      durationSec: 296,
      category: "kuthu",
      themeColor: "#ea580c",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Ullaallaa-MassTamilan.org.mp3",
      fallbackUrl: "songs/Ullaallaa-MassTamilan.org.mp3",
      cover: generateCoverSvg("Ullaallaa", "Petta • Superstar", "#ea580c", "#7c2d12", "🕶️"),
      lyrics: [
        "Ullaallaa ullaallaa...",
        "Marana mass kooda thalaivar!",
        "Kaali mass intro song celebration!"
      ]
    },
    {
      id: 29,
      title: "Selfie Pulla",
      artist: "Thalapathy Vijay, Sunidhi Chauhan",
      album: "Kaththi",
      duration: "4:51",
      durationSec: 291,
      category: "vijay",
      themeColor: "#db2777",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Selfie%20Pulla.mp3",
      fallbackUrl: "songs/Selfie Pulla.mp3",
      cover: generateCoverSvg("Selfie Pulla", "Kaththi • Vijay", "#db2777", "#831843", "📸"),
      lyrics: [
        "Let me click a selfie pulla...",
        "Therikka viduvom insta kulla!",
        "Superhit dance duet by Thalapathy!"
      ]
    },
    {
      id: 30,
      title: "What a Karuvad",
      artist: "Dhanush, Anirudh Ravichander",
      album: "Velaiilla Pattadhari",
      duration: "4:28",
      durationSec: 268,
      category: "dhanush",
      themeColor: "#4f46e5",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/What%20A%20Karavad%20(1).mp3",
      fallbackUrl: "songs/What A Karavad (1).mp3",
      cover: generateCoverSvg("What a Karuvad", "VIP • Dhanush", "#4f46e5", "#312e81", "🐟"),
      lyrics: [
        "What a karuvad, what a karuvad!",
        "Amma appa sonna kelunga da!",
        "VIP Raghuvaran street mass!"
      ]
    },
    {
      id: 31,
      title: "Verappa (Extended Edition)",
      artist: "Anirudh Ravichander",
      album: "Action Score",
      duration: "3:45",
      durationSec: 225,
      category: "action",
      themeColor: "#475569",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Verappa%20-%20Extended.mp3",
      fallbackUrl: "songs/Verappa - Extended.mp3",
      cover: generateCoverSvg("Verappa Extended", "Action Score", "#475569", "#1e293b", "⚡"),
      lyrics: [
        "Verappa veera soora!",
        "Heavy metal electric guitar riffs blasting!",
        "The adrenaline peak!"
      ]
    },
    {
      id: 32,
      title: "Thaai Kelavi",
      artist: "Dhanush, Anirudh Ravichander",
      album: "Thiruchitrambalam",
      duration: "4:24",
      durationSec: 264,
      category: "dhanush",
      themeColor: "#d97706",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Thaai-Kelavi-MassTamilan.dev.mp3",
      fallbackUrl: "songs/Thaai-Kelavi-MassTamilan.dev.mp3",
      cover: generateCoverSvg("Thaai Kelavi", "Dhanush • Anirudh", "#d97706", "#78350f", "👵"),
      lyrics: [
        "Thaai kelavi thaai kelavi...",
        "Unnai vida oru azhagi illaiye!",
        "Village celebration festival mood!"
      ]
    },
    {
      id: 33,
      title: "Verithanam",
      artist: "Thalapathy Vijay, A.R. Rahman",
      album: "Bigil",
      duration: "4:15",
      durationSec: 255,
      category: "vijay",
      themeColor: "#dc2626",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Verithanam-MassTamilan.io.mp3",
      fallbackUrl: "songs/Verithanam-MassTamilan.io.mp3",
      cover: generateCoverSvg("Verithanam", "Bigil • Vijay", "#dc2626", "#7f1d1d", "⚽"),
      lyrics: [
        "Verithanam verithanam!",
        "Kulla nalla aatam poodu!",
        "Rayappan style football celebration!"
      ]
    },
    {
      id: 34,
      title: "Thangapoovey",
      artist: "Anirudh Ravichander",
      album: "Golden Melodies",
      duration: "3:40",
      durationSec: 220,
      category: "anirudh",
      themeColor: "#eab308",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Thangapoovey.mp3",
      fallbackUrl: "songs/Thangapoovey.mp3",
      cover: generateCoverSvg("Thangapoovey", "Acoustic Melody", "#ca8a04", "#713f12", "🌻"),
      lyrics: [
        "Thangapoovey un mugam sirithaal...",
        "Kaalathai marandhu vazhven!",
        "Sweet melodic guitars and vocals."
      ]
    },
    {
      id: 35,
      title: "Sodakku",
      artist: "Anthony Daasan, Anirudh Ravichander",
      album: "Thaanaa Serndha Koottam",
      duration: "4:03",
      durationSec: 243,
      category: "kuthu",
      themeColor: "#16a34a",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Sodakku-Mela-Sodakku-MassTamilan.com.mp3",
      fallbackUrl: "songs/Sodakku-Mela-Sodakku-MassTamilan.com.mp3",
      cover: generateCoverSvg("Sodakku", "TSK • Anthony", "#16a34a", "#14532d", "🫰"),
      lyrics: [
        "Sodakku mela sodakku poodu...",
        "Adhirattum aatam, Chennai kuthu fire!"
      ]
    },
    {
      id: 36,
      title: "Oru Pere Varalaaru",
      artist: "Anirudh Ravichander",
      album: "Hero Elevation Score",
      duration: "3:15",
      durationSec: 195,
      category: "vijay",
      themeColor: "#9333ea",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Oru%20Pere%20Varalaaru.mp3",
      fallbackUrl: "songs/Oru Pere Varalaaru.mp3",
      cover: generateCoverSvg("Oru Pere Varalaaru", "History Anthem", "#9333ea", "#581c87", "👑"),
      lyrics: [
        "Oru pere varalaaru aagudhe...",
        "Kodi kodi manadhil nirkum thalaivar!"
      ]
    },
    {
      id: 37,
      title: "Po Nee Po (Remix - Scream of Love)",
      artist: "Anirudh, Mohit Chauhan",
      album: "3 (Moonu)",
      duration: "4:18",
      durationSec: 258,
      category: "dhanush",
      themeColor: "#4338ca",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Po%20Nee%20Po%20(Remix%20-%20The%20Scream%20of%20Love).mp3",
      fallbackUrl: "songs/Po Nee Po (Remix - The Scream of Love).mp3",
      cover: generateCoverSvg("Po Nee Po", "3 • Dhanush", "#4338ca", "#1e1b4b", "💔"),
      lyrics: [
        "Po nee po... Thaniye thavikiren naan...",
        "En idhayam unnaiye thedudhe!",
        "The unforgettable rock ballad."
      ]
    },
    {
      id: 38,
      title: "Po Indru Neeyaga",
      artist: "Dhanush, Anirudh Ravichander",
      album: "Velaiilla Pattadhari",
      duration: "3:42",
      durationSec: 222,
      category: "dhanush",
      themeColor: "#3b82f6",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Po%20Indru%20Neeyaga.mp3",
      fallbackUrl: "songs/Po Indru Neeyaga.mp3",
      cover: generateCoverSvg("Po Indru Neeyaga", "VIP • Dhanush", "#2563eb", "#1e3a8a", "🌧️"),
      lyrics: [
        "Po indru neeyaga maranthu ennai...",
        "Un nizhal kooda pirindhadhe...",
        "Heart touching soul melody."
      ]
    },
    {
      id: 39,
      title: "Private Party",
      artist: "Anirudh Ravichander, Jonita Gandhi",
      album: "Don",
      duration: "3:37",
      durationSec: 217,
      category: "kuthu",
      themeColor: "#d946ef",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Private-Party-MassTamilan.dev.mp3",
      fallbackUrl: "songs/Private-Party-MassTamilan.dev.mp3",
      cover: generateCoverSvg("Private Party", "Don • Jonita", "#d946ef", "#701a75", "🍸"),
      lyrics: [
        "Private party private party...",
        "Enga kooda aada vandha welcome!",
        "Glamour and beat drops!"
      ]
    },
    {
      id: 40,
      title: "Polakatum Para Para",
      artist: "Santhosh Narayanan, Anirudh",
      album: "Master",
      duration: "3:38",
      durationSec: 218,
      category: "vijay",
      themeColor: "#ea580c",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Polakatum-Para-Para-MassTamilan.io.mp3",
      fallbackUrl: "songs/Polakatum-Para-Para-MassTamilan.io.mp3",
      cover: generateCoverSvg("Polakatum Para Para", "Master Bhavani", "#ea580c", "#7c2d12", "🥁"),
      lyrics: [
        "Polakatum para para...",
        "Bhavani entry folk mass!",
        "Raw percussion beats!"
      ]
    },
    {
      id: 41,
      title: "Salambala",
      artist: "Anirudh Ravichander",
      album: "Coolie Grooves",
      duration: "3:18",
      durationSec: 198,
      category: "anirudh",
      themeColor: "#2563eb",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Salambala.mp3",
      fallbackUrl: "songs/Salambala.mp3",
      cover: generateCoverSvg("Salambala", "Bass Groove", "#2563eb", "#1e3a8a", "🔊"),
      lyrics: [
        "Salambala salambala...",
        "Deep 808 bass lines and brass."
      ]
    },
    {
      id: 42,
      title: "Udhungada Sangu",
      artist: "Anirudh Ravichander",
      album: "Velaiilla Pattadhari",
      duration: "3:48",
      durationSec: 228,
      category: "dhanush",
      themeColor: "#f59e0b",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Udhungada%20Sangu.mp3",
      fallbackUrl: "songs/Udhungada Sangu.mp3",
      cover: generateCoverSvg("Udhungada Sangu", "VIP Soup Song", "#d97706", "#78350f", "🎺"),
      lyrics: [
        "Udhungada sangu mangalam illa...",
        "Soup boy anthem for all the youngsters!"
      ]
    },
    {
      id: 43,
      title: "Pappali Pazhamey",
      artist: "Anirudh Ravichander",
      album: "Village Kuthu Special",
      duration: "3:26",
      durationSec: 206,
      category: "kuthu",
      themeColor: "#ef4444",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Pappali%20Pazhamey.mp3",
      fallbackUrl: "songs/Pappali Pazhamey.mp3",
      cover: generateCoverSvg("Pappali Pazhamey", "Village Beats", "#dc2626", "#7f1d1d", "🥭"),
      lyrics: [
        "Pappali pazhamey un aasai paaru!",
        "Thara local dance vibes!"
      ]
    },
    {
      id: 44,
      title: "Sawadeeka",
      artist: "Anirudh Ravichander",
      album: "Club Electronic",
      duration: "3:02",
      durationSec: 182,
      category: "anirudh",
      themeColor: "#14b8a6",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Sawadeeka.mp3",
      fallbackUrl: "songs/Sawadeeka.mp3",
      cover: generateCoverSvg("Sawadeeka", "Club Track", "#0d9488", "#115e59", "🌴"),
      lyrics: [
        "Sawadeeka welcome to the rhythm!",
        "Upbeat electronic groove."
      ]
    },
    {
      id: 45,
      title: "Thalapathy Kacheri",
      artist: "Anirudh Ravichander",
      album: "Celebration Mass",
      duration: "3:55",
      durationSec: 235,
      category: "vijay",
      themeColor: "#b91c1c",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Thalapathy%20Kacheri.mp3",
      fallbackUrl: "songs/Thalapathy Kacheri.mp3",
      cover: generateCoverSvg("Thalapathy Kacheri", "Vijay Hits", "#b91c1c", "#450a0a", "🎪"),
      lyrics: [
        "Thalapathy kacheri arambham...",
        "Chennai thiruvizha pola kondattam!"
      ]
    },
    {
      id: 46,
      title: "Villain Yaaru",
      artist: "Anirudh Ravichander",
      album: "Leo",
      duration: "3:14",
      durationSec: 194,
      category: "action",
      themeColor: "#7f1d1d",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Villain-Yaaru-MassTamilan.dev.mp3",
      fallbackUrl: "songs/Villain-Yaaru-MassTamilan.dev.mp3",
      cover: generateCoverSvg("Villain Yaaru", "Leo • Anirudh", "#7f1d1d", "#450a0a", "🎭"),
      lyrics: [
        "Villain yaaru hero yaaru...",
        "Kathikku munnadi ellam onnu dhaan!",
        "Leo Das reigns supreme."
      ]
    },
    {
      id: 47,
      title: "Two Two Two",
      artist: "Anirudh, Sunidhi Chauhan, Sanjana",
      album: "Kaathuvaakula Rendu Kaadhal",
      duration: "2:55",
      durationSec: 175,
      category: "anirudh",
      themeColor: "#ec4899",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Two-Two-Two-MassTamilan.so.mp3",
      fallbackUrl: "songs/Two-Two-Two-MassTamilan.so.mp3",
      cover: generateCoverSvg("Two Two Two", "KRK • Sunidhi", "#db2777", "#831843", "✌️"),
      lyrics: [
        "Two two two two two two two...",
        "I love you two!",
        "Super energetic party song!"
      ]
    },
    {
      id: 48,
      title: "Thenmozhi",
      artist: "Santhosh Narayanan, Anirudh",
      album: "Thiruchitrambalam",
      duration: "3:51",
      durationSec: 231,
      category: "dhanush",
      themeColor: "#059669",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Thenmozhi-MassTamilan.dev.mp3",
      fallbackUrl: "songs/Thenmozhi-MassTamilan.dev.mp3",
      cover: generateCoverSvg("Thenmozhi", "Thiruchitrambalam", "#059669", "#064e3b", "🌺"),
      lyrics: [
        "Thenmozhi poonkodi unakkaaga vandhen...",
        "Kangalal pesudhe un anbu!",
        "Breezy melodious rhythm."
      ]
    },
    {
      id: 49,
      title: "Vibe Venuma",
      artist: "Anirudh Ravichander",
      album: "Vibe Check",
      duration: "3:05",
      durationSec: 185,
      category: "anirudh",
      themeColor: "#8b5cf6",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Vibe%20Venuma.mp3",
      fallbackUrl: "songs/Vibe Venuma.mp3",
      cover: generateCoverSvg("Vibe Venuma", "Anirudh Vibe", "#8b5cf6", "#4c1d95", "🎧"),
      lyrics: [
        "Vibe venuma bro...",
        "Sound-a thooku speaker la!",
        "Chill mode activated."
      ]
    },
    {
      id: 50,
      title: "Poda Padichiruken",
      artist: "Anirudh Ravichander",
      album: "College Anthem",
      duration: "3:20",
      durationSec: 200,
      category: "anirudh",
      themeColor: "#0284c7",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Poda%20Padichiruken.mp3",
      fallbackUrl: "songs/Poda Padichiruken.mp3",
      cover: generateCoverSvg("Poda Padichiruken", "Campus Vibes", "#0284c7", "#075985", "🎒"),
      lyrics: [
        "Poda padichiruken, ellam therinjurukken!",
        "Life is a campus, let's explore!"
      ]
    },
    {
      id: 51,
      title: "Raga of Revenge",
      artist: "Anirudh Ravichander",
      album: "Vikram",
      duration: "3:08",
      durationSec: 188,
      category: "action",
      themeColor: "#1e1b4b",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Raga%20of%20Revenge.mp3",
      fallbackUrl: "songs/Raga of Revenge.mp3",
      cover: generateCoverSvg("Raga of Revenge", "Vikram • Anirudh", "#312e81", "#0f172a", "🦅"),
      lyrics: [
        "Once upon a time there lived a ghost...",
        "Symphonic action revenge orchestration."
      ]
    },
    {
      id: 52,
      title: "Ooroda Oththa Don",
      artist: "Anirudh Ravichander",
      album: "Don",
      duration: "3:16",
      durationSec: 196,
      category: "kuthu",
      themeColor: "#d97706",
      url: "https://ik.imagekit.io/5wpdjthquc/songs/songs/Ooroda%20Oththa%20Don.mp3",
      fallbackUrl: "songs/Ooroda Oththa Don.mp3",
      cover: generateCoverSvg("Ooroda Oththa Don", "Don • SK", "#d97706", "#78350f", "💥"),
      lyrics: [
        "Ooroda oththa don ivan thaan...",
        "Pudhu trendsetter vandhutaan da!"
      ]
    }
  ];

  // PLAYLISTS METADATA
  const PLAYLISTS = [
    {
      id: "anirudh",
      title: "Rockstar Anirudh Mix",
      type: "Public Playlist",
      desc: "All the chart-topping high-voltage anthems and soothing melodies by Rockstar Anirudh Ravichander.",
      curator: "Spotify",
      saves: "4,892,104 saves",
      themeColor: "#1d4ed8",
      cover: generateCoverSvg("Rockstar Anirudh", "Master Hits", "#1e3a8a", "#0f172a", "🎸"),
      filter: (t) => t.category === "anirudh" || t.artist.toLowerCase().includes("anirudh")
    },
    {
      id: "vijay",
      title: "Thalapathy Vijay Blockbusters",
      type: "Public Playlist",
      desc: "High octane theater anthems: Beast, Master, Kaththi, Bigil and Leo.",
      curator: "Spotify",
      saves: "3,714,920 saves",
      themeColor: "#b91c1c",
      cover: generateCoverSvg("Thalapathy Hits", "Vijay Specials", "#991b1b", "#450a0a", "🦁"),
      filter: (t) => t.category === "vijay" || t.title.toLowerCase().includes("kutti") || t.title.toLowerCase().includes("arabic")
    },
    {
      id: "kuthu",
      title: "100% High Energy Kuthu & Dance",
      type: "Public Playlist",
      desc: "Instant party starters and Chennai thara local beats guaranteed to set the stage on fire.",
      curator: "Spotify",
      saves: "2,980,115 saves",
      themeColor: "#ea580c",
      cover: generateCoverSvg("Kuthu Fire", "Chennai Dance", "#ea580c", "#7c2d12", "🥁"),
      filter: (t) => t.category === "kuthu"
    },
    {
      id: "dhanush",
      title: "Dhanush Specials & Breezy Melodies",
      type: "Public Playlist",
      desc: "Soulful vocals and unforgettable melodies from Thiruchitrambalam, VIP, 3, and Vaathi.",
      curator: "Spotify",
      saves: "1,842,000 saves",
      themeColor: "#0284c7",
      cover: generateCoverSvg("Dhanush Specials", "VIP & Melodies", "#0369a1", "#082f49", "🌧️"),
      filter: (t) => t.category === "dhanush"
    },
    {
      id: "action",
      title: "Action & Dark Mode Energy",
      type: "Public Playlist",
      desc: "Intense orchestral trap and adrenaline-pumping themes from Leo, Vikram and more.",
      curator: "Spotify",
      saves: "2,120,400 saves",
      themeColor: "#374151",
      cover: generateCoverSvg("Dark Action", "Leo & Vikram", "#27272a", "#09090b", "🗡️"),
      filter: (t) => t.category === "action"
    },
    {
      id: "liked",
      title: "Liked Songs",
      type: "Your Playlist",
      desc: "Your handpicked favorite songs from Rockstar Anirudh and Kollywood.",
      curator: "Kabilan",
      saves: "Private",
      themeColor: "#450af5",
      cover: generateCoverSvg("Liked Songs", "Collection", "#4338ca", "#312e81", "💜"),
      filter: (t) => AppState.likedSongs.has(t.id)
    }
  ];

  // GENRES FOR SEARCH VIEW
  const GENRES = [
    { name: "Tamil Pop", color: "#e11d48", symbol: "🎵" },
    { name: "Kuthu & Dance", color: "#ea580c", symbol: "🥁" },
    { name: "Romance & Melodies", color: "#db2777", symbol: "💖" },
    { name: "Rockstar Anirudh", color: "#2563eb", symbol: "🎸" },
    { name: "Thalapathy Vijay", color: "#b91c1c", symbol: "🦁" },
    { name: "Dhanush Hits", color: "#0284c7", symbol: "🌧️" },
    { name: "Action & Trap", color: "#18181b", symbol: "⚡" },
    { name: "Chill & Acoustic", color: "#059669", symbol: "🍃" },
    { name: "Party Anthems", color: "#c026d3", symbol: "🎉" },
    { name: "Throwback Classics", color: "#ca8a04", symbol: "📻" }
  ];

  // APPLICATION STATE
  const AppState = {
    currentTrackIndex: 0,
    isPlaying: false,
    isShuffle: false,
    repeatMode: 'off', // 'off', 'all', 'one'
    volume: 0.8,
    isMuted: false,
    currentPlaylist: 'anirudh', // active playlist ID
    activeView: 'home', // 'home', 'search', 'playlist'
    activeCategory: 'all', // 'all', 'music', 'podcasts'
    likedSongs: new Set(JSON.parse(localStorage.getItem('sp_liked_songs') || '[1, 2, 4, 7, 11, 24]')),
    history: ['home'],
    historyIndex: 0,
    queue: [],
    queueIndex: 0,
    shuffledQueue: [],
    isRightSidebarOpen: false,
    rightSidebarMode: 'info', // 'info' or 'queue'
    isFullscreen: false
  };

  // DOM REFERENCES
  const DOM = {
    audio: document.getElementById('audioPlayer'),
    toast: document.getElementById('toast'),
    topHeader: document.getElementById('topHeader'),
    ambientGlow: document.getElementById('ambientGlow'),
    scrollContent: document.getElementById('scrollContent'),

    // Nav
    navHome: document.getElementById('navHome'),
    navSearch: document.getElementById('navSearch'),
    logoBtn: document.getElementById('logoBtn'),
    historyBackBtn: document.getElementById('historyBackBtn'),
    historyForwardBtn: document.getElementById('historyForwardBtn'),
    headerSearchBox: document.getElementById('headerSearchBox'),
    mainSearchInput: document.getElementById('mainSearchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    headerCategoryPills: document.getElementById('headerCategoryPills'),

    // Views
    homeView: document.getElementById('homeView'),
    searchView: document.getElementById('searchView'),
    playlistView: document.getElementById('playlistView'),

    // Home Shelves & Grid
    greetingHeading: document.getElementById('greetingHeading'),
    quickGrid: document.getElementById('quickGrid'),
    anirudhShelf: document.getElementById('anirudhShelf'),
    vijayShelf: document.getElementById('vijayShelf'),
    kuthuShelf: document.getElementById('kuthuShelf'),
    dhanushShelf: document.getElementById('dhanushShelf'),
    actionShelf: document.getElementById('actionShelf'),

    // Search View
    searchLiveResults: document.getElementById('searchLiveResults'),
    topResultCard: document.getElementById('topResultCard'),
    miniSongResults: document.getElementById('miniSongResults'),
    browseAllCategories: document.getElementById('browseAllCategories'),
    genreCardsGrid: document.getElementById('genreCardsGrid'),

    // Playlist View
    playlistHeroImg: document.getElementById('playlistHeroImg'),
    playlistHeroType: document.getElementById('playlistHeroType'),
    playlistHeroTitle: document.getElementById('playlistHeroTitle'),
    playlistHeroDesc: document.getElementById('playlistHeroDesc'),
    playlistHeroLikes: document.getElementById('playlistHeroLikes'),
    playlistHeroStats: document.getElementById('playlistHeroStats'),
    playlistBigPlayBtn: document.getElementById('playlistBigPlayBtn'),
    playlistHeartBtn: document.getElementById('playlistHeartBtn'),
    playlistTableFilter: document.getElementById('playlistTableFilter'),
    trackRowsList: document.getElementById('trackRowsList'),

    // Library
    libraryList: document.getElementById('libraryList'),
    libLikedSongs: document.getElementById('libLikedSongs'),
    likedCountText: document.getElementById('likedCountText'),
    libSearchToggle: document.getElementById('libSearchToggle'),
    libSearchInput: document.getElementById('libSearchInput'),

    // Player Bar
    playerArtImg: document.getElementById('playerArtImg'),
    playerTrackTitle: document.getElementById('playerTrackTitle'),
    playerTrackArtist: document.getElementById('playerTrackArtist'),
    playerHeartBtn: document.getElementById('playerHeartBtn'),
    pipModeBtn: document.getElementById('pipModeBtn'),
    expandArtBtn: document.getElementById('expandArtBtn'),

    shuffleBtn: document.getElementById('shuffleBtn'),
    prevBtn: document.getElementById('prevBtn'),
    mainPlayBtn: document.getElementById('mainPlayBtn'),
    nextBtn: document.getElementById('nextBtn'),
    repeatBtn: document.getElementById('repeatBtn'),
    repeatOneBadge: document.getElementById('repeatOneBadge'),

    currentTimeReadout: document.getElementById('currentTimeReadout'),
    totalDurationReadout: document.getElementById('totalDurationReadout'),
    playbackBarTrack: document.getElementById('playbackBarTrack'),
    playbackBarFill: document.getElementById('playbackBarFill'),
    playbackBarHandle: document.getElementById('playbackBarHandle'),
    bufferBarFill: document.getElementById('bufferBarFill'),
    scrubTooltip: document.getElementById('scrubTooltip'),

    nowPlayingToggleBtn: document.getElementById('nowPlayingToggleBtn'),
    lyricsToggleBtn: document.getElementById('lyricsToggleBtn'),
    queueToggleBtn: document.getElementById('queueToggleBtn'),
    connectDeviceBtn: document.getElementById('connectDeviceBtn'),
    volumeBtn: document.getElementById('volumeBtn'),
    volumeIcon: document.getElementById('volumeIcon'),
    volumeBarTrack: document.getElementById('volumeBarTrack'),
    volumeBarFill: document.getElementById('volumeBarFill'),
    volumeBarHandle: document.getElementById('volumeBarHandle'),
    fullscreenToggleBtn: document.getElementById('fullscreenToggleBtn'),

    // Right Sidebar
    rightSidebar: document.getElementById('rightSidebar'),
    rightPanelTitle: document.getElementById('rightPanelTitle'),
    nowPlayingPanelBody: document.getElementById('nowPlayingPanelBody'),
    queuePanelBody: document.getElementById('queuePanelBody'),
    closeRightSidebarBtn: document.getElementById('closeRightSidebarBtn'),
    toggleQueueViewBtn: document.getElementById('toggleQueueViewBtn'),
    sideCoverImg: document.getElementById('sideCoverImg'),
    sideTrackTitle: document.getElementById('sideTrackTitle'),
    sideTrackArtist: document.getElementById('sideTrackArtist'),
    sideLikeBtn: document.getElementById('sideLikeBtn'),
    sideArtistCardName: document.getElementById('sideArtistCardName'),
    sideArtistBanner: document.getElementById('sideArtistBanner'),
    sideNextImg: document.getElementById('sideNextImg'),
    sideNextTitle: document.getElementById('sideNextTitle'),
    sideNextArtist: document.getElementById('sideNextArtist'),
    sidePlayNextBtn: document.getElementById('sidePlayNextBtn'),
    sideOpenQueueBtn: document.getElementById('sideOpenQueueBtn'),
    queueNowPlayingRow: document.getElementById('queueNowPlayingRow'),
    queueListItems: document.getElementById('queueListItems'),
    clearQueueBtn: document.getElementById('clearQueueBtn'),

    // Fullscreen / Lyrics
    fullscreenModal: document.getElementById('fullscreenModal'),
    fsCloseBtn: document.getElementById('fsCloseBtn'),
    fsSourceTitle: document.getElementById('fsSourceTitle'),
    fsCoverImg: document.getElementById('fsCoverImg'),
    fsTrackTitle: document.getElementById('fsTrackTitle'),
    fsTrackArtist: document.getElementById('fsTrackArtist'),
    fsVisualizer: document.getElementById('fsVisualizer'),
    lyricsLinesWrapper: document.getElementById('lyricsLinesWrapper'),
    fsCurrentTime: document.getElementById('fsCurrentTime'),
    fsTotalDuration: document.getElementById('fsTotalDuration'),
    fsTimelineTrack: document.getElementById('fsTimelineTrack'),
    fsTimelineFill: document.getElementById('fsTimelineFill'),
    fsTimelineThumb: document.getElementById('fsTimelineThumb'),
    fsShuffleBtn: document.getElementById('fsShuffleBtn'),
    fsPrevBtn: document.getElementById('fsPrevBtn'),
    fsPlayBtn: document.getElementById('fsPlayBtn'),
    fsNextBtn: document.getElementById('fsNextBtn'),
    fsRepeatBtn: document.getElementById('fsRepeatBtn')
  };

  // TIME UTILITIES
  function formatSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function getGreeting() {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return "Good morning";
    if (hours >= 12 && hours < 17) return "Good afternoon";
    if (hours >= 17 && hours < 22) return "Good evening";
    return "Good night";
  }

  function showToast(message, isSuccess = false) {
    DOM.toast.textContent = message;
    DOM.toast.className = 'sp-toast show' + (isSuccess ? ' success' : '');
    setTimeout(() => {
      DOM.toast.className = 'sp-toast';
    }, 2400);
  }

  // =========================================================================
  // AUDIO ENGINE & PLAYBACK LOGIC
  // =========================================================================

  function initQueue() {
    // Fill initial queue from the current playlist
    const pl = PLAYLISTS.find(p => p.id === AppState.currentPlaylist) || PLAYLISTS[0];
    AppState.queue = TRACKS.filter(pl.filter);
    if (AppState.queue.length === 0) AppState.queue = [...TRACKS];
    AppState.queueIndex = 0;
  }

  function loadTrack(trackIndex, autoPlay = true) {
    if (trackIndex < 0 || trackIndex >= TRACKS.length) trackIndex = 0;
    AppState.currentTrackIndex = trackIndex;
    const track = TRACKS[trackIndex];

    // Set Audio Source: Primary ImageKit URL, with error fallback
    DOM.audio.src = track.url;
    DOM.audio.load();

    // Fallback if network or CORS has any issue
    DOM.audio.onerror = function () {
      console.warn("Primary URL failed, falling back to local file:", track.fallbackUrl);
      DOM.audio.onerror = null;
      DOM.audio.src = track.fallbackUrl;
      DOM.audio.load();
      if (autoPlay) {
        DOM.audio.play().catch(e => console.log("Audio playback error:", e));
      }
    };

    updatePlayerUI(track);
    updateAmbientColor(track.themeColor);

    if (autoPlay) {
      DOM.audio.play()
        .then(() => {
          AppState.isPlaying = true;
          updatePlayPauseButtonUI(true);
        })
        .catch(err => {
          console.log("Playback prevented (waiting for user gesture):", err);
          AppState.isPlaying = false;
          updatePlayPauseButtonUI(false);
        });
    }

    updateTrackRowVisuals();
    updateRightSidebarUI();
    updateLyricsUI(track);
    updateMediaSession(track);
  }

  function playTrackById(trackId) {
    const idx = TRACKS.findIndex(t => t.id === trackId);
    if (idx !== -1) {
      loadTrack(idx, true);
    }
  }

  function togglePlayPause() {
    if (!DOM.audio.src || DOM.audio.src === "") {
      loadTrack(0, true);
      return;
    }

    if (DOM.audio.paused) {
      DOM.audio.play()
        .then(() => {
          AppState.isPlaying = true;
          updatePlayPauseButtonUI(true);
        })
        .catch(err => console.log("Play failed:", err));
    } else {
      DOM.audio.pause();
      AppState.isPlaying = false;
      updatePlayPauseButtonUI(false);
    }
    updateTrackRowVisuals();
  }

  function nextTrack() {
    let nextIndex;
    if (AppState.isShuffle) {
      nextIndex = Math.floor(Math.random() * TRACKS.length);
    } else {
      nextIndex = (AppState.currentTrackIndex + 1) % TRACKS.length;
    }
    loadTrack(nextIndex, true);
  }

  function prevTrack() {
    // If > 3 seconds in, seek to beginning first
    if (DOM.audio.currentTime > 3) {
      DOM.audio.currentTime = 0;
      return;
    }
    let prevIndex = (AppState.currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    loadTrack(prevIndex, true);
  }

  function updatePlayPauseButtonUI(isPlaying) {
    const playIcon = '<i class="fa-solid fa-play"></i>';
    const pauseIcon = '<i class="fa-solid fa-pause"></i>';
    const icon = isPlaying ? pauseIcon : playIcon;

    DOM.mainPlayBtn.innerHTML = icon;
    DOM.mainPlayBtn.title = isPlaying ? "Pause" : "Play";
    DOM.fsPlayBtn.innerHTML = icon;

    // Big playlist play button
    DOM.playlistBigPlayBtn.innerHTML = icon;

    // Visualizer in Fullscreen
    if (isPlaying) {
      DOM.fsVisualizer.classList.add('active');
    } else {
      DOM.fsVisualizer.classList.remove('active');
    }
  }

  function updatePlayerUI(track) {
    DOM.playerArtImg.src = track.cover;
    DOM.playerTrackTitle.textContent = track.title;
    DOM.playerTrackArtist.textContent = track.artist;
    DOM.totalDurationReadout.textContent = track.duration;

    // Liked heart in player
    const isLiked = AppState.likedSongs.has(track.id);
    DOM.playerHeartBtn.innerHTML = isLiked ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
    DOM.playerHeartBtn.className = 'player-heart-btn' + (isLiked ? ' liked' : '');

    // Reset progress
    DOM.playbackBarFill.style.width = '0%';
    DOM.playbackBarHandle.style.left = '0%';
    DOM.currentTimeReadout.textContent = "0:00";

    // Fullscreen updates
    DOM.fsCoverImg.src = track.cover;
    DOM.fsTrackTitle.textContent = track.title;
    DOM.fsTrackArtist.textContent = track.artist;
    DOM.fsTotalDuration.textContent = track.duration;
  }

  function updateAmbientColor(hexColor) {
    DOM.ambientGlow.style.background = `linear-gradient(180deg, ${hexColor}99 0%, rgba(18, 18, 18, 0.95) 75%, var(--sp-base) 100%)`;
  }

  function updateMediaSession(track) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: track.album,
        artwork: [
          { src: track.cover, sizes: '512x512', type: 'image/svg+xml' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => togglePlayPause());
      navigator.mediaSession.setActionHandler('pause', () => togglePlayPause());
      navigator.mediaSession.setActionHandler('previoustrack', () => prevTrack());
      navigator.mediaSession.setActionHandler('nexttrack', () => nextTrack());
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime && DOM.audio.duration) {
          DOM.audio.currentTime = details.seekTime;
        }
      });
    }
  }

  // AUDIO EVENTS
  DOM.audio.addEventListener('timeupdate', () => {
    if (!DOM.audio.duration) return;
    const current = DOM.audio.currentTime;
    const duration = DOM.audio.duration;
    const pct = (current / duration) * 100;

    DOM.playbackBarFill.style.width = pct + '%';
    DOM.playbackBarHandle.style.left = pct + '%';
    DOM.currentTimeReadout.textContent = formatSeconds(current);

    // Fullscreen timeline
    DOM.fsTimelineFill.style.width = pct + '%';
    DOM.fsTimelineThumb.style.left = pct + '%';
    DOM.fsCurrentTime.textContent = formatSeconds(current);

    // Dynamic lyrics line highlighting
    highlightActiveLyricsLine(current, duration);
  });

  DOM.audio.addEventListener('progress', () => {
    if (DOM.audio.buffered.length > 0 && DOM.audio.duration) {
      const bufferedEnd = DOM.audio.buffered.end(DOM.audio.buffered.length - 1);
      const pct = (bufferedEnd / DOM.audio.duration) * 100;
      DOM.bufferBarFill.style.width = pct + '%';
    }
  });

  DOM.audio.addEventListener('ended', () => {
    if (AppState.repeatMode === 'one') {
      DOM.audio.currentTime = 0;
      DOM.audio.play();
    } else {
      nextTrack();
    }
  });

  DOM.audio.addEventListener('play', () => {
    AppState.isPlaying = true;
    updatePlayPauseButtonUI(true);
    updateTrackRowVisuals();
  });

  DOM.audio.addEventListener('pause', () => {
    AppState.isPlaying = false;
    updatePlayPauseButtonUI(false);
    updateTrackRowVisuals();
  });

  // SEEKBAR SCRUBBING
  let isDraggingSeek = false;

  function handleSeek(e, trackElement) {
    const rect = trackElement.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (DOM.audio.duration) {
      DOM.audio.currentTime = pos * DOM.audio.duration;
    }
  }

  DOM.playbackBarTrack.addEventListener('click', (e) => {
    handleSeek(e, DOM.playbackBarTrack);
  });

  DOM.playbackBarTrack.addEventListener('mousemove', (e) => {
    const rect = DOM.playbackBarTrack.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (DOM.audio.duration) {
      const hoverSec = pos * DOM.audio.duration;
      DOM.scrubTooltip.textContent = formatSeconds(hoverSec);
      DOM.scrubTooltip.style.left = (pos * 100) + '%';
      DOM.scrubTooltip.style.display = 'block';
    }
  });

  DOM.playbackBarTrack.addEventListener('mouseleave', () => {
    DOM.scrubTooltip.style.display = 'none';
  });

  DOM.fsTimelineTrack.addEventListener('click', (e) => {
    handleSeek(e, DOM.fsTimelineTrack);
  });

  // VOLUME ENGINE
  function setVolume(level) {
    level = Math.max(0, Math.min(1, level));
    AppState.volume = level;
    DOM.audio.volume = level;
    DOM.volumeBarFill.style.width = (level * 100) + '%';
    DOM.volumeBarHandle.style.left = (level * 100) + '%';

    if (level === 0) {
      AppState.isMuted = true;
      DOM.volumeIcon.className = 'fa-solid fa-volume-xmark';
    } else if (level < 0.4) {
      AppState.isMuted = false;
      DOM.volumeIcon.className = 'fa-solid fa-volume-low';
    } else {
      AppState.isMuted = false;
      DOM.volumeIcon.className = 'fa-solid fa-volume-high';
    }
    localStorage.setItem('sp_volume', level);
  }

  function toggleMute() {
    if (AppState.isMuted) {
      setVolume(parseFloat(localStorage.getItem('sp_volume') || 0.8));
    } else {
      DOM.audio.volume = 0;
      AppState.isMuted = true;
      DOM.volumeBarFill.style.width = '0%';
      DOM.volumeBarHandle.style.left = '0%';
      DOM.volumeIcon.className = 'fa-solid fa-volume-xmark';
    }
  }

  DOM.volumeBarTrack.addEventListener('click', (e) => {
    const rect = DOM.volumeBarTrack.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setVolume(pos);
  });

  DOM.volumeBtn.addEventListener('click', toggleMute);

  // SHUFFLE & REPEAT
  DOM.shuffleBtn.addEventListener('click', () => {
    AppState.isShuffle = !AppState.isShuffle;
    DOM.shuffleBtn.classList.toggle('active', AppState.isShuffle);
    DOM.fsShuffleBtn.classList.toggle('active', AppState.isShuffle);
    showToast(AppState.isShuffle ? "Shuffle enabled" : "Shuffle disabled");
  });

  DOM.repeatBtn.addEventListener('click', () => {
    if (AppState.repeatMode === 'off') {
      AppState.repeatMode = 'all';
      DOM.repeatBtn.classList.add('active');
      DOM.repeatOneBadge.classList.add('hidden');
      showToast("Repeat all enabled");
    } else if (AppState.repeatMode === 'all') {
      AppState.repeatMode = 'one';
      DOM.repeatBtn.classList.add('active');
      DOM.repeatOneBadge.classList.remove('hidden');
      showToast("Repeat one enabled");
    } else {
      AppState.repeatMode = 'off';
      DOM.repeatBtn.classList.remove('active');
      DOM.repeatOneBadge.classList.add('hidden');
      showToast("Repeat disabled");
    }
  });

  DOM.mainPlayBtn.addEventListener('click', togglePlayPause);
  DOM.prevBtn.addEventListener('click', prevTrack);
  DOM.nextBtn.addEventListener('click', nextTrack);

  // LIKED SONGS ENGINE
  function toggleLikeSong(songId) {
    if (AppState.likedSongs.has(songId)) {
      AppState.likedSongs.delete(songId);
      showToast("Removed from your Liked Songs");
    } else {
      AppState.likedSongs.add(songId);
      showToast("Added to your Liked Songs", true);
    }
    localStorage.setItem('sp_liked_songs', JSON.stringify([...AppState.likedSongs]));
    updateLikedCounter();
    updateTrackRowVisuals();

    // Update player heart if this is current song
    if (TRACKS[AppState.currentTrackIndex].id === songId) {
      const isLiked = AppState.likedSongs.has(songId);
      DOM.playerHeartBtn.innerHTML = isLiked ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
      DOM.playerHeartBtn.className = 'player-heart-btn' + (isLiked ? ' liked' : '');
      DOM.sideLikeBtn.innerHTML = isLiked ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
      DOM.sideLikeBtn.className = 'icon-plain-btn side-like-btn' + (isLiked ? ' liked' : '');
    }

    // If currently viewing liked songs playlist, re-render table
    if (AppState.currentPlaylist === 'liked' && AppState.activeView === 'playlist') {
      renderPlaylistView('liked');
    }
  }

  function updateLikedCounter() {
    DOM.likedCountText.textContent = `${AppState.likedSongs.size} songs`;
  }

  DOM.playerHeartBtn.addEventListener('click', () => {
    const cur = TRACKS[AppState.currentTrackIndex];
    if (cur) toggleLikeSong(cur.id);
  });

  DOM.sideLikeBtn.addEventListener('click', () => {
    const cur = TRACKS[AppState.currentTrackIndex];
    if (cur) toggleLikeSong(cur.id);
  });

  // =========================================================================
  // VIEW SWITCHER & NAVIGATION
  // =========================================================================

  function switchView(viewName) {
    AppState.activeView = viewName;
    DOM.homeView.classList.add('hidden-panel');
    DOM.searchView.classList.add('hidden-panel');
    DOM.playlistView.classList.add('hidden-panel');

    DOM.navHome.classList.remove('active');
    DOM.navSearch.classList.remove('active');

    if (viewName === 'home') {
      DOM.homeView.classList.remove('hidden-panel');
      DOM.navHome.classList.add('active');
      DOM.headerCategoryPills.style.display = 'flex';
      DOM.headerSearchBox.style.display = 'none';
      updateAmbientColor('#1e3a8a');
    } else if (viewName === 'search') {
      DOM.searchView.classList.remove('hidden-panel');
      DOM.navSearch.classList.add('active');
      DOM.headerCategoryPills.style.display = 'none';
      DOM.headerSearchBox.style.display = 'flex';
      DOM.mainSearchInput.focus();
      updateAmbientColor('#121212');
    } else if (viewName === 'playlist') {
      DOM.playlistView.classList.remove('hidden-panel');
      DOM.headerCategoryPills.style.display = 'none';
      DOM.headerSearchBox.style.display = 'none';
    }

    DOM.scrollContent.scrollTop = 0;
  }

  DOM.navHome.addEventListener('click', () => switchView('home'));
  DOM.navSearch.addEventListener('click', () => switchView('search'));
  DOM.logoBtn.addEventListener('click', () => switchView('home'));

  // Quick category pills
  DOM.headerCategoryPills.addEventListener('click', (e) => {
    const pill = e.target.closest('.cat-pill');
    if (!pill) return;
    document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    AppState.activeCategory = pill.dataset.category;
    showToast(`Filtering by ${pill.textContent}`);
  });

  // Sticky top bar effect on scroll
  DOM.scrollContent.addEventListener('scroll', () => {
    if (DOM.scrollContent.scrollTop > 60) {
      DOM.topHeader.classList.add('scrolled');
    } else {
      DOM.topHeader.classList.remove('scrolled');
    }
  });

  // History controls
  DOM.historyBackBtn.addEventListener('click', () => {
    switchView('home');
  });
  DOM.historyForwardBtn.addEventListener('click', () => {
    switchView('playlist');
  });

  // =========================================================================
  // HOME VIEW RENDERING
  // =========================================================================

  function renderHomeView() {
    DOM.greetingHeading.textContent = getGreeting();

    // 1. Quick Access 6-Grid Tiles
    const quickItems = [
      { id: "liked", title: "Liked Songs", art: generateCoverSvg("Liked", "Songs", "#450af5", "#8b5cf6", "💜") },
      { id: "anirudh", title: "Rockstar Anirudh", art: generateCoverSvg("Anirudh", "Hits", "#1e3a8a", "#0f172a", "⚡") },
      { id: "vijay", title: "Thalapathy Vijay", art: generateCoverSvg("Vijay", "Mass", "#991b1b", "#450a0a", "🦁") },
      { id: "kuthu", title: "High Energy Kuthu", art: generateCoverSvg("Kuthu", "Party", "#ea580c", "#7c2d12", "🥁") },
      { id: "dhanush", title: "Dhanush Specials", art: generateCoverSvg("Dhanush", "VIP", "#0369a1", "#082f49", "🌧️") },
      { id: "action", title: "Action & Dark Mode", art: generateCoverSvg("Action", "Leo", "#27272a", "#09090b", "🗡️") }
    ];

    DOM.quickGrid.innerHTML = quickItems.map(item => `
      <div class="quick-tile" data-playlist="${item.id}">
        <div class="quick-tile-art" style="background-image: url('${item.art}')"></div>
        <div class="quick-tile-title">${item.title}</div>
        <button class="tile-play-btn" data-play-playlist="${item.id}" title="Play ${item.title}">
          <i class="fa-solid fa-play"></i>
        </button>
      </div>
    `).join('');

    // Attach Quick Tile Click Handlers
    DOM.quickGrid.querySelectorAll('.quick-tile').forEach(tile => {
      tile.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.tile-play-btn');
        const plId = tile.dataset.playlist;
        if (playBtn) {
          e.stopPropagation();
          playPlaylistById(plId);
        } else {
          openPlaylist(plId);
        }
      });
    });

    // 2. Shelves Rendering
    renderShelf(DOM.anirudhShelf, TRACKS.filter(t => t.category === "anirudh").slice(0, 7));
    renderShelf(DOM.vijayShelf, TRACKS.filter(t => t.category === "vijay").slice(0, 7));
    renderShelf(DOM.kuthuShelf, TRACKS.filter(t => t.category === "kuthu").slice(0, 7));
    renderShelf(DOM.dhanushShelf, TRACKS.filter(t => t.category === "dhanush").slice(0, 7));
    renderShelf(DOM.actionShelf, TRACKS.filter(t => t.category === "action").slice(0, 7));
  }

  function renderShelf(container, trackList) {
    container.innerHTML = trackList.map(track => `
      <div class="music-card" data-track-id="${track.id}">
        <div class="card-art-wrap">
          <img src="${track.cover}" alt="${track.title}" class="card-art-img" loading="lazy">
          <button class="card-play-btn" title="Play ${track.title}">
            <i class="fa-solid fa-play"></i>
          </button>
        </div>
        <div class="card-title">${track.title}</div>
        <div class="card-subtitle">${track.artist}</div>
      </div>
    `).join('');

    container.querySelectorAll('.music-card').forEach(card => {
      card.addEventListener('click', () => {
        playTrackById(parseInt(card.dataset.trackId, 10));
      });
    });
  }

  // "Show all" buttons on shelves
  document.querySelectorAll('.shelf-show-all-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const shelfKey = btn.dataset.shelf;
      openPlaylist(shelfKey);
    });
  });

  // =========================================================================
  // PLAYLIST VIEW RENDERING
  // =========================================================================

  function openPlaylist(playlistId) {
    AppState.currentPlaylist = playlistId;
    renderPlaylistView(playlistId);
    switchView('playlist');
  }

  function renderPlaylistView(playlistId, filterQuery = "") {
    const pl = PLAYLISTS.find(p => p.id === playlistId) || PLAYLISTS[0];
    let songs = TRACKS.filter(pl.filter);

    if (playlistId === 'liked' && songs.length === 0) {
      songs = [];
    }

    if (filterQuery.trim() !== "") {
      const q = filterQuery.toLowerCase();
      songs = songs.filter(s => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q) || s.album.toLowerCase().includes(q));
    }

    // Hero Meta
    DOM.playlistHeroImg.src = pl.cover;
    DOM.playlistHeroType.textContent = pl.type;
    DOM.playlistHeroTitle.textContent = pl.title;
    DOM.playlistHeroDesc.textContent = pl.desc;
    DOM.playlistHeroLikes.textContent = pl.saves;
    DOM.playlistHeroStats.textContent = `${songs.length} songs, approx. ${Math.round(songs.length * 3.8)} min`;

    updateAmbientColor(pl.themeColor);

    // Render Track Table Rows
    if (songs.length === 0) {
      DOM.trackRowsList.innerHTML = `
        <div style="padding: 40px; text-align: center; color: var(--sp-text-secondary); font-size: 16px;">
          No songs found in this playlist. Click the heart icon on any song to add it!
        </div>
      `;
      return;
    }

    DOM.trackRowsList.innerHTML = songs.map((track, i) => {
      const isCurrent = (TRACKS[AppState.currentTrackIndex]?.id === track.id);
      const isPlayingCurrent = isCurrent && AppState.isPlaying;
      const isLiked = AppState.likedSongs.has(track.id);

      return `
        <div class="track-row ${isCurrent ? 'active' : ''} ${isPlayingCurrent ? 'playing' : ''}" data-track-id="${track.id}">
          <div class="col-idx-box">
            <span class="track-num">${i + 1}</span>
            <span class="track-hover-play"><i class="fa-solid fa-play"></i></span>
            <div class="track-playing-equalizer">
              <span class="eq-bar"></span><span class="eq-bar"></span>
              <span class="eq-bar"></span><span class="eq-bar"></span>
            </div>
          </div>

          <div class="col-title-box">
            <img src="${track.cover}" alt="${track.title}" class="track-thumbnail" loading="lazy">
            <div class="track-title-column">
              <span class="track-main-title">${track.title}</span>
              <span class="track-sub-artist">${track.artist}</span>
            </div>
          </div>

          <div class="col-album-box">${track.album}</div>
          <div class="col-date-box">${i % 3 === 0 ? 'Yesterday' : (i % 2 === 0 ? '3 days ago' : 'May 2026')}</div>

          <div class="col-duration-box">
            <button class="row-heart-btn ${isLiked ? 'liked' : ''}" data-heart-id="${track.id}" title="${isLiked ? 'Remove from your Library' : 'Save to your Library'}">
              <i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            <span>${track.duration}</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach Row Click & Heart Handlers
    DOM.trackRowsList.querySelectorAll('.track-row').forEach(row => {
      row.addEventListener('click', (e) => {
        const heartBtn = e.target.closest('.row-heart-btn');
        const songId = parseInt(row.dataset.trackId, 10);
        if (heartBtn) {
          e.stopPropagation();
          toggleLikeSong(songId);
        } else {
          playTrackById(songId);
        }
      });
    });
  }

  function playPlaylistById(playlistId) {
    const pl = PLAYLISTS.find(p => p.id === playlistId) || PLAYLISTS[0];
    const songs = TRACKS.filter(pl.filter);
    if (songs.length > 0) {
      AppState.currentPlaylist = playlistId;
      playTrackById(songs[0].id);
    }
  }

  DOM.playlistBigPlayBtn.addEventListener('click', () => {
    if (AppState.isPlaying && TRACKS[AppState.currentTrackIndex]) {
      togglePlayPause();
    } else {
      playPlaylistById(AppState.currentPlaylist);
    }
  });

  DOM.playlistTableFilter.addEventListener('input', (e) => {
    renderPlaylistView(AppState.currentPlaylist, e.target.value);
  });

  function updateTrackRowVisuals() {
    const currentId = TRACKS[AppState.currentTrackIndex]?.id;
    document.querySelectorAll('.track-row').forEach(row => {
      const rowId = parseInt(row.dataset.trackId, 10);
      const isCur = (rowId === currentId);
      row.classList.toggle('active', isCur);
      row.classList.toggle('playing', isCur && AppState.isPlaying);

      // update heart
      const heartBtn = row.querySelector('.row-heart-btn');
      if (heartBtn) {
        const isLiked = AppState.likedSongs.has(rowId);
        heartBtn.className = 'row-heart-btn' + (isLiked ? ' liked' : '');
        heartBtn.innerHTML = `<i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>`;
      }
    });
  }

  // =========================================================================
  // SEARCH VIEW ENGINE
  // =========================================================================

  function renderSearchView() {
    // Render Browse all genre tiles
    DOM.genreCardsGrid.innerHTML = GENRES.map(g => `
      <div class="genre-tile" style="background-color: ${g.color}" data-genre-name="${g.name}">
        <span class="genre-title">${g.name}</span>
        <div class="genre-icon-art" style="background: rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; font-size: 38px;">
          ${g.symbol}
        </div>
      </div>
    `).join('');

    DOM.genreCardsGrid.querySelectorAll('.genre-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const genreName = tile.dataset.genreName.toLowerCase();
        DOM.mainSearchInput.value = genreName;
        handleSearch(genreName);
      });
    });
  }

  function handleSearch(query) {
    const clean = query.trim().toLowerCase();
    if (!clean) {
      DOM.searchLiveResults.classList.add('hidden');
      DOM.browseAllCategories.classList.remove('hidden');
      DOM.clearSearchBtn.classList.remove('visible');
      return;
    }

    DOM.clearSearchBtn.classList.add('visible');
    DOM.searchLiveResults.classList.remove('hidden');
    DOM.browseAllCategories.classList.add('hidden');

    const matches = TRACKS.filter(t =>
      t.title.toLowerCase().includes(clean) ||
      t.artist.toLowerCase().includes(clean) ||
      t.album.toLowerCase().includes(clean) ||
      t.category.toLowerCase().includes(clean)
    );

    if (matches.length === 0) {
      DOM.topResultCard.innerHTML = `
        <div style="padding: 20px; color: var(--sp-text-secondary);">No results found for "${query}"</div>
      `;
      DOM.miniSongResults.innerHTML = '';
      return;
    }

    // Top Result Card
    const top = matches[0];
    DOM.topResultCard.innerHTML = `
      <img src="${top.cover}" alt="${top.title}" class="top-result-art">
      <div class="top-result-name">${top.title}</div>
      <div class="top-result-meta">
        <span class="pill-badge">Song</span>
        <span>${top.artist}</span>
      </div>
      <button class="card-play-btn" data-top-play="${top.id}" title="Play ${top.title}">
        <i class="fa-solid fa-play"></i>
      </button>
    `;

    DOM.topResultCard.onclick = () => playTrackById(top.id);

    // Mini Matching Songs
    DOM.miniSongResults.innerHTML = matches.slice(0, 5).map(track => {
      const isLiked = AppState.likedSongs.has(track.id);
      return `
        <div class="mini-song-row" data-track-id="${track.id}">
          <div class="mini-left">
            <img src="${track.cover}" alt="${track.title}" class="mini-art">
            <div class="mini-meta">
              <div class="mini-title">${track.title}</div>
              <div class="mini-artist">${track.artist}</div>
            </div>
          </div>
          <div class="mini-right">
            <button class="row-heart-btn ${isLiked ? 'liked' : ''}" data-heart-id="${track.id}">
              <i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            <span>${track.duration}</span>
          </div>
        </div>
      `;
    }).join('');

    DOM.miniSongResults.querySelectorAll('.mini-song-row').forEach(row => {
      row.addEventListener('click', (e) => {
        const heart = e.target.closest('.row-heart-btn');
        const songId = parseInt(row.dataset.trackId, 10);
        if (heart) {
          e.stopPropagation();
          toggleLikeSong(songId);
        } else {
          playTrackById(songId);
        }
      });
    });
  }

  DOM.mainSearchInput.addEventListener('input', (e) => {
    handleSearch(e.target.value);
  });

  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.mainSearchInput.value = '';
    handleSearch('');
    DOM.mainSearchInput.focus();
  });

  // =========================================================================
  // LEFT SIDEBAR (LIBRARY)
  // =========================================================================

  function renderLibrary() {
    updateLikedCounter();
    const otherPlaylists = PLAYLISTS.filter(p => p.id !== 'liked');

    const html = otherPlaylists.map(pl => {
      const count = TRACKS.filter(pl.filter).length;
      return `
        <div class="lib-item" data-playlist="${pl.id}">
          <div class="lib-item-art" style="background-image: url('${pl.cover}')"></div>
          <div class="lib-item-info">
            <div class="lib-item-title">${pl.title}</div>
            <div class="lib-item-sub">Playlist • ${count} songs</div>
          </div>
        </div>
      `;
    }).join('');

    DOM.libraryList.insertAdjacentHTML('beforeend', html);

    DOM.libraryList.querySelectorAll('.lib-item').forEach(item => {
      item.addEventListener('click', () => {
        DOM.libraryList.querySelectorAll('.lib-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        openPlaylist(item.dataset.playlist);
      });
    });
  }

  // Mini search in library
  DOM.libSearchToggle.addEventListener('click', () => {
    DOM.libSearchInput.classList.toggle('active');
    if (DOM.libSearchInput.classList.contains('active')) {
      DOM.libSearchInput.focus();
    }
  });

  DOM.libSearchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    DOM.libraryList.querySelectorAll('.lib-item').forEach(item => {
      const title = item.querySelector('.lib-item-title').textContent.toLowerCase();
      item.style.display = title.includes(q) ? 'flex' : 'none';
    });
  });

  // =========================================================================
  // RIGHT SIDEBAR (NOW PLAYING & QUEUE)
  // =========================================================================

  function toggleRightSidebar(mode = 'info') {
    AppState.rightSidebarMode = mode;
    if (AppState.isRightSidebarOpen && DOM.rightSidebar.dataset.mode === mode) {
      DOM.rightSidebar.classList.add('hidden-right');
      AppState.isRightSidebarOpen = false;
      DOM.nowPlayingToggleBtn.classList.remove('active');
      DOM.queueToggleBtn.classList.remove('active');
    } else {
      DOM.rightSidebar.classList.remove('hidden-right');
      AppState.isRightSidebarOpen = true;
      DOM.rightSidebar.dataset.mode = mode;

      if (mode === 'info') {
        DOM.rightPanelTitle.textContent = "Now Playing";
        DOM.nowPlayingPanelBody.classList.remove('hidden');
        DOM.queuePanelBody.classList.add('hidden');
        DOM.nowPlayingToggleBtn.classList.add('active');
        DOM.queueToggleBtn.classList.remove('active');
      } else {
        DOM.rightPanelTitle.textContent = "Queue";
        DOM.nowPlayingPanelBody.classList.add('hidden');
        DOM.queuePanelBody.classList.remove('hidden');
        DOM.nowPlayingToggleBtn.classList.remove('active');
        DOM.queueToggleBtn.classList.add('active');
        renderQueuePanel();
      }
    }
  }

  function updateRightSidebarUI() {
    const track = TRACKS[AppState.currentTrackIndex];
    if (!track) return;

    DOM.sideCoverImg.src = track.cover;
    DOM.sideTrackTitle.textContent = track.title;
    DOM.sideTrackArtist.textContent = track.artist;

    const isLiked = AppState.likedSongs.has(track.id);
    DOM.sideLikeBtn.className = 'icon-plain-btn side-like-btn' + (isLiked ? ' liked' : '');
    DOM.sideLikeBtn.innerHTML = `<i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>`;

    // Artist Bio Card
    DOM.sideArtistCardName.textContent = track.artist;
    DOM.sideArtistBanner.style.backgroundImage = `url('${track.cover}')`;

    // Next track in queue
    const nextIdx = (AppState.currentTrackIndex + 1) % TRACKS.length;
    const nextTrack = TRACKS[nextIdx];
    DOM.sideNextImg.src = nextTrack.cover;
    DOM.sideNextTitle.textContent = nextTrack.title;
    DOM.sideNextArtist.textContent = nextTrack.artist;
  }

  function renderQueuePanel() {
    const cur = TRACKS[AppState.currentTrackIndex];
    DOM.queueNowPlayingRow.innerHTML = `
      <img src="${cur.cover}" alt="${cur.title}" class="mini-art">
      <div class="mini-meta">
        <div class="mini-title" style="color: var(--sp-green);">${cur.title}</div>
        <div class="mini-artist">${cur.artist}</div>
      </div>
      <div style="margin-left: auto; color: var(--sp-green);"><i class="fa-solid fa-volume-high"></i></div>
    `;

    // Upcoming queue list
    const upcoming = [];
    for (let i = 1; i <= 12; i++) {
      const idx = (AppState.currentTrackIndex + i) % TRACKS.length;
      upcoming.push(TRACKS[idx]);
    }

    DOM.queueListItems.innerHTML = upcoming.map((t, idx) => `
      <div class="queue-item-row" data-track-id="${t.id}">
        <span style="font-size: 13px; color: var(--sp-text-secondary); width: 20px;">${idx + 1}</span>
        <img src="${t.cover}" alt="${t.title}" class="mini-art">
        <div class="mini-meta">
          <div class="mini-title">${t.title}</div>
          <div class="mini-artist">${t.artist}</div>
        </div>
        <span style="margin-left: auto; font-size: 12px; color: var(--sp-text-secondary);">${t.duration}</span>
      </div>
    `).join('');

    DOM.queueListItems.querySelectorAll('.queue-item-row').forEach(row => {
      row.addEventListener('click', () => {
        playTrackById(parseInt(row.dataset.trackId, 10));
      });
    });
  }

  DOM.nowPlayingToggleBtn.addEventListener('click', () => toggleRightSidebar('info'));
  DOM.queueToggleBtn.addEventListener('click', () => toggleRightSidebar('queue'));
  DOM.closeRightSidebarBtn.addEventListener('click', () => toggleRightSidebar());
  DOM.toggleQueueViewBtn.addEventListener('click', () => {
    toggleRightSidebar(AppState.rightSidebarMode === 'info' ? 'queue' : 'info');
  });
  DOM.sideOpenQueueBtn.addEventListener('click', () => toggleRightSidebar('queue'));
  DOM.sidePlayNextBtn.addEventListener('click', nextTrack);

  // =========================================================================
  // FULLSCREEN & LYRICS VIEWER
  // =========================================================================

  function toggleFullscreenMode() {
    AppState.isFullscreen = !AppState.isFullscreen;
    DOM.fullscreenModal.classList.toggle('hidden', !AppState.isFullscreen);
    if (AppState.isFullscreen) {
      updateLyricsUI(TRACKS[AppState.currentTrackIndex]);
    }
  }

  function updateLyricsUI(track) {
    if (!track) return;
    const lyricsList = track.lyrics || [
      "Music gives a soul to the universe,",
      "Wings to the mind, flight to the imagination,",
      "And life to everything.",
      "— Rockstar Anirudh Hit Beats"
    ];

    DOM.lyricsLinesWrapper.innerHTML = lyricsList.map((line, idx) => `
      <div class="lyrics-line ${idx === 0 ? 'active' : ''}" data-line-idx="${idx}">
        ${line}
      </div>
    `).join('');

    DOM.lyricsLinesWrapper.querySelectorAll('.lyrics-line').forEach(el => {
      el.addEventListener('click', () => {
        DOM.lyricsLinesWrapper.querySelectorAll('.lyrics-line').forEach(l => l.classList.remove('active'));
        el.classList.add('active');
        showToast("Lyrics karaoke sync");
      });
    });
  }

  function highlightActiveLyricsLine(currentTime, duration) {
    const lines = DOM.lyricsLinesWrapper.querySelectorAll('.lyrics-line');
    if (!lines || lines.length === 0) return;
    const idx = Math.min(lines.length - 1, Math.floor((currentTime / duration) * lines.length));
    lines.forEach((l, i) => l.classList.toggle('active', i === idx));
  }

  DOM.fullscreenToggleBtn.addEventListener('click', toggleFullscreenMode);
  DOM.lyricsToggleBtn.addEventListener('click', toggleFullscreenMode);
  DOM.fsCloseBtn.addEventListener('click', toggleFullscreenMode);

  DOM.fsPlayBtn.addEventListener('click', togglePlayPause);
  DOM.fsNextBtn.addEventListener('click', nextTrack);
  DOM.fsPrevBtn.addEventListener('click', prevTrack);
  DOM.fsShuffleBtn.addEventListener('click', () => DOM.shuffleBtn.click());
  DOM.fsRepeatBtn.addEventListener('click', () => DOM.repeatBtn.click());

  // Pip Mode simulation
  DOM.pipModeBtn.addEventListener('click', () => {
    showToast("Mini-player picture-in-picture mode enabled");
  });

  // Expand Album Art click
  DOM.playerArtWrap.addEventListener('click', () => {
    toggleRightSidebar('info');
  });

  // Connect device simulation
  DOM.connectDeviceBtn.addEventListener('click', () => {
    showToast("Connected to Web Player (High Quality Audio)", true);
  });

  // Clear queue button
  if (DOM.clearQueueBtn) {
    DOM.clearQueueBtn.addEventListener('click', () => {
      DOM.queueListItems.innerHTML = '<div style="padding: 16px; color: var(--sp-text-secondary); font-size: 13px;">No more tracks in queue.</div>';
      showToast("Queue cleared");
    });
  }

  // Create playlist button
  const createPlaylistBtn = document.getElementById('createPlaylistBtn');
  if (createPlaylistBtn) {
    createPlaylistBtn.addEventListener('click', () => {
      showToast("New Playlist #1 created and added to Your Library!", true);
    });
  }

  // Profile button
  const userProfileBtn = document.getElementById('userProfileBtn');
  if (userProfileBtn) {
    userProfileBtn.addEventListener('click', () => {
      showToast("Profile: Kabilan • Spotify Premium Active");
    });
  }

  // Install app simulation
  document.getElementById('installAppBtn').addEventListener('click', () => {
    showToast("Spotify Desktop installed! Running locally.", true);
  });

  // =========================================================================
  // KEYBOARD SHORTCUTS
  // =========================================================================

  window.addEventListener('keydown', (e) => {
    // If typing in search box, ignore hotkeys
    if (e.target.tagName === 'INPUT') return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        togglePlayPause();
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (e.shiftKey) {
          nextTrack();
        } else if (DOM.audio.duration) {
          DOM.audio.currentTime = Math.min(DOM.audio.duration, DOM.audio.currentTime + 5);
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (e.shiftKey) {
          prevTrack();
        } else if (DOM.audio.duration) {
          DOM.audio.currentTime = Math.max(0, DOM.audio.currentTime - 5);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setVolume(AppState.volume + 0.05);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setVolume(AppState.volume - 0.05);
        break;
      case 'KeyM':
        toggleMute();
        break;
      case 'KeyL':
        const cur = TRACKS[AppState.currentTrackIndex];
        if (cur) toggleLikeSong(cur.id);
        break;
      case 'KeyF':
        toggleFullscreenMode();
        break;
      case 'Escape':
        if (AppState.isFullscreen) toggleFullscreenMode();
        break;
    }
  });

  // =========================================================================
  // INITIALIZATION
  // =========================================================================

  function initApp() {
    initQueue();
    renderHomeView();
    renderSearchView();
    renderLibrary();

    // Restore saved volume
    const savedVol = localStorage.getItem('sp_volume');
    if (savedVol !== null) {
      setVolume(parseFloat(savedVol));
    } else {
      setVolume(0.8);
    }

    // Load initial track (Do not autoplay until user interacts)
    loadTrack(0, false);

    console.log("Spotify Tamil Web Player successfully initialized with 52 tracks.");
  }

  // Start application
  document.addEventListener('DOMContentLoaded', initApp);

})();
