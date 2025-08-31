<script lang="ts">
  import type { Level } from '$lib/game/data/levelData';
  import { createEventDispatcher } from 'svelte';
  import { Target, CheckCircle, Lock } from 'lucide-svelte'; 

  export let level: Level;
  export let isCompleted: boolean;
  export let isUnlocked: boolean;

  const dispatch = createEventDispatcher();
</script>

<button
  disabled={!isUnlocked || isCompleted}
  on:click={() => dispatch('select')}
  on:mouseenter={() => dispatch('hover', level)}
  on:mouseleave={() => dispatch('leave')}
  class="absolute w-40 h-28 p-3 border-2 transition-all duration-300
        flex flex-col justify-between items-center text-center
        disabled:cursor-not-allowed group"
  class:is-completed={isCompleted}
  class:is-active={isUnlocked && !isCompleted}
  class:is-locked={!isUnlocked}
  style="left: {level.position.x}%; top: {level.position.y}%; transform: translate(-50%, -50%);"
>
  <div class="flex-grow flex flex-col justify-center items-center">
    <!-- Ikon Dinamis -->
    {#if isCompleted}
      <CheckCircle class="w-8 h-8 mb-1" />
    {:else if isUnlocked}
      <Target class="w-8 h-8 mb-1 group-hover:animate-spin" />
    {:else}
      <Lock class="w-8 h-8 mb-1" />
    {/if}
    <h3 class="font-bold text-sm leading-tight">{level.name}</h3>
  </div>
  <p class="text-xs opacity-70 mt-1">
    {isCompleted ? 'Status: Secured' : isUnlocked ? 'Status: Active' : 'Status: Locked'}
  </p>
</button>

<!-- <style>
  .is-completed {
    @apply bg-green-500/10 border-green-500 text-green-400 shadow-lg shadow-green-500/20;
  }
  .is-active {
    @apply bg-cyan-500/10 border-cyan-500 text-cyan-300 animate-pulse hover:bg-cyan-500/20 hover:scale-105 shadow-lg shadow-cyan-500/20;
  }
  .is-locked {
    @apply bg-slate-800/20 border-slate-700 text-slate-500 opacity-60;
  }
</style> -->