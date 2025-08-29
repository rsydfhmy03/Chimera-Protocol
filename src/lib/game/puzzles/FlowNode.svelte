<script lang="ts">
  import type { Level } from '$lib/game/data/levelData';
  import { NodeType, type NodePieceData } from '$lib/game/data/levelData';
  import Button from '$lib/components/ui/Button.svelte';
  import NodePiece from './NodePiece.svelte';
  import { createEventDispatcher } from 'svelte';

  export let puzzleData: Level['flowNode'];
  const dispatch = createEventDispatcher();

  let gridState: NodePieceData[][] = JSON.parse(JSON.stringify(puzzleData.layout));

  function rotatePiece(rowIndex: number, colIndex: number) {
    const piece = gridState[rowIndex][colIndex];
    if (piece.type === NodeType.CORNER || piece.type === NodeType.STRAIGHT) {
      piece.rotation = (piece.rotation + 90) % 360 as NodePieceData['rotation'];
      gridState = gridState;
    }
  }

  // --- LOGIKA REAKTIF BARU UNTUK isSolved ---
  $: isSolved = (() => {
    // Helper untuk mendapatkan "pintu" koneksi dari sebuah kepingan
    const getOpenings = (piece: NodePieceData): ('top' | 'right' | 'bottom' | 'left')[] => {
      const r = piece.rotation;
      switch (piece.type) {
        case NodeType.START:
          return r === 0 ? ['right'] : r === 90 ? ['bottom'] : r === 180 ? ['left'] : ['top'];
        case NodeType.END:
          return r === 0 ? ['right'] : r === 90 ? ['bottom'] : r === 180 ? ['left'] : ['top'];
        case NodeType.STRAIGHT:
          return r === 0 || r === 180 ? ['left', 'right'] : ['top', 'bottom'];
        case NodeType.CORNER:
          return r === 0 ? ['top', 'right'] : r === 90 ? ['right', 'bottom'] : r === 180 ? ['bottom', 'left'] : ['left', 'top'];
        default:
          return [];
      }
    };

    const startNode = { row: -1, col: -1 };
    for (let r = 0; r < puzzleData.size; r++) {
      for (let c = 0; c < puzzleData.size; c++) {
        if (gridState[r][c].type === NodeType.START) {
          startNode.row = r;
          startNode.col = c;
          break;
        }
      }
    }
    if (startNode.row === -1) return false; // Tidak ada start node

    const stack = [startNode];
    const visited = new Set([`${startNode.row},${startNode.col}`]);

    while (stack.length > 0) {
      const current = stack.pop()!;
      const { row, col } = current;
      const piece = gridState[row][col];

      if (piece.type === NodeType.END) {
        return true; // Jalur ditemukan!
      }

      const openings = getOpenings(piece);

      // Cek 4 tetangga (atas, kanan, bawah, kiri)
      const neighbors = [
        { r: row - 1, c: col, from: 'bottom', to: 'top' },
        { r: row, c: col + 1, from: 'left', to: 'right' },
        { r: row + 1, c: col, from: 'top', to: 'bottom' },
        { r: row, c: col - 1, from: 'right', to: 'left' },
      ];

      for (const neighbor of neighbors) {
        const { r, c, from, to } = neighbor;
        const key = `${r},${c}`;

        // Cek apakah tetangga valid dan belum dikunjungi
        if (r >= 0 && r < puzzleData.size && c >= 0 && c < puzzleData.size && !visited.has(key)) {
          const currentHasOpening = openings.includes(to as "top" | "right" | "bottom" | "left");
          const neighborPiece = gridState[r][c];
          const neighborHasOpening = getOpenings(neighborPiece).includes(from as "top" | "right" | "bottom" | "left");

          if (currentHasOpening && neighborHasOpening) {
            visited.add(key);
            stack.push({ row: r, col: c });
          }
        }
      }
    }

    return false; // Loop selesai, End tidak ditemukan
  })();

  function handleSuccess() {
    dispatch('success');
  }
</script>

<div class="border border-cyan-500/30 bg-black/30 p-4 w-full max-w-lg mx-auto">
  <h3 class="text-xl text-center mb-4 text-cyan-400">FLOW REDIRECTION</h3>

  <div class="grid gap-1 bg-slate-900 p-2" style="grid-template-columns: repeat({puzzleData.size}, 1fr);">
    {#each gridState as row, rowIndex}
      {#each row as piece, colIndex}
        <button
          on:click={() => rotatePiece(rowIndex, colIndex)}
          class="aspect-square bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
        >
          <NodePiece pieceData={piece} />
        </button>
      {/each}
    {/each}
  </div>

  <div class="mt-6 text-center">
    <Button on:click={handleSuccess} disabled={!isSolved}>
      [ ESTABLISH CONNECTION ]
    </Button>
  </div>
</div>