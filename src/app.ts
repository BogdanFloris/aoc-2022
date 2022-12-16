import { readFileSync } from 'fs';
import { Tunnels } from './day16/proboscideaVolcanium';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day16/input.txt', 'utf-8');
const tunnelsOne = Tunnels.fromInput(input, 30);
console.log(`Day 16 Puzzle 1 answer: ${tunnelsOne.computeMostPressure()}`);
const tunnelsTwo = Tunnels.fromInput(input, 26);
console.log(
  `Day 16 Puzzle 1 answer: ${tunnelsTwo.computeMostPressureWithHelp()}`,
);
