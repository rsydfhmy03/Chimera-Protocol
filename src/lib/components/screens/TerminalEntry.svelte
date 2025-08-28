<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { gameState } from '$lib/game/systems/gameState';
  import Button from '$lib/components/ui/Button.svelte';

  let codename = '';

  // Untuk efek teks mengetik
  const introLines = [
    'Establishing secure connection...',
    'Authenticating Synapse protocols...',
    'Welcome, Operative.',
    'Please identify yourself.',
  ];
  let displayedText = '';
  let lineIndex = 0;
  let charIndex = 0;

  onMount(() => {
    function typeWriter() {
      if (lineIndex < introLines.length) {
        if (charIndex < introLines[lineIndex].length) {
          displayedText += introLines[lineIndex].charAt(charIndex);
          charIndex++;
          setTimeout(typeWriter, 30); 
        } else {
          displayedText += '\n'; 
          lineIndex++;
          charIndex = 0;
          setTimeout(typeWriter, 500); // Jeda antar baris
        }
      }
    }
    typeWriter();
  });
  
  function handleSubmit() {
    if (codename.trim().length > 2) {
      // Update store gameState dengan codename baru
      gameState.update(currentStat => {
        return { ...currentStat, operativeCodename: codename.trim().toUpperCase() };
      });
      
      goto('/dashboard');
    }
  }
</script>

<div class="p-4 md:p-8 border border-cyan-500/30 bg-black/30 w-full max-w-2xl mx-auto">
  <pre class="whitespace-pre-wrap text-cyan-400 text-sm md:text-base">
    {displayedText}
  </pre>
  
  {#if lineIndex >= introLines.length}
    <form on:submit|preventDefault={handleSubmit} class="flex items-center gap-4 mt-4">
      <label for="codename" class="text-cyan-400 shrink-0">SYNAPSE_OS &gt;</label>
      <input
        bind:value={codename}
        id="codename"
        type="text"
        class="w-full bg-transparent border-none focus:ring-0 text-cyan-300 placeholder:text-cyan-800"
        placeholder="Enter your codename..."
        autocomplete="off"
        required
        minlength="3"
      />
      <Button type="submit">
        [Authenticate]
      </Button>
    </form>
  {/if}
</div>