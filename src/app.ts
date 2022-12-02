import {
  computeTournamentPointsOutcome,
  computeTournamentPointsStrategy,
} from './day2/rockPaperScissors';
import { readFileSync } from 'fs';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day2/input.txt', 'utf-8');
console.log(`Day 2 Puzzle 1 answer: ${computeTournamentPointsOutcome(input)}`);
console.log(`Day 2 Puzzle 2 answer: ${computeTournamentPointsStrategy(input)}`);
