import { describe } from '@jest/globals';
import {
  computeTournamentPointsOutcome,
  computeTournamentPointsStrategy,
} from './rockPaperScissors';

describe('rockPaperScissors', () => {
  const input = `A Y
B X
C Z
`;

  test('computeTournamentPoints', () => {
    expect(computeTournamentPointsOutcome(input)).toBe(15);
  });

  test('computeTournamentPointsStrategy', () => {
    expect(computeTournamentPointsStrategy(input)).toBe(12);
  });
});
