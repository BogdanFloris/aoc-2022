import { readFileSync } from 'fs';
import {
  getNumberOfIntervalsFullyContained,
  getNumberOfIntervalsOverlapping,
} from './day4/campCleanup';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day4/input.txt', 'utf-8');
console.log(
  `Day 4 Puzzle 1 answer: ${getNumberOfIntervalsFullyContained(input)}`,
);
console.log(`Day 4 Puzzle 2 answer: ${getNumberOfIntervalsOverlapping(input)}`);
