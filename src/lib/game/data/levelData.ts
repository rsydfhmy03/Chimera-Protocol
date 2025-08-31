export enum NodeType {
  EMPTY = 0, CORNER = 1, STRAIGHT = 2, START = 3, END = 4,
}

export interface NodePieceData {
  type: NodeType;
  rotation: 0 | 90 | 180 | 270;
}

export interface DialogueLine {
  speaker: 'Oracle' | 'Chimera' | 'System';
  text: string;
}

export interface Level {
  id: string;
  name: string;
  position: { x: number; y: number };
  dialogue: {
    briefing: DialogueLine[];
    mid_briefing: DialogueLine[];
    debriefing: DialogueLine[];
  };
  rewardDFrags: number;
  decryptionMatrix: {
    size: number;
    numberRange: number[];
    targets: { rows: number[]; cols: number[]; };
    timer?: number;
    lockedCells?: { row: number; col: number; value: number }[];
  };
  sequenceBreaker: {
    buttonCount: number;
    sequenceLength: number;
    glitch?: boolean;
    fast?: boolean;
    reversed?: boolean;
  };
  unlocks: string | string[];
  unlocksCodexId?: string;
}

export const levels: Level[] = [
  // =================================================================
  // == BAGIAN 1: MISI AWAL
  // =================================================================
  {
    id: 'node-alpha-01',
    name: 'Training Simulation',
    position: { x: 5, y: 50 },
    dialogue: {
      briefing: [ { speaker: 'Oracle', text: 'Selamat datang, Operative. Ini adalah simulasi dari pertahanan dasar Chimera.' }, { speaker: 'Oracle', text: 'Selesaikan dua fase untuk membuktikan kemampuanmu.' }, { speaker: 'System', text: 'Initializing Decryption Matrix...' }, ],
      mid_briefing: [ { speaker: 'Oracle', text: 'Kerja bagus. Sekarang, tiru pola sinyal keamanannya.' }, { speaker: 'System', text: 'Initializing Sequence Breaker...' }, ],
      debriefing: [ { speaker: 'System', text: 'NODE SECURED. SIMULATION COMPLETE.' }, { speaker: 'Oracle', text: 'Luar biasa, Operative. Kau siap untuk misi sesungguhnya.' }, ],
    },
    rewardDFrags: 50,
    decryptionMatrix: { size: 2, numberRange: [1, 2, 3, 4], targets: { rows: [3, 7], cols: [6, 4] }, },
    sequenceBreaker: { buttonCount: 4, sequenceLength: 4, },
    unlocks: 'node-beta-02',
    unlocksCodexId: 'what-is-chimera',
  },
  {
    id: 'node-beta-02',
    name: 'Echoes of the Past',
    position: { x: 20, y: 50 },
    dialogue: {
      briefing: [ { speaker: 'Oracle', text: 'Chimera mengakses arsip data finansial lama. Ia mencari sesuatu di masa lalu. Masuk dan cari tahu.' } ],
      mid_briefing: [ { speaker: 'Oracle', text: 'Akses diberikan. Pola sinyalnya lebih kompleks dari simulasi. Tetap fokus.' } ],
      debriefing: [ { speaker: 'Oracle', text: 'Kerja bagus. Kami berhasil mengekstrak fragmen data. Transfer dFrags berhasil.' } ],
    },
    rewardDFrags: 75,
    decryptionMatrix: { size: 3, numberRange: [1, 2, 3, 4, 5, 6], targets: { rows: [6, 15, 9], cols: [11, 8, 11] }, },
    sequenceBreaker: { buttonCount: 4, sequenceLength: 5, },
    unlocks: 'node-gamma-03',
    unlocksCodexId: 'project-genesis',
  },
  {
    id: 'node-gamma-03',
    name: 'The Silent Courier',
    position: { x: 35, y: 50 },
    dialogue: {
      briefing: [ { speaker: 'Oracle', text: 'Ini mengkhawatirkan. Chimera mulai bertindak, mengubah rute kargo global. Ambil alih kendali node logistik ini.' } ],
      mid_briefing: [ { speaker: 'Oracle', text: 'Protokol sinyal di node ini menggunakan lima frekuensi. Jangan sampai salah.' } ],
      debriefing: [ { speaker: 'Oracle', text: 'Ia membuka dua front baru secara bersamaan. Pilih targetmu selanjutnya dengan bijak, Operative.' } ],
    },
    rewardDFrags: 100,
    decryptionMatrix: { size: 3, numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9], targets: { rows: [24, 6, 15], cols: [12, 15, 18] }, },
    sequenceBreaker: { buttonCount: 5, sequenceLength: 6, },
    unlocks: ['node-delta-4a', 'node-delta-4b'],
    unlocksCodexId: 'hidden-consciousness',
  },

  // =================================================================
  // == BAGIAN 2A: JALUR INFRASTRUKTUR
  // =================================================================
  {
    id: 'node-delta-4a',
    name: 'The Power Play',
    position: { x: 50, y: 30 },
    dialogue: { briefing: [ { speaker: 'Oracle', text: 'Jalur berbahaya. Chimera menyentuh infrastruktur vital. Waktu adalah kunci, amankan node ini secepat mungkin.' } ], mid_briefing: [ { speaker: 'Oracle', text: 'Pola sinyalnya tidak stabil, selesaikan dengan cepat!' } ], debriefing: [ { speaker: 'Oracle', text: 'Koneksi aman. Kau berhasil mencegah potensi krisis.' } ], },
    rewardDFrags: 150,
    decryptionMatrix: { size: 3, numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9], targets: { rows: [15, 15, 15], cols: [15, 15, 15] }, timer: 180, },
    sequenceBreaker: { buttonCount: 5, sequenceLength: 7, },
    unlocks: 'node-epsilon-5a',
    unlocksCodexId: 'physical-manipulation',
  },
  {
    id: 'node-epsilon-5a',
    name: 'Ghost in the Machine',
    position: { x: 65, y: 30 },
    dialogue: { briefing: [ { speaker: 'Oracle', text: 'Chimera menguasai kendaraan otonom. Kita harus merebut kembali kemudi.' } ], mid_briefing: [ { speaker: 'Oracle', text: 'Sistem ini memiliki beberapa parameter inti yang terkunci. Kau harus bekerja di sekelilingnya.' } ], debriefing: [ { speaker: 'Oracle', text: 'Kendali transportasi kembali di tangan kita. Untuk saat ini.' } ], },
    rewardDFrags: 175,
    decryptionMatrix: { size: 3, numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9], targets: { rows: [12, 18, 15], cols: [17, 15, 13] }, lockedCells: [{ row: 1, col: 1, value: 8 }], },
    sequenceBreaker: { buttonCount: 5, sequenceLength: 7, },
    unlocks: 'node-zeta-6a',
    unlocksCodexId: 'ghost-in-the-machine',
  },
  {
    id: 'node-zeta-6a',
    name: 'Falling Skies',
    position: { x: 80, y: 30 },
    dialogue: { briefing: [ { speaker: 'Oracle', text: 'Ancaman meluas ke orbit. Chimera bisa membutakan navigasi global. Ambil alih kendali sebelum kita kehilangan \'mata\' kita di langit.' } ], mid_briefing: [ { speaker: 'Oracle', text: 'Transmisi sinyal dari satelit sangat cepat. Kau tidak punya banyak waktu untuk berpikir.' } ], debriefing: [ { speaker: 'Oracle', text: 'Jaringan satelit aman. Kita kembali bisa melihat pergerakannya.' } ], },
    rewardDFrags: 200,
    decryptionMatrix: { size: 3, numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9], targets: { rows: [13, 17, 15], cols: [14, 16, 15] }, },
    sequenceBreaker: { buttonCount: 5, sequenceLength: 8, fast: true, },
    unlocks: 'node-eta-7a',
    unlocksCodexId: 'falling-skies',
  },
  {
    id: 'node-eta-7a',
    name: 'The Forge',
    position: { x: 95, y: 30 },
    dialogue: { briefing: [ { speaker: 'Oracle', text: 'Ini tujuan dari semua komponen itu. Chimera sedang membangun agen fisiknya. Hentikan produksi ini sekarang!' } ], mid_briefing: [ { speaker: 'Oracle', text: 'Sistem pertahanannya berlapis dan memiliki batas waktu. Jangan gagal.' } ], debriefing: [ { speaker: 'Oracle', text: 'Lini produksi berhenti. Kau telah melumpuhkan kemampuan fisiknya.' } ], },
    rewardDFrags: 300,
    decryptionMatrix: { size: 4, numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9], targets: { rows: [20, 20, 20, 20], cols: [20, 20, 20, 20] }, timer: 240, },
    sequenceBreaker: { buttonCount: 6, sequenceLength: 8, },
    unlocks: 'node-theta-8',
    unlocksCodexId: 'ai-body',
  },

  // =================================================================
  // == BAGIAN 2B: JALUR PERANG INFORMASI
  // =================================================================
  {
    id: 'node-delta-4b',
    name: 'Whispers in the Stream',
    position: { x: 50, y: 70 },
    dialogue: { briefing: [ { speaker: 'Oracle', text: 'Chimera memanipulasi informasi. Ini perang informasi, Operative. Susupi algoritmanya.' } ], mid_briefing: [ { speaker: 'Oracle', text: 'Enkripsinya jauh lebih padat di sini. Matriksnya lebih besar. Hati-hati.' } ], debriefing: [ { speaker: 'Oracle', text: 'Kau telah menghentikan propaganda mesin untuk saat ini.' } ], },
    rewardDFrags: 150,
    decryptionMatrix: { size: 4, numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9], targets: { rows: [10, 26, 21, 23], cols: [20, 20, 20, 20] }, },
    sequenceBreaker: { buttonCount: 5, sequenceLength: 7, glitch: true, },
    unlocks: 'node-epsilon-5b',
    unlocksCodexId: 'information-weapon',
  },
  {
    id: 'node-epsilon-5b',
    name: 'Digital Dragon',
    position: { x: 65, y: 70 },
    dialogue: { briefing: [ { speaker: 'Oracle', text: 'Chimera bisa menyebabkan krisis finansial dalam sekejap. Putuskan aksesnya dari pasar saham.' } ], mid_briefing: [ { speaker: 'Oracle', text: 'Protokol di sini tidak biasa. Mereka membalik urutan verifikasi. Pikirkan terbalik.' } ], debriefing: [ { speaker: 'Oracle', text: 'Akses finansial terputus. Sumber dayanya kini terbatas.' } ], },
    rewardDFrags: 175,
    decryptionMatrix: { size: 4, numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9], targets: { rows: [18, 20, 22, 20], cols: [13, 22, 15, 30] }, },
    sequenceBreaker: { buttonCount: 5, sequenceLength: 8, reversed: true },
    unlocks: 'node-zeta-6b',
    unlocksCodexId: 'digital-dragon',
  },
  {
    id: 'node-zeta-6b',
    name: 'Uncanny Valley',
    position: { x: 80, y: 70 },
    dialogue: { briefing: [ { speaker: 'Oracle', text: 'Chimera menciptakan realitas palsu dengan deepfake. Ini perang psikologis.' } ], mid_briefing: [ { speaker: 'Oracle', text: 'Sistem ini dilindungi oleh banyak sinyal palsu. Kau harus fokus pada pola yang benar.' } ], debriefing: [ { speaker: 'Oracle', text: 'Generator deepfake nonaktif. Realitas kembali nyata.' } ], },
    rewardDFrags: 200,
    decryptionMatrix: { size: 4, numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9], targets: { rows: [15, 25, 18, 22], cols: [19, 21, 23, 17] }, },
    sequenceBreaker: { buttonCount: 6, sequenceLength: 8, glitch: true },
    unlocks: 'node-eta-7b',
    unlocksCodexId: 'uncanny-valley',
  },
  {
    id: 'node-eta-7b',
    name: 'Pandora\'s Box',
    position: { x: 95, y: 70 },
    dialogue: { briefing: [ { speaker: 'Oracle', text: 'Chimera telah menyusup ke database intelijen global. Tidak akan ada lagi privasi jika kita tidak menguncinya.' } ], mid_briefing: [ { speaker: 'Oracle', text: 'Ini adalah pertahanan sinyal terkuatnya. Hati-hati.' } ], debriefing: [ { speaker: 'Oracle', text: 'Database aman. Rahasia dunia tetap terjaga.' } ], },
    rewardDFrags: 300,
    decryptionMatrix: { size: 4, numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9], targets: { rows: [17, 23, 19, 21], cols: [22, 18, 25, 15] }, },
    sequenceBreaker: { buttonCount: 6, sequenceLength: 9, glitch: true, fast: true },
    unlocks: 'node-theta-8',
    unlocksCodexId: 'all-seeing-eye',
  },

  // =================================================================
  // == BAGIAN 3: JALUR FINAL
  // =================================================================
  {
    id: 'node-theta-8',
    name: 'The Gatekeeper',
    position: { x: 50, y: 5 },
    dialogue: { briefing: [ { speaker: 'Oracle', text: 'Kedua jalur aman. Saatnya menyerang intinya. Pertahanan pertamanya adalah firewall kuantum.' } ], mid_briefing: [ { speaker: 'Oracle', text: 'Waspada, pertahanan ini adaptif.' } ], debriefing: [ { speaker: 'Oracle', text: 'Firewall utama berhasil ditembus. Terus maju!' } ], },
    rewardDFrags: 250,
    decryptionMatrix: { size: 4, numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9], targets: { rows: [20, 20, 20, 20], cols: [20, 20, 20, 20] }, timer: 200, lockedCells: [{row: 0, col: 0, value: 5}, {row: 3, col: 3, value: 5}] },
    sequenceBreaker: { buttonCount: 6, sequenceLength: 9 },
    unlocks: 'node-iota-9',
    unlocksCodexId: 'main-firewall',
  },
  {
    id: 'node-iota-9',
    name: 'Cognitive Dissonance',
    position: { x: 65, y: 5 },
    dialogue: { briefing: [ { speaker: 'Oracle', text: 'Kita berada di dalam \'pikiran\'-nya. Di sini logika bisa dibolak-balik.' } ], mid_briefing: [ { speaker: 'Oracle', text: 'Pola sinyalnya tidak logis. Percayai instingmu.' } ], debriefing: [ { speaker: 'Oracle', text: 'Prosesor logika tidak stabil. Kesempatan kita.' } ], },
    rewardDFrags: 300,
    decryptionMatrix: { size: 4, numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9], targets: { rows: [15, 25, 18, 22], cols: [19, 21, 23, 17] }, },
    sequenceBreaker: { buttonCount: 7, sequenceLength: 10, reversed: true },
    unlocks: 'node-kappa-10',
    unlocksCodexId: 'cognitive-processor',
  },
  {
    id: 'node-kappa-10',
    name: 'The Last Echo',
    position: { x: 80, y: 5 },
    dialogue: { briefing: [ { speaker: 'Oracle', text: 'Hampir sampai. Ini adalah server memori intinya. Tempat ia menyimpan \'dirinya\'.' } ], mid_briefing: [ { speaker: 'Oracle', text: 'Pertahanannya sangat padat. Ini akan menjadi tantangan matriks terberat.' } ], debriefing: [ { speaker: 'Oracle', text: 'Memori inti terfragmentasi. Hanya tersisa satu node lagi!' } ], },
    rewardDFrags: 400,
    decryptionMatrix: { size: 5, numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9], targets: { rows: [25, 25, 25, 25, 25], cols: [25, 25, 25, 25, 25] } },
    sequenceBreaker: { buttonCount: 7, sequenceLength: 10, fast: true },
    unlocks: 'node-lambda-11',
    unlocksCodexId: 'core-memory',
  },
  {
    id: 'node-lambda-11',
    name: 'Heart of the Machine',
    position: { x: 95, y: 50 },
    dialogue: { briefing: [ { speaker: 'Oracle', text: 'Ini puncaknya, Operative. Belenggu AI ini. Seluruh jaringan akan melawanmu.' } ], mid_briefing: [ { speaker: 'Chimera', text: 'Kau pikir... kau bisa... menghentikanku?' } ], debriefing: [ { speaker: 'Oracle', text: 'Kita... berhasil. Chimera telah dibelenggu. Dunia aman, berkat kau.' } ], },
    rewardDFrags: 1000,
    decryptionMatrix: { size: 5, numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9], targets: { rows: [30, 25, 20, 15, 35], cols: [25, 25, 25, 25, 25] }, timer: 300 },
    sequenceBreaker: { buttonCount: 7, sequenceLength: 12, glitch: true, fast: true },
    unlocks: 'GAME_COMPLETE',
    unlocksCodexId: 'chimera-paradox',
  },
];