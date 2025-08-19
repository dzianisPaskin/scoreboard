import { IMatch, IScoreboard } from "./types";

export class Scoreboard implements IScoreboard {
  private matches: Map<string, Match> = new Map();

  private getMatchById(matchId: string): Match {
    const match = this.matches.get(matchId);

    if (!match) {
      throw new Error(`Match with ID "${matchId}" not found`);
    }

    return match;
  }

  public startNewMatch(homeTeam: string, awayTeam: string): string {
    if (!homeTeam.trim() || !awayTeam.trim()) {
      throw new Error("Invalid team names");
    }

    if (homeTeam.trim().toLowerCase() === awayTeam.trim().toLowerCase()) {
      throw new Error("Teams must be different");
    }

    const newMatch = new Match(homeTeam, awayTeam);

    this.matches.set(newMatch.id, newMatch);

    return newMatch.id;
  }

  public updateScore(
    matchId: string,
    homeScore: number,
    awayScore: number
  ): void {
    if (homeScore < 0 || awayScore < 0) {
      throw new Error("Score cannot be negative");
    }

    const match = this.getMatchById(matchId);

    match.homeScore = homeScore;
    match.awayScore = awayScore;
  }

  public finishMatch(matchId: string): void {
    if (!this.matches.delete(matchId)) {
      throw new Error(`Match with ID "${matchId}" not found.`);
    }
  }

  public getMatchSummaries(): IMatch[] {
    const matchesArray = Array.from(this.matches.values());

    return matchesArray.sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;

      if (totalScoreB !== totalScoreA) {
        return totalScoreB - totalScoreA;
      }

      return b.startedAt.getTime() - a.startedAt.getTime();
    });
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
