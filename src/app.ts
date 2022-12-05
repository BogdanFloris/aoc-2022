import { readFileSync } from 'fs';
import { SupplyStacks } from './day5/supplyStacks';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day5/input.txt', 'utf-8');
const stacks = SupplyStacks.fromInput(input);
stacks.makeMoves(false);
console.log(`Day 5 Puzzle 2 answer: ${stacks.getTopCrateOnEachStack()}`);
