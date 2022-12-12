import { Hill } from './hillClimbing';

describe('hillClimbing', () => {
  const input = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;

  it('getShortestPath should return 31 for example input part 1', () => {
    const hill = Hill.fromInput(input, '1');
    expect(hill.getShortestPath()).toBe(31);
  });

  it('getShortestPath should return 29 for example input part 2', () => {
    const hill = Hill.fromInput(input, '2');
    expect(hill.getShortestPath()).toBe(29);
  });
});
