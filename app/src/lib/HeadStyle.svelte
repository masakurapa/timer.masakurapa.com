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
    import type { ColorSetting } from '$lib/types/local_timer';
    import { personalTimerSetting, backgroundColor } from '$lib/store/setting';
    import {
        timerSecondsRemaining,
        isTimerRunning,
        isTimeUpAll,
        isTimeUp,
     } from '$lib/store/timer';

    // 背景のデフォルト
    const defaultBgColor = '#FFFFFF';
    let bgColor = defaultBgColor;

    // タイマーの状態に応じたスタイルの切り替え
    const setTimerStatus = (): void => {
        const sec = $timerSecondsRemaining;

        bgColor = defaultBgColor;

        // タイマーが動いてない
        if (!$isTimerRunning || sec === null) {
            backgroundColor.set(bgColor);
            return;
        }

        // 全タイマーの終了
        if ($isTimeUpAll) {
            bgColor = colorSetting.finishColor;
            backgroundColor.set(bgColor);
            return;
        }

        if (sec <= colorSetting.warning2Seconds) {
            bgColor = colorSetting.warning2Color;
        } else if (sec <= colorSetting.warning1Seconds) {
            bgColor = colorSetting.warning1Color;
        } else {
            bgColor = colorSetting.runningColor;
        }
        backgroundColor.set(bgColor);
    };

    let colorSetting: ColorSetting;
    personalTimerSetting.subscribe(setting => {
        colorSetting = setting.colorSetting;
    });

    timerSecondsRemaining.subscribe((): void => setTimerStatus());
    isTimerRunning.subscribe((): void => setTimerStatus());
    isTimeUp.subscribe((): void => setTimerStatus());
    isTimeUpAll.subscribe((): void => setTimerStatus());
</script>

<style>
</style>
