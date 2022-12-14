import { Reservoir } from './regolithReservoir';

describe('regolithReservoir', () => {
  const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`;

  it('getSandCount should return 24 for example input', () => {
    const reservoir = Reservoir.fromString(input);
    expect(reservoir.getSandCount()).toEqual(24);
  });

  it('getSandCountWithFloor should return 93 for example input', () => {
    const reservoir = Reservoir.fromString(input);
    expect(reservoir.getSandCountWithFloor()).toEqual(93);
  });
});
