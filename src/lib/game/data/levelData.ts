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
  sequenceBreaker: {
    buttonCount: number; 
    sequenceLength: number; 
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
    sequenceBreaker: {
      buttonCount: 4,
      sequenceLength: 4,
    },
    unlocks: 'node-beta-01',
  },
];