import { describe } from '@jest/globals';
import {
  getPrioritySumOfBadges,
  getPrioritySumOfCommonLetters,
} from './rucksackReorganization';

describe('rucksackReorganization', () => {
  const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

  it('getPrioritySumOfCommonLetters should return 157 for the example input.txt', () => {
    expect(getPrioritySumOfCommonLetters(input)).toEqual(157);
  });

  it('getPrioritySumOfBadges should return 70 for the example input.txt', () => {
    expect(getPrioritySumOfBadges(input)).toEqual(70);
  });
});
