import { readFileSync } from 'fs';
import { MonkeyInTheMiddle } from './day11/monkeyInTheMiddle';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day11/input.txt', 'utf-8');
const monkeyInTheMiddle20 = MonkeyInTheMiddle.fromInput(input, 20);
monkeyInTheMiddle20.playRounds();
console.log(
  `Day 11 Puzzle 1 answer: ${monkeyInTheMiddle20.getTwoMostActiveMonkeys()}`,
);
const monkeyInTheMiddle10000 = MonkeyInTheMiddle.fromInput(input, 10000);
monkeyInTheMiddle10000.playRounds();
console.log(
  `Day 11 Puzzle 2 answer: ${monkeyInTheMiddle10000.getTwoMostActiveMonkeys()}`,
);
