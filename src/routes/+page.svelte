<script lang="ts">
    import Button from "$lib/components/ui/Button.svelte";
</script>

<div class="min-h-screen grid place-content-center text-center gap-4">
    <h1 class="text-4xl font-bold text-cyan-400 font-mono animate-pulse">
        CHIMERA PROTOCOL
    </h1>

    <Button on:click={() => alert('Connection established!')}>
        [ ENTER SYSTEM ]
    </Button>
</div>