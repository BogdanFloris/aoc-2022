import { readFileSync } from 'fs';
import { Hill } from './day12/hillClimbing';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day12/input.txt', 'utf-8');
const hillPart1 = Hill.fromInput(input, '1');
console.log(`Day 12 Puzzle 1 answer: ${hillPart1.getShortestPath()}`);
const hillPart2 = Hill.fromInput(input, '2');
console.log(`Day 12 Puzzle 2 answer: ${hillPart2.getShortestPath()}`);
