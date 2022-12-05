type Move = {
  from: number;
  to: number;
  quantity: number;
};

interface ISupplyStacks {
  stacks: string[][];
  moves: Move[];

  makeMoves(reverse: boolean): void;

  getTopCrateOnEachStack(): string;
}

export class SupplyStacks implements ISupplyStacks {
  constructor(public stacks: string[][], public moves: Move[]) {
    this.stacks = stacks;
    this.moves = moves;
  }

  static fromInput(input: string): SupplyStacks {
    const [stacksInput, movesInput] = input.split('\n\n');
    const moves = SupplyStacks.parseMovesInput(movesInput);
    const stacks = SupplyStacks.parseStacksInput(stacksInput);
    return new SupplyStacks(stacks, moves);
  }

  static parseStacksInput(input: string): string[][] {
    const lines = input.split('\n').reverse();
    const noOfStacks = parseInt(lines[0][lines[0].length - 2]);
    const stacksItems = lines.slice(1);
    const indexOffset = 4;
    let stackIndex = 1;
    const stacks = [];
    for (let i = 0; i < noOfStacks; i++) {
      const stack = [];
      for (let j = 0; j < stacksItems.length; j++) {
        if (stacksItems[j][stackIndex] != ' ') {
          stack.push(stacksItems[j][stackIndex]);
        }
      }
      stacks.push(stack);
      stackIndex += indexOffset;
    }
    return stacks;
  }

  static parseMovesInput(input: string): Move[] {
    return input
      .trim()
      .split('\n')
      .map((line) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, quantity, from, to] = line.match(
          /move (\d+) from (\d+) to (\d+)/,
        ) as string[];
        return {
          quantity: Number(quantity),
          from: Number(from) - 1,
          to: Number(to) - 1,
        };
      }) as Move[];
  }

  getTopCrateOnEachStack(): string {
    return this.stacks.map((stack) => stack[stack.length - 1]).join('');
  }

  makeMoves(reverse: boolean): void {
    this.moves.forEach((move) => {
      const { from, to, quantity } = move;
      const fromStack = this.stacks[from];
      const toStack = this.stacks[to];

      // Pop quantity from fromStack
      const popped = fromStack.splice(-quantity);
      // Push popped onto toStack
      if (reverse) {
        // Part 1
        toStack.push(...popped.reverse());
      } else {
        // Part 2
        toStack.push(...popped);
      }
    });
  }
}
