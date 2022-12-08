import { describe } from '@jest/globals';
import { Grid } from './treetopTreeHouse';

describe('treetopTreeHouse', () => {
  const input = `
30373
25512
65332
33549
35390
`;

  it('getNumberOfVisibleTrees should return 21', () => {
    const grid = Grid.fromInput(input);
    expect(grid.getNumberOfVisibleTrees()).toBe(21);
  });

  it('getHighestScenicScore should return 8', function () {
    const grid = Grid.fromInput(input);
    expect(grid.getHighestScenicScore()).toBe(8);
  });
});
