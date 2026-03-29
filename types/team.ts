import type { Lang } from "./common";

export type TeamMember = {
  id: string;
  name: string;
  desc: Record<Lang, string[]>;
  imgs: string[];
  calendar: string;
};

export type GalleryState = {
  isOpen: boolean;
  member: TeamMember | null;
  imageIndex: number;
};