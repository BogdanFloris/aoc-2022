import { readFileSync } from 'fs';
import { Reservoir } from './day14/regolithReservoir';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day14/input.txt', 'utf-8');
const reservoirOne = Reservoir.fromString(input);
const reservoirTwo = Reservoir.fromString(input);
console.log(`Day 14 Puzzle 1 answer: ${reservoirOne.getSandCount()}`);
console.log(`Day 14 Puzzle 2 answer: ${reservoirTwo.getSandCountWithFloor()}`);
