<script lang="ts">
  import { NodeType, type NodePieceData } from '$lib/game/data/levelData';

  export let pieceData: NodePieceData;
  export const isPowered: boolean = false;

  $: rotationStyle = `--rotation: ${pieceData.rotation}deg`;
</script>

<div
  class="w-full h-full grid place-items-center transition-transform duration-300"
  style={rotationStyle}
>
  {#if pieceData.type === NodeType.CORNER}
    <div class="w-full h-full relative">
      <div class="absolute w-1/2 h-1/2 top-1/2 -translate-y-1/2 left-0 bg-cyan-400" />
      <div class="absolute w-1/2 h-1/2 left-1/2 -translate-x-1/2 top-0 bg-cyan-400" />
    </div>
  {:else if pieceData.type === NodeType.STRAIGHT}
    <div class="w-full h-1/2 bg-cyan-400" />
  {:else if pieceData.type === NodeType.START || pieceData.type === NodeType.END}
    <div class="w-full h-full relative">
      <div class="w-1/2 h-1/2 bg-cyan-400 absolute top-1/2 -translate-y-1/2 left-0" />
      <div class="w-full h-full rounded-full grid place-items-center
                  {pieceData.type === NodeType.START ? 'bg-green-500' : 'bg-red-500'}">
        <span class="text-xl font-bold text-black transform-gpu" style="transform: rotate(calc(-1 * var(--rotation)))">
          {pieceData.type === NodeType.START ? '▶' : '■'}
        </span>
      </div>
    </div>
  {/if}
</div>

<style>
  div {
    transform: rotate(var(--rotation));
  }
</style>