import { describe } from '@jest/globals';
import { SupplyStacks } from './supplyStacks';

describe('Supply Stacks', () => {
  const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

  it('getTopCrateOnEachStack should return CMZ for the input when reverse', () => {
    const stacks = SupplyStacks.fromInput(input);
    stacks.makeMoves(true);
    expect(stacks.getTopCrateOnEachStack()).toBe('CMZ');
  });

  it('getTopCrateOnEachStack should return CMZ for the input when not reverse', () => {
    const stacks = SupplyStacks.fromInput(input);
    stacks.makeMoves(false);
    expect(stacks.getTopCrateOnEachStack()).toBe('MCD');
  });
});
