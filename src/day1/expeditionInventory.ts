import { readFileSync } from 'fs';

interface IElfInventory {
  calories: number[];

  getCaloriesSum(): number;
}

export class ElfInventory implements IElfInventory {
  calories: number[];

  constructor(calories: number[]) {
    this.calories = calories;
  }

  getCaloriesSum(): number {
    return this.calories.reduce((sum, current) => sum + current, 0);
  }
}

interface IExpeditionInventory {
  elves: IElfInventory[];

  getElfWithMostCalories(): number;
}

export class ExpeditionInventory implements IExpeditionInventory {
  elves: IElfInventory[];

  constructor(elves: IElfInventory[]) {
    this.elves = elves;
  }

  static fromFile(path: string): ExpeditionInventory {
    const file = readFileSync(path, 'utf-8');
    const elves = file.split('\n\n').map((it) => {
      const calories = Array.from(it.split('\n').map((it) => Number(it)));
      return new ElfInventory(calories);
    });
    return new this(elves);
  }

  getElfWithMostCalories(): number {
    const calories = this.elves.map((elf) => elf.getCaloriesSum());
    return Math.max(...calories);
  }

  getSumOfElvesWithThreeMostCalories(): number {
    return this.elves
      .map((elf) => elf.getCaloriesSum())
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((sum, current) => sum + current, 0);
  }
}
