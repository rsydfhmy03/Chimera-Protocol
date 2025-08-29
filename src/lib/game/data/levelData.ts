export enum NodeType {
  EMPTY = 0,
  CORNER = 1, // siku
  STRAIGHT = 2, // lurus
  START = 3,
  END = 4,
}

export interface NodePieceData {
  type: NodeType;
  rotation: 0 | 90 | 180 | 270; // Derajat rotasi
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
    briefing: 'Selamat datang, Operative. Ini adalah tes pertamamu untuk menembus firewall simulasi kami. Selesaikan dua fase untuk membuktikan kemampuanmu.',
    rewardDFrags: 50,
    decryptionMatrix: {
      size: 2,
      numberRange: [1, 2, 3, 4],
      targets: { rows: [3, 7], cols: [6, 4] },
    },
    flowNode: {
      size: 3,
      layout: [
        [
          { type: NodeType.START, rotation: 90 },
          { type: NodeType.STRAIGHT, rotation: 90 },
          { type: NodeType.EMPTY, rotation: 0 },
        ],
        [
          { type: NodeType.CORNER, rotation: 180 },
          { type: NodeType.CORNER, rotation: 0 },
          { type: NodeType.STRAIGHT, rotation: 0 },
        ],
        [
          { type: NodeType.EMPTY, rotation: 0 },
          { type: NodeType.STRAIGHT, rotation: 90 },
          { type: NodeType.END, rotation: 270 },
        ],
      ],
    },
    unlocks: 'node-beta-01',
  },
];