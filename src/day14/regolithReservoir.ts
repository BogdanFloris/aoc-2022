interface Block {
  x: number;
  y: number;
}

export class Reservoir {
  blocks: Map<string, Block>;
  maxDepth: number;
  xStart = 500;

  constructor(blocks: Map<string, Block>, maxDepth: number) {
    this.blocks = blocks;
    this.maxDepth = maxDepth;
  }

  static fromString(input: string): Reservoir {
    const blocks = new Map<string, Block>();
    const lines = input.trim().split('\n');
    for (const line of lines) {
      const points = line.split(' -> ').map((point) => {
        const [x, y] = point.split(',').map((n) => parseInt(n, 10));
        return { x, y };
      });
      for (let i = 1; i < points.length; i++) {
        const pointOne = points[i - 1];
        const pointTwo = points[i];
        const xStart = Math.min(pointOne.x, pointTwo.x);
        const xEnd = Math.max(pointOne.x, pointTwo.x);
        const yStart = Math.min(pointOne.y, pointTwo.y);
        const yEnd = Math.max(pointOne.y, pointTwo.y);
        // Generate blocks
        for (let x = xStart; x <= xEnd; x++) {
          for (let y = yStart; y <= yEnd; y++) {
            const block: Block = { x, y };
            blocks.set(JSON.stringify(block), block);
          }
        }
      }
    }

    const maxDepth = Array.from(blocks.values())
      .map((b) => b.y)
      .reduce((a, b) => Math.max(a, b), 0);
    return new Reservoir(blocks, maxDepth);
  }

  simulateSandDrop(): Block {
    let x = this.xStart;
    for (let y = 0; y < this.maxDepth; y++) {
      // Check below
      if (!this.blocks.has(JSON.stringify({ x: x, y: y + 1 }))) {
        /* empty */
      }
      // Check below left
      else if (!this.blocks.has(JSON.stringify({ x: x - 1, y: y + 1 }))) {
        x -= 1;
      }
      // Check below right
      else if (!this.blocks.has(JSON.stringify({ x: x + 1, y: y + 1 }))) {
        x += 1;
      } else {
        return { x, y };
      }
    }
    return { x, y: this.maxDepth };
  }

  getSandCount(): number {
    let sandCount = 0;
    for (;;) {
      const block = this.simulateSandDrop();
      if (block.y >= this.maxDepth) {
        break;
      }
      this.blocks.set(JSON.stringify(block), block);
      sandCount += 1;
    }
    return sandCount;
  }

  getSandCountWithFloor(): number {
    this.maxDepth += 1;
    let sandCount = 0;
    for (;;) {
      const block = this.simulateSandDrop();
      this.blocks.set(JSON.stringify(block), block);
      sandCount += 1;
      if (block.x === 500 && block.y === 0) {
        break;
      }
    }
    return sandCount;
  }
}
