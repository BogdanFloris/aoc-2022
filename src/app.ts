import { readFileSync } from 'fs';
import { BoilingBoulders } from './day18/boilingBoulders';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day18/input.txt', 'utf-8');
const bouldersOne = BoilingBoulders.fromString(input);
console.log(`Day 16 Puzzle 1 answer: ${bouldersOne.computeSurfaceArea()}`);
const bouldersTwo = BoilingBoulders.fromString(input);
console.log(
  `Day 16 Puzzle 2 answer: ${bouldersTwo.computeSurfaceAreaWithoutAirPockets()}`,
);
