import { describe } from '@jest/globals';
import { ElfInventory, ExpeditionInventory } from './expeditionInventory';

describe('expeditionInventory', () => {
  const expeditionInventory = new ExpeditionInventory([
    new ElfInventory([1000, 2000, 3000]),
    new ElfInventory([4000]),
    new ElfInventory([5000, 6000]),
    new ElfInventory([7000, 8000, 9000]),
    new ElfInventory([10000]),
  ]);

  test('getElfWithMostCalories', () => {
    expect(expeditionInventory.getElfWithMostCalories()).toBe(24000);
  });

  test('getSumOfElvesWithThreeMostCalories', () => {
    expect(expeditionInventory.getSumOfElvesWithThreeMostCalories()).toBe(
      45000,
    );
  });
});
