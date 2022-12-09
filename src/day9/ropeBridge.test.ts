import { describe } from '@jest/globals';
import { RopeBridge } from './ropeBridge';

describe('ropeBridge', () => {
  const inputOne = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

  const inputTwo = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`;

  it('should make moves and visit 13 positions with 2 segments', () => {
    const bridge = new RopeBridge(2);
    bridge.makeMoves(inputOne);
    expect(bridge.getNumberOfVisitedPoints()).toBe(13);
  });

  it('should make moves and visit 36 positions with 10 segments', () => {
    const bridge = new RopeBridge(10);
    bridge.makeMoves(inputTwo);
    expect(bridge.getNumberOfVisitedPoints()).toBe(36);
  });
});
