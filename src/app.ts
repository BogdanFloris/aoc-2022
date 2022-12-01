import { ExpeditionInventory } from './day1/expeditionInventory';

console.log('Welcome to Advent of Code 2022!');

const expeditionInventory = ExpeditionInventory.fromFile(
  './src/day1/input.txt',
);
console.log(
  `Day 1 Puzzle 1 answer: ${expeditionInventory.getElfWithMostCalories()}`,
);
console.log(
  `Day 1 Puzzle 2 answer: ${expeditionInventory.getSumOfElvesWithThreeMostCalories()}`,
);
