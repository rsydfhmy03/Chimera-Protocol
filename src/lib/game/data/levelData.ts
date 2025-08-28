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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layout: any[]; 
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
      // Solusi: [2, 1], [4, 3]
    },
    flowNode: {
      size: 3,
      layout: [], 
    },
    unlocks: 'node-beta-01',
  },
  // ... level lainnya
];