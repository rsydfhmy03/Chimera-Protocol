<script lang="ts">
  import type { Level } from '$lib/game/data/levelData';
  import Button from '$lib/components/ui/Button.svelte';
  import NumberPad from './NumberPad.svelte'; 
  import { createEventDispatcher } from 'svelte';

  export let puzzleData: Level['decryptionMatrix'];
  const dispatch = createEventDispatcher();

  // STATE
  let playerGrid: (number | null)[][] = Array(puzzleData.size).fill(null).map(() => Array(puzzleData.size).fill(null));
  let selectedCell: { row: number, col: number } | null = null;

  // FUNGSI
  function selectCell(rowIndex: number, colIndex: number) {
    selectedCell = { row: rowIndex, col: colIndex };
  }

  function handleNumberSelect(event: CustomEvent<number>) {
    if (selectedCell) {
      const { row, col } = selectedCell;
      playerGrid[row][col] = event.detail;
      playerGrid = playerGrid; 
    }
  }

  $: currentRowSums = playerGrid.map(row => row.reduce((sum, cell) => (sum ?? 0) + (cell || 0), 0));
  $: currentColSums = Array(puzzleData.size).fill(0).map((_, colIndex) => playerGrid.reduce((sum, row) => sum + (row[colIndex] || 0), 0));
  $: rowDuplicates = playerGrid.map(row => {
    const filtered = row.filter(cell => cell !== null && cell !== 0);
    return new Set(filtered).size !== filtered.length;
  });
  $: colDuplicates = Array(puzzleData.size).fill(0).map((_, colIndex) => {
      const col = playerGrid.map(row => row[colIndex]).filter(cell => cell !== null && cell !== 0);
      return new Set(col).size !== col.length;
  });
  $: isSolved = currentRowSums.every((sum, i) => sum === puzzleData.targets.rows[i]) &&
                currentColSums.every((sum, i) => sum === puzzleData.targets.cols[i]) &&
                !rowDuplicates.some(hasDup => hasDup) &&
                !colDuplicates.some(hasDup => hasDup) &&
                playerGrid.flat().every(cell => cell !== null && cell !== 0);

  function handleSuccess() {
    dispatch('success');
  }
</script>

<div class="border border-cyan-500/30 bg-black/30 p-4 w-full max-w-xl mx-auto">
  <h3 class="text-xl text-center mb-4 text-cyan-400">DECRYPTION MATRIX</h3>
  
  <div class="flex flex-col md:flex-row gap-8 justify-center items-center">
    <div class="flex gap-4 items-start">
      <div class="flex flex-col gap-2 pt-16">
        {#each puzzleData.targets.rows as target, i}
          <div class="w-16 h-16 grid place-items-center font-bold text-2xl {currentRowSums[i] === target && !rowDuplicates[i] ? 'text-green-400' : 'text-cyan-400'}">
            {target}
          </div>
        {/each}
      </div>
      <div>
        <div class="flex gap-2 mb-2 ml-16">
          {#each puzzleData.targets.cols as target, i}
            <div class="w-16 h-16 grid place-items-center font-bold text-2xl {currentColSums[i] === target && !colDuplicates[i] ? 'text-green-400' : 'text-cyan-400'}">
              {target}
            </div>
          {/each}
        </div>
        <div class="grid gap-2 border-l-2 border-t-2 border-slate-700 p-2" style="grid-template-columns: repeat({puzzleData.size}, 1fr);">
          {#each playerGrid as row, rowIndex}
            {#each row as cell, colIndex}
              <button
                on:click={() => selectCell(rowIndex, colIndex)}
                class="w-16 h-16 text-3xl font-bold border-r-2 border-b-2 transition-all
                       {rowDuplicates[rowIndex] || colDuplicates[colIndex] ? 'border-red-500/50 text-red-500' : 'border-slate-700 text-white'}
                       {selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'bg-cyan-400/20 ring-2 ring-cyan-400' : 'bg-slate-800/50 hover:bg-slate-700/50'}"
              >
                {cell || ''}
              </button>
            {/each}
          {/each}
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center gap-4">
      <p class="text-slate-400">Select a cell, then input number:</p>
      <NumberPad numberRange={puzzleData.numberRange} on:select={handleNumberSelect} />
    </div>
  </div>

  <div class="mt-8 text-center">
    <Button on:click={handleSuccess} disabled={!isSolved}>
      [ SUBMIT DECRYPTION ]
    </Button>
  </div>
</div>