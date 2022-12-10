const CYCLES = [20, 60, 100, 140, 180, 220];
const MOD = 40;
const CRT_ROWS = 6;
const CRT_COLS = 40;

enum InstructionEnum {
  noop = 'noop',
  addx = 'addx',
}

interface Instruction {
  type: InstructionEnum;
  value?: number;
}

interface ICathodeRayTube {
  register: number;
  cycleNo: number;
  instructions: Instruction[];
  signalStrengths: number[];
  crt: string[][];
}

export class CathodeRayTube implements ICathodeRayTube {
  register = 1;
  cycleNo = 0;
  instructions: Instruction[];
  signalStrengths: number[];
  crt: string[][];

  constructor(instructions: Instruction[]) {
    this.instructions = instructions;
    this.signalStrengths = [];
    this.crt = Array.from({ length: CRT_ROWS }, () =>
      Array(CRT_COLS).fill('.'),
    );
  }

  static fromInput(input: string): CathodeRayTube {
    const instructions: Instruction[] = [];
    const lines = input.trim().split('\n');
    for (const line of lines) {
      const [type, value] = line.split(' ');
      const instructionType =
        InstructionEnum[type as keyof typeof InstructionEnum];
      switch (instructionType) {
        case InstructionEnum.noop:
          instructions.push({ type: instructionType });
          break;
        case InstructionEnum.addx:
          // Put a noop here to account for addx taking 2 cycles
          instructions.push({ type: InstructionEnum.noop });
          instructions.push({ type: instructionType, value: Number(value) });
          break;
        default:
          throw new Error(`Unknown instruction type ${instructionType}`);
      }
    }
    return new CathodeRayTube(instructions);
  }

  findSignalStrengthAtCycles(): number {
    return this.signalStrengths.reduce((sum, curr) => sum + curr, 0);
  }

  executeInstructions(): void {
    this.instructions.forEach((instruction) => {
      // Increment cycle
      this.cycleNo++;

      // Add signal strength
      if (CYCLES.includes(this.cycleNo)) {
        this.signalStrengths.push(this.register * this.cycleNo);
      }

      // Draw to CRT
      const cycleMod = (this.cycleNo % MOD) - 1;
      const sprite = [this.register - 1, this.register, this.register + 1];
      if (sprite.includes(cycleMod)) {
        this.crt[Math.floor(this.cycleNo / MOD)][cycleMod] = '#';
      }

      // Execute instruction
      switch (instruction.type) {
        case InstructionEnum.noop:
          break;
        case InstructionEnum.addx:
          if (instruction.value) {
            this.register += instruction.value;
          }
          break;
        default:
          throw new Error(`Unknown instruction type ${instruction.type}`);
      }
    });
  }

  toString(): string {
    return this.crt.map((row) => row.join('')).join('\n');
  }
}
