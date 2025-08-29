export enum NodeType {
  EMPTY = 0,
  CORNER = 1,
  STRAIGHT = 2,
  START = 3,
  END = 4,
}

export interface NodePieceData {
  type: NodeType;
  rotation: 0 | 90 | 180 | 270;
}

export interface Level {
  id: string;
  name: string;
  briefing: string;
  rewardDFrags: number;
  decryptionMatrix: {
    size: number;
    numberRange: number[];
    targets: {
      rows: number[];
      cols: number[];
    };
  };
  flowNode: {
    size: number;
    layout: NodePieceData[][];
  };
  unlocks: string;
}

export const levels: Level[] = [
  {
    id: 'node-alpha-01',
    name: 'Training Simulation',
    briefing: 'Selamat datang, Operative...',
    rewardDFrags: 50,
    decryptionMatrix: {
      size: 2,
      numberRange: [1, 2, 3, 4],
      targets: { rows: [3, 7], cols: [6, 4] },
    },
    // --- 📐 DESAIN LEVEL BARU YANG BISA DISELESAIKAN 📐 ---
    flowNode: {
      size: 3,
      layout: [
        // Baris 1
        [
          { type: NodeType.START, rotation: 90 },
          { type: NodeType.CORNER, rotation: 180 }, // Bisa diputar
          { type: NodeType.STRAIGHT, rotation: 0 },
        ],
        // Baris 2
        [
          { type: NodeType.STRAIGHT, rotation: 90 },
          { type: NodeType.CORNER, rotation: 270 }, // Bisa diputar
          { type: NodeType.STRAIGHT, rotation: 90 },
        ],
        // Baris 3
        [
          { type: NodeType.CORNER, rotation: 0 },   // Bisa diputar
          { type: NodeType.STRAIGHT, rotation: 0 },
          { type: NodeType.END, rotation: 180 },
        ],
      ],
    },
    unlocks: 'node-beta-01',
  },
];