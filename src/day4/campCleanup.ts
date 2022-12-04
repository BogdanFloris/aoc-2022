interface IInterval {
  start: number;
  end: number;

  isContainedBy(interval: Interval): boolean;

  isOverlapping(interval: Interval): boolean;
}

class Interval implements IInterval {
  constructor(public start: number, public end: number) {
    this.start = start;
    this.end = end;
  }

  isContainedBy(interval: Interval): boolean {
    return this.start >= interval.start && this.end <= interval.end;
  }

  isOverlapping(interval: Interval): boolean {
    return this.start <= interval.end && this.end >= interval.start;
  }
}

export function getNumberOfIntervalsFullyContained(input: string): number {
  return input
    .trim()
    .split('\n')
    .filter((line) => {
      const [leftInterval, rightInterval] = line.split(',');
      const [leftStart, leftEnd] = leftInterval.split('-');
      const [rightStart, rightEnd] = rightInterval.split('-');
      const left = new Interval(parseInt(leftStart), parseInt(leftEnd));
      const right = new Interval(parseInt(rightStart), parseInt(rightEnd));
      return left.isContainedBy(right) || right.isContainedBy(left);
    }).length;
}

export function getNumberOfIntervalsOverlapping(input: string): number {
  return input
    .trim()
    .split('\n')
    .filter((line) => {
      const [leftInterval, rightInterval] = line.split(',');
      const [leftStart, leftEnd] = leftInterval.split('-');
      const [rightStart, rightEnd] = rightInterval.split('-');
      const left = new Interval(parseInt(leftStart), parseInt(leftEnd));
      const right = new Interval(parseInt(rightStart), parseInt(rightEnd));
      return left.isOverlapping(right) || right.isOverlapping(left);
    }).length;
}
