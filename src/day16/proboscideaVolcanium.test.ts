import { Tunnels } from './proboscideaVolcanium';

describe('proboscideaVolcanium', () => {
  const input = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II
`;

  it('computeMostPressure should return 1651 for example input for timeLimit 30', () => {
    const tunnels = Tunnels.fromInput(input, 30);
    expect(tunnels.computeMostPressure()).toBe(1651);
  });

  it('computeMostPressureWithHelp should return 1704 for example input for timeLimit 26', () => {
    const tunnels = Tunnels.fromInput(input, 26);
    expect(tunnels.computeMostPressureWithHelp()).toBe(1704);
  });
});
