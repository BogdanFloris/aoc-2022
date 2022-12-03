import { readFileSync } from 'fs';
import {
  getPrioritySumOfBadges,
  getPrioritySumOfCommonLetters,
} from './day3/rucksackReorganization';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day3/input.txt', 'utf-8');
console.log(`Day 3 Puzzle 1 answer: ${getPrioritySumOfCommonLetters(input)}`);
console.log(`Day 3 Puzzle 2 answer: ${getPrioritySumOfBadges(input)}`);
