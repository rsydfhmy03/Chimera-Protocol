<script lang="ts">
  import { gameState } from '$lib/game/systems/gameState';
  import { codexEntries } from '$lib/game/data/codexData';
  import Button from '$lib/components/ui/Button.svelte';
  import { goto } from '$app/navigation';

  $: unlockedEntries = codexEntries.filter(entry => 
    $gameState.unlockedCodexIds.includes(entry.id)
  );
</script>

<div class="min-h-screen p-4 md:p-8 flex flex-col items-center">
  <h1 class="text-3xl md:text-4xl text-cyan-400 mb-8">
    SYNAPSE CODEX
  </h1>

  <div class="w-full max-w-3xl space-y-4">
    {#if unlockedEntries.length === 0}
      <p class="text-center text-slate-500">[ No Data Fragments Decrypted ]</p>
    {:else}
      {#each unlockedEntries as entry (entry.id)}
        <div class="border border-cyan-500/30 bg-black/30 p-4">
          <h2 class="text-xl text-yellow-400 mb-2">{entry.title}</h2>
          <p class="text-slate-300 whitespace-pre-wrap">{entry.content}</p>
        </div>
      {/each}
    {/if}
  </div>

  <Button class="mt-8" on:click={() => goto('/dashboard')}>
    [ BACK TO DASHBOARD ]
  </Button>
</div>