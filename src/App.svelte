<svelte:head>
    {@html `<style>
        body {
            background-color: ${bgColor};
        }
    </style>`}
</svelte:head>

<main>
    <Timer/>
    <hr>
    <Setting/>
</main>

<script lang="ts">
    import Timer from './components/timer/Index.svelte';
    import Setting from './components/setting/Index.svelte';

    import { colorSetting } from './store/setting';
    import {
        timerSecondsRemaining,
        isTimerRunning,
        isTimeUpAll,
        isTimeUp,
     } from './store/state';

    // 背景のデフォルト
    const defaultBgColor = '#FFFFFF';
    let bgColor = defaultBgColor;

    // タイマーの状態に応じたスタイルの切り替え
    const setTimerStatus = (): void => {
        const setting = $colorSetting;
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

    timerSecondsRemaining.subscribe((): void => setTimerStatus());
    isTimerRunning.subscribe((): void => setTimerStatus());
    isTimeUp.subscribe((): void => setTimerStatus());
    isTimeUpAll.subscribe((): void => setTimerStatus());
</script>

<style>
    main {
        padding: 24px;
    }
</style>
