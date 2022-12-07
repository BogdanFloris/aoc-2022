import { forEach } from 'lodash';

const DEVICE_SPACE = 70000000;
const MIN_UNUSED_SPACE = 30000000;
const FILTER = 10000000;

interface File {
  name: string;
  size: number;
}

interface IDirectory {
  name: string;
  subDirectories: Map<string, IDirectory>;
  previous: IDirectory | null;
  files: File[];

  getDirectorySize(directoryInfo: DirectoryInfo): number;
  getSmallestDirectorySizeThatFreesUpEnoughSpace(
    directoryInfo: DirectoryInfo,
  ): number;
}

export interface DirectoryInfo {
  totalSumFiltered: number;
  directorySizes: number[];
}

export class Directory {
  name: string;
  subDirectories: Map<string, IDirectory>;
  previous: IDirectory | null;
  files: File[];

  constructor(name: string, previous: IDirectory | null = null) {
    this.name = name;
    this.subDirectories = new Map();
    this.previous = previous;
    this.files = [];
  }

  static fromInput(input: string): Directory {
    const rootDirectory = new Directory('/');
    const lines = input.trim().split('\n');
    if (lines[0] !== '$ cd /') {
      throw new Error('Invalid input');
    }
    let currentDirectory: Directory = rootDirectory;
    forEach(lines.slice(1), (line) => {
      if (line.startsWith('$')) {
        // command
        if (line.startsWith('$ cd ')) {
          // cd
          const nextDir = line.split(' ')[2];
          if (nextDir === '..') {
            if (currentDirectory.previous === null) {
              throw new Error('Invalid input');
            }
            currentDirectory = currentDirectory.previous;
          } else {
            const nextDirectory = currentDirectory.subDirectories.get(nextDir);
            if (nextDirectory === undefined) {
              throw new Error('Invalid input');
            }
            currentDirectory = nextDirectory;
          }
        } else {
          // ls
          return;
        }
      } else {
        // file or directory output
        if (line.startsWith('dir ')) {
          // directory
          const name = line.split(' ')[1];
          const dir = new Directory(name, currentDirectory);
          currentDirectory.subDirectories.set(name, dir);
        } else {
          // file
          const [size, name] = line.split(' ');
          const file: File = {
            name,
            size: parseInt(size),
          };
          currentDirectory.files.push(file);
        }
      }
    });

    return rootDirectory;
  }

  getDirectorySize(
    directoryInfo: DirectoryInfo = { totalSumFiltered: 0, directorySizes: [] },
  ): number {
    // compute total file sizes in this directory
    const totalFileSize = this.files.reduce((acc, file) => acc + file.size, 0);
    const subdirectories = [...this.subDirectories.values()];
    const totalSubdirectorySize = subdirectories.reduce(
      (acc, dir) => acc + dir.getDirectorySize(directoryInfo),
      0,
    );
    const totalSum = totalFileSize + totalSubdirectorySize;
    if (totalSum < FILTER) {
      directoryInfo.totalSumFiltered += totalSum;
    }
    directoryInfo.directorySizes.push(totalSum);
    return totalSum;
  }

  getSmallestDirectorySizeThatFreesUpEnoughSpace({
    directorySizes,
  }: DirectoryInfo): number {
    if (directorySizes.length === 0) {
      return 0;
    }
    const sortedDirectorySizes = directorySizes.sort((a, b) => a - b);
    const largestDirectorySize =
      sortedDirectorySizes[sortedDirectorySizes.length - 1];
    const unusedSpace = DEVICE_SPACE - largestDirectorySize;
    for (const size of sortedDirectorySizes) {
      if (size + unusedSpace >= MIN_UNUSED_SPACE) {
        return size;
      }
    }
    return 0;
  }
}
