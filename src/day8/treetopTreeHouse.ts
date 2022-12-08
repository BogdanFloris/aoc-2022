import * as dfd from 'danfojs-node';

interface IGrid {
  df: dfd.DataFrame;
  noRows: number;
  noCols: number;
}

export class Grid implements IGrid {
  df: dfd.DataFrame;
  noRows: number;
  noCols: number;

  constructor(grid: number[][], noRows: number, noCols: number) {
    this.df = new dfd.DataFrame(grid);
    this.noRows = noRows;
    this.noCols = noCols;
  }

  static fromInput(input: string) {
    const grid = input
      .trim()
      .split('\n')
      .map((row) => row.split('').map(Number));
    const [noRows, noCols] = [grid.length, grid[0].length];
    return new Grid(grid, noRows, noCols);
  }

  getHighestScenicScore(): number {
    let highestScenicScore = 0;
    for (let row = 0; row < this.noRows; row++) {
      for (let col = 0; col < this.noCols; col++) {
        const scenicScore = this.getScenicScore(row, col);
        if (scenicScore > highestScenicScore) {
          highestScenicScore = scenicScore;
        }
      }
    }
    return highestScenicScore;
  }

  getScenicScore(row: number, col: number): number {
    if (
      row === 0 ||
      col === 0 ||
      row === this.noRows - 1 ||
      col === this.noCols - 1
    ) {
      return 0;
    }
    return (
      this.getScenicScoreLeft(row, col) *
      this.getScenicScoreRight(row, col) *
      this.getScenicScoreUp(row, col) *
      this.getScenicScoreDown(row, col)
    );
  }

  getScenicScoreLeft(row: number, col: number): number {
    const currentValue = this.df.iloc({ rows: [row], columns: [col] })
      .values[0];
    const treesToLeft = this.df.iloc({
      rows: [row],
      columns: [`:${col}`],
    }).values[0];
    if (typeof treesToLeft === 'object') {
      treesToLeft.reverse();
      for (let i = 0; i < treesToLeft.length; i++) {
        if (treesToLeft[i] >= currentValue) {
          return i + 1;
        }
      }
      return treesToLeft.length;
    }
    return 0;
  }

  getScenicScoreRight(row: number, col: number): number {
    const currentValue = this.df.iloc({ rows: [row], columns: [col] })
      .values[0];
    const treesToRight = this.df.iloc({
      rows: [row],
      columns: [`${col + 1}:`],
    }).values[0];
    if (typeof treesToRight === 'object') {
      for (let i = 0; i < treesToRight.length; i++) {
        if (treesToRight[i] >= currentValue) {
          return i + 1;
        }
      }
      return treesToRight.length;
    }
    return 0;
  }

  getScenicScoreUp(row: number, col: number): number {
    const currentValue = this.df.iloc({ rows: [row], columns: [col] })
      .values[0];
    const treesAbove = this.df
      .iloc({ rows: [`:${row}`], columns: [col] })
      .transpose().values[0];
    if (typeof treesAbove === 'object') {
      treesAbove.reverse();
      for (let i = 0; i < treesAbove.length; i++) {
        if (treesAbove[i] >= currentValue) {
          return i + 1;
        }
      }
      return treesAbove.length;
    }
    return 0;
  }

  getScenicScoreDown(row: number, col: number): number {
    const currentValue = this.df.iloc({ rows: [row], columns: [col] })
      .values[0];
    const treesBelow = this.df
      .iloc({ rows: [`${row + 1}:`], columns: [col] })
      .transpose().values[0];
    if (typeof treesBelow === 'object') {
      for (let i = 0; i < treesBelow.length; i++) {
        if (treesBelow[i] >= currentValue) {
          return i + 1;
        }
      }
      return treesBelow.length;
    }
    return 0;
  }

  getNumberOfVisibleTrees(): number {
    let visibleTrees = 0;
    for (let row = 0; row < this.noRows; row++) {
      for (let col = 0; col < this.noCols; col++) {
        if (this.isTreeVisible(row, col)) {
          visibleTrees++;
        }
      }
    }
    return visibleTrees;
  }

  isTreeVisible(row: number, col: number): boolean {
    // Check outer ring
    return (
      row === 0 ||
      col === 0 ||
      row === this.noRows - 1 ||
      col === this.noCols - 1 ||
      this.isVisibleLeft(row, col) ||
      this.isVisibleRight(row, col) ||
      this.isVisibleUp(row, col) ||
      this.isVisibleDown(row, col)
    );
  }

  isVisibleLeft(row: number, col: number): boolean {
    // Get trees to the left
    const treesToLeft = this.df.iloc({ rows: [row], columns: [`:${col}`] });
    const maxTreeToLeft = treesToLeft.max().values[0];
    return (
      maxTreeToLeft < this.df.iloc({ rows: [row], columns: [col] }).values[0]
    );
  }

  isVisibleRight(row: number, col: number): boolean {
    // Get trees to the right
    const treesToRight = this.df.iloc({
      rows: [row],
      columns: [`${col + 1}:`],
    });
    const maxTreeToRight = treesToRight.max().values[0];
    return (
      maxTreeToRight < this.df.iloc({ rows: [row], columns: [col] }).values[0]
    );
  }

  isVisibleUp(row: number, col: number): boolean {
    // Get trees above
    const treesAbove = this.df
      .iloc({ rows: [`:${row}`], columns: [col] })
      .transpose();
    const maxTreeAbove = treesAbove.max().values[0];
    return (
      maxTreeAbove < this.df.iloc({ rows: [row], columns: [col] }).values[0]
    );
  }

  isVisibleDown(row: number, col: number): boolean {
    // Get trees below
    const treesBelow = this.df
      .iloc({ rows: [`${row + 1}:`], columns: [col] })
      .transpose();
    const maxTreeBelow = treesBelow.max().values[0];
    return (
      maxTreeBelow < this.df.iloc({ rows: [row], columns: [col] }).values[0]
    );
  }
}
