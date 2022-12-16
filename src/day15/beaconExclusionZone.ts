interface Point {
  x: number;
  y: number;
}

function getManhattanDistance(a: Point, b: Point) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

type Sensor = Point;
type Beacon = Point;

interface Pair {
  sensor: Sensor;
  beacon: Beacon;
}

export class BeaconExclusionZone {
  pairs: Pair[];
  y: number;
  max: number;

  constructor(pairs: Pair[], y: number, max: number) {
    this.pairs = pairs;
    this.y = y;
    this.max = max;
  }

  static fromString(input: string, y: number, max: number) {
    // Split the input into lines and get all numbers in each line
    const pairs = input
      .trim()
      .split('\n')
      .map((line) => {
        const matches = line.match(/\d+/g);
        if (!matches) {
          throw new Error('Could not parse input');
        }
        const xSensor = parseInt(matches[0], 10);
        const ySensor = parseInt(matches[1], 10);
        const xBeacon = parseInt(matches[2], 10);
        const yBeacon = parseInt(matches[3], 10);
        return {
          sensor: { x: xSensor, y: ySensor },
          beacon: { x: xBeacon, y: yBeacon },
        };
      });
    return new BeaconExclusionZone(pairs, y, max);
  }

  getExcludedPointsOnTargetY() {
    const targetRow: Map<number, number> = new Map();
    for (const { sensor, beacon } of this.pairs) {
      // If the sensor is on the target row, we can ignore it
      if (beacon.y === this.y) {
        targetRow.set(beacon.x, 0);
      }
      const distance = getManhattanDistance(sensor, beacon);
      const dx = distance - Math.abs(sensor.y - this.y);
      for (let x2 = sensor.x - dx; x2 <= sensor.x + dx; x2++) {
        if (targetRow.get(x2) !== 0) {
          targetRow.set(x2, 1);
        }
      }
    }
    return Array.from(targetRow.values()).reduce((acc, n) => acc + n);
  }

  findTuningFrequency() {
    const min = { x: 0, y: 0 };
    const max = { x: this.max, y: this.max };
    const distressBeacon = this.findDistressBeacon(min, max);
    console.log(`Distress beacon: ${JSON.stringify(distressBeacon)}`);
    return distressBeacon.x * 4000000 + distressBeacon.y;
  }

  findDistressBeacon(min: Point, max: Point) {
    if (min.x === max.x && min.y === max.y) {
      return min;
    }
    const mid = {
      x: Math.floor((min.x + max.x) / 2),
      y: Math.floor((min.y + max.y) / 2),
    };
    // define the diagonal corners of the 4 quadrants
    const quadrants = [
      [min, mid],
      [
        { x: mid.x + 1, y: min.y },
        { x: max.x, y: mid.y },
      ],
      [
        { x: min.x, y: mid.y + 1 },
        { x: mid.x, y: max.y },
      ],
      [{ x: mid.x + 1, y: mid.y + 1 }, max],
    ];
    for (const quadrant of quadrants) {
      const [pointOne, pointTwo] = quadrant;
      if (pointOne.x > pointTwo.x || pointOne.y > pointTwo.y) {
        continue;
      }
      let allPairsCanContain = true;
      for (const pair of this.pairs) {
        if (
          !BeaconExclusionZone.canContainUnseenPoints(pair, pointOne, pointTwo)
        ) {
          allPairsCanContain = false;
          break;
        }
      }
      if (allPairsCanContain) {
        const beacon: Point = this.findDistressBeacon(pointOne, pointTwo);
        if (beacon.x !== -1 || beacon.y !== -1) {
          return beacon;
        }
      }
    }
    return { x: -1, y: -1 };
  }

  static canContainUnseenPoints(pair: Pair, min: Point, max: Point) {
    const sensorBeaconDistance = getManhattanDistance(pair.sensor, pair.beacon);
    const corners = [
      { x: min.x, y: min.y },
      { x: min.x, y: max.y },
      { x: max.x, y: min.y },
      { x: max.x, y: max.y },
    ];
    for (const corner of corners) {
      const distance = getManhattanDistance(pair.sensor, corner);
      if (distance > sensorBeaconDistance) {
        return true;
      }
    }
    return false;
  }
}
