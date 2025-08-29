<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let numberRange: number[];

  const dispatch = createEventDispatcher();

  function selectNumber(num: number) {
    dispatch('select', num);
  }
</script>

<div class="grid grid-cols-3 gap-2 p-2 bg-slate-900/50 rounded-md">
  {#each numberRange as num}
    <button
      on:click={() => selectNumber(num)}
      class="w-14 h-14 text-2xl font-bold rounded-md transition-colors
             bg-slate-700 text-slate-200 hover:bg-cyan-500 hover:text-white"
    >
      {num}
    </button>
  {/each}
</div>