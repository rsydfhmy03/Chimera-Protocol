<script lang="ts">
  import type { DialogueLine } from '$lib/game/data/levelData';
  import { onMount, createEventDispatcher } from 'svelte';

  export let lines: DialogueLine[];

  const dispatch = createEventDispatcher();

  let currentLineIndex = 0;
  let displayedText = '';
  let isTyping = true;

  onMount(() => {
    typeLine();
  });

  function typeLine() {
    const line = lines[currentLineIndex];
    if (!line) return;

    isTyping = true;
    displayedText = '';
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex < line.text.length) {
        displayedText += line.text[charIndex];
        charIndex++;
      } else {
        clearInterval(interval);
        isTyping = false;
      }
    }, 25); // Kecepatan ketik
  }

  function next() {
    if (isTyping) return; // Jangan lanjutkan jika masih mengetik

    if (currentLineIndex < lines.length - 1) {
      currentLineIndex++;
      typeLine();
    } else {
      // Kirim event jika semua dialog sudah selesai
      dispatch('end');
    }
  }
</script>

<div class="border border-cyan-500/30 bg-black/50 p-4 w-full max-w-2xl mx-auto text-left">
  <p class="text-green-400 font-bold mb-2">
    &gt; INCOMING TRANSMISSION: [{lines[currentLineIndex]?.speaker}]
  </p>
  <p class="whitespace-pre-wrap min-h-16">{displayedText}<span class="animate-pulse">{isTyping ? '_' : ''}</span></p>

  {#if !isTyping}
    <button on:click={next} class="w-full text-right mt-2 text-yellow-400 hover:text-white animate-pulse">
      [ CONTINUE ]
    </button>
  {/if}
</div>