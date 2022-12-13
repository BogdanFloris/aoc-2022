type Packet = Array<Array<number> | number> | number;

interface Pair {
  left: Packet;
  right: Packet;
}

function isRightOrder(left: Packet, right: Packet): boolean | undefined {
  // both left and right are numbers
  if (typeof left === 'number' && typeof right === 'number') {
    return left < right ? true : left > right ? false : undefined;
  }
  // both left and right are arrays
  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length && i < right.length; i++) {
      const result = isRightOrder(left[i], right[i]);
      if (result !== undefined) {
        return result;
      }
    }
    if (left.length < right.length) {
      return true;
    }
    if (left.length > right.length) {
      return false;
    }
    return undefined;
  }
  // left is an array, right is a number
  if (Array.isArray(left) && typeof right === 'number') {
    return isRightOrder(left, [right]);
  }
  // left is a number, right is an array
  if (typeof left === 'number' && Array.isArray(right)) {
    return isRightOrder([left], right);
  }
  return false;
}

export class DistressSignal {
  pairs: Array<Pair>;

  constructor(pairs: Array<Pair>) {
    this.pairs = pairs;
  }

  static fromString(input: string): DistressSignal {
    const pairs = input
      .trim()
      .split('\n\n')
      .map((pair) => {
        const [left, right] = pair.split('\n');
        return {
          left: JSON.parse(left),
          right: JSON.parse(right),
        };
      });
    return new DistressSignal(pairs);
  }

  getSumOfIndicesOfPairsInRightOrder(): number {
    let sum = 0;
    for (let i = 0; i < this.pairs.length; i++) {
      if (isRightOrder(this.pairs[i].left, this.pairs[i].right)) {
        sum += i + 1;
      }
    }
    return sum;
  }
}

export class DividerPackets {
  packets: Array<Packet>;
  dividerPacketOne: string;
  dividerPacketTwo: string;

  constructor(
    packets: Array<Packet>,
    dividerPacketOne: string,
    dividerPacketTwo: string,
  ) {
    this.packets = packets;
    this.dividerPacketOne = dividerPacketOne;
    this.dividerPacketTwo = dividerPacketTwo;
  }

  static fromString(input: string): DividerPackets {
    const dividerPacketOne = '[[2]]';
    const dividerPacketTwo = '[[6]]';
    const packets = input
      .trim()
      .split('\n')
      .filter((line) => line !== '')
      .map((packet) => JSON.parse(packet));
    packets.push(JSON.parse(dividerPacketOne));
    packets.push(JSON.parse(dividerPacketTwo));
    return new DividerPackets(packets, dividerPacketOne, dividerPacketTwo);
  }

  getDividerPacketsIndicesProductAfterSorting(): number {
    const sortedPacketsStrings = this.packets
      .sort((a, b) => {
        const result = isRightOrder(a, b);
        if (result === undefined) {
          return 0;
        }
        return result ? -1 : 1;
      })
      .map((packet) => JSON.stringify(packet));
    const dividerPacketOneIndex =
      sortedPacketsStrings.indexOf(this.dividerPacketOne) + 1;
    const dividerPacketTwoIndex =
      sortedPacketsStrings.indexOf(this.dividerPacketTwo) + 1;
    return dividerPacketOneIndex * dividerPacketTwoIndex;
  }
}
