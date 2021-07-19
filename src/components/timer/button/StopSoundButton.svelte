<button on:click="{onClick}">サウンド停止</button>

<script lang="ts">
    import { personalTimerSetting } from '../../..//store/setting';
    import {
        currentTimerPosition,
        timerSecondsRemaining,
        isTimerRunning,
        isTimeUpAll,
    } from '../../../store/timer';
    import { calcTotalSeconds } from '../../../util';

    const onClick = (): void => {
        isTimerRunning.set(false);
        isTimeUpAll.set(false);
        currentTimerPosition.set(0);
        timerSecondsRemaining.set(calcTotalSeconds($personalTimerSetting.timerSettings[0].timer));
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
