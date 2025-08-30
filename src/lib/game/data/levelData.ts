export interface DialogueLine {
  speaker: 'Oracle' | 'Chimera' | 'System';
  text: string;
}

export interface Level {
  id: string;
  name: string;
   dialogue: {
    briefing: DialogueLine[];
    mid_briefing: DialogueLine[];
    debriefing: DialogueLine[];
  };
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
    dialogue: {
      briefing: [
        { speaker: 'Oracle', text: 'Selamat datang, Operative. Sistem ini adalah simulasi dari pertahanan dasar Chimera.' },
        { speaker: 'Oracle', text: 'Tugas pertamamu adalah menembus firewall enkripsinya. Perhatikan target angka di setiap baris dan kolom.' },
        { speaker: 'System', text: 'Initializing Decryption Matrix...' },
      ],
      mid_briefing: [
        { speaker: 'Oracle', text: 'Kerja bagus. Enkripsi terbuka. Sekarang bagian yang lebih sulit.' },
        { speaker: 'Oracle', text: 'Chimera melindungi nodenya dengan pola sinyal acak. Kau harus meniru pola tersebut tanpa kesalahan untuk mengambil alih kendali.' },
        { speaker: 'System', text: 'Initializing Sequence Breaker...' },
      ],
      debriefing: [
        { speaker: 'System', text: 'NODE SECURED. SIMULATION COMPLETE.' },
        { speaker: 'Oracle', text: 'Hasil yang luar biasa, Operative. Kau siap untuk misi yang sesungguhnya. Data Fragments telah ditransfer ke akunmu.' },
      ],
    },
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