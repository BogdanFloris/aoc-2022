import { readFileSync } from 'fs';
import { Directory, DirectoryInfo } from './day7/noSpaceLeftOnDevice';

console.log('Welcome to Advent of Code 2022!');

const input = readFileSync('./src/day7/input.txt', 'utf-8');
const rootDirectory = Directory.fromInput(input);
const directoryInfo: DirectoryInfo = {
  totalSumFiltered: 0,
  directorySizes: [],
};
rootDirectory.getDirectorySize(directoryInfo);
console.log(`Day 7 Puzzle 1 answer: ${directoryInfo.totalSumFiltered}`);
console.log(
  `Day 7 Puzzle 2 answer: ${rootDirectory.getSmallestDirectorySizeThatFreesUpEnoughSpace(
    directoryInfo,
  )}`,
);
