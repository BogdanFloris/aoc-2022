interface IPoint {
  i: number;
  j: number;
}

class Point implements IPoint {
  constructor(public i: number, public j: number) {
    this.i = i;
    this.j = j;
  }

  toString() {
    return `(${this.i}, ${this.j})`;
  }
}

export class Hill {
  grid: string[][];
  startPosition: Point[];

  constructor(grid: string[][], startPositions: Point[]) {
    this.grid = grid;
    this.startPosition = startPositions;
  }

  private canMoveTo(start: Point, end: Point): boolean {
    if (
      end.j < 0 ||
      end.j >= this.grid[0].length ||
      end.i < 0 ||
      end.i >= this.grid.length
    ) {
      return false;
    }
    let codeStart = this.grid[start.i][start.j].charCodeAt(0);
    let codeEnd = this.grid[end.i][end.j].charCodeAt(0);
    if (codeStart === 'S'.charCodeAt(0)) {
      codeStart = 'a'.charCodeAt(0);
    }
    if (codeEnd === 'E'.charCodeAt(0)) {
      codeEnd = 'z'.charCodeAt(0);
    }
    return codeEnd <= codeStart + 1;
  }

  static fromInput(input: string, part: string): Hill {
    const grid = input
      .trim()
      .split('\n')
      .map((row) => row.split(''));
    const startPositions = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const charCode = grid[i][j].charCodeAt(0);
        if (part === '1') {
          if (charCode === 'S'.charCodeAt(0)) {
            startPositions.push(new Point(i, j));
          }
        } else {
          if (
            charCode === 'S'.charCodeAt(0) ||
            charCode === 'a'.charCodeAt(0)
          ) {
            startPositions.push(new Point(i, j));
          }
        }
      }
    }
    if (startPositions.length === 0) {
      throw new Error('Invalid input');
    }
    return new Hill(grid, startPositions);
  }

  getShortestPath(): number {
    const visited = new Set<string>();
    const queue: Array<[Point, number]> = [];
    const shortestPaths: number[] = [];
    for (const startPosition of this.startPosition) {
      queue.push([startPosition, 0]);
    }
    while (queue.length > 0) {
      const [currentPosition, distance] = queue.shift()!;
      if (visited.has(currentPosition.toString())) {
        continue;
      }
      visited.add(currentPosition.toString());
      if (this.grid[currentPosition.i][currentPosition.j] === 'E') {
        shortestPaths.push(distance);
        continue;
      }
      const neighbors = [
        new Point(currentPosition.i - 1, currentPosition.j),
        new Point(currentPosition.i + 1, currentPosition.j),
        new Point(currentPosition.i, currentPosition.j - 1),
        new Point(currentPosition.i, currentPosition.j + 1),
      ];
      for (const neighbor of neighbors) {
        if (this.canMoveTo(currentPosition, neighbor)) {
          queue.push([neighbor, distance + 1]);
        }
      }
    }
    return Math.min(...shortestPaths);
  }
}
