import { readFileSync } from 'fs';
import { DistressSignal, DividerPackets } from './day13/distressSignal';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day13/input.txt', 'utf-8');
const distressSignal = DistressSignal.fromString(input);
console.log(
  `Day 13 Puzzle 1 answer: ${distressSignal.getSumOfIndicesOfPairsInRightOrder()}`,
);
const dividerPackets = DividerPackets.fromString(input);
console.log(
  `Day 13 Puzzle 2 answer: ${dividerPackets.getDividerPacketsIndicesProductAfterSorting()}`,
);
