import { readFileSync } from 'fs';
import { BeaconExclusionZone } from './day15/beaconExclusionZone';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day15/input.txt', 'utf-8');
const zone = BeaconExclusionZone.fromString(input, 2000000, 4000000);
console.log(`Day 14 Puzzle 1 answer: ${zone.getExcludedPointsOnTargetY()}`);
