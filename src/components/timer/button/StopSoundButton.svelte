<button on:click="{onClick}">STOP SOUND</button>

<script lang="ts">
    import {
        isTimerRunning,
        isTimeUpAll,
    } from '../../../store/state';

    const onClick = (): void => {
        isTimerRunning.set(false);
        isTimeUpAll.set(false);
    };
</script>

<style>
    button {
        background-color: #349961;
        width: 200px;
    }

    button:hover {
        background-color: #238850;
    }
</style>
