import { permutations } from 'itertools';

interface Destination {
  name: string;
  weight: number;
}

interface Valve {
  name: string;
  flow: number;
  destinations: Destination[];
}

export class Tunnels {
  valves: Map<string, Valve>;
  shortestPathGraph: Map<string, Map<string, number>>;
  timeLimit: number;

  constructor(valves: Map<string, Valve>, timeLimit: number) {
    this.valves = valves;
    this.timeLimit = timeLimit;
    this.shortestPathGraph = new Map<string, Map<string, number>>();
  }

  static fromInput(input: string, timeLimit: number): Tunnels {
    const valves = new Map<string, Valve>();
    for (const line of input.trim().split('\n')) {
      const words = line.split(' ');
      const name = words[1];
      const flow = parseInt(words[4].split('=')[1]);
      const destinations = words.splice(9).map((name) => {
        return { name: name.split(',')[0], weight: 1 };
      });
      valves.set(name, { name, flow, destinations });
    }
    return new Tunnels(valves, timeLimit);
  }

  /*
   * Constructs the shortest path graph with only non-zero flow valves
   * with weights being the shortest paths between each valve.
   */
  constructShortestPathGraph(): void {
    for (const [name, _] of this.valves) {
      const shortestPaths = this.getShortestPaths(name);
      this.shortestPathGraph.set(name, shortestPaths);
    }
  }

  getShortestPaths(source: string): Map<string, number> {
    const visited = new Set<string>();
    const shortestPaths = new Map<string, number>();
    const queue: Array<[string, number]> = [];
    queue.push([source, 0]);
    while (queue.length > 0) {
      const popped = queue.shift();
      if (popped === undefined) {
        throw new Error('Invalid queue');
      }
      const [currentValve, distance] = popped;
      if (visited.has(currentValve)) {
        continue;
      }
      visited.add(currentValve);
      if (currentValve !== source) {
        shortestPaths.set(currentValve, distance);
      }
      const valve = this.valves.get(currentValve);
      if (valve) {
        for (const destination of valve.destinations) {
          queue.push([destination.name, distance + destination.weight]);
        }
      }
    }
    return shortestPaths;
  }

  computeMostPressure(): number {
    this.constructShortestPathGraph();
    const remainingValves = new Set<string>(
      Array.from(this.valves)
        .filter(([, valve]) => valve.flow > 0)
        .map(([name]) => name),
    );
    return this.dfs('AA', remainingValves, 0, 0, 0);
  }

  computeMostPressureWithHelp(): number {
    this.constructShortestPathGraph();
    const remainingValves = new Set<string>(
      Array.from(this.valves)
        .filter(([, valve]) => valve.flow > 0)
        .map(([name]) => name),
    );
    let maxPressure = 0;
    for (let i = 1; i < Math.floor(remainingValves.size / 2); i++) {
      for (const combination of permutations(remainingValves, i)) {
        const oppositeRemainingValves = this.getOppositeRemainingValves(
          remainingValves,
          combination,
        );
        const pressureOne = this.dfs('AA', new Set(combination), 0, 0, 0);
        const pressureTwo = this.dfs('AA', oppositeRemainingValves, 0, 0, 0);
        if (pressureOne + pressureTwo > maxPressure) {
          maxPressure = pressureOne + pressureTwo;
        }
      }
    }
    return maxPressure;
  }

  getOppositeRemainingValves(
    remainingValves: Set<string>,
    combination: Array<string>,
  ): Set<string> {
    const oppositeRemainingValves = new Set(remainingValves);
    for (const valve of combination) {
      oppositeRemainingValves.delete(valve);
    }
    return oppositeRemainingValves;
  }

  dfs(
    current: string,
    remainingValves: Set<string>,
    time: number,
    currentPressure: number,
    currentFlow: number,
  ): number {
    // score if no other valves are opened until the time runs out
    const score = currentPressure + currentFlow * (this.timeLimit - time);
    let maxScore = score;
    const shortestPaths = this.shortestPathGraph.get(current);
    if (!shortestPaths) {
      throw new Error('Invalid shortest path graph');
    }
    // go through remaining valves
    for (const valve of remainingValves) {
      // get distance from current to valve and time to open valve
      const distance = shortestPaths.get(valve);
      if (!distance) {
        throw new Error('Invalid shortest path');
      }
      const distancePlusTimeToOpen = distance + 1;
      if (time + distancePlusTimeToOpen < this.timeLimit) {
        const newRemainingValves = new Set(remainingValves);
        newRemainingValves.delete(valve);
        const newTime = time + distancePlusTimeToOpen;
        const newCurrentPressure =
          currentPressure + currentFlow * distancePlusTimeToOpen;
        const valveFlow = this.valves.get(valve)?.flow;
        if (!valveFlow) {
          throw new Error('Invalid valve');
        }
        const newCurrentFlow = valveFlow + currentFlow;
        const newScore = this.dfs(
          valve,
          newRemainingValves,
          newTime,
          newCurrentPressure,
          newCurrentFlow,
        );
        if (newScore > maxScore) {
          maxScore = newScore;
        }
      }
    }
    return maxScore;
  }
}
