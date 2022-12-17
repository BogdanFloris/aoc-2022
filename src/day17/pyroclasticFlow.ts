interface Coord {
  x: number;
  y: number;
}

const WIDTH = 7;

enum RockShape {
  Line,
  Plus,
  BackwardL,
  I,
  Square,
}

const ROCK_SHAPES = {
  [RockShape.Line]: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
  [RockShape.Plus]: [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
  ],
  [RockShape.BackwardL]: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
  [RockShape.I]: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
  ],
  [RockShape.Square]: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
};

class CyclicIterator<T> {
  private readonly items: T[];
  private index = 0;

  constructor(items: T[]) {
    this.items = items;
  }

  next(): T {
    const item = this.items[this.index];
    this.index = (this.index + 1) % this.items.length;
    return item;
  }

  peekWithIndex(): [T, number] {
    return [this.items[this.index], this.index];
  }

  peek(): T {
    return this.items[this.index];
  }
}

type Gust = '<' | '>';

type HeightProfile = [number, number, number, number, number, number, number];

type CacheKey = {
  rockIndex: number;
  gustIndex: number;
  heightProfile: HeightProfile;
};

type CacheValue = {
  rockCount: number;
  wellHeight: number;
};

export class Well {
  columns: Array<Map<number, boolean>>;
  gusts: CyclicIterator<Gust>;
  rocks: CyclicIterator<RockShape>;
  limit: number;

  constructor(gusts: Array<Gust>, limit: number) {
    this.columns = Array.from({ length: WIDTH }, () => new Map());
    this.gusts = new CyclicIterator<Gust>(gusts);
    this.rocks = new CyclicIterator<RockShape>([
      RockShape.Line,
      RockShape.Plus,
      RockShape.BackwardL,
      RockShape.I,
      RockShape.Square,
    ]);
    this.limit = limit;
  }

  static fromInput(input: string, limit: number): Well {
    return new Well(input.trim().split('') as Array<Gust>, limit);
  }

  maxHeight(): number {
    return Math.max(...this.columns.map((col) => this.maxColumnHeight(col)));
  }

  maxColumnHeight(col: Map<number, boolean>): number {
    // return max column height or -1 if empty
    return col.size > 0 ? Math.max(...col.keys()) : -1;
  }

  hitSomething(coord: Coord): boolean {
    return (
      ![...Array(WIDTH).keys()].includes(coord.x) ||
      coord.y < 0 ||
      this.columns[coord.x].has(coord.y)
    );
  }

  rockHitsSomething(rock: RockShape, coord: Coord): boolean {
    const rockShape = ROCK_SHAPES[rock];
    for (const rockCoord of rockShape) {
      const newCoord = {
        x: coord.x + rockCoord.x,
        y: coord.y + rockCoord.y,
      };
      if (this.hitSomething(newCoord)) {
        return true;
      }
    }
    return false;
  }

  placeRock(rock: RockShape, coord: Coord): void {
    const rockShape = ROCK_SHAPES[rock];
    for (const rockCoord of rockShape) {
      const newCoord = {
        x: coord.x + rockCoord.x,
        y: coord.y + rockCoord.y,
      };
      this.columns[newCoord.x].set(newCoord.y, true);
    }
  }

  getHeightProfile(): HeightProfile {
    const maxHeight = this.maxHeight();
    const heightProfile = Array.from({ length: WIDTH }, () => 0);
    for (let x = 0; x < WIDTH; x++) {
      const col = this.columns[x];
      const height = this.maxColumnHeight(col);
      heightProfile[x] = maxHeight - height;
    }
    return heightProfile as HeightProfile;
  }

  dropRock(rock: RockShape): void {
    let rockCoord = { x: 2, y: this.maxHeight() + 4 };
    for (;;) {
      const gust_offset = this.gusts.next() === '<' ? -1 : 1;
      const blownRockCoord = { x: rockCoord.x + gust_offset, y: rockCoord.y };
      if (!this.rockHitsSomething(rock, blownRockCoord)) {
        rockCoord = blownRockCoord;
      }
      const fallingRockCoord = { x: rockCoord.x, y: rockCoord.y - 1 };
      if (this.rockHitsSomething(rock, fallingRockCoord)) {
        this.placeRock(rock, rockCoord);
        return;
      }
      rockCoord = fallingRockCoord;
    }
  }

  dropRocks(): number {
    let rockCount = 0;
    const cache = new Map<string, CacheValue>();
    while (rockCount < this.limit) {
      rockCount++;
      this.dropRock(this.rocks.next());
      // construct cache key
      const cacheKey: CacheKey = {
        rockIndex: this.rocks.peekWithIndex()[1],
        gustIndex: this.gusts.peekWithIndex()[1],
        heightProfile: this.getHeightProfile(),
      };
      const cacheKeyString = JSON.stringify(cacheKey);
      // construct cache value
      const cacheValue: CacheValue = {
        rockCount,
        wellHeight: this.maxHeight(),
      };
      // check if cache key exists
      const cachedValue = cache.get(cacheKeyString);
      if (cachedValue) {
        // cache hit
        const cycleLength = rockCount - cachedValue.rockCount;
        const cyclesLeft = Math.floor((this.limit - rockCount) / cycleLength);
        // fast-forward rock count
        rockCount += cyclesLeft * cycleLength;
        // get fast-forwarded height
        const fastForwardedHeight =
          cyclesLeft * (this.maxHeight() - cachedValue.wellHeight);
        // finish the last cycle
        while (rockCount < this.limit) {
          rockCount++;
          this.dropRock(this.rocks.next());
        }
        return this.maxHeight() + fastForwardedHeight + 1;
      }
      // cache miss
      cache.set(cacheKeyString, cacheValue);
    }
    return this.maxHeight() + 1;
  }
}
