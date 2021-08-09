<button on:click="{onClick}">スタート</button>

<script lang="ts">
    import { isTimerRunning } from '../../../store/timer';

    const onClick = (): void => {
        isTimerRunning.set(true);
    };
</script>

<style>
    button {
        background-color: #3388FF;
        border-bottom: 5px solid #0055FF;
        width: 200px;
    }

    button:hover {
        background-color: #1177EE;
    }
</style>
