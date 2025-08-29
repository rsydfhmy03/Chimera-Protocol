<script lang="ts">
  import type { Level } from '$lib/game/data/levelData';
  import { NodeType, type NodePieceData } from '$lib/game/data/levelData';
  import Button from '$lib/components/ui/Button.svelte';
  import NodePiece from './NodePiece.svelte';
  import { createEventDispatcher } from 'svelte';
  import { cloneDeep } from 'lodash-es'; // Library helper untuk duplikasi data

  export let puzzleData: Level['flowNode'];
  const dispatch = createEventDispatcher();

  // Buat salinan data agar tidak mengubah data level aslinya
  let gridState: NodePieceData[][] = cloneDeep(puzzleData.layout);

  function rotatePiece(rowIndex: number, colIndex: number) {
    const piece = gridState[rowIndex][colIndex];
    // Hanya putar jika bukan Start, End, atau Empty
    if (piece.type === NodeType.CORNER || piece.type === NodeType.STRAIGHT) {
      piece.rotation = (piece.rotation + 90) % 360 as NodePieceData['rotation'];
      gridState = gridState; // Memicu reaktivitas
    }
  }

  // LOGIKA REAKTIF UNTUK MENGECEK SOLUSI
  // Ini adalah bagian paling kompleks
  $: isSolved = (() => {
    // Implementasi pathfinding sederhana (DFS)
    // ... (Logika pathfinding akan ditambahkan di langkah selanjutnya)
    // UNTUK SEKARANG, kita buat placeholder sederhana
    return false; // Ganti ini nanti
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