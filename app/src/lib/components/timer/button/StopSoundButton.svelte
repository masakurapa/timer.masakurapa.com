<button on:click="{onClick}">サウンド停止</button>

<script lang="ts">
    import { personalTimerSetting } from '$lib/store/setting';
    import {
        currentTimerPosition,
        timerSecondsRemaining,
        isTimerRunning,
        isTimeUpAll,
    } from '$lib/store/timer';
    import { calcTotalSeconds } from '$lib/util';

    const onClick = (): void => {
        isTimerRunning.set(false);
        isTimeUpAll.set(false);
        currentTimerPosition.set(0);
        timerSecondsRemaining.set(calcTotalSeconds($personalTimerSetting.timerSettings[0].timer));
    };
</script>

<style>
    button {
        background-color: #459961;
        border-bottom: 5px solid #126661;
        width: 200px;
    }

    button:hover {
        background-color: #238850;
    }
</style>
