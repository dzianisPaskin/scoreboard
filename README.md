# Live Football World Cup Score Board

A library for managing live football match scores. Implements operations for starting matches (0-0 initial score), updating absolute scores, finishing matches, and retrieving summaries sorted by total score.

## Features

-   **startNewMatch**: Begin a new match with an initial score of 0-0
-   **updateScore**: Update the score of a match
-   **finishMatch**: Remove a match from the scoreboard
-   **getMatchSummaries**: Returns a list of all ongoing matches, sorted by total score and start time
-   **Error Handling**: Includes handling edge cases
-   **Tested**: Covered by unit tests

## Development
```bash
npm install
npm run test:watch
npm run build
```

## TDD Approach
Developed using TDD: Failing tests written first for each method, minimal implementation to pass, then refactoring

## Project Structure

```
.
src/
  ├── scoreboard.ts       # Core logic
  ├── scoreboard.test.ts  # Unit tests
  ├── types.ts            # Interfaces
```
