<script lang="ts">
  import TerminalEntry from '$lib/components/screens/TerminalEntry.svelte';
  import { gameState } from '$lib/game/systems/gameState';
  import Button from '$lib/components/ui/Button.svelte';
  import { goto } from '$app/navigation';
</script>

<div class="min-h-screen grid place-items-center p-4">
  
  {#if $gameState.operativeCodename}
    <div class="text-center space-y-4">
      <h1 class="text-2xl text-cyan-400">Welcome back, Operative {$gameState.operativeCodename}</h1>
      <p>Your next mission awaits.</p>
      <Button on:click={() => goto('/dashboard')}>
        [ Go to Mission Dashboard ]
      </Button>
    </div>
  {:else}
    <TerminalEntry />
  {/if}

</div>