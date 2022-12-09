import { readFileSync } from 'fs';
import { RopeBridge } from './day9/ropeBridge';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day9/input.txt', 'utf-8');
const bridgeOne = new RopeBridge(2);
bridgeOne.makeMoves(input);
console.log(`Day 9 Puzzle 1 answer: ${bridgeOne.getNumberOfVisitedPoints()}`);
const bridgeTwo = new RopeBridge(10);
bridgeTwo.makeMoves(input);
console.log(`Day 9 Puzzle 2 answer: ${bridgeTwo.getNumberOfVisitedPoints()}`);
