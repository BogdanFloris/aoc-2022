type RobotRecipe = Record<string, number>;
const Cost = ['ore', 'clay', 'obsidian'];

class Blueprint {
  oreRobotRecipe: RobotRecipe;
  clayRobotRecipe: RobotRecipe;
  obsidianRobotRecipe: RobotRecipe;
  geodeRobotRecipe: RobotRecipe;

  constructor(
    oreRobotRecipe: RobotRecipe,
    clayRobotRecipe: RobotRecipe,
    obsidianRobotRecipe: RobotRecipe,
    geodeRobotRecipe: RobotRecipe,
  ) {
    this.oreRobotRecipe = oreRobotRecipe;
    this.clayRobotRecipe = clayRobotRecipe;
    this.obsidianRobotRecipe = obsidianRobotRecipe;
    this.geodeRobotRecipe = geodeRobotRecipe;
  }

  static fromString(blueprintString: string): Blueprint {
    const words = blueprintString.split(' ');
    const oreRobotRecipe = {
      ore: parseInt(words[6], 10),
      clay: 0,
      obsidian: 0,
    };
    const clayRobotRecipe = {
      ore: parseInt(words[12], 10),
      clay: 0,
      obsidian: 0,
    };
    const obsidianRobotRecipe = {
      ore: parseInt(words[18], 10),
      clay: parseInt(words[21], 10),
      obsidian: 0,
    };
    const geodeRobotRecipe = {
      ore: parseInt(words[27], 10),
      clay: 0,
      obsidian: parseInt(words[30], 10),
    };
    return new Blueprint(
      oreRobotRecipe,
      clayRobotRecipe,
      obsidianRobotRecipe,
      geodeRobotRecipe,
    );
  }
}

interface Resources {
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
}

enum Type {
  Ore = 'ore',
  Clay = 'clay',
  Obsidian = 'obsidian',
  Geode = 'geode',
}

interface Mineral {
  currentNo: number;
  robotsToMine: number;
  robotRecipe: RobotRecipe;
  maxToMine: number;
}

class State {
  blueprint: Blueprint;
  resources: Map<Type, Mineral>;
  time: number;

  constructor(
    blueprint: Blueprint,
    resources: Map<Type, Mineral>,
    time: number,
  ) {
    this.blueprint = blueprint;
    this.resources = resources;
    this.time = time;
  }

  public static initialState(
    blueprint: Blueprint,
    maxResources: Resources,
  ): State {
    const resources = new Map<Type, Mineral>();
    resources.set(Type.Ore, {
      currentNo: 0,
      robotsToMine: 1,
      robotRecipe: blueprint.oreRobotRecipe,
      maxToMine: maxResources.ore,
    });
    resources.set(Type.Clay, {
      currentNo: 0,
      robotsToMine: 0,
      robotRecipe: blueprint.clayRobotRecipe,
      maxToMine: maxResources.clay,
    });
    resources.set(Type.Obsidian, {
      currentNo: 0,
      robotsToMine: 0,
      robotRecipe: blueprint.obsidianRobotRecipe,
      maxToMine: maxResources.obsidian,
    });
    resources.set(Type.Geode, {
      currentNo: 0,
      robotsToMine: 0,
      robotRecipe: blueprint.geodeRobotRecipe,
      maxToMine: maxResources.geode,
    });
    return new State(blueprint, resources, 0);
  }
}

function computeMaxGeodesForState(
  blueprint: Blueprint,
  state: State,
  maxTime: number,
  result: Result,
) {
  let canMakeRobots = false;
  for (const [typeOne, mineral] of state.resources.entries()) {
    // If we have maxResources of a type, we can't make any more robots
    if (mineral.currentNo === mineral.maxToMine) {
      continue;
    }
    const recipe = mineral.robotRecipe;
    const waitTimes = Cost.map((oreCost) => {
      // Get the cost
      const cost = recipe[oreCost];
      if (cost === 0) {
        return undefined;
      }
      // Get the ore we have
      const ore = state.resources.get(oreCost as Type)?.currentNo || 0;
      if (cost <= ore) {
        return 0;
      }
      // Get the robots we have
      const robots = state.resources.get(oreCost as Type)?.robotsToMine || 0;
      if (robots === 0) {
        return maxTime + 1;
      }
      return Math.floor((cost - ore + robots - 1) / robots);
    }).filter((x) => x !== undefined) as number[];
    // get the max wait time
    const waitTime = Math.max(...waitTimes);
    const timeFinished = state.time + waitTime + 1;
    if (timeFinished >= maxTime) {
      continue;
    }
    // get the new resources
    const newResources = new Map<Type, Mineral>();
    for (const [typeTwo, mineral] of state.resources.entries()) {
      const newMineral = { ...mineral };
      newMineral.currentNo +=
        mineral.robotsToMine * (waitTime + 1) - recipe[typeTwo];
      if (typeOne === typeTwo) {
        newMineral.robotsToMine += 1;
      }
      newResources.set(typeTwo, newMineral);
    }
    const remainingTime = maxTime - timeFinished;
    if (
      Math.floor((remainingTime * (remainingTime - 1)) / 2) +
        newResources.get(Type.Geode)!.currentNo +
        remainingTime * newResources.get(Type.Geode)!.robotsToMine <
      result.maxGeodes
    ) {
      continue;
    }
    canMakeRobots = true;
    const newState = new State(blueprint, newResources, timeFinished);
    computeMaxGeodesForState(blueprint, newState, maxTime, result);
  }
  if (!canMakeRobots) {
    // We can't make new robots so this is the best this branch can do
    const geodesResources = state.resources.get(Type.Geode);
    if (geodesResources) {
      result.maxGeodes = Math.max(
        result.maxGeodes,
        geodesResources.currentNo +
          geodesResources.robotsToMine * (maxTime - state.time),
      );
    }
  }
}

interface Result {
  maxGeodes: number;
}

function computeMaxGeodes(blueprint: Blueprint, maxTime: number): number {
  const maxOre = Math.max(
    ...Array.from(Object.values(blueprint)).map((r) => r.ore),
  );
  const maxClay = Math.max(
    ...Array.from(Object.values(blueprint)).map((r) => r.clay),
  );
  const maxObsidian = Math.max(
    ...Array.from(Object.values(blueprint)).map((r) => r.obsidian),
  );
  const maxResources = {
    ore: maxOre,
    clay: maxClay,
    obsidian: maxObsidian,
    geode: 0,
  };
  const initialState = State.initialState(blueprint, maxResources);
  const result = { maxGeodes: 0 };
  computeMaxGeodesForState(blueprint, initialState, maxTime, result);
  return result.maxGeodes;
}

export function getQualityLevel(input: string): number {
  const blueprints = input.trim().split('\n').map(Blueprint.fromString);
  return blueprints
    .map((blueprint, i) => (i + 1) * computeMaxGeodes(blueprint, 24))
    .reduce((a, b) => a + b, 0);
}
