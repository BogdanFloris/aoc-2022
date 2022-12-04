import { describe } from '@jest/globals';
import {
  getNumberOfIntervalsFullyContained,
  getNumberOfIntervalsOverlapping,
} from './campCleanup';

describe('campCleanup', () => {
  const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

  it('getNumberOfIntervalsFullyContained should return 2 for example input', () => {
    expect(getNumberOfIntervalsFullyContained(input)).toBe(2);
  });

  it('getNumberOfIntervalsOverlapping should return 4 for example input', () => {
    expect(getNumberOfIntervalsOverlapping(input)).toBe(4);
  });
});
