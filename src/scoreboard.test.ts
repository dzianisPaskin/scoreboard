import { Scoreboard, Match } from "./scoreboard";

describe("Scoreboard", () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
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

    it("should start a new match", () => {
      scoreboard.startNewMatch("Poland", "Germany");
      const match = scoreboard["matches"][0]!;

      expect(scoreboard["matches"]).toBeDefined();
      expect(scoreboard["matches"].length).toBe(1);
      expect(match.homeTeam).toBe("Poland");
      expect(match.awayTeam).toBe("Germany");
      expect(match.homeScore).toBe(0);
      expect(match.awayScore).toBe(0);
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
