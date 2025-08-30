<script lang="ts">
  import { gameState } from '$lib/game/systems/gameState';
  import { levels } from '$lib/game/data/levelData';
  import NodeMap from '$lib/components/screens/NodeMap.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte'; 

  onMount(() => {
    if (!$gameState.operativeCodename) {
      goto('/');
    }
  });
</script>

<div class="min-h-screen p-4 md:p-8 flex flex-col items-center">
  <header class="w-full max-w-4xl mx-auto text-center mb-8 relative">
    <h1 class="text-3xl md:text-4xl text-cyan-400">
      MISSION DASHBOARD
    </h1>
    <p class="text-slate-400">
      Welcome, Operative <span class="text-white">{$gameState.operativeCodename}</span>
    </p>

    <div class="absolute top-0 right-0">
        <Button on:click={() => goto('/codex')}>[ CODEX ]</Button>
    </div>
  </header>

  <NodeMap allLevels={levels} />
</div>