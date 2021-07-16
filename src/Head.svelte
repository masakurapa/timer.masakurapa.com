<svelte:head>
    {@html `<style>
        body {
            background-color: ${bgColor};
        }
    </style>`}

    <script>
        const url = 'http://localhost:3000';
    </script>
</svelte:head>

<script lang="ts">
    import type { ColorSetting } from './types/local_timer';
    import { colorSetting } from './store/setting';
    import {
        timerSecondsRemaining,
        isTimerRunning,
        isTimeUpAll,
        isTimeUp,
     } from './store/timer';

    // 背景のデフォルト
    const defaultBgColor = '#FFFFFF';
    let bgColor = defaultBgColor;

    // タイマーの状態に応じたスタイルの切り替え
    const setTimerStatus = (): void => {
        const sec = $timerSecondsRemaining;

        bgColor = defaultBgColor;

        // タイマーが動いてない
        if (!$isTimerRunning || sec === null) {
            return;
        }

        // 全タイマーの終了
        if ($isTimeUpAll) {
            bgColor = setting.finishColor;
            return;
        }

        if (sec <= setting.warning2Seconds) {
            bgColor = setting.warning2Color;
        } else if (sec <= setting.warning1Seconds) {
            bgColor = setting.warning1Color;
        } else {
            bgColor = setting.runningColor;
        }
    };

    let setting: ColorSetting;
    colorSetting.subscribe(val => {
        if (val !== null) {
            setting = val;
        }
    });

    timerSecondsRemaining.subscribe((): void => setTimerStatus());
    isTimerRunning.subscribe((): void => setTimerStatus());
    isTimeUp.subscribe((): void => setTimerStatus());
    isTimeUpAll.subscribe((): void => setTimerStatus());
</script>

<style>
</style>
