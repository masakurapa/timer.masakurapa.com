<label>
    <input
        type=checkbox
        bind:checked={$isPlaySound}
    >
    Sound {#if $isPlaySound}ON{:else}OFF{/if}
</label>

<script lang="ts">
    import { isPlaySound } from '../../store';
</script>

<style>
</style>
