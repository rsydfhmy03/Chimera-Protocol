<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  export let duration: number; 

  const dispatch = createEventDispatcher();
  let timeLeft = duration;

  onMount(() => {
    const interval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        clearInterval(interval);
        dispatch('timesup'); 
      }
    }, 1000);

    // Cleanup saat komponen dihancurkan
    return () => clearInterval(interval);
  });

  // Format waktu menjadi MM:SS
  $: minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  $: seconds = (timeLeft % 60).toString().padStart(2, '0');
</script>

<div class="text-2xl font-bold font-mono" class:text-red-500={timeLeft < 30}>
  {minutes}:{seconds}
</div>