export type TeamSlot = {
  date: string;
  time: string;
  label: string;
};

export const TEAM_SCHEDULES: Record<string, TeamSlot[]> = {
  rookie: [
    { date: "2026-04-08", time: "13:00", label: "4/8 13:00" },
    { date: "2026-04-08", time: "15:00", label: "4/8 15:00" },
    { date: "2026-04-09", time: "19:00", label: "4/9 19:00" },
  ],
  eric: [
    { date: "2026-04-08", time: "16:00", label: "4/8 16:00" },
    { date: "2026-04-10", time: "20:00", label: "4/10 20:00" },
  ],
  dragon: [
    { date: "2026-04-11", time: "14:00", label: "4/11 14:00" },
    { date: "2026-04-11", time: "16:00", label: "4/11 16:00" },
  ],
};