export interface ChildInfo {
  short: string;
  full: string;
  birthDate: string;
  age: string;
  hobby: string;
  school: string;
  quote: string;
  photo?: string;
}

export interface ParentInfo {
  father: string;
  mother: string;
  family: string;
}

export interface EventItem {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  maps: string;
  note: string;
}

export interface Quote {
  arabic: string;
  text: string;
  source: string;
}

export interface HikmahItem {
  title: string;
  text: string;
  icon: string;
}

export interface GalleryItem {
  src: string;
  caption: string;
}

export interface GiftItem {
  bank: string;
  number: string;
  holder: string;
}

export interface GuestMessage {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak';
  count: number;
  message: string;
  timestamp: number;
}

export interface Guest {
  id: string;
  name: string;
  phone: string;
}

export interface InvitationData {
  childName: ChildInfo;
  parents: ParentInfo;
  dateLabel: string;
  dateShort: string;
  dateISO: string;
  city: string;
  venueMain: string;
  events: EventItem[];
  quote: Quote;
  hikmah: HikmahItem[];
  gallery: GalleryItem[];
  gifts: GiftItem[];
  giftAddress: string;
  themeId: string;
  ornamentId: string;
  islamicOrnamentId: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  className: string;
  primary: string;
  secondary: string;
  bg: string;
  description: string;
}

export interface OrnamentConfig {
  id: string;
  name: string;
  description: string;
}
