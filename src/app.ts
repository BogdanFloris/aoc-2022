import { readFileSync } from 'fs';
import { Well } from './day17/pyroclasticFlow';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day17/input.txt', 'utf-8');
const wellOne = Well.fromInput(input, 2022);
console.log(`Day 16 Puzzle 1 answer: ${wellOne.dropRocks()}`);
const wellTwo = Well.fromInput(input, 1000000000000);
console.log(`Day 16 Puzzle 2 answer: ${wellTwo.dropRocks()}`);
