import { BoilingBoulders } from './boilingBoulders';

describe('boilingBoulders', () => {
  const input = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5
`;

  it('computeSurfaceArea should return 64 for example input', () => {
    const boulders = BoilingBoulders.fromString(input);
    expect(boulders.computeSurfaceArea()).toBe(64);
  });

  it('computeSurfaceAreaWithoutAirPockets should return 58 for example input', () => {
    const boulders = BoilingBoulders.fromString(input);
    expect(boulders.computeSurfaceAreaWithoutAirPockets()).toBe(58);
  });
});
