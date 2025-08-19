import { IMatch, IScoreboard } from "./types";

export class Scoreboard implements IScoreboard {
  private matches: IMatch[] = [];

  public startNewMatch(homeTeam: string, awayTeam: string): void {
    if (!homeTeam.trim() || !awayTeam.trim()) {
      throw new Error("Invalid team names");
    }

    if (homeTeam.trim() === awayTeam.trim()) {
      throw new Error("Teams must be different");
    }

    const newMatch = new Match(homeTeam, awayTeam);

    this.matches.push(newMatch);
  }
}

export class Match implements IMatch {
  constructor(
    public homeTeam: string,
    public awayTeam: string,
    public homeScore = 0,
    public awayScore = 0,
    public startedAt = new Date(),
    public id = crypto.randomUUID()
  ) {}
}
