import { readFileSync } from 'fs';
import { Grid } from './day8/treetopTreeHouse';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day8/input.txt', 'utf-8');
const grid = Grid.fromInput(input);
console.log(`Day 8 Puzzle 1 answer: ${grid.getNumberOfVisibleTrees()}`);
console.log(`Day 8 Puzzle 2 answer: ${grid.getHighestScenicScore()}`);
