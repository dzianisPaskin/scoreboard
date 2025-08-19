import { Scoreboard, Match } from "./scoreboard";

describe("Scoreboard", () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  describe("getMatchById", () => {
    it("should throw an error if match not found", () => {
      expect(() => scoreboard["getMatchById"]("invalid-id")).toThrow(
        'Match with ID "invalid-id" not found'
      );
    });

    it("should return the match if found", () => {
      const matchId = scoreboard.startNewMatch("Poland", "Germany");
      const match = scoreboard["getMatchById"](matchId);
      expect(match).toBeDefined();
      expect(match.id).toBe(matchId);
    });
  });

  describe("startNewMatch", () => {
    it("should throw an error for invalid team names", () => {
      expect(() => scoreboard.startNewMatch("  ", "b")).toThrow(
        "Invalid team names"
      );
      expect(() => scoreboard.startNewMatch("a", "  ")).toThrow(
        "Invalid team names"
      );
    });

    it("should throw an error if teams are the same", () => {
      expect(() => scoreboard.startNewMatch("a", "a")).toThrow(
        "Teams must be different"
      );
    });

    it("should start a new match and return its ID", () => {
      const matchId = scoreboard.startNewMatch("Poland", "Germany");
      const match = scoreboard["matches"].get(matchId)!;

      expect(scoreboard["matches"]).toBeDefined();
      expect(scoreboard["matches"].size).toBe(1);
      expect(match.homeTeam).toBe("Poland");
      expect(match.awayTeam).toBe("Germany");
      expect(match.homeScore).toBe(0);
      expect(match.awayScore).toBe(0);
    });
  });

  describe("updateScore", () => {
    it("should throw an error for negative scores", () => {
      const matchId = scoreboard.startNewMatch("Poland", "Germany");
      expect(() => scoreboard.updateScore(matchId, -1, 2)).toThrow(
        "Score cannot be negative"
      );
    });

    it("should update the score of the match", () => {
      const matchId = scoreboard.startNewMatch("Poland", "Germany");
      scoreboard.updateScore(matchId, 1, 2);
      const match = scoreboard["getMatchById"](matchId);
      expect(match.homeScore).toBe(1);
      expect(match.awayScore).toBe(2);
    });
  });

  describe("finishMatch", () => {
    it("should throw an error if match not found", () => {
      expect(() => scoreboard.finishMatch("invalid-id")).toThrow(
        'Match with ID "invalid-id" not found.'
      );
    });

    it("should finish the match if found", () => {
      const matchId = scoreboard.startNewMatch("Poland", "Germany");
      scoreboard.finishMatch(matchId);

      expect(() => scoreboard["getMatchById"](matchId)).toThrow(
        `Match with ID "${matchId}" not found`
      );
    });
  });

  describe("getMatchSummaries", () => {
    it("should return an empty array if no matches are found", () => {
      const summary = scoreboard.getMatchSummaries();
      expect(summary).toEqual([]);
    });

    it("should return a sorted array of match summaries", async () => {
      const matchId1 = scoreboard.startNewMatch("Poland", "Germany");
      scoreboard.updateScore(matchId1, 1, 2);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const matchId2 = scoreboard.startNewMatch("France", "Brazil");
      scoreboard.updateScore(matchId2, 2, 1);

      const summary = scoreboard.getMatchSummaries();
      expect(summary).toHaveLength(2);
      expect(summary[0]!.id).toBe(matchId2);
      expect(summary[1]!.id).toBe(matchId1);
    });
  });
});

describe("Match", () => {
  let match: Match;

  beforeAll(() => {
    match = new Match("Poland", "Germany");
  });

  it("should create a match with home and away teams", () => {
    expect(match.awayTeam).toBeDefined();
    expect(match.homeTeam).toBeDefined();
    expect(match.homeTeam).toBe("Poland");
    expect(match.awayTeam).toBe("Germany");
  });

  it("should initialize scores to 0", () => {
    expect(match.homeScore).toBeDefined();
    expect(match.awayScore).toBeDefined();
    expect(match.homeScore).toBe(0);
    expect(match.awayScore).toBe(0);
  });

  it("should set the startedAt to current time", () => {
    expect(match.startedAt).toBeDefined();
    expect(match.startedAt).toBeInstanceOf(Date);
    expect(match.startedAt.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it("should create a match with a unique ID", () => {
    expect(match.id).toBeDefined();
    expect(typeof match.id).toBe("string");
  });
});
