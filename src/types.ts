export interface IMatch {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startedAt: Date;
  id: string;
}

export interface IScoreboard {
  startNewMatch(homeTeam: string, awayTeam: string): string;
  updateScore(matchId: string, homeScore: number, awayScore: number): void;
}
