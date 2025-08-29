<script lang="ts">
  import DecryptionMatrix from '$lib/game/puzzles/DecryptionMatrix.svelte';
  import { fade } from 'svelte/transition';

  // Menerima prop `data` yang dikirim dari `+page.ts`
  export let data;

  let phase: 'decryption' | 'flow' | 'completed' = 'decryption';

  function onDecryptionSuccess() {
    // Untuk sekarang, kita hanya ubah state-nya. Nanti kita akan tampilkan puzzle fase 2 di sini.
    phase = 'flow';
    alert('FASE 1 BERHASIL! Siap untuk Fase 2.');
  }
</script>

<div class="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8">
  <header class="w-full max-w-2xl text-center">
    <h1 class="text-3xl text-cyan-400">{data.level.name}</h1>
    <p class="text-slate-400 mt-2">{data.level.briefing}</p>
  </header>

  {#if phase === 'decryption'}
    <div in:fade>
      <DecryptionMatrix 
        puzzleData={data.level.decryptionMatrix}
        on:success={onDecryptionSuccess}
      />
    </div>
  {:else if phase === 'flow'}
    <div in:fade class="text-center">
      <h2 class="text-2xl text-green-400">ACCESS GRANTED</h2>
      <p>Preparing Flow Redirection Interface...</p>
    </div>
  {/if}
</div>