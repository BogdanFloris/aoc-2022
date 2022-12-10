import { readFileSync } from 'fs';
import { CathodeRayTube } from './day10/cathodeRayTube';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day10/input.txt', 'utf-8');
const cathodeRayTube = CathodeRayTube.fromInput(input);
cathodeRayTube.executeInstructions();
console.log(
  `Day 10 Puzzle 1 answer: ${cathodeRayTube.findSignalStrengthAtCycles()}`,
);
console.log('Day 10 Puzzle 2 answer:');
console.log(cathodeRayTube.toString());
