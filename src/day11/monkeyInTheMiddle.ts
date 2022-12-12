const WORRY_LEVEL_DIVISOR = 3;

enum OperationType {
  Plus = '+',
  Multiply = '*',
}

interface Operation {
  type: OperationType;
  value?: number;
}

interface WorryTest {
  testDivisor: number;
  monkeyIfDivisible: number;
  monkeyIfNotDivisible: number;
}

interface Monkey {
  worryLevels: number[];
  operation: Operation;
  worryTest: WorryTest;
  itemsInspected: number;
}

export class MonkeyInTheMiddle {
  monkeys: Monkey[];
  rounds: number;
  lcm: number;

  constructor(monkeys: Monkey[], rounds: number, lcm: number) {
    this.monkeys = monkeys;
    this.rounds = rounds;
    this.lcm = lcm;
  }

  static fromInput(input: string, rounds: number): MonkeyInTheMiddle {
    const monkeys = input
      .trim()
      .split('\n\n')
      .map((monkeyInput) => {
        const lines = monkeyInput.trim().split('\n');
        const worryLevels = lines[1].match(/\d+/g)?.map(Number);
        if (!worryLevels) {
          throw new Error('Invalid input');
        }
        let operation: Operation;
        if (lines[2].includes(OperationType.Plus)) {
          operation = {
            type: OperationType.Plus,
            value: Number(lines[2].match(/\d+/g)?.[0]),
          };
        } else {
          operation = {
            type: OperationType.Multiply,
            value: Number(lines[2].match(/\d+/g)?.[0]),
          };
        }
        const testDivisor = Number(lines[3].match(/\d+/g)?.[0]);
        const monkeyIfDivisible = Number(lines[4].match(/\d+/g)?.[0]);
        const monkeyIfNotDivisible = Number(lines[5].match(/\d+/g)?.[0]);
        const worryTest: WorryTest = {
          testDivisor,
          monkeyIfDivisible,
          monkeyIfNotDivisible,
        };
        return {
          worryLevels,
          operation,
          worryTest,
          itemsInspected: 0,
        };
      });
    const lcm = monkeys
      .map((monkey) => monkey.worryTest.testDivisor)
      .reduce((prod, curr) => prod * curr);
    return new MonkeyInTheMiddle(monkeys, rounds, lcm);
  }

  playRounds(): void {
    for (let i = 0; i < this.rounds; i++) {
      for (const monkey of this.monkeys) {
        // Inspect items
        for (let j = 0; j < monkey.worryLevels.length; j++) {
          // Apply operation
          switch (monkey.operation.type) {
            case OperationType.Plus:
              if (monkey.operation.value) {
                monkey.worryLevels[j] += monkey.operation.value;
              } else {
                monkey.worryLevels[j] += monkey.worryLevels[j];
              }
              break;
            case OperationType.Multiply:
              if (monkey.operation.value) {
                monkey.worryLevels[j] *= monkey.operation.value;
              } else {
                monkey.worryLevels[j] *= monkey.worryLevels[j];
              }
              break;
          }

          // Divide worry level
          if (this.rounds === 20) {
            monkey.worryLevels[j] = Math.floor(
              monkey.worryLevels[j] / WORRY_LEVEL_DIVISOR,
            );
          } else {
            monkey.worryLevels[j] %= this.lcm;
          }

          // Throw item to another monkey
          if (monkey.worryLevels[j] % monkey.worryTest.testDivisor === 0) {
            this.monkeys[monkey.worryTest.monkeyIfDivisible].worryLevels.push(
              monkey.worryLevels[j],
            );
          } else {
            this.monkeys[
              monkey.worryTest.monkeyIfNotDivisible
            ].worryLevels.push(monkey.worryLevels[j]);
          }

          // Increment items inspected
          monkey.itemsInspected++;
        }
        // Clear worry levels
        monkey.worryLevels = [];
      }
    }
  }

  getTwoMostActiveMonkeys(): number {
    const sortedMonkeys = this.monkeys.sort((a, b) => {
      return b.itemsInspected - a.itemsInspected;
    });

    return sortedMonkeys[0].itemsInspected * sortedMonkeys[1].itemsInspected;
  }
}
