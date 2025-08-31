<script lang="ts">
  import type { Level } from '$lib/game/data/levelData';
  import Button from '$lib/components/ui/Button.svelte';
  import NumberPad from './NumberPad.svelte'; 
  import { createEventDispatcher } from 'svelte';
  import Timer from '$lib/components/ui/Timer.svelte';
  import { onMount } from 'svelte';

  export let puzzleData: Level['decryptionMatrix'];
  const dispatch = createEventDispatcher();

  // STATE
  let playerGrid: (number | null)[][] = Array(puzzleData.size).fill(null).map(() => Array(puzzleData.size).fill(null));
  let selectedCell: { row: number, col: number } | null = null;

  // FUNGSI
  function selectCell(rowIndex: number, colIndex: number) {
    // Cek apakah sel ini terkunci
    const isLocked = puzzleData.lockedCells?.some(
      cell => cell.row === rowIndex && cell.col === colIndex
    );
    if (isLocked) return; // Jangan lakukan apa-apa jika terkunci

    selectedCell = { row: rowIndex, col: colIndex };
  }

  function handleTimesUp() {
    alert('WAKTU HABIS! Misi Gagal.');
    // Nanti bisa buat logika gagal yang lebih baik
    window.location.href = '/dashboard';
  }

  function handleNumberSelect(event: CustomEvent<number>) {
    if (selectedCell) {
      const { row, col } = selectedCell;
      playerGrid[row][col] = event.detail;
      playerGrid = playerGrid; 
    }
  }

  onMount(() => {
    if (puzzleData.lockedCells) {
      puzzleData.lockedCells.forEach(cell => {
        playerGrid[cell.row][cell.col] = cell.value;
      });
      playerGrid = playerGrid; // Memicu update
    }
  });  

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

<div class="flex flex-col lg:flex-row gap-8 justify-center items-center p-4 w-full">
  
  <div class="flex-shrink-0 w-full lg:w-auto flex flex-col items-center gap-4 order-2 lg:order-1">
    {#if puzzleData.timer}
      <div class="text-center">
        <p class="text-red-500 text-sm">TIME REMAINING</p>
        <Timer duration={puzzleData.timer} on:timesup={handleTimesUp} />
      </div>
    {/if}
    <p class="text-slate-400 text-center">Select a cell, then input number:</p>
    <NumberPad numberRange={puzzleData.numberRange} on:select={handleNumberSelect} />
    <Button class="mt-4 w-full" on:click={handleSuccess} disabled={!isSolved}>
      [ SUBMIT DECRYPTION ]
    </Button>
  </div>

  <div 
    class="grid gap-2 order-1 lg:order-2" 
    style="grid-template-columns: auto repeat({puzzleData.size}, 1fr);"
  >
    <div class="w-16 h-16"></div>

    {#each puzzleData.targets.cols as target, i}
      <div class="w-16 h-16 grid place-items-center font-bold text-2xl transition-colors
                 {currentColSums[i] === target && !colDuplicates[i] ? 'text-green-400' : 'text-cyan-400'}"
      >
        {target}
      </div>
    {/each}

    {#each playerGrid as row, rowIndex}
      <div class="w-16 h-16 grid place-items-center font-bold text-2xl transition-colors
                 {currentRowSums[rowIndex] === puzzleData.targets.rows[rowIndex] && !rowDuplicates[rowIndex] ? 'text-green-400' : 'text-cyan-400'}"
      >
        {puzzleData.targets.rows[rowIndex]}
      </div>
      
      {#each row as cell, colIndex}
            {@const isLocked = puzzleData.lockedCells?.some(c => c.row === rowIndex && c.col === colIndex)}
            <button
              on:click={() => selectCell(rowIndex, colIndex)}
              disabled={isLocked} class="w-16 h-16 text-3xl font-bold border-2 transition-all duration-150
                    disabled:bg-slate-900 disabled:text-cyan-400 disabled:cursor-not-allowed
                  {rowDuplicates[rowIndex] || colDuplicates[colIndex] ? 'border-red-500/50 text-red-500' : 'border-slate-700 text-white'}
                 {selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'bg-cyan-400/20 ring-2 ring-cyan-400' : 'bg-slate-800/50 hover:bg-slate-700/50'}"
            >
              {cell || ''}
            </button>
      {/each}
    {/each}
  </div>
</div>