<button
    on:click="{onClick}"
    {disabled}
>SKIP</button>

<script lang="ts">
    import {
        timerIndex,
        timerSettings,
        repeat,
        repeatCount,
        isTimerStarting,
    } from '../../store.js';
    import { calcTotalSec } from '../../util.js';

    $: disabled = $isTimerStarting ||
        ($timerIndex + 1 === $timerSettings.length && $repeat === $repeatCount);

    const onClick = (): void => {
        // 一応disabledの条件を再判定しておく
        if ($timerIndex + 1 === $timerSettings.length && $repeat === $repeatCount) {
            return;
        }

        const index = $timerIndex;
        const t = $timerSettings[index];
        $timerSettings[index].time = calcTotalSec(t.hour, t.minute, t.second);

        // 一番最後のタイマーまできている
        if (index + 1 === $timerSettings.length) {
            repeatCount.update(n => n + 1);
            timerIndex.set(0);
            return;
        }

        // 次のタイマーがある
        timerIndex.update(n => n + 1);
    };
</script>

<style>
    button {
        padding: 8px;
        height: 40px;
        border: none;
        outline: none;
        color: #FFFFFF;
        width: 100px;
        height: 50px;
        background-color: #FF7F50;
        cursor: pointer;
    }
    button:disabled {
        background-color: #999999;
        cursor: default;
    }
    button:forcus {
        background-color: #FF6933;
    }
    button:not(:disabled):hover {
        background-color: #FF6933;
    }
    button:not(:disabled):active {
        background-color: #FF6933;
    }

    @media screen and (max-width: 480px) {
        button {
            width: 80px;
            height: 40px;
        }
    }
</style>
