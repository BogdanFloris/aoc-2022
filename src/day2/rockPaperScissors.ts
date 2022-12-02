const pickPoints: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

const outcomePoints: Record<string, Record<string, number>> = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3,
  },
};

const strategy: Record<string, Record<string, string>> = {
  A: {
    X: 'Z',
    Y: 'X',
    Z: 'Y',
  },
  B: {
    X: 'X',
    Y: 'Y',
    Z: 'Z',
  },
  C: {
    X: 'Y',
    Y: 'Z',
    Z: 'X',
  },
};

export function computeTournamentPointsOutcome(input: string): number {
  return input
    .trim()
    .split('\n')
    .map((round) => {
      const [left, right] = round.split(' ');
      return pickPoints[right] + outcomePoints[left][right];
    })
    .reduce((sum, current) => sum + current, 0);
}

export function computeTournamentPointsStrategy(input: string): number {
  return input
    .trim()
    .split('\n')
    .map((round) => {
      const [left, right] = round.split(' ');
      const strategyPick = strategy[left][right];
      return pickPoints[strategyPick] + outcomePoints[left][strategyPick];
    })
    .reduce((sum, current) => sum + current, 0);
}
