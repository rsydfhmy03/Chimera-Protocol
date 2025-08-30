<script lang="ts">
  export let title: string = "SYNAPSE_OS";
</script>

<div class="border border-cyan-500/30 bg-black/50 shadow-lg shadow-cyan-500/10">
  <header class="bg-slate-900/50 h-8 flex items-center justify-between px-2 border-b border-cyan-500/30">
    <div class="text-cyan-400 font-bold text-sm">
      {title}
    </div>
    <div class="flex items-center gap-2">
      <div class="w-3 h-3 rounded-full bg-slate-600"></div>
      <div class="w-3 h-3 rounded-full bg-slate-600"></div>
      <div class="w-3 h-3 rounded-full bg-red-500"></div>
    </div>
  </header>

  <div class="p-4 md:p-8">
    <slot />
  </div>
</div>