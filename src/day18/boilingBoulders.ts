interface Cube {
  x: number;
  y: number;
  z: number;
}

interface Boundary {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
}

function getCubeNeighbors(cube: Cube): Cube[] {
  const { x, y, z } = cube;
  return [
    { x: x - 1, y: y, z },
    { x: x + 1, y: y, z },
    { x: x, y: y - 1, z },
    { x: x, y: y + 1, z },
    { x: x, y: y, z: z - 1 },
    { x: x, y: y, z: z + 1 },
  ];
}

export class BoilingBoulders {
  private readonly cubes: Map<string, Cube>;
  private readonly surroundedCache = new Map<string, boolean>();
  private readonly boundary: Boundary;

  constructor(cubes: Map<string, Cube>) {
    this.cubes = cubes;
    const cubesArray = Array.from(cubes.values());
    this.boundary = {
      minX: cubesArray.map((cube) => cube.x).reduce((a, b) => Math.min(a, b)),
      maxX: cubesArray.map((cube) => cube.x).reduce((a, b) => Math.max(a, b)),
      minY: cubesArray.map((cube) => cube.y).reduce((a, b) => Math.min(a, b)),
      maxY: cubesArray.map((cube) => cube.y).reduce((a, b) => Math.max(a, b)),
      minZ: cubesArray.map((cube) => cube.z).reduce((a, b) => Math.min(a, b)),
      maxZ: cubesArray.map((cube) => cube.z).reduce((a, b) => Math.max(a, b)),
    };
  }

  static fromString(input: string): BoilingBoulders {
    const cubes = new Map<string, Cube>();
    input
      .trim()
      .split('\n')
      .map((line) => {
        const [x, y, z] = line.split(',').map((n) => parseInt(n, 10));
        return { x, y, z };
      })
      .forEach((cube) => {
        cubes.set(JSON.stringify(cube), cube);
      });
    return new BoilingBoulders(cubes);
  }

  computeSurfaceArea(): number {
    let surfaceArea = 0;
    for (const cube of this.cubes.values()) {
      const neighbors = getCubeNeighbors(cube);
      let sidesForCube = 6;
      for (const neighbor of neighbors) {
        const neighborKey = JSON.stringify(neighbor);
        if (this.cubes.has(neighborKey)) {
          sidesForCube--;
        }
      }
      surfaceArea += sidesForCube;
    }
    return surfaceArea;
  }

  computeSurfaceAreaWithoutAirPockets(): number {
    let surfaceArea = 0;
    for (const cube of this.cubes.values()) {
      const neighbors = getCubeNeighbors(cube);
      let sidesForCube = 6;
      for (const neighbor of neighbors) {
        const neighborKey = JSON.stringify(neighbor);
        if (this.cubes.has(neighborKey) || this.isSurrounded(neighbor)) {
          sidesForCube--;
        }
      }
      surfaceArea += sidesForCube;
    }
    return surfaceArea;
  }

  returnAndCache(result: boolean, found: Set<string>): boolean {
    for (const key of found) {
      this.surroundedCache.set(key, result);
    }
    return result;
  }

  isSurrounded(cube: Cube): boolean | undefined {
    const cubeKey = JSON.stringify(cube);
    if (this.surroundedCache.has(cubeKey)) {
      return this.surroundedCache.get(cubeKey);
    }
    const found = new Set<string>();
    found.add(cubeKey);
    const queue = [cube];

    while (queue.length > 0) {
      const current = queue.shift();
      if (current) {
        const neighbors = getCubeNeighbors(current);
        for (const neighbor of neighbors) {
          const neighborKey = JSON.stringify(neighbor);
          // check cache
          if (this.surroundedCache.has(neighborKey)) {
            const neighborIsSurrounded = this.surroundedCache.get(neighborKey);
            if (neighborIsSurrounded) {
              return this.returnAndCache(neighborIsSurrounded, found);
            }
          }
          // check boundary
          if (this.isOnOrOutsideBoundary(neighbor)) {
            return this.returnAndCache(false, found);
          }
          // check found and cubes
          if (found.has(neighborKey) || this.cubes.has(neighborKey)) {
            continue;
          }
          queue.push(neighbor);
          found.add(neighborKey);
        }
      }
    }
    return this.returnAndCache(true, found);
  }

  isOnOrOutsideBoundary(cube: Cube): boolean {
    const { x, y, z } = cube;
    const { minX, maxX, minY, maxY, minZ, maxZ } = this.boundary;
    return x < minX || x > maxX || y < minY || y > maxY || z < minZ || z > maxZ;
  }
}
