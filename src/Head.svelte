<svelte:head>
    {#if isRunning}
    <style>
        body {
            background-color: #ddffff;
        }
    </style>
    {/if}
    {#if isWarning}
    <style>
        body {
            background-color: #ffffcc;
        }
    </style>
    {/if}
    {#if isDanger}
    <style>
        body {
            background-color: #ffdddd;
        }
    </style>
    {/if}
    {#if isFinish}
    <style>
        body {
            background-color: #ddffdd;
        }
    </style>
    {/if}
</svelte:head>

<script lang="ts">
    import {
        timerSettings,
        timerIndex,
        isTimerStarting,
        isTimeUpAll,
     } from './store.js';

    let isRunning = false;
    let isWarning = false;
    let isDanger = false;
    let isFinish = false;
    // タイマーのカウントが0になったことを検知するためのフラグ
    let finish = false;

    // タイマーの状態に応じたスタイルの切り替え
    const setTimerStatus = (): void => {
        isRunning = false;
        isWarning = false;
        isDanger = false;
        isFinish = false;

        // 全タイマーの終了
        if ($isTimeUpAll) {
            isFinish = true;
            return;
        }

        // タイマーが動いてない
        if (!$isTimerStarting || $timerSettings[$timerIndex] === undefined) {
            return;
        }

        const sec = $timerSettings[$timerIndex].time;
        if (finish || sec <= 10) {
            isDanger = true;
            finish = false;
            if (sec === 0) {
                finish = true;
            }
        } else if (sec <= 30) {
            isWarning = true;
        } else {
            isRunning = true;
        }
    };

    isTimerStarting.subscribe((): void => setTimerStatus());
    isTimeUpAll.subscribe((): void => setTimerStatus());
    timerSettings.subscribe((): void => setTimerStatus());
</script>
