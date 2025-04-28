// types/user.ts

export interface Stats {
  loveLetter: StatsLoveLetter;
  lastHope: StatsLastHope;
}

export interface StatsLoveLetter {
  gamesPlayed: number;
  wins: number;
  losses: number;
  roundsPlayed: number;
  roundsWin: number;
  roundsLosses: number;
}

export interface StatsLastHope {
  gamesPlayed: number;
  wins: number;
  losses: number;
}

export interface Profile {
  _id: string;
  username: string;
  email: string;
  stats: Stats;
  createdAt: string;
}
