import { Well } from './pyroclasticFlow';

describe('pyroclasticFlow', () => {
  const input = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;

  it('should return the 1514285714288 for example input for limit 2022', () => {
    const well = Well.fromInput(input, 2022);
    expect(well.dropRocks()).toEqual(3068);
  });

  it('should return 1514285714288 for example input for limit 1000000000000', () => {
    const well = Well.fromInput(input, 1000000000000);
    expect(well.dropRocks()).toEqual(1514285714288);
  });
});
