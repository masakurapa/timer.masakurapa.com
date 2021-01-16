<button
    on:click="{onClick}"
    {disabled}
>NEXT<br>PHASE</button>

<script lang="ts">
    import {
        timerIndex,
        timerSettings,
        isTimerStarting,
    } from '../../../store';
    import { calcTotalSec } from '../../../util';

    $: disabled = $isTimerStarting || ($timerIndex + 1 === $timerSettings.length);

    const onClick = (): void => {
        // 一応disabledの条件を再判定しておく
        if ($timerIndex + 1 === $timerSettings.length) {
            return;
        }

        const index = $timerIndex;
        const t = $timerSettings[index];
        $timerSettings[index].time = calcTotalSec(t.hour, t.minute, t.second);

        // 一番最後のタイマーまできている
        if (index + 1 === $timerSettings.length) {
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
        }
    }
</style>
