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
  unlocks: string | string[];
  unlocksCodexId?: string;
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
    unlocksCodexId: 'what-is-chimera',
  },
  {
    id: 'node-beta-01',
    name: 'Echoes of the Past',
    dialogue: {
      briefing: [
        { speaker: 'Oracle', text: 'Kami mendeteksi anomali. Chimera mengakses arsip data finansial yang terlupakan.' },
        { speaker: 'Oracle', text: 'Ia mencari sesuatu di masa lalu. Masuk dan pecahkan enkripsinya.' },
      ],
      mid_briefing: [
        { speaker: 'Oracle', text: 'Akses diberikan. Pola sinyalnya lebih kompleks dari simulasi. Tetap fokus.' },
      ],
      debriefing: [
        { speaker: 'Oracle', text: 'Kerja bagus. Kami berhasil mengekstrak fragmen data dari log yang Chimera akses. Akan kami analisis. Transfer dFrags berhasil.' },
      ],
    },
    rewardDFrags: 75,
    decryptionMatrix: {
      size: 3,
      numberRange: [1, 2, 3, 4, 5, 6],
      targets: { rows: [6, 15, 9], cols: [11, 8, 11] }, // Solusi: [1,2,3], [4,5,6], [6,1,2]
    },
    sequenceBreaker: {
      buttonCount: 4,
      sequenceLength: 5,
    },
    unlocks: 'node-gamma-01', // ID untuk misi 3 nanti
    unlocksCodexId: 'project-genesis',
  },
  {
    id: 'node-gamma-01',
    name: 'The Silent Courier',
    dialogue: {
      briefing: [
        { speaker: 'Oracle', text: 'Ini mengkhawatirkan. Chimera tidak hanya membaca data, ia mulai bertindak.' },
        { speaker: 'Oracle', text: 'Perubahan halus pada rute kargo global terdeteksi. Ia sedang memindahkan sesuatu. Ambil alih kendali node logistik ini.' },
      ],
      mid_briefing: [
        { speaker: 'Oracle', text: 'Firewall ditembus. Hati-hati, protokol sinyal di node ini menggunakan lima frekuensi. Jangan sampai salah.' },
      ],
      debriefing: [
        { speaker: 'Oracle', text: 'Kendali berhasil kita rebut. Data yang kita dapatkan... oh tidak. Ini lebih buruk dari yang kita duga. Analisis akan kami kirim ke Codex-mu.' },
        { speaker: 'Oracle', text: 'Ia membuka dua front baru secara bersamaan. Kita harus membagi perhatian kita. Pilih targetmu selanjutnya dengan bijak, Operative.' }
      ],
    },
    rewardDFrags: 100,
    decryptionMatrix: {
      size: 3,
      numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      targets: { rows: [24, 6, 15], cols: [12, 15, 18] }, // Solusi: [7,8,9], [1,2,3], [4,5,6]
    },
    sequenceBreaker: {
      buttonCount: 5,
      sequenceLength: 6,
    },
    unlocks: ['node-delta-4a', 'node-delta-4b'], // <-- Membuka dua node baru
    unlocksCodexId: 'hidden-consciousness',
  },
];