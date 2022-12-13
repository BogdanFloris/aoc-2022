import { DistressSignal, DividerPackets } from './distressSignal';

const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`;

describe('distressSignal', () => {
  it('getNumberOfPairsInCorrectOrder should return 13 for example input', () => {
    const distressSignal = DistressSignal.fromString(input);
    expect(distressSignal.getSumOfIndicesOfPairsInRightOrder()).toBe(13);
  });
});

describe('packetDivider', () => {
  it('getDividerPacketsIndicesProductAfterSorting should return 140 for example input', () => {
    const packetDivider = DividerPackets.fromString(input);
    expect(packetDivider.getDividerPacketsIndicesProductAfterSorting()).toBe(
      140,
    );
  });
});
