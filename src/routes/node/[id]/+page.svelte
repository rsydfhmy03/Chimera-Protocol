<script lang="ts">
  import DecryptionMatrix from '$lib/game/puzzles/DecryptionMatrix.svelte';
  import SequenceBreaker from '$lib/game/puzzles/SequenceBreaker.svelte'; // Impor komponen baru
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { gameState } from '$lib/game/systems/gameState';
  import Button from '$lib/components/ui/Button.svelte';

  export let data;
  
  let phase: 'decryption' | 'flow' | 'completed' = 'decryption';

  function onDecryptionSuccess() {
    phase = 'flow'; // 'flow' sekarang berarti Sequence Breaker
  }

  function onFlowSuccess() {
    phase = 'completed';
    // Update state game (ini tetap sama)
    gameState.update(current => ({
        ...current,
        dFrags: current.dFrags + data.level.rewardDFrags,
        completedNodes: [...current.completedNodes, data.level.id],
        unlockedNodes: [...current.unlockedNodes, data.level.unlocks]
    }));

    setTimeout(() => {
        goto('/dashboard');
    }, 2000);
  }
</script>

<div class="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8">
  <header class="w-full max-w-2xl text-center relative">
    <h1 class="text-3xl text-cyan-400">{data.level.name}</h1>
    <div class="text-yellow-400 font-bold text-lg text-right -mt-8">
      dFrags: {$gameState.dFrags}
    </div>
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
      <SequenceBreaker 
        puzzleData={data.level.sequenceBreaker}
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