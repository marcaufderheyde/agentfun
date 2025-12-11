export class SeededRandom {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    // Simple Linear Congruential Generator
    next(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    nextRange(min: number, max: number): number {
        return min + this.next() * (max - min);
    }
}

// Helper to get a determinstic seed from chunk coordinates
export function getChunkSeed(x: number, z: number): number {
    // Cantor pairing function or similar hash
    return Math.abs(Math.sin(x * 12.9898 + z * 78.233) * 43758.5453) * 10000;
}
