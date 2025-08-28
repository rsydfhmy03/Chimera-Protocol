<script lang="ts">
</script>

<button
  on:click
  class="bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 px-4 py-2
         hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-200
         focus:ring-2 focus:ring-cyan-400 focus:outline-none"
  {...$$props}
>
  <slot />
</button>