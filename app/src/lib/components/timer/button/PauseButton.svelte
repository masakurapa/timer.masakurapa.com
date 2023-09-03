<button on:click="{onClick}">一時停止</button>

<script lang="ts">
    import { isTimerRunning } from '$lib/store/timer';

    const onClick = (): void => {
        isTimerRunning.set(false);
    };
</script>

<style>
    button {
        background-color: #DC343C;
        border-bottom: 5px solid #AB013C;
        width: 200px;
    }

    button:hover {
        background-color: #CB032B;
    }
</style>
