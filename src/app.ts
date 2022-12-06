import { readFileSync } from 'fs';
import { tuningTrouble } from './day6/tuningTrouble';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day6/input.txt', 'utf-8');
console.log(`Day 6 Puzzle 1 answer: ${tuningTrouble(input, 4)}`);
console.log(`Day 6 Puzzle 2 answer: ${tuningTrouble(input, 14)}`);
