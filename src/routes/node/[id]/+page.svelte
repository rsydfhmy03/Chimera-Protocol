<script lang="ts">
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';
  import { gameState } from '$lib/game/systems/gameState';
  import { play } from '$lib/game/systems/audioManager';

  import DialogueBox from '$lib/components/ui/DialogueBox.svelte';
  import DecryptionMatrix from '$lib/game/puzzles/DecryptionMatrix.svelte';
  import SequenceBreaker from '$lib/game/puzzles/SequenceBreaker.svelte';

  export let data; // Data dari +page.ts

  type MissionState = 'BRIEFING' | 'DECRYPTION' | 'MID_BRIEFING' | 'SEQUENCE' | 'DEBRIEFING' | 'COMPLETED';
  let missionState: MissionState = 'BRIEFING';

  function onDecryptionSuccess() {
    play('success');
    missionState = 'MID_BRIEFING';
  }

  function onSequenceSuccess() {
    play('success');
    // Beri hadiah & update progres
    gameState.update(current => {
      const completed = new Set([...current.completedNodes, data.level.id]);
      const unlocked = new Set([...current.unlockedNodes, data.level.unlocks]);
      return {
        ...current,
        dFrags: current.dFrags + data.level.rewardDFrags,
        completedNodes: Array.from(completed),
        unlockedNodes: Array.from(unlocked)
      }
    });
    missionState = 'DEBRIEFING';
  }
</script>

<div class="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center gap-8">
  <h1 class="text-3xl text-cyan-400 absolute top-8">{data.level.name}</h1>
  
  {#if missionState === 'BRIEFING'}
    <div in:fade>
      <DialogueBox 
        lines={data.level.dialogue.briefing} 
        on:end={() => { play('click'); missionState = 'DECRYPTION'; }}
      />
    </div>
  {:else if missionState === 'DECRYPTION'}
    <div in:fade>
      <DecryptionMatrix 
        puzzleData={data.level.decryptionMatrix}
        on:success={onDecryptionSuccess}
      />
    </div>
  {:else if missionState === 'MID_BRIEFING'}
    <div in:fade>
      <DialogueBox 
        lines={data.level.dialogue.mid_briefing} 
        on:end={() => { play('click'); missionState = 'SEQUENCE'; }}
      />
    </div>
  {:else if missionState === 'SEQUENCE'}
    <div in:fade>
      <SequenceBreaker 
        puzzleData={data.level.sequenceBreaker}
        on:success={onSequenceSuccess}
      />
    </div>
  {:else if missionState === 'DEBRIEFING'}
    <div in:fade>
      <DialogueBox 
        lines={data.level.dialogue.debriefing} 
        on:end={() => {
          missionState = 'COMPLETED';
          setTimeout(() => goto('/dashboard'), 1000);
        }}
      />
    </div>
  {:else if missionState === 'COMPLETED'}
     <div class="text-2xl text-green-400">MISSION COMPLETE</div>
  {/if}
</div>