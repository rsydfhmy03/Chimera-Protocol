<script lang="ts">
  import type { Level } from '$lib/game/data/levelData';
  import { gameState } from '$lib/game/systems/gameState';
  import { goto } from '$app/navigation';

  export let allLevels: Level[];
</script>

<div class="border border-cyan-500/30 bg-black/30 p-4 md:p-8 w-full max-w-4xl mx-auto">
  <h2 class="text-2xl text-cyan-400 mb-2">[ CHIMERA NETWORK ]</h2>
  <p class="text-slate-400 mb-6">Select an active node to begin infiltration.</p>

  <div class="flex flex-col gap-4">
    {#each allLevels as level}
      {@const isCompleted = $gameState.completedNodes.includes(level.id)}
      {@const isUnlocked = $gameState.unlockedNodes.includes(level.id)}

      <button 
        disabled={!isUnlocked || isCompleted}
        on:click={() => goto(`/node/${level.id}`)}
        class="w-full text-left p-4 border border-slate-700 hover:border-cyan-400 
               transition-colors duration-200 flex items-center gap-4
               disabled:opacity-40 disabled:hover:border-slate-700 disabled:cursor-not-allowed"
      >
        <div class="w-8 h-8 flex-shrink-0 grid place-items-center border {isUnlocked && !isCompleted ? 'border-cyan-400 text-cyan-400 animate-pulse' : 'border-slate-600'}">
          {#if isCompleted}
            <span class="text-green-400">✓</span>
          {:else if isUnlocked}
            <span>▶</span>
          {:else}
            <span class="text-slate-500">⨷</span>
          {/if}
        </div>

        <div>
          <h3 class="{isCompleted ? 'text-green-400' : isUnlocked ? 'text-cyan-300' : 'text-slate-500'} text-lg">
            {level.name}
          </h3>
          <p class="text-slate-400 text-sm">{isCompleted ? 'Status: Secured' : isUnlocked ? 'Status: Active' : 'Status: Locked'}</p>
        </div>
      </button>
    {/each}
  </div>
</div>