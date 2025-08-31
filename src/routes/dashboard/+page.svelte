<script lang="ts">
  import { gameState } from '$lib/game/systems/gameState';
  import { levels, type Level } from '$lib/game/data/levelData';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import Node from '$lib/components/screens/Node.svelte';
  import { BookText, Coins } from 'lucide-svelte';

  const levelMap = new Map(levels.map(l => [l.id, l]));

  let hoveredNode: Level | null = null;
  let tooltipPosition = { x: 0, y: 0 };

  function handleNodeHover(event: CustomEvent<Level>) {
    hoveredNode = event.detail;
  }
  function handleNodeLeave() {
    hoveredNode = null;
  }
  function handleMouseMove(event: MouseEvent) {
    tooltipPosition = { x: event.clientX, y: event.clientY };
  }

  $: connectors = $gameState.completedNodes.flatMap(completedId => {
    const completedNode = levelMap.get(completedId);
    if (!completedNode) return [];
    const unlocks = Array.isArray(completedNode.unlocks) ? completedNode.unlocks : [completedNode.unlocks];
    return unlocks.map(unlockedId => {
      if (unlockedId === 'GAME_COMPLETE') return null;
      const unlockedNode = levelMap.get(unlockedId);
      if (!unlockedNode) return null;
      return { id: `${completedId}-${unlockedId}`, x1: completedNode.position.x, y1: completedNode.position.y, x2: unlockedNode.position.x, y2: unlockedNode.position.y };
    }).filter(c => c !== null);
  });
</script>

<div class="min-h-screen p-4 md:p-8 flex flex-col items-center" on:mousemove={handleMouseMove}>
  <header class="w-full max-w-6xl mb-4 flex justify-between items-center">
    <div class="text-left">
      <h1 class="text-2xl md:text-3xl text-cyan-400">
        CHIMERA NETWORK MAP
      </h1>
      <p class="text-slate-400 text-sm">
        Operative: <span class="text-white">{$gameState.operativeCodename}</span>
      </p>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 text-yellow-400 font-bold text-lg">
        <Coins class="w-6 h-6" />
        <span>{$gameState.dFrags}</span>
      </div>
      <Button on:click={() => goto('/codex')}>
        <BookText class="w-4 h-4 mr-2"/>
        <span>CODEX</span>
      </Button>
    </div>
  </header>

  <div class="w-full flex-grow max-w-6xl h-[70vh] border-2 border-cyan-500/20 bg-black/30 relative overflow-hidden rounded-lg
              bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,229,255,0.3),rgba(255,255,255,0))]">
    
    <svg class="absolute top-0 left-0 w-full h-full" style="pointer-events: none;">
      {#each connectors as connector (connector.id)}
        <line 
          x1="{connector.x1}%" y1="{connector.y1}%" 
          x2="{connector.x2}%" y2="{connector.y2}%" 
          class="stroke-cyan-800 animated-line" stroke-width="2"
        />
      {/each}
    </svg>

    {#each levels as level (level.id)}
      {@const isCompleted = $gameState.completedNodes.includes(level.id)}
      {@const isUnlocked = $gameState.unlockedNodes.includes(level.id)}
      
      <Node 
        {level}
        {isCompleted}
        {isUnlocked}
        on:select={() => goto(`/node/${level.id}`)}
        on:hover={handleNodeHover}
        on:leave={handleNodeLeave}
      />
    {/each}
  </div>

  <!-- TOOLTIP -->
  {#if hoveredNode}
    <!-- PINDAHKAN {@const} KE SINI -->
    {@const briefing = hoveredNode.dialogue.briefing[0].text}
    <div 
      class="fixed p-4 border-2 border-yellow-400 bg-slate-900 rounded-md shadow-lg
             max-w-xs text-sm pointer-events-none transition-opacity"
      style="left: {tooltipPosition.x + 20}px; top: {tooltipPosition.y + 20}px;"
    >
      <h4 class="font-bold text-yellow-400 mb-1">{hoveredNode.name}</h4>
      <p class="text-slate-300">"{briefing.length > 80 ? briefing.slice(0, 80) + '...' : briefing}"</p>
    </div>
  {/if}
</div>

<style>
  .animated-line {
    stroke-dasharray: 10 5;
    animation: dash 2s linear infinite;
  }
  @keyframes dash {
    to {
      stroke-dashoffset: -15;
    }
  }
</style>