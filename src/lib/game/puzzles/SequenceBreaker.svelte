<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import type { Level } from '$lib/game/data/levelData';

  export let puzzleData: Level['sequenceBreaker'];
  const dispatch = createEventDispatcher();

  type GameState = 'watching' | 'playing' | 'success' | 'failure';

  let gameState: GameState = 'watching';
  let sequence: number[] = [];
  let playerSequence: number[] = [];
  let activeIndex: number | null = null; // Tombol mana yang sedang menyala
  let playerActiveIndex: number | null = null; 

  // Dijalankan saat komponen siap
  onMount(() => {
    generateSequence();
    setTimeout(displaySequence, 1000); // Mulai tampilkan pola setelah 1 detik
  });

  function generateSequence() {
    sequence = Array.from(
      { length: puzzleData.sequenceLength },
      () => Math.floor(Math.random() * puzzleData.buttonCount)
    );
  }

  async function displaySequence() {
    gameState = 'watching';
    for (let i = 0; i < sequence.length; i++) {
      activeIndex = sequence[i];
      await new Promise(resolve => setTimeout(resolve, 400)); // Jeda nyala
      activeIndex = null;
      await new Promise(resolve => setTimeout(resolve, 200)); // Jeda mati
    }
    gameState = 'playing'; // Giliran pemain
  }

function handlePlayerInput(index: number) {
  if (gameState !== 'playing') return;

  // --- EFEK KILAT DIMULAI DI SINI ---
  // 1. Nyalakan tombol yang ditekan pemain
  playerActiveIndex = index;
  // 2. Matikan lagi setelah sepersekian detik
  setTimeout(() => {
    playerActiveIndex = null;
  }, 250); // Durasi kilat: 250ms
  // --- EFEK KILAT SELESAI ---

  playerSequence.push(index);
  
  // Sisa logika tetap sama...
  const currentInput = playerSequence[playerSequence.length - 1];
  const correctInput = sequence[playerSequence.length - 1];

  if (currentInput !== correctInput) {
    gameState = 'failure';
    return;
  }

  if (playerSequence.length === sequence.length) {
    gameState = 'success';
    setTimeout(() => dispatch('success'), 500);
  }
}

  function resetGame() {
    playerSequence = [];
    setTimeout(displaySequence, 1000);
  }
</script>

<div class="border border-cyan-500/30 bg-black/30 p-4 w-full max-w-lg mx-auto text-center">
  <h3 class="text-xl mb-4 text-cyan-400">SEQUENCE BREAKER</h3>

  <div class="mb-4 h-8">
    {#if gameState === 'watching'}
      <p class="text-yellow-400 animate-pulse">-- WATCHING SEQUENCE --</p>
    {:else if gameState === 'playing'}
      <p class="text-green-400">-- YOUR TURN --</p>
    {:else if gameState === 'failure'}
      <p class="text-red-500">-- SEQUENCE MISMATCH --</p>
    {:else if gameState === 'success'}
      <p class="text-green-400">-- SEQUENCE ACCEPTED --</p>
    {/if}
  </div>

  <div class="grid gap-4" style="grid-template-columns: repeat({puzzleData.buttonCount}, 1fr);">
    {#each Array(puzzleData.buttonCount) as _, i}
        <button 
        on:click={() => handlePlayerInput(i)}
        disabled={gameState !== 'playing'}
        class="aspect-square rounded-full transition-all duration-150 border-4 border-slate-700 disabled:cursor-not-allowed"
        class:bg-cyan-400={activeIndex === i}
        class:scale-110={activeIndex === i}
        class:bg-green-500={playerActiveIndex === i}
        class:bg-slate-800={activeIndex !== i && playerActiveIndex !== i}
        />
    {/each}
  </div>

  {#if gameState === 'failure'}
    <button on:click={resetGame} class="mt-4 text-yellow-400 hover:text-white">
      [ Retry Sequence ]
    </button>
  {/if}
</div>