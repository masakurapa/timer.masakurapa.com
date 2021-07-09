<button on:click="{onClick}">STOP SOUND</button>

<script lang="ts">
    import { timerSettings } from '../../..//store/setting';
    import {
        currentTimerPosition,
        timerSecondsRemaining,
        isTimerRunning,
        isTimeUpAll,
    } from '../../../store/state';
    import { calcTotalSeconds } from '../../../util';

    const onClick = (): void => {
        isTimerRunning.set(false);
        isTimeUpAll.set(false);
        currentTimerPosition.set(0);
        timerSecondsRemaining.set(calcTotalSeconds($timerSettings[0].timer));
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
