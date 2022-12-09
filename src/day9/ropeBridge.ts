const Offsets: Record<string, Record<string, number>> = {
  R: { x: 1, y: 0 },
  L: { x: -1, y: 0 },
  U: { x: 0, y: 1 },
  D: { x: 0, y: -1 },
};

interface IPoint {
  x: number;
  y: number;
}

class Point implements IPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static fromString(str: string): Point {
    const [x, y] = str.split(',').map((s) => parseInt(s, 10));
    return new Point(x, y);
  }

  public toString(): string {
    return `${this.x},${this.y}`;
  }
}

interface IRopeBridge {
  segments: Point[];
  noOfSegments: number;
  visited: Set<string>;

  getNumberOfVisitedPoints(): number;
  makeMoves(input: string): void;
  moveOneStep(direction: string): void;
}

export class RopeBridge implements IRopeBridge {
  segments: Point[];
  noOfSegments: number;
  visited: Set<string>;

  constructor(noOfSegments: number) {
    this.segments = [];
    for (let i = 0; i < noOfSegments; i++) {
      this.segments.push(new Point(0, 0));
    }
    this.noOfSegments = noOfSegments;
    this.visited = new Set();
    this.visited.add(this.segments[noOfSegments - 1].toString());
  }

  makeMoves(input: string) {
    const moves = input.trim().split('\n');
    for (const move of moves) {
      const [direction, distance] = move.split(' ');
      for (let i = 0; i < Number(distance); i++) {
        this.moveOneStep(direction);
        this.visited.add(this.segments[this.noOfSegments - 1].toString());
      }
    }
  }

  moveOneStep(direction: string) {
    // Move the head segment
    const offset = Offsets[direction];
    this.segments[0].x += offset.x;
    this.segments[0].y += offset.y;
    // Move the tail segments
    for (let i = 1; i < this.noOfSegments; i++) {
      const head = this.segments[i - 1];
      const tail = this.segments[i];
      if (Math.max(Math.abs(head.x - tail.x), Math.abs(head.y - tail.y)) > 1) {
        if (this.segments[i - 1].x !== tail.x) {
          if (head.x > tail.x) {
            tail.x += 1;
          } else {
            tail.x -= 1;
          }
        }
        if (head.y !== tail.y) {
          if (head.y > tail.y) {
            tail.y += 1;
          } else {
            tail.y -= 1;
          }
        }
      }
    }
  }

  getNumberOfVisitedPoints(): number {
    return this.visited.size;
  }
}
