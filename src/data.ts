import { InvitationData, ThemeConfig, OrnamentConfig } from './types';

export const defaultData: InvitationData = {
  childName: {
    short: "Rafi",
    full: "Muhammad Rafi Pratama",
    birthDate: "15 Januari 2017",
    age: "7 tahun",
    hobby: "Mengaji & bermain sepak bola",
    school: "SD Islam Al-Azhar",
    quote: "Anak sholeh yang cinta Al-Quran",
    photo: "https://image.qwenlm.ai/generated-images/5844e063-627b-4d9a-9bc4-a0a4099cddcf/_result.png"
  },
  parents: {
    father: "Bapak Ahmad Pratama",
    mother: "Ibu Siti Nurhaliza",
    family: "Keluarga Besar Pratama"
  },
  dateLabel: "Ahad, 20 Agustus 2024",
  dateShort: "20 · 08 · 2024",
  dateISO: "2024-08-20T08:00:00+07:00",
  city: "Bandung",
  venueMain: "Masjid Al-Ikhlas",
  events: [
    {
      id: "penerimaan",
      name: "Penerimaan Tamu",
      date: "Ahad, 20 Agustus 2024",
      time: "08.00 – 09.00 WIB",
      venue: "Masjid Al-Ikhlas",
      address: "Jl. Merdeka No. 123, Bandung",
      maps: "https://maps.google.com/?q=-6.9175,107.6191",
      note: "Mohon hadir 15 menit sebelumnya"
    },
    {
      id: "doa",
      name: "Doa Bersama & Prosesi Khitan",
      date: "Ahad, 20 Agustus 2024",
      time: "09.00 – 10.00 WIB",
      venue: "Masjid Al-Ikhlas",
      address: "Jl. Merdeka No. 123, Bandung",
      maps: "https://maps.google.com/?q=-6.9175,107.6191",
      note: "Acara inti khitanan"
    },
    {
      id: "resepsi",
      name: "Makan Siang & Hiburan",
      date: "Ahad, 20 Agustus 2024",
      time: "10.00 – 12.00 WIB",
      venue: "Aula Serbaguna",
      address: "Jl. Merdeka No. 123, Bandung",
      maps: "https://maps.google.com/?q=-6.9175,107.6191",
      note: "Akan ada hiburan sulap & badut"
    },
    {
      id: "ramah-tamah",
      name: "Ramah Tamah",
      date: "Ahad, 20 Agustus 2024",
      time: "12.00 – Selesai",
      venue: "Aula Serbaguna",
      address: "Jl. Merdeka No. 123, Bandung",
      maps: "https://maps.google.com/?q=-6.9175,107.6191",
      note: "Silakan beramah tamah"
    }
  ],
  quote: {
    arabic: "الْفِطْرَةُ خَمْسٌ أَوْ خَمْسٌ مِنَ الْفِطْرَةِ الْخِتَانُ وَاسْتِحْدَادُ وَقَصُّ الشَّارِبِ وَتَقْلِيمُ الْأَظْفَارِ وَنَتْفُ الْإِبْطِ",
    text: "Fitrah manusia ada lima: khitan, mencukur rambut kemaluan, memotong kuku, mencabut bulu ketiak, dan memotong kumis.",
    source: "HR. Bukhari no. 5889 dan Muslim no. 258"
  },
  hikmah: [
    {
      title: "Menyempurnakan Fitrah",
      text: "Khitanan adalah bagian dari fitrah manusia yang diajarkan oleh para nabi sejak Nabi Ibrahim AS.",
      icon: "🌙"
    },
    {
      title: "Kebersihan & Kesehatan",
      text: "Khitanan menjaga kebersihan dan kesehatan organ vital, mencegah berbagai penyakit.",
      icon: "💧"
    },
    {
      title: "Ketaatan kepada Allah",
      text: "Khitanan adalah bentuk ketaatan kepada perintah Allah SWT dan mengikuti sunnah Rasulullah SAW.",
      icon: "🕌"
    },
    {
      title: "Tradisi Para Nabi",
      text: "Nabi Ibrahim AS adalah orang pertama yang melaksanakan khitanan atas perintah Allah SWT.",
      icon: "⭐"
    },
    {
      title: "Tanda Kedewasaan",
      text: "Khitanan menjadi tanda peralihan menuju kedewasaan dan tanggung jawab sebagai muslim.",
      icon: "🌟"
    }
  ],
  gallery: [
    { src: "https://image.qwenlm.ai/generated-images/5844e063-627b-4d9a-9bc4-a0a4099cddcf/_result.png", caption: "Rafi dengan baju koko" },
    { src: "https://image.qwenlm.ai/generated-images/c49a9163-c9f5-4e52-b95a-02086a27ef92/_result.png", caption: "Keluarga bahagia" },
    { src: "https://image.qwenlm.ai/generated-images/1eb768ce-c55d-4596-b6fb-bd7fddf2d149/_result.png", caption: "Bismillahirrahmanirrahim" },
    { src: "https://image.qwenlm.ai/generated-images/5844e063-627b-4d9a-9bc4-a0a4099cddcf/_result.png", caption: "Rafi sedang mengaji" },
    { src: "https://image.qwenlm.ai/generated-images/c49a9163-c9f5-4e52-b95a-02086a27ef92/_result.png", caption: "Foto bersama keluarga besar" },
    { src: "https://image.qwenlm.ai/generated-images/1eb768ce-c55d-4596-b6fb-bd7fddf2d149/_result.png", caption: "Persiapan acara" },
  ],
  gifts: [
    { bank: "BSI", number: "1234 5678 90", holder: "Ahmad Pratama" },
    { bank: "Mandiri", number: "9876 5432 10", holder: "Ahmad Pratama" }
  ],
  giftAddress: "Jl. Merdeka No. 123, Bandung 40123",
  themeId: "emerald-garden",
  ornamentId: "modern",
  islamicOrnamentId: "kaligrafi-bismillah"
};

export const themes: ThemeConfig[] = [
  { id: "emerald-garden", name: "Emerald Garden", className: "theme-emerald", primary: "#065f46", secondary: "#d97706", bg: "#f0fdf4", description: "Hijau pinus & emas - Islami klasik" },
  { id: "ocean-breeze", name: "Ocean Breeze", className: "theme-ocean", primary: "#1e3a5f", secondary: "#94a3b8", bg: "#f0f9ff", description: "Biru navy & perak - Elegan" },
  { id: "golden-sunset", name: "Golden Sunset", className: "theme-golden", primary: "#92400e", secondary: "#b45309", bg: "#fffbeb", description: "Amber & emas - Hangat" },
  { id: "lavender-dream", name: "Lavender Dream", className: "theme-lavender", primary: "#5b21b6", secondary: "#94a3b8", bg: "#faf5ff", description: "Ungu & perak - Lembut" },
  { id: "classic-monochrome", name: "Classic Monochrome", className: "theme-monochrome", primary: "#1a1a1a", secondary: "#d97706", bg: "#f9fafb", description: "Hitam putih & emas - Timeless" },
  { id: "tropical-paradise", name: "Tropical Paradise", className: "theme-tropical", primary: "#0f766e", secondary: "#f97316", bg: "#f0fdfa", description: "Teal & coral - Ceria" },
  { id: "rustic-charm", name: "Rustic Charm", className: "theme-rustic", primary: "#78350f", secondary: "#92400e", bg: "#fefce8", description: "Coklat earth tone - Natural" },
  { id: "midnight-rose", name: "Midnight Rose", className: "theme-midnight", primary: "#831843", secondary: "#1a1a1a", bg: "#fdf2f8", description: "Rose & hitam - Modern" }
];

export const ornaments: OrnamentConfig[] = [
  { id: "sunda", name: "Adat Sunda", description: "Motif Megamendung" },
  { id: "jawa", name: "Adat Jawa", description: "Motif Parang & Kawung" },
  { id: "betawi", name: "Adat Betawi", description: "Motif Gigi Balang" },
  { id: "bali", name: "Adat Bali", description: "Motif Patra" },
  { id: "minang", name: "Adat Minang", description: "Motif Kaluak Paku" },
  { id: "dayak", name: "Adat Dayak", description: "Motif Mandala" },
  { id: "modern", name: "Modern", description: "Minimalis" }
];

export const islamicOrnaments: OrnamentConfig[] = [
  { id: "kaligrafi-bismillah", name: "Kaligrafi Bismillah", description: "Bismillahirrahmanirrahim" },
  { id: "motif-masjid", name: "Motif Masjid", description: "Siluet masjid" },
  { id: "bulan-sabit", name: "Bulan Sabit & Bintang", description: "Simbol Islam" },
  { id: "geometris", name: "Motif Geometris", description: "Pola geometris Islami" },
  { id: "arabesque", name: "Arabesque Pattern", description: "Pola lengkung Islami" }
];
