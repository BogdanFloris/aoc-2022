import { describe } from '@jest/globals';
import { tuningTrouble } from './tuningTrouble';

describe('tuningTrouble', () => {
  it('should return 7 and 19 for mjqjpqmgbljsphdztnvjfqwrcgsmlb', () => {
    expect(tuningTrouble('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 4)).toBe(7);
    expect(tuningTrouble('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toBe(19);
  });

  it('should return 5 and 23 for bvwbjplbgvbhsrlpgdmjqwftvncz', () => {
    expect(tuningTrouble('bvwbjplbgvbhsrlpgdmjqwftvncz', 4)).toBe(5);
    expect(tuningTrouble('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toBe(23);
  });

  it('should return 6 and 23 for nppdvjthqldpwncqszvftbrmjlhg', () => {
    expect(tuningTrouble('nppdvjthqldpwncqszvftbrmjlhg', 4)).toBe(6);
    expect(tuningTrouble('nppdvjthqldpwncqszvftbrmjlhg', 14)).toBe(23);
  });

  it('should return 10 and 29 for nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', () => {
    expect(tuningTrouble('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4)).toBe(10);
    expect(tuningTrouble('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).toBe(29);
  });

  it('should return 11 and 26 for zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', () => {
    expect(tuningTrouble('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4)).toBe(11);
    expect(tuningTrouble('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).toBe(26);
  });
});
