<button on:click="{onClick}">PAUSE</button>

<script lang="ts">
    import { isTimerRunning } from '../../../store/state';

    const onClick = (): void => {
        isTimerRunning.set(false);
    };
</script>

<style>
    button {
        background-color: #DC143C;
        width: 200px;
    }

    button:hover {
        background-color: #CB032B;
    }
</style>
