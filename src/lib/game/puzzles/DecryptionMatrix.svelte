<script lang="ts">
  import type { Level } from '$lib/game/data/levelData';
  import Button from '$lib/components/ui/Button.svelte';
  import { createEventDispatcher } from 'svelte';

  // Menerima data puzzle spesifik dari komponen induk
  export let puzzleData: Level['decryptionMatrix'];

  const dispatch = createEventDispatcher();

  // Membuat grid kosong berdasarkan ukuran dari data level untuk menampung input pemain
  let playerGrid: (number | null)[][] = Array(puzzleData.size)
    .fill(null)
    .map(() => Array(puzzleData.size).fill(null));

  // --- SVELTE REACTIVITY IN ACTION! ---
  // Variabel-variabel ini akan otomatis dihitung ulang setiap kali `playerGrid` berubah.

  // Menghitung jumlah setiap baris saat ini
  $: currentRowSums = playerGrid.map(row => 
   row.reduce((sum, cell) => (sum ?? 0) + (cell || 0), 0)
  );

  // Menghitung jumlah setiap kolom saat ini
  $: currentColSums = Array(puzzleData.size).fill(0).map((_, colIndex) =>
    playerGrid.reduce((sum, row) => sum + (row[colIndex] || 0), 0)
  );

  // Mengecek apakah ada angka duplikat di setiap baris
  $: rowDuplicates = playerGrid.map(row => {
    const filtered = row.filter(cell => cell !== null);
    return new Set(filtered).size !== filtered.length;
  });

  // Mengecek apakah puzzle sudah terpecahkan
  $: isSolved = currentRowSums.every((sum, i) => sum === puzzleData.targets.rows[i]) &&
                currentColSums.every((sum, i) => sum === puzzleData.targets.cols[i]) &&
                !rowDuplicates.some(hasDup => hasDup) &&
                playerGrid.flat().every(cell => cell !== null);

  function handleSuccess() {
    // Kirim event 'success' ke komponen induk
    dispatch('success');
  }
</script>

<div class="border border-cyan-500/30 bg-black/30 p-4 w-full max-w-md mx-auto">
  <h3 class="text-xl text-center mb-4 text-cyan-400">DECRYPTION MATRIX</h3>
  <div class="flex gap-4 items-start">
    <div class="flex flex-col gap-2 pt-10">
      {#each puzzleData.targets.rows as target, i}
        <div class="w-8 h-8 grid place-items-center font-bold text-xl {currentRowSums[i] === target ? 'text-green-400' : 'text-cyan-400'}">
          {target}
        </div>
      {/each}
    </div>

    <div>
      <div class="flex gap-2 mb-2 ml-10">
        {#each puzzleData.targets.cols as target, i}
          <div class="w-8 h-8 grid place-items-center font-bold text-xl {currentColSums[i] === target ? 'text-green-400' : 'text-cyan-400'}">
            {target}
          </div>
        {/each}
      </div>

      <div class="grid gap-2 border-l border-t border-slate-700 p-2" style="grid-template-columns: repeat({puzzleData.size}, 1fr);">
        {#each playerGrid as row, rowIndex}
          {#each row as cell, colIndex}
            <input
              type="number"
              bind:value={playerGrid[rowIndex][colIndex]}
              class="w-8 h-8 bg-slate-800/50 text-center text-xl font-bold border-r border-b border-slate-700
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 {rowDuplicates[rowIndex] ? 'text-red-500' : 'text-white'}"
            />
          {/each}
        {/each}
      </div>
    </div>
  </div>

  <div class="mt-6 text-center">
    <Button on:click={handleSuccess} disabled={!isSolved}>
      [ SUBMIT DECRYPTION ]
    </Button>
  </div>
</div>