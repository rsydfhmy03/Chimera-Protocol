<script lang="ts">
  import DecryptionMatrix from '$lib/game/puzzles/DecryptionMatrix.svelte';
  import FlowNode from '$lib/game/puzzles/FlowNode.svelte'; // Impor komponen baru
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';

  export let data;

  let phase: 'decryption' | 'flow' | 'completed' = 'decryption';

  function onDecryptionSuccess() {
    phase = 'flow';
  }

  function onFlowSuccess() {
    phase = 'completed';
    alert('NODE SECURED! Kembali ke dashboard...');
    goto('/dashboard');
  }
</script>

<div class="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8">
  <header class="w-full max-w-2xl text-center">
    <h1 class="text-3xl text-cyan-400">{data.level.name}</h1>
    {#if phase === 'decryption'}
      <p class="text-slate-400 mt-2">{data.level.briefing}</p>
    {/if}
  </header>

  {#if phase === 'decryption'}
    <div in:fade={{ duration: 300 }}>
      <DecryptionMatrix 
        puzzleData={data.level.decryptionMatrix}
        on:success={onDecryptionSuccess}
      />
    </div>
  {:else if phase === 'flow'}
    <div in:fade={{ duration: 300 }}>
      <FlowNode 
        puzzleData={data.level.flowNode}
        on:success={onFlowSuccess}
      />
    </div>
  {:else if phase === 'completed'}
    <div in:fade={{ duration: 300 }} class="text-center">
        <h2 class="text-2xl text-green-400">NODE SECURED</h2>
        <p>Redirecting to Mission Dashboard...</p>
    </div>
  {/if}
</div>